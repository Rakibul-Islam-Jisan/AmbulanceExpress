import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import AntDesign from '@expo/vector-icons/AntDesign';
import Entypo from '@expo/vector-icons/Entypo';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import Button from './Button'
import Divider from './Divider';
import LoginHeader from './LoginHeader';
import { useRouter } from 'expo-router';
import { auth, db } from '../../config/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { useTheme } from '../context/ThemeContext'; // পাথ তোমার প্রজেক্ট অনুযায়ী ঠিক করে নিও

const LoginForm = () => {
    // Role state: 'user' অথবা 'driver'
    const [role, setRole] = useState('user');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const { colors, isDarkMode } = useTheme();

    const handleLogin = async () => {
        if (!email || !password) {
            Alert.alert("Error", "Please enter both email and password!");
            return;
        }

        try {
            setLoading(true);

            // ১. ফায়ারবেসের মাধ্যমে সাইন-ইন করা
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // ২. রোল অনুযায়ী সঠিক কালেকশন থেকে ডাটা চেক করা
            const targetCollection = role === 'driver' ? 'drivers' : 'users';
            const userDocRef = doc(db, targetCollection, user.uid);
            const userDocSnap = await getDoc(userDocRef);

            if (userDocSnap.exists()) {
                Alert.alert("Success", "Logged in successfully!");
                console.log('success login');

                // সফলভাবে লগইন হওয়ার পর হোম পেজে রিডাইরেক্ট
                router.replace('/(main)/Home');
            } else {
                Alert.alert("Login Error", `No account found as a ${role === 'driver' ? 'Driver' : 'User'}. Please check your selected role.`);
            }

        } catch (error) {
            let errorMessage = "Invalid email or password!";
            if (typeof error.message === 'string') {
                errorMessage = error.message;
            } else if (error.code) {
                errorMessage = error.code;
            }
            Alert.alert("Login Error", errorMessage);
        } finally {
            setLoading(false);
        }
    }

  return (
    <>
    <LoginHeader/>

    {/* Role Switcher Buttons (User vs Driver) */}
    <View style={[styles.roleSwitchContainer, { backgroundColor: isDarkMode ? '#1F2937' : '#e5e7eb' }]}>
        <TouchableOpacity 
            style={[styles.roleBtn, role === 'user' && styles.activeRoleBtn]} 
            onPress={() => setRole('user')}
        >
            <Text style={[styles.roleText, { color: isDarkMode && role !== 'user' ? '#9CA3AF' : '#4b5563' }, role === 'user' && styles.activeRoleText]}>User / Patient</Text>
        </TouchableOpacity>

        <TouchableOpacity 
            style={[styles.roleBtn, role === 'driver' && styles.activeRoleBtn]} 
            onPress={() => setRole('driver')}
        >
            <Text style={[styles.roleText, { color: isDarkMode && role !== 'driver' ? '#9CA3AF' : '#4b5563' }, role === 'driver' && styles.activeRoleText]}>Ambulance Driver</Text>
        </TouchableOpacity>
    </View>
    
    <View style={styles.formContainer}>
        {/* Email Field with Icon */}
        <View style={styles.emailContainer}>
          <Text style={[styles.emailHeader, { color: colors.textPrimary }]}>Email Address</Text>
          <View style={[styles.inputWrapper, { backgroundColor: colors.cardBackground, borderColor: colors.border }]}>
            <MaterialCommunityIcons name="email-outline" size={20} color={colors.textSecondary} style={styles.iconStyle} />
            <TextInput 
                value={email} 
                onChangeText={setEmail} 
                style={[styles.emailBox, { color: colors.textPrimary }]} 
                placeholder='you@example.com' 
                placeholderTextColor={colors.textSecondary} 
                autoCapitalize="none" 
            />
          </View>
        </View>

        {/* Password Field with Icon */}
        <View style={styles.passwordContainer}>
          <Text style={[styles.passwordHeader, { color: colors.textPrimary }]}>Password</Text>
          <View style={[styles.inputWrapper, { backgroundColor: colors.cardBackground, borderColor: colors.border }]}>
            <SimpleLineIcons name="lock" size={18} color={colors.textSecondary} style={styles.iconStyle} />
            <TextInput 
                value={password} 
                onChangeText={setPassword} 
                style={[styles.passwordBox, { color: colors.textPrimary }]} 
                placeholder='Enter Your Password' 
                placeholderTextColor={colors.textSecondary} 
                secureTextEntry={true} 
            />
          </View>
        </View>
    </View>

    <Button BtnText={loading ? "Signing In..." : "Sign In"} 
      onPress={handleLogin}/>

    <Divider/>

    <View style={styles.linkBtnContainer}>
        <TouchableOpacity style={[styles.linkBtn, { backgroundColor: colors.cardBackground, borderColor: colors.border }]}>
            <AntDesign name="google" size={24} color={colors.textPrimary} />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.linkBtn, { backgroundColor: colors.cardBackground, borderColor: colors.border }]}>
            <Entypo name="facebook" size={24} color={colors.textPrimary} />
        </TouchableOpacity>
    </View>

    <View style={styles.other}>
        <Text style={{ color: colors.textSecondary }}>Dont have an Account?</Text>
        <TouchableOpacity onPress={()=>router.push('/(auth)/RegistrationScreen')}>
            <Text style={styles.signuptext}>Signup</Text>
        </TouchableOpacity>
    </View>
    </>
  )
}

export default LoginForm

const styles = StyleSheet.create({
    roleSwitchContainer: {
        flexDirection: 'row',
        borderRadius: 12,
        padding: 4,
        marginBottom: 20,
    },
    roleBtn: {
        flex: 1,
        paddingVertical: 10,
        alignItems: 'center',
        borderRadius: 10,
    },
    activeRoleBtn: {
        backgroundColor: '#E83F45',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 2,
    },
    roleText: {
        fontWeight: '600',
        fontSize: 14,
    },
    activeRoleText: {
        color: '#ffffff',
        fontWeight: 'bold',
    },
    formContainer:{
        rowGap:12,
        marginBottom:28
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        borderWidth: 1,
        borderRadius: 12,
    },
    iconStyle: {
        marginLeft: 14,
    },
    emailBox:{
        flex: 1,
        height: 50,
        paddingLeft: 10,
    },
    emailHeader:{
        fontWeight:'800',
        paddingBottom:10
    },
    passwordBox:{
        flex: 1,
        height: 50,
        paddingLeft: 10,
    },
    passwordHeader:{
        fontWeight:'800',
        paddingBottom:10
    },
    linkBtnContainer:{
        width:'100%',
        flexDirection:'row',
        justifyContent:'space-evenly',
        marginTop:15
    },
    linkBtn:{
        width:'45%',
        height:48,
        borderWidth:1,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:6
    },
    other:{
        flexDirection:'row',
        justifyContent:'center',
        marginTop:30,
        columnGap:10
    },
    signuptext:{
        fontWeight: '900',
        color: '#E83F45'
    }
})