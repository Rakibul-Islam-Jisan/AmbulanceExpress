import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Divider = () => {
  return (
     <View style={styles.devider}>
            <View style={styles.bar}></View>
            <Text>OR</Text>
            <View style={styles.bar}></View>
        </View>
  )
}

export default Divider

const styles = StyleSheet.create({
    devider:{
        flexDirection:'row',
        justifyContent:'space-between',
        paddingTop:15,
        alignItems:'center'
    },
    bar:{
        width:'35%',
        height:1,
        backgroundColor:'#65767b76'
    },
})