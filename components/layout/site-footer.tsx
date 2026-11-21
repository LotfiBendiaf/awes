import Link from "next/link";
import { Brand } from "@/components/ui/brand";
import { navigation, poles } from "@/data/site";
import { siteConfig } from "@/config/site";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div><Brand footer /><p>{siteConfig.description}</p></div>
          <div><h2>Nos pôles</h2>{poles.map((pole) => <Link key={pole.id} href={pole.href}>{pole.name}</Link>)}</div>
          <div><h2>AWES</h2>{navigation.slice(5).map((item) => <Link key={item.href} href={item.href}>{item.label}</Link>)}<Link href="/contact">Prendre rendez-vous</Link></div>
        </div>
        <div className="copyright">© 2026 AWES — Tous droits réservés.</div>
      </div>
    </footer>
  );
}
