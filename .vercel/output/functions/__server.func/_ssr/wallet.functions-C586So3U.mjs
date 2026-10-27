import { i as TSS_SERVER_FUNCTION, r as createServerFn } from "./ssr.mjs";
import { r as getSql } from "./db-B4M_8-Ff.mjs";
import { n as authMiddleware, r as findBank } from "./banks-DI26cJzz.mjs";
import { randomBytes, scryptSync, timingSafeEqual } from "node:crypto";
//#region node_modules/.nitro/vite/services/ssr/assets/wallet.functions-C586So3U.js
var createServerRpc = (serverFnMeta, splitImportFn) => {
	const url = "/_serverFn/" + serverFnMeta.id;
	return Object.assign(splitImportFn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
function paymentsConnected() {
	return Boolean(process.env.PAYSTACK_SECRET_KEY?.trim());
}
function hashPin(pin) {
	const salt = randomBytes(16).toString("hex");
	return `${salt}:${scryptSync(pin, salt, 32).toString("hex")}`;
}
function pinMatches(pin, stored) {
	const [salt, hash] = stored.split(":");
	if (!salt || !hash) return false;
	const next = scryptSync(pin, salt, 32);
	const prev = Buffer.from(hash, "hex");
	if (next.length !== prev.length) return false;
	return timingSafeEqual(next, prev);
}
function accountNumber(userId, phone) {
	const digits = phone.replace(/\D/g, "");
	if (digits.length >= 10) return digits.slice(-10);
	let n = 0;
	for (const c of userId) n = n * 33 + c.charCodeAt(0) >>> 0;
	return String(n % 1e10).padStart(10, "0");
}
function mapEntry(row) {
	return {
		id: row.id,
		amountKobo: Number(row.amount_kobo),
		kind: row.kind,
		title: row.title,
		meta: row.meta,
		counterparty: row.counterparty,
		bankName: row.bank_name,
		reference: row.reference,
		createdAt: row.created_at instanceof Date ? row.created_at.toISOString() : String(row.created_at)
	};
}
async function readWallet(userId) {
	const sql = await getSql();
	await sql`
    insert into profiles (user_id)
    values (${userId})
    on conflict (user_id) do nothing
  `;
	const profile = (await sql`
    select full_name, phone, nin, address, gender, dob, pin_hash
    from profiles where user_id = ${userId}
  `)[0];
	const sums = await sql`
    select coalesce(sum(amount_kobo), 0) as bal from ledger_entries where user_id = ${userId}
  `;
	const entries = await sql`
    select id, amount_kobo, kind, title, meta, counterparty, bank_name, reference, created_at
    from ledger_entries
    where user_id = ${userId}
    order by created_at desc
    limit 50
  `;
	const people = await sql`
    select id, name, bank_id, bank_name, account_number
    from beneficiaries
    where user_id = ${userId}
    order by created_at desc
  `;
	return {
		balanceKobo: Number(sums[0]?.bal ?? 0),
		paymentsConnected: paymentsConnected(),
		accountNumber: accountNumber(userId, profile?.phone ?? ""),
		hasPin: Boolean(profile?.pin_hash),
		profile: {
			fullName: profile?.full_name ?? "",
			phone: profile?.phone ?? "",
			nin: profile?.nin ?? "",
			address: profile?.address ?? "",
			gender: profile?.gender ?? "",
			dob: profile?.dob ?? ""
		},
		entries: entries.map(mapEntry),
		beneficiaries: people.map((p) => ({
			id: p.id,
			name: p.name,
			bankId: p.bank_id,
			bankName: p.bank_name,
			accountNumber: p.account_number
		}))
	};
}
var getWallet_createServerFn_handler = createServerRpc({
	id: "cec358ccc455ba253d1a6528dc6a01b3c726b33822173d02a1e509be75c61365",
	name: "getWallet",
	filename: "src/lib/wallet.functions.ts"
}, (opts) => getWallet.__executeServer(opts));
var getWallet = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(getWallet_createServerFn_handler, async ({ context }) => readWallet(context.userId));
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
var saveProfile_createServerFn_handler = createServerRpc({
	id: "2cb41311da66abd44045aa08b70cbf9db3e675c5a0aaeec16396d79bb3761509",
	name: "saveProfile",
	filename: "src/lib/wallet.functions.ts"
}, (opts) => saveProfile.__executeServer(opts));
var saveProfile = createServerFn({ method: "POST" }).validator(profileInput).middleware([authMiddleware]).handler(saveProfile_createServerFn_handler, async ({ context, data }) => {
	await (await getSql())`
      insert into profiles (user_id, full_name, phone, nin, address, gender, dob)
      values (${context.userId}, ${data.fullName}, ${data.phone}, ${data.nin}, ${data.address}, ${data.gender}, ${data.dob})
      on conflict (user_id) do update set
        full_name = excluded.full_name,
        phone = excluded.phone,
        nin = excluded.nin,
        address = excluded.address,
        gender = excluded.gender,
        dob = excluded.dob
    `;
	return readWallet(context.userId);
});
var setPin_createServerFn_handler = createServerRpc({
	id: "4064eca9dfde33878d540317966308d363600ffea9641b95431f5cf584576f92",
	name: "setPin",
	filename: "src/lib/wallet.functions.ts"
}, (opts) => setPin.__executeServer(opts));
var setPin = createServerFn({ method: "POST" }).validator((input) => {
	const pin = String(input?.pin ?? "").replace(/\D/g, "");
	if (pin.length !== 4) throw new Error("PIN must be 4 digits.");
	return { pin };
}).middleware([authMiddleware]).handler(setPin_createServerFn_handler, async ({ context, data }) => {
	const sql = await getSql();
	if ((await sql`
      select pin_hash from profiles where user_id = ${context.userId}
    `)[0]?.pin_hash) return {
		ok: false,
		error: "A PIN is already set."
	};
	await sql`
      insert into profiles (user_id, pin_hash)
      values (${context.userId}, ${hashPin(data.pin)})
      on conflict (user_id) do update set pin_hash = excluded.pin_hash
    `;
	return { ok: true };
});
var resolveAccount_createServerFn_handler = createServerRpc({
	id: "eaff5cd133b210c6bb23c11799790c9662dd45a3896e6773101c05a228a516b7",
	name: "resolveAccount",
	filename: "src/lib/wallet.functions.ts"
}, (opts) => resolveAccount.__executeServer(opts));
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
}).middleware([authMiddleware]).handler(resolveAccount_createServerFn_handler, async ({ data }) => {
	const bank = findBank(data.bankId);
	if (!bank) return {
		ok: false,
		reason: "unknown_bank"
	};
	const key = process.env.PAYSTACK_SECRET_KEY?.trim();
	if (!key) return {
		ok: false,
		reason: "not_connected"
	};
	if (!bank.code) return {
		ok: false,
		reason: "unsupported"
	};
	const url = `https://api.paystack.co/bank/resolve?account_number=${data.accountNumber}&bank_code=${bank.code}`;
	const res = await fetch(url, { headers: { Authorization: `Bearer ${key}` } });
	const body = await res.json().catch(() => null);
	const name = body?.data?.account_name?.trim();
	if (!res.ok || !body?.status || !name) return {
		ok: false,
		reason: "not_found"
	};
	return {
		ok: true,
		accountName: name
	};
});
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
async function postDebit(userId, input) {
	const sql = await getSql();
	const stored = (await sql`
    select pin_hash from profiles where user_id = ${userId}
  `)[0]?.pin_hash;
	if (!stored) return {
		ok: false,
		error: "Create your transaction PIN first."
	};
	if (!pinMatches(input.pin, stored)) return {
		ok: false,
		error: "That PIN is not correct."
	};
	const amountKobo = input.amountNaira * 100;
	const reference = `idem:${input.idempotencyKey}`;
	const existing = await sql`
    select id, amount_kobo, kind, title, meta, counterparty, bank_name, reference, created_at
    from ledger_entries where user_id = ${userId} and reference = ${reference}
  `;
	if (existing[0]) return {
		ok: true,
		entry: mapEntry(existing[0])
	};
	const inserted = await sql`
    insert into ledger_entries (id, user_id, amount_kobo, kind, title, meta, counterparty, bank_name, reference)
    select ${crypto.randomUUID()}, ${userId}, ${-amountKobo}, ${input.kind}, ${input.title}, ${input.meta}, ${input.counterparty}, ${input.bankName}, ${reference}
    where (
      select coalesce(sum(amount_kobo), 0) from ledger_entries where user_id = ${userId}
    ) >= ${amountKobo}
    and not exists (
      select 1 from ledger_entries where user_id = ${userId} and reference = ${reference}
    )
    returning id, amount_kobo, kind, title, meta, counterparty, bank_name, reference, created_at
  `;
	if (!inserted[0]) return {
		ok: false,
		error: "Your balance is not enough for this payment."
	};
	if (input.saveBeneficiary) {
		const b = input.saveBeneficiary;
		await sql`
      insert into beneficiaries (id, user_id, name, bank_id, bank_name, account_number)
      values (${crypto.randomUUID()}, ${userId}, ${b.name}, ${b.bankId}, ${input.bankName}, ${b.accountNumber})
      on conflict (user_id, bank_id, account_number) do nothing
    `;
	}
	return {
		ok: true,
		entry: mapEntry(inserted[0])
	};
}
var transfer_createServerFn_handler = createServerRpc({
	id: "44906d073cdcc3ea695155c81d23d1d258cd17c5e0dbd7eec442d82b8226e33e",
	name: "transfer",
	filename: "src/lib/wallet.functions.ts"
}, (opts) => transfer.__executeServer(opts));
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
}).middleware([authMiddleware]).handler(transfer_createServerFn_handler, async ({ context, data }) => postDebit(context.userId, data));
var buyAirtime_createServerFn_handler = createServerRpc({
	id: "4cd30200bd9315c356880dd97c36f6df7529c5c26746231e32a384b2cbb2f692",
	name: "buyAirtime",
	filename: "src/lib/wallet.functions.ts"
}, (opts) => buyAirtime.__executeServer(opts));
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
}).middleware([authMiddleware]).handler(buyAirtime_createServerFn_handler, async ({ context, data }) => postDebit(context.userId, data));
var payBill_createServerFn_handler = createServerRpc({
	id: "3fb228223644b31e340fde8e2060924145d15ab4dd86120cf961fbc04c459259",
	name: "payBill",
	filename: "src/lib/wallet.functions.ts"
}, (opts) => payBill.__executeServer(opts));
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
}).middleware([authMiddleware]).handler(payBill_createServerFn_handler, async ({ context, data }) => postDebit(context.userId, data));
var startTopup_createServerFn_handler = createServerRpc({
	id: "3aa9ab1aaaa54876aa4e860a94ddaaf0c100a0c923b8efec24933cbdea26e345",
	name: "startTopup",
	filename: "src/lib/wallet.functions.ts"
}, (opts) => startTopup.__executeServer(opts));
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
}).middleware([authMiddleware]).handler(startTopup_createServerFn_handler, async ({ context, data }) => {
	const key = process.env.PAYSTACK_SECRET_KEY?.trim();
	if (!key) return {
		ok: false,
		reason: "not_connected"
	};
	const sql = await getSql();
	const email = (await sql`select "email" as email from "user" where "id" = ${context.userId}`)[0]?.email;
	if (!email) return {
		ok: false,
		reason: "no_email"
	};
	const reference = `nak_${crypto.randomUUID().replace(/-/g, "")}`;
	const amountKobo = data.amountNaira * 100;
	await sql`
      insert into topup_intents (reference, user_id, amount_kobo)
      values (${reference}, ${context.userId}, ${amountKobo})
    `;
	const res = await fetch("https://api.paystack.co/transaction/initialize", {
		method: "POST",
		headers: {
			Authorization: `Bearer ${key}`,
			"Content-Type": "application/json"
		},
		body: JSON.stringify({
			email,
			amount: amountKobo,
			reference,
			callback_url: `${data.origin}/?topup=${reference}`
		})
	});
	const body = await res.json().catch(() => null);
	const authorizationUrl = body?.data?.authorization_url;
	if (!res.ok || !body?.status || !authorizationUrl) return {
		ok: false,
		reason: "start_failed"
	};
	return {
		ok: true,
		authorizationUrl,
		reference
	};
});
var confirmTopup_createServerFn_handler = createServerRpc({
	id: "111e3d0c7b7d3b610bf520a311dffec8eff46b2b06196d691ee6f6598357ad3d",
	name: "confirmTopup",
	filename: "src/lib/wallet.functions.ts"
}, (opts) => confirmTopup.__executeServer(opts));
var confirmTopup = createServerFn({ method: "POST" }).validator((input) => {
	const reference = String(input?.reference ?? "");
	if (!/^nak_[a-z0-9]+$/i.test(reference)) throw new Error("Unknown payment.");
	return { reference };
}).middleware([authMiddleware]).handler(confirmTopup_createServerFn_handler, async ({ context, data }) => {
	const key = process.env.PAYSTACK_SECRET_KEY?.trim();
	if (!key) return {
		ok: false,
		error: "Card payments are not connected."
	};
	const sql = await getSql();
	const intent = (await sql`
      select amount_kobo, status from topup_intents
      where reference = ${data.reference} and user_id = ${context.userId}
    `)[0];
	if (!intent) return {
		ok: false,
		error: "That payment was not started from this account."
	};
	const ledgerRef = `paystack:${data.reference}`;
	const already = await sql`
      select id, amount_kobo, kind, title, meta, counterparty, bank_name, reference, created_at
      from ledger_entries where user_id = ${context.userId} and reference = ${ledgerRef}
    `;
	if (already[0]) return {
		ok: true,
		entry: mapEntry(already[0])
	};
	const res = await fetch(`https://api.paystack.co/transaction/verify/${data.reference}`, { headers: { Authorization: `Bearer ${key}` } });
	const body = await res.json().catch(() => null);
	if (!res.ok || body?.data?.status !== "success" || Number(body.data.amount) !== Number(intent.amount_kobo)) return {
		ok: false,
		error: "Paystack has not confirmed this payment."
	};
	const inserted = await sql`
      insert into ledger_entries (id, user_id, amount_kobo, kind, title, meta, counterparty, bank_name, reference)
      values (
        ${crypto.randomUUID()}, ${context.userId}, ${intent.amount_kobo}, ${"topup"}, ${"Wallet top-up"},
        ${"Paystack"}, ${"Paystack"}, ${"Paystack"}, ${ledgerRef}
      )
      on conflict (user_id, reference) do nothing
      returning id, amount_kobo, kind, title, meta, counterparty, bank_name, reference, created_at
    `;
	await sql`update topup_intents set status = 'paid' where reference = ${data.reference}`;
	const entry = inserted[0] ?? already[0];
	if (!entry) return {
		ok: false,
		error: "The payment was confirmed but not recorded. Try again."
	};
	return {
		ok: true,
		entry: mapEntry(entry)
	};
});
//#endregion
export { buyAirtime_createServerFn_handler, confirmTopup_createServerFn_handler, getWallet_createServerFn_handler, payBill_createServerFn_handler, resolveAccount_createServerFn_handler, saveProfile_createServerFn_handler, setPin_createServerFn_handler, startTopup_createServerFn_handler, transfer_createServerFn_handler };
