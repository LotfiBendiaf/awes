import type { ReactNode } from "react";

export function Hero({ kicker, title, description, actions, metrics }: { kicker: string; title: ReactNode; description: string; actions?: ReactNode; metrics?: readonly { value: string; label: string }[] }) {
  return (
    <section className="hero">
      <div className="hero-orb" aria-hidden="true" />
      <div className="container hero-content">
        <span className="kicker">{kicker}</span>
        <h1>{title}</h1>
        <p>{description}</p>
        {actions && <div className="actions">{actions}</div>}
        {metrics && <div className="metrics">{metrics.map((metric) => <div className="metric" key={metric.label}><strong>{metric.value}</strong><span>{metric.label}</span></div>)}</div>}
      </div>
    </section>
  );
}
