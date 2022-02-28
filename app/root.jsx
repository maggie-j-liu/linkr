import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "remix";
import styles from "./styles/app.css";

export function links() {
  return [
    { rel: "icon", href: "/assets/favicon.png" },
    { rel: "stylesheet", href: styles },
  ];
}

export function meta() {
  return {
    title: "Linkr: A serverless link shortener Discord bot",
    description:
      "A serverless link shortener Discord bot built with Remix and hosted on Netlify",
    "og:url": "https://linkr.netlify.app",
    "og:type": "website",
    "og:title": "Linkr: A serverless link shortener Discord bot",
    "og:description":
      "A serverless link shortener Discord bot built with Remix and hosted on Netlify",
    "og:image": "/og-image.png",
    "twitter:card": "summary_large_image",
    keywords: "link shortener, netlify, discord, remix",
  };
}

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
