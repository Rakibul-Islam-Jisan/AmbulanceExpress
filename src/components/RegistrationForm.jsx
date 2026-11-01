import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import { Feather } from '@expo/vector-icons';
import Button from './Button';
import RegistrationHeader from './RegistrationHeader';
import { useRouter } from 'expo-router';
import {auth, db} from '../../config/firebase'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import {doc,setDoc} from 'firebase/firestore'
import { Picker } from '@react-native-picker/picker';
import Fontisto from '@expo/vector-icons/Fontisto';
import Ionicons from '@expo/vector-icons/Ionicons';

const RegistrationForm = () => {
    const router = useRouter()
    
    // Role state: 'user' অথবা 'driver'
    const [role, setRole] = useState('user');

    const [fullName, setFullName] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [selectedBlood, setSelectedBlood] = useState('Select Blood Group');
    const [selectedGender, setSelectedGender] = useState('Select Gender');

    // Driver Specific States
    const [licenseNo, setLicenseNo] = useState('');
    const [vehicleNo, setVehicleNo] = useState('');

    const [loading, setLoading] = useState(false);

    const handleRegister = async () => {
      // সাধারণ ভ্যালিডেশন
      if (!fullName || !mobileNumber || !email || !password) {
            Alert.alert("Error", "Please fill in all required fields!");
            return;
        }

        // জেন্ডার ভ্যালিডেশন চেক
        if (selectedGender === 'Select Gender') {
            Alert.alert("Error", "Please select your gender!");
            return;
        }

        // ইউজার হলে ব্লাড গ্রুপ সিলেকশন চেক
        if (role === 'user' && selectedBlood === 'Select Blood Group') {
            Alert.alert("Error", "Please select your blood group!");
            return;
        }

        // ড্রাইভার হলে লাইসেন্স ও ভেহিকেল নম্বর চেক
        if (role === 'driver' && (!licenseNo || !vehicleNo)) {
            Alert.alert("Error", "Please fill in driver license and vehicle number!");
            return;
        }

        try {
          setLoading(true)
          const userCredential = await createUserWithEmailAndPassword(auth, email, password)
          const user = userCredential.user

          await updateProfile(user, {
            displayName: fullName
          })

          // বেস ডেটা অবজেক্ট
          let userData = {
            uid: user.uid,
            fullName: fullName,
            mobileNumber: mobileNumber,
            email: email,
            role: role,
            gender: selectedGender,
            createdAt: new Date()
          }

          // রোল অনুযায়ী আলাদা ফিল্ড যুক্ত করা
          if (role === 'driver') {
            userData.licenseNo = licenseNo;
            userData.vehicleNo = vehicleNo;
          } else {
            userData.bloodGroup = selectedBlood;
          }

          // রোল অনুযায়ী কালেকশন সিলেক্ট করা ('drivers' অথবা 'users')
          const targetCollection = role === 'driver' ? 'drivers' : 'users';

          await setDoc(doc(db, targetCollection, user.uid), userData)

          Alert.alert('Success', `${role === 'driver' ? 'Driver' : 'User'} Account Created!`)
          router.replace('/(auth)/LoginScreen')
        } catch (error) {
          let errorMessage = "An unknown error occurred!";
    
          if (typeof error.message === 'string') {
              errorMessage = error.message;
          } else if (error.message && typeof error.message === 'object') {
              errorMessage = JSON.stringify(error.message);
          } else if (error.code) {
              errorMessage = error.code;
          }

          Alert.alert("Registration Error", errorMessage);
        } finally {
          setLoading(false)
        }
    }

  return (
    <>

    <RegistrationHeader/>

    {/* Role Switcher Buttons (User vs Driver) */}
    <View style={styles.roleSwitchContainer}>
        <TouchableOpacity 
            style={[styles.roleBtn, role === 'user' && styles.activeRoleBtn]} 
            onPress={() => setRole('user')}
        >
            <Text style={[styles.roleText, role === 'user' && styles.activeRoleText]}>User / Patient</Text>
        </TouchableOpacity>

        <TouchableOpacity 
            style={[styles.roleBtn, role === 'driver' && styles.activeRoleBtn]} 
            onPress={() => setRole('driver')}
        >
            <Text style={[styles.roleText, role === 'driver' && styles.activeRoleText]}>Ambulance Driver</Text>
        </TouchableOpacity>
    </View>

     <View style={styles.formContainer}>
        {/* Full Name Field */}
        <View style={styles.emailContainer}>
          <Text style={styles.emailHeader}>{role === 'driver' ? 'Driver Name' : 'Full Name'}</Text>
          <View style={styles.inputWrapper}>
            <Feather name="user" size={20} color="#65767b76" style={styles.iconStyle} />
            <TextInput value={fullName} onChangeText={setFullName} style={styles.emailBox} placeholder='Your Name' placeholderTextColor="#65767be6" />
          </View>
        </View>

        {/* Mobile Number Field */}
        <View style={styles.passwordContainer}>
          <Text style={styles.passwordHeader}>Mobile Number</Text>
          <View style={styles.inputWrapper}>
            <Feather name="phone" size={18} color="#65767b76" style={styles.iconStyle} />
            <TextInput value={mobileNumber} onChangeText={setMobileNumber} style={styles.passwordBox} placeholder='Enter Your mobile' placeholderTextColor="#65767be6" keyboardType="phone-pad" />
          </View>
        </View>

        {/* Email Address Field */}
        <View style={styles.passwordContainer}>
          <Text style={styles.passwordHeader}>Email Address</Text>
          <View style={styles.inputWrapper}>
            <MaterialCommunityIcons name="email-outline" size={20} color="#65767b76" style={styles.iconStyle} />
            <TextInput value={email} onChangeText={setEmail} style={styles.passwordBox} placeholder='Enter Your Email' placeholderTextColor="#65767be6" autoCapitalize="none" />
          </View>
        </View>

        {/* Password Field */}
        <View style={styles.passwordContainer}>
          <Text style={styles.passwordHeader}>Create Password</Text>
          <View style={styles.inputWrapper}>
            <SimpleLineIcons name="lock" size={18} color="#65767b76" style={styles.iconStyle} />
            <TextInput value={password} onChangeText={setPassword} style={styles.passwordBox} placeholder='Create Your Password' placeholderTextColor="#65767be6" secureTextEntry={true} />
          </View>
        </View>

        {/* Gender Field */}
        <View style={styles.ambulanceContainer}>
          <Text style={styles.ambulanceHeader}>Gender</Text>
          
          <View style={styles.inputWrapperAmbulance}>
            <Fontisto 
              name="genderless" 
              size={20} 
              color="#65767b76" 
              style={styles.iconStyle} 
            />
            
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={selectedGender}
                onValueChange={(itemValue) => setSelectedGender(itemValue)}
                style={styles.pickerStyle}
              >
                <Picker.Item label="Select Gender" value="Select Gender" />
                <Picker.Item label="Male" value="Male" />
                <Picker.Item label="Female" value="Female" />
                <Picker.Item label="Other" value="Other" />
              </Picker>
            </View>
          </View>
        </View>

        {/* CONDITIONAL FIELDS: ড্রাইভার হলে লাইসেন্স ও ভেহিকেল নম্বর, ইউজার হলে ব্লাড গ্রুপ */}
        {role === 'driver' ? (
            <>
                {/* Driver License No */}
                <View style={styles.passwordContainer}>
                  <Text style={styles.passwordHeader}>Driver License No</Text>
                  <View style={styles.inputWrapper}>
                    <Ionicons name="card-outline" size={20} color="#65767b76" style={styles.iconStyle} />
                    <TextInput value={licenseNo} onChangeText={setLicenseNo} style={styles.passwordBox} placeholder='Enter License Number' placeholderTextColor="#65767be6" />
                  </View>
                </View>

                {/* Vehicle Number */}
                <View style={styles.passwordContainer}>
                  <Text style={styles.passwordHeader}>Vehicle / Ambulance Number</Text>
                  <View style={styles.inputWrapper}>
                    <MaterialCommunityIcons name="ambulance" size={20} color="#65767b76" style={styles.iconStyle} />
                    <TextInput value={vehicleNo} onChangeText={setVehicleNo} style={styles.passwordBox} placeholder='Enter Vehicle No (e.g. Dhaka-Metro-1234)' placeholderTextColor="#65767be6" />
                  </View>
                </View>
            </>
        ) : (
            /* Blood Group Picker */
            <View style={styles.ambulanceContainer}>
              <Text style={styles.ambulanceHeader}>Blood Group</Text>
              
              <View style={styles.inputWrapperAmbulance}>
                <Fontisto 
                  name="blood-drop" 
                  size={20} 
                  color="#65767b76" 
                  style={styles.iconStyle} 
                />
                
                <View style={styles.pickerContainer}>
                  <Picker
                    selectedValue={selectedBlood}
                    onValueChange={(itemValue) => setSelectedBlood(itemValue)}
                    style={styles.pickerStyle}
                  >
                    <Picker.Item label="Select Blood Group" value="Select Blood Group" />
                    <Picker.Item label="A+" value="A+" />
                    <Picker.Item label="B+" value="B+" />
                    <Picker.Item label="AB+" value="AB+" />
                    <Picker.Item label="O+" value="O+" />
                    <Picker.Item label="A-" value="A-" />
                    <Picker.Item label="B-" value="B-" />
                    <Picker.Item label="AB-" value="AB-" />
                    <Picker.Item label="O-" value="O-" />
                  </Picker>
                </View>
              </View>
            </View>
        )}

     </View>

    <Button onPress={handleRegister} BtnText={loading ? "Creating Account..." : "Continue"}/>

    <View style={styles.other}>
            <Text>Already have an Account?</Text>
            <TouchableOpacity onPress={()=>router.push('/(auth)/LoginScreen')}>
                <Text style={styles.signuptext}>Signin</Text>
            </TouchableOpacity>
        </View>

    </>
  )
}

export default RegistrationForm

const styles = StyleSheet.create({
    roleSwitchContainer: {
        flexDirection: 'row',
        backgroundColor: '#e5e7eb',
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
        color: '#4b5563',
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
        borderColor: '#65767b76',
        borderRadius: 12,
        backgroundColor: '#ffffff',
    },
    iconStyle: {
        marginLeft: 14,
    },
    emailBox:{
        flex: 1,
        height: 50,
        paddingLeft: 10,
        color:'#65767be6'
    },
    emailHeader:{
        fontWeight:'800',
        paddingBottom:10
    },
    passwordBox:{
        flex: 1,
        height: 50,
        paddingLeft: 10,
        color:'#65767be6'
    },
    passwordHeader:{
        fontWeight:'800',
        paddingBottom:10
    },
    other:{
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop:30,
        columnGap:10
    },
    signuptext:{
        fontWeight:900,
        color: '#E83F45'
    },
    ambulanceHeader:{
        fontWeight:'800',
        paddingBottom:10
    },
    pickerContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    pickerStyle: {
        width: '100%',
        height: 50,
        color: '#333333',
    },
    inputWrapperAmbulance:{
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        borderWidth: 1,
        borderColor: '#65767b76',
        borderRadius: 12,
        backgroundColor: '#ffffff',
    }
})