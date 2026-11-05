import Link from "next/link";
import type { ReactNode } from "react";
import AboutVisual from "@/components/about/about-visual";
import { RemoteContent } from "@/components/ui/sections";
import Eyebrow from "@/components/ui/eyebrow";

import { CONTAINER, HEADING, BODY } from "@/components/ui/page-styles";

type IconName = "arrow" | "book" | "users" | "code" | "heart";

const values = [
  {
    title: "Stay curious",
    description:
      "Ask the extra question. Be willing to learn something outside your comfort zone.",
    icon: "book",
    color: "#4285f4",
  },
  {
    title: "Make room",
    description:
      "Welcome different perspectives, respect each other, and help people find their voice.",
    icon: "users",
    color: "#ea4335",
  },
  {
    title: "Learn by building",
    description:
      "Try a small experiment. Share the rough version. Let feedback guide what comes next.",
    icon: "code",
    color: "#fbbc04",
  },
  {
    title: "Give something back",
    description:
      "Share a resource, explain what clicked, or help someone take their next step.",
    icon: "heart",
    color: "#34a853",
  },
] as const;

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

    users: (
      <>
        <circle cx="9" cy="7" r="3" />
        <path d="M3 20v-2a6 6 0 0 1 12 0v2H3Zm13-16a3 3 0 0 1 0 6m2 4a5 5 0 0 1 3 4v2h-3" />
      </>
    ),

    code: <path d="m8 6-6 6 6 6m8-12 6 6-6 6" />,

    heart: (
      <path d="M20 5c-3-3-6-1-8 1-2-2-5-4-8-1-4 4 1 9 8 15 7-6 12-11 8-15Z" />
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

export default function AboutPage() {
  return (
    <div className="bg-white text-[#242424]">
      <section
        aria-labelledby="about-heading"
        className="py-14 lg:py-20"
      >
        <div
          className={`${CONTAINER} grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_464px] lg:gap-16`}
        >
          <div>
            <Eyebrow>About GDGoC UGM</Eyebrow>

            <h1
              id="about-heading"
              className="mt-6 text-[44px] font-bold leading-[1.06] tracking-[-0.035em] sm:text-[60px] xl:text-[72px]"
            >
              Built by students.
              <br />
              <span className="text-[#1967d2]">
                For what’s next.
              </span>
            </h1>

            <p className="mt-8 max-w-[720px] text-lg leading-8 text-[#70757a] xl:text-[21px]">
              We’re a community of learners and makers at Universitas
              Gadjah Mada, connected by curiosity and the belief that
              technology can do good.
            </p>

            <p className="mt-7 text-[11px] uppercase leading-5 text-[#70757a]">
              Universitas Gadjah Mada · 2026/2027
            </p>
          </div>

          <AboutVisual />
        </div>
      </section>

      <section
        aria-labelledby="purpose-heading"
        className="bg-[#f1f3f4] py-16 lg:py-20"
      >
        <div
          className={`${CONTAINER} grid gap-10 lg:grid-cols-[432px_minmax(0,1fr)] lg:gap-16`}
        >
          <div>
            <Eyebrow>Why we come together</Eyebrow>

            <h2
              id="purpose-heading"
              className={`${HEADING} mt-6`}
            >
              A bridge from
              <br />
              <span className="text-[#1967d2]">
                “I wonder”
              </span>{" "}
              to
              <br />
              <span className="text-[#5695f5]">
                “I made this.”
              </span>
            </h2>
          </div>

          <div>
            <p className="text-xl leading-8 text-[#242424] lg:text-2xl lg:leading-9">
              Learning feels different when there’s someone to exchange
              ideas with, a problem you care about, and the space to
              give it a try.
            </p>

            <p className={`${BODY} mt-6 lg:text-lg`}>
              That’s the spirit of Google Developer Groups on Campus at
              UGM. We create room for students to explore technology,
              develop practical skills, and learn from one another.
            </p>

            <p className={`${BODY} mt-6 lg:text-lg`}>
              Our campus is the starting point. The questions we ask and
              the things we build can reach beyond it.
            </p>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="values-heading"
        className="pb-20 pt-20 lg:pt-[88px]"
      >
        <div className={CONTAINER}>
          <Eyebrow>What guides us</Eyebrow>

          <h2
            id="values-heading"
            className={`${HEADING} mt-6 max-w-[960px]`}
          >
            Good technology starts with good
            <br className="hidden lg:block" /> company.
          </h2>

          <RemoteContent endpoint="values" render={items => <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {items.map((item, index) => {
              const visual = values.find(value => value.title === item.title) ?? values[index % values.length];
              const value = { ...visual, title: item.title, description: item.description };
              return (
              <article
                key={value.title}
                className="rounded-[26px] border border-[#dfe2e7] bg-white p-[26px]"
              >
                <span
                  aria-hidden="true"
                  className="block h-[3px] w-9 rounded-full"
                  style={{ backgroundColor: value.color }}
                />

                <Icon
                  name={value.icon}
                  className="mt-6 h-5 w-5 text-[#1a73e8]"
                />

                <h3 className="mt-6 text-2xl font-semibold leading-7 tracking-[-0.025em]">
                  {value.title}
                </h3>

                <p className="mt-5 text-base leading-[25px] text-[#70757a]">
                  {value.description}
                </p>
              </article>
            ); })}
          </div>} />
        </div>
      </section>

      <section
        aria-labelledby="contribute-heading"
        className="pb-20 lg:pb-[88px]"
      >
        <div
          className={`${CONTAINER} grid gap-10 lg:grid-cols-[432px_minmax(0,1fr)] lg:gap-16`}
        >
          <div>
            <Eyebrow>People, not labels</Eyebrow>

            <h2
              id="contribute-heading"
              className={`${HEADING} mt-6 max-w-[420px]`}
            >
              There’s more
              <br className="hidden lg:block" /> than one way to
              <br className="hidden lg:block" /> contribute.
            </h2>

            <p className={`${BODY} mt-7 max-w-[420px] lg:text-lg`}>
              You can be learning one day and helping someone else the
              next. A community grows through both.
            </p>
          </div>

          <div>
            <RemoteContent endpoint="roles" render={items => <div className="space-y-6">
              {items.map((role) => (
                <article
                  key={role.title}
                  className="border-b border-[#dfe2e7] pb-4"
                >
                  <h3 className="text-[28px] font-semibold leading-8 tracking-[-0.025em]">
                    {role.title}
                  </h3>

                  <p className={`${BODY} mt-4`}>
                    {role.description}
                  </p>
                </article>
              ))}
            </div>} />

            <Action href="/contact" className="mt-6">
              Let’s talk about getting involved
            </Action>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="care-heading"
        className="bg-[#fff7df] py-14"
      >
        <div
          className={`${CONTAINER} flex flex-col gap-7 md:flex-row md:items-center md:gap-16`}
        >
          <svg
            viewBox="0 0 100 100"
            fill="currentColor"
            aria-hidden="true"
            className="h-[72px] w-[72px] shrink-0 text-[#f9ab00]"
          >
            <path d="M50 0c6 0 6 24 17 33 9 11 33 11 33 17S76 56 67 67c-11 9-11 33-17 33S44 76 33 67C24 56 0 56 0 50s24-6 33-17C44 24 44 0 50 0Z" />
          </svg>

          <div>
            <h2
              id="care-heading"
              className="text-[28px] font-semibold leading-tight tracking-[-0.025em] lg:text-[32px]"
            >
              A space to learn. A responsibility to care.
            </h2>

            <p className={`${BODY} mt-4 lg:text-lg`}>
              We want every conversation and learning experience to be
              respectful, inclusive, and constructive. Be kind, give
              credit, and make room for people who are just getting
              started.
            </p>
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
