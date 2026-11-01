import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import KeyboardWrapper from '../../components/KeyboardWrapper'
import Navbar from '../../components/Navbar'
import BookingCards from '../../components/BookingCards'
import { useTheme } from '../../context/ThemeContext' // পাথ তোমার প্রজেক্ট অনুযায়ী ঠিক করে নিও

const AllBookingScreen = () => {
    const { colors } = useTheme();

  return (
    <View style={[styles.allBookingContainer, { backgroundColor: colors.background }]}>
      <KeyboardWrapper justifyContent='flex-start'>
        <Text style={[styles.allBookingHeader, { color: colors.textPrimary }]}>
            Your All Bookings are <Text style={styles.highlightText}>Here</Text>
        </Text>
        <BookingCards/>
      </KeyboardWrapper>
      <Navbar/>
    </View>
  )
}

export default AllBookingScreen

const styles = StyleSheet.create({
    allBookingContainer:{
        flex: 1,
        position: 'relative'
    },
    allBookingHeader:{
        fontWeight: '800',
        fontSize: 20,
        paddingBottom: 20,
        paddingTop: 30,
        paddingHorizontal: 16,
    },
    highlightText: {
        color: '#E83F45',
    }
})