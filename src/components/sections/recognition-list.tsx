import { ArrowUpRight } from "lucide-react";

import type { RecognitionEntry } from "@/content/types";
import { isConfiguredUrl } from "@/lib/utils";
import { PlaceholderBadge } from "@/components/shared/placeholder-badge";

interface RecognitionListProps {
  entries: RecognitionEntry[];
  source: string;
  emptyMessage: string;
}

/** Credentials and milestones as a ruled ledger: year, title, issuer, with an optional verify link. */
export function RecognitionList({ entries, source, emptyMessage }: RecognitionListProps) {
  if (!entries.length) {
    return <p className="border-t border-line pt-6 text-ink-soft">{emptyMessage}</p>;
  }

  return (
    <ul className="border-t border-line">
      {entries.map((entry) => (
        <li
          key={entry.id}
          className="grid gap-3 border-b border-line py-8 md:grid-cols-[8rem_1.2fr_1fr] md:gap-10"
        >
          <p className="display-condensed text-title text-ink-soft">{entry.year}</p>
          <div className="flex flex-col gap-3">
            <h3 className="display-condensed text-title text-ink">{entry.title}</h3>
            <p className="font-serif text-xl italic text-ink-soft">{entry.issuer}</p>
            {entry.placeholder ? (
              <div>
                <PlaceholderBadge file={source} />
              </div>
            ) : null}
          </div>
          <div className="flex flex-col items-start gap-4">
            <p className="text-ink-soft">{entry.summary}</p>
            {isConfiguredUrl(entry.url) ? (
              <a
                href={entry.url}
                target="_blank"
                rel="noopener noreferrer"
                className="prose-link inline-flex items-center gap-1.5 text-ink"
              >
                Verify credential
                <ArrowUpRight className="size-4" aria-hidden="true" />
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            ) : null}
          </div>
        </li>
      ))}
    </ul>
  );
}
