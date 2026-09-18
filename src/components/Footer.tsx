import Image from "next/image";
import { Phone, Send, Mail } from "./icons";
import { CONTACT, FOOTER_SERVICES } from "@/lib/data";

const SOCIALS = [
  { label: "Instagram", href: CONTACT.telegram },
  { label: "Facebook", href: CONTACT.telegram },
  { label: "YouTube", href: CONTACT.telegram },
  { label: "TikTok", href: CONTACT.telegram },
];

/* explicit targets — these used to be derived from NAV by index, which silently
   pointed «Про нас» at #services and «Контакти» at #reviews */
const COMPANY = [
  { label: "Про нас", href: "#why" },
  { label: "Процес", href: "#how" },
  { label: "Кейси", href: "#cases" },
  { label: "Відгуки", href: "#reviews" },
];

export function Footer() {
  return (
    <footer
      id="contacts"
      className="relative pt-16 pb-8"
      style={{ background: "linear-gradient(180deg, var(--bg-2) 0%, var(--bg) 62%)" }}
    >
      <div className="container-x">
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-[1.5fr_1fr_1fr_1.15fr] lg:gap-12">
          {/* brand */}
          <div className="col-span-2 lg:col-span-1">
            <a href="#top" className="inline-flex" aria-label="AUTONEX Logistics">
              <span className="relative block h-[64px] w-[98px]">
                <Image
                  src="/images/logo-full.webp"
                  alt="AUTONEX Logistics"
                  fill
                  sizes="98px"
                  className="object-contain object-left"
                />
              </span>
            </a>
            <p className="text-sm text-[var(--muted)] mt-4 max-w-xs leading-relaxed">
              Надійна доставка авто з США та Європи під ключ. Прозоро, швидко,
              без ризику.
            </p>
            <div className="flex flex-wrap gap-x-5 gap-y-2 mt-6">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  className="inline-block py-2 text-sm text-[var(--muted)] hover:text-[var(--brand-bright)] transition-colors"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="eyebrow text-[var(--faint)]">Послуги</h4>
            <ul className="mt-4 space-y-1">
              {FOOTER_SERVICES.map((s) => (
                <li key={s}>
                  <a href="#services" className="inline-block py-2 text-sm text-[var(--muted)] hover:text-[var(--text)] transition-colors">
                    {s}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="eyebrow text-[var(--faint)]">Компанія</h4>
            <ul className="mt-4 space-y-1">
              {COMPANY.map((c) => (
                <li key={c.label}>
                  <a href={c.href} className="inline-block py-2 text-sm text-[var(--muted)] hover:text-[var(--text)] transition-colors">
                    {c.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-2 lg:col-span-1">
            <h4 className="eyebrow text-[var(--faint)]">Контакти</h4>
            <ul className="mt-4 space-y-1">
              <li>
                <a href={CONTACT.phoneHref} className="flex items-center gap-2.5 py-2 text-sm text-[var(--muted)] hover:text-[var(--text)] transition-colors">
                  <Phone width={16} height={16} className="text-[var(--brand-bright)] shrink-0" />
                  {CONTACT.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${CONTACT.email}`} className="flex items-center gap-2.5 py-2 text-sm text-[var(--muted)] hover:text-[var(--text)] transition-colors">
                  <Mail width={16} height={16} className="text-[var(--brand-bright)] shrink-0" />
                  {CONTACT.email}
                </a>
              </li>
              <li>
                <a href={CONTACT.telegram} className="flex items-center gap-2.5 py-2 text-sm text-[var(--muted)] hover:text-[var(--text)] transition-colors">
                  <Send width={16} height={16} className="text-[var(--brand-bright)] shrink-0" />
                  Telegram
                </a>
              </li>
            </ul>
            <button data-lead className="btn btn-primary justify-center w-full sm:w-auto !py-3 sm:!py-2.5 !px-5 !text-sm mt-6">
              Залишити заявку <Send width={15} height={15} />
            </button>
          </div>
        </div>

        <div className="border-t border-white/[0.08] mt-14 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[var(--faint)]">
          <span>© {new Date().getFullYear()} AUTONEX. Усі права захищені.</span>
          <span className="flex gap-6">
            <a href="#" className="inline-block py-2 hover:text-[var(--muted)] transition-colors">Політика конфіденційності</a>
            <a href="#" className="inline-block py-2 hover:text-[var(--muted)] transition-colors">Умови</a>
          </span>
        </div>
      </div>
    </footer>
  );
}
