"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { parseSavedIds, SAVED_TRACKS_KEY, toggleSavedId } from "@/lib/saved-tracks";

export function useSavedTracks() {
  const [ids, setIds] = useState<string[]>([]);
  const [ready, setReady] = useState(false);
  const [notice, setNotice] = useState("");
  const current = useRef<string[]>([]);
  const persistent = useRef(true);

  useEffect(() => {
    let active = true;
    function read() {
      try {
        current.current = parseSavedIds(window.localStorage.getItem(SAVED_TRACKS_KEY));
        setIds(current.current);
      } catch {
        persistent.current = false;
        setNotice("Saved tracks could not be loaded. Changes will only last for this session.");
      }
    }
    queueMicrotask(() => { if (active) { read(); setReady(true); } });
    function sync(event: StorageEvent) {
      if (event.key !== SAVED_TRACKS_KEY && event.key !== null) return;
      try {
        if (event.storageArea !== window.localStorage) return;
        current.current = parseSavedIds(event.key === null ? null : event.newValue);
        setIds(current.current);
      } catch {
        persistent.current = false;
        setNotice("Saved tracks could not be synchronized. Changes will only last for this session.");
      }
    }
    window.addEventListener("storage", sync);
    return () => { active = false; window.removeEventListener("storage", sync); };
  }, []);

  const toggle = useCallback((id: string) => {
    if (!ready) return;
    let previous = current.current;
    if (persistent.current) {
      try { previous = parseSavedIds(window.localStorage.getItem(SAVED_TRACKS_KEY)); }
      catch { persistent.current = false; }
    }
    const next = toggleSavedId(previous, id);
    current.current = next;
    setIds(next);
    if (persistent.current) {
      try { window.localStorage.setItem(SAVED_TRACKS_KEY, JSON.stringify(next)); }
      catch { persistent.current = false; }
    }
    if (!persistent.current) setNotice("Storage is unavailable. Your choices work here but will not be saved after reload.");
  }, [ready]);

  return { ids, ready, notice, toggle };
}
