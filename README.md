# Next.js WebView App

A cross-platform React Native application that embeds a Next.js web application using WebView (for mobile) and iframe (for web). Works on Android, iOS, and Web platforms.

## Features

- 🖥️ Web support using iframe
- 📱 Mobile support using react-native-webview
- 🔄 Loading states and error handling
- 🔄 Retry mechanism for failed loads
- 🌐 Cross-platform compatibility
- 🎨 Consistent UI across platforms

## Prerequisites

- Node.js (v16 or higher)
- npm (v7 or higher)
- Expo CLI (`npm install -g expo-cli`)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/nextjs-webview-app.git
   cd nextjs-webview-app
2. Install dependencies:

    ```bash
    npm install

3. Install additional required packages:

    ```bash
    npx expo install react-native-webview react-dom react-native-web @expo/metro-runtime


## Running the App

1. Web
    ```bash
    npx expo start --web
2. Android
    ```bash
    npx expo start --android
3. iOS
    ```bash
    npx expo start --ios

## Project Structure
    nextjs-webview-app/
    ├── App.tsx                # Main application component
    ├── app.json               # Expo configuration
    ├── package.json           # Project dependencies
    ├── tsconfig.json          # TypeScript configuration
    ├── .env                   # Environment variables
    ├── assets/                # Static assets
    └── components/            # Reusable components

## How It Works

1. Platform Detection: The app detects whether it's running on web or mobile using Platform.OS
2. Web Implementation: Uses an iframe to embed the Next.js app
3. Mobile Implementation: Uses react-native-webview to render the web content
4. State Management: Handles loading states and errors consistently across platforms
5. Error Handling: Provides retry functionality for failed loads