import { createFileRoute } from "@tanstack/react-router";
import { GROK_PROVIDERS, authEnabled, signIn } from "@/lib/auth/client";

export const Route = createFileRoute("/login")({ component: Login });

function Login() {
  return (
    <main className="grid min-h-dvh place-items-center bg-cream px-6 text-ink">
      <div className="w-full max-w-sm space-y-3">
        <h1 className="font-display text-2xl tracking-wide text-wine">Nakconel</h1>
        <p className="text-sm text-muted">Sign in to your account.</p>
        {authEnabled ? (
          GROK_PROVIDERS.map((p) => (
            <button
              key={p.providerId}
              type="button"
              onClick={() => signIn(p.providerId, { callbackURL: "/" })}
              className="flex h-12 w-full items-center justify-center rounded-2xl bg-wine text-sm font-semibold text-white"
            >
              Continue with {p.label}
            </button>
          ))
        ) : (
          <p className="text-sm text-muted">Sign-in is disabled.</p>
        )}
      </div>
    </main>
  );
}
