# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

3. Build the app

   ```bash
   eas build --platform android --local
   ```

4. Export the js bundle

   ```bash
   npx expo export --output-dir ./dist --experimental-bundle
   node copyConfig.js
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.

##启动
npm start

##检查
npx expo-doctor

##打包
eas build --platform android --local
eas build --platform android

##导出热更
npx expo export --dev		// 开发模式
npx expo export --output-dir ./dist --experimental-bundle	// 生产模式
node copyConfig.js

##Expo doctor
npx expo-doctor

##调试Log
adb logcat | grep "Updates"

##codesigning 密钥生成
https://docs.expo.dev/eas-update/code-signing/#configure-code-signing-in-an-android-native
npx expo-updates codesigning:generate --key-output-directory keys --certificate-output-directory certs --certificate-validity-duration-years 10 --certificate-common-name "Your Organization Name"