"use client";
export default function ErrorPage({ reset }: { reset: () => void }) {
  return <section className="wrap section" role="alert"><h1>Something went wrong.</h1><p className="mb-6">The page couldn’t be rendered. Please try again.</p><button className="button" onClick={reset}>Try again</button></section>;
}
