import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { RemoteContent } from "@/components/ui/sections";
import TracksBrowser from "./tracks-browser";
import { trackLink } from "@/lib/track-link";
import Eyebrow from "@/components/ui/eyebrow";

import { CONTAINER, HEADING, BODY } from "@/components/ui/page-styles";

type IconName =
  | "arrow"
  | "down"
  | "book"
  | "code"
  | "users"
  | "bulb";

type TrackKind = "research" | "design" | "development";

type DataRecord = Record<string, unknown>;

function asRecord(value: unknown): DataRecord {
  if (
    value !== null &&
    typeof value === "object" &&
    !Array.isArray(value)
  ) {
    return value as DataRecord;
  }

  return {};
}

function readText(item: DataRecord, ...keys: string[]): string {
  for (const key of keys) {
    const value = item[key];

    if (typeof value === "string" && value.trim()) {
      return value.trim();
    }
  }

  return "";
}

function readSkills(item: DataRecord): string {
  if (Array.isArray(item.skills)) {
    return item.skills
      .filter((skill): skill is string => typeof skill === "string")
      .join(" · ");
  }

  return readText(item, "skills");
}

function trackKind(item: DataRecord, index = 0): TrackKind {
  const identity = [
    readText(item, "id"),
    readText(item, "name", "title"),
  ]
    .join(" ")
    .toLowerCase();

  if (identity.includes("research") || identity.includes("discovery")) {
    return "research";
  }

  if (identity.includes("design") || identity.includes("creativ")) {
    return "design";
  }

  if (identity.includes("develop")) {
    return "development";
  }

  return (["research", "design", "development"] as const)[index % 3];
}

const trackVisuals = {
  research: {
    src: "/images/track-research.png",
    background: "bg-[#eaf2ff]",
    imageWidth: 342,
    imageHeight: 443,
    fallbackTitle: "Research & discovery",
    fallbackTagline: "Explore the why",
  },
  design: {
    src: "/images/track-design.png",
    background: "bg-[#fff7df]",
    imageWidth: 337,
    imageHeight: 389,
    fallbackTitle: "Design & creativity",
    fallbackTagline: "Make it meaningful",
  },
  development: {
    src: "/images/track-development.png",
    background: "bg-[#eaf5ed]",
    imageWidth: 347,
    imageHeight: 452,
    fallbackTitle: "Development",
    fallbackTagline: "Bring ideas to life",
  },
} satisfies Record<
  TrackKind,
  {
    src: string;
    background: string;
    imageWidth: number;
    imageHeight: number;
    fallbackTitle: string;
    fallbackTagline: string;
  }
>;

const formatOrder = [
  "study-groups",
  "hands-on-workshops",
  "project-circles",
  "knowledge-sharing",
];

const formatVisuals: Record<
  string,
  {
    icon: IconName;
    background: string;
    bestFor: string;
  }
> = {
  "study-groups": {
    icon: "book",
    background: "bg-[#eaf2ff]",
    bestFor: "Learning the fundamentals",
  },
  "hands-on-workshops": {
    icon: "code",
    background: "bg-[#eaf5ed]",
    bestFor: "Trying something new",
  },
  "project-circles": {
    icon: "users",
    background: "bg-[#fff7df]",
    bestFor: "Putting skills into practice",
  },
  "knowledge-sharing": {
    icon: "bulb",
    background: "bg-[#fdeeea]",
    bestFor: "Exchanging perspectives",
  },
};

const outcomes = [
  {
    name: "Research & discovery",
    practice: "Listening, problem framing, and testing assumptions",
    outcome: "A research insight and a focused problem brief",
  },
  {
    name: "Design & creativity",
    practice: "Ideation, user flows, and prototype feedback",
    outcome: "An interactive prototype and a design story",
  },
  {
    name: "Development",
    practice: "Coding, testing, and connecting tools",
    outcome: "A working demo with a clear explanation",
  },
];

function Icon({
  name = "arrow",
  className = "h-5 w-5",
}: {
  name?: IconName;
  className?: string;
}) {
  const paths: Record<IconName, ReactNode> = {
    arrow: <path d="M4 12h16m-6-6 6 6-6 6" />,

    down: <path d="M12 4v16m-6-6 6 6 6-6" />,

    book: (
      <>
        <path d="M12 5C9 3 5 3 3 4v15c3-1 6-1 9 1 3-2 6-2 9-1V4c-3-1-6-1-9 1Z" />
        <path d="M12 5v15" />
      </>
    ),

    code: <path d="m8 6-6 6 6 6m8-12 6 6-6 6" />,

    users: (
      <>
        <circle cx="9" cy="7" r="3" />
        <path d="M3 20v-2a6 6 0 0 1 12 0v2H3Zm13-16a3 3 0 0 1 0 6m2 4a5 5 0 0 1 3 4v2h-3" />
      </>
    ),

    bulb: (
      <>
        <path d="M8 16c0-3-3-4-3-8a7 7 0 0 1 14 0c0 4-3 5-3 8H8Z" />
        <path d="M9 20h6m-5 3h4" />
      </>
    ),
  };

  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      {paths[name]}
    </svg>
  );
}

function Action({
  href,
  children,
  variant = "link",
  className = "",
}: {
  href: string;
  children: ReactNode;
  variant?: "link" | "primary";
  className?: string;
}) {
  const appearance =
    variant === "primary"
      ? "min-h-[52px] rounded-md border border-transparent bg-[#4285f4] px-6 text-white hover:bg-[#1967d2]"
      : "text-[#1967d2] hover:underline underline-offset-4";

  return (
    <Link
      href={href}
      className={`inline-flex items-center justify-center gap-4 text-sm font-medium leading-5 ${appearance} ${className}`}
    >
      {children}
      <Icon className="h-[18px] w-[18px] shrink-0" />
    </Link>
  );
}

function TrackArtwork({ kind }: { kind: TrackKind }) {
  const visual = trackVisuals[kind];

  return (
    <div
      className={`relative isolate aspect-[400/232] overflow-visible ${visual.background}`}
    >
      <div
        className="track-art-layer pointer-events-none absolute left-0 top-0"
        style={{
          width: `${(visual.imageWidth / 400) * 100}%`,
          height: `${(visual.imageHeight / 232) * 100}%`,
        }}
      >
        <Image
          src={visual.src}
          alt=""
          fill
          unoptimized
          className="object-contain"
        />
      </div>
    </div>
  );
}

function OverviewHeroArtwork() {
  return (
    <div
      className="relative mx-auto aspect-[300/280] w-full max-w-[300px] lg:h-[280px]"
      aria-hidden="true"
    >
      <div
        className="absolute"
        style={{
          left: "-30%",
          top: "-5.714%",
          width: "128%",
          height: "150.357%",
        }}
      >
        <Image
          src="/images/hero-research.png"
          alt=""
          fill
          unoptimized
          priority
          className="object-contain"
        />
      </div>
    </div>
  );
}

export default function OverviewPage() {
  return (
    <div className="bg-white text-[#242424]">
      <section
        aria-labelledby="overview-heading"
        className="overflow-hidden py-14 lg:py-16"
      >
        <div
          className={`${CONTAINER} grid min-w-0 grid-cols-[minmax(0,1fr)] items-center gap-8 lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-0`}
        >
          <div className="relative z-10">
            <Eyebrow>
              Overview · Programs & learning tracks
            </Eyebrow>

            <h1
              id="overview-heading"
              className="mt-6 text-[44px] font-bold leading-[1.06] tracking-[-0.035em] sm:text-[60px] xl:text-[72px]"
            >
              Find your spark.
              <br />
              <span className="text-[#1967d2]">
                Build your own path.
              </span>
            </h1>

            <p className="mt-7 max-w-[930px] text-lg leading-8 text-[#70757a] xl:text-[21px]">
              Explore how research, creativity, and development connect.
              Start with one interest. Grow through practice and the
              people around you.
            </p>
          </div>

          <OverviewHeroArtwork />
        </div>
      </section>

      <nav
        aria-label="Overview sections"
        className="relative border-y border-[#dfe2e7] bg-white"
      >
        <div
          className={`${CONTAINER} flex flex-wrap items-center gap-x-12 gap-y-4 py-5`}
        >
          {[
            { label: "Learning tracks", id: "tracks" },
            { label: "Learning formats", id: "formats" },
            { label: "Your learning journey", id: "journey" },
            { label: "Find a starting point", id: "starting-point" },
          ].map((item, index) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`inline-flex items-center gap-3 text-sm leading-5 hover:text-[#1967d2] ${
                index === 0
                  ? "font-semibold text-[#1967d2]"
                  : "text-[#70757a]"
              }`}
            >
              {item.label}

              <Icon
                name="down"
                className="h-4 w-4 text-[#4285f4]"
              />
            </a>
          ))}
        </div>
      </nav>

      <section
        id="tracks"
        aria-labelledby="tracks-heading"
        className="scroll-mt-8 py-20"
      >
        <div className={CONTAINER}>
          <Eyebrow>Explore your interests</Eyebrow>

          <h2
            id="tracks-heading"
            className={`${HEADING} mt-6 max-w-[850px]`}
          >
            Three ways in. Plenty of ways
            <br className="hidden lg:block" /> forward.
          </h2>

          <p className={`${BODY} mt-5`}>
            These pathways are starting points, not boxes. Follow one
            deeply or bring different skills together.
          </p>

          <RemoteContent
            endpoint="tracks"
            render={(items) => {
              const order: TrackKind[] = [
                "research",
                "design",
                "development",
              ];

              const sorted = [...items].sort((a, b) => {
                const first = trackKind(asRecord(a));
                const second = trackKind(asRecord(b));

                return order.indexOf(first) - order.indexOf(second);
              });

              return (
                <TracksBrowser tracks={sorted} cards={sorted.map((raw, index) => {
                    const item = asRecord(raw);
                    const kind = trackKind(item, index);
                    const visual = trackVisuals[kind];

                    const title =
                      readText(item, "name", "title") ||
                      visual.fallbackTitle;

                    const tagline =
                      readText(item, "tagline") ||
                      visual.fallbackTagline;

                    const description = readText(item, "description");
                    const skills = readSkills(item);

                    const href = trackLink(raw.id, raw.explore_link);

                    return { id: raw.id, content: (
                      <article
                        key={readText(item, "id") || kind}
                        className="overflow-hidden rounded-[26px] border border-[#dfe2e7] bg-white"
                      >
                        <TrackArtwork kind={kind} />

                        <div className="relative z-10 px-7 pb-7 pt-6">
                          <p className="text-[10px] font-semibold uppercase leading-4 text-[#1967d2]">
                            {tagline}
                          </p>

                          <h3 className="mt-4 text-[27px] font-semibold leading-8 tracking-[-0.025em]">
                            {title}
                          </h3>

                          <p className="mt-4 text-base leading-6 text-[#70757a]">
                            {description}
                          </p>

                          {skills && (
                            <p className="mt-5 border-t border-[#e9ecef] pt-4 text-[11px] leading-5 text-[#70757a]">
                              {skills}
                            </p>
                          )}

                          <Action href={href} className="mt-4">
                            Explore this track
                          </Action>
                        </div>
                      </article>
                    ) };
                  })} />
              );
            }}
          />

          <div className="mt-20">
            <h3 className="text-[28px] font-bold leading-tight tracking-[-0.03em] lg:text-[36px]">
              From an interest to something you can show.
            </h3>

            <div
              role="region"
              aria-label="Learning track outcomes"
              tabIndex={0}
              className="mt-7 overflow-x-auto rounded-2xl border border-[#dfe2e7]"
            >
              <table className="w-full min-w-[760px] border-collapse text-left">
                <thead className="bg-[#f1f3f4] text-xs text-[#70757a]">
                  <tr>
                    <th
                      scope="col"
                      className="w-[23%] px-7 py-5 font-medium"
                    >
                      Pathway
                    </th>
                    <th
                      scope="col"
                      className="w-[38%] px-7 py-5 font-medium"
                    >
                      What you can practice
                    </th>
                    <th
                      scope="col"
                      className="px-7 py-5 font-medium"
                    >
                      A possible outcome
                    </th>
                  </tr>
                </thead>

                <tbody className="text-base leading-6">
                  {outcomes.map((item) => (
                    <tr
                      key={item.name}
                      className="border-t border-[#dfe2e7]"
                    >
                      <th
                        scope="row"
                        className="px-7 py-7 font-medium"
                      >
                        {item.name}
                      </th>

                      <td className="px-7 py-7 text-[#70757a]">
                        {item.practice}
                      </td>

                      <td className="px-7 py-7 text-[#70757a]">
                        {item.outcome}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="mt-8 text-xs leading-5 text-[#70757a]">
              Illustrative learning outcomes. Topics and opportunities
              are shared through community updates.
            </p>
          </div>
        </div>
      </section>

      <section
        id="formats"
        aria-labelledby="formats-heading"
        className="scroll-mt-8 bg-[#f1f3f4] py-20"
      >
        <div className={CONTAINER}>
          <Eyebrow>Ways to learn</Eyebrow>

          <h2
            id="formats-heading"
            className={`${HEADING} mt-6 max-w-[960px]`}
          >
            The format changes. The curiosity
            <br className="hidden lg:block" /> stays.
          </h2>

          <p className={`${BODY} mt-5`}>
            Explore the kinds of experiences that help you move from
            understanding to doing.
          </p>

          <RemoteContent
            endpoint="formats"
            render={(items) => {
              const sorted = [...items].sort((a, b) => {
                const first = formatOrder.indexOf(
                  readText(asRecord(a), "id"),
                );
                const second = formatOrder.indexOf(
                  readText(asRecord(b), "id"),
                );

                return (
                  (first === -1 ? 999 : first) -
                  (second === -1 ? 999 : second)
                );
              });

              return (
                <div className="mt-10 grid gap-6 lg:grid-cols-2">
                  {sorted.map((raw, index) => {
                    const item = asRecord(raw);
                    const id = readText(item, "id");

                    const visual = formatVisuals[id] || {
                      icon: "book" as const,
                      background: "bg-[#eaf2ff]",
                      bestFor: "",
                    };

                    const bestFor =
                      readText(item, "best_for") || visual.bestFor;

                    return (
                      <article
                        key={id || index}
                        className="flex items-start gap-6 rounded-[26px] bg-white p-7"
                      >
                        <div
                          className={`grid h-[52px] w-[52px] shrink-0 place-items-center rounded-[14px] text-[#4285f4] ${visual.background}`}
                        >
                          <Icon
                            name={visual.icon}
                            className="h-6 w-6"
                          />
                        </div>

                        <div className="min-w-0">
                          <h3 className="text-[26px] font-semibold leading-8 tracking-[-0.025em]">
                            {readText(item, "title", "name")}
                          </h3>

                          <p className="mt-3 text-base leading-6 text-[#70757a]">
                            {readText(item, "description")}
                          </p>

                          {bestFor && (
                            <p className="mt-3 text-xs font-medium leading-5 text-[#1967d2]">
                              Best for · {bestFor}
                            </p>
                          )}
                        </div>
                      </article>
                    );
                  })}
                </div>
              );
            }}
          />
        </div>
      </section>

      <section
        id="journey"
        aria-labelledby="journey-heading"
        className="scroll-mt-8 py-20"
      >
        <div className={CONTAINER}>
          <Eyebrow>Progress, not perfection</Eyebrow>

          <h2 id="journey-heading" className={`${HEADING} mt-6`}>
            A journey you can keep building on.
          </h2>

          <RemoteContent
            endpoint="journey"
            render={(items) => (
              <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                {items.map((raw, index) => {
                  const item = asRecord(raw);

                  return (
                    <article key={readText(item, "id") || index}>
                      <span className="text-[42px] font-semibold leading-none tracking-[-0.03em] text-[#1a73e8]">
                        {String(index + 1).padStart(2, "0")}
                      </span>

                      <h3 className="mt-6 border-t border-[#dfe2e7] pt-5 text-2xl font-semibold leading-8 tracking-[-0.02em]">
                        {readText(item, "title", "name")}
                      </h3>

                      <p className="mt-4 text-base leading-6 text-[#70757a]">
                        {readText(item, "description")}
                      </p>
                    </article>
                  );
                })}
              </div>
            )}
          />
        </div>
      </section>

      <section
        id="starting-point"
        aria-labelledby="starting-heading"
        className="scroll-mt-8 bg-[#fff7df] py-14"
      >
        <div
          className={`${CONTAINER} grid items-center gap-10 lg:grid-cols-[460px_minmax(0,1fr)] lg:gap-16`}
        >
          <div>
            <Eyebrow>Start where you are</Eyebrow>

            <h2
              id="starting-heading"
              className="mt-5 text-[30px] font-bold leading-[1.12] tracking-[-0.03em] lg:text-[36px]"
            >
              New to tech?
              <br />
              That’s a starting point,
              <br />
              too.
            </h2>
          </div>

          <div>
            <p className={BODY}>
              You don’t need a finished portfolio or the perfect track
              choice. Pick a topic you’re curious about. If you’re
              unsure, tell us what interests you and we can start a
              conversation.
            </p>

            <Action href="/contact" className="mt-5">
              Ask about getting started
            </Action>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className={CONTAINER}>
          <div className="flex flex-col justify-between gap-8 rounded-[32px] bg-[#eaf2ff] px-7 py-10 md:px-12 lg:min-h-[270px] lg:flex-row lg:items-center">
            <div>
              <Eyebrow>Your next chapter</Eyebrow>

              <h2 className="mt-5 text-[34px] font-bold leading-[1.1] tracking-[-0.03em] lg:text-[46px]">
                Bring your curiosity.
                <br />
                We’ll build from there.
              </h2>

              <p className={`${BODY} mt-5`}>
                Find a learning track, meet a collaborator, or start a
                conversation.
              </p>
            </div>

            <div className="flex shrink-0 flex-col items-start gap-4">
              <Action href="/overview" variant="primary">
                Explore the overview
              </Action>

              <Action href="/contact">
                Talk to the community
              </Action>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
