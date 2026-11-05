import Image from "next/image";

export default function AboutVisual() {
  return (
    <div
      className="relative isolate mx-auto aspect-[464/400] w-full max-w-[464px] overflow-hidden rounded-[32px] bg-[#eaf2ff]"
      style={{ containerType: "inline-size" }}
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: `
            linear-gradient(
              90deg,
              rgba(138,180,248,0) 0%,
              rgba(138,180,248,0.05) 30%,
              rgba(138,180,248,0.55) 60%,
              rgba(138,180,248,1) 100%
            )
          `,
          maskImage: `
            linear-gradient(
              180deg,
              #000 0%,
              #000 40%,
              rgba(0,0,0,0.75) 65%,
              rgba(0,0,0,0.2) 90%,
              transparent 100%
            )
          `,
          WebkitMaskImage: `
            linear-gradient(
              180deg,
              #000 0%,
              #000 40%,
              rgba(0,0,0,0.75) 65%,
              rgba(0,0,0,0.2) 90%,
              transparent 100%
            )
          `,
        }}
      />

      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: `
            radial-gradient(
              ellipse at 0% 100%,
              rgba(255,220,117,0.95) 0%,
              rgba(255,228,149,0.8) 25%,
              rgba(255,235,177,0.25) 43%,
              transparent 65%
            )
          `,
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
            (row === 0 && column === 1) ||
            (row === 3 && column === 2);

          return (
            <div
              key={index}
              className="absolute"
              style={{
                left: `${(x / 464) * 100}%`,
                top: `${(y / 400) * 100}%`,
                width: `${(96 / 464) * 100}%`,
                height: `${(96 / 400) * 100}%`,
                borderRadius: "2.586cqw",

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
            />
          );
        })}
      </div>

      <div
        className="absolute z-10 flex items-center justify-center bg-white"
        style={{
          left: "11.2%",
          top: "19.5%",
          width: "77.6%",
          height: "54%",
          borderRadius: "5.2cqw",
          transform: "rotate(-6deg)",
        }}
      >
        <div className="relative h-[70%] w-[76%]">
          <Image
            src="/images/hero-about.png"
            alt="Google Developer Groups symbol"
            fill
            unoptimized
            priority
            sizes="(min-width: 1024px) 274px, 60vw"
            className="object-contain"
          />
        </div>
      </div>
    </div>
  );
}
