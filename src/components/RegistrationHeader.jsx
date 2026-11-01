import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const RegistrationHeader = () => {
  return (
    <View>
              <Text style={styles.heading}>Create <Text style={styles.headingPart}>Your Account</Text></Text>
    </View>
  )
}

export default RegistrationHeader

const styles = StyleSheet.create({
    heading:{
        color:'#000000',
        fontWeight:'700',
        fontSize:30,
        paddingBottom:15
    },
    headingPart:{
        color:'#E83F45'
    },
})