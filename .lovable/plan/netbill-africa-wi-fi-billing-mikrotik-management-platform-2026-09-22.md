# NetBill Africa — Wi-Fi Billing & MikroTik Management Platform

A multi-tenant SaaS for Ugandan ISPs and hotspot operators: customers, packages, vouchers, payments, routers, access points and reporting — built for real use, not a mockup.

Two notes before we start:
- The app runs on this workspace's React + TypeScript stack with Lovable Cloud as the backend (Postgres database, logins, row-level security, server-side functions). That covers everything the brief asked Supabase to do; no separate account or setup needed.
- Anything needing outside credentials (mobile money, SMS, WhatsApp, live MikroTik routers) gets a real settings page, secure credential storage, service layer and test-connection button — never a faked "success".

## Scope and order

This is far too large for one pass. I'll build it in stages, each one usable on its own. Say the word and I start Stage 1.

### Stage 1 — Foundation (this first build)
- Enable Lovable Cloud; email/password + Google sign-in.
- Database: organizations, memberships, roles, locations, packages, speed profiles, customers, vouchers, voucher batches, payments, sessions, routers, access points, audit logs — all keyed by organization with row-level security so one business can never see another's data.
- Roles: Super Admin, Organization Owner, Network Admin, Billing Staff, Agent, Customer (roles in their own table, checked server-side).
- App shell: deep-blue/navy ISP-style dark UI, sidebar navigation, top bar, org switcher.
- Main dashboard: KPI cards, revenue/customer/usage charts, live activity feed.
- Demo organization "Bethel Hostel Wi-Fi" with locations, router, 4 APs, 5 packages and realistic customers, vouchers, payments and sessions — clearly labelled as demo.

### Stage 2 — Billing core
Packages, speed profiles, voucher generation (single + bulk, prefixes, QR, printable PDF, CSV), voucher lifecycle, customer CRM with profile tabs (overview, sessions, usage, payments, devices, vouchers), payments table and revenue reports.

### Stage 3 — Network
Router registry with encrypted credentials, test connection, status/CPU/RAM/uptime/clients, guided provisioning with preview-confirm-backup-log, AP management and grouping, live client monitoring with disconnect/block.

### Stage 4 — Money and messaging
Payment gateway abstraction (MTN MoMo, Airtel Money, Flutterwave, Pesapal) with server-side verification, idempotent webhooks, replay protection; SMS and WhatsApp provider layers with templates; captive portal builder and the customer-facing portal.

### Stage 5 — Growth
Agents/resellers with commissions, invoices, full reporting with CSV/PDF export, alert centre, platform subscription plans and the Super Admin console.

### Stage 6 — Hardening
Rate limiting, MFA option, security review, performance, deployment and integration documentation.

## Architecture

Browser never talks to a router, gateway or SMS provider directly.

```text
Browser (React)
      |
Server functions (auth + validation + secrets)
      |
MikroTik RouterOS API / RADIUS / Payment gateways / SMS
```

- All secrets live in the encrypted secret store and are read only inside server code.
- Router passwords are encrypted at rest, never returned to the browser.
- Payment activation only happens after server-side verification against the gateway.
- Every admin action writes an audit log row.

## Technical details

- Routes: `/` marketing-lite sign-in entry, `/auth`, `/app/*` for the operator console behind an auth gate, `/portal/*` for customers, `/admin/*` for Super Admin.
- Data access through server functions with an auth middleware; row-level security scoped by `organization_id` plus a `has_role()` security-definer function.
- RADIUS modelled as its own tables (accounts, sessions, attributes) so an external FreeRADIUS can be attached later without schema change.
- Charts via Recharts; tables with sorting, filtering, pagination; toasts, skeletons, empty and error states throughout.
- Hosting is Lovable's own deploy rather than Vercel; the codebase stays portable.

## Open question

The brief lists roughly 200 screens' worth of functionality. Stage 1 above is what I'll deliver in the first build; each later stage is a follow-up request. If you'd rather reorder (for example routers before vouchers), tell me now.
