"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { useSearchParams } from "next/navigation";
import { selectedTrackId } from "@/lib/track-link";
import type { ApiItem } from "@/lib/api-response";
import { filterSavedTracks } from "@/lib/saved-tracks";
import { useSavedTracks } from "./use-saved-tracks";
import { indexTrackCards } from "@/lib/track-cards";

export type TrackCardSlot = { id: string; content: ReactNode };
export type TracksBrowserProps = { tracks: ApiItem[]; cards: TrackCardSlot[] };

export default function TracksBrowser({ tracks, cards }: TracksBrowserProps) {
  const requested = useSearchParams().get("track");
  const controls = useRef<HTMLDivElement>(null);
  const selected = selectedTrackId(tracks, requested);
  const [view, setView] = useState<{ query: string | null; filter: "all" | "saved" }>({ query: requested, filter: "all" });
  const filter = view.query === requested ? view.filter : "all";
  if (view.query !== requested) setView({ query: requested, filter: "all" });
  function setFilter(filter: "all" | "saved") { setView({ query: requested, filter }); }
  useEffect(() => {
    if (selected) controls.current?.closest("section")?.scrollIntoView({ block: "start" });
  }, [selected]);
  const { ids, ready, notice, toggle } = useSavedTracks();
  const cardsById = indexTrackCards(cards);
  const saved = filterSavedTracks(tracks, ids);
  const visible = new Set((filter === "saved" ? saved : tracks).map(track => track.id));

  return <>
    <div ref={controls} className="mt-8 flex flex-wrap items-center gap-2" role="group" aria-label="Filter learning tracks">
      {(["all", "saved"] as const).map(value => <button key={value} type="button" disabled={!ready} aria-pressed={filter === value} onClick={() => setFilter(value)} className={`min-h-11 rounded-full border px-4 text-sm font-medium focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1967d2] disabled:cursor-wait ${filter === value ? "border-transparent bg-[#eaf2ff] text-[#1967d2]" : "border-[#dadce0] text-[#70757a] hover:border-[#1967d2]"}`}>{value === "all" ? "All tracks" : `Saved tracks (${ready ? saved.length : "…"})`}</button>)}
    </div>
    {notice && <p role="status" className="mt-3 text-sm text-[#70757a]">{notice}</p>}
    {filter === "saved" && saved.length === 0 ? <div role="status" className="mt-8 rounded-[26px] border border-[#dfe2e7] p-7"><h3 className="text-lg">No saved tracks to show</h3><p className="mt-2 text-sm text-[#70757a]">Save a track from All tracks to find it here later.</p><button type="button" className="mt-4 min-h-11 text-sm font-medium text-[#1967d2] underline" onClick={() => setFilter("all")}>Back to All tracks</button></div> : <div className="mt-8 grid gap-6 lg:grid-cols-3">{tracks.map(track => visible.has(track.id) && <div data-selected-track={selected === track.id ? track.id : undefined} className={`relative min-w-0 ${selected === track.id ? "rounded-[26px] ring-2 ring-[#1967d2] ring-offset-4" : ""}`} key={track.id}>{selected === track.id && <span className="absolute top-3 left-3 z-20 rounded-full bg-[#eaf2ff] px-3 py-2 text-xs font-medium text-[#1967d2]">Selected track</span>}{cardsById.get(track.id)?.content}<button type="button" disabled={!ready} aria-label={`${ids.includes(track.id) ? "Unsave" : "Save"} ${track.title}`} aria-pressed={ids.includes(track.id)} onClick={() => toggle(track.id)} className="absolute top-3 right-3 z-20 inline-flex min-h-11 items-center gap-2 rounded-full border border-[#dadce0] bg-white px-3 text-xs font-medium text-[#1967d2] hover:bg-[#eaf2ff] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1967d2] disabled:cursor-wait"><svg aria-hidden="true" viewBox="0 0 24 24" className="size-4" fill={ids.includes(track.id) ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.7"><path d="M6 3h12v18l-6-4-6 4V3Z" /></svg>{ids.includes(track.id) ? "Saved" : "Save track"}</button></div>)}</div>}
  </>;
}
