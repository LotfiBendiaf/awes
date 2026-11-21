import Link from "next/link";
import { Brand } from "@/components/ui/brand";
import { navigation } from "@/data/site";
import { MobileNav } from "./mobile-nav";

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="announcement">Des solutions concrètes <span>·</span> Des résultats réels</div>
      <div className="container nav-shell">
        <Brand />
        <nav className="desktop-nav" aria-label="Navigation principale">
          {navigation.map((item) => <Link key={item.href} href={item.href}>{item.label}</Link>)}
        </nav>
        <MobileNav />
      </div>
    </header>
  );
}
