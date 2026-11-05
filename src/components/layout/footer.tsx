import Image from "next/image";
import Link from "next/link";

const navigation = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Overview", href: "/overview" },
  { label: "Contact", href: "/contact" },
];

export default function Footer() {
  return (
    <footer className="bg-[#f1f3f4] pb-7 pt-14 text-[#70757a]">
      <div className="mx-auto w-[calc(100%-48px)] max-w-[1248px]">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[minmax(0,1fr)_264px_260px] lg:gap-16">
          <div className="sm:col-span-2 lg:col-span-1">
            <Link
              href="/"
              aria-label="GDGoC UGM home"
              className="relative block h-12 w-full max-w-[382px]"
            >
              <Image
                src="/GDGoC_UGM_identity.svg"
                alt="Google Developer Groups On Campus — Universitas Gadjah Mada"
                fill
                sizes="(min-width: 640px) 382px, 90vw"
                className="object-contain object-left"
              />
            </Link>

            <p className="mt-6 max-w-[465px] text-base leading-7">
              A student community for curious minds, shared learning,
              and technology with purpose.
            </p>
          </div>

          <div>
            <h2 className="text-sm font-semibold text-[#242424]">
              Explore
            </h2>

            <nav
              aria-label="Footer navigation"
              className="mt-5 flex flex-col items-start gap-2 text-sm leading-5"
            >
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="transition-colors hover:text-[#1967d2]"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <h2 className="text-sm font-semibold text-[#242424]">
              Keep in the loop
            </h2>

            <a
              href="https://www.instagram.com/gdgoc.ugm/"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-block text-base leading-6 text-[#1967d2] hover:underline"
            >
              @gdgoc.ugm
            </a>

            <div className="my-4 flex items-center gap-4">
              <a
                href="https://www.instagram.com/gdgoc.ugm/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GDGoC UGM Instagram"
                className="transition-colors hover:text-[#1967d2]"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                  className="h-5 w-5"
                >
                  <rect
                    x="3"
                    y="3"
                    width="18"
                    height="18"
                    rx="5"
                  />
                  <circle cx="12" cy="12" r="4" />
                  <circle
                    cx="17.5"
                    cy="6.5"
                    r="0.8"
                    fill="currentColor"
                    stroke="none"
                  />
                </svg>
              </a>

              {/* YOUTUBE — URL resmi belum dikonfirmasi */}
              <span role="img" aria-label="YouTube">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                  className="h-5 w-5"
                >
                  <rect
                    x="2"
                    y="5"
                    width="20"
                    height="14"
                    rx="4"
                  />
                  <path d="m10 9 5 3-5 3V9Z" />
                </svg>
              </span>
            </div>

            <p className="text-xs leading-5">
              Learn together. Build together.
            </p>
          </div>
        </div>

        <div className="mt-12 flex flex-col justify-between gap-3 border-t border-[#dfe3e7] pt-8 text-[11px] leading-5 sm:flex-row sm:items-center">
          <p>
            © GDGoC Universitas Gadjah Mada · 2026/2027
          </p>

          <p>Made for the campus. Open to possibilities.</p>
        </div>

        <div
          aria-hidden="true"
          className="mt-8 flex h-[3px] w-40"
        >
          <span className="flex-1 bg-[#4285f4]" />
          <span className="flex-1 bg-[#ea4335]" />
          <span className="flex-1 bg-[#fbbc04]" />
          <span className="flex-1 bg-[#34a853]" />
        </div>
      </div>
    </footer>
  );
}
