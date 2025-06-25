import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

// import { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import Toast, { BaseToastProps } from 'react-native-toast-message';

// import { useAppUpdater } from '@/hooks/useAppUpdater'; // 导入新的 hook
import { useColorScheme } from '@/hooks/useColorScheme';

// 自定义 Toast 组件
const CustomToast = ({ text1, text2 }: BaseToastProps) => (
  <View style={customToastStyles.container}>
    <Text style={customToastStyles.text1}>{text1}</Text>
    {text2 && <Text style={customToastStyles.text2}>{text2}</Text>}
  </View>
);

const customToastStyles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    maxWidth: '80%',
  },
  text1: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  text2: {
    color: '#eee',
    fontSize: 12,
    marginTop: 2,
    textAlign: 'center',
  },
});

export default function RootLayout() {
  // const [isAppReady, setIsAppReady] = useState(false);
  // const { checkForAppUpdates } = useAppUpdater(); // 使用新的 hook

  // // 初始加载时检查更新
  // useEffect(() => {
  //   const initializeApp = async () => {
  //     await checkForAppUpdates(); // 首次启动时自动检查更新
  //     setIsAppReady(true); // 无论更新结果如何，都标记应用为准备就绪
  //   };
  //   initializeApp();
  // }, [checkForAppUpdates]); // 依赖项为 checkForAppUpdates

  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  if (!loaded) { // 等待字体加载和应用初始化
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#409eff" />
        <Text style={{ marginTop: 10 }}>正在准备应用...</Text>
      </View>
    );
  }

  const toastConfig = {
    customToast: (props: BaseToastProps) => <CustomToast {...props} />,
  };

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
      <Toast config={toastConfig} />
    </ThemeProvider>
  );
}