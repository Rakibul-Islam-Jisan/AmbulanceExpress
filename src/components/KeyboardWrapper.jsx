import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

const KeyboardWrapper = ({ children, justifyContent = 'center' }) => {
  return (
    <SafeAreaView style={styles.areaStyle}>
        <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardStyle}
        >
            <ScrollView
            contentContainerStyle={[styles.scrollContent, { justifyContent }]}
            showsVerticalScrollIndicator={false}
            style={styles.scrolles}
            >
                {children}
            </ScrollView>
        </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default KeyboardWrapper

const styles = StyleSheet.create({
    areaStyle: {
        flex: 1
    },
    keyboardStyle: {
        flex: 1
    },
    scrolles: {
        flex: 1
    },
    scrollContent: {
        flexGrow: 1,
        paddingHorizontal: 24,
        paddingVertical: 20
    }
})