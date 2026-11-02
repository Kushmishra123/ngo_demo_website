export const INITIAL_DATA = {
  donors: [
    {
      id: "DON-1001",
      name: "Rajesh & Sunita Mehra",
      email: "rajesh.mehra@apextech.com",
      amount: 150000,
      type: "Recurring",
      campaign: "Girl Child Education Initiative",
      date: "2026-10-28",
      paymentMethod: "Bank Transfer (NEFT)",
      panNumber: "ABCDE1234F",
      taxExemption80G: true
    },
    {
      id: "DON-1002",
      name: "Dr. Ananya Sen",
      email: "ananya.sen@apollohealth.org",
      amount: 45000,
      type: "One-time",
      campaign: "Rural Mobile Medical Clinics",
      date: "2026-10-26",
      paymentMethod: "UPI / Razorpay",
      panNumber: "BNKPS9872K",
      taxExemption80G: true
    },
    {
      id: "DON-1003",
      name: "TATA Trust CSR Fund",
      email: "csr.grants@tatatrusts.org",
      amount: 750000,
      type: "Recurring",
      campaign: "Clean Water & Sanitation Drive",
      date: "2026-10-20",
      paymentMethod: "Institutional Wire",
      panNumber: "AAACT1122D",
      taxExemption80G: true
    },
    {
      id: "DON-1004",
      name: "Vikramaditya Singhania",
      email: "v.singhania@heritagegroup.in",
      amount: 80000,
      type: "One-time",
      campaign: "Emergency Malnutrition Relief",
      date: "2026-10-14",
      paymentMethod: "Credit Card (International)",
      panNumber: "AAQPS4422M",
      taxExemption80G: true
    },
    {
      id: "DON-1005",
      name: "Meera Krishnan",
      email: "meera.k@gmail.com",
      amount: 25000,
      type: "Recurring",
      campaign: "Skill Center for Rural Youths",
      date: "2026-10-10",
      paymentMethod: "UPI / Auto-Debit",
      panNumber: "CKLPR8819Q",
      taxExemption80G: true
    }
  ],

  beneficiaries: [
    {
      id: "BEN-2001",
      name: "Pooja Kumari & Family",
      category: "Education",
      status: "Verified",
      date: "2026-10-25",
      location: "Basti Block-C, Dharavi, Mumbai",
      aidProvided: "Annual School Fee & Digital Tablet",
      contact: "+91 98201 44521",
      aadhaarLast4: "8472"
    },
    {
      id: "BEN-2002",
      name: "Rameshwar Prasad Yadav",
      category: "Medical",
      status: "Verified",
      date: "2026-10-22",
      location: "Sonbhadra Rural Ward 4, UP",
      aidProvided: "Cataract Surgery & Post-Op Medication",
      contact: "+91 94152 77103",
      aadhaarLast4: "1938"
    },
    {
      id: "BEN-2003",
      name: "Shanti Devi Self-Help Group (12 Members)",
      category: "Food",
      status: "Verified",
      date: "2026-10-19",
      location: "Kala Amb District, Solan, HP",
      aidProvided: "Monthly Dry Ration & Nutrition Kits (6 Mo)",
      contact: "+91 97361 22849",
      aadhaarLast4: "6620"
    },
    {
      id: "BEN-2004",
      name: "Mohd. Tariq & 3 Dependents",
      category: "Medical",
      status: "Pending",
      date: "2026-10-29",
      location: "Mustafabad, North East Delhi",
      aidProvided: "Specialist Consultation & Dialysis Subsidy",
      contact: "+91 88002 91823",
      aadhaarLast4: "5501"
    },
    {
      id: "BEN-2005",
      name: "Geeta Ramakrishnan",
      category: "Food",
      status: "Pending",
      date: "2026-10-30",
      location: "Pammal Slum Settlement, Chennai",
      aidProvided: "Emergency Supplemental Ration Kit",
      contact: "+91 94441 55902",
      aadhaarLast4: "3184"
    }
  ],

  projects: [
    {
      id: "PRJ-3001",
      name: "Project Shiksha: 500 Girl Scholars",
      manager: "Dr. Rohini Deshmukh",
      category: "Education",
      targetBudget: 1200000,
      fundsUsed: 885000,
      status: "Active",
      beneficiariesCount: 520,
      location: "Rajasthan & MP Border Villages",
      startDate: "2026-03-15",
      completionTarget: "2027-03-31",
      description: "Providing STEM scholarships, bicycles, learning tablets, and mentorship to rural adolescent girls."
    },
    {
      id: "PRJ-3002",
      name: "Sanjeevani Mobile Health Vans",
      manager: "Arjun Verma (Operations Lead)",
      category: "Healthcare",
      targetBudget: 2400000,
      fundsUsed: 1950000,
      status: "Active",
      beneficiariesCount: 4200,
      location: "Bundelkhand Remote Districts",
      startDate: "2026-01-10",
      completionTarget: "2026-12-31",
      description: "Deploying 4 equipped solar-powered medical vans with doctors and essential diagnostic gear."
    },
    {
      id: "PRJ-3003",
      name: "Jal Amrit: Village Solar Borewells",
      manager: "Er. Sandeep Rawat",
      category: "Sanitation & Water",
      targetBudget: 950000,
      fundsUsed: 950000,
      status: "Completed",
      beneficiariesCount: 1850,
      location: "Marathwada Drought Belt, MH",
      startDate: "2025-08-01",
      completionTarget: "2026-09-15",
      description: "Installation of 12 deep solar-powered filtration stations and community piped distribution."
    },
    {
      id: "PRJ-3004",
      name: "Annapurna Urban Zero-Hunger Hubs",
      manager: "Kavita Nambiar",
      category: "Food & Nutrition",
      targetBudget: 1500000,
      fundsUsed: 620000,
      status: "Active",
      beneficiariesCount: 3100,
      location: "Delhi-NCR & Urban Slums",
      startDate: "2026-06-01",
      completionTarget: "2027-05-30",
      description: "Community kitchens repurposing surplus food from banquets to deliver hot nutritious meals daily."
    }
  ],

  volunteers: [
    {
      id: "VOL-4001",
      name: "Priya Sundaram",
      email: "priya.s@techcorp.io",
      phone: "+91 98112 33410",
      skills: "Digital Literacy & Teaching",
      assignedProject: "Project Shiksha: 500 Girl Scholars",
      status: "Active",
      hoursLogged: 64,
      joinedDate: "2026-04-12"
    },
    {
      id: "VOL-4002",
      name: "Mohan Lal Choudhary",
      email: "mohan.paramedic@gmail.com",
      phone: "+91 98450 19283",
      skills: "First Aid & Paramedic triage",
      assignedProject: "Sanjeevani Mobile Health Vans",
      status: "Active",
      hoursLogged: 92,
      joinedDate: "2026-02-18"
    },
    {
      id: "VOL-4003",
      name: "Aakash Banerjee",
      email: "aakash.banerjee@designhub.co",
      phone: "+91 90071 88392",
      skills: "Social Media & Photography",
      assignedProject: "Annapurna Urban Zero-Hunger Hubs",
      status: "Available",
      hoursLogged: 28,
      joinedDate: "2026-07-05"
    },
    {
      id: "VOL-4004",
      name: "Dr. Simran Kaur",
      email: "simran.dr@cityhospital.org",
      phone: "+91 99100 55491",
      skills: "Pediatric Screening",
      assignedProject: "Sanjeevani Mobile Health Vans",
      status: "Active",
      hoursLogged: 45,
      joinedDate: "2026-05-20"
    },
    {
      id: "VOL-4005",
      name: "Devendra Patil",
      email: "dev.patil@agrireach.org",
      phone: "+91 97654 32109",
      skills: "Ground Water Testing & Survey",
      assignedProject: "Jal Amrit: Village Solar Borewells",
      status: "Available",
      hoursLogged: 110,
      joinedDate: "2025-09-10"
    }
  ],

  transactions: [
    {
      id: "TXN-5001",
      type: "Income",
      title: "Quarterly CSR Grant Disbursement",
      category: "CSR Grant",
      amount: 750000,
      date: "2026-10-20",
      voucherNo: "VCR-2610-092",
      billAttachment: "CSR_Grant_Agreement_TATA_Q3.pdf",
      approvalStatus: "Approved",
      recordedBy: "Sunil Grover (Finance Head)"
    },
    {
      id: "TXN-5002",
      type: "Expense",
      title: "Mobile Clinic Diesel & Van Maintenance",
      category: "Operations & Transport",
      amount: 48500,
      date: "2026-10-24",
      voucherNo: "VCR-2610-118",
      billAttachment: "IOCL_Fuel_Receipts_Oct26.pdf",
      approvalStatus: "Approved",
      recordedBy: "Arjun Verma (Ops)"
    },
    {
      id: "TXN-5003",
      type: "Expense",
      title: "Bulk Dry Ration Rice & Pulses Purchase",
      category: "Relief Supplies",
      amount: 142000,
      date: "2026-10-27",
      voucherNo: "VCR-2610-135",
      billAttachment: "AgroFarms_Wholesale_Bill_491.pdf",
      approvalStatus: "Approved",
      recordedBy: "Kavita Nambiar"
    },
    {
      id: "TXN-5004",
      type: "Income",
      title: "Diwali Public Micro-Donation Drive",
      category: "Public Donations",
      amount: 220000,
      date: "2026-10-28",
      voucherNo: "VCR-2610-140",
      billAttachment: "Razorpay_Settlement_Batch_11.pdf",
      approvalStatus: "Approved",
      recordedBy: "Sunil Grover (Finance Head)"
    },
    {
      id: "TXN-5005",
      type: "Expense",
      title: "Solar Inverter Replacement (Clinic Van #2)",
      category: "Capital Assets",
      amount: 67000,
      date: "2026-10-29",
      voucherNo: "VCR-2610-152",
      billAttachment: "Luminous_Solar_TaxInvoice.pdf",
      approvalStatus: "Pending",
      recordedBy: "Arjun Verma (Ops)"
    },
    {
      id: "TXN-5006",
      type: "Expense",
      title: "Honorarium to Visiting Doctors (Oct 2026)",
      category: "Human Resources",
      amount: 85000,
      date: "2026-10-30",
      voucherNo: "VCR-2610-161",
      billAttachment: "Consultant_Doctor_Vouchers_Oct.pdf",
      approvalStatus: "Pending",
      recordedBy: "Dr. Rohini Deshmukh"
    }
  ],

  // Extra modules for realistic ERP representation
  staff: [
    { id: "STF-101", name: "Dr. Rohini Deshmukh", role: "Program Director - Education", department: "Programs", salary: "₹85,000/mo", status: "Full-Time", joinDate: "2022-04-01" },
    { id: "STF-102", name: "Sunil Grover", role: "Chief Financial Controller", department: "Finance & Accounts", salary: "₹95,000/mo", status: "Full-Time", joinDate: "2021-08-15" },
    { id: "STF-103", name: "Arjun Verma", role: "Field Logistics Lead", department: "Operations", salary: "₹65,000/mo", status: "Full-Time", joinDate: "2023-01-10" },
    { id: "STF-104", name: "Sneha Nair", role: "Donor Relations & Compliance", department: "Fundraising", salary: "₹60,000/mo", status: "Full-Time", joinDate: "2023-09-01" }
  ],

  campaigns: [
    { id: "CMP-01", title: "Educate 500 Daughters", goal: 2000000, raised: 1420000, donorsCount: 142, status: "Active", endDate: "2026-12-31" },
    { id: "CMP-02", title: "Winter Relief Blanket Drive 2026", goal: 600000, raised: 380000, donorsCount: 88, status: "Active", endDate: "2026-11-25" },
    { id: "CMP-03", title: "Emergency Clean Water Borewells", goal: 1000000, raised: 1000000, donorsCount: 215, status: "Completed", endDate: "2026-09-30" },
    { id: "CMP-04", title: "Malnutrition Combat Kitchens", goal: 1500000, raised: 710000, donorsCount: 96, status: "Active", endDate: "2027-01-15" }
  ],

  inventory: [
    { id: "INV-101", item: "Solar Medical Vans (Force Motors Custom)", qty: 4, location: "Jhansi & Kanpur Hub", condition: "Operational", value: "₹42,00,000" },
    { id: "INV-102", item: "Dry Ration Nutrition Kits (Ready to ship)", qty: 650, location: "Delhi Central Warehouse", condition: "Stocked", value: "₹4,55,000" },
    { id: "INV-103", item: "Digital Learning Tablets (Lenovo 10 inch)", qty: 240, location: "Jaipur Regional Office", condition: "Configured", value: "₹24,00,000" },
    { id: "INV-104", item: "Emergency Tent Shelters & Tarpaulins", qty: 300, location: "Siliguri Staging Area", condition: "Ready", value: "₹3,90,000" }
  ],

  compliance: [
    { cert: "Section 80G Tax Exemption", authority: "Income Tax Dept, Govt of India", certNo: "AABTS1234F21901", validUntil: "2028-03-31", status: "Active / Verified" },
    { cert: "Section 12A Permanent Registration", authority: "Income Tax Dept, Govt of India", certNo: "CIT(E)/DEL/12A/2021", validUntil: "Perpetual", status: "Active / Verified" },
    { cert: "FCRA (Foreign Contribution Reg Act)", authority: "Ministry of Home Affairs, India", certNo: "FCRA-ND-0892716", validUntil: "2027-11-15", status: "Active / Monitored" },
    { cert: "NITI Aayog Darpan ID", authority: "NITI Aayog NGO Portal", certNo: "DL/2021/0289417", validUntil: "Active Renewal", status: "Active / Verified" },
    { cert: "CSR-1 Form (MCA Registration)", authority: "Ministry of Corporate Affairs", certNo: "CSR00018942", validUntil: "Lifetime", status: "Active / Verified" }
  ]
};

