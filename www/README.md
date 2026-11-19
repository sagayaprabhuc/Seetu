# Seettu Tracker - Android deployment

Files: index.html (the whole app), manifest.webmanifest, sw.js (offline), icon-192.png, icon-512.png.
Data is saved on the phone (localStorage). Weekly and monthly seettus are stored separately.

## Option 1 - Install as an app (PWA, easiest, free)
1. Upload this whole folder to any HTTPS host: Netlify Drop (app.netlify.com/drop), GitHub Pages, Vercel or Firebase Hosting.
2. Open the link in Chrome on Android -> menu (three dots) -> "Install app" / "Add to Home screen".
3. It opens full screen like a normal app and works offline after the first load.

## Option 2 - Real APK with Capacitor (for Play Store or sharing the file)
Needs Node.js and Android Studio installed.

    mkdir seettu && cd seettu
    npm init -y
    npm i @capacitor/core @capacitor/cli @capacitor/android
    npx cap init "Seettu Tracker" com.yourname.seettu --web-dir=www
    mkdir www && cp ../seettu-app/* www/
    npx cap add android
    npx cap sync
    npx cap open android

In Android Studio: Build > Build Bundle(s) / APK(s) > Build APK(s) to get a test APK.
For Play Store: Build > Generate Signed Bundle (AAB) and upload it in Play Console (one-time $25 developer fee).

## Option 3 - PWABuilder
Host the folder (Option 1), paste its URL at pwabuilder.com, choose Android and download the package.

## Notes
- Data lives only on each phone. Clearing app data or uninstalling deletes it, and phones do not share data.
- To share data between members or devices, a backend (for example Firebase) is needed. Ask and I can add it.
- The Inter font loads from Google Fonts when online; the app falls back to the system font offline.
