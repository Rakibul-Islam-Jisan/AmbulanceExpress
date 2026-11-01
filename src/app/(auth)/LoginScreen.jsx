import { StyleSheet, View } from 'react-native'
import React from 'react'
import KeyboardWrapper from '../../components/KeyboardWrapper'
import LoginForm from '../../components/LoginForm'
import { useTheme } from '../../context/ThemeContext' // পাথ প্রজেক্ট অনুযায়ী ঠিক করে নিও

const LoginScreen = () => {
  const { colors } = useTheme();

  return (
    <View style={[styles.screenPage, { backgroundColor: colors.background }]}>
      <KeyboardWrapper>
        <LoginForm/>
      </KeyboardWrapper>
    </View>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
  screenPage:{
    flex: 1,
  }
})