# Hotspot Harbor Network Suite

Absolutely. Since you want to build your own platform similar in functionality to SopraEnt, the prompt should tell Lovable to build the actual SaaS architecture, not just a landing page. I'd recommend React/TypeScript + Supabase, with MikroTik integration designed around RouterOS API/RADIUS and payment gateways.

Here is a copy-paste prompt:

Build a Complete ISP / Wi-Fi Billing and MikroTik Management SaaS Platform

Build a production-ready, modern Wi-Fi Hotspot Billing, Voucher Management, Customer Management and MikroTik Network Management SaaS platform similar in functionality to modern ISP billing platforms such as SopraEnt, but with completely original branding, UI, code and architecture.

The platform should be designed primarily for Ugandan ISPs, hotspot operators, hostels, hotels, schools, restaurants, campuses and public Wi-Fi businesses, while being scalable to other African markets.

Do NOT build only a frontend mockup. Build a functional full-stack application with authentication, database, APIs, dashboards, network management, billing logic and integration-ready architecture.

1. TECHNOLOGY STACK

Use:

React

TypeScript

Vite

Tailwind CSS

shadcn/ui

Supabase

PostgreSQL database

Authentication

Row Level Security

Realtime

Storage

Edge Functions

REST APIs where appropriate

WebSockets/realtime updates where appropriate

Charting library for analytics

Secure server-side handling of secrets

Responsive PWA-style interface

The application must be deployable to Vercel.

Use environment variables for:

Supabase URL

Supabase anon key

Supabase service key

MikroTik API credentials

RADIUS credentials

Payment gateway credentials

SMS credentials

WhatsApp credentials

Other third-party integrations

NEVER expose secret credentials in frontend code.

2. PLATFORM BRANDING

Create an original platform name:

NetBill Africa

Tagline:

"Smart Wi-Fi Billing & Network Management"

Use a professional technology/telecommunications design.

Primary colors:

Deep blue

White

Dark navy

Light gray

Create:

Logo

Favicon

Login branding

Dashboard branding

Customer portal branding

The UI should feel like professional ISP/network-management software rather than a generic admin dashboard.

3. USER ROLES

Implement role-based access control.

Roles:

Super Admin

Can manage the entire SaaS platform.

Permissions:

Manage organizations

Manage tenants

Manage plans

Manage subscriptions

Manage system settings

Manage integrations

View system-wide analytics

Manage administrators

Organization Owner

The owner of an ISP/hotspot business.

Can:

Manage routers

Manage APs

Manage customers

Create packages

Generate vouchers

Manage payments

Manage agents

View revenue

Manage staff

Configure captive portal

Manage SMS/payment integrations

Network Administrator

Can:

Manage routers

Manage APs

Monitor clients

Manage Hotspot

View sessions

View network usage

Configure network settings

But cannot manage billing/payment settings unless permitted.

Billing Staff

Can:

Create customers

Sell vouchers

View payments

View transactions

Print vouchers

View revenue

Agent/Reseller

Can:

Sell vouchers

View assigned packages

View commissions

View customers assigned to them

View sales

Cannot access router configuration.

Customer

Can:

Login

View active package

View remaining data

View expiry

Purchase Internet

View payments

View usage

Manage profile

4. MULTI-TENANT ARCHITECTURE

This is extremely important.

The system must support multiple independent businesses using the platform.

Example:

Organization A:

"Bethel Hostel Wi-Fi"

Organization B:

"Julius Public Wi-Fi"

Organization C:

"CampusNet Uganda"

Each organization must have completely isolated:

Customers

Routers

APs

Vouchers

Payments

Packages

Staff

Reports

Settings

Use organization_id/tenant_id throughout the database.

Implement Supabase Row Level Security so one organization can NEVER access another organization's data.

5. MAIN ADMIN DASHBOARD

Create a professional dashboard containing:

KPI cards

Total Customers

Active Customers

Online Users

Active Vouchers

Today's Sales

Today's Revenue

Monthly Revenue

Data Usage

Online Routers

Offline Routers

Online APs

Failed Payments

Charts

Revenue over time.

Customer growth.

Data consumption.

Voucher sales.

Payment methods.

Active sessions.

Router availability.

AP availability.

Live activity

Show:

New payments

New customers

Voucher activations

Login events

Router alerts

AP alerts

Failed transactions

Use realtime updates.

6. MIKROTIK ROUTER MANAGEMENT

Build a complete Router Management section.

Users should be able to:

Add router

Edit router

Delete router

Test connection

Enable/disable router

View router status

View CPU usage

View RAM usage

View uptime

View interface traffic

View connected clients

View IP addresses

View DHCP leases

View Hotspot users

View active sessions

View system information

Router fields:

Router name

Location

IP address

API port

Username

Password

RouterOS version

Organization

Status

Last seen

Connection method

Support:

RouterOS API

Prefer secure API communication.

Support:

API

API-SSL where available

REST/API integration where appropriate

DO NOT store router passwords as plaintext.

Encrypt sensitive credentials.

7. AUTOMATED MIKROTIK PROVISIONING

Create a router provisioning system.

When an administrator adds a router, provide:

"Provision Router"

The system should generate configuration instructions/scripts for:

Hotspot

DHCP

Address pools

DNS

RADIUS

Firewall

Walled garden

Captive portal

Accounting

API access

Bandwidth profiles

The provisioning process must be safe.

Before changing configuration:

Validate router

Display intended changes

Require confirmation

Create backup where possible

Log every provisioning action

Create a provisioning status screen:

Connecting
✓ Router detected
✓ RouterOS version detected
✓ API connection successful
✓ Backup created
✓ Hotspot configured
✓ RADIUS configured
✓ Address pool configured
✓ Firewall configured
✓ Captive portal configured
✓ Accounting configured

8. RADIUS SYSTEM

Build a RADIUS-compatible architecture for:

Hotspot authentication

PPPoE authentication

Accounting

Session tracking

Data limits

Time limits

Speed limits

Store:

Username

Password/hash where appropriate

Customer

Package

Router

MAC address

IP address

Start time

End time

Upload

Download

Total usage

Session status

The system should support RADIUS attributes for:

Download speed

Upload speed

Session timeout

Data quota

Idle timeout

Simultaneous sessions

Keep the RADIUS implementation modular so an external FreeRADIUS server can be connected later.

9. VOUCHER SYSTEM

Create a complete voucher-management system.

Features:

Generate one voucher

Generate bulk vouchers

Random voucher codes

Custom prefixes

QR codes

Printable vouchers

Download PDF

Export CSV

Voucher activation

Voucher expiration

Voucher suspension

Voucher cancellation

Voucher history

Voucher statuses:

Generated

Available

Active

Expired

Suspended

Used

Cancelled

Each voucher should contain:

Code

Package

Price

Data allowance

Duration

Speed profile

Device limit

Creation date

Activation date

Expiry date

Customer

Agent

Router

AP/location

10. INTERNET PACKAGES

Create a package-management module.

Example:

1 Hour

Price: UGX 1,000

Speed:

5 Mbps

Data:

1 GB

Duration:

1 hour

Daily

Price:

UGX 2,000

Speed:

5 Mbps

Data:

3 GB

Duration:

24 hours

Weekly

Price:

UGX 10,000

Speed:

10 Mbps

Data:

20 GB

Duration:

7 days

Monthly

Price:

UGX 30,000

Speed:

10 Mbps

Data:

100 GB

Duration:

30 days

Allow administrators to customize everything.

Package fields:

Name

Price

Currency

Duration

Data limit

Download speed

Upload speed

Device limit

Grace period

Description

Status

11. CUSTOMER MANAGEMENT

Create a CRM-style customer module.

Customer fields:

Full name

Phone number

Email

Username

MAC address

IP address

Location

Organization

Package

Account status

Registration date

Expiry date

Total spending

Total data usage

Last login

Customer profile should show:

Overview

Current package.

Status.

Expiry.

Balance.

Sessions

Login/logout history.

Usage

Upload/download statistics.

Payments

Transaction history.

Devices

Registered devices.

Vouchers

Purchased/assigned vouchers.

12. CAPTIVE PORTAL

Build a fully customizable captive portal.

Customer sees:

--------------------------------
       NETBILL AFRICA

    Connect to the Internet

 [ Voucher Code ]

       [ LOGIN ]

-------------------------------
       OR

      BUY INTERNET

 [ 1 HOUR - UGX 1,000 ]

 [ 1 DAY - UGX 2,000 ]

 [ 7 DAYS - UGX 10,000 ]

-------------------------------

Need help?
Call: 07XXXXXXXX
--------------------------------

Features:

Organization logo

Custom colors

Custom background

Package cards

Voucher login

Phone login

OTP login

Payment

Terms and conditions

Contact information

Advertisement banner

Promotional messages

Create a portal builder/settings page.

13. MOBILE MONEY

Build a payment abstraction layer.

Do not hard-code the application to only one payment provider.

Create:

PaymentGateway

interface/module.

Support integration-ready architecture for:

MTN Mobile Money

Airtel Money

Flutterwave

Pesapal

Other African payment gateways

For Uganda, prioritize:

MTN Mobile Money

Airtel Money

Payment flow:

Customer selects package
        ↓
Enters phone number
        ↓
Payment request
        ↓
Mobile Money prompt
        ↓
Customer approves
        ↓
Gateway callback/webhook
        ↓
Verify transaction
        ↓
Create payment record
        ↓
Activate package
        ↓
Create/assign voucher or account
        ↓
Notify customer

IMPORTANT:

Never activate Internet access solely because the frontend says payment succeeded.

Always verify payment server-side using the gateway callback/status API.

Prevent:

Duplicate transactions

Fake payment confirmations

Replay attacks

Duplicate voucher activation

14. PAYMENT MANAGEMENT

Create a payment dashboard.

Columns:

Transaction ID

Customer

Phone

Amount

Currency

Payment method

Gateway

Status

Date

Package

Router

Reference

Statuses:

Pending

Successful

Failed

Cancelled

Refunded

Create revenue reports:

Today

Yesterday

Last 7 days

Last 30 days

This month

Custom range

15. SMS SYSTEM

Create an SMS integration layer.

Support integration with configurable SMS providers.

Use it for:

OTP

Payment confirmation

Voucher delivery

Expiry reminders

Password reset

Promotional messages

Create SMS templates.

Example:

"Your NetBill Internet package has been activated. Package: {{package}}. Expiry: {{expiry}}."

16. WHATSAPP NOTIFICATIONS

Create an integration-ready WhatsApp notification module.

Use it for:

Payment confirmation

Voucher delivery

Expiry alerts

Customer support

Keep the provider configurable.

17. ACCESS POINT MANAGEMENT

Create an AP management module.

Fields:

AP name

MAC address

IP

Location

Router

Model

Manufacturer

Status

Last seen

Connected users

Signal information

Dashboard:

AP-01
ONLINE
23 Users

AP-02
ONLINE
17 Users

AP-03
OFFLINE
Last seen 12 minutes ago

Support AP grouping by:

Hostel

Building

Floor

Zone

Location

18. LIVE CLIENT MONITORING

Create a real-time clients page.

Show:

Username

MAC

IP

Router

AP

Package

Download speed

Upload speed

Data used

Session duration

Signal strength where available

Status

Allow administrators to:

Disconnect user

Block device

Unblock device

View customer

View session

19. BANDWIDTH MANAGEMENT

Create speed profiles.

Example:

Profile: Basic
Download: 5 Mbps
Upload: 2 Mbps

Profile: Standard
Download: 10 Mbps
Upload: 5 Mbps

Profile: Premium
Download: 20 Mbps
Upload: 10 Mbps

Map speed profiles to packages.

Generate the appropriate MikroTik/RADIUS configuration.

20. DATA LIMITS

Support:

Daily quota

Package quota

Monthly quota

Session quota

Example:

Package:
20 GB

Used:
13.4 GB

Remaining:
6.6 GB

Automatically stop or restrict access when the quota is reached.

21. TIME LIMITS

Support:

1 hour

3 hours

6 hours

12 hours

24 hours

7 days

30 days

Implement:

Session timeout

Account expiry

Package expiry

Grace period

22. AGENT / RESELLER SYSTEM

Create a reseller system.

Agents can:

Buy voucher batches

Sell vouchers

View sales

View commissions

View customers

View balance

Admin can define:

Voucher price:
UGX 10,000

Agent commission:
UGX 1,000

Platform revenue:
UGX 9,000

Create agent dashboard.

23. MULTI-LOCATION SUPPORT

A single organization can have:

Organization
│
├── Location 1
│   ├── Router
│   ├── APs
│   └── Customers
│
├── Location 2
│   ├── Router
│   ├── APs
│   └── Customers
│
└── Location 3
    ├── Router
    ├── APs
    └── Customers

Locations could be:

Hostels

Hotels

Restaurants

Campuses

Shops

Public hotspots

24. REPORTING

Create professional reports.

Revenue

Daily

Weekly

Monthly

Yearly

Custom

Network

Data usage

Active users

Peak users

Sessions

Router uptime

Customers

New customers

Active customers

Expired customers

Churn

Vouchers

Generated

Sold

Activated

Expired

Unused

Payments

Successful

Failed

Pending

Refunded

Allow:

CSV export

PDF export

Print

25. ALERTS

Create an alert center.

Alerts:

Router offline

AP offline

Payment failure

High bandwidth usage

Low data balance

Voucher expiring

ISP connection failure

Authentication failures

26. AUDIT LOG

Every important administrative action must be logged.

Example:

Admin:
Kabi Julius Paul

Action:
Router provisioning

Router:
Bethel-MikroTik-01

Date:
23 Sept 2026

Result:
Successful

Log:

Login

Logout

Router changes

Package changes

Voucher creation

Voucher deletion

Payment changes

Customer changes

Permission changes

Configuration changes

27. DATABASE DESIGN

Create a proper normalized PostgreSQL schema.

At minimum:

organizations
organization_users
roles
permissions
locations
routers
router_credentials
router_interfaces
access_points
customers
customer_devices
packages
speed_profiles
vouchers
voucher_batches
sessions
radius_accounts
radius_sessions
payments
payment_gateways
payment_webhooks
sms_providers
sms_logs
notifications
agents
agent_sales
commissions
subscriptions
invoices
audit_logs
support_tickets
captive_portal_settings
system_settings

Use UUID primary keys.

Use foreign keys.

Add timestamps.

Add appropriate indexes.

Use RLS policies throughout.

28. SECURITY

Security is a priority.

Implement:

Supabase Auth

Email/password authentication

Password reset

Optional MFA

Role-based access control

Row Level Security

API authentication

Rate limiting

Server-side validation

Input sanitization

Secure webhook verification

Encrypted credentials

Audit logs

Session management

CSRF protection where applicable

Never expose:

MikroTik passwords

Payment secrets

Supabase service key

SMS credentials

API tokens

to the browser.

29. SAAS SUBSCRIPTIONS

Because this is intended to become a SaaS platform, create platform subscription plans.

Example:

Starter

UGX 25,000/month

1 router

500 customers

5 APs

Business

UGX 75,000/month

5 routers

5,000 customers

50 APs

Enterprise

Custom pricing

Unlimited routers

Unlimited customers

Advanced reporting

Dedicated support

Build subscription architecture but make the pricing configurable from the Super Admin dashboard.

30. SUPER ADMIN PLATFORM

Create a separate Super Admin dashboard.

Show:

Total organizations

Active subscriptions

Revenue

Routers

APs

Customers

Payments

System health

Super Admin can:

Create organizations

Suspend organizations

Manage subscriptions

Manage platform plans

View platform revenue

Manage integrations

Manage system settings

View audit logs

Manage administrators

31. CUSTOMER SELF-SERVICE PORTAL

Create a separate customer-facing portal.

Customers can see:

Internet Status
----------------
ACTIVE

Package
7 Days

Remaining
4 Days 8 Hours

Data Remaining
12.4 GB

Expiry
30 Sept 2026

Buttons:

Buy Internet

Renew

View Usage

View Payments

Manage Devices

Contact Support

32. UI/UX

Make the UI:

Modern

Clean

Fast

Professional

Responsive

Mobile-first

Desktop-friendly

Use:

Sidebar navigation

Top navigation

Cards

Tables

Charts

Status badges

Modals

Drawers

Toast notifications

Loading skeletons

Empty states

Error states

Use dark mode.

Do not create excessive animations.

Prioritize usability for network administrators.

33. DASHBOARD NAVIGATION

Main sidebar:

Dashboard

Network
  Routers
  Access Points
  Live Clients
  Network Usage

Billing
  Packages
  Vouchers
  Payments
  Invoices

Customers
  Customers
  Devices
  Sessions

Sales
  Agents
  Commissions

Communication
  SMS
  WhatsApp
  Notifications

Captive Portal

Reports

Support

Settings
  Organization
  Users
  Roles
  Integrations
  Payment Gateways
  SMS Gateways
  Network Settings

Audit Logs

34. IMPORTANT DEVELOPMENT RULE

Do not fake functionality.

If an integration cannot be completed without credentials or an external server, create:

A proper integration interface.

Secure configuration page.

API/service layer.

Database tables.

Webhook handling.

Test connection functionality.

Clear setup instructions.

Do not create fake "successful" payment transactions or fake router status.

Use realistic mock data ONLY in development/demo mode and clearly separate it from production data.

35. DEVELOPMENT PHASES

Build the application in phases.

Phase 1

Authentication.

Organizations.

Users.

Roles.

Database.

Dashboard.

Phase 2

Customers.

Packages.

Vouchers.

Billing.

Payments.

Phase 3

MikroTik integration.

Router management.

Hotspot.

RADIUS architecture.

Sessions.

Phase 4

Captive portal.

Mobile money.

SMS.

Notifications.

Phase 5

AP management.

Live clients.

Network analytics.

Phase 6

Agents/resellers.

Reports.

Invoices.

Subscriptions.

Phase 7

Security hardening.

Audit logs.

Testing.

Performance optimization.

Production deployment.

36. DEMO DATA

Create a development seed organization:

Bethel Hostel Wi-Fi

Locations:

Boys Hostel

Girls Hostel

Common Area

Routers:

BETHEL-MIKROTIK-01

APs:

BETHEL-AP-01

BETHEL-AP-02

BETHEL-AP-03

BETHEL-AP-04

Packages:

1 Hour

1 Day

3 Days

7 Days

30 Days

Generate realistic demo customers, vouchers, payments and sessions.

Clearly label demo data.

37. DELIVERABLE

At the end, provide:

Fully working application

Supabase database schema

RLS policies

Authentication

Admin dashboard

Customer dashboard

Router management

Voucher system

Package system

Payment architecture

Captive portal

RADIUS integration architecture

MikroTik integration architecture

AP management

Reporting

SMS architecture

Agent system

Audit logs

SaaS subscription architecture

Responsive UI

Environment variable documentation

Deployment instructions for Vercel

Supabase setup instructions

MikroTik integration instructions

Payment gateway setup instructions

The final application should be structured so that it can evolve into a real commercial Ugandan ISP and Wi-Fi billing SaaS platform, rather than being a simple demonstration website.

One change I'd strongly recommend

Because you're already working with MikroTik + hostel/public Wi-Fi deployments, don't ask Lovable to make everything work directly from the browser. The architecture should be:

Lovable frontend → Supabase/Edge Functions → secure backend services → MikroTik/RADIUS/payment providers

That is much safer than:

Browser → MikroTik API

and it will make the system much easier to turn into a real SaaS product later.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/4f9552aa-6df6-41cd-a444-37fcd629609e).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
