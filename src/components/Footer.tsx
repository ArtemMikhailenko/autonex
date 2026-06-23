import { Logo, LogoMark } from "./Logo";
import { Phone, Send } from "./icons";
import { CONTACT, FOOTER_SERVICES, FOOTER_COMPANY, NAV } from "@/lib/data";

const SOCIALS = ["Facebook", "Instagram", "YouTube", "TikTok", "LinkedIn"];

export function Footer() {
  return (
    <footer id="contacts" className="pt-16 pb-8 border-t border-[var(--border)] mt-10">
      <div className="container-x">
        <div className="grid lg:grid-cols-[1.4fr_1fr_1fr_1.2fr] gap-10">
          <div>
            <a href="#top" className="flex items-center gap-2.5">
              <LogoMark size={34} />
              <Logo className="text-[1.3rem]" withSub />
            </a>
            <p className="text-sm text-[var(--muted)] mt-4 max-w-xs leading-relaxed">
              Надійна доставка авто з США та Європи під ключ. Прозоро. Швидко.
              Без ризику.
            </p>
            <div className="flex gap-2.5 mt-5">
              {SOCIALS.map((s) => (
                <a
                  key={s}
                  href={CONTACT.telegram}
                  aria-label={s}
                  className="grid place-items-center w-9 h-9 rounded-lg border border-[var(--border-strong)] bg-[var(--surface)] text-[var(--muted)] hover:text-[var(--brand-bright)] hover:border-[var(--brand)] transition-colors text-[10px] font-bold"
                >
                  {s[0]}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="eyebrow text-[var(--faint)]">Послуги</h4>
            <ul className="mt-4 space-y-2.5">
              {FOOTER_SERVICES.map((s) => (
                <li key={s}>
                  <a href="#services" className="text-sm text-[var(--muted)] hover:text-[var(--text)] transition-colors">
                    {s}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="eyebrow text-[var(--faint)]">Компанія</h4>
            <ul className="mt-4 space-y-2.5">
              {FOOTER_COMPANY.map((s, i) => (
                <li key={s}>
                  <a href={NAV[i + 1]?.href ?? "#top"} className="text-sm text-[var(--muted)] hover:text-[var(--text)] transition-colors">
                    {s}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="eyebrow text-[var(--faint)]">Контакти</h4>
            <ul className="mt-4 space-y-3">
              <li>
                <a href={CONTACT.phoneHref} className="flex items-center gap-2.5 text-sm text-[var(--muted)] hover:text-[var(--text)] transition-colors">
                  <Phone width={16} height={16} className="text-[var(--brand-bright)]" />
                  {CONTACT.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${CONTACT.email}`} className="flex items-center gap-2.5 text-sm text-[var(--muted)] hover:text-[var(--text)] transition-colors">
                  <span className="w-4 h-4 grid place-items-center text-[var(--brand-bright)]">@</span>
                  {CONTACT.email}
                </a>
              </li>
              <li>
                <a href={CONTACT.telegram} className="flex items-center gap-2.5 text-sm text-[var(--muted)] hover:text-[var(--text)] transition-colors">
                  <Send width={16} height={16} className="text-[var(--brand-bright)]" />
                  Telegram
                </a>
              </li>
            </ul>
            <button data-lead className="btn btn-primary !py-2.5 !text-sm mt-5">
              Залишити заявку <Send width={15} height={15} />
            </button>
          </div>
        </div>

        <div className="divider-line my-8" />
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[var(--faint)]">
          <span>© 2024 AUTONEX. Усі права захищені.</span>
          <span className="flex gap-5">
            <a href="#" className="hover:text-[var(--muted)] transition-colors">Політика конфіденційності</a>
            <a href="#" className="hover:text-[var(--muted)] transition-colors">Умови</a>
          </span>
        </div>
      </div>
    </footer>
  );
}
