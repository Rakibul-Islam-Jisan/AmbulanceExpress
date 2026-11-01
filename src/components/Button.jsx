import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

const Button = ({BtnText,onPress}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.btnContainer}>
        <Text style={styles.btnText}>{BtnText}</Text>
    </TouchableOpacity>
  )
}

export default Button

const styles = StyleSheet.create({
    btnContainer:{
        width: '100%',
        height:50,
        backgroundColor: '#E83F45',
        justifyContent:'center',
        alignItems:'center',
        borderRadius:12

    },
    btnText:{
        color : '#ffff',
        fontWeight:700,
        fontSize:15
    }
})