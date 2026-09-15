// Shared Mock Dataset for College Placement Management System (Express Implementation)

const companies = [
  {
    id: "comp-101",
    name: "Google",
    sector: "Technology / Software",
    location: "Bangalore / Mountain View",
    package: "₹45 LPA",
    eligibleBranches: ["CSE", "ECE", "IT"],
    website: "https://careers.google.com",
    description: "Global technology leader in search engines, cloud computing, artificial intelligence, and software infrastructure."
  },
  {
    id: "comp-102",
    name: "Microsoft",
    sector: "Cloud & Enterprise Software",
    location: "Hyderabad / Redmond",
    package: "₹42 LPA",
    eligibleBranches: ["CSE", "ECE", "EEE", "IT"],
    website: "https://careers.microsoft.com",
    description: "Pioneer in operating systems, Azure cloud platform, AI solutions, and consumer hardware."
  },
  {
    id: "comp-103",
    name: "Amazon",
    sector: "E-Commerce & Cloud Services",
    location: "Bangalore / Seattle",
    package: "₹38 LPA",
    eligibleBranches: ["CSE", "MECH", "ECE", "IT"],
    website: "https://amazon.jobs",
    description: "Worldwide leader in e-commerce, AWS cloud architecture, supply chain technology, and digital streaming."
  },
  {
    id: "comp-104",
    name: "Goldman Sachs",
    sector: "Financial Technology",
    location: "Bangalore / New York",
    package: "₹32 LPA",
    eligibleBranches: ["CSE", "IT", "ECE"],
    website: "https://goldmansachs.com/careers",
    description: "Premier global investment banking, financial software engineering, quantitative research, and securities firm."
  },
  {
    id: "comp-105",
    name: "Tesla",
    sector: "Automotive & Clean Energy",
    location: "Austin / Bangalore",
    package: "₹40 LPA",
    eligibleBranches: ["MECH", "ECE", "EEE", "CSE"],
    website: "https://tesla.com/careers",
    description: "Pioneering electric vehicles, energy storage systems, and advanced robotics firmware development."
  }
];

const jobs = [
  {
    id: "job-301",
    companyId: "comp-101",
    companyName: "Google",
    title: "Software Development Engineer (SDE-1)",
    role: "Full-Stack Development & Distributed Systems",
    salary: "₹45 LPA",
    location: "Bangalore",
    type: "Full-Time",
    eligibleBranches: ["CSE", "IT", "ECE"],
    description: "Design scalable distributed backend services using Go/C++ and modern frontend web applications.",
    status: "Open"
  },
  {
    id: "job-302",
    companyId: "comp-101",
    companyName: "Google",
    title: "Cloud Operations Specialist",
    role: "Site Reliability Engineering (SRE)",
    salary: "₹35 LPA",
    location: "Hyderabad",
    type: "Full-Time",
    eligibleBranches: ["CSE", "IT"],
    description: "Ensure high availability and low latency across global cloud services and infrastructure.",
    status: "Open"
  },
  {
    id: "job-303",
    companyId: "comp-102",
    companyName: "Microsoft",
    title: "Cloud Solution Architect",
    role: "Azure Infrastructure & Microservices",
    salary: "₹42 LPA",
    location: "Hyderabad",
    type: "Full-Time",
    eligibleBranches: ["CSE", "ECE", "IT"],
    description: "Build cloud-native serverless applications, container orchestrations, and AI integrations.",
    status: "Open"
  },
  {
    id: "job-304",
    companyId: "comp-103",
    companyName: "Amazon",
    title: "Backend Infrastructure Engineer",
    role: "AWS Systems & High Throughput APIs",
    salary: "₹38 LPA",
    location: "Bangalore",
    type: "Full-Time",
    eligibleBranches: ["CSE", "IT", "ECE"],
    description: "Architect ultra-low latency transaction engines handling millions of daily retail operations.",
    status: "Open"
  },
  {
    id: "job-305",
    companyId: "comp-104",
    companyName: "Goldman Sachs",
    title: "Quant Software Engineer",
    role: "Algorithmic Trading & Financial Modeling",
    salary: "₹32 LPA",
    location: "Bangalore",
    type: "Full-Time",
    eligibleBranches: ["CSE", "IT"],
    description: "Develop quantitative models, real-time risk analytics, and algorithmic execution platforms.",
    status: "Closed"
  },
  {
    id: "job-306",
    companyId: "comp-105",
    companyName: "Tesla",
    title: "Embedded Firmware Engineer",
    role: "Autopilot Hardware & Battery Systems",
    salary: "₹40 LPA",
    location: "Bangalore / Remote",
    type: "Full-Time",
    eligibleBranches: ["MECH", "ECE", "EEE"],
    description: "Program real-time C/C++ microcontrollers for autonomous driving sensor fusion and power delivery.",
    status: "Open"
  }
];

const students = [
  {
    id: "std-201",
    name: "Aarav Sharma",
    branch: "CSE",
    gpa: 9.4,
    status: "Placed",
    companyId: "comp-101",
    companyName: "Google",
    role: "Software Development Engineer (SDE-1)",
    packageOffered: "₹45 LPA",
    email: "aarav.sharma@college.edu"
  },
  {
    id: "std-202",
    name: "Priya Patel",
    branch: "ECE",
    gpa: 9.1,
    status: "Placed",
    companyId: "comp-102",
    companyName: "Microsoft",
    role: "Cloud Solution Architect",
    packageOffered: "₹42 LPA",
    email: "priya.patel@college.edu"
  },
  {
    id: "std-203",
    name: "Rohan Verma",
    branch: "CSE",
    gpa: 8.8,
    status: "Placed",
    companyId: "comp-103",
    companyName: "Amazon",
    role: "Backend Infrastructure Engineer",
    packageOffered: "₹38 LPA",
    email: "rohan.verma@college.edu"
  },
  {
    id: "std-204",
    name: "Ananya Rao",
    branch: "MECH",
    gpa: 9.0,
    status: "Placed",
    companyId: "comp-105",
    companyName: "Tesla",
    role: "Embedded Firmware Engineer",
    packageOffered: "₹40 LPA",
    email: "ananya.rao@college.edu"
  },
  {
    id: "std-205",
    name: "Karthik Nair",
    branch: "IT",
    gpa: 8.2,
    status: "Unplaced",
    companyId: null,
    companyName: null,
    role: null,
    packageOffered: null,
    email: "karthik.nair@college.edu"
  },
  {
    id: "std-206",
    name: "Sneha Gupta",
    branch: "EEE",
    gpa: 8.6,
    status: "Unplaced",
    companyId: null,
    companyName: null,
    role: null,
    packageOffered: null,
    email: "sneha.gupta@college.edu"
  }
];

module.exports = {
  companies,
  jobs,
  students
};
