"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const items = [
  { href: "/", label: "Home", icon: "fa-home" },
  { href: "/about", label: "About", icon: "fa-user" },
  { href: "/contact", label: "Contact", icon: "fa-envelope-open" },
  { href: "/chat", label: "Chat", icon: "fa-comments" },
];

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // The original reloaded the page on each link, which closed the mobile menu.
  useEffect(() => setOpen(false), [pathname]);

  return (
    <header className="header" id="navbar-collapse-toggle">
      <ul className="icon-menu d-none d-lg-block revealator-slideup revealator-once revealator-delay1">
        {items.map((i) => (
          <li key={i.href} className={`icon-box${pathname === i.href ? " active" : ""}`}>
            <i className={`fa ${i.icon}`} />
            <Link href={i.href}>
              <h2>{i.label}</h2>
            </Link>
          </li>
        ))}
      </ul>
      <nav role="navigation" className="d-block d-lg-none">
        <div id="menuToggle">
          <input type="checkbox" checked={open} onChange={(e) => setOpen(e.target.checked)} />
          <span></span>
          <span></span>
          <span></span>
          <ul className="list-unstyled" id="menu">
            {items.map((i) => (
              <li key={i.href} className={pathname === i.href ? "active" : undefined}>
                <Link href={i.href}>
                  <i className={`fa ${i.icon}`} /> <span>{i.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  );
}
