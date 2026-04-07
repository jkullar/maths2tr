export interface TranscriptSegment {
  time: number;
  timestamp: string;
  text: string;
}

export interface Video {
  id: string;
  code: string;
  title: string;
  youtubeUrl: string;
  available: boolean;
  unavailableReason?: string;
  segments: TranscriptSegment[];
}

export interface Week {
  key: string;
  label: string;
  topic: string;
  videos: Video[];
}

export interface TranscriptsData {
  weeks: Week[];
  totalVideos: number;
  availableVideos: number;
}

export interface SearchResult {
  video: Video;
  week: Week;
  matchingSegments: Array<TranscriptSegment & { segmentIndex: number }>;
}

export interface CurriculumVideoRef {
  type: string;
  code: string;
  file: string;
  video_url: string;
  timestamp: string;
  deep_link: string;
  examples_count?: number;
}

export interface CurriculumProblem {
  summary: string;
  concept: string;
  timestamp: string;
  deep_link: string;
}

export interface CurriculumPracticeRef {
  type: string;
  code: string;
  file: string;
  video_url: string;
  problems: CurriculumProblem[];
  problems_count: number;
}

export interface CurriculumConcept {
  name: string;
  introduced_in: CurriculumVideoRef;
  practiced_in: CurriculumPracticeRef[];
  is_prerequisite: boolean;
}

export interface CurriculumWeek {
  week: string;
  label: string;
  theme: string;
  concepts: CurriculumConcept[];
}

export interface CurriculumData {
  generated_at: string;
  total_concepts: number;
  total_problems: number;
  weeks: CurriculumWeek[];
}

export interface CourseNote {
  id: string;
  number: number;
  title: string;
  section: string;
  content: string;
}
