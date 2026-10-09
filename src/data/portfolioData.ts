export interface Experience {
  company: string;
  role: string;
  period: string;
  badge?: string;
  highlights: string[];
  skills: string[];
}

export interface SystemWork {
  id: string;
  title: string;
  category: string;
  tagline: string;
  description: string;
  architecturalHighlights: string[];
  techStack: string[];
  metricsOrScope?: string;
  githubUrl?: string;
  liveUrl?: string;
}

export interface SkillGroup {
  title: string;
  description: string;
  skills: string[];
}

export const PORTFOLIO_DATA = {
  personal: {
    name: "Aadil Khan",
    headline: "Flutter Developer & Systems Engineer",
    subheadline: "Flutter Developer @ Urban Culture · Systems & Mobile Engineer",
    location: "Jaipur, Rajasthan, India",
    email: "aadilkhan99a@gmail.com",
    phone: "+91 8114462733",
    education: "B.Tech Graduate, Rajasthan Technical University (RTU)",
    bio: "Software developer specializing in Flutter and cross-platform mobile architecture with end-to-end full-stack capabilities. Focused on the complete system behind the application: real-time streaming, backend Cloud Functions, native Android build pipelines, and production-grade stability.",
    social: {
      github: "https://github.com/AADILKHAN99A",
      linkedin: "https://www.linkedin.com/in/aadilkhan99a/",
      skype: "https://join.skype.com/invite/q1PaXqXQ6SVr",
      email: "mailto:aadilkhan99a@gmail.com",
    },
  },

  experiences: [
    {
      company: "Urban Culture",
      role: "Flutter Developer",
      period: "3 Feb 2025 — Present",
      badge: "Current Production Role",
      highlights: [
        "Architecting and maintaining high-scale production mobile applications across frontend interfaces and backend cloud systems.",
        "Engineered real-time location tracking pipelines, multi-step booking workflows, and client-server fraud detection routines.",
        "Built server-side business logic using Node.js, RESTful microservices, and Firebase Cloud Functions.",
        "Resolved deep system-level build bottlenecks: Gradle dependency graphs, compileSdk/targetSdk compatibility, Play Integrity, and signature conflict triage.",
        "Maintained 60 FPS mobile performance across varied device tiers through memory leak prevention and responsive rendering passes.",
      ],
      skills: [
        "Flutter",
        "Dart",
        "Node.js",
        "Firebase Cloud Functions",
        "REST APIs",
        "Gradle",
        "Android SDK",
        "Play Integrity",
      ],
    },
  ] as Experience[],

  systemsWorkedOn: [
    {
      id: "realtime-engine",
      title: "Real-Time Telemetry & Data Sync",
      category: "Streaming & Live Data",
      tagline: "Dynamic state synchronization across clients, workers, and cloud services",
      description:
        "Engineered live data synchronization architecture where state changes, order statuses, and telemetry update dynamically with sub-second latency.",
      architecturalHighlights: [
        "Bi-directional event handling between client applications and backend microservices",
        "Conflict resolution and optimistic UI updates for instant perceived performance",
        "Resilient offline-first synchronization with automated queue re-flushing",
      ],
      techStack: ["Flutter", "WebSockets / Realtime DB", "Node.js", "Cloud Functions"],
      metricsOrScope: "Production Live Feed",
    },
    {
      id: "location-tracking",
      title: "Live Geolocation Tracking Pipeline",
      category: "Location Intelligence",
      tagline: "Battery-efficient background tracking and map telemetry",
      description:
        "Engineered real-time location capture and dispatch pipeline managing continuous movement tracking, distance calculations, and map coordinate rendering.",
      architecturalHighlights: [
        "Optimized Android foreground service lifecycle and location permission handling",
        "Backend ingestion pipeline processing high-frequency GPS coordinate streams",
        "Dead-reckoning and coordinate smoothing algorithms on the Flutter client canvas",
      ],
      techStack: ["Flutter", "Google Maps Platform", "Android Services", "Node.js REST APIs"],
      metricsOrScope: "Active Field Operations",
    },
    {
      id: "fraud-detection",
      title: "Device Integrity & Fraud Detection",
      category: "Security & Risk Mitigation",
      tagline: "Multi-layer client validation and backend anomaly detection",
      description:
        "Implemented fraud prevention safeguards protecting high-value transactions, preventing location spoofing, and validating device legitimacy.",
      architecturalHighlights: [
        "Play Integrity / App Check cryptographic token validation on incoming requests",
        "Client-side mock location detection, root checks, and tampered signature defenses",
        "Backend heuristics identifying abnormal transaction velocities and duplicate claims",
      ],
      techStack: ["Firebase App Check", "Play Integrity", "Node.js", "Dart Security"],
      metricsOrScope: "Transaction Defense Layer",
    },
    {
      id: "booking-platform",
      title: "Multi-Step Booking & Scheduling Engine",
      category: "Transaction & Workflow",
      tagline: "High-concurrency reservation flows and slot availability orchestration",
      description:
        "Built end-to-end booking workflows encompassing date/time slot reservation, provider allocation, dynamic pricing calculation, and push alerts.",
      architecturalHighlights: [
        "Atomic slot reservation with race-condition prevention across simultaneous users",
        "Interactive calendar and time selector widgets optimized for one-hand touch ergonomics",
        "Automated lifecycle event triggers via Firebase Cloud Functions for notifications",
      ],
      techStack: ["Flutter", "Cloud Firestore", "Cloud Functions", "FCM Push Notifications"],
      metricsOrScope: "Core Revenue Flow",
    },
    {
      id: "retro-pixel-portal",
      title: "Retro Pixel Portal",
      category: "Interactive 3D WebGL",
      tagline: "3D vintage CRT computer monitor hardware simulation",
      description:
        "Hardware-accelerated 3D WebGL simulation featuring interactive cursor perspective tilt, analog CRT scanline canvas generation, and live system boot terminal.",
      architecturalHighlights: [
        "Real-time 3D spring easing matching mouse parallax in Three.js & React Three Fiber",
        "Dynamic 2D canvas texture generating flickering matrix code and progress telemetry",
        "Memory-safe shader texture disposal and 60 FPS CanvasKit/WebGL rendering",
      ],
      techStack: ["Three.js", "React Three Fiber", "TypeScript", "Tailwind CSS"],
      metricsOrScope: "Awwwards-Level 3D Experiment",
      githubUrl: "https://github.com/AADILKHAN99A/retro-pixel-portal",
      liveUrl: "https://aadilkhan.xyz",
    },
  ] as SystemWork[],

  technicalExpertise: [
    {
      title: "Mobile & Cross-Platform",
      description: "Production mobile architecture across Google and Android ecosystems.",
      skills: [
        "Flutter (Stable / FVM)",
        "Dart Language Core",
        "State Architecture (BLoC / Provider / Riverpod)",
        "Responsive & Adaptive UI Layouts",
        "Custom Painters & 60 FPS Animations",
        "Offline-First Caching & SQLite",
        "Native Android Interop & Method Channels",
      ],
    },
    {
      title: "Android & Build Systems",
      description: "Deep system-level triage, SDK compatibility, and release engineering.",
      skills: [
        "Gradle Build Lifecycle & Multi-Project Config",
        "compileSdk & targetSdk Version Migration",
        "Play Integrity & Firebase App Check",
        "APK / AAB Signing & SHA-1 / SHA-256 Fingerprints",
        "AndroidManifest Permissions & Hardware Features",
        "ProGuard / R8 Obfuscation & Shrinking",
        "Linux / Ubuntu Terminal & CLI Diagnostics",
      ],
    },
    {
      title: "Backend & Cloud Services",
      description: "Serverless business logic, real-time engines, and cloud infrastructure.",
      skills: [
        "Node.js Runtime & Express",
        "Firebase Cloud Functions (Node.js)",
        "Firebase Authentication & Security Rules",
        "Cloud Firestore & Realtime Database",
        "RESTful API Design & WebSocket Feeds",
        "Firebase Hosting, Storage & Remote Config",
        "GitHub Actions CI/CD Deployment Pipelines",
      ],
    },
  ] as SkillGroup[],
};
