import { Suspense, type ReactNode } from "react";
import { getItems, type Endpoint, type Item } from "@/lib/api";
import RetrySection from "./retry-section";
import { ApiRenderBoundary, SectionLoading } from "./api-data";
import { connection } from "next/server";

async function DataContent({ endpoint, render }: { endpoint: Endpoint; render?: (items: Item[]) => ReactNode }) {
  await connection();
  let items: Item[];
  try { items = await getItems(endpoint); }
  catch (error) {
    console.error(`Unable to load ${endpoint}`, error);
    return <div role="alert" className="mt-8 rounded-xl border border-red-200 bg-red-50 p-6"><h3>We couldn’t load this section.</h3><p>Please try again. No placeholder data is being shown.</p><RetrySection /></div>;
  }
  if (!items.length) return <p className="mt-8 rounded-xl border border-slate-200 p-6">No {endpoint} are available yet.</p>;
  if (render) return render(items);
  if (endpoint === "faqs") return <div className="divide-y divide-slate-200">{items.filter(item => ["no-experience", "major-requirement", "find-track"].includes(item.id)).map(item => <details key={item.id} open className="py-5"><summary className="min-h-11 text-[20px] font-semibold">{item.title}</summary><p className="mt-3 max-w-3xl text-base">{item.description}</p></details>)}</div>;
  return <div className="mt-8 grid gap-6 sm:grid-cols-2">{items.map((item, index) => <article key={item.id} className="rounded-2xl border border-slate-200 bg-white p-6">{endpoint === "journey" && <p className="mb-4 text-sm font-semibold text-blue-700">Step {index + 1}</p>}<h3>{item.title}</h3><p>{item.description}</p></article>)}</div>;
}

export function RemoteContent(props: { endpoint: Endpoint; render?: (items: Item[]) => ReactNode }) {
  return <ApiRenderBoundary><Suspense fallback={<SectionLoading label={props.endpoint} />}><DataContent {...props} /></Suspense></ApiRenderBoundary>;
}
