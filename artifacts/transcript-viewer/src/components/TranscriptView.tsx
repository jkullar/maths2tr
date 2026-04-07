import { useRef, useEffect, useState, useCallback } from "react";
import { ExternalLink, Copy, Check, Clock, AlertCircle, ChevronUp, ArrowLeft } from "lucide-react";
import type { Video, Week, TranscriptSegment } from "@/types";
import { highlightText, formatDuration } from "@/lib/search";
import { cn } from "@/lib/utils";

interface TranscriptViewProps {
  video: Video;
  week: Week;
  searchQuery: string;
  highlightSegmentIndex?: number | null;
  sourceTab?: "curriculum" | "notes" | null;
  onGoBack?: () => void;
}

export function TranscriptView({ video, week, searchQuery, highlightSegmentIndex, sourceTab, onGoBack }: TranscriptViewProps) {
  const [copied, setCopied] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const segmentRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Scroll to the highlighted segment. We use a small timeout so this always
  // runs after the scroll-to-top effect below, preventing the two from racing.
  useEffect(() => {
    if (highlightSegmentIndex == null) return;
    const id = setTimeout(() => {
      segmentRefs.current[highlightSegmentIndex]?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }, 50);
    return () => clearTimeout(id);
  }, [highlightSegmentIndex, video.id]);

  // Reset scroll position when the video changes — but only when we are NOT
  // jumping to a specific segment (which handles its own scroll above).
  useEffect(() => {
    if (highlightSegmentIndex != null) return;
    if (containerRef.current) {
      containerRef.current.scrollTop = 0;
    }
  }, [video.id]);

  const handleScroll = useCallback(() => {
    if (containerRef.current) {
      setShowScrollTop(containerRef.current.scrollTop > 300);
    }
  }, []);

  const scrollToTop = () => {
    containerRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  };

  const copyTranscript = async () => {
    const text = video.segments.map((s) => `[${s.timestamp}] ${s.text}`).join("\n");
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getYouTubeTimestampUrl = (time: number) => {
    const base = video.youtubeUrl.split("&t=")[0].split("?t=")[0];
    const sep = base.includes("?") ? "&" : "?";
    return `${base}${sep}t=${time}s`;
  };

  const estimatedDuration = video.segments.length > 0
    ? video.segments[video.segments.length - 1].time
    : 0;

  const backLabel = sourceTab === "curriculum" ? "Back to Curriculum" : sourceTab === "notes" ? "Back to Notes" : null;

  return (
    <div className="h-full flex flex-col">
      {/* Back-navigation banner — shown when arriving from another tab */}
      {backLabel && onGoBack && (
        <div className="flex-shrink-0 flex items-center gap-2 px-4 py-1.5 bg-primary/5 border-b border-primary/20 text-xs text-primary/80">
          <button
            onClick={onGoBack}
            className="flex items-center gap-1.5 font-medium hover:text-primary transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            {backLabel}
          </button>
          <span className="text-primary/40">·</span>
          <span className="text-primary/60 truncate">
            Jumped to <span className="font-mono font-semibold">{video.code}</span> @ segment {highlightSegmentIndex != null ? highlightSegmentIndex + 1 : "—"}
          </span>
        </div>
      )}

      <div className="flex-shrink-0 border-b border-border bg-card px-6 py-4">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-primary/10 text-primary text-xs font-mono font-semibold">
                {video.code}
              </span>
              <span className="text-xs text-muted-foreground">
                {week.label}
              </span>
              {estimatedDuration > 0 && (
                <span className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock className="w-3 h-3" />
                  ~{formatDuration(estimatedDuration)}
                </span>
              )}
            </div>
            <h1 className="text-lg font-semibold text-foreground leading-snug">
              {video.title}
            </h1>
            <p className="text-xs text-muted-foreground mt-0.5 truncate">{week.topic}</p>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            {video.available && (
              <button
                onClick={copyTranscript}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? "Copied!" : "Copy"}
              </button>
            )}
            {video.youtubeUrl && (
              <a
                href={video.youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                YouTube
              </a>
            )}
          </div>
        </div>

        {video.available && (
          <div className="mt-3 flex items-center gap-4">
            <div className="text-xs text-muted-foreground">
              <span className="font-medium text-foreground">{video.segments.length}</span> segments
            </div>
            {searchQuery && (
              <div className="text-xs text-muted-foreground">
                Highlighted: <span className="font-medium text-amber-600 dark:text-amber-400">"{searchQuery}"</span>
              </div>
            )}
          </div>
        )}
      </div>

      <div
        ref={containerRef}
        onScroll={handleScroll}
        className="flex-1 overflow-y-auto scrollbar-thin"
      >
        {!video.available ? (
          <div className="flex flex-col items-center justify-center h-full gap-4 px-8 text-center">
            <div className="w-14 h-14 rounded-full bg-destructive/10 flex items-center justify-center">
              <AlertCircle className="w-7 h-7 text-destructive/70" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-1">Transcript Unavailable</h3>
              <p className="text-sm text-muted-foreground max-w-xs">
                {video.unavailableReason || "Transcripts are disabled for this video."}
              </p>
            </div>
            {video.youtubeUrl && (
              <a
                href={video.youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                Watch on YouTube
              </a>
            )}
          </div>
        ) : (
          <div className="px-6 py-4 space-y-0.5">
            {video.segments.map((segment, index) => {
              const isHighlighted = highlightSegmentIndex === index;
              const hasSearchMatch = searchQuery
                ? segment.text.toLowerCase().includes(searchQuery.toLowerCase().split(/\s+/)[0])
                : false;

              const displayText = searchQuery
                ? highlightText(segment.text, searchQuery)
                : segment.text;

              return (
                <div
                  key={index}
                  ref={(el) => { segmentRefs.current[index] = el; }}
                  className={cn(
                    "flex gap-3 rounded-md px-3 py-2 transition-all duration-200 group",
                    isHighlighted
                      ? "bg-amber-50 dark:bg-amber-900/20 ring-1 ring-amber-300 dark:ring-amber-700"
                      : hasSearchMatch
                      ? "bg-amber-50/50 dark:bg-amber-900/10"
                      : "hover:bg-muted/50"
                  )}
                >
                  <a
                    href={getYouTubeTimestampUrl(segment.time)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-shrink-0 text-xs font-mono text-primary/70 hover:text-primary pt-0.5 transition-colors min-w-[3.5rem] text-right"
                    title={`Jump to ${segment.timestamp} on YouTube`}
                  >
                    {segment.timestamp}
                  </a>
                  <p
                    className="text-sm text-foreground leading-relaxed flex-1 highlight-text"
                    dangerouslySetInnerHTML={{ __html: displayText }}
                  />
                </div>
              );
            })}
          </div>
        )}
      </div>

      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="absolute bottom-6 right-6 w-9 h-9 rounded-full bg-primary shadow-lg flex items-center justify-center text-primary-foreground hover:bg-primary/90 transition-all"
        >
          <ChevronUp className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
