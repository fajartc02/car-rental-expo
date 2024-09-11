import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import * as SecureStore from 'expo-secure-store';
import { useEffect } from 'react';
import 'react-native-reanimated';
import {router} from 'expo-router';

import { useColorScheme } from '@/hooks/useColorScheme';
import { Provider } from 'react-redux';
// import {store} from '@/redux/store';
import crashlytics from '@react-native-firebase/crashlytics';


import {store, persistor} from '@/redux/store';
import { PersistGate } from 'redux-persist/integration/react';


// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();
import AsyncStorage from '@react-native-async-storage/async-storage';

async function getUser() {
  return await SecureStore.getItemAsync('user');
}


export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded, error] = useFonts({
    SpaceMono: require('@/assets/fonts/SpaceMono-Regular.ttf'),
    "Poppins-Bold": require('@/assets/fonts/Poppins-Bold.ttf'),
  });

  useEffect(() => {
    crashlytics().log('App mounted.');
    if (loaded || error) {
      getUser().then((user) => {
        if(user) router.replace("/(tabs)");
        setTimeout(() => {
          SplashScreen.hideAsync();
        }, 500)
      })
      crashlytics().log('App mounted.');
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <Stack>
            <Stack.Screen name="(auth)" options={{ headerShown: false }} />
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="+not-found" />
          </Stack>
        </PersistGate>
      </Provider>
    </ThemeProvider>
  );
}
