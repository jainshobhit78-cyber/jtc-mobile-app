# Jain Trading Corporation - Native B2B Mobile App

Fully native B2B customer distribution and ordering application for **Jain Trading Corporation**, built using **React Native** and **Expo**. This app provides high-performance rendering, smooth transitions, offline resilience, and direct integration interfaces for ERP syncs.

## 📦 Installable Mobile App (Android APK)
- **Download APK File**: [📦 app-debug.apk (Direct Download)](https://github.com/jainshobhit78-cyber/jtc-mobile-app/releases/download/v1.0.0-native-build/app-debug.apk)
- **Releases Page**: [GitHub Release Hub](https://github.com/jainshobhit78-cyber/jtc-mobile-app/releases/tag/v1.0.0-native-build)

*(Note: Uninstall any previous HTML-webview versions from your phone before installing this new native package.)*

## ⚙️ Running Locally (Expo Go)
1. Install dependencies:
   ```bash
   npm install
   ```
2. Start Metro Bundler:
   ```bash
   npx expo start
   ```
3. Open **Expo Go** on your Android device and scan the terminal QR code. The app will build and run natively on your phone instantly!

## Project Structure
- **`App.js`**: Core navigation controller managing stack screens and tab routes.
- **`src/context/StateContext.js`**: Global context state manager (AsyncStorage cache, cart actions, B2B limit validation).
- **`src/styles/theme.js`**: Design tokens style sheet (JTC blue & orange palettes, radiuses).
- **`src/screens/`**: Native views (Welcome, Login, Home, Categories, ProductList, Details, Cart, Invoices, Timeline, Profile).
