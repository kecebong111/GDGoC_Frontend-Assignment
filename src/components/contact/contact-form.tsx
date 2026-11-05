"use client";

import { useState, type FormEvent } from "react";
import { ApiStatus, useApiData } from "@/components/ui/api-data";

const topicVisuals = [
  {
    title: "Joining & learning",
    description: "Getting started, learning tracks, and participation",
    icon: "arrow",
  },
  {
    title: "Collaboration",
    description: "Community activities and shared ideas",
    icon: "plus",
  },
  {
    title: "Speaking & sharing",
    description: "Workshops, knowledge sharing, and mentorship",
    icon: "diamond",
  },
  {
    title: "General inquiry",
    description: "Anything else you’d like to ask",
    icon: "question",
  },
] as const;

type IconName =
  | (typeof topicVisuals)[number]["icon"]
  | "right"
  | "chevron";

function Icon({
  name,
  className = "",
}: {
  name: IconName;
  className?: string;
}) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`size-6 shrink-0 ${className}`}
    >
      {name === "arrow" && <path d="M6 18 18 6M6 6h12v12" />}

      {name === "plus" && <path d="M12 5v14M5 12h14" />}

      {name === "diamond" && (
        <path d="m12 3 9 9-9 9-9-9 9-9Z" />
      )}

      {name === "question" && (
        <>
          <circle cx="12" cy="12" r="9" />
          <path d="M9.5 9a2.5 2.5 0 0 1 5 .3c0 1.7-2.5 2-2.5 3.7" />
          <path d="M12 16.5h.01" />
        </>
      )}

      {name === "right" && <path d="M4 12h16M13 5l7 7-7 7" />}

      {name === "chevron" && <path d="m6 9 6 6 6-6" />}
    </svg>
  );
}

const fieldClassName =
  "block h-[54px] w-full min-w-0 rounded-lg border border-[#dadce0] bg-white px-4 py-3 text-base leading-6 text-[#242424] placeholder:text-[#80868b] focus:border-[#1967d2] focus:outline-none focus:ring-2 focus:ring-[#1967d2]/20";

const labelClassName =
  "mb-2 block text-sm font-medium leading-5 text-[#242424]";

export default function ContactForm() {
  const categories = useApiData("inquiry-categories");
  const topics = categories.state.status === "success" ? categories.state.items.map(item => ({ title: item.title, description: item.description, icon: topicVisuals.find(visual => visual.title === item.title)?.icon ?? "question" })) : [];
  const [selectedCategory, setCategory] = useState("");
  const category = topics.some(topic => topic.title === selectedCategory) ? selectedCategory : topics[0]?.title ?? "";
  const [showSubmissionNotice, setShowSubmissionNotice] = useState(false);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setShowSubmissionNotice(true);
  }

  return (
    <div className="grid items-start gap-12 lg:grid-cols-[456px_minmax(0,1fr)] lg:gap-16">
      <aside className="min-w-0">
        <h2 className="text-[28px] font-bold leading-[34px] tracking-[-0.03em] text-[#242424]">
          What brings you here?
        </h2>

        <p className="mt-3 text-base leading-[26px] text-[#70757a]">
          Pick the closest topic in the form. We’ll take it from there.
        </p>

        <div className="mt-5 grid gap-[18px]">
          <ApiStatus state={categories.state} retry={categories.retry} label="inquiry categories" />
          {topics.map((topic) => {
            const selected = category === topic.title;

            return (
              <button
                key={topic.title}
                type="button"
                aria-pressed={selected}
                onClick={() => setCategory(topic.title)}
                className={`flex min-h-[89px] w-full items-start gap-5 rounded-[20px] border p-5 text-left transition-colors hover:border-[#1967d2] ${
                  selected
                    ? "border-transparent bg-[#eaf2ff]"
                    : "border-[#dadce0] bg-white"
                }`}
              >
                <Icon
                  name={topic.icon}
                  className="mt-0.5 text-[#1967d2]"
                />

                <span className="min-w-0">
                  <span className="block text-lg font-semibold leading-6 tracking-[-0.015em] text-[#242424]">
                    {topic.title}
                  </span>

                  <span className="mt-1 block text-sm leading-5 text-[#70757a]">
                    {topic.description}
                  </span>
                </span>
              </button>
            );
          })}
        </div>

        <div className="mt-8 rounded-[28px] bg-[#fff7df] p-7">
          <p className="text-[10px] font-medium uppercase leading-4 text-[#70757a]">
            Stay curious, stay connected
          </p>

          <h3 className="mt-5 text-[28px] font-bold leading-[1.15] tracking-[-0.03em] text-[#242424]">
            Looking for community
            <br />
            updates?
          </h3>

          <p className="mt-5 text-base leading-[26px] text-[#70757a]">
            Follow{" "}
            <strong className="font-semibold">@gdgoc.ugm</strong> for
            learning opportunities and what’s happening in the community.
          </p>

          <a
            href="https://www.instagram.com/gdgoc.ugm/"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex min-h-11 items-center gap-5 text-base font-medium text-[#1967d2] hover:underline"
          >
            Find @gdgoc.ugm
            <Icon name="right" className="size-5" />
          </a>
        </div>
      </aside>

      <form
        onSubmit={submit}
        className="min-w-0 rounded-[30px] bg-[#f1f3f4] p-6 md:p-9"
      >
        <div className="flex items-start justify-between gap-4">
          <h2 className="text-[28px] font-bold leading-[38px] tracking-[-0.03em] text-[#242424] sm:text-[32px]">
            Send us a message
          </h2>

          <Icon
            name="arrow"
            className="mt-1.5 text-[#1967d2]"
          />
        </div>

        <p className="mt-4 text-[13px] leading-5 text-[#70757a]">
          Fields marked * are required.
        </p>

        <div className="mt-6 grid gap-6">
          <div className="grid gap-6 sm:grid-cols-2 sm:gap-5">
            <div className="min-w-0">
              <label htmlFor="firstName" className={labelClassName}>
                First name *
              </label>

              <input
                id="firstName"
                name="firstName"
                type="text"
                autoComplete="given-name"
                placeholder="Your first name"
                required
                maxLength={100}
                className={fieldClassName}
              />
            </div>

            <div className="min-w-0">
              <label htmlFor="lastName" className={labelClassName}>
                Last name
              </label>

              <input
                id="lastName"
                name="lastName"
                type="text"
                autoComplete="family-name"
                placeholder="Your last name"
                maxLength={100}
                className={fieldClassName}
              />
            </div>
          </div>

          <div>
            <label htmlFor="email" className={labelClassName}>
              Email address *
            </label>

            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="Where we can reply to you"
              required
              maxLength={254}
              className={fieldClassName}
            />
          </div>

          <div>
            <label htmlFor="organization" className={labelClassName}>
              University / organization
            </label>

            <input
              id="organization"
              name="organization"
              type="text"
              autoComplete="organization"
              placeholder="Where you study or work (optional)"
              maxLength={200}
              className={fieldClassName}
            />
          </div>

          <div>
            <label htmlFor="category" className={labelClassName}>
              Inquiry category *
            </label>

            <div className="relative">
                <select
                id="category"
                name="category"
                value={category}
                onChange={(event) => setCategory(event.target.value)}
                required
                className={`${fieldClassName} appearance-none pr-12`}
              >
                {topics.map((topic) => (
                  <option key={topic.title} value={topic.title}>
                    {topic.title}
                  </option>
                ))}
              </select>

              <Icon
                name="chevron"
                className="pointer-events-none absolute right-4 top-1/2 size-[18px] -translate-y-1/2 text-[#1967d2]"
              />
            </div>
          </div>

          <div>
            <label htmlFor="subject" className={labelClassName}>
              Subject *
            </label>

            <input
              id="subject"
              name="subject"
              type="text"
              placeholder="A short introduction to your question"
              required
              maxLength={200}
              className={fieldClassName}
            />
          </div>

          <div>
            <label htmlFor="message" className={labelClassName}>
              Your message *
            </label>

            <textarea
              id="message"
              name="message"
              placeholder="Tell us a little about your question or idea..."
              rows={5}
              required
              maxLength={5000}
              className="block min-h-[146px] w-full resize-y rounded-lg border border-[#dadce0] bg-white px-4 py-3 text-base leading-6 text-[#242424] placeholder:text-[#80868b] focus:border-[#1967d2] focus:outline-none focus:ring-2 focus:ring-[#1967d2]/20"
            />
          </div>
        </div>

        <label
          htmlFor="consent"
          className="mb-0 mt-6 flex cursor-pointer items-start gap-3 text-[13px] font-normal leading-5 text-[#70757a]"
        >
          <input
            id="consent"
            name="consent"
            type="checkbox"
            required
            className="mt-0.5 size-[18px] min-h-0 w-[18px] shrink-0 rounded border-[#dadce0] p-0 accent-[#1967d2]"
          />

          <span>
            I agree that the information I share can be used to respond to
            this inquiry.
          </span>
        </label>

        <div className="mt-7 flex flex-wrap items-center justify-between gap-5">
          <button
            type="submit"
            className="inline-flex min-h-[53px] items-center justify-center gap-6 rounded-md bg-[#4285f4] px-6 py-3 text-base font-medium leading-6 text-white transition-colors hover:bg-[#1967d2]"
          >
            Send message
            <Icon name="right" className="size-5" />
          </button>

          <p className="max-w-[220px] text-xs leading-[18px] text-[#70757a]">
            Please don’t include passwords or sensitive personal
            information.
          </p>
        </div>

        <div aria-live="polite" aria-atomic="true">
          {showSubmissionNotice && (
            <p
              role="status"
              className="mt-6 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-950"
            >
              Message submission is currently unavailable. Your message
              has not been sent. Please contact{" "}
              <a
                href="https://www.instagram.com/gdgoc.ugm/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold underline underline-offset-4"
              >
                @gdgoc.ugm on Instagram
              </a>
              .
            </p>
          )}
        </div>
      </form>
    </div>
  );
}
