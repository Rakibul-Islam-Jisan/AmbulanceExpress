import { StyleSheet, View } from 'react-native'
import React from 'react'
import KeyboardWrapper from '../../components/KeyboardWrapper'
import AmbulanceBookingForm from '../../components/AmbulanceBookingForm'
import Navbar from '../../components/Navbar'
import { useTheme } from '../../context/ThemeContext' // পাথ প্রজেক্ট অনুযায়ী ঠিক করে নিও

const AmbulanceBookingScreen = () => {
  const { colors } = useTheme();

  return (
    <View style={[styles.screenPage, { backgroundColor: colors.background }]}>
      <KeyboardWrapper>
        <AmbulanceBookingForm/>
      </KeyboardWrapper>
      <Navbar/>
    </View>
  )
}

export default AmbulanceBookingScreen

const styles = StyleSheet.create({
    screenPage:{
        flex: 1,
    }
})