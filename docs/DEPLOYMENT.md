# Deployment & Build Guide

This portfolio application is built exclusively for **Flutter Web** and hosted via **Firebase Hosting**.

---

## 1. Prerequisites

- **Flutter Version Management (FVM)**: Configured with Flutter channel `stable` (Flutter 3.47+ / Dart 3.13+).
- **Firebase CLI**: Installed globally (`firebase-tools`) or via npm.

---

## 2. Building for Web

### Release Compilation (Standard HTML/CanvasKit)
```bash
fvm flutter build web --release
```

### Modern WASM Compilation (Fastest load and render performance)
Flutter 3.x+ supports WebAssembly (WASM). To build with WebAssembly:
```bash
fvm flutter build web --wasm --release
```

The compiled release outputs will be located in:
```
build/web/
```

---

## 3. Local Web Preview

To run the application locally in Chrome using FVM:
```bash
fvm flutter run -d chrome
```

Or serve the compiled release build locally:
```bash
fvm flutter run -d web-server --web-port=8080
```

---

## 4. Deploying to Firebase Hosting

The project is already pre-configured with `firebase.json` and `.firebaserc` pointing to the `portfolio-aadil-khan` Firebase project:

1. **Verify Firebase Project**:
   ```bash
   firebase use
   ```

2. **Deploy Hosting**:
   ```bash
   firebase deploy --only hosting
   ```

3. **Verify Deployment**:
   Access the production deployment at:
   - `https://portfolio-aadil-khan.web.app`
   - `https://portfolio-aadil-khan.firebaseapp.com`

---

## 5. Continuous Integration (CI) / Pre-commit Checks

Always run verification before deploying updates:
```bash
# 1. Check for lint or type errors
fvm flutter analyze

# 2. Run unit and widget tests
fvm flutter test

# 3. Verify release build
fvm flutter build web --release
```

---

## 6. Custom Domain Configuration (`aadilkhan.xyz`)

Follow the complete step-by-step DNS and SSL provisioning guide in [docs/DOMAIN_SETUP.md](DOMAIN_SETUP.md) to connect your domain from Spaceship.

---

## 7. Automated GitHub Actions CI/CD Pipeline

The project includes an automated deployment pipeline on git pushes and pull requests.
See [docs/CI_CD_SETUP.md](CI_CD_SETUP.md) for workflow details and GitHub secret setup instructions.

