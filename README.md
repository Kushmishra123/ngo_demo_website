# 🌱 Agape Hope Federation - NGO Operations & ERP Admin Dashboard

A responsive, high-end NGO Operations & ERP Management Dashboard for **Agape Hope Federation**, built with **React (Vite)**, **Tailwind CSS**, and **Lucide React**. 

Designed specifically for **client pitches, stakeholder demos, and operational demonstrations**, this platform provides live CRUD interactivity, real-time metrics calculation, sweet toast notifications, and full state synchronization with **LocalStorage** (all added/deleted records persist across refreshes).

---

## 🚀 Quick Start Instructions

To run the dashboard locally in development mode:

```bash
# 1. Navigate to the project directory (if not already there)
cd ngo_website

# 2. Start the Vite development server
npm run dev
```

Open your browser and navigate to: **`http://localhost:3000`** (or the URL shown in your terminal).

To create an optimized production build:
```bash
npm run build
npm run preview
```

---

## 🌟 Key Functional Modules

### 1. Dashboard & Impact Analytics (Overview)
- **Top Statutory Metric Cards**: Total Donations (₹), Audited Expenses (₹), Active Field Projects, Direct Beneficiaries Reached, and Active Volunteer Corps.
- **Funds Utilization & Reserve Bar**: Live calculation of allocated capital vs. emergency reserve pool.
- **Intervention Pillars Breakdown**: Visual reach across Education, Medical, Food/Ration, and Water/Sanitation.
- **Live Operations Activity Feed**: Real-time event log for donor receipts, field admissions, and expense vouchers.
- **Field Missions Milestone Table**: Snapshot of active mission progress and lead managers.

### 2. Donor & Donation Management
- Tabular ledger of individual, HNI, and corporate CSR contributions.
- Columns: Donor Name, Email, Amount (₹), Frequency (One-time / Recurring), Campaign, Date, Payment Method, and automated 80G Tax Exemption generation.
- **"Add Donation / Donor" Modal**: Instant validation, real-time table update, and LocalStorage sync.
- **Export to CSV**: One-click download of donor statement.
- Instant record deletion with toast feedback.

### 3. Direct Beneficiary Registry
- Comprehensive registry tracking marginalized families and individuals.
- Columns: Recipient Name, Assistance Category (Food / Medical / Education / Shelter), Aid Kit Details, Ward/Location, Registration Date, Aadhaar verification reference, and Verification Status.
- **"Register Beneficiary" Modal**: Field officer onboarding workflow.
- **Interactive Status Toggle**: One-click toggle between `Verified` and `Pending`.
- Instant delete row capability.

### 4. Project & Mission Portfolio
- High-impact visual card grid with mission descriptions and lead managers.
- Visual **Budget Utilization Progress Bars** (Funds Spent vs. Target Budget).
- Reached beneficiaries count and regional focus indicators.
- **"Create New Project" Modal**: Dynamic mission launch with custom budget and scope.

### 5. Volunteer Force & Grassroots Network
- Mobilization dashboard for community service fellows and coordinators.
- Columns: Volunteer Name, Core Skills & Specialization, Assigned Mission, Hours Logged, Contact info, and Availability Status.
- **"Onboard Volunteer" Modal**: Skill-matching and assignment workflow.
- Instant delete row capability.

### 6. Finance & Accounting (Voucher Ledger)
- Complete income vs. expense ledger adhering to Indian non-profit statutory standards.
- Columns: Voucher Number, Transaction Title, Type (Income / Expense), Category, Amount (₹), Digital Bill Attachment simulator, Date, and Auditor Approval Status.
- **"Record Expense Voucher" Modal**: Expense logging with category, bill upload simulation, and authorization level.
- Live Net Operating Reserve calculation.

### 7. Governance, Compliance & ERP Tabs
- **HR & Core Staff**: Roster with compensation, tenure, department, and full-time designations.
- **Crowdfunding & CSR Campaigns**: Active fundraising goals, raised funds progress bars, and campaign timelines.
- **Inventory, Fleet & Assets**: Capital assets tracking (e.g., custom solar medical vans, ration kits, digital learning tablets).
- **Statutory Compliance Vault**: Section 80G, Section 12A, FCRA Foreign Contribution Act, NITI Aayog Darpan ID, and MCA CSR-1 certifications.
- **Public Website CMS**: Manage published impact stories, case studies, and annual transparency statements.
- **Role-Based Access Control (RBAC)**: Security permission matrix for Executive Directors, Program Leads, and Finance Auditors.

---

## 🔄 Client Presentation Features

- **Pristine Reset Demo Button**: Located right in the top navigation bar, this button instantly resets all modules back to the clean, realistic initial mock dataset whenever needed during a presentation.
- **Global Search**: Search instantly across donors, vouchers, beneficiaries, and projects.
- **Quick Action Menu**: Fast modal triggers from anywhere in the app.
- **Sweet Toast Notifications**: High-contrast, floating toast banners for success and deletion alerts.
- **100% Client-Side Persistence**: Refreshing the browser preserves every change without needing a backend server.

