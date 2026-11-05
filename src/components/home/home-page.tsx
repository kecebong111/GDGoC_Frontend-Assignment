"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, type ReactNode } from "react";
import HeroVisual from "@/components/home/hero-visual";
import Eyebrow from "@/components/ui/eyebrow";
import { ApiRenderBoundary, ApiStatus, useApiData } from "@/components/ui/api-data";

import { CONTAINER, HEADING, BODY } from "@/components/ui/page-styles";

const referenceTracks = [
  {
    id: "research",
    title: "Research & discovery",
    eyebrow: "Explore the why",
    description:
      "Ask better questions, understand people, and turn insight into a clear problem worth solving.",
    skills: "Problem framing · User research · Product thinking",
    artwork: "research",
  },
  {
    id: "design",
    title: "Design & creativity",
    eyebrow: "Make it meaningful",
    description:
      "Translate ideas into thoughtful experiences, from a first sketch to a prototype people can use.",
    skills: "UI/UX · Visual storytelling · Prototyping",
    artwork: "design",
  },
  {
    id: "development",
    title: "Development",
    eyebrow: "Bring ideas to life",
    description:
      "Learn the tools, write the code, and build useful things with people who enjoy figuring it out.",
    skills: "Web & mobile · Cloud · AI foundations",
    artwork: "development",
  },
] as const;

const learningCards = [
  {
    title: "Study together",
    description:
      "Work through foundations in peer learning sessions. Bring your questions; leave with a next step.",
    label: "Study groups & guided practice",
    icon: "book",
  },
  {
    title: "Try it hands-on",
    description:
      "Explore a tool or technique in a workshop, then put it to work in a small experiment.",
    label: "Workshops & technical sessions",
    icon: "code",
  },
  {
    title: "Share the process",
    description:
      "Exchange feedback, explain your decisions, and learn from different ways of thinking.",
    label: "Project circles & sharing sessions",
    icon: "users",
  },
] as const;

const steps = [
  {
    title: "Follow your curiosity",
    description:
      "Explore the tracks and find a topic you want to understand better.",
  },
  {
    title: "Learn alongside others",
    description:
      "Join a learning opportunity, ask a question, and share your perspective.",
  },
  {
    title: "Turn learning into action",
    description:
      "Practice through a project, exchange feedback, and pass something on.",
  },
];

const referenceFaqs = [
  {
    question: "Do I need to know how to code?",
    answer:
      "No. Start with an interest in technology and a willingness to learn. Research and design are part of the journey, too.",
  },
  {
    question: "Is this only for computer science students?",
    answer:
      "Different disciplines bring different perspectives. Explore the overview to find a starting point that fits your interests.",
  },
  {
    question: "How can I find learning opportunities?",
    answer:
      "Keep an eye on @gdgoc.ugm for community updates. You can also use the contact page to ask about getting involved.",
  },
];

type IconName =
  | "arrow"
  | "book"
  | "code"
  | "users"
  | "search"
  | "palette"
  | "chevron";

function Icon({
  name = "arrow",
  className = "h-5 w-5",
}: {
  name?: IconName;
  className?: string;
}) {
  const paths: Record<IconName, ReactNode> = {
    arrow: <path d="M4 12h16m-6-6 6 6-6 6" />,

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

    search: (
      <>
        <circle cx="14" cy="10" r="7" />
        <path d="m9 15-7 7" />
      </>
    ),

    palette: (
      <>
        <path d="M12 3a9 9 0 1 0 0 18c3 0 3-3 1-4-1-1 0-3 2-3h2c6 0 5-11-5-11Z" />
        <circle cx="7" cy="10" r="1" />
        <circle cx="10" cy="6" r="1" />
        <circle cx="15" cy="7" r="1" />
      </>
    ),

    chevron: <path d="m5 9 7 7 7-7" />,
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
  variant?: "link" | "primary" | "outline";
  className?: string;
}) {
  const styles = {
    link: "text-[#1967d2] hover:underline underline-offset-4",
    primary:
      "min-h-[52px] rounded-md border border-transparent bg-[#4285f4] px-6 text-white hover:bg-[#1967d2]",
    outline:
      "min-h-[52px] rounded-md border border-[#dadce0] bg-white px-6 text-[#1967d2] hover:bg-[#f8faff]",
  };

  return (
    <Link
      href={href}
      className={`inline-flex items-center justify-center gap-4 text-sm font-medium leading-5 ${styles[variant]} ${className}`}
    >
      {children}
      <Icon className="h-[18px] w-[18px] shrink-0" />
    </Link>
  );
}

function GoogleDots({ count = 4 }: { count?: 3 | 4 }) {
  const colors = ["#ea4335", "#fbbc04", "#34a853", "#4285f4"];

  return (
    <span
      className="inline-flex shrink-0 items-center gap-[3px]"
      aria-hidden="true"
    >
      {colors.slice(0, count).map((color) => (
        <span
          key={color}
          className="h-2.5 w-2.5 rounded-full"
          style={{ backgroundColor: color }}
        />
      ))}
    </span>
  );
}

type ArtworkKind = "research" | "design" | "development";

const artworkAssets: Record<ArtworkKind, string> = {
  research: "/images/track-research.png",
  design: "/images/track-design.png",
  development: "/images/track-development.png",
};

const artworkBackgrounds: Record<ArtworkKind, string> = {
  research: "bg-[#eaf2ff]",
  design: "bg-[#fff7df]",
  development: "bg-[#eaf5ed]",
};

const artworkGeometry = {
  research: {
    imageWidth: 342,
    imageHeight: 443,
  },
  design: {
    imageWidth: 337,
    imageHeight: 389,
  },
  development: {
    imageWidth: 347,
    imageHeight: 452,
  },
} satisfies Record<
  ArtworkKind,
  {
    imageWidth: number;
    imageHeight: number;
  }
>;

const fallbackIcons: Record<ArtworkKind, IconName> = {
  research: "search",
  design: "palette",
  development: "code",
};

function Artwork({
  kind,
  className = "",
}: {
  kind: ArtworkKind;
  className?: string;
}) {
  const [failed, setFailed] = useState(false);
  const geometry = artworkGeometry[kind];

  return (
    <div
      className={`relative isolate aspect-[400/232] overflow-visible ${artworkBackgrounds[kind]} ${className}`}
    >
      {!failed ? (
        <div
          className="track-art-layer pointer-events-none absolute left-0 top-0"
          style={{
            width: `${(geometry.imageWidth / 400) * 100}%`,
            height: `${(geometry.imageHeight / 232) * 100}%`,
          }}
        >
          <Image
            src={artworkAssets[kind]}
            alt=""
            fill
            unoptimized
            className="object-contain"
            onError={() => setFailed(true)}
          />
        </div>
      ) : (
        <div
          className="absolute inset-0 grid place-items-center"
          aria-hidden="true"
        >
          <Icon
            name={fallbackIcons[kind]}
            className="h-20 w-20 text-[#4285f4]"
          />
        </div>
      )}
    </div>
  );
}

export default function HomePage() {
  const trackData = useApiData("tracks");
  const faqData = useApiData("faqs");
  const tracks = trackData.state.status === "success" ? trackData.state.items.map(item => ({
    id: item.id,
    title: item.title,
    eyebrow: item.tagline,
    description: item.description,
    skills: item.skills.join(" · "),
    artwork: referenceTracks.find(track => item.id.startsWith(track.id))?.artwork ?? "development",
  })) : [];
  const faqs = faqData.state.status === "success" ? faqData.state.items.slice(0, referenceFaqs.length).map(item => ({ question: item.title, answer: item.description })) : [];
  return (
    <div className="bg-white text-[#242424]">
      <section
        aria-labelledby="home-heading"
        className="py-12 lg:pb-16 lg:pt-[72px]"
      >
        <div className="mx-auto grid w-[calc(100%-48px)] max-w-[1312px] items-center gap-10 lg:grid-cols-2 lg:gap-16 xl:grid-cols-[minmax(0,1fr)_620px]">
          <div className="lg:pl-8">
            <Eyebrow>GDGoC UGM · 2026/2027</Eyebrow>

            <h1
              id="home-heading"
              className="mt-6 text-[44px] font-bold leading-[1.04] tracking-[-0.045em] sm:text-[64px] xl:text-[80px]"
            >
              Big ideas.
              <br />
              <span className="text-[#1967d2]">Built together.</span>
            </h1>

            <p className="mt-8 max-w-[608px] text-lg leading-8 text-[#70757a] xl:text-[21px]">
              A place for curious minds at{" "}
              <strong className="font-semibold">
                Universitas Gadjah Mada
              </strong>{" "}
              to learn, connect, and build technology that matters.
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Action href="/overview#tracks" variant="primary">
                Find your learning track
              </Action>

              <Action href="/about" variant="outline">
                Get to know us
              </Action>
            </div>

            <p className="mt-7 flex items-center gap-3 text-xs leading-5 text-[#70757a]">
              <GoogleDots />
              Different backgrounds. A shared curiosity.
            </p>
          </div>

          <HeroVisual />
        </div>
      </section>

      <div className="border-y border-[#edf0f2] py-6">
        <div
          className={`${CONTAINER} flex flex-wrap items-center justify-between gap-x-8 gap-y-3 text-sm font-medium`}
        >
          {[
            { text: "Learn by doing", color: "#4285f4" },
            { text: "Connect across disciplines", color: "#ea4335" },
            { text: "Build with purpose", color: "#34a853" },
          ].map((item) => (
            <p key={item.text} className="flex items-center gap-3">
              <span
                className="h-1.5 w-1.5 shrink-0"
                style={{ backgroundColor: item.color }}
              />
              {item.text}
            </p>
          ))}
        </div>
      </div>

      <section
        aria-labelledby="community-heading"
        className="pb-16 pt-20 lg:pb-[72px] lg:pt-[88px]"
      >
        <div
          className={`${CONTAINER} grid gap-10 lg:grid-cols-[minmax(0,.85fr)_minmax(0,1fr)] lg:gap-16`}
        >
          <div>
            <Eyebrow>A campus, a community</Eyebrow>

            <h2 id="community-heading" className={`${HEADING} mt-6`}>
              Not just learning
              <br className="hidden xl:block" /> tech.
              <br />
              Finding your people.
            </h2>

            <Action href="/about" className="mt-6">
              More about GDGoC UGM
            </Action>
          </div>

          <div className="text-[#70757a]">
            <p className="text-xl leading-8">
              Google Developer Groups on Campus, Universitas Gadjah Mada
              brings students together around one simple idea: we can{" "}
              <strong className="font-semibold">go further</strong> when{" "}
              we <strong className="font-semibold">learn</strong> with
              each other.
            </p>

            <p className="mt-6 text-base leading-7">
              From your first line of code to your next product idea,
              there’s room to ask questions, share what you know, and try
              something new.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              {["Student-led", "Peer-powered", "Curiosity-first"].map(
                (tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-[#f1f3f4] px-3 py-2 text-[11px] font-semibold leading-4"
                  >
                    {tag}
                  </span>
                ),
              )}
            </div>
          </div>
        </div>
      </section>

      <section
        id="tracks"
        aria-labelledby="tracks-heading"
        className="pb-[88px] pt-10"
      >
        <div className={CONTAINER}>
          <Eyebrow>Find your starting point</Eyebrow>

          <h2
            id="tracks-heading"
            className={`${HEADING} mt-6 max-w-[760px]`}
          >
            Many interests. One shared
            <br className="hidden lg:block" /> journey.
          </h2>

          <div className="mt-5 flex flex-col justify-between gap-4 md:flex-row md:items-center">
            <p className={BODY}>
              Follow what excites you. Explore a track, then connect the
              dots with others.
            </p>

            <Action
              href="/overview"
              className="shrink-0 self-start md:self-auto"
            >
              See the overview
            </Action>
          </div>

          <ApiRenderBoundary>
          <ApiStatus state={trackData.state} retry={trackData.retry} label="learning tracks" />
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {tracks.map((track) => (
              <article
                key={track.id}
                className="overflow-hidden rounded-[26px] border border-[#dfe2e7] bg-white"
              >
                <Artwork
                  kind={track.artwork}
                  className="w-full"
                />

                <div className="relative z-10 px-7 pb-7 pt-6">
                  <p className="text-[10px] font-semibold uppercase leading-4 text-[#1967d2]">
                    {track.eyebrow}
                  </p>

                  <h3 className="mt-4 text-[27px] font-semibold leading-8 tracking-[-0.025em]">
                    {track.title}
                  </h3>

                  <p className="mt-4 text-base leading-6 text-[#70757a]">
                    {track.description}
                  </p>

                  <p className="mt-5 border-t border-[#e9ecef] pt-4 text-[11px] leading-5 text-[#70757a]">
                    {track.skills}
                  </p>

                  <Action
                    href={`/overview?track=${track.id}`}
                    className="mt-4"
                  >
                    Explore this track
                  </Action>
                </div>
              </article>
            ))}
          </div>
          </ApiRenderBoundary>
        </div>
      </section>

      <section
        aria-labelledby="learning-heading"
        className="bg-[#f1f3f4] py-20 lg:py-[88px]"
      >
        <div className={CONTAINER}>
          <Eyebrow>More than a classroom</Eyebrow>

          <h2 id="learning-heading" className={`${HEADING} mt-6`}>
            Less watching. More making.
          </h2>

          <p className={`${BODY} mt-5`}>
            Learn in a way that turns a new concept into something you
            can actually use.
          </p>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {learningCards.map((card) => (
              <article
                key={card.title}
                className="rounded-[26px] bg-white p-8"
              >
                <Icon
                  name={card.icon}
                  className="h-6 w-6 text-[#4285f4]"
                />

                <h3 className="mt-6 text-[27px] font-semibold leading-8 tracking-[-0.025em]">
                  {card.title}
                </h3>

                <p className="mt-4 text-base leading-6 text-[#70757a]">
                  {card.description}
                </p>

                <p className="mt-5 border-t border-[#e9ecef] pt-4 text-xs leading-5 text-[#1967d2]">
                  {card.label}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        aria-labelledby="project-heading"
        className="py-20 lg:py-[88px]"
      >
        <div
          className={`${CONTAINER} grid items-center gap-10 lg:grid-cols-2 lg:gap-16`}
        >
          <div className="rounded-[32px] bg-[#fff7df] p-7 lg:p-10">
            <div className="flex items-center justify-between text-[10px] text-[#70757a]">
              <span>IDEA → PROTOTYPE</span>
              <Icon name="code" className="h-6 w-6 text-[#4285f4]" />
            </div>

            <div className="mt-6 rounded-2xl border border-[#e0e3e6] bg-white p-6">
              <GoogleDots count={3} />

              <h3 className="mt-5 text-[28px] font-semibold leading-[1.15] tracking-[-0.03em] lg:text-[32px]">
                A little less friction.
                <br />
                A better campus day.
              </h3>

              <div className="mt-6 grid grid-cols-3 gap-3 text-xs font-semibold">
                <span className="rounded-lg bg-[#eaf2ff] px-3 py-4">
                  Discover
                </span>

                <span className="rounded-lg bg-[#eaf5ed] px-3 py-4">
                  Connect
                </span>

                <span className="rounded-lg bg-[#fdeeea] px-3 py-4">
                  Share
                </span>
              </div>

              <p className="mt-5 text-xs leading-5 text-[#70757a]">
                Start with a student need. Build a small, useful solution.
              </p>
            </div>

            <p className="mt-6 text-[9px] leading-4 text-[#70757a]">
              EXAMPLE PROJECT BRIEF · NOT A LAUNCHED PRODUCT
            </p>
          </div>

          <div>
            <Eyebrow>Build something that matters</Eyebrow>

            <h2 id="project-heading" className={`${HEADING} mt-6`}>
              Your next project could
              <br className="hidden xl:block" /> start on campus.
            </h2>

            <p className={`${BODY} mt-7`}>
              What if finding a study partner, sharing resources, or
              navigating campus felt easier? Small, familiar problems can
              be the beginning of meaningful work.
            </p>

            <p className={`${BODY} mt-6`}>
              Bring research, design, and development together. Try an
              idea, get feedback, and make the next version better.
            </p>

            <Action href="/overview#formats" className="mt-7">
              Explore project-based learning
            </Action>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="journey-heading"
        className="pb-20 pt-2 lg:pb-[88px]"
      >
        <div className={CONTAINER}>
          <Eyebrow>Make your first move</Eyebrow>

          <h2
            id="journey-heading"
            className={`${HEADING} mt-6 max-w-[800px]`}
          >
            You don’t need to have it all
            <br className="hidden lg:block" /> figured out.
          </h2>

          <div className="mt-12 grid gap-9 md:grid-cols-3">
            {steps.map((step, index) => (
              <article key={step.title}>
                <span className="text-5xl font-semibold leading-none tracking-[-0.03em] text-[#1a73e8]">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <h3 className="mt-6 border-t border-[#e1e5e9] pt-5 text-2xl font-semibold leading-8 tracking-[-0.02em]">
                  {step.title}
                </h3>

                <p className="mt-4 text-base leading-6 text-[#70757a]">
                  {step.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#eaf5ed] py-14">
        <div
          className={`${CONTAINER} flex flex-col gap-7 md:flex-row md:items-center md:gap-16`}
        >
          <svg
            viewBox="0 0 100 100"
            fill="currentColor"
            aria-hidden="true"
            className="h-20 w-20 shrink-0 text-[#2eaa55] md:h-[104px] md:w-[104px]"
          >
            <path d="M50 0c6 0 6 24 17 33 9 11 33 11 33 17S76 56 67 67c-11 9-11 33-17 33S44 76 33 67C24 56 0 56 0 50s24-6 33-17C44 24 44 0 50 0Z" />
          </svg>

          <div>
            <h2 className="text-[30px] font-semibold leading-[1.15] tracking-[-0.025em] lg:text-[40px]">
              Different majors. Different starting points.
              <br />
              A place for all of them.
            </h2>

            <p className={`${BODY} mt-5`}>
              You don’t have to be the most experienced person in the
              room. Curiosity, kindness, and a willingness to learn are a
              good place to start.
            </p>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="faq-heading"
        className="py-20 lg:py-[88px]"
      >
        <div
          className={`${CONTAINER} grid gap-10 lg:grid-cols-[432px_minmax(0,1fr)] lg:gap-16`}
        >
          <div>
            <Eyebrow>A few good questions</Eyebrow>

            <h2 id="faq-heading" className={`${HEADING} mt-6`}>
              Wondering
              <br className="hidden lg:block" /> where
              <br className="hidden lg:block" /> to begin?
            </h2>

            <Action href="/contact" className="mt-6">
              Ask us a question
            </Action>
          </div>

          <div>
            <ApiRenderBoundary>
            <ApiStatus state={faqData.state} retry={faqData.retry} label="frequently asked questions" />
            {faqs.map((faq) => (
              <details
                key={faq.question}
                open
                className="group border-b border-[#e1e5e9] py-5 first:pt-0"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-lg font-medium leading-7 [&::-webkit-details-marker]:hidden">
                  {faq.question}

                  <Icon
                    name="chevron"
                    className="h-4 w-4 shrink-0 -rotate-90 text-[#4285f4] group-open:rotate-0"
                  />
                </summary>

                <p className="mt-4 text-base leading-6 text-[#70757a]">
                  {faq.answer}
                </p>
              </details>
            ))}
            </ApiRenderBoundary>
          </div>
        </div>
      </section>

      <section className="pb-16 pt-10">
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

              <Action href="/contact">Talk to the community</Action>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
