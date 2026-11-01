import { Slot } from "expo-router";
import { View, StyleSheet } from "react-native";
import { ThemeProvider, useTheme } from '../context/ThemeContext'; // তোমার প্রজেক্টের পাথ অনুযায়ী অ্যাডজাস্ট করে নিও

// আলাদা একটি মেইন কম্পোনেন্ট বানানো হলো যাতে useTheme হুকটি ThemeProvider-এর ভেতরে কাজ করতে পারে
function MainLayout() {
  const { colors } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Slot />
    </View>
  );
}

export default function RootLayout() {
  return (
    <ThemeProvider>
      <MainLayout />
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});