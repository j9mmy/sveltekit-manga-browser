type Variant = "secondary" | "default" | "success" | "destructive" | "outline";

type Status = "planning" | "reading" | "completed" | "dropped";

export type StatusButtonProps = {
  status: Status;
  text: string;
  alt_text: string;
  variant: Variant;
};

export type MangaListEntry = {
  status: Status | null;
  score: number | null;
};
