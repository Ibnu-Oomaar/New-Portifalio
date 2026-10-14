import type { Project } from "./types";

/**
 * Selected software projects and case studies.
 * Each project includes a relevant technology stack.
 * No external links or unverified performance metrics are included.
 */

export const projects: Project[] = [
  {
    slug: "telesom-electric-bill-pay",
    title: "Telesom Electric Bill Pay",
    tagline: "Simplifying electricity bill payments through digital solutions.",
    year: "2024",
    role: "Full-Stack Developer",
    summary:
      "An electricity bill payment system designed to simplify how customers manage and pay their electricity bills through a convenient digital platform.",
    stack: [
      "React",
      "Next.js",
      "TypeScript",
      "Node.js",
      "Express.js",
      "PostgreSQL",
      "Prisma ORM",
      "JWT",
      "REST API",
      "Stripe",
      "Tailwind CSS",
    ],
    links: {},
    coverSeed: 7,
    coverImage: "/projects/telesom-electric-bill-pay.png",
    facts: [
      { label: "Category", value: "FinTech & Utility Payments" },
      { label: "Product", value: "Electricity Bill Payment System" },
      { label: "Focus", value: "Digital Payment Experience" },
    ],
    sections: [
      {
        heading: "The concept",
        body: [
          "A digital platform focused on making electricity bill payments more accessible, convenient, and organized.",
        ],
      },
      {
        heading: "Core functionality",
        body: [
          "The system is designed around customer bill management, payment workflows, transaction records, and a streamlined user experience.",
        ],
      },
      {
        heading: "The vision",
        body: [
          "Making everyday utility payments simpler through accessible and reliable digital services.",
        ],
      },
    ],
  },
  {
    slug: "e-kaydi-warehouse",
    title: "E-kaydi WHMS",
    tagline: "A smarter approach to warehouse and inventory operations.",
    year: "2025",
    role: "Full-Stack Developer",
    summary:
      "A Warehouse Management System designed to help wholesalers and retail businesses organize warehouse operations, manage inventory, monitor stock movements, and maintain better control over their products.",
    stack: [
      "Next.js",
      "React",
      "TypeScript",
      "Node.js",
      "Express.js",
      "PostgreSQL",
      "Prisma ORM",
      "JWT",
      "Redis",
      "Zod",
      "Tailwind CSS",
    ],
    links: {},
    coverSeed: 21,
    coverImage: "/projects/e-kaydi-warehouse.png",
    facts: [
      { label: "Category", value: "Warehouse Management" },
      { label: "Product", value: "Multi-Business Warehouse System" },
      { label: "Focus", value: "Inventory & Stock Control" },
    ],
    sections: [
      {
        heading: "The challenge",
        body: [
          "Managing warehouse inventory and stock movements can become complicated when business operations depend on disconnected processes.",
        ],
      },
      {
        heading: "The solution",
        body: [
          "E-kaydi WHMS is designed to centralize warehouse operations, product management, stock tracking, and business inventory workflows.",
        ],
      },
      {
        heading: "The vision",
        body: [
          "Providing businesses with a structured digital environment for managing warehouse operations and improving inventory visibility.",
        ],
      },
    ],
  },
  {
    slug: "electronic-inventory-management-system",
    title: "Electronic Inventory Management System",
    tagline: "Bringing product tracking and inventory control into one system.",
    year: "2024",
    role: "Full-Stack Developer",
    summary:
      "An electronic inventory management system designed to organize product records, monitor stock levels, manage inventory movements, and simplify day-to-day inventory operations.",
    stack: [
      "React",
      "TypeScript",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Mongoose",
      "JWT",
      "REST API",
      "Tailwind CSS",
      "Zod",
    ],
    links: {},
    coverSeed: 42,
    coverImage: "/projects/electronic-inventory-management-system.png",
    facts: [
      { label: "Category", value: "Inventory Management" },
      { label: "Product", value: "Electronic Inventory System" },
      { label: "Focus", value: "Product & Stock Management" },
    ],
    sections: [
      {
        heading: "The problem",
        body: [
          "Businesses need a reliable way to maintain product records, track available stock, and monitor inventory activities.",
        ],
      },
      {
        heading: "What the system provides",
        body: [
          "A centralized approach to product registration, inventory updates, stock monitoring, and inventory record management.",
        ],
      },
      {
        heading: "The vision",
        body: [
          "Making inventory operations more organized, transparent, and efficient.",
        ],
      },
    ],
  },
  {
    slug: "e-xali-platform",
    title: "E-xali Platform",
    tagline: "A connected digital platform for modern business operations.",
    year: "2026",
    role: "Full-Stack Developer",
    summary:
      "A business-focused digital platform bringing together online stores, digital services, and business solutions within one connected ecosystem.",
    stack: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "shadcn/ui",
      "Node.js",
      "NestJS",
      "PostgreSQL",
      "Prisma ORM",
      "JWT",
      "Cloudinary",
      "Stripe",
    ],
    links: {},
    coverSeed: 13,
    coverImage: "/projects/e-xali-platform.png",
    facts: [
      { label: "Category", value: "Digital Business Platform" },
      { label: "Product", value: "Business & E-commerce Platform" },
      { label: "Focus", value: "Digital Business Solutions" },
    ],
    sections: [
      {
        heading: "The concept",
        body: [
          "E-xali aims to provide businesses with digital tools and services that support their online presence and daily operations.",
        ],
      },
      {
        heading: "Online stores",
        body: [
          "The platform includes an online store concept designed to help businesses present products and create digital shopping experiences.",
        ],
      },
      {
        heading: "The vision",
        body: [
          "Creating a connected ecosystem that makes digital business solutions more accessible.",
        ],
      },
    ],
  },
  {
    slug: "library-management-system",
    title: "Library Management System",
    tagline: "Modernizing the way libraries organize and manage resources.",
    year: "2026",
    role: "Full-Stack Developer",
    summary:
      "A library management system designed to digitize library operations, organize book collections, manage members, and streamline borrowing and returning processes.",
    stack: [
      "React",
      "TypeScript",
      "Node.js",
      "NestJS",
      "PostgreSQL",
      "TypeORM",
      "JWT",
      "Swagger",
      "Zod",
      "Tailwind CSS",
    ],
    links: {},
    coverSeed: 31,
    coverImage: "/projects/library-management-system.png",
    facts: [
      { label: "Category", value: "Education Technology" },
      { label: "Product", value: "Library Management System" },
      { label: "Focus", value: "Books & Member Management" },
    ],
    sections: [
      {
        heading: "The challenge",
        body: [
          "Libraries require organized processes for managing books, tracking availability, and maintaining member records.",
        ],
      },
      {
        heading: "The solution",
        body: [
          "A centralized system for managing book collections, member registration, borrowing records, and book returns.",
        ],
      },
      {
        heading: "The vision",
        body: [
          "Supporting more efficient library operations through accessible digital management tools.",
        ],
      },
    ],
  },
  {
    slug: "online-ecommerce-pro",
    title: "Online E-commerce Pro",
    tagline: "A modern shopping experience built for digital commerce.",
    year: "2023",
    role: "Full-Stack Developer",
    summary:
      "An e-commerce platform designed to bring product discovery, online shopping, customer management, and order processing into one digital experience.",
    stack: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "shadcn/ui",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Mongoose",
      "JWT",
      "Stripe",
      "Cloudinary",
    ],
    links: {},
    coverSeed: 55,
    coverImage: "/projects/online-ecommerce-pro.png",
    facts: [
      { label: "Category", value: "E-commerce" },
      { label: "Product", value: "Online Shopping Platform" },
      { label: "Focus", value: "Products & Orders" },
    ],
    sections: [
      {
        heading: "The concept",
        body: [
          "Creating a convenient digital shopping environment where customers can explore products and interact with an online store.",
        ],
      },
      {
        heading: "Core functionality",
        body: [
          "The platform is designed around product catalogs, shopping experiences, customer accounts, and order management.",
        ],
      },
      {
        heading: "The vision",
        body: [
          "Delivering a clean, accessible, and organized online shopping experience.",
        ],
      },
    ],
  },
  {
    slug: "nirig-fuel-gas-station-system",
    title: "Nirig Fuel & Gas Station System",
    tagline: "Digital management for fuel and gas station operations.",
    year: "2025",
    role: "Full-Stack Developer",
    summary:
      "A fuel and gas station management system designed to organize fuel records, monitor station inventory, manage sales activities, and support daily operational workflows.",
    stack: [
      "React",
      "Next.js",
      "TypeScript",
      "Node.js",
      "NestJS",
      "PostgreSQL",
      "Prisma ORM",
      "JWT",
      "Redis",
      "Swagger",
      "Tailwind CSS",
    ],
    links: {},
    coverSeed: 64,
    coverImage: "/projects/nirig-fuel-gas-station-system.png",
    facts: [
      { label: "Category", value: "Business Management" },
      { label: "Product", value: "Fuel & Gas Station System" },
      { label: "Focus", value: "Fuel Inventory & Sales" },
    ],
    sections: [
      {
        heading: "The challenge",
        body: [
          "Fuel stations need organized ways to monitor fuel stock, record sales, and maintain operational information.",
        ],
      },
      {
        heading: "The solution",
        body: [
          "Nirig is designed to bring fuel inventory records, sales management, and station operations into a centralized system.",
        ],
      },
      {
        heading: "The vision",
        body: [
          "Supporting better visibility and organization across fuel and gas station operations.",
        ],
      },
    ],
  },
  {
    slug: "real-time-chat-application",
    title: "Real-Time Chat Application",
    tagline: "Connecting people through instant digital communication.",
    year: "2026",
    role: "Full-Stack Developer",
    summary:
      "A real-time messaging application focused on enabling users to communicate, exchange messages, and interact through a responsive digital communication experience.",
    stack: [
      "React",
      "Next.js",
      "TypeScript",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Socket.IO",
      "JWT",
      "Redis",
      "Tailwind CSS",
    ],
    links: {},
    coverSeed: 77,
    coverImage: "/projects/real-time-chat-application.png",
    facts: [
      { label: "Category", value: "Communication Technology" },
      { label: "Product", value: "Real-Time Chat Application" },
      { label: "Focus", value: "Instant Messaging" },
    ],
    sections: [
      {
        heading: "The concept",
        body: [
          "A communication platform focused on making conversations more immediate and accessible.",
        ],
      },
      {
        heading: "Core functionality",
        body: [
          "The application is centered around user conversations, message exchange, and real-time communication workflows.",
        ],
      },
      {
        heading: "The vision",
        body: [
          "Creating a smooth and reliable messaging experience that keeps people connected.",
        ],
      },
    ],
  },
];

/**
 * Retrieve a project using its unique slug.
 */
export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

/**
 * Projects that should currently be displayed.
 */
export function getVisibleProjects(showPlaceholders: boolean): Project[] {
  return projects.filter(
    (project) => showPlaceholders || !project.placeholder
  );
}