import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ThemeContext = createContext();

// কালার প্যালেট (লাইট এবং ডার্ক মোডের জন্য)
export const lightColors = {
  background: '#FAFAFA',
  cardBackground: '#FFFFFF',
  textPrimary: '#111827',
  textSecondary: '#6B7280',
  border: '#E5E7EB',
  tint: '#E83F45',
  cardBorder: '#FECACA',
  badgeBg: '#FEF2F2',
};

export const darkColors = {
  background: '#0B0F17',
  cardBackground: '#111827',
  textPrimary: '#FFFFFF',
  textSecondary: '#9CA3AF',
  border: '#1F2937',
  tint: '#E83F45',
  cardBorder: '#1F2937',
  badgeBg: 'rgba(232, 63, 69, 0.15)',
};

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // অ্যাপ ওপেন হলে আগের সেভ করা থিম লোড করা
  useEffect(() => {
    const loadTheme = async () => {
      try {
        const savedTheme = await AsyncStorage.getItem('user_theme');
        if (savedTheme !== null) {
          setIsDarkMode(savedTheme === 'dark');
        }
      } catch (error) {
        console.log('Error loading theme:', error);
      }
    };
    loadTheme();
  }, []);

  // থিম টগল করার ফাংশন এবং AsyncStorage-এ সেভ করা
  const toggleTheme = async () => {
    try {
      const newTheme = !isDarkMode;
      setIsDarkMode(newTheme);
      await AsyncStorage.setItem('user_theme', newTheme ? 'dark' : 'light');
    } catch (error) {
      console.log('Error saving theme:', error);
    }
  };

  const colors = isDarkMode ? darkColors : lightColors;

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme, colors }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);