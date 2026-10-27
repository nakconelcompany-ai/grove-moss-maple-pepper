import { o as __toESM } from "../_runtime.mjs";
import { b as require_jsx_runtime, q as require_react } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as getServerFnById, i as TSS_SERVER_FUNCTION, r as createServerFn } from "./ssr.mjs";
import { i as signOut, t as authClient } from "./client-1vAx-gM_.mjs";
import { a as hasGateSessionMarker } from "./server-D4VKroAs.mjs";
import { C as ChevronLeft, D as ArrowUpRight, E as Bell, O as ArrowDownLeft, S as ChevronRight, T as Building2, _ as FileText, b as Delete, c as Shield, d as QrCode, f as Plus, g as GraduationCap, h as Headphones, i as Tv, l as Send, m as House, n as Wallet, o as Sparkles, p as LayoutGrid, r as UserRound, s as Smartphone, t as Zap, u as Search, v as Earth, w as Check, x as CreditCard, y as Droplets } from "../_libs/lucide-react.mjs";
import { n as authMiddleware, r as findBank, t as BANKS } from "./banks-DI26cJzz.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-DokVTKry.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
/**
* Current user + loading state. Same behavior in live preview and when deployed:
*   - Auth enabled -> the real signed-in user; `user` is `null` while
*                            the session resolves (`isPending: true`) and when
*                            signed out (`isPending: false`). Session comes from
*                            Better Auth `useSession()` → `/api/auth/get-session`
*                            (cookie when deployed; bearer in live preview).
*   - Auth disabled (`VITE_AUTH_ENABLED=false`) -> `DEV_USER`, never pending.
*
* Protect a route by waiting out `isPending` before acting on `user` —
* redirecting on `user: null` alone bounces signed-in visitors to sign-in on
* every hard reload:
*
*   import { RedirectToSignIn } from "@/lib/auth/gates";
*   const { user, isPending } = useCurrentUserState();
*   if (isPending) return null;              // still resolving — don't redirect yet
*   if (!user) return <RedirectToSignIn />;  // definitely signed out
*
* `authEnabled` is a module-level constant fixed at load, so the guarded hook
* call keeps a stable hook order across every render of a given component.
*/
function useCurrentUserState() {
	return useSessionUserState();
}
function useSessionUserState() {
	const { data, isPending } = authClient.useSession();
	const id = data?.user.id;
	const displayName = data?.user.name ?? null;
	const primaryEmail = data?.user.email ?? null;
	const profileImageUrl = data?.user.image ?? null;
	const user = (0, import_react.useMemo)(() => id ? {
		id,
		displayName,
		primaryEmail,
		profileImageUrl,
		isDevFallback: false
	} : null, [
		id,
		displayName,
		primaryEmail,
		profileImageUrl
	]);
	return (0, import_react.useMemo)(() => ({
		user,
		isPending
	}), [user, isPending]);
}
/**
* Convenience view of `useCurrentUserState().user` for display (e.g.
* `user?.displayName ?? "Guest"`). NOTE: `null` means *loading OR signed out* —
* for redirects/guards use `useCurrentUserState()` and check `isPending`.
*/
function useCurrentUser() {
	return useCurrentUserState().user;
}
var subscribeToNothing = () => () => {};
var noGateSessionOnServer = () => false;
/**
* Minimal signed-in identity chip + sign-out. Restyle freely (see the
* `design-ui` skill). Sign-out is only shown when auth is enabled (the
* disabled-auth dev user has nothing to sign out of) and the session is not
* gate-materialized — behind the gate the next request signs the viewer
* straight back in, so a sign-out control there is a broken loop.
*/
function UserButton() {
	const user = useCurrentUser();
	const [signingOut, setSigningOut] = (0, import_react.useState)(false);
	const gateSession = (0, import_react.useSyncExternalStore)(subscribeToNothing, hasGateSessionMarker, noGateSessionOnServer);
	if (!user) return null;
	const label = user.displayName ?? user.primaryEmail ?? "Account";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center gap-2",
		children: [
			user.profileImageUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: user.profileImageUrl,
				alt: "",
				className: "h-8 w-8 rounded-full object-cover"
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "grid h-8 w-8 place-items-center rounded-full bg-black/10 text-sm font-medium dark:bg-white/20",
				children: label.charAt(0).toUpperCase()
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-sm font-medium",
				children: label
			}),
			!gateSession && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				disabled: signingOut,
				onClick: () => {
					setSigningOut(true);
					signOut().catch(() => setSigningOut(false));
				},
				className: "cursor-pointer text-sm underline-offset-4 opacity-70 hover:underline disabled:cursor-wait disabled:no-underline",
				children: signingOut ? "Signing out…" : "Sign out"
			})
		]
	});
}
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var getWallet = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(createSsrRpc("cec358ccc455ba253d1a6528dc6a01b3c726b33822173d02a1e509be75c61365"));
var profileInput = (input) => {
	const v = input ?? {};
	const text = (key, max) => String(v[key] ?? "").trim().slice(0, max);
	return {
		fullName: text("fullName", 80),
		phone: text("phone", 16).replace(/\D/g, "").slice(0, 11),
		nin: text("nin", 11).replace(/\D/g, "").slice(0, 11),
		address: text("address", 160),
		gender: text("gender", 16),
		dob: text("dob", 16)
	};
};
var saveProfile = createServerFn({ method: "POST" }).validator(profileInput).middleware([authMiddleware]).handler(createSsrRpc("2cb41311da66abd44045aa08b70cbf9db3e675c5a0aaeec16396d79bb3761509"));
var setPin = createServerFn({ method: "POST" }).validator((input) => {
	const pin = String(input?.pin ?? "").replace(/\D/g, "");
	if (pin.length !== 4) throw new Error("PIN must be 4 digits.");
	return { pin };
}).middleware([authMiddleware]).handler(createSsrRpc("4064eca9dfde33878d540317966308d363600ffea9641b95431f5cf584576f92"));
var resolveAccount = createServerFn({ method: "POST" }).validator((input) => {
	const v = input ?? {};
	const accountNumber = String(v.accountNumber ?? "").replace(/\D/g, "");
	const bankId = String(v.bankId ?? "");
	if (accountNumber.length !== 10) throw new Error("Account number must be 10 digits.");
	if (!bankId) throw new Error("Select a bank.");
	return {
		accountNumber,
		bankId
	};
}).middleware([authMiddleware]).handler(createSsrRpc("eaff5cd133b210c6bb23c11799790c9662dd45a3896e6773101c05a228a516b7"));
function debitInput(input, kind, title) {
	const v = input ?? {};
	const amountNaira = Number(v.amountNaira);
	const pin = String(v.pin ?? "").replace(/\D/g, "");
	const idempotencyKey = String(v.idempotencyKey ?? "").replace(/[^a-zA-Z0-9_-]/g, "").slice(0, 64);
	if (!Number.isFinite(amountNaira) || amountNaira < 100) throw new Error("Enter at least ₦100.");
	if (pin.length !== 4) throw new Error("Enter your 4-digit PIN.");
	if (idempotencyKey.length < 8) throw new Error("Missing payment reference.");
	return {
		amountNaira: Math.round(amountNaira),
		pin,
		idempotencyKey,
		title,
		kind,
		meta: String(v.meta ?? "").slice(0, 120),
		counterparty: String(v.counterparty ?? "").slice(0, 80),
		bankName: String(v.bankName ?? "").slice(0, 80),
		saveBeneficiary: null
	};
}
var transfer = createServerFn({ method: "POST" }).validator((input) => {
	const base = debitInput(input, "send", "Money Sent");
	const v = input;
	const accountNumber = String(v.accountNumber ?? "").replace(/\D/g, "");
	const bank = findBank(String(v.bankId ?? ""));
	const accountName = String(v.accountName ?? "").trim().slice(0, 80);
	if (accountNumber.length !== 10 || !bank) throw new Error("Enter the account number and bank.");
	if (accountName.length < 3) throw new Error("Enter the account name.");
	return {
		...base,
		title: "Money Sent",
		kind: "send",
		meta: `${String(v.narration ?? "Transfer").slice(0, 60)} · ${bank.name}`,
		counterparty: accountName,
		bankName: bank.name,
		saveBeneficiary: {
			name: accountName,
			bankId: bank.id,
			accountNumber
		}
	};
}).middleware([authMiddleware]).handler(createSsrRpc("44906d073cdcc3ea695155c81d23d1d258cd17c5e0dbd7eec442d82b8226e33e"));
var buyAirtime = createServerFn({ method: "POST" }).validator((input) => {
	const base = debitInput(input, "airtime", "Airtime Purchase");
	const v = input;
	const network = String(v.network ?? "").slice(0, 20);
	const phone = String(v.phone ?? "").replace(/\D/g, "").slice(0, 11);
	if (!network || phone.length < 11) throw new Error("Enter the network and an 11-digit number.");
	return {
		...base,
		title: "Airtime Purchase",
		kind: "airtime",
		meta: `Just now · ${network}`,
		counterparty: `${network} · ${phone}`,
		bankName: network
	};
}).middleware([authMiddleware]).handler(createSsrRpc("4cd30200bd9315c356880dd97c36f6df7529c5c26746231e32a384b2cbb2f692"));
var payBill = createServerFn({ method: "POST" }).validator((input) => {
	const base = debitInput(input, "bill", "Bill Payment");
	const service = String(input.service ?? "Bill").slice(0, 40);
	return {
		...base,
		title: service,
		kind: "bill",
		meta: `Just now · ${service}`,
		counterparty: service,
		bankName: "Nakconel"
	};
}).middleware([authMiddleware]).handler(createSsrRpc("3fb228223644b31e340fde8e2060924145d15ab4dd86120cf961fbc04c459259"));
var startTopup = createServerFn({ method: "POST" }).validator((input) => {
	const v = input ?? {};
	const amountNaira = Math.round(Number(v.amountNaira));
	let origin = "";
	try {
		const url = new URL(String(v.callbackUrl ?? ""));
		if (url.protocol !== "https:" && url.protocol !== "http:") throw new Error("bad");
		origin = url.origin;
	} catch {
		throw new Error("Missing return address.");
	}
	if (!Number.isFinite(amountNaira) || amountNaira < 100) throw new Error("Enter at least ₦100.");
	return {
		amountNaira,
		origin
	};
}).middleware([authMiddleware]).handler(createSsrRpc("3aa9ab1aaaa54876aa4e860a94ddaaf0c100a0c923b8efec24933cbdea26e345"));
var confirmTopup = createServerFn({ method: "POST" }).validator((input) => {
	const reference = String(input?.reference ?? "");
	if (!/^nak_[a-z0-9]+$/i.test(reference)) throw new Error("Unknown payment.");
	return { reference };
}).middleware([authMiddleware]).handler(createSsrRpc("111e3d0c7b7d3b610bf520a311dffec8eff46b2b06196d691ee6f6598357ad3d"));
var TXS = [
	{
		id: "1",
		title: "Airtime Purchase",
		meta: "Today · MTN",
		amount: -1e3,
		who: "MTN",
		ref: "NAK123450001"
	},
	{
		id: "2",
		title: "Money Sent",
		meta: "Today · Zenith Bank",
		amount: -15e3,
		who: "Mary Johnson",
		bank: "Zenith Bank",
		ref: "NAK123456789"
	},
	{
		id: "3",
		title: "Electricity Bill",
		meta: "Yesterday · IKEDC",
		amount: -5500,
		who: "IKEDC",
		ref: "NAK123450003"
	},
	{
		id: "4",
		title: "Food & Dining",
		meta: "Yesterday · 2:14 PM",
		amount: -8e3,
		who: "Food Court",
		ref: "NAK123450004"
	},
	{
		id: "5",
		title: "Shopping",
		meta: "Mon · 4:02 PM",
		amount: -12e3,
		who: "Slot Store",
		ref: "NAK123450005"
	},
	{
		id: "6",
		title: "Money Received",
		meta: "Mon · Adeola Stores",
		amount: 85e3,
		who: "Adeola Stores",
		bank: "Nakconel",
		ref: "NAK123450006"
	}
];
var ACCOUNTS = [
	{
		id: "main",
		name: "Main Wallet",
		bal: 542750,
		hint: "Available balance"
	},
	{
		id: "sav",
		name: "Savings Account",
		bal: 12e4,
		hint: "4.5% per year"
	},
	{
		id: "biz1",
		name: "Business Account",
		bal: 13e4,
		hint: "ABC Enterprises"
	},
	{
		id: "biz2",
		name: "Business Account",
		bal: 46e4,
		hint: "Collections"
	}
];
var AIRTIME = [
	{
		id: "MTN",
		color: "#FFCC00",
		ink: "#1a1a1a"
	},
	{
		id: "Airtel",
		color: "#ED1C24",
		ink: "#fff"
	},
	{
		id: "Glo",
		color: "#50B848",
		ink: "#fff"
	},
	{
		id: "9mobile",
		color: "#006E53",
		ink: "#fff"
	}
];
function ngn(n) {
	return (n < 0 ? "−" : "") + new Intl.NumberFormat("en-NG", {
		style: "currency",
		currency: "NGN",
		minimumFractionDigits: 2
	}).format(Math.abs(n));
}
function tabFor(screen) {
	if ([
		"home",
		"send",
		"bank",
		"receive",
		"add",
		"airtime",
		"txns",
		"tx",
		"notes",
		"bills"
	].includes(screen)) return "home";
	if ([
		"accounts",
		"account",
		"statements",
		"people"
	].includes(screen)) return "accounts";
	if (screen === "card") return "card";
	if ([
		"more",
		"profile",
		"security",
		"help",
		"business",
		"world",
		"assistant",
		"kyc",
		"kycDoc",
		"kycSelfie",
		"kycDone",
		"ticket",
		"adminKyc",
		"adminTx",
		"adminReports"
	].includes(screen)) return "more";
	return null;
}
function Logo({ size = 88 }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
		src: "/mark.png",
		alt: "Nakconel",
		width: size,
		height: size,
		className: "object-contain",
		style: {
			width: size,
			height: size
		}
	});
}
function Wordmark({ light = false }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: `text-center ${light ? "text-[#f3d7a1]" : "text-wine"}`,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "font-display text-[22px] leading-none tracking-[0.22em]",
			children: "NAKCONEL"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 text-[10px] tracking-[0.42em]",
			children: "BANK"
		})]
	});
}
function Btn({ children, onClick, tone = "solid" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		onClick,
		className: `flex h-[52px] w-full items-center justify-center rounded-2xl text-[15px] font-semibold ${tone === "solid" ? "bg-wine text-white shadow-[0_8px_20px_rgba(60,6,9,0.18)]" : tone === "line" ? "border border-wine bg-transparent text-wine" : "bg-transparent text-wine"}`,
		children
	});
}
function Field({ label, value, onChange, placeholder, type = "text", icon }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "block",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "mb-1.5 block text-[12px] font-medium text-muted",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "flex h-12 items-center gap-2 rounded-2xl border border-line bg-paper px-3",
			children: [icon ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-wine",
				children: icon
			}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				value,
				type,
				placeholder,
				onChange: (e) => onChange(e.target.value),
				className: "w-full bg-transparent text-[15px] text-ink outline-none placeholder:text-[#c3b2a4]"
			})]
		})]
	});
}
function BackTitle({ title, onBack, sub }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mb-1",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				onClick: onBack,
				className: "mb-3 flex items-center gap-1 text-[13px] font-medium text-wine",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { size: 18 }), " Back"]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-[26px] font-semibold tracking-tight text-ink",
				children: title
			}),
			sub ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-[13px] leading-5 text-muted",
				children: sub
			}) : null
		]
	});
}
function Row({ title, meta, amount, onClick, icon }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "button",
		onClick,
		className: "flex w-full items-center gap-3 py-3 text-left",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#f6ebe3] text-[13px] font-semibold text-wine",
				children: icon ?? title.slice(0, 1)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "min-w-0 flex-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "block truncate text-[14px] font-medium text-ink",
					children: title
				}), meta ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "block truncate text-[12px] text-muted",
					children: meta
				}) : null]
			}),
			amount != null ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: `text-[13px] font-semibold tabular-nums ${amount >= 0 ? "text-credit" : "text-wine"}`,
				children: [amount >= 0 ? "+" : "", ngn(amount)]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, {
				size: 16,
				className: "text-[#c9b8aa]"
			})
		]
	});
}
function Card({ children, className = "" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: `rounded-[22px] border border-line bg-paper ${className}`,
		children
	});
}
function Keypad({ onKey }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mt-auto grid grid-cols-3 gap-y-1 pt-4",
		children: [
			"1",
			"2",
			"3",
			"4",
			"5",
			"6",
			"7",
			"8",
			"9",
			"",
			"0",
			"del"
		].map((k) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			disabled: !k,
			onClick: () => k && onKey(k),
			className: "flex h-14 items-center justify-center text-[22px] font-medium text-ink disabled:opacity-0",
			children: k === "del" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Delete, { size: 22 }) : k
		}, k || "blank"))
	});
}
function Nav({ tab, onNav }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
		className: "fixed inset-x-0 bottom-0 z-20 mx-auto flex w-full max-w-md justify-around border-t border-line bg-[#fffdfb]/95 px-2 py-2 backdrop-blur",
		children: [
			{
				id: "home",
				label: "Home",
				icon: House
			},
			{
				id: "accounts",
				label: "Accounts",
				icon: Wallet
			},
			{
				id: "card",
				label: "Cards",
				icon: CreditCard
			},
			{
				id: "more",
				label: "More",
				icon: LayoutGrid
			}
		].map((item) => {
			const Icon = item.icon;
			const on = tab === item.id;
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				onClick: () => onNav(item.id),
				className: "flex w-16 flex-col items-center gap-1 py-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
					size: 20,
					strokeWidth: on ? 2.4 : 1.8,
					className: on ? "text-wine" : "text-[#b6a496]"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: `text-[11px] ${on ? "font-semibold text-wine" : "text-[#b6a496]"}`,
					children: item.label
				})]
			}, item.id);
		})
	});
}
function Pills({ value, options, onChange }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex gap-2",
		children: options.map((opt) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			onClick: () => onChange(opt),
			className: `rounded-full px-4 py-2 text-[13px] font-semibold ${value === opt ? "bg-wine text-white" : "border border-line bg-paper text-ink"}`,
			children: opt
		}, opt))
	});
}
function NakconelApp() {
	const [screen, setScreen] = (0, import_react.useState)("splash");
	const [stack, setStack] = (0, import_react.useState)([]);
	const [mode, setMode] = (0, import_react.useState)("signup");
	const [phone, setPhone] = (0, import_react.useState)("");
	const [otp, setOtp] = (0, import_react.useState)("");
	const [pin, setPin$1] = (0, import_react.useState)("");
	const [seconds, setSeconds] = (0, import_react.useState)(45);
	const [name, setName] = (0, import_react.useState)("");
	const [dob, setDob] = (0, import_react.useState)("");
	const [gender, setGender] = (0, import_react.useState)("Male");
	const [idType, setIdType] = (0, import_react.useState)("NIN");
	const [nin, setNin] = (0, import_react.useState)("");
	const [address, setAddress] = (0, import_react.useState)("");
	const [error, setError] = (0, import_react.useState)("");
	const [query, setQuery] = (0, import_react.useState)("");
	const [filter, setFilter] = (0, import_react.useState)("All");
	const [acctTab, setAcctTab] = (0, import_react.useState)("Transactions");
	const [who, setWho] = (0, import_react.useState)("Recent");
	const [fund, setFund] = (0, import_react.useState)("Account");
	const [bill, setBill] = (0, import_react.useState)("Airtime");
	const [tx, setTx] = (0, import_react.useState)(TXS[1]);
	const [online, setOnline] = (0, import_react.useState)(true);
	const [atm, setAtm] = (0, import_react.useState)(false);
	const [intl, setIntl] = (0, import_react.useState)(false);
	const [bio, setBio] = (0, import_react.useState)(true);
	const [amount, setAmount] = (0, import_react.useState)("");
	const [acctNo, setAcctNo] = (0, import_react.useState)("");
	const [pickedBank, setPickedBank] = (0, import_react.useState)(null);
	const [bankOpen, setBankOpen] = (0, import_react.useState)(false);
	const [bankQuery, setBankQuery] = (0, import_react.useState)("");
	const [narration, setNarration] = (0, import_react.useState)("");
	const [payee, setPayee] = (0, import_react.useState)("");
	const [network, setNetwork] = (0, import_react.useState)("MTN");
	const [airtimePhone, setAirtimePhone] = (0, import_react.useState)("");
	const [airtimeAmt, setAirtimeAmt] = (0, import_react.useState)("500");
	const [noteTab, setNoteTab] = (0, import_react.useState)("All");
	const [stmt, setStmt] = (0, import_react.useState)("Monthly");
	const [adminTab, setAdminTab] = (0, import_react.useState)("Pending");
	const [ask, setAsk] = (0, import_react.useState)("");
	const [replies, setReplies] = (0, import_react.useState)([]);
	const [docName, setDocName] = (0, import_react.useState)("");
	const [camOn, setCamOn] = (0, import_react.useState)(false);
	const [email, setEmail] = (0, import_react.useState)("");
	const [password, setPassword] = (0, import_react.useState)("");
	const [payPin, setPayPin] = (0, import_react.useState)("");
	const [topupAmount, setTopupAmount] = (0, import_react.useState)("1000");
	const [nameStatus, setNameStatus] = (0, import_react.useState)("idle");
	const [wallet, setWallet] = (0, import_react.useState)(null);
	const [busy, setBusy] = (0, import_react.useState)(false);
	const session = useCurrentUserState();
	const videoRef = (0, import_react.useRef)(null);
	const streamRef = (0, import_react.useRef)(null);
	const idem = (0, import_react.useRef)(crypto.randomUUID());
	const go = (next) => {
		setError("");
		setStack((s) => [...s, screen]);
		setScreen(next);
	};
	const back = () => {
		setError("");
		setStack((s) => {
			const copy = [...s];
			const prev = copy.pop();
			setScreen(prev ?? "home");
			return copy;
		});
	};
	const resetTo = (next) => {
		setError("");
		setStack([]);
		setScreen(next);
	};
	(0, import_react.useEffect)(() => {
		if (screen !== "otp") return;
		setSeconds(45);
		const id = window.setInterval(() => setSeconds((n) => n > 0 ? n - 1 : 0), 1e3);
		return () => window.clearInterval(id);
	}, [screen]);
	(0, import_react.useEffect)(() => {
		if (screen !== "face" && screen !== "kycSelfie") {
			setCamOn(false);
			return;
		}
		let cancelled = false;
		navigator.mediaDevices?.getUserMedia({
			video: { facingMode: "user" },
			audio: false
		}).then((s) => {
			if (cancelled) {
				s.getTracks().forEach((t) => t.stop());
				return;
			}
			streamRef.current = s;
			if (videoRef.current) videoRef.current.srcObject = s;
			setCamOn(true);
		}).catch(() => setCamOn(false));
		return () => {
			cancelled = true;
			streamRef.current?.getTracks().forEach((t) => t.stop());
			streamRef.current = null;
		};
	}, [screen]);
	(0, import_react.useEffect)(() => {
		if (videoRef.current && streamRef.current) videoRef.current.srcObject = streamRef.current;
	}, [screen, camOn]);
	const refreshWallet = async () => {
		const next = await getWallet();
		setWallet(next);
		return next;
	};
	(0, import_react.useEffect)(() => {
		if (!session.user) return;
		refreshWallet().catch(() => setError("Couldn't open your wallet."));
	}, [session.user?.id]);
	(0, import_react.useEffect)(() => {
		if (!session.user) return;
		const reference = new URLSearchParams(window.location.search).get("topup");
		if (!reference) return;
		confirmTopup({ data: { reference } }).then(async (result) => {
			window.history.replaceState({}, "", "/");
			if (result.ok) {
				applyEntry(result.entry);
				await refreshWallet();
				setScreen("tx");
			} else setError(result.error);
		}).catch(() => setError("Couldn't confirm the payment."));
	}, [session.user?.id]);
	(0, import_react.useEffect)(() => {
		if (acctNo.length !== 10 || !pickedBank || !session.user) {
			setNameStatus("idle");
			return;
		}
		let cancelled = false;
		setNameStatus("checking");
		resolveAccount({ data: {
			accountNumber: acctNo,
			bankId: pickedBank.id
		} }).then((result) => {
			if (cancelled) return;
			if (result.ok) {
				setPayee(result.accountName);
				setNameStatus("live");
			} else setNameStatus("manual");
		}).catch(() => {
			if (!cancelled) setNameStatus("manual");
		});
		return () => {
			cancelled = true;
		};
	}, [
		acctNo,
		pickedBank?.id,
		session.user?.id
	]);
	const applyEntry = (entry) => {
		setTx({
			id: entry.id,
			title: entry.title,
			meta: entry.meta,
			amount: entry.amountKobo / 100,
			who: entry.counterparty,
			bank: entry.bankName,
			ref: entry.reference
		});
		idem.current = crypto.randomUUID();
		setPayPin("");
	};
	const displayName = name.trim().split(" ")[0] || wallet?.profile.fullName.split(" ")[0] || session.user?.displayName?.split(" ")[0] || "there";
	const fullName = name.trim() || wallet?.profile.fullName || session.user?.displayName || "Nakconel customer";
	const phonePretty = phone ? phone.replace(/(\d{3})(\d{3})(\d{0,4})/, "$1 $2 $3").trim() : "801 234 5678";
	const balanceLabel = new Intl.NumberFormat("en-NG", {
		style: "currency",
		currency: "NGN",
		minimumFractionDigits: 2
	}).format((wallet?.balanceKobo ?? 0) / 100);
	const savedPeople = wallet?.beneficiaries ?? [];
	const shownTx = (0, import_react.useMemo)(() => {
		return (wallet?.entries ?? []).map((entry) => ({
			id: entry.id,
			title: entry.title,
			meta: entry.meta,
			amount: entry.amountKobo / 100,
			who: entry.counterparty,
			bank: entry.bankName,
			ref: entry.reference
		})).filter((row) => {
			const q = query.trim().toLowerCase();
			if (!(!q || row.title.toLowerCase().includes(q) || row.who.toLowerCase().includes(q))) return false;
			if (filter === "Debit") return row.amount < 0;
			if (filter === "Credit") return row.amount > 0;
			return true;
		});
	}, [
		wallet,
		query,
		filter
	]);
	const openTx = (row) => {
		setTx(row);
		go("tx");
	};
	const onNav = (tab) => {
		setStack([]);
		setScreen(tab === "home" ? "home" : tab === "accounts" ? "accounts" : tab === "card" ? "card" : "more");
	};
	const tab = tabFor(screen);
	const frame = (node, dark = false) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: `mx-auto flex min-h-dvh w-full max-w-md flex-col shadow-[0_0_0_1px_rgba(90,40,30,0.04)] ${dark ? "bg-[#14080a] text-white" : "bg-cream text-ink"}`,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
			className: `flex flex-1 flex-col gap-4 px-5 pt-7 ${tab ? "pb-28" : "pb-6"}`,
			children: node
		}), tab ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Nav, {
			tab,
			onNav
		}) : null]
	});
	if (screen === "splash") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "button",
		onClick: () => {
			if (session.isPending) return;
			resetTo(session.user ? "home" : "welcome");
		},
		className: "relative mx-auto flex min-h-dvh w-full max-w-md flex-col items-center justify-between overflow-hidden px-8 py-16 text-center",
		style: { background: "radial-gradient(90% 45% at 100% 100%, rgba(224,181,106,0.28), transparent 55%), radial-gradient(70% 40% at 0% 88%, rgba(224,181,106,0.16), transparent 50%), linear-gradient(180deg, #6a1a22 0%, #3c0609 58%, #2a0508 100%)" },
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "flex flex-col items-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Logo, { size: 148 }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "mt-6 block font-display text-[28px] tracking-[0.28em] text-[#f0d7a4]",
						children: "NAKCONEL"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "mt-2 block text-[11px] tracking-[0.5em] text-[#f0d7a4]",
						children: "BANK"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-[13px] text-[#f0d7a4]/90",
				children: "Banking for today, building for tomorrow."
			})
		]
	});
	if (screen === "welcome") return frame(/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-1 flex-col",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-10 flex flex-col items-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Logo, { size: 86 }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wordmark, {})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-10 text-center text-[26px] font-semibold tracking-tight",
					children: "Welcome to Nakconel Bank"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-[13px] text-muted",
					children: "Secure. Simple. Global."
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-auto flex flex-col gap-3 pt-16",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
				onClick: () => {
					setMode("signup");
					setPhone("");
					setOtp("");
					setPin$1("");
					go("phone");
				},
				children: "Get Started"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
				tone: "ghost",
				onClick: () => {
					setMode("login");
					setPhone("");
					setOtp("");
					setPin$1("");
					go("phone");
				},
				children: "Log in"
			})]
		})]
	}));
	if (screen === "phone") return frame(/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-1 flex-col",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col items-center",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Logo, { size: 54 }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-2",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wordmark, {})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-center text-[22px] font-semibold",
					children: "Enter your phone number"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-center text-[13px] text-muted",
					children: "This becomes your Nakconel account number."
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-5 flex h-14 items-center gap-3 rounded-2xl border border-line bg-paper px-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-lg",
						children: "🇳🇬"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-[15px] font-semibold",
						children: "+234"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-[15px] tabular-nums text-ink",
						children: phone ? phonePretty : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-[#c3b2a4]",
							children: "Phone number"
						})
					})
				]
			}),
			error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-center text-[12px] text-wine",
				children: error
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
					onClick: () => {
						if (phone.length < 10) {
							setError("Enter the 10 digits after +234.");
							return;
						}
						setOtp("");
						go(session.user ? "pin" : "access");
					},
					children: "Continue"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-3 text-center text-[13px] text-muted",
				children: [
					"Don’t have an account?",
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "font-semibold text-wine",
						onClick: () => {
							setMode("signup");
							setError("");
						},
						children: "Register"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Keypad, { onKey: (k) => {
				setError("");
				if (k === "del") setPhone((p) => p.slice(0, -1));
				else if (phone.length < 10) setPhone((p) => p + k);
			} })
		]
	}));
	if (screen === "otp") return frame(/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-1 flex-col",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BackTitle, {
				title: "",
				onBack: back
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "-mt-8 flex flex-col items-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Logo, { size: 48 }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-4 text-center text-[22px] font-semibold",
						children: "Enter the 6-digit code"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-1 text-center text-[13px] text-muted",
						children: ["We sent the code to +234 ", phonePretty]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-5 grid grid-cols-6 gap-2",
				children: Array.from({ length: 6 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex h-12 items-center justify-center rounded-xl border border-line bg-paper text-[18px] font-semibold",
					children: otp[i] ?? ""
				}, i))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				className: "mt-3 text-center text-[13px] text-wine",
				onClick: () => setSeconds(45),
				disabled: seconds > 0,
				children: seconds > 0 ? `Resend code in 00:${String(seconds).padStart(2, "0")}` : "Resend code"
			}),
			error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-center text-[12px] text-wine",
				children: error
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-3",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
					onClick: () => {
						if (otp.length < 6) {
							setError("Enter the 6-digit code.");
							return;
						}
						setPin$1("");
						go("pin");
					},
					children: "Continue"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Keypad, { onKey: (k) => {
				setError("");
				if (k === "del") setOtp((p) => p.slice(0, -1));
				else if (otp.length < 6) setOtp((p) => p + k);
			} })
		]
	}));
	if (screen === "access") return frame(/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-1 flex-col gap-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BackTitle, {
				title: mode === "signup" ? "Create your account" : "Log in",
				sub: mode === "signup" ? "Email and password are saved. We do not accept a made-up code." : "Use the email and password for this account.",
				onBack: back
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Email",
				type: "email",
				value: email,
				onChange: setEmail,
				placeholder: "you@email.com"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Password",
				type: "password",
				value: password,
				onChange: setPassword,
				placeholder: "At least 8 characters"
			}),
			error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-[12px] text-wine",
				children: error
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-auto",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
					onClick: () => {
						if (!email.includes("@") || password.length < 8) {
							setError("Use a real email and a password of at least 8 characters.");
							return;
						}
						setBusy(true);
						(mode === "signup" ? authClient.signUp.email({
							email,
							password,
							name: email.split("@")[0]
						}) : authClient.signIn.email({
							email,
							password
						})).then((result) => {
							setBusy(false);
							if (result.error) {
								setError(result.error.message ?? "That email or password was not accepted.");
								return;
							}
							if (mode === "signup") go("pin");
							else resetTo("home");
						});
					},
					children: busy ? "Please wait…" : mode === "signup" ? "Create account" : "Log in"
				})
			})
		]
	}));
	if (screen === "pin") {
		const creating = mode === "signup";
		return frame(/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-1 flex-col",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BackTitle, {
					title: "",
					onBack: back
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "-mt-6 text-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "text-[22px] font-semibold",
						children: creating ? "Create your PIN" : "Enter your PIN"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-[13px] text-muted",
						children: creating ? "Choose a 4-digit PIN for your account." : "Enter the 4-digit PIN for your account."
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-8 flex justify-center gap-4",
					children: Array.from({ length: 4 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: `h-3.5 w-3.5 rounded-full ${pin.length > i ? "bg-wine" : "border border-[#d9c8b8] bg-paper"}` }, i))
				}),
				error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-center text-[12px] text-wine",
					children: error
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Keypad, { onKey: (k) => {
					setError("");
					if (k === "del") {
						setPin$1((p) => p.slice(0, -1));
						return;
					}
					if (pin.length >= 4) return;
					const next = pin + k;
					setPin$1(next);
					if (next.length === 4) {
						setBusy(true);
						setPin({ data: { pin: next } }).then((res) => {
							setBusy(false);
							if (!res.ok) {
								setError(res.error);
								setPin$1("");
								return;
							}
							if (creating) go("face");
							else resetTo("home");
						}).catch(() => {
							setBusy(false);
							setPin$1("");
							setError("Create your email account before setting a PIN.");
						});
					}
				} })
			]
		}));
	}
	if (screen === "face") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto flex min-h-dvh w-full max-w-md flex-col bg-[#12080a] text-white",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "px-5 pt-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: back,
					className: "flex items-center gap-1 text-[13px] text-[#f0d7a4]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { size: 18 }), " Back"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-4 text-[26px] font-semibold",
					children: "Face Verification"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-1 flex-col items-center justify-center px-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative h-[340px] w-[260px]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "absolute inset-0 overflow-hidden bg-[#2a1216]",
						style: { clipPath: "ellipse(46% 50% at 50% 50%)" },
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("video", {
							ref: videoRef,
							autoPlay: true,
							playsInline: true,
							muted: true,
							className: `h-full w-full object-cover ${camOn ? "" : "hidden"}`,
							style: { transform: "scaleX(-1)" }
						}), camOn ? null : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex h-full items-center justify-center px-6 text-center text-[13px] text-[#f0d7a4]/80",
							children: "Allow the camera so your face sits in the frame."
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "pointer-events-none absolute inset-0 rounded-[50%] ring-2 ring-[#f0d7a4]/80" })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-6 text-center text-[14px] text-[#f6ead4]",
					children: "Keep your face within the frame."
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex justify-center pb-10",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => go("personal"),
					className: "flex h-16 w-16 items-center justify-center rounded-full border-4 border-white/80",
					"aria-label": "Capture",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-12 w-12 rounded-full bg-white" })
				})
			})
		]
	});
	if (screen === "personal") return frame(/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-1 flex-col gap-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BackTitle, {
				title: "Personal Details",
				sub: "Let’s get to know you.",
				onBack: back
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Full Name",
				value: name,
				onChange: setName,
				placeholder: "Enter your full name",
				icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserRound, { size: 16 })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Date of Birth",
				value: dob,
				onChange: setDob,
				type: "date",
				placeholder: "DD / MM / YYYY"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mb-2 text-[12px] font-medium text-muted",
				children: "Gender"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex gap-4 text-[14px]",
				children: [
					"Male",
					"Female",
					"Other"
				].map((g) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => setGender(g),
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: `flex h-4 w-4 items-center justify-center rounded-full border ${gender === g ? "border-wine" : "border-[#c9b8aa]"}`,
						children: gender === g ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-2 w-2 rounded-full bg-wine" }) : null
					}), g]
				}, g))
			})] }),
			error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-[12px] text-wine",
				children: error
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-auto",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
					onClick: () => {
						if (name.trim().length < 3 || !dob) {
							setError("Enter your full name and date of birth.");
							return;
						}
						go("nin");
					},
					children: "Next"
				})
			})
		]
	}));
	if (screen === "nin") return frame(/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-1 flex-col gap-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BackTitle, {
				title: "National Identification",
				sub: "Enter your NIN or BVN.",
				onBack: back
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-2 rounded-full border border-line bg-paper p-1",
				children: ["NIN", "BVN"].map((opt) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => setIdType(opt),
					className: `h-10 rounded-full text-[14px] font-semibold ${idType === opt ? "bg-wine text-white" : "text-ink"}`,
					children: opt
				}, opt))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: `${idType} Number`,
				value: nin,
				onChange: (v) => setNin(v.replace(/\D/g, "").slice(0, 11)),
				placeholder: `Enter your ${idType} number`
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Date of Birth",
				value: dob,
				onChange: setDob,
				type: "date"
			}),
			error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-[12px] text-wine",
				children: error
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-auto",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
					onClick: () => {
						if (nin.length !== 11) {
							setError(`${idType} must be 11 digits.`);
							return;
						}
						go("address");
					},
					children: "Next"
				})
			})
		]
	}));
	if (screen === "address") return frame(/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-1 flex-col gap-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BackTitle, {
				title: "Residential Address",
				sub: "Please confirm your information.",
				onBack: back
			}),
			[
				["Full Name", fullName],
				["Phone Number", `+234 ${phonePretty}`],
				[idType, nin],
				["Date of Birth", dob]
			].map(([label, value]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-3 rounded-2xl border border-line bg-paper px-3 py-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "flex h-9 w-9 items-center justify-center rounded-full bg-[#f6ebe3] text-wine",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserRound, { size: 16 })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "block text-[11px] text-muted",
					children: label
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "block text-[14px] font-medium",
					children: value
				})] })]
			}, label)),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Address",
				value: address,
				onChange: setAddress,
				placeholder: "Ibadan, Oyo State",
				icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(House, { size: 16 })
			}),
			error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-[12px] text-wine",
				children: error
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-auto pt-2",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
					onClick: () => {
						if (address.trim().length < 3) {
							setError("Enter your address.");
							return;
						}
						resetTo("home");
						saveProfile({ data: {
							fullName: name.trim(),
							phone,
							nin,
							address: address.trim(),
							gender,
							dob
						} }).then((next) => setWallet(next));
					},
					children: "Submit"
				})
			})
		]
	}));
	if (screen === "home") return frame(/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-start justify-between",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
				className: "text-[22px] font-semibold",
				children: ["Good morning, ", displayName.split(" ")[0]]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-[13px] text-muted",
				children: "Here’s your account overview."
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: () => go("notes"),
				className: "flex h-10 w-10 items-center justify-center rounded-full bg-paper text-wine",
				"aria-label": "Notifications",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bell, { size: 18 })
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "rounded-[24px] p-5 text-[#f8e7c8]",
			style: { background: "linear-gradient(145deg, #7a2430 0%, #4a1016 55%, #3c0609 100%)" },
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[12px] text-[#f0d7a4]/80",
					children: "Total Balance"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 font-display text-[32px] leading-none tracking-wide text-[#f8e7c8]",
					children: balanceLabel
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-[12px] text-[#f0d7a4]/75",
					children: "Available Balance"
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid grid-cols-4 gap-2",
			children: [
				{
					label: "Send",
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { size: 18 }),
					to: "send"
				},
				{
					label: "Receive",
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowDownLeft, { size: 18 }),
					to: "receive"
				},
				{
					label: "Add Money",
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { size: 18 }),
					to: "add"
				},
				{
					label: "Airtime",
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Smartphone, { size: 18 }),
					to: "airtime"
				}
			].map((action) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				onClick: () => go(action.to),
				className: "flex flex-col items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "flex h-12 w-12 items-center justify-center rounded-full border border-line bg-paper text-wine",
					children: action.icon
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-center text-[11px] font-medium leading-tight",
					children: action.label
				})]
			}, action.label))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center justify-between",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-[15px] font-semibold",
				children: "Recent Transactions"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				className: "text-[12px] font-semibold text-wine",
				onClick: () => go("txns"),
				children: "View all"
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
			className: "px-3",
			children: shownTx.slice(0, 4).length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "py-6 text-center text-[13px] text-muted",
				children: "No transactions yet"
			}) : shownTx.slice(0, 4).map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
				title: row.title,
				meta: row.meta,
				amount: row.amount,
				onClick: () => openTx(row)
			}, row.id))
		})
	] }));
	if (screen === "accounts") return frame(/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "text-[26px] font-semibold",
			children: "My Accounts"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			onClick: () => go("account"),
			className: "w-full text-left",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-[24px] p-5 text-[#f8e7c8]",
				style: { background: "linear-gradient(145deg, #7a2430, #3c0609)" },
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[12px] text-[#f0d7a4]/80",
						children: "Main Wallet"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 font-display text-[30px] leading-none",
						children: balanceLabel
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-[12px] text-[#f0d7a4]/75",
						children: "Available Balance"
					})
				]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
			className: "px-3",
			children: ACCOUNTS.slice(1).map((acct) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
				title: acct.name,
				meta: "Not opened",
				amount: 0,
				onClick: () => go("account")
			}, acct.id))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
			onClick: () => go("account"),
			children: "View All Accounts"
		})
	] }));
	if (screen === "account") return frame(/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BackTitle, {
			title: "Main Wallet",
			onBack: back
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "font-display text-[34px] leading-none text-ink",
			children: balanceLabel
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pills, {
			value: acctTab,
			options: [
				"Transactions",
				"Details",
				"Settings"
			],
			onChange: setAcctTab
		}),
		acctTab === "Transactions" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
			className: "px-3",
			children: TXS.slice(0, 4).map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
				title: row.title,
				meta: row.meta,
				amount: row.amount,
				onClick: () => openTx(row)
			}, row.id))
		}) : null,
		acctTab === "Details" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
			className: "space-y-3 p-4 text-[14px]",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "flex justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-muted",
						children: "Account name"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: fullName })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "flex justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-muted",
						children: "Account number"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "tabular-nums",
						children: wallet?.accountNumber ?? "—"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "flex justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-muted",
						children: "Bank"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Nakconel" })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "flex justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-muted",
						children: "Currency"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "NGN" })]
				})
			]
		}) : null,
		acctTab === "Settings" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
			className: "px-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
				title: "Statements",
				meta: "April 2025",
				onClick: () => go("statements")
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
				title: "Beneficiaries",
				meta: "Saved accounts",
				onClick: () => go("people")
			})]
		}) : null,
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
			onClick: () => go("txns"),
			children: "View All"
		})
	] }));
	if (screen === "txns") return frame(/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BackTitle, {
			title: "Transactions",
			onBack: back
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
			className: "flex h-12 items-center gap-2 rounded-2xl border border-line bg-paper px-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, {
				size: 16,
				className: "text-muted"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				value: query,
				onChange: (e) => setQuery(e.target.value),
				placeholder: "Search transactions...",
				className: "w-full bg-transparent text-[14px] outline-none"
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pills, {
			value: filter,
			options: [
				"All",
				"Debit",
				"Credit"
			],
			onChange: setFilter
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
			className: "px-3",
			children: [shownTx.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
				title: row.title,
				meta: row.meta,
				amount: row.amount,
				onClick: () => openTx(row)
			}, row.id)), shownTx.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "py-6 text-center text-[13px] text-muted",
				children: "No transactions"
			}) : null]
		})
	] }));
	if (screen === "send") {
		const resolved = payee.trim();
		const banks = BANKS.filter((b) => b.name.toLowerCase().includes(bankQuery.trim().toLowerCase()));
		const recent = shownTx.filter((row) => row.amount < 0);
		return frame(/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BackTitle, {
				title: "Send Money",
				sub: "Enter the account you want to pay.",
				onBack: back
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Amount",
				value: amount,
				onChange: (v) => setAmount(v.replace(/\D/g, "").slice(0, 9)),
				placeholder: "0.00"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Account Number",
				value: acctNo,
				onChange: (v) => {
					setPayee("");
					setAcctNo(v.replace(/\D/g, "").slice(0, 10));
				},
				placeholder: "10-digit account number"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mb-1.5 text-[12px] font-medium text-muted",
				children: "Bank"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				onClick: () => {
					setBankQuery("");
					setBankOpen(true);
				},
				className: "flex h-14 w-full items-center gap-3 rounded-2xl border border-line bg-paper px-3 text-left",
				children: [
					pickedBank ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: pickedBank.logo,
						alt: "",
						className: "h-8 w-8 rounded-lg object-contain"
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "flex h-8 w-8 items-center justify-center rounded-lg bg-[#f6ebe3] text-wine",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Building2, { size: 16 })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: `flex-1 text-[15px] ${pickedBank ? "text-ink" : "text-[#c3b2a4]"}`,
						children: pickedBank ? pickedBank.name : "Select bank"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, {
						size: 16,
						className: "text-[#c9b8aa]"
					})
				]
			})] }),
			nameStatus === "checking" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-[12px] text-muted",
				children: "Checking the account name…"
			}) : null,
			nameStatus === "live" && resolved ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "px-4 py-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[11px] text-muted",
					children: "Account name"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[15px] font-semibold",
					children: resolved
				})]
			}) : null,
			nameStatus === "manual" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Account name",
				value: payee,
				onChange: setPayee,
				placeholder: "Name on the account"
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Narration",
				value: narration,
				onChange: setNarration,
				placeholder: "What is this for?"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Transaction PIN",
				type: "password",
				value: payPin,
				onChange: (v) => setPayPin(v.replace(/\D/g, "").slice(0, 4)),
				placeholder: "4 digits"
			}),
			error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-[12px] text-wine",
				children: error
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
				onClick: () => {
					const n = Number(amount || 0);
					if (!pickedBank) {
						setError("Select a bank.");
						return;
					}
					if (acctNo.length !== 10) {
						setError("Account number must be 10 digits.");
						return;
					}
					if (resolved.length < 3) {
						setError(nameStatus === "checking" ? "Still checking the account name." : "Enter the account name.");
						return;
					}
					if (n < 100) {
						setError("Enter an amount of at least ₦100.");
						return;
					}
					if (payPin.length !== 4) {
						setError("Enter your 4-digit PIN.");
						return;
					}
					setBusy(true);
					transfer({ data: {
						amountNaira: n,
						pin: payPin,
						idempotencyKey: idem.current,
						meta: narration,
						counterparty: resolved,
						bankName: pickedBank.name,
						accountNumber: acctNo,
						bankId: pickedBank.id,
						accountName: resolved,
						narration
					} }).then(async (result) => {
						setBusy(false);
						if (!result.ok) {
							setError(result.error);
							return;
						}
						applyEntry(result.entry);
						await refreshWallet();
						go("tx");
					}).catch(() => {
						setBusy(false);
						setError("The transfer did not go through.");
					});
				},
				children: busy ? "Sending…" : "Continue"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "pt-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mb-2 text-[15px] font-semibold",
					children: "Beneficiaries and recent transfers"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pills, {
					value: who,
					options: ["Beneficiaries", "Recent"],
					onChange: setWho
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
				className: "px-3",
				children: who === "Beneficiaries" ? savedPeople.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "py-6 text-center text-[13px] text-muted",
					children: "No saved beneficiaries yet. A successful transfer saves one."
				}) : savedPeople.filter((p) => p.name.toLowerCase().includes(query.toLowerCase()) || query === "").map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
					title: p.name,
					meta: `${p.bankName} · ${p.accountNumber}`,
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: BANKS.find((b) => b.id === p.bankId)?.logo ?? "/mark.png",
						alt: "",
						className: "h-7 w-7 object-contain"
					}),
					onClick: () => {
						setPickedBank(BANKS.find((b) => b.id === p.bankId) ?? null);
						setAcctNo(p.accountNumber);
						setPayee(p.name);
						setNameStatus("live");
						setError("");
					}
				}, p.id)) : recent.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "py-6 text-center text-[13px] text-muted",
					children: "No transfers yet"
				}) : recent.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
					title: row.title,
					meta: row.meta,
					amount: row.amount,
					onClick: () => openTx(row)
				}, row.id))
			}),
			bankOpen ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed inset-0 z-40 flex items-end justify-center bg-black/45",
				onClick: () => setBankOpen(false),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex max-h-[86dvh] w-full max-w-md flex-col rounded-t-[28px] bg-cream px-5 pt-3 pb-6",
					onClick: (e) => e.stopPropagation(),
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "mx-auto mb-3 h-1.5 w-12 rounded-full bg-[#e4d5c8]" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-[20px] font-semibold",
							children: "Select bank"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[12px] text-muted",
							children: "Nigerian banks and wallets"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "mt-3 flex h-12 items-center gap-2 rounded-2xl border border-line bg-paper px-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, {
								size: 16,
								className: "text-muted"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								value: bankQuery,
								onChange: (e) => setBankQuery(e.target.value),
								placeholder: "Search for a bank",
								className: "w-full bg-transparent text-[14px] outline-none",
								autoFocus: true
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4 overflow-y-auto pb-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "grid grid-cols-4 gap-x-2 gap-y-4",
								children: banks.map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									onClick: () => {
										setPickedBank(b);
										setPayee("");
										setBankOpen(false);
										setError("");
									},
									className: "flex flex-col items-center gap-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: `flex h-14 w-14 items-center justify-center rounded-2xl border bg-white p-1.5 ${pickedBank?.id === b.id ? "border-wine" : "border-line"}`,
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
											src: b.logo,
											alt: "",
											className: "h-full w-full object-contain"
										})
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "line-clamp-2 text-center text-[10px] leading-tight font-medium",
										children: b.name
									})]
								}, b.id))
							}), banks.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "py-8 text-center text-[13px] text-muted",
								children: "No bank matches that search."
							}) : null]
						})
					]
				})
			}) : null
		] }));
	}
	if (screen === "bank") return frame(/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-1 flex-col gap-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BackTitle, {
				title: "Bank Details",
				sub: "Send to a Nigerian account.",
				onBack: back
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Bank",
				value: "Zenith Bank",
				onChange: () => {}
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Account Number",
				value: "2088441190",
				onChange: () => {}
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Account Name",
				value: "Mary Johnson",
				onChange: () => {}
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Amount",
				value: amount,
				onChange: (v) => setAmount(v.replace(/\D/g, "").slice(0, 9))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-auto",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
					onClick: () => {
						const n = Number(amount || 0);
						setTx({
							id: "send",
							title: "Money Sent",
							meta: "Just now · Zenith Bank",
							amount: -n,
							who: "Mary Johnson",
							bank: "Zenith Bank",
							ref: "NAK123456789"
						});
						go("tx");
					},
					children: "Continue"
				})
			})
		]
	}));
	if (screen === "receive") return frame(/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BackTitle, {
			title: "Receive Money",
			sub: "Share your account details to receive funds faster.",
			onBack: back
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
			className: "p-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[12px] text-muted",
					children: "Account"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-[22px] font-semibold tabular-nums tracking-wide",
					children: wallet?.accountNumber ?? "—"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-[13px] text-muted",
					children: [fullName, " · Nakconel"]
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pills, {
			value: who,
			options: ["Recent", "Saved"],
			onChange: setWho
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
			className: "px-3",
			children: (who === "Saved" ? savedPeople : []).length === 0 && who === "Saved" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "py-6 text-center text-[13px] text-muted",
				children: "No saved beneficiaries yet."
			}) : who === "Saved" ? savedPeople.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
				title: p.name,
				meta: `${p.bankName} · ${p.accountNumber}`,
				onClick: () => go("people")
			}, p.id)) : shownTx.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "py-6 text-center text-[13px] text-muted",
				children: "No transfers in yet."
			}) : shownTx.slice(0, 4).map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
				title: row.title,
				meta: row.meta,
				amount: row.amount,
				onClick: () => openTx(row)
			}, row.id))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid grid-cols-2 gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "flex flex-col items-center gap-2 p-4 text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QrCode, { className: "text-wine" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[13px] font-semibold",
						children: "Generate QR Code"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[11px] text-muted",
						children: "Share your QR code"
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "flex flex-col items-center gap-2 p-4 text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, { className: "text-wine" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[13px] font-semibold",
						children: "Request Money"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[11px] text-muted",
						children: "Send a request link"
					})
				]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
			onClick: () => {
				navigator.clipboard?.writeText(`Nakconel · ${fullName} · ${wallet?.accountNumber ?? ""}`).catch(() => {});
			},
			children: "Share Details"
		})
	] }));
	if (screen === "add") return frame(/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BackTitle, {
			title: "Add Money",
			sub: "Choose a funding method.",
			onBack: back
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex flex-col gap-2",
			children: [
				{
					id: "Account",
					title: "Card",
					meta: "Paystack. Balance updates only after it succeeds."
				},
				{
					id: "Bank",
					title: "Bank Transfer",
					meta: "1-2 business days"
				},
				{
					id: "ATM",
					title: "ATM Withdrawal",
					meta: "At partner ATMs"
				},
				{
					id: "Agent",
					title: "Agent",
					meta: "Cash out at agents"
				}
			].map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				onClick: () => setFund(m.id),
				className: `rounded-2xl border px-4 py-3 text-left ${fund === m.id ? "border-wine bg-[#f8efe9]" : "border-line bg-paper"}`,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[14px] font-semibold",
					children: m.title
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[12px] text-muted",
					children: m.meta
				})]
			}, m.id))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
			label: "Amount",
			value: topupAmount,
			onChange: (v) => setTopupAmount(v.replace(/\D/g, "").slice(0, 9)),
			placeholder: "1000"
		}),
		error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-[12px] text-wine",
			children: error
		}) : null,
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-auto",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
				onClick: () => {
					const n = Number(topupAmount || 0);
					if (n < 100) {
						setError("Enter at least ₦100.");
						return;
					}
					if (fund !== "Account") {
						setError("A transfer or cash drop does not credit this wallet. Only a confirmed card payment does.");
						return;
					}
					setBusy(true);
					startTopup({ data: {
						amountNaira: n,
						callbackUrl: window.location.origin
					} }).then((result) => {
						setBusy(false);
						if (!result.ok) {
							setError(result.reason === "not_connected" ? "Card payments are not connected yet. Your balance stays the same until a payment succeeds." : "The payment could not be started.");
							return;
						}
						window.location.href = result.authorizationUrl;
					}).catch(() => {
						setBusy(false);
						setError("The payment could not be started.");
					});
				},
				children: busy ? "Please wait…" : "Continue"
			})
		})
	] }));
	if (screen === "people") {
		const list = savedPeople.filter((p) => p.name.toLowerCase().includes(query.toLowerCase()));
		return frame(/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BackTitle, {
				title: "Beneficiaries",
				sub: "Search beneficiaries.",
				onBack: back
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "flex h-12 items-center gap-2 rounded-2xl border border-line bg-paper px-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, {
					size: 16,
					className: "text-muted"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					value: query,
					onChange: (e) => setQuery(e.target.value),
					placeholder: "Search beneficiaries...",
					className: "w-full bg-transparent text-[14px] outline-none"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
				className: "px-3",
				children: list.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
					title: p.name,
					meta: `${p.bankName} · ${p.accountNumber}`,
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: BANKS.find((b) => b.id === p.bankId)?.logo ?? "/mark.png",
						alt: "",
						className: "h-7 w-7 object-contain"
					}),
					onClick: () => {
						setPickedBank(BANKS.find((b) => b.id === p.bankId) ?? null);
						setAcctNo(p.accountNumber);
						setPayee(p.name);
						setNameStatus("live");
						go("send");
					}
				}, p.id))
			})
		] }));
	}
	if (screen === "airtime") return frame(/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-1 flex-col gap-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BackTitle, {
				title: "Airtime",
				sub: "Buy airtime for any Nigerian number.",
				onBack: back
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-4 gap-2",
				children: AIRTIME.map((net) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => setNetwork(net.id),
					className: `flex h-16 items-center justify-center rounded-2xl text-[13px] font-semibold ${network === net.id ? "ring-2 ring-wine ring-offset-2" : ""}`,
					style: {
						background: net.color,
						color: net.ink
					},
					children: net.id
				}, net.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Phone Number",
				value: airtimePhone,
				onChange: (v) => setAirtimePhone(v.replace(/\D/g, "").slice(0, 11)),
				placeholder: "0801 234 5678",
				icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Smartphone, { size: 16 })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mb-2 text-[12px] font-medium text-muted",
				children: "Amount"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-3 gap-2",
				children: [
					"100",
					"200",
					"500",
					"1000",
					"2000",
					"5000"
				].map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => setAirtimeAmt(c),
					className: `h-11 rounded-2xl text-[13px] font-semibold ${airtimeAmt === c ? "bg-wine text-white" : "border border-line bg-paper text-ink"}`,
					children: ["₦", Number(c).toLocaleString("en-NG")]
				}, c))
			})] }),
			error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-[12px] text-wine",
				children: error
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Transaction PIN",
				type: "password",
				value: payPin,
				onChange: (v) => setPayPin(v.replace(/\D/g, "").slice(0, 4)),
				placeholder: "4 digits"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-auto",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
					onClick: () => {
						if (airtimePhone.length < 11) {
							setError("Enter an 11-digit phone number.");
							return;
						}
						if (payPin.length !== 4) {
							setError("Enter your 4-digit PIN.");
							return;
						}
						setBusy(true);
						buyAirtime({ data: {
							amountNaira: Number(airtimeAmt),
							pin: payPin,
							idempotencyKey: idem.current,
							meta: network,
							counterparty: airtimePhone,
							bankName: network,
							network,
							phone: airtimePhone
						} }).then(async (result) => {
							setBusy(false);
							if (!result.ok) {
								setError(result.error);
								return;
							}
							applyEntry(result.entry);
							await refreshWallet();
							go("tx");
						}).catch(() => {
							setBusy(false);
							setError("The airtime purchase did not go through.");
						});
					},
					children: busy ? "Buying…" : `Buy ${network} airtime`
				})
			})
		]
	}));
	if (screen === "bills") return frame(/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BackTitle, {
			title: "Payments & Bills",
			sub: "Select a service.",
			onBack: back
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid grid-cols-3 gap-3",
			children: [
				{
					id: "Airtime",
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Smartphone, { size: 18 })
				},
				{
					id: "Data",
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Earth, { size: 18 })
				},
				{
					id: "Electricity",
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Zap, { size: 18 })
				},
				{
					id: "Cable TV",
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tv, { size: 18 })
				},
				{
					id: "Water",
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Droplets, { size: 18 })
				},
				{
					id: "Education",
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GraduationCap, { size: 18 })
				}
			].map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				onClick: () => setBill(s.id),
				className: `flex flex-col items-center gap-2 rounded-2xl border py-4 ${bill === s.id ? "border-wine bg-[#f8efe9]" : "border-line bg-paper"}`,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-wine",
					children: s.icon
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-[12px] font-medium",
					children: s.id
				})]
			}, s.id))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "text-[14px] font-semibold",
			children: "Recent Payments"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
			className: "px-3",
			children: shownTx.filter((row) => row.amount < 0).slice(0, 3).length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "py-6 text-center text-[13px] text-muted",
				children: "No payments yet"
			}) : shownTx.filter((row) => row.amount < 0).slice(0, 3).map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
				title: row.title,
				meta: row.meta,
				amount: row.amount,
				onClick: () => openTx(row)
			}, row.id))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
			label: "Transaction PIN",
			type: "password",
			value: payPin,
			onChange: (v) => setPayPin(v.replace(/\D/g, "").slice(0, 4)),
			placeholder: "4 digits"
		}),
		error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-[12px] text-wine",
			children: error
		}) : null,
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
			onClick: () => {
				if (payPin.length !== 4) {
					setError("Enter your 4-digit PIN.");
					return;
				}
				setBusy(true);
				payBill({ data: {
					amountNaira: 2e3,
					pin: payPin,
					idempotencyKey: idem.current,
					meta: bill,
					counterparty: bill,
					bankName: "Nakconel",
					service: bill
				} }).then(async (result) => {
					setBusy(false);
					if (!result.ok) {
						setError(result.error);
						return;
					}
					applyEntry(result.entry);
					await refreshWallet();
					go("tx");
				}).catch(() => {
					setBusy(false);
					setError("The payment did not go through.");
				});
			},
			children: busy ? "Paying…" : "Pay Now"
		})
	] }));
	if (screen === "card") return frame(/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "text-[26px] font-semibold",
			children: "Virtual Card"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative overflow-hidden rounded-[22px] p-5 text-[#f8e7c8]",
			style: { background: "linear-gradient(145deg, #7a2430, #3c0609)" },
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Logo, { size: 36 }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-display text-[12px] tracking-[0.2em] text-[#f0d7a4]",
						children: "NAKCONEL"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-8 text-[18px] tracking-[0.18em]",
					children: "••••  ••••  ••••  4521"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex items-end justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[10px] tracking-widest text-[#f0d7a4]/70",
						children: "CARD HOLDER"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[14px]",
						children: fullName
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-[20px] italic text-[#f0d7a4]",
						children: "VISA"
					})]
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "text-[15px] font-semibold",
			children: "Card Controls"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
			className: "divide-y divide-line px-4",
			children: [
				[
					"Online Payments",
					online,
					setOnline
				],
				[
					"ATM Withdrawals",
					atm,
					setAtm
				],
				[
					"International Use",
					intl,
					setIntl
				]
			].map(([label, on, set]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between py-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-[14px]",
					children: label
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => set(!on),
					className: `h-7 w-12 rounded-full p-1 ${on ? "bg-wine" : "bg-[#e4d5c8]"}`,
					"aria-label": label,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: `block h-5 w-5 rounded-full bg-white transition ${on ? "translate-x-5" : ""}` })
				})]
			}, label))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
			onClick: () => go("statements"),
			children: "View Card Details"
		})
	] }));
	if (screen === "statements") return frame(/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BackTitle, {
			title: "Statements",
			onBack: back
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pills, {
			value: stmt,
			options: ["Monthly", "Custom"],
			onChange: setStmt
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-[14px] font-semibold",
			children: stmt === "Monthly" ? "April 2025" : "1 Apr – 24 Apr 2025"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
			className: "space-y-3 p-4 text-[14px]",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "flex justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-muted",
						children: "Opening Balance"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: ngn(0) })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "flex justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-muted",
						children: "Total Credit"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-credit",
						children: ngn((wallet?.entries ?? []).filter((e) => e.amountKobo > 0).reduce((s, e) => s + e.amountKobo, 0) / 100)
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "flex justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-muted",
						children: "Total Debit"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-wine",
						children: ngn((wallet?.entries ?? []).filter((e) => e.amountKobo < 0).reduce((s, e) => s + e.amountKobo, 0) / 100)
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "flex justify-between font-semibold",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Closing Balance" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: balanceLabel })]
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, { children: "Download Statement" })
	] }));
	if (screen === "notes") {
		const items = [
			{
				tag: "Transactions",
				title: "Money Received",
				meta: "Apr 26, 2025 · 10:24 AM",
				amount: 85e3
			},
			{
				tag: "Transactions",
				title: "Bill Payment",
				meta: "Apr 25, 2025 · 6:12 PM",
				amount: -5500
			},
			{
				tag: "Security",
				title: "Security Alert",
				meta: "New login · Lagos",
				amount: void 0
			},
			{
				tag: "Security",
				title: "Account Update",
				meta: "Your KYC is complete",
				amount: void 0
			}
		].filter((n) => noteTab === "All" || n.tag === noteTab);
		return frame(/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BackTitle, {
				title: "Notifications",
				onBack: back
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pills, {
				value: noteTab,
				options: [
					"All",
					"Transactions",
					"Security"
				],
				onChange: setNoteTab
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
				className: "px-3",
				children: items.map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
					title: n.title,
					meta: n.meta,
					amount: n.amount
				}, n.title))
			})
		] }));
	}
	if (screen === "profile") return frame(/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BackTitle, {
			title: "My Profile",
			onBack: back
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
			className: "flex items-center gap-3 p-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "flex h-14 w-14 items-center justify-center rounded-full bg-[#f6ebe3] text-wine",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserRound, {})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "block text-[16px] font-semibold",
				children: fullName
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "block text-[13px] text-muted",
				children: ["+234 ", phonePretty]
			})] })]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
			className: "px-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
					title: "Personal Information",
					meta: gender,
					onClick: () => go("personal")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
					title: "Account Limits",
					meta: "Daily send ₦1,000,000"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
					title: "Document Management",
					onClick: () => go("kycDoc")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
					title: "KYC Status",
					meta: "Verified",
					onClick: () => go("kyc")
				})
			]
		})
	] }));
	if (screen === "security") return frame(/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BackTitle, {
		title: "Security",
		onBack: back
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
		className: "px-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
				title: "Change PIN",
				meta: "Last changed Apr 2025",
				onClick: () => {
					setMode("signup");
					setPin$1("");
					go("pin");
				}
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
				title: "Two-Factor Authentication",
				meta: "SMS code"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
				title: "Active Devices",
				meta: "This phone · 1 device"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
				title: "Report a Problem",
				onClick: () => go("ticket")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between py-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-[14px] font-medium",
					children: "Biometric Login"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => setBio((v) => !v),
					className: `h-7 w-12 rounded-full p-1 ${bio ? "bg-wine" : "bg-[#e4d5c8]"}`,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: `block h-5 w-5 rounded-full bg-white ${bio ? "translate-x-5" : ""}` })
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, { title: "Privacy Settings" })
		]
	})] }));
	if (screen === "help") return frame(/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-1 flex-col gap-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BackTitle, {
				title: "Help & Support",
				sub: "How can we help you?",
				onBack: back
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "flex h-12 items-center gap-2 rounded-2xl border border-line bg-paper px-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, {
					size: 16,
					className: "text-muted"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					placeholder: "Search help",
					className: "w-full bg-transparent text-[14px] outline-none"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "px-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
						title: "FAQs",
						meta: "Transfers, cards, KYC",
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { size: 16 })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
						title: "Contact Support",
						meta: "hello@nakconel.test",
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Headphones, { size: 16 }),
						onClick: () => go("ticket")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
						title: "Live Chat",
						meta: "Usually replies in minutes",
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { size: 16 }),
						onClick: () => go("assistant")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
						title: "Merchant Problem",
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Building2, { size: 16 }),
						onClick: () => go("ticket")
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-auto",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
					onClick: () => go("ticket"),
					children: "Submit"
				})
			})
		]
	}));
	if (screen === "business") return frame(/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BackTitle, {
			title: "ABC Enterprises",
			onBack: back
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
			className: "px-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
				title: "Client Charges",
				meta: "Invoice · paid",
				amount: 85e4
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
				title: "Office Supplies",
				meta: "Expense",
				amount: -12e4
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
			className: "space-y-2 p-4 text-[14px]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "flex justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-muted",
					children: "From"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Nigeria (NGN)" })]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "flex justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-muted",
					children: "To"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "United Kingdom (GBP)" })]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
			onClick: () => go("world"),
			children: "Continue"
		})
	] }));
	if (screen === "world") {
		const sendN = Number(amount || 0);
		const fee = Math.round(sendN * .015);
		const gbp = sendN > 0 ? (sendN / 2100).toFixed(2) : "0.00";
		return frame(/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-1 flex-col gap-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BackTitle, {
					title: "International Transfer",
					onBack: back
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "space-y-3 p-4 text-[14px]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "flex justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-muted",
							children: "From"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Nigeria (NGN)" })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "flex justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-muted",
							children: "To"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "United Kingdom (GBP)" })]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Amount",
					value: amount,
					onChange: (v) => setAmount(v.replace(/\D/g, "").slice(0, 9)),
					placeholder: "Enter amount"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "space-y-2 p-4 text-[14px]",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "flex justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-muted",
								children: "Recipient gets"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "font-semibold",
								children: ["£", gbp]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "flex justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-muted",
								children: "Rate"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "₦2,100 / GBP" })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "flex justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-muted",
								children: "Fee"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: ngn(fee) })]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Transaction PIN",
					type: "password",
					value: payPin,
					onChange: (v) => setPayPin(v.replace(/\D/g, "").slice(0, 4)),
					placeholder: "4 digits"
				}),
				error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[12px] text-wine",
					children: error
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-auto",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
						onClick: () => {
							const total = sendN + fee;
							if (total < 100) {
								setError("Enter an amount of at least ₦100.");
								return;
							}
							if (payPin.length !== 4) {
								setError("Enter your 4-digit PIN.");
								return;
							}
							setBusy(true);
							payBill({ data: {
								amountNaira: total,
								pin: payPin,
								idempotencyKey: idem.current,
								meta: "United Kingdom",
								counterparty: "United Kingdom",
								bankName: "GBP",
								service: "International Transfer"
							} }).then(async (result) => {
								setBusy(false);
								if (!result.ok) {
									setError(result.error);
									return;
								}
								applyEntry(result.entry);
								await refreshWallet();
								go("tx");
							}).catch(() => {
								setBusy(false);
								setError("The transfer did not go through.");
							});
						},
						children: busy ? "Sending…" : "Continue"
					})
				})
			]
		}));
	}
	if (screen === "assistant") return frame(/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-1 flex-col",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BackTitle, {
				title: "AI Assistant",
				onBack: back
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col items-center pt-4 text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Logo, { size: 56 }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
						className: "mt-3 text-[18px] font-semibold",
						children: [
							"Hi ",
							displayName.split(" ")[0],
							","
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[13px] text-muted",
						children: "How can I help you today?"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-4 flex flex-col gap-2",
				children: [
					"Check my balance",
					"Spending insights",
					"Budget suggestion"
				].map((q) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => setReplies((r) => [...r, q === "Check my balance" ? `Your available balance is ${balanceLabel}.` : q === "Spending insights" ? "You sent ₦41,500 this week. Bills were the largest debit." : "A ₦50,000 monthly savings transfer would keep your main wallet comfortable."]),
					className: "rounded-2xl border border-line bg-paper px-4 py-3 text-left text-[14px]",
					children: q
				}, q))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-4 flex flex-col gap-2",
				children: replies.map((r, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "rounded-2xl bg-[#f6ebe3] px-4 py-3 text-[14px]",
					children: r
				}, i))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "mt-auto flex gap-2 pt-6",
				onSubmit: (e) => {
					e.preventDefault();
					if (!ask.trim()) return;
					setReplies((r) => [...r, `Noted. I can help with “${ask.trim()}” inside Nakconel.`]);
					setAsk("");
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					value: ask,
					onChange: (e) => setAsk(e.target.value),
					placeholder: "Ask anything...",
					className: "h-12 flex-1 rounded-2xl border border-line bg-paper px-4 text-[14px] outline-none"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "submit",
					className: "h-12 rounded-2xl bg-wine px-4 text-white",
					"aria-label": "Send",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, { size: 16 })
				})]
			})
		]
	}));
	if (screen === "kyc") return frame(/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-1 flex-col gap-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BackTitle, {
				title: "Identity Verification",
				sub: "Complete your KYC to unlock full features.",
				onBack: back
			}),
			[
				[
					"1",
					"ID Document",
					"Upload NIN or passport"
				],
				[
					"2",
					"Selfie Verification",
					"Take a clear photo"
				],
				[
					"3",
					"Address Proof",
					"Optional utility bill"
				]
			].map(([n, t, m]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-3 rounded-2xl border border-line bg-paper p-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "flex h-8 w-8 items-center justify-center rounded-full bg-wine text-[13px] font-semibold text-white",
					children: n
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "block text-[14px] font-semibold",
					children: t
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "block text-[12px] text-muted",
					children: m
				})] })]
			}, n)),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-auto",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
					onClick: () => go("kycDoc"),
					children: "Continue"
				})
			})
		]
	}));
	if (screen === "kycDoc") return frame(/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-1 flex-col gap-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BackTitle, {
				title: "Upload Document",
				sub: "Select document type.",
				onBack: back
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pills, {
				value: idType,
				options: ["NIN Card", "Passport"],
				onChange: (v) => setIdType(v === "Passport" ? "BVN" : "NIN")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "flex flex-1 cursor-pointer flex-col items-center justify-center rounded-[22px] border border-dashed border-wine/40 bg-paper px-6 py-10 text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "text-wine" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-[14px] font-semibold",
						children: docName || "Tap to upload or select"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-[12px] text-muted",
						children: "Supported formats: JPG, PNG, PDF"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "file",
						accept: "image/*,.pdf",
						className: "hidden",
						onChange: (e) => setDocName(e.target.files?.[0]?.name ?? "")
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
				onClick: () => go("kycSelfie"),
				children: "Next"
			})
		]
	}));
	if (screen === "kycSelfie") return frame(/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-1 flex-col",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BackTitle, {
				title: "Selfie Verification",
				sub: "Take a clear selfie.",
				onBack: back
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 flex flex-1 flex-col items-center",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative h-56 w-56 overflow-hidden rounded-full bg-[#f6ebe3] ring-4 ring-[#f0d7a4]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("video", {
						ref: videoRef,
						autoPlay: true,
						playsInline: true,
						muted: true,
						className: `h-full w-full object-cover ${camOn ? "" : "hidden"}`,
						style: { transform: "scaleX(-1)" }
					}), camOn ? null : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex h-full items-center justify-center px-6 text-center text-[13px] text-muted",
						children: "Position your face in the circle"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 text-[13px] text-muted",
					children: "Position your face in the circle"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
				onClick: () => go("kycDone"),
				children: "Capture"
			})
		]
	}));
	if (screen === "kycDone") return frame(/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-1 flex-col items-center justify-center text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "flex h-20 w-20 items-center justify-center rounded-full bg-[#e5f6ec] text-credit",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { size: 36 })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-5 text-[24px] font-semibold",
				children: "Verification Complete"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 max-w-[260px] text-[13px] text-muted",
				children: "Your ID and selfie are complete. You can now enjoy all features."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-8 w-full",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
					onClick: () => resetTo("home"),
					children: "Go to Dashboard"
				})
			})
		]
	}));
	if (screen === "tx") return frame(/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-1 flex-col",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BackTitle, {
				title: "Transaction Details",
				onBack: back
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col items-center py-4 text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "flex h-14 w-14 items-center justify-center rounded-full bg-[#e5f6ec] text-credit",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-[13px] font-semibold text-credit",
						children: "Success"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-[14px] text-muted",
						children: tx.title
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 font-display text-[32px]",
						children: ngn(Math.abs(tx.amount))
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "space-y-3 p-4 text-[14px]",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "flex justify-between gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-muted",
							children: "To"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-right",
							children: tx.who
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "flex justify-between gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-muted",
							children: "Bank"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: tx.bank ?? "Nakconel" })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "flex justify-between gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-muted",
							children: "Date"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Apr 27, 2025 · 10:24 AM" })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "flex justify-between gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-muted",
							children: "Reference"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "tabular-nums",
							children: tx.ref ?? "NAK123456789"
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-auto flex flex-col gap-3 pt-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, { children: "Share Receipt" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
					tone: "line",
					children: "Download"
				})]
			})
		]
	}));
	if (screen === "ticket") return frame(/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-1 flex-col gap-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BackTitle, {
				title: "Support Ticket",
				sub: "Create a new ticket.",
				onBack: back
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Subject category",
				value: "General inquiry",
				onChange: () => {}
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "block",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "mb-1.5 block text-[12px] font-medium text-muted",
					children: "Message"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
					placeholder: "Type your message...",
					className: "h-32 w-full rounded-2xl border border-line bg-paper p-3 text-[14px] outline-none"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-auto",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
					onClick: () => back(),
					children: "Submit"
				})
			})
		]
	}));
	if (screen === "adminKyc") {
		const rows = [
			{
				name: "Daniel Bello",
				meta: "NIN · 12345678901",
				tab: "Pending"
			},
			{
				name: "Mary Johnson",
				meta: "BVN · 22109887766",
				tab: "Pending"
			},
			{
				name: "Tunde Balogun",
				meta: "NIN · 10998877665",
				tab: "Approved"
			}
		].filter((r) => r.tab === adminTab || adminTab === "Rejected");
		return frame(/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BackTitle, {
				title: "KYC Review",
				onBack: back
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pills, {
				value: adminTab,
				options: [
					"Pending",
					"Approved",
					"Rejected"
				],
				onChange: setAdminTab
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "px-3",
				children: [(adminTab === "Rejected" ? [] : rows).map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
					title: r.name,
					meta: r.meta,
					onClick: () => setAdminTab("Approved")
				}, r.name)), adminTab === "Rejected" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "py-6 text-center text-[13px] text-muted",
					children: "No rejected reviews"
				}) : null]
			})
		] }));
	}
	if (screen === "adminTx") return frame(/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BackTitle, {
			title: "Transaction Monitoring",
			onBack: back
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pills, {
			value: filter,
			options: ["Alerts", "All"],
			onChange: setFilter
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
			className: "px-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
					title: "Large Transaction",
					meta: "₦5,000,000 · Apr 26, 2025"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
					title: "Multiple Failed Attempts",
					meta: "PIN · Apr 26, 2025"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
					title: "Unusual Location",
					meta: "Apr 26, 2025 · 02:12 AM"
				})
			]
		})
	] }));
	if (screen === "adminReports") return frame(/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BackTitle, {
			title: "Reports",
			onBack: back
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pills, {
			value: filter === "All" ? "Financial" : filter,
			options: [
				"Financial",
				"Compliance",
				"Users"
			],
			onChange: setFilter
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
			className: "px-3",
			children: [
				"User Management",
				"Risk & Report",
				"Security Host",
				"Audit Logs",
				"Configurations"
			].map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
				title: item,
				icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shield, { size: 16 })
			}, item))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, { children: "Download" })
	] }));
	return frame(/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center justify-between",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-[26px] font-semibold",
				children: "More"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-[13px] text-muted",
				children: fullName
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Logo, { size: 42 })]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
			className: "px-3",
			children: [
				{
					title: "Profile",
					meta: fullName,
					to: "profile",
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserRound, { size: 16 })
				},
				{
					title: "Statements",
					meta: "April 2025",
					to: "statements",
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { size: 16 })
				},
				{
					title: "Notifications",
					meta: "Transfers and security",
					to: "notes",
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bell, { size: 16 })
				},
				{
					title: "Beneficiaries",
					meta: "Saved accounts",
					to: "people",
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserRound, { size: 16 })
				},
				{
					title: "Payments & Bills",
					meta: "Airtime, data, power",
					to: "bills",
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Zap, { size: 16 })
				},
				{
					title: "Business",
					meta: "ABC Enterprises",
					to: "business",
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Building2, { size: 16 })
				},
				{
					title: "International Transfer",
					meta: "UK, US, Africa, GCC",
					to: "world",
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Earth, { size: 16 })
				},
				{
					title: "AI Assistant",
					meta: "Ask about your money",
					to: "assistant",
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { size: 16 })
				},
				{
					title: "Security",
					meta: "PIN, devices, biometrics",
					to: "security",
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shield, { size: 16 })
				},
				{
					title: "Help & Support",
					meta: "FAQs and tickets",
					to: "help",
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Headphones, { size: 16 })
				},
				{
					title: "KYC",
					meta: "Identity verification",
					to: "kyc",
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { size: 16 })
				},
				{
					title: "Admin · KYC Review",
					meta: "Pending applications",
					to: "adminKyc",
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shield, { size: 16 })
				},
				{
					title: "Admin · Monitoring",
					meta: "Alerts",
					to: "adminTx",
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shield, { size: 16 })
				},
				{
					title: "Admin · Reports",
					meta: "Financial and compliance",
					to: "adminReports",
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { size: 16 })
				}
			].map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
				title: item.title,
				meta: item.meta,
				icon: item.icon,
				onClick: () => go(item.to)
			}, item.title))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserButton, {})
	] }));
}
var SplitComponent = NakconelApp;
//#endregion
export { SplitComponent as component };
