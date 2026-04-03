import type { TranscriptsData, Video, Week } from "@/types";

export function timestampToSeconds(ts: string): number {
  const parts = ts.split(":").map(Number);
  if (parts.length === 2) return parts[0] * 60 + parts[1];
  if (parts.length === 3) return parts[0] * 3600 + parts[1] * 60 + parts[2];
  return 0;
}

export function findVideoByCode(
  data: TranscriptsData,
  code: string
): { video: Video; week: Week } | null {
  for (const week of data.weeks) {
    for (const video of week.videos) {
      if (video.code === code) return { video, week };
    }
  }
  return null;
}

export function findClosestSegmentIndex(video: Video, timestamp: string): number {
  const targetSecs = timestampToSeconds(timestamp);
  if (video.segments.length === 0) return 0;

  let closest = 0;
  let minDiff = Infinity;

  for (let i = 0; i < video.segments.length; i++) {
    const diff = Math.abs(video.segments[i].time - targetSecs);
    if (diff < minDiff) {
      minDiff = diff;
      closest = i;
    }
  }
  return closest;
}
