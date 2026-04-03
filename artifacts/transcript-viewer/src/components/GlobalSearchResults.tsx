import { BookOpen, ChevronRight, Search } from "lucide-react";
import transcriptsData from "@/data/maths2/transcripts.json";
import type { TranscriptsData } from "@/types";
import { highlightText } from "@/lib/search";

const data = transcriptsData as unknown as TranscriptsData;

interface CourseResult {
  courseId: string;
  courseName: string;
  level: string;
  semester: string;
  totalMatches: number;
  videosMatched: number;
  firstMention: {
    videoCode: string;
    weekLabel: string;
    timestamp: string;
    snippet: string;
  } | null;
}

const COURSE_REGISTRY: Array<{
  id: string;
  name: string;
  level: string;
  semester: string;
  data: TranscriptsData;
}> = [
  {
    id: "maths2",
    name: "Mathematics for Data Science II",
    level: "Foundation",
    semester: "Semester 2",
    data,
  },
];

function searchCourse(
  course: (typeof COURSE_REGISTRY)[0],
  terms: string[]
): CourseResult {
  let totalMatches = 0;
  let videosMatched = 0;
  let firstMention: CourseResult["firstMention"] = null;

  for (const week of course.data.weeks) {
    for (const video of week.videos) {
      if (!video.available) continue;
      let videoMatches = 0;

      for (const seg of video.segments) {
        const lower = seg.text.toLowerCase();
        const allMatch = terms.every((t) => lower.includes(t));
        if (allMatch) {
          videoMatches++;
          if (!firstMention) {
            firstMention = {
              videoCode: video.code,
              weekLabel: week.label,
              timestamp: seg.timestamp,
              snippet: seg.text,
            };
          }
        }
      }

      if (videoMatches > 0) {
        totalMatches += videoMatches;
        videosMatched++;
      }
    }
  }

  return {
    courseId: course.id,
    courseName: course.name,
    level: course.level,
    semester: course.semester,
    totalMatches,
    videosMatched,
    firstMention,
  };
}

interface GlobalSearchResultsProps {
  query: string;
  onOpenCourse: (courseId: string, query: string) => void;
}

export function GlobalSearchResults({ query, onOpenCourse }: GlobalSearchResultsProps) {
  const terms = query
    .toLowerCase()
    .split(/\s+/)
    .filter((t) => t.length > 1);

  const results: CourseResult[] = COURSE_REGISTRY.map((course) =>
    searchCourse(course, terms)
  ).filter((r) => r.totalMatches > 0);

  if (terms.length === 0) return null;

  return (
    <div className="h-full overflow-y-auto scrollbar-thin">
      <div className="max-w-3xl mx-auto px-4 py-6">
        <div className="mb-5">
          <h2 className="text-sm font-semibold text-foreground mb-0.5">
            Course results for{" "}
            <span className="text-primary">"{query}"</span>
          </h2>
          <p className="text-xs text-muted-foreground">
            Showing which courses cover this topic, ordered by first introduction in the curriculum
          </p>
        </div>

        {results.length === 0 ? (
          <div className="flex flex-col items-center gap-3 py-16 text-center">
            <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
              <Search className="w-5 h-5 text-muted-foreground" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">No results found</p>
              <p className="text-xs text-muted-foreground mt-1">
                Try a different term — more courses will be added over time
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            {results.map((result) => (
              <button
                key={result.courseId}
                onClick={() => onOpenCourse(result.courseId, query)}
                className="w-full text-left bg-card border border-card-border rounded-xl p-5 hover:border-primary/40 hover:shadow-md transition-all group"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3 min-w-0 flex-1">
                    <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors mt-0.5">
                      <BookOpen className="w-4.5 h-4.5 text-primary" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-0.5">
                        <span className="text-[10px] font-medium text-muted-foreground bg-muted px-1.5 py-0.5 rounded">
                          {result.level}
                        </span>
                        <span className="text-[10px] text-muted-foreground">{result.semester}</span>
                      </div>
                      <h3 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors leading-snug">
                        {result.courseName}
                      </h3>
                      <div className="flex items-center gap-3 mt-1.5 flex-wrap">
                        <span className="inline-flex items-center gap-1 text-xs font-semibold text-primary">
                          {result.totalMatches.toLocaleString()} result{result.totalMatches !== 1 ? "s" : ""}
                        </span>
                        <span className="text-muted-foreground/40 text-xs">·</span>
                        <span className="text-xs text-muted-foreground">
                          across {result.videosMatched} video{result.videosMatched !== 1 ? "s" : ""}
                        </span>
                      </div>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-muted-foreground/40 group-hover:text-primary flex-shrink-0 mt-2 group-hover:translate-x-0.5 transition-all" />
                </div>

                {result.firstMention && (
                  <div className="mt-3 pt-3 border-t border-border/60">
                    <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wide mb-1.5">
                      First introduced
                    </p>
                    <div className="flex items-start gap-2">
                      <span className="flex-shrink-0 inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-primary/10 text-primary text-[10px] font-mono font-semibold border border-primary/20">
                        {result.firstMention.videoCode}
                        <span className="opacity-60">@ {result.firstMention.timestamp}</span>
                      </span>
                      <p
                        className="text-xs text-muted-foreground leading-relaxed line-clamp-2 highlight-text"
                        dangerouslySetInnerHTML={{
                          __html: highlightText(result.firstMention.snippet, query),
                        }}
                      />
                    </div>
                    <p className="text-[10px] text-muted-foreground/50 mt-1">
                      {result.firstMention.weekLabel}
                    </p>
                  </div>
                )}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
