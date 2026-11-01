import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useTheme } from '../context/ThemeContext' // পাথ তোমার প্রজেক্ট অনুযায়ী ঠিক করে নিও

const AmbulanceBookingHeader = () => {
  const { colors } = useTheme();

  return (
    <View>
      <Text style={[styles.headingText, { color: colors.textPrimary }]}>
        REQUEST <Text style={styles.highlightText}>AMBULANCE</Text>
      </Text>
    </View>
  )
}

export default AmbulanceBookingHeader

const styles = StyleSheet.create({
    headingText:{
        fontWeight: '800',
        paddingBottom: 19,
        fontSize: 18
    },
    highlightText: {
        color: '#E83F45',
    }
})