"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";

export default function RetrySection() {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  return <button type="button" disabled={pending} onClick={() => startTransition(() => router.refresh())} className="text-link min-h-11">{pending ? "Retrying…" : "Try again"}</button>;
}
