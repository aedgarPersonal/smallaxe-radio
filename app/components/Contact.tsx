import { STATION } from "@/app/config/station";

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
      <path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.3 1.1.4 2.4.6 3.6.6.6 0 1 .4 1 1v3.5c0 .6-.4 1-1 1A17 17 0 0 1 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.4 0 .7-.3 1Z" />
    </svg>
  );
}

function MessageIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
      <path d="M4 4h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H8l-4 4V6a2 2 0 0 1 2-2Z" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
      <path d="M3 6.5A2.5 2.5 0 0 1 5.5 4h13A2.5 2.5 0 0 1 21 6.5v11A2.5 2.5 0 0 1 18.5 20h-13A2.5 2.5 0 0 1 3 17.5v-11Zm2.2.2 6.8 5.4 6.8-5.4H5.2Z" />
    </svg>
  );
}

function TwitterIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
      <path d="M18.9 2H22l-7.5 8.6L23 22h-6.8l-5.3-6.9L4.8 22H1.7l8-9.2L1 2h7l4.8 6.3L18.9 2Zm-1.2 18h1.9L6.4 4H4.4l13.3 16Z" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
      <path d="M13.5 21v-8h2.7l.4-3.2h-3V7.7c0-.9.3-1.6 1.6-1.6h1.6V3.2c-.3 0-1.2-.1-2.3-.1-2.3 0-3.9 1.4-3.9 4v2.7H8v3.2h2.6V21h2.9Z" />
    </svg>
  );
}

export function Contact() {
  const c = STATION.contact;
  const telHref = (n: string) => `tel:+1${n.replace(/\D/g, "")}`;
  const smsHref = (n: string) => `sms:+1${n.replace(/\D/g, "")}`;

  const items = [
    {
      key: "landline",
      icon: <PhoneIcon />,
      label: "Landline",
      value: c.landline,
      href: telHref(c.landline),
    },
    {
      key: "mobile",
      icon: <MessageIcon />,
      label: "Call or text",
      value: c.mobile,
      href: smsHref(c.mobile),
    },
    {
      key: "email",
      icon: <MailIcon />,
      label: "Email",
      value: c.email,
      href: `mailto:${c.email}`,
    },
    {
      key: "twitter",
      icon: <TwitterIcon />,
      label: "Twitter",
      value: `@${c.twitter}`,
      href: `https://twitter.com/${c.twitter}`,
    },
    {
      key: "facebook",
      icon: <FacebookIcon />,
      label: "Facebook",
      value: c.facebook,
      href: c.facebookUrl,
    },
  ];

  return (
    <section id="contact" className="py-16 sm:py-24 border-t border-white/10">
      <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] items-start">
        <div>
          <p className="text-sm font-display tracking-[0.3em] text-gold">
            GET IN TOUCH
          </p>
          <h2 className="mt-2 text-4xl sm:text-5xl font-display text-cream">
            Call the station.
          </h2>
          <p className="mt-6 text-cream/75 leading-relaxed max-w-md">
            Shout-outs, song requests, sponsor enquiries — reach us live on the
            landline or send a message anytime.
          </p>
          <div className="mt-6 h-1 w-24 rounded-full flag-stripes" aria-hidden />
        </div>

        <ul className="rounded-2xl border border-white/10 bg-ink-2/60 divide-y divide-white/10">
          {items.map((it) => (
            <li key={it.key}>
              <a
                href={it.href}
                target={it.href.startsWith("http") ? "_blank" : undefined}
                rel={it.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="flex items-center gap-4 px-5 sm:px-6 py-4 hover:bg-white/5 transition-colors group"
              >
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-green/20 text-green-bright shrink-0">
                  {it.icon}
                </span>
                <span className="flex-1 min-w-0">
                  <span className="block text-xs font-display tracking-widest text-cream/50">
                    {it.label}
                  </span>
                  <span className="block text-lg text-cream truncate">
                    {it.value}
                  </span>
                </span>
                <span className="text-cream/40 group-hover:text-gold transition-colors">
                  →
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
