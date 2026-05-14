import React, { useEffect } from "react";
import { Stack, usePathname, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { AuthProvider, useAuth } from "@/context/AuthContext";
import { ComplaintProvider } from "@/context/ComplaintContext";
import { AlertProvider } from "@/context/AlertContext";
import { LanguageProvider } from "@/context/LanguageContext";

function RootNavigation() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (loading) return;

    const inTabs = pathname.startsWith("/(tabs)");
    const currentTab = pathname.split("/").pop();

    if (!user) {
      if (inTabs) {
        router.replace("/login" as any);
      }
      return;
    }

    const isAdmin = user.role === "nagarsevak" || user.role === "super_admin";

    if (isAdmin) {
      if (!inTabs || currentTab !== "admin") {
        router.replace("/(tabs)/admin" as any);
      }
    } else {
      if (!inTabs || currentTab === "admin") {
        router.replace("/(tabs)" as any);
      }
    }
  }, [user, loading, pathname]);

  return (
    <>
      <StatusBar style="light" />

      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="login" />
        <Stack.Screen name="portal-select" />
        <Stack.Screen name="(tabs)" />
      </Stack>
    </>
  );
}

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <LanguageProvider>
          <AuthProvider>
            <ComplaintProvider>
              <AlertProvider>
                <RootNavigation />
              </AlertProvider>
            </ComplaintProvider>
          </AuthProvider>
        </LanguageProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
