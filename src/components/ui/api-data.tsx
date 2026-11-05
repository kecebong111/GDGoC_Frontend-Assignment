"use client";

import { Component, useEffect, useState, type ReactNode } from "react";
import { API_BASE_URL, parseItems, type ApiItem, type Endpoint } from "@/lib/api-response";

type State = { status: "loading" } | { status: "error" } | { status: "success"; items: ApiItem[] };

export function useApiData(endpoint: Endpoint) {
  const [attempt, setAttempt] = useState(0);
  const [state, setState] = useState<State>({ status: "loading" });
  useEffect(() => {
    const controller = new AbortController();
    let active = true;
    const timeout = setTimeout(() => controller.abort(), 10000);
    async function load() {
      try {
        const response = await fetch(`${API_BASE_URL}/${endpoint}`, { signal: controller.signal });
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const items = parseItems(await response.json(), endpoint);
        if (active) setState({ status: "success", items });
      } catch {
        if (active) setState({ status: "error" });
      } finally { clearTimeout(timeout); }
    }
    void load();
    return () => { active = false; clearTimeout(timeout); controller.abort(); };
  }, [endpoint, attempt]);
  return { state, retry: () => { setState({ status: "loading" }); setAttempt(value => value + 1); } };
}

export function ApiStatus({ state, retry, label }: { state: State; retry: () => void; label: string }) {
  if (state.status === "loading") return <SectionLoading label={label} />;
  if (state.status === "error") return <div role="alert" className="my-6 rounded-lg border border-[#dadce0] p-5 text-sm"><p>Unable to load {label}. Please try again.</p><button type="button" onClick={retry} className="mt-3 min-h-11 text-[#1967d2] underline">Try again</button></div>;
  if (!state.items.length) return <p role="status" className="my-6 rounded-lg border border-[#dadce0] p-5 text-sm">No {label} are available yet.</p>;
  return null;
}

export function SectionLoading({ label }: { label: string }) {
  const tall = /track/.test(label);
  return <div role="status" aria-busy="true" className={`mt-8 rounded-lg bg-[#f1f3f4] p-5 text-sm ${tall ? "min-h-[540px]" : "min-h-[280px]"}`}><p>Loading {label}…</p><div aria-hidden="true" className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{[0,1,2].map(index => <div key={index} className={`rounded-xl bg-slate-200 motion-safe:animate-pulse ${tall ? "h-96" : "h-40"}`} />)}</div></div>;
}

export class ApiRenderBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  render() {
    return this.state.failed ? <div role="alert" className="my-6 p-5"><p>This section could not be displayed.</p><button type="button" onClick={() => this.setState({ failed: false })} className="min-h-11 text-[#1967d2] underline">Try displaying again</button></div> : this.props.children;
  }
}
