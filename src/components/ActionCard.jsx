import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import AntDesign from '@expo/vector-icons/AntDesign'
import { useTheme } from '../context/ThemeContext' // পাথ ঠিক করে নিও

const ActionCard = ({ icon, title, subtitle, onPress }) => {
  const { colors, isDarkMode } = useTheme();

  return (
    <TouchableOpacity 
      style={[
        styles.cardContainer, 
        { 
          backgroundColor: colors.cardBackground,
          borderColor: colors.border,
          borderWidth: isDarkMode ? 1 : 0
        }
      ]} 
      onPress={onPress}
      activeOpacity={0.8}
    >
      {/* Top Icon and Arrow */}
      <View style={styles.topRow}>
        <View style={[styles.iconBox, { backgroundColor: isDarkMode ? 'rgba(232, 63, 69, 0.15)' : '#FFF0F1' }]}>
          {icon}
        </View>
        <AntDesign name="arrow-right" size={16} color={colors.textSecondary} />
      </View>

      {/* Title & Subtitle */}
      <View style={styles.textContainer}>
        <Text style={[styles.title, { color: colors.textPrimary }]}>{title}</Text>
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>{subtitle}</Text>
      </View>
    </TouchableOpacity>
  )
}

export default ActionCard

const styles = StyleSheet.create({
  cardContainer: {
    width: '47%', 
    borderRadius: 20,
    padding: 16,
    marginTop: 20,
    justifyContent: 'space-between',
    minHeight: 140,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
    marginBottom: 16,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  iconBox: {
    width: 45,
    height: 45,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    marginTop: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 12,
  },
})