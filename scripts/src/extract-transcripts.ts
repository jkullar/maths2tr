import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..', '..');
const OUTPUT_DIR = path.join(ROOT, 'transcripts');
const COURSE_FILE = path.join(ROOT, 'attached_assets', 'LinearAlgebra_Course_ByWeek_1775199084669.md');

interface VideoEntry {
  code: string;
  title: string;
  url: string;
  week: string;
}

function parseCourseFile(filePath: string): VideoEntry[] {
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');
  const videos: VideoEntry[] = [];
  const seen = new Set<string>();

  let currentWeek = 'unknown';

  const weekHeadingRe = /^##\s+\*\*Week\s+(\d+)\*\*/i;
  const refresherRe = /^##\s+\*\*Refresher\s+Week\*\*/i;
  const specialRe = /^##\s+\*\*Mathematics\s+for\s+Data\s+Science/i;
  const videoLineRe = /^\d+\.\s+\*\*([^:]+):\s+([^*]+)\*\*\s+-\s+(https:\/\/www\.youtube\.com\/watch\?v=\S+)/;
  const refresherLineRe = /^\d+\.\s+\*\*(Refresher\s+week\s+-\s+[^*]+)\*\*\s+-\s+(https:\/\/www\.youtube\.com\/watch\?v=\S+)/i;
  const mds2LineRe = /^\d+\.\s+\*\*(Mathematics\s+for\s+Data\s+Science\s+II)\*\*\s+-\s+(https:\/\/www\.youtube\.com\/watch\?v=\S+)/i;

  let mds2Counter = 0;
  let refresherCounter = 0;

  for (const line of lines) {
    const weekMatch = line.match(weekHeadingRe);
    if (weekMatch) {
      currentWeek = `week${weekMatch[1]}`;
      continue;
    }
    if (refresherRe.test(line)) {
      currentWeek = 'refresher';
      continue;
    }
    if (specialRe.test(line)) {
      currentWeek = 'special';
      continue;
    }

    const videoMatch = line.match(videoLineRe);
    if (videoMatch) {
      const code = videoMatch[1].trim();
      const title = videoMatch[2].trim();
      const url = videoMatch[3].trim();
      if (!seen.has(url)) {
        seen.add(url);
        videos.push({ code, title, url, week: currentWeek });
      }
      continue;
    }

    const refresherMatch = line.match(refresherLineRe);
    if (refresherMatch && currentWeek === 'refresher') {
      refresherCounter++;
      const title = refresherMatch[1].trim();
      const url = refresherMatch[2].trim();
      const code = `Refresher_T${refresherCounter}`;
      if (!seen.has(url)) {
        seen.add(url);
        videos.push({ code, title, url, week: 'refresher' });
      }
      continue;
    }

    const mds2Match = line.match(mds2LineRe);
    if (mds2Match && currentWeek === 'special') {
      mds2Counter++;
      const title = `${mds2Match[1].trim()} - Video ${mds2Counter}`;
      const url = mds2Match[2].trim();
      const code = `MDS2_${mds2Counter}`;
      if (!seen.has(url)) {
        seen.add(url);
        videos.push({ code, title, url, week: 'special' });
      }
      continue;
    }
  }

  return videos;
}

interface TranscriptItem {
  text: string;
  offset: number;
  duration: number;
  lang: string;
}

const USER_AGENT = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.83 Safari/537.36,gzip(gfe)';
const INNERTUBE_URL = 'https://www.youtube.com/youtubei/v1/player?prettyPrint=false';
const INNERTUBE_CLIENT_VERSION = '20.10.38';
const ANDROID_UA = `com.google.android.youtube/${INNERTUBE_CLIENT_VERSION} (Linux; U; Android 14)`;

function getVideoId(url: string): string {
  const match = url.match(/(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/\s]{11})/i);
  if (match) return match[1];
  if (url.length === 11) return url;
  throw new Error(`Cannot extract video ID from: ${url}`);
}

function decodeEntities(str: string): string {
  return str
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&#x([0-9a-fA-F]+);/g, (_, hex) => String.fromCodePoint(parseInt(hex, 16)))
    .replace(/&#(\d+);/g, (_, dec) => String.fromCodePoint(parseInt(dec, 10)));
}

function parseTranscriptXml(xml: string, lang: string): TranscriptItem[] {
  const items: TranscriptItem[] = [];

  const pRegex = /<p\s+t="(\d+)"\s+d="(\d+)"[^>]*>([\s\S]*?)<\/p>/g;
  let pMatch;
  while ((pMatch = pRegex.exec(xml)) !== null) {
    const offset = parseInt(pMatch[1], 10);
    const duration = parseInt(pMatch[2], 10);
    const inner = pMatch[3];
    let text = '';
    const sRegex = /<s[^>]*>([^<]*)<\/s>/g;
    let sMatch;
    while ((sMatch = sRegex.exec(inner)) !== null) {
      text += sMatch[1];
    }
    if (!text) {
      text = inner.replace(/<[^>]+>/g, '');
    }
    text = decodeEntities(text).trim();
    if (text) {
      items.push({ text, offset, duration, lang });
    }
  }

  if (items.length > 0) return items;

  const legacyRegex = /<text start="([^"]*)" dur="([^"]*)">([^<]*)<\/text>/g;
  let legacyMatch;
  while ((legacyMatch = legacyRegex.exec(xml)) !== null) {
    const offset = Math.round(parseFloat(legacyMatch[1]) * 1000);
    const duration = Math.round(parseFloat(legacyMatch[2]) * 1000);
    const text = decodeEntities(legacyMatch[3]).trim();
    if (text) {
      items.push({ text, offset, duration, lang });
    }
  }

  return items;
}

async function fetchTranscriptViaInnerTube(videoId: string): Promise<TranscriptItem[] | null> {
  try {
    const body = {
      context: {
        client: {
          clientName: 'ANDROID',
          clientVersion: INNERTUBE_CLIENT_VERSION,
        },
      },
      videoId,
    };

    const res = await fetch(INNERTUBE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': ANDROID_UA,
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) return null;

    const data = await res.json() as Record<string, unknown>;
    const captions = (data?.captions as Record<string, unknown>)?.playerCaptionsTracklistRenderer as Record<string, unknown>;
    const captionTracks = captions?.captionTracks as Array<{ baseUrl: string; languageCode: string }>;

    if (!Array.isArray(captionTracks) || captionTracks.length === 0) return null;

    const track = captionTracks[0];
    const trackUrl = track.baseUrl;
    const lang = track.languageCode;

    if (!new URL(trackUrl).hostname.endsWith('.youtube.com')) return null;

    const xmlRes = await fetch(trackUrl, {
      headers: { 'User-Agent': USER_AGENT },
    });
    if (!xmlRes.ok) return null;

    const xml = await xmlRes.text();
    return parseTranscriptXml(xml, lang);
  } catch {
    return null;
  }
}

async function fetchTranscriptViaWebPage(videoId: string, videoUrl: string): Promise<TranscriptItem[]> {
  const pageRes = await fetch(`https://www.youtube.com/watch?v=${videoId}`, {
    headers: { 'User-Agent': USER_AGENT },
  });
  const html = await pageRes.text();

  if (html.includes('class="g-recaptcha"')) {
    throw new Error('YouTube is rate limiting this IP (captcha required)');
  }
  if (!html.includes('"playabilityStatus":')) {
    throw new Error(`Video is unavailable: ${videoUrl}`);
  }

  const initStr = 'var ytInitialPlayerResponse = ';
  const startIdx = html.indexOf(initStr);
  if (startIdx === -1) throw new Error('Could not find ytInitialPlayerResponse');

  const jsonStart = startIdx + initStr.length;
  let depth = 0;
  let jsonEnd = jsonStart;
  for (let i = jsonStart; i < html.length; i++) {
    if (html[i] === '{') depth++;
    else if (html[i] === '}') {
      depth--;
      if (depth === 0) { jsonEnd = i + 1; break; }
    }
  }

  let playerResponse: Record<string, unknown>;
  try {
    playerResponse = JSON.parse(html.slice(jsonStart, jsonEnd)) as Record<string, unknown>;
  } catch {
    throw new Error('Failed to parse player response JSON');
  }

  const captions = (playerResponse?.captions as Record<string, unknown>)?.playerCaptionsTracklistRenderer as Record<string, unknown>;
  const captionTracks = captions?.captionTracks as Array<{ baseUrl: string; languageCode: string }>;

  if (!Array.isArray(captionTracks) || captionTracks.length === 0) {
    throw new Error(`Transcript is disabled or unavailable for this video: ${videoUrl}`);
  }

  const track = captionTracks[0];
  const trackUrl = track.baseUrl;
  const lang = track.languageCode;

  const xmlRes = await fetch(trackUrl, {
    headers: { 'User-Agent': USER_AGENT },
  });
  if (!xmlRes.ok) throw new Error('Failed to fetch transcript XML');

  const xml = await xmlRes.text();
  const items = parseTranscriptXml(xml, lang);
  if (items.length === 0) throw new Error('Transcript XML parsed but contained no segments');
  return items;
}

async function fetchTranscript(url: string): Promise<TranscriptItem[]> {
  const videoId = getVideoId(url);

  const innerTubeResult = await fetchTranscriptViaInnerTube(videoId);
  if (innerTubeResult && innerTubeResult.length > 0) return innerTubeResult;

  return fetchTranscriptViaWebPage(videoId, url);
}

function formatTranscript(items: TranscriptItem[]): string {
  return items.map(item => {
    const totalSecs = Math.floor(item.offset / 1000);
    const mins = Math.floor(totalSecs / 60);
    const secs = totalSecs % 60;
    const timestamp = `[${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}]`;
    const text = item.text.replace(/\n/g, ' ').trim();
    return `${timestamp} ${text}`;
  }).join('\n');
}

function buildMarkdown(video: VideoEntry, transcript: string | null, error?: string): string {
  const weekLabel =
    video.week === 'refresher' ? 'Refresher Week' :
    video.week === 'special' ? 'Mathematics for Data Science II (Special Videos)' :
    `Week ${video.week.replace('week', '')}`;

  const lines: string[] = [
    `# ${video.code}: ${video.title}`,
    '',
    `**Week:** ${weekLabel}`,
    `**YouTube URL:** ${video.url}`,
    '',
    '---',
    '',
  ];

  if (transcript) {
    lines.push('## Transcript', '', transcript);
  } else {
    lines.push('## Transcript Unavailable', '');
    lines.push('> **Note:** Transcript could not be retrieved for this video.');
    if (error) {
      lines.push(`> **Reason:** ${error}`);
    }
  }

  return lines.join('\n');
}

function slugify(str: string): string {
  return str
    .replace(/[|:?/\\<>*"']/g, '-')
    .replace(/\s+/g, '_')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .trim();
}

function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

interface IndexEntry {
  code: string;
  title: string;
  week: string;
  url: string;
  filePath: string;
  status: 'ok' | 'unavailable';
  error?: string;
}

async function main() {
  if (!fs.existsSync(COURSE_FILE)) {
    throw new Error(`Course file not found: ${COURSE_FILE}`);
  }

  const VIDEOS = parseCourseFile(COURSE_FILE);
  console.log(`Parsed ${VIDEOS.length} unique videos from course file.`);
  console.log(`Starting transcript extraction...`);
  console.log(`Output directory: ${OUTPUT_DIR}\n`);

  fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  const weekDirs = [...new Set(VIDEOS.map(v => v.week))];
  for (const w of weekDirs) {
    fs.mkdirSync(path.join(OUTPUT_DIR, w), { recursive: true });
  }

  const indexEntries: IndexEntry[] = [];
  let successCount = 0;
  let failCount = 0;

  for (let i = 0; i < VIDEOS.length; i++) {
    const video = VIDEOS[i];
    const fileSlug = slugify(video.title);
    const fileName = `${video.code}_${fileSlug}.md`;
    const filePath = path.join(OUTPUT_DIR, video.week, fileName);
    const relPath = `${video.week}/${fileName}`;

    process.stdout.write(`[${i + 1}/${VIDEOS.length}] ${video.code}: ${video.title} ... `);

    let transcriptText: string | null = null;
    let errorMsg: string | undefined;

    for (let attempt = 1; attempt <= 3; attempt++) {
      try {
        const items = await fetchTranscript(video.url);
        transcriptText = formatTranscript(items);
        successCount++;
        console.log(`OK (${items.length} segments)`);
        break;
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : String(err);
        if (attempt < 3) {
          console.log(`  Retry ${attempt}/2: ${msg.substring(0, 60)}`);
          await delay(2000 * attempt);
        } else {
          errorMsg = msg;
          failCount++;
          console.log(`UNAVAILABLE: ${msg.substring(0, 80)}`);
        }
      }
    }

    const markdown = buildMarkdown(video, transcriptText, errorMsg);
    fs.writeFileSync(filePath, markdown, 'utf8');

    indexEntries.push({
      code: video.code,
      title: video.title,
      week: video.week,
      url: video.url,
      filePath: relPath,
      status: transcriptText ? 'ok' : 'unavailable',
      error: errorMsg,
    });

    if (i < VIDEOS.length - 1) {
      await delay(300);
    }
  }

  const weekOrder = ['week1', 'week2', 'week3', 'week4', 'week5', 'week6', 'week7', 'week8', 'week9', 'week10', 'week11', 'refresher', 'special'];
  const weekLabels: Record<string, string> = {
    week1: 'Week 1 — Vectors, Matrices, Systems, Determinants',
    week2: "Week 2 — Determinants (cont.), Cramer's Rule, Echelon Form, Gaussian Elimination",
    week3: 'Week 3 — Vector Spaces, Linear Dependence/Independence',
    week4: 'Week 4 — Basis, Rank, Dimension',
    week5: 'Week 5 — Null Space, Linear Mappings & Transformations',
    week6: 'Week 6 — Linear Transformations, Image & Kernel',
    week7: 'Week 7 — Matrix Equivalence, Affine Subspaces, Inner Products',
    week8: 'Week 8 — Orthogonality, Gram-Schmidt, Orthogonal Transformations',
    week9: 'Week 9 — Multivariable Functions, Partial & Directional Derivatives',
    week10: 'Week 10 — Gradient, Tangent Planes, Critical Points',
    week11: 'Week 11 — Hessian Matrix, Local Extrema, Differentiability',
    refresher: 'Refresher Week',
    special: 'Mathematics for Data Science II (Special Videos)',
  };

  const readmeLines: string[] = [
    '# Linear Algebra & Multivariable Calculus — Transcript Index',
    '',
    'Transcripts for the **Linear Algebra & Multivariable Calculus** course, organized by week.',
    '',
    `| Stat | Count |`,
    `|------|-------|`,
    `| Total videos | ${VIDEOS.length} |`,
    `| Transcripts available | ${successCount} |`,
    `| Transcripts unavailable | ${failCount} |`,
    '',
    '---',
    '',
  ];

  for (const week of weekOrder) {
    const entries = indexEntries.filter(e => e.week === week);
    if (entries.length === 0) continue;

    readmeLines.push(`## ${weekLabels[week] ?? week}`);
    readmeLines.push('');

    const lectures = entries.filter(e => e.code.includes('_L') || e.code.startsWith('MDS2') || e.code.startsWith('Refresher'));
    const tutorials = entries.filter(e => e.code.includes('_T') && !e.code.startsWith('Refresher'));

    if (lectures.length > 0) {
      readmeLines.push('**Lectures:**', '');
      for (const entry of lectures) {
        const icon = entry.status === 'ok' ? '✅' : '❌';
        readmeLines.push(`- ${icon} [${entry.code}: ${entry.title}](${entry.filePath}) — [YouTube](${entry.url})`);
      }
      readmeLines.push('');
    }

    if (tutorials.length > 0) {
      readmeLines.push('**Tutorials:**', '');
      for (const entry of tutorials) {
        const icon = entry.status === 'ok' ? '✅' : '❌';
        readmeLines.push(`- ${icon} [${entry.code}: ${entry.title}](${entry.filePath}) — [YouTube](${entry.url})`);
      }
      readmeLines.push('');
    }
  }

  const unavailable = indexEntries.filter(e => e.status === 'unavailable');
  if (unavailable.length > 0) {
    readmeLines.push('---', '', '## Videos Without Transcripts', '');
    readmeLines.push('These videos could not have their transcripts extracted (transcripts may be disabled or unavailable).', '');
    for (const entry of unavailable) {
      readmeLines.push(`- **${entry.code}**: [${entry.title}](${entry.url})`);
      if (entry.error) {
        readmeLines.push(`  - Reason: \`${entry.error.substring(0, 150)}\``);
      }
    }
    readmeLines.push('');
  }

  fs.writeFileSync(path.join(OUTPUT_DIR, 'README.md'), readmeLines.join('\n'), 'utf8');

  console.log('\n=== DONE ===');
  console.log(`Transcripts saved to: ${OUTPUT_DIR}`);
  console.log(`Success: ${successCount}/${VIDEOS.length}`);
  console.log(`Unavailable: ${failCount}/${VIDEOS.length}`);
  console.log(`Index: ${path.join(OUTPUT_DIR, 'README.md')}`);
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
