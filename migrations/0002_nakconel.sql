create table if not exists profiles (
  user_id text primary key,
  full_name text not null default '',
  phone text not null default '',
  nin text not null default '',
  address text not null default '',
  gender text not null default '',
  dob text not null default '',
  pin_hash text,
  created_at timestamptz not null default now()
);

create table if not exists ledger_entries (
  id text primary key,
  user_id text not null,
  amount_kobo bigint not null,
  kind text not null,
  title text not null,
  meta text not null default '',
  counterparty text not null default '',
  bank_name text not null default '',
  reference text not null,
  created_at timestamptz not null default now()
);

create unique index if not exists ledger_user_ref_idx on ledger_entries (user_id, reference);
create index if not exists ledger_user_time_idx on ledger_entries (user_id, created_at desc);

create table if not exists beneficiaries (
  id text primary key,
  user_id text not null,
  name text not null,
  bank_id text not null,
  bank_name text not null,
  account_number text not null,
  created_at timestamptz not null default now()
);

create unique index if not exists beneficiaries_unique_idx
  on beneficiaries (user_id, bank_id, account_number);

create table if not exists topup_intents (
  reference text primary key,
  user_id text not null,
  amount_kobo bigint not null,
  status text not null default 'pending',
  created_at timestamptz not null default now()
);
