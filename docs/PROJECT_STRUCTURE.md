# Project Structure & File Guide

Below is the directory structure adhering to Flutter industry standards for clean, feature-first web projects:

```
portfolio/
├── .fvm/                         # Flutter Version Management cache & symlink
├── .fvmrc                        # FVM configuration (Flutter stable)
├── analysis_options.yaml         # Linting and static analysis configuration
├── artifacts/                    # Build logs, reports, and migration artifacts
│   └── MIGRATION_REPORT.md       # Full record of modernizations & changes
├── assets/                       # Static media (icons, background images, screenshots)
│   ├── background_*.png
│   ├── github_icon.png
│   ├── linkedin_icon.png
│   └── projects/
├── build/                        # Compilation output (web release files)
│   └── web/
├── docs/                         # Developer and architecture documentation
│   ├── ARCHITECTURE.md           # Architecture overview and design patterns
│   ├── DEPLOYMENT.md             # Build and Firebase deployment instructions
│   └── PROJECT_STRUCTURE.md      # Directory and file guide
├── lib/
│   ├── core/                     # Shared foundation
│   │   ├── constants/
│   │   │   ├── app_assets.dart   # Asset paths & keys
│   │   │   └── app_constants.dart# Social links, breakpoints, strings
│   │   ├── theme/
│   │   │   ├── app_colors.dart   # Hex colors and background selector
│   │   │   └── app_theme.dart    # ThemeMode & Material 3 Dark theme
│   │   ├── utils/
│   │   │   ├── responsive.dart   # LayoutBuilder and screen width queries
│   │   │   └── url_helper.dart   # Safe url_launcher helper
│   │   └── widgets/
│   │       ├── adaptive_nav_bar.dart  # Top bar with responsive navigation
│   │       └── social_sidebar.dart    # Sticky vertical social icons
│   ├── data/                     # Data access layer
│   │   ├── models/
│   │   │   └── project_model.dart     # Project data entity and serialization
│   │   ├── repositories/
│   │   │   ├── contact_repository.dart# Contact form submissions interface & impl
│   │   │   └── portfolio_repository.dart # Portfolio data fetching interface & impl
│   │   └── services/
│   │       ├── firestore_service.dart # Cloud Firestore client
│   │       ├── remote_config_service.dart # Firebase Remote Config client
│   │       └── storage_service.dart   # Firebase Cloud Storage client
│   ├── features/                 # Modular feature domains
│   │   ├── about/
│   │   │   └── views/about_view.dart  # About Me, skills, bio
│   │   ├── contact/
│   │   │   ├── view_models/contact_view_model.dart # Form state & submission logic
│   │   │   ├── views/contact_view.dart             # Contact page presentation
│   │   │   └── widgets/contact_dialog.dart         # Interactive message modal
│   │   ├── experience/
│   │   │   └── views/experience_view.dart          # Project portfolio list & carousels
│   │   ├── home/
│   │   │   └── views/home_view.dart                # Hero landing page
│   │   ├── portfolio/
│   │   │   └── view_models/portfolio_view_model.dart # Portfolio & resume state manager
│   │   ├── resume/
│   │   │   └── views/resume_view.dart              # Resume preview & PDF trigger
│   │   ├── shell/
│   │   │   ├── view_models/shell_view_model.dart   # Page navigation controller
│   │   │   └── views/main_shell_view.dart          # Shell containing PageView & navbar
│   │   └── splash/
│   │       └── views/splash_view.dart              # Initial loading animation screen
│   ├── firebase_options.dart     # Web-only Firebase configuration
│   └── main.dart                 # Application entrypoint & Provider tree
├── test/
│   ├── unit/
│   │   ├── responsive_test.dart        # Breakpoint and widget responsiveness tests
│   │   └── shell_view_model_test.dart  # Shell controller and index unit tests
│   └── widget_test.dart                # Project model deserialization tests
├── web/                          # Web hosting runner and HTML wrapper
│   ├── favicon.png
│   ├── icons/
│   ├── index.html
│   └── manifest.json
├── firebase.json                 # Firebase Hosting configuration
└── pubspec.yaml                  # Application dependencies and environment constraints
```
