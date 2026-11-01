import { Alert, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import Entypo from '@expo/vector-icons/Entypo';
import { Feather } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import Button from './Button';
import AmbulanceBookingHeader from './AmbulanceBookingHeader';
import { auth, db } from '../../config/firebase'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { useRouter } from 'expo-router';
import { useTheme } from '../context/ThemeContext'; // পাথ প্রজেক্ট অনুযায়ী ঠিক করে নিও

const AmbulanceBookingForm = () => {
    const [selectedAmbulance, setSelectedAmbulance] = useState('Ac Ambulance');
    const [patientName, setPatientName] = useState('');
    const [pickupLocation, setPickupLocation] = useState('');
    const [destination, setDestination] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const { colors, isDarkMode } = useTheme();

    const handleBooking = async () => {
      if(!patientName || !pickupLocation || !destination || !phoneNumber) {
        Alert.alert('Please fill all the field')
        return;
      }

      const currentUser = auth.currentUser
      if(!currentUser) {
        Alert.alert('Please login first')
        router.replace('/(auth)/LoginScreen')
        return;
      }

      try {
        setLoading(true)

        await addDoc(collection(db,'ambulance_bookings'),{
          userId: currentUser.uid,
          userEmail: currentUser.email,
          ambulanceType: selectedAmbulance,
          patientName: patientName,
          pickupLocation: pickupLocation,
          destination: destination,
          phoneNumber: phoneNumber,
          status: 'pending',
          createdAt: serverTimestamp()
        })

        Alert.alert('Booking success')
        router.replace('/(main)/Home')
      } catch (error) {
        Alert.alert('Booking Error', error.message)
      } finally {
        setLoading(false)
      }
    }

  return (
    <>
    <AmbulanceBookingHeader/>
    <View style={styles.formContainer}>
        {/* Ambulance Type Picker Field */}
       <View style={styles.ambulanceContainer}>
      <Text style={[styles.ambulanceHeader, { color: colors.textPrimary }]}>Ambulance Type</Text>
      
      <View style={[styles.inputWrapper, { backgroundColor: colors.cardBackground, borderColor: colors.border }]}>
        <MaterialCommunityIcons 
          name="ambulance" 
          size={20} 
          color={colors.textSecondary} 
          style={styles.iconStyle} 
        />
        
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={selectedAmbulance}
            onValueChange={(itemValue) => setSelectedAmbulance(itemValue)}
            style={[styles.pickerStyle, { color: colors.textPrimary }]}
            dropdownIconColor={colors.textPrimary}
          >
            <Picker.Item label="Ac Ambulance" value="Ac Ambulance" color={isDarkMode ? "#fff" : "#333"} />
            <Picker.Item label="Non-Ac Ambulance" value="Non-Ac Ambulance" color={isDarkMode ? "#fff" : "#333"} />
            <Picker.Item label="ICU Ambulance" value="ICU Ambulance" color={isDarkMode ? "#fff" : "#333"} />
            <Picker.Item label="Normal Ambulance" value="Normal Ambulance" color={isDarkMode ? "#fff" : "#333"} />
            <Picker.Item label="Fridger Ambulance" value="Fridger Ambulance" color={isDarkMode ? "#fff" : "#333"} />
          </Picker>
        </View>
      </View>
    </View>

        {/* Patient Name Field */}
        <View style={styles.passwordContainer}>
          <Text style={[styles.passwordHeader, { color: colors.textPrimary }]}>Patient Name</Text>
          <View style={[styles.inputWrapper, { backgroundColor: colors.cardBackground, borderColor: colors.border }]}>
            <Feather name="user" size={20} color={colors.textSecondary} style={styles.iconStyle} />
            <TextInput 
              value={patientName} 
              onChangeText={setPatientName} 
              style={[styles.passwordBox, { color: colors.textPrimary }]} 
              placeholder='Enter Patient Name' 
              placeholderTextColor={colors.textSecondary} 
            />
          </View>
        </View>

        {/* Pickup Location Field */}
        <View style={styles.passwordContainer}>
          <Text style={[styles.passwordHeader, { color: colors.textPrimary }]}>Pickup Location</Text>
          <View style={[styles.inputWrapper, { backgroundColor: colors.cardBackground, borderColor: colors.border }]}>
            <Entypo name="location-pin" size={20} color={colors.textSecondary} style={styles.iconStyle} />
            <TextInput 
              value={pickupLocation} 
              onChangeText={setPickupLocation} 
              style={[styles.passwordBox, { color: colors.textPrimary }]} 
              placeholder='Enter Pickup Location' 
              placeholderTextColor={colors.textSecondary} 
            />
          </View>
        </View>

        {/* Destination Field */}
        <View style={styles.passwordContainer}>
          <Text style={[styles.passwordHeader, { color: colors.textPrimary }]}>Destination</Text>
          <View style={[styles.inputWrapper, { backgroundColor: colors.cardBackground, borderColor: colors.border }]}>
            <Entypo name="location-pin" size={18} color={colors.textSecondary} style={styles.iconStyle} />
            <TextInput 
              value={destination} 
              onChangeText={setDestination} 
              style={[styles.passwordBox, { color: colors.textPrimary }]} 
              placeholder='Enter Destination' 
              placeholderTextColor={colors.textSecondary} 
            />
          </View>
        </View>

        {/* Phone Number Field */}
        <View style={styles.passwordContainer}>
          <Text style={[styles.passwordHeader, { color: colors.textPrimary }]}>Phone Number</Text>
          <View style={[styles.inputWrapper, { backgroundColor: colors.cardBackground, borderColor: colors.border }]}>
            <Feather name="phone" size={18} color={colors.textSecondary} style={styles.iconStyle} />
            <TextInput 
              value={phoneNumber} 
              onChangeText={setPhoneNumber} 
              style={[styles.passwordBox, { color: colors.textPrimary }]} 
              placeholder='Enter Phone Number' 
              placeholderTextColor={colors.textSecondary} 
              keyboardType="phone-pad"
            />
          </View>
        </View>
    </View>

    <Button onPress={handleBooking} BtnText={loading ? "Submitting Booking..." : "Confirm Booking"}/>
    </>
  )
}

export default AmbulanceBookingForm

const styles = StyleSheet.create({
    formContainer:{
        rowGap: 12,
        marginBottom: 28
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
    ambulanceHeader:{
        fontWeight: '800',
        paddingBottom: 10
    },
    passwordBox:{
        flex: 1,
        height: 50,
        paddingLeft: 10,
    },
    passwordHeader:{
        fontWeight: '800',
        paddingBottom: 10
    },
    pickerContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    pickerStyle: {
        width: '100%',
        height: 50,
    },
})