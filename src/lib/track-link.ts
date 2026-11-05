export function trackLink(id: string, destination = "/overview"): string {
  const url = new URL(destination, "https://gdgoc.local");
  if (url.origin !== "https://gdgoc.local" || url.pathname !== "/overview") {
    throw new Error("Invalid track destination");
  }
  url.searchParams.set("track", id);
  url.hash = "tracks";
  return `${url.pathname}${url.search}${url.hash}`;
}

export function selectedTrackId(tracks: readonly { id: string }[], requested: string | null): string | null {
  return tracks.some(track => track.id === requested) ? requested : null;
}
