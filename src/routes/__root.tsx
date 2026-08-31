import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { AuroraField } from "../components/AuroraField";
import { SiteNav } from "../components/SiteNav";
import Clarity from "@microsoft/clarity";

function NotFoundComponent() {
  return (
    <div className="relative flex min-h-dvh items-center justify-center px-6">
      <AuroraField hue="200" />
      <div className="relative z-10 max-w-xl">
        <p className="label-xs">Off the map</p>
        <h1 className="mt-6 text-[clamp(2.2rem,7vw,4.5rem)] leading-[1] text-bone">
          There is nothing out here yet.
        </h1>
        <p className="mt-6 text-base leading-relaxed text-muted-foreground">
          This page drifted, was renamed, or never existed. The deck is still where everything
          lives.
        </p>
        <div className="mt-9 flex flex-wrap gap-3">
          <Link
            to="/"
            className="rounded-full bg-primary px-7 py-3.5 text-sm font-semibold tracking-wide text-primary-foreground transition-transform hover:scale-[1.03]"
          >
            Back to the deck
          </Link>
          <Link
            to="/"
            hash="work"
            className="rounded-full border border-border px-7 py-3.5 text-sm text-bone transition-colors hover:border-primary hover:text-primary"
          >
            Case studies
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Favour Sukat" },
      {
        name: "description",
        content:
          "Product work, case studies and writing by Favour Sukat, a data native product manager and AI builder.",
      },
      { name: "author", content: "Favour Sukat" },
      {
        name: "google-site-verification",
        content: "hfLcA4YymPoXDQSOd1rNNWG9uoOWImJIOydXLcKEWq0",
      },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "Favour Sukat" },
      { property: "og:title", content: "Favour Sukat" },
      {
        property: "og:description",
        content:
          "Product work, case studies and writing by Favour Sukat, a data native product manager and AI builder.",
      },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "icon", type: "image/png", href: "/favicon.png" },
      { rel: "apple-touch-icon", href: "/favicon.png" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600&family=Manrope:wght@400;500;600&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}


function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  useEffect(() => {
    const projectId = "yayab2bzwy";
    Clarity.init(projectId);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <SiteNav />
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <Outlet />
    </QueryClientProvider>
  );
}
