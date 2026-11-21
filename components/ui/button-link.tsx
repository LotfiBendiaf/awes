import Link from "next/link";
import type { ComponentProps } from "react";

type Props = ComponentProps<typeof Link> & { variant?: "gold" | "outline" | "light" };

export function ButtonLink({ variant = "gold", className = "", ...props }: Props) {
  return <Link className={`button button-${variant} ${className}`} {...props} />;
}
