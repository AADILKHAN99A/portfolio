export interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;
  tags: string[];
  githubUrl?: string;
  liveUrl?: string;
  featured?: boolean;
}

export interface SkillCategory {
  category: string;
  skills: { name: string; level: number; icon?: string }[];
}

export interface Experience {
  role: string;
  company: string;
  period: string;
  description: string[];
  skills: string[];
}

export const PORTFOLIO_DATA = {
  personal: {
    name: "Aadil Khan",
    title: "Mobile & Cross-Platform Engineer",
    location: "Jaipur, Rajasthan, India",
    email: "aadilkhan99a@gmail.com",
    phone: "+91 8114462733",
    tagline: "Crafting High-Performance Cross-Platform & Interactive Experiences",
    bio: "Passionate software engineer specializing in Flutter, modern cross-platform architectures, and interactive web applications. Dedicated to writing clean, maintainable, high-impact code with fluid micro-interactions.",
    social: {
      github: "https://github.com/AADILKHAN99A",
      linkedin: "https://www.linkedin.com/in/aadilkhan99a/",
      skype: "https://join.skype.com/invite/q1PaXqXQ6SVr",
      email: "mailto:aadilkhan99a@gmail.com",
    },
  },

  skills: [
    {
      category: "Mobile & Frameworks",
      skills: [
        { name: "Flutter", level: 95 },
        { name: "Dart", level: 95 },
        { name: "Android (Kotlin/Java)", level: 80 },
        { name: "React / Next.js", level: 85 },
        { name: "TypeScript", level: 85 },
      ],
    },
    {
      category: "Architecture & State",
      skills: [
        { name: "Clean Architecture", level: 90 },
        { name: "Provider / BLoC / Riverpod", level: 92 },
        { name: "REST APIs & WebSockets", level: 90 },
        { name: "SQL & SQLite", level: 85 },
        { name: "GraphQL", level: 78 },
      ],
    },
    {
      category: "Cloud & DevOps",
      skills: [
        { name: "Firebase (Auth, Firestore, Storage)", level: 90 },
        { name: "GitHub Actions CI/CD", level: 88 },
        { name: "Cloudflare DNS & SSL", level: 85 },
        { name: "Docker & GCP basics", level: 75 },
      ],
    },
  ] as SkillCategory[],

  projects: [
    {
      id: "retro-pixel-portal",
      title: "Retro Pixel Portal",
      tagline: "Interactive 3D Vintage CRT Computer Monitor",
      description:
        "A retro-futuristic 3D WebGL portal featuring mouse cursor perspective tracking, CRT scanlines canvas textures, dynamic matrix terminal animations, and tactile controls.",
      tags: ["Three.js", "React Three Fiber", "Tailwind CSS", "TypeScript", "GLSL"],
      githubUrl: "https://github.com/AADILKHAN99A/retro-pixel-portal",
      liveUrl: "https://aadilkhan.xyz",
      featured: true,
    },
    {
      id: "survey-app",
      title: "Interactive Survey Platform",
      tagline: "Dynamic Survey & Analytics Engine",
      description:
        "High-performance cross-platform survey collection engine featuring offline synchronization, complex branching logic, and real-time visualization dashboards.",
      tags: ["Flutter", "Dart", "Firebase", "Provider", "Clean Architecture"],
      githubUrl: "https://github.com/AADILKHAN99A/App_Development",
      featured: true,
    },
    {
      id: "smart-task-manager",
      title: "Smart Task & Productivity Suite",
      tagline: "Offline-First Task Management with Cloud Sync",
      description:
        "Full-featured productivity application with background notifications, priority matrix scheduling, local SQLite caching, and encrypted cloud synchronization.",
      tags: ["Flutter", "SQLite", "Firebase Core", "REST APIs"],
      githubUrl: "https://github.com/AADILKHAN99A/App_Development",
      featured: true,
    },
    {
      id: "gamopedia",
      title: "Gamopedia Explorer",
      tagline: "Real-Time Video Game Database & Explorer",
      description:
        "Rich media video game catalogue powered by RAWG API featuring instant fuzzy search, genre filtering, and responsive gallery viewports.",
      tags: ["Flutter", "REST APIs", "Cached Network Image", "State Management"],
      githubUrl: "https://github.com/AADILKHAN99A/App_Development",
      featured: false,
    },
  ] as Project[],

  experience: [
    {
      role: "Software Developer (Mobile & Web)",
      company: "Engineering & Innovation",
      period: "2023 — Present",
      description: [
        "Architected scalable cross-platform mobile and web applications with clean feature architecture.",
        "Implemented CI/CD automated deployment pipelines with GitHub Actions and Firebase Hosting.",
        "Engineered smooth 60 FPS user interfaces with advanced animations, custom canvas painters, and responsive layout constraints.",
      ],
      skills: ["Flutter", "Dart", "React", "TypeScript", "Firebase", "GitHub Actions"],
    },
  ] as Experience[],
};
