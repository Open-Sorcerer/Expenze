import React from "react";
import RootStackNavigator from "navigation/RootStackNavigator";
import { SafeAreaProvider } from "react-native-safe-area-context";
import WagmiProvider from "providers/WagmiProvider";
import "expo-dev-client";
import { Appearance } from "react-native";
import useThemeStore from "store/ThemeStore";

export default function App() {
  const toggleTheme = useThemeStore((state) => state.toggleTheme);
  React.useEffect(() => {
    const colorModeSub = Appearance.addChangeListener(() => {
      toggleTheme();
    });
    return () => {
      colorModeSub.remove();
    };
  }, [toggleTheme]);
  return (
    <SafeAreaProvider>
      <WagmiProvider>
        <RootStackNavigator />
      </WagmiProvider>
    </SafeAreaProvider>
  );
}
