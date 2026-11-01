import { View, Text } from 'react-native'
import React from 'react'
import KeyboardWrapper from '../../components/KeyboardWrapper'
import RegistrationForm from '../../components/RegistrationForm'

const RegistrationScreen = () => {
  return (
    <>
    <KeyboardWrapper>
        <RegistrationForm/>
    </KeyboardWrapper>
    </>
  )
}

export default RegistrationScreen