import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import * as Updates from 'expo-updates';
import { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, Alert, StyleSheet, Text, View } from 'react-native';
import Toast, { BaseToastProps } from 'react-native-toast-message'; // 导入 Toast 和 BaseToastProps

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
    backgroundColor: 'rgba(0, 0, 0, 0.8)', // 半透明黑色背景
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginHorizontal: 20, // 左右留白
    // 对于居中显示，可以结合 position: 'absolute' 和 bottom/top/left/right
    // 但通常更推荐使用 Toast.show 的 position 属性来控制
    alignItems: 'center', // 文本居中
    justifyContent: 'center',
    maxWidth: '80%', // 限制宽度
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
  const [isAppReady, setIsAppReady] = useState(false);

  const onFetchUpdateAsync = useCallback(async () => {
    try {
      console.log('正在检查更新...');

      // 在开发模式下，Updates.checkForUpdateAsync() 会抛出错误，这是预期的。
      // 所以我们只在非开发模式下执行更新检查。
      if (!__DEV__) {
        const update = await Updates.checkForUpdateAsync();

        if (update.isAvailable) {
          Toast.show({
            type: 'customToast', // 使用你定义的自定义类型
            text1: '发现新版本，正在后台下载...',
            position: 'bottom', // 显示在底部
            visibilityTime: 3000,
          }); // 使用 Toast 提示
          console.log('发现新版本，正在下载...');
          await Updates.fetchUpdateAsync();
          console.log('新版本已下载。');

          Alert.alert(
            '更新提示',
            '新版本已下载，即将重启应用。',
            [{ text: '重启', onPress: () => Updates.reloadAsync() }]
          );
        } else {
          console.log('No update available.');
          setIsAppReady(true); // 没有更新，直接进入应用
        }
      } else {
        // 开发模式下，模拟检查完成，直接进入应用
        console.log('在开发模式下跳过更新检查。');
        setIsAppReady(true);
      }
    } catch (error: any) {
      const errorMessage = `检查更新时出错: ${error.message}`;
      console.error('Error fetching update:', error);
      Alert.alert('更新失败', errorMessage + '\n将继续启动应用。');
      setIsAppReady(true); // 即使更新失败，也继续启动应用
    }
  }, []);

  useEffect(() => {
    onFetchUpdateAsync();
  }, [onFetchUpdateAsync]);

  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  // 如果应用尚未准备好（例如，字体未加载或更新检查未完成），则显示一个简单的加载指示器
  // 但不再是全屏的 LoadingScreen，因为更新过程现在是后台的
  if (!isAppReady) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#409eff" />
        <Text style={{ marginTop: 10 }}>正在准备应用...</Text>
      </View>
    );
  }

  // Toast 配置对象
  const toastConfig = {
    /*
      Overwrite 'success' type,
      by modifying the existing `BaseToast` component
    */
    // success: (props: BaseToastProps) => (
    //   <BaseToast
    //     {...props}
    //     style={{ borderLeftColor: 'pink' }}
    //     contentContainerStyle={{ paddingHorizontal: 15 }}
    //     text1Style={{ fontSize: 15, fontWeight: '400' }}
    //   />
    // ),
    /*
      Overwrite 'error' type,
      by modifying the existing `ErrorToast` component
    */
    // error: (props: BaseToastProps) => (
    //   <ErrorToast
    //     {...props}
    //     text1Style={{
    //       fontSize: 17
    //     }}
    //     text2Style={{
    //       fontSize: 15
    //     }}
    //   />
    // ),
    /*
      You can create any type of toast you want,
      by passing a component to the `type` property.
    */
    customToast: (props: BaseToastProps) => <CustomToast {...props} />, // 注册你的自定义 Toast 类型
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
