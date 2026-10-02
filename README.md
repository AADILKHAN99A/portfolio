# Aadil Khan | Flutter Web Portfolio

A modern, responsive, high-performance web portfolio built exclusively with **Flutter Web**, leveraging Firebase (Remote Config, Cloud Firestore, Firebase Hosting), Provider state management, and modern design principles.

---

## 🚀 Key Highlights

- **Web-First Design**: Optimized exclusively for modern web browsers across desktop, tablet, and mobile screens.
- **Dynamic Content**: Powered by Firebase Remote Config for remote project showcase and resume link updates without redeployment.
- **Interactive Contact**: Cloud Firestore-backed inquiry system with smooth animated modal dialogues.
- **Clean Feature-First Architecture**: High separation of concerns, modularity, and testability.
- **FVM Ready**: Pinned to Flutter `stable` for consistent local and CI/CD builds.

---

## 🛠️ Tech Stack & Dependencies

- **Framework**: [Flutter](https://flutter.dev) (Web target only)
- **SDK Management**: [FVM](https://fvm.app/)
- **State Management**: [Provider](https://pub.dev/packages/provider)
- **Backend Services**:
  - `firebase_core` & `firebase_core_web`
  - `firebase_remote_config`
  - `cloud_firestore`
  - `firebase_storage`
- **UI & Presentation**:
  - `google_fonts` (Inter / Space Grotesk styling)
  - `font_awesome_flutter`
  - `cached_network_image`
  - `carousel_slider`
  - `shimmer`

---

## 📂 Project Structure

```
lib/
├── core/                  # Constants, theme, responsive helpers & shared widgets
│   ├── constants/
│   ├── theme/
│   ├── utils/
│   └── widgets/
├── data/                  # Models, repositories, and Firebase services
│   ├── models/
│   ├── repositories/
│   └── services/
├── features/              # Feature modules (views, widgets, view models)
│   ├── about/
│   ├── contact/
│   ├── experience/
│   ├── home/
│   ├── portfolio/
│   ├── resume/
│   ├── shell/
│   └── splash/
├── firebase_options.dart  # Web Firebase configuration
└── main.dart              # Entry point & Provider DI
```

For more details, see [docs/PROJECT_STRUCTURE.md](docs/PROJECT_STRUCTURE.md) and [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md).

---

## 💻 Local Development

### 1. Install Dependencies
```bash
fvm flutter pub get
```

### 2. Run Static Analysis
```bash
fvm flutter analyze
```

### 3. Run Tests
```bash
fvm flutter test
```

### 4. Run Locally in Chrome
```bash
fvm flutter run -d chrome
```

---

## 🌐 Production Build & Deployment

### Build Web Release
```bash
fvm flutter build web --release
```

### Deploy to Firebase Hosting
```bash
firebase deploy --only hosting
```

---

## 🔗 Custom Domain & Automated CI/CD

- **Custom Domain (`aadilkhan.xyz`)**: Detailed Spaceship DNS and Firebase setup instructions in [docs/DOMAIN_SETUP.md](docs/DOMAIN_SETUP.md).
- **Automated CI/CD**: GitHub Actions workflow details and secret setup instructions in [docs/CI_CD_SETUP.md](docs/CI_CD_SETUP.md).
- **Deployment Overview**: See [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md) for full hosting guide.
