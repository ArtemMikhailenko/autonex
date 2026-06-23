import { Reveal } from "./Reveal";

export function SectionHead({
  eyebrow,
  title,
  sub,
  align = "left",
}: {
  eyebrow?: string;
  title: React.ReactNode;
  sub?: string;
  align?: "left" | "center";
}) {
  return (
    <Reveal className={align === "center" ? "text-center mx-auto max-w-2xl" : ""}>
      {eyebrow && (
        <span className="eyebrow text-[var(--brand-bright)] flex items-center gap-2.5"
              style={{ justifyContent: align === "center" ? "center" : "flex-start" }}>
          <span className="slash" aria-hidden />
          {eyebrow}
        </span>
      )}
      <h2 className="h-title text-[1.9rem] sm:text-[2.5rem] mt-3">{title}</h2>
      {sub && <p className="text-[var(--muted)] mt-3 text-base sm:text-lg leading-relaxed">{sub}</p>}
    </Reveal>
  );
}
