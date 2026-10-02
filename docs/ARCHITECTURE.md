# Architecture Documentation

## Overview

This Flutter web application is architected following **Feature-First Clean Architecture** principles, prioritizing separation of concerns, scalability, testability, and responsiveness across modern web browsers.

```
┌─────────────────────────────────────────────────────────────┐
│                       Presentation Layer                    │
│                                                             │
│   features/                                core/widgets/    │
│   ├── home/           ├── resume/          ├── nav_bar      │
│   ├── about/          ├── shell/           └── social_bar   │
│   ├── experience/     └── splash/                           │
│   └── contact/                                              │
│                                                             │
│   State Management: ChangeNotifier & Provider               │
└──────────────────────────────┬──────────────────────────────┘
                               │
┌──────────────────────────────▼──────────────────────────────┐
│                          Data Layer                         │
│                                                             │
│   data/repositories/            data/services/              │
│   ├── portfolio_repository      ├── firestore_service       │
│   └── contact_repository        ├── remote_config_service   │
│                                 └── storage_service         │
│                                                             │
│   data/models/                                              │
│   └── project_model                                         │
└──────────────────────────────┬──────────────────────────────┘
                               │
┌──────────────────────────────▼──────────────────────────────┐
│                      Infrastructure / Core                  │
│                                                             │
│   core/constants/   core/theme/         core/utils/         │
│   ├── app_assets    ├── app_colors      ├── responsive      │
│   └── app_constants └── app_theme       └── url_helper      │
└─────────────────────────────────────────────────────────────┘
```

---

## 1. Architectural Layers

### A. Core Layer (`lib/core/`)
Cross-cutting modules shared across the entire application:
- **`constants/`**:
  - `app_assets.dart`: Asset paths for images, SVG icons, and local media.
  - `app_constants.dart`: Global links (GitHub, LinkedIn, Skype), emails, and responsive screen breakpoints (768px mobile, 1024px tablet).
- **`theme/`**:
  - `app_colors.dart`: Dark theme color palette and dynamic background image resolution based on the active tab index.
  - `app_theme.dart`: Material 3 dark theme configuration with customized typography, buttons, and input fields.
- **`utils/`**:
  - `responsive.dart`: Provides `Responsive` widget and `BuildContext` extensions (`context.isMobile`, `context.isTablet`, `context.isDesktop`) based on `MediaQuery.sizeOf(context)`.
  - `url_helper.dart`: Safe external URL launching via `package:url_launcher`.
- **`widgets/`**:
  - Reusable presentation widgets spanning multiple features, such as `AdaptiveNavBar` and `SocialSidebar`.

### B. Data Layer (`lib/data/`)
Handles remote communications and model deserialization:
- **`models/`**:
  - `project_model.dart`: Data structures (`Project`, `Projects`) with immutable properties and `fromJson` serialization.
- **`services/`**:
  - `remote_config_service.dart`: Fetches dynamic configuration parameters (e.g. project list JSON and resume links) from Firebase Remote Config.
  - `firestore_service.dart`: Handles contact form submissions and persists messages to Cloud Firestore.
  - `storage_service.dart`: Resolves image references and storage URLs.
- **`repositories/`**:
  - `portfolio_repository.dart`: Abstraction and implementation for querying projects and portfolio metadata.
  - `contact_repository.dart`: Abstraction and implementation for sending contact inquiries.

### C. Features Layer (`lib/features/`)
Each feature module encapsulates its own views, sub-widgets, and view models:
- **`shell/`**: Root responsive viewport containing `AdaptiveNavBar`, `PageView`, and `SocialSidebar`. Governed by `ShellViewModel`.
- **`splash/`**: Application entrance screen with animated branding that preloads remote portfolio data before transitioning to `MainShellView`.
- **`home/`**: Hero section introducing Aadil Khan with interactive call-to-action buttons.
- **`about/`**: Personal bio, technical skills, and background summary.
- **`experience/`**: Interactive showcase of featured projects with image carousels, technology chips, and GitHub links.
- **`portfolio/`**: `PortfolioViewModel` coordinating project lists and resume URLs across the application.
- **`contact/`**: Contact CTA and modal dialog (`ContactDialog`) managed by `ContactViewModel`.
- **`resume/`**: Responsive resume preview with single-click download/view capabilities.

---

## 2. State Management

- **Provider & ChangeNotifier**:
  - Services, Repositories, and ViewModels are injected into the widget tree via `MultiProvider` in `lib/main.dart`.
  - `PortfolioViewModel`: Coordinates data retrieval from `PortfolioRepository` and notifies listeners on state transitions (`isLoading`, `projects`, `errorMessage`).
  - `ShellViewModel`: Controls active page navigation index and smooth animations via `PageController`.
  - `ContactViewModel`: Ephemeral state manager for contact form submissions, validation, and feedback notifications.

---

## 3. Responsive Web Layout Strategy

The application leverages adaptive layout patterns designed specifically for modern desktop monitors, tablets, and mobile web viewports:
- **Mobile (< 768px)**: Compact navigation, vertically stacked content, optimized modal dialogs.
- **Tablet (768px – 1024px)**: Expanded navigation bar, dual-column cards where appropriate.
- **Desktop (>= 1024px)**: Full desktop menu, fixed social link sidebar, max-width constrained reading containers (1000px–1100px) with fluid typography.

---

## 4. Design System (`package:material_ui`)

The application has been migrated to Flutter's standalone **`package:material_ui`** (`^1.5.0`):
- All UI and presentation layers import `package:material_ui/material_ui.dart` instead of the legacy monolithic `package:flutter/material.dart`.
- Integrates natively with **`google_fonts: ^9.0.0`**, ensuring complete type alignment between `TextTheme` and `ThemeData`.
- Delivers modern Material 3 design tokens and standalone release cycles.
