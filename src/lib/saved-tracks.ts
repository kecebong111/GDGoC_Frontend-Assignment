export const SAVED_TRACKS_KEY = "gdgoc:saved-tracks:v1";

export function parseSavedIds(raw: string | null): string[] {
  if (raw === null) return [];
  const value: unknown = JSON.parse(raw);
  if (!Array.isArray(value) || !value.every((id: unknown) => typeof id === "string" && id.trim().length > 0)) {
    throw new Error("Invalid saved tracks");
  }
  return [...new Set<string>(value)];
}

export function toggleSavedId(ids: readonly string[], id: string): string[] {
  return ids.includes(id) ? ids.filter(saved => saved !== id) : [...ids, id];
}

export function filterSavedTracks<T extends { id: string }>(tracks: readonly T[], ids: readonly string[]): T[] {
  const saved = new Set(ids);
  return tracks.filter(track => saved.has(track.id));
}
