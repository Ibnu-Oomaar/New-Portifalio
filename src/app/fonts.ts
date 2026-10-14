import localFont from "next/font/local";

/**
 * Bricolage Grotesque (variable: weight 200–800, width 75–100).
 * The width axis powers the condensed display headlines; the normal width is used for body copy.
 * Self-hosted from src/assets/fonts, so the build never depends on a network font request.
 */
export const bricolage = localFont({
  src: "../assets/fonts/bricolage-grotesque-latin-wdth-normal.woff2",
  variable: "--font-bricolage",
  display: "swap",
  weight: "200 800",
  declarations: [{ prop: "font-stretch", value: "75% 100%" }],
});

/** Instrument Serif, used for editorial statements and quotations. */
export const instrument = localFont({
  src: [
    {
      path: "../assets/fonts/instrument-serif-latin-400-normal.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../assets/fonts/instrument-serif-latin-400-italic.woff2",
      weight: "400",
      style: "italic",
    },
  ],
  variable: "--font-instrument",
  display: "swap",
});
