import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Codito · Programare & AI pentru copii și adolescenți",
    short_name: "Codito",
    description: "Lecții online 1:1 de programare și inteligență artificială pentru copii și adolescenți.",
    start_url: "/",
    display: "browser",
    background_color: "#FFF9F1",
    theme_color: "#F0643A",
    lang: "ro",
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml" },
      { src: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  };
}
