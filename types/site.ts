export type RoutePath =
  | "/"
  | "/accompagner-projet"
  | "/gerer-financer"
  | "/formation"
  | "/commerce-exterieur"
  | "/simulateur"
  | "/contact";

export type Service = {
  id: string;
  number: number;
  title: string;
  summary: string;
  items: readonly string[];
};

export type Pole = {
  id: string;
  number: number;
  name: string;
  shortName: string;
  href: RoutePath;
  description: string;
  hero: string;
  sectionTitle: string;
  services: readonly Service[];
};
