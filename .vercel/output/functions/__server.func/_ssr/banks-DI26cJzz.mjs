import { n as createMiddleware } from "./ssr.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/banks-DI26cJzz.js
/**
* Auth middleware for server functions — the standard way to get the caller's
* verified user id. When deployed the session cookie is same-origin and rides
* along automatically. In the live preview the client also forwards the bearer
* token (partitioned cookies) via the `.client` hook below — call sites do not
* thread it themselves.
*
*   import { createServerFn } from "@tanstack/react-start";
*   import { getSql } from "@/lib/db";
*   import { authMiddleware } from "@/lib/auth/middleware";
*
*   export const listTodos = createServerFn({ method: "GET" })
*     .middleware([authMiddleware])
*     .handler(async ({ context }) => {
*       const sql = await getSql();
*       return sql`select * from todos where user_id = ${context.userId}`;
*     });
*
* Signed out with auth on (live preview included) -> throws `UnauthorizedError`
* (see `verify.server.ts`). With auth disabled (`VITE_AUTH_ENABLED=false`, the
* shipped default) it resolves the shared dev user — but throws instead when a
* `DATABASE_URL` is also set, so an app without sign-in must not use this at
* all. On the auth-on path, use it on every server function that touches
* per-user data and scope every query by `context.userId`.
*/
var authMiddleware = createMiddleware({ type: "function" }).client(async ({ next }) => {
	const { getBearerToken } = await import("./client-1vAx-gM_.mjs").then((n) => n.n);
	return next({ sendContext: { bearerToken: getBearerToken() ?? void 0 } });
}).server(async ({ next, context }) => {
	const { assertSameSiteRequest } = await import("./isolation.server-CGNg1r0B.mjs");
	const { requireUserId } = await import("./verify.server-Brrd9nQk.mjs");
	assertSameSiteRequest();
	return next({ context: { userId: await requireUserId(context.bearerToken) } });
});
/** Commercial banks and wallets, with Paystack/NIP codes where they are confirmed. */
var BANKS = [
	[
		"access-bank",
		"Access Bank",
		"044"
	],
	[
		"gtbank",
		"GTBank",
		"058"
	],
	[
		"zenith-bank",
		"Zenith Bank",
		"057"
	],
	[
		"uba",
		"UBA",
		"033"
	],
	[
		"first-bank",
		"First Bank",
		"011"
	],
	[
		"fidelity-bank",
		"Fidelity Bank",
		"070"
	],
	[
		"fcmb",
		"FCMB",
		"214"
	],
	[
		"union-bank",
		"Union Bank",
		"032"
	],
	[
		"sterling-bank",
		"Sterling Bank",
		"232"
	],
	[
		"wema-bank",
		"Wema Bank",
		"035"
	],
	[
		"polaris-bank",
		"Polaris Bank",
		"076"
	],
	[
		"stanbic-ibtc",
		"Stanbic IBTC",
		"221"
	],
	[
		"standard-chartered",
		"Standard Chartered",
		"068"
	],
	[
		"ecobank",
		"Ecobank",
		"050"
	],
	[
		"keystone-bank",
		"Keystone Bank",
		"082"
	],
	[
		"unity-bank",
		"Unity Bank",
		"215"
	],
	[
		"providus-bank",
		"Providus Bank",
		"101"
	],
	[
		"jaiz-bank",
		"Jaiz Bank",
		"301"
	],
	[
		"lotus-bank",
		"Lotus Bank",
		"303"
	],
	[
		"suntrust-bank",
		"SunTrust Bank",
		"100"
	],
	[
		"titan-trust",
		"Titan Trust",
		"102"
	],
	[
		"globus-bank",
		"Globus Bank",
		"00103"
	],
	[
		"parallex-bank",
		"Parallex Bank",
		"104"
	],
	[
		"premiumtrust",
		"PremiumTrust",
		"105"
	],
	["signature-bank", "Signature Bank"],
	["optimus-bank", "Optimus Bank"],
	["alternative-bank", "Alternative Bank"],
	["citibank", "Citibank"],
	[
		"taj-bank",
		"TAJ Bank",
		"302"
	],
	["nova-bank", "NOVA Bank"],
	["summit-bank", "Summit Bank"],
	["alpha-morgan", "Alpha Morgan"],
	["tatum-bank", "Tatum Bank"],
	[
		"kuda",
		"Kuda",
		"50211"
	],
	[
		"opay",
		"OPay",
		"999992"
	],
	[
		"palmpay",
		"PalmPay",
		"999991"
	],
	[
		"moniepoint",
		"Moniepoint",
		"50515"
	],
	["carbon", "Carbon"],
	["paga", "Paga"],
	["9psb", "9PSB"],
	["mtn-momo", "MTN MoMo"],
	["smartcash", "Smartcash"],
	["hopepsb", "HopePSB"],
	[
		"vfd",
		"VFD",
		"566"
	]
].map(([id, name, code]) => ({
	id,
	name,
	logo: `/banks/${id}.png`,
	code
}));
function findBank(id) {
	return BANKS.find((bank) => bank.id === id) ?? null;
}
//#endregion
export { authMiddleware as n, findBank as r, BANKS as t };
