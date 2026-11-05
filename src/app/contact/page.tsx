import type { Metadata } from "next";
import Link from "next/link";
import ContactForm from "@/components/contact/contact-form";

export const metadata: Metadata = {
  title: "Contact",
};

const guidance = [
  {
    title: "For learning questions",
    description:
      "Tell us which topic interests you and where you are in your learning journey.",
  },
  {
    title: "For collaborations",
    description:
      "Share the idea, who it’s for, and how you imagine working with the community.",
  },
  {
    title: "Not sure which category fits?",
    description:
      "Choose General inquiry. A clear question is always a good starting point.",
  },
];

export default function Contact() {
  return (
    <>
      <section className="mx-auto w-[calc(100%-48px)] max-w-[1248px] pb-20 pt-14 sm:pt-[72px]">
        <p className="flex items-center gap-2.5 text-[10px] font-medium uppercase leading-4 text-[#646b73]">
          <span
            aria-hidden="true"
            className="size-1.5 shrink-0 rounded-full bg-[#4285f4]"
          />
          Contact · Let’s connect
        </p>

        <h1 className="mt-6 text-[44px] font-bold leading-[1.06] tracking-[-0.035em] text-[#242424] sm:text-[60px] xl:text-[72px]">
          Good things start with{" "}
          <span className="text-[#1967d2]">hello.</span>
        </h1>

        <p className="mt-7 max-w-[850px] text-lg leading-[1.6] text-[#70757a] xl:text-[22px]">
          A question, a collaboration, or an idea for the community? Tell us
          what’s on your mind.
        </p>

        <div className="mt-12 sm:mt-[60px]">
          <ContactForm />
        </div>
      </section>

      <section className="border-t border-[#dadce0]">
        <div className="mx-auto grid w-[calc(100%-48px)] max-w-[1248px] gap-12 py-[72px] lg:grid-cols-[436px_minmax(0,1fr)] lg:gap-16">
          <div>
            <p className="flex items-center gap-2.5 text-[10px] font-medium uppercase leading-4 text-[#646b73]">
              <span
                aria-hidden="true"
                className="size-1.5 shrink-0 rounded-full bg-[#4285f4]"
              />
              A little guidance
            </p>

            <h2 className="mt-6 text-[34px] font-bold leading-[1.14] tracking-[-0.035em] text-[#242424] lg:text-[40px]">
              Help us understand
              <br />
              your idea.
            </h2>

            <Link
              href="/overview"
              className="mt-6 inline-flex min-h-11 items-center gap-5 text-base font-medium text-[#1967d2] hover:underline"
            >
              Explore the programs first
              <svg
                aria-hidden="true"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M4 12h16M13 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          <div className="grid gap-6">
            {guidance.map((item) => (
              <article
                key={item.title}
                className="border-b border-[#dadce0] pb-5"
              >
                <h3 className="text-[22px] font-medium leading-7 tracking-[-0.02em] text-[#242424]">
                  {item.title}
                </h3>

                <p className="mt-3 text-base leading-[26px] text-[#70757a]">
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}