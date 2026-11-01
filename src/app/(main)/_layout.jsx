import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

const _layout = () => {
  return (
    <Stack screenOptions={{headerShown:false}}>
        <Stack.Screen name='AmbulanceBookingScreen'/>
        <Stack.Screen name='Home'/>
        <Stack.Screen name='UserProfile'/>
        <Stack.Screen name='AllBookingScreen'/>
        
    </Stack>
  )
}

export default _layout