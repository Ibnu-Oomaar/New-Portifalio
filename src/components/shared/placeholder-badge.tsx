import { Badge } from "@/components/ui/badge";

/** Marks sample content that still needs to be replaced with real information. */
export function PlaceholderBadge({ file }: { file: string }) {
  return (
    <Badge variant="placeholder" title={`Sample content. Edit it in ${file}`}>
      Placeholder
      <span className="sr-only">. Edit this entry in {file}</span>
    </Badge>
  );
}
