// Content dates are "YYYY" or "YYYY-MM" strings (see src/content.config.ts).

// "2025" -> "2025"; "2025-09" -> "Sep 2025".
export function formatDate(value: string): string {
  const [year, month] = value.split("-");
  if (!month) return year;
  const label = new Date(Date.UTC(Number(year), Number(month) - 1)).toLocaleString("en-US", {
    month: "short",
    timeZone: "UTC",
  });
  return `${label} ${year}`;
}

// A missing end means ongoing. Returns undefined when there is no start.
export function formatRange(start?: string, end?: string): string | undefined {
  if (!start) return undefined;
  if (!end) return `${formatDate(start)} – ongoing`;
  if (end === start) return formatDate(start);
  return `${formatDate(start)} – ${formatDate(end)}`;
}
