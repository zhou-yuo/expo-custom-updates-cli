import * as Updates from 'expo-updates';
import { useCallback, useState } from 'react';
import { Alert } from 'react-native';
import Toast from 'react-native-toast-message';

/**
 * Custom hook to handle Expo Over-The-Air (OTA) updates.
 * Provides a function to manually trigger an update check and a loading state.
 *
 * @returns An object containing:
 * - `checkForAppUpdates`: A function to manually trigger the update check.
 * - `isCheckingForUpdate`: A boolean indicating if an update check is currently in progress.
 */
export const useAppUpdater = () => {
  const [isCheckingForUpdate, setIsCheckingForUpdate] = useState<boolean>(false);

  const checkForAppUpdates = useCallback(async () => {
    if (isCheckingForUpdate) {
      console.log('Already checking for updates. Skipping.');
      return;
    }

    setIsCheckingForUpdate(true);
    console.log('Starting update check...');

    try {
      if (!__DEV__) {
        const update = await Updates.checkForUpdateAsync();

        if (update.isAvailable) {
          Toast.show({
            type: 'customToast',
            text1: '发现新版本，正在后台下载...',
            position: 'bottom',
            visibilityTime: 3000,
          });
          console.log('New update available. Downloading...');
          await Updates.fetchUpdateAsync();
          console.log('New version downloaded.');

          Alert.alert(
            '更新提示',
            '新版本已下载，即将重启应用。',
            [{ text: '重启', onPress: () => Updates.reloadAsync() }]
          );
        } else {
          console.log('No update available.');
          Toast.show({
            type: 'customToast',
            text1: '当前已是最新版本',
            position: 'bottom',
            visibilityTime: 2000,
          });
        }
      } else {
        console.log('Skipping update check in development mode.');
        Toast.show({
          type: 'customToast',
          text1: '开发模式，跳过更新检查',
          position: 'bottom',
          visibilityTime: 2000,
        });
      }
    } catch (error: any) {
      const errorMessage = `检查更新时出错: ${error.message}`;
      console.error('Error fetching update:', error);
      Alert.alert('更新失败', errorMessage);
    } finally {
      setIsCheckingForUpdate(false);
      console.log('Update check finished.');
    }
  }, [isCheckingForUpdate]);

  return { checkForAppUpdates, isCheckingForUpdate };
};