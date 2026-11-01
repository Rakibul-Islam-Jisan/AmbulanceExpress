import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useTheme } from '../context/ThemeContext' // পাথ তোমার প্রজেক্ট অনুযায়ী ঠিক করে নিও

const LoginHeader = () => {
  const { colors } = useTheme()

  return (
    <View>
         <Text style={[styles.heading, { color: colors.textPrimary }]}>
            Welcome <Text style={styles.headingPart}>Back</Text>
         </Text>
         <Text style={[styles.headingBottom, { color: colors.textSecondary }]}>
            Sign into request an ambulance or manage your bookings
         </Text>
    </View>
  )
}

export default LoginHeader

const styles = StyleSheet.create({
    heading:{
        fontWeight:'700',
        fontSize:30
    },
    headingPart:{
        color:'#E83F45'
    },
    headingBottom:{
        paddingBottom:16
    },
})