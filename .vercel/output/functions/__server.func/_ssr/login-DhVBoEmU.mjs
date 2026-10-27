import { b as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { r as signIn } from "./client-1vAx-gM_.mjs";
import { t as GROK_PROVIDERS } from "./server-D4VKroAs.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/login-DhVBoEmU.js
var import_jsx_runtime = require_jsx_runtime();
function Login() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "grid min-h-dvh place-items-center bg-cream px-6 text-ink",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "w-full max-w-sm space-y-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-2xl tracking-wide text-wine",
					children: "Nakconel"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted",
					children: "Sign in to your account."
				}),
				GROK_PROVIDERS.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => signIn(p.providerId, { callbackURL: "/" }),
					className: "flex h-12 w-full items-center justify-center rounded-2xl bg-wine text-sm font-semibold text-white",
					children: ["Continue with ", p.label]
				}, p.providerId))
			]
		})
	});
}
//#endregion
export { Login as component };
