"use client";

import { useEffect, useState, type ReactNode } from "react";

const backgrounds = ["/bg-awes.jpg", "/bg-awes2.jpg", "/bg-awes3.jpg"];

export function Hero({ kicker, title, description, actions, metrics }: { kicker: string; title: ReactNode; description: string; actions?: ReactNode; metrics?: readonly { value: string; label: string }[] }) {
  const [activeBackground, setActiveBackground] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveBackground((current) => (current + 1) % backgrounds.length);
    }, 5000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <section className="hero">
      <div className="hero-backdrops" aria-hidden="true">
        {backgrounds.map((background, index) => (
          <div
            className={`hero-backdrop${index === activeBackground ? " is-active" : ""}`}
            key={background}
            style={{ backgroundImage: `url('${background}')` }}
          />
        ))}
      </div>
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
