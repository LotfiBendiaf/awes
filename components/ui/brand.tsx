import Link from "next/link";
import Image from "next/image";

export function Brand({ footer = false }: { footer?: boolean }) {
  return (
    <Link href="/" className={`brand ${footer ? "brand-footer" : ""}`} aria-label="AWES — Accueil">
      <Image
        className="brand-logo"
        src="/AWES.svg"
        width={1800}
        height={600}
        alt="AWES Consulting & Expertise"
        priority={!footer}
      />
    </Link>
  );
}
