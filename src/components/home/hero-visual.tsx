export default function HeroVisual() {
  const blueMask = `
    linear-gradient(
      180deg,
      #000 0%,
      #000 40%,
      rgba(0,0,0,0.97) 47%,
      rgba(0,0,0,0.73) 57%,
      rgba(0,0,0,0.34) 66%,
      rgba(0,0,0,0.07) 75%,
      transparent 85%
    )
  `;

  const yellowMask = `
    linear-gradient(
      180deg,
      transparent 40%,
      rgba(0,0,0,0.1) 55%,
      rgba(0,0,0,0.6) 65%,
      #000 77%,
      #000 100%
    )
  `;

  return (
    <div
      className="relative isolate mx-auto aspect-[620/530] w-full max-w-[620px] overflow-hidden rounded-[32px] bg-[#eaf2ff]"
      style={{ containerType: "inline-size" }}
      role="img"
      aria-label="Research and development artwork. Hello, possibilities. Built on curiosity. Rooted in UGM."
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: `
            linear-gradient(
              90deg,
              rgba(138,180,248,0) 0%,
              rgba(138,180,248,0) 30%,
              rgba(138,180,248,0.005) 42%,
              rgba(138,180,248,0.08) 48.4%,
              rgba(138,180,248,0.65) 64.5%,
              rgba(138,180,248,0.98) 80.6%,
              rgba(138,180,248,1) 95%
            )
          `,
          maskImage: blueMask,
          WebkitMaskImage: blueMask,
        }}
      />

      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: `
            linear-gradient(
              90deg,
              rgba(255,224,138,0.95) 0%,
              rgba(255,224,138,0.9) 18%,
              rgba(255,224,138,0.5) 38%,
              rgba(255,224,138,0.05) 60%,
              transparent 75%
            )
          `,
          maskImage: yellowMask,
          WebkitMaskImage: yellowMask,
        }}
      />

      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
      >
        {Array.from({ length: 30 }, (_, index) => {
          const column = index % 6;
          const row = Math.floor(index / 6);

          const x = -20 + column * 99;
          const y = -20 + row * 99;

          const highlighted =
            (row === 0 && column === 2) ||
            (row === 4 && column === 5);

          return (
            <div
              key={index}
              className="absolute"
              style={{
                left: `${(x / 620) * 100}%`,
                top: `${(y / 530) * 100}%`,
                width: `${(96 / 620) * 100}%`,
                height: `${(96 / 530) * 100}%`,
                borderRadius: "1.94cqw",

                background: highlighted
                  ? `
                    linear-gradient(
                      135deg,
                      rgba(255,255,255,0.32),
                      rgba(255,255,255,0.16) 60%,
                      rgba(255,255,255,0.38)
                    )
                  `
                  : `
                    linear-gradient(
                      135deg,
                      rgba(255,255,255,0.11),
                      rgba(255,255,255,0.025) 55%,
                      rgba(255,255,255,0.13)
                    )
                  `,

                border: "0.5px solid rgba(255,255,255,0.38)",

                backdropFilter: "blur(3px)",
                WebkitBackdropFilter: "blur(3px)",

                boxShadow: `
                  inset 0 1px 0 rgba(255,255,255,0.55),
                  inset 1px 0 0 rgba(255,255,255,0.18),
                  inset 0 -1px 0 rgba(255,255,255,0.45),
                  inset -1px 0 0 rgba(255,255,255,0.3),
                  inset -4px -4px 10px rgba(255,255,255,0.12),
                  inset 3px 3px 8px rgba(255,255,255,0.05)
                `,
              }}
            >
              <div
                className="absolute inset-[2px]"
                style={{
                  borderRadius: "inherit",
                  background: `
                    linear-gradient(
                      135deg,
                      rgba(255,255,255,0.06),
                      transparent 35%,
                      transparent 65%,
                      rgba(255,255,255,0.1)
                    )
                  `,
                }}
              />
            </div>
          );
        })}
      </div>

      <svg
        viewBox="0 0 620 530"
        xmlns="http://www.w3.org/2000/svg"
        className="pointer-events-none absolute inset-0 h-full w-full"
        aria-hidden="true"
        style={{
          fontFamily:
            "var(--font-geist-sans), Arial, Helvetica, sans-serif",
        }}
      >
        <defs>
          <filter
            id="gdg-hero-sticker-shadow"
            x="-20%"
            y="-40%"
            width="140%"
            height="180%"
          >
            <feDropShadow
              dx="0"
              dy="1"
              stdDeviation="1"
              floodColor="#344054"
              floodOpacity="0.08"
            />
          </filter>
        </defs>

        <image
          href="/images/hero-research.png"
          x="-110"
          y="2"
          width="384"
          height="421"
          preserveAspectRatio="xMidYMid meet"
        />

        <image
          href="/images/hero-development.png"
          x="-42"
          y="85"
          width="650"
          height="696"
          preserveAspectRatio="xMidYMid meet"
        />

        <g transform="rotate(-7 150 369)">
          <rect
            x="27"
            y="342"
            width="246"
            height="54"
            rx="7"
            fill="#ffffff"
            stroke="#dadce0"
            strokeWidth="1"
            filter="url(#gdg-hero-sticker-shadow)"
          />

          <text
            x="43"
            y="377"
            fill="#242424"
            fontSize="22"
            fontWeight="700"
            letterSpacing="-0.55"
          >
            hello, possibilities_
          </text>
        </g>

        <rect
          x="300"
          y="455"
          width="237"
          height="35"
          rx="17.5"
          fill="#ffffff"
        />

        <circle
          cx="320"
          cy="472.5"
          r="4"
          fill="#34a853"
        />

        <text
          x="332"
          y="476.2"
          fill="#64696f"
          fontSize="10.5"
          fontWeight="400"
        >
          Built on{" "}
          <tspan fontWeight="600">curiosity.</tspan>
          {" "}Rooted in{" "}
          <tspan fontWeight="600">UGM.</tspan>
        </text>
      </svg>
    </div>
  );
}
