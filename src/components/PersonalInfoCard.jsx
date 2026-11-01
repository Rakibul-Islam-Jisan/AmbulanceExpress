import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { auth, db } from '../../config/firebase'
import { doc, getDoc } from 'firebase/firestore'
import { useTheme } from '../context/ThemeContext' // পাথ প্রজেক্ট অনুযায়ী ঠিক করে নিও

const PersonalInfoCard = ({ 
  title = 'Personal information',
  onEditPress
}) => {
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [gender, setGender] = useState('');
  const [bloodGroup, setBloodGroup] = useState('');
  const [licenseNo, setLicenseNo] = useState('');
  const [vehicleNo, setVehicleNo] = useState('');
  const [role, setRole] = useState('user');
  const { colors, isDarkMode } = useTheme();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const currentUser = auth.currentUser;
        if (currentUser) {
          const uid = currentUser.uid;

          let userDocRef = doc(db, 'users', uid);
          let userDocSnap = await getDoc(userDocRef);

          if (userDocSnap.exists()) {
            const data = userDocSnap.data();
            setFullName(data.fullName || 'N/A');
            setPhoneNumber(data.mobileNumber || 'N/A');
            setGender(data.gender || 'N/A');
            setBloodGroup(data.bloodGroup || 'N/A');
            setRole('user');
          } else {
            userDocRef = doc(db, 'drivers', uid);
            userDocSnap = await getDoc(userDocRef);

            if (userDocSnap.exists()) {
              const data = userDocSnap.data();
              setFullName(data.fullName || 'N/A');
              setPhoneNumber(data.mobileNumber || 'N/A');
              setGender(data.gender || 'N/A');
              setLicenseNo(data.licenseNo || 'N/A');
              setVehicleNo(data.vehicleNo || 'N/A');
              setRole('driver');
            }
          }
        }
      } catch (error) {
        console.log('Error fetching personal info:', error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <View style={[
        styles.cardContainer, 
        { 
          backgroundColor: colors.cardBackground,
          borderColor: colors.border,
          borderWidth: isDarkMode ? 1 : 0
        }
    ]}>
      
      {/* Top Header: Title & Edit Button */}
      <View style={[styles.headerRow, { borderBottomColor: colors.border }]}>
        <Text style={[styles.cardTitle, { color: colors.textPrimary }]}>{title}</Text>
        <TouchableOpacity onPress={onEditPress} activeOpacity={0.7}>
          <Text style={styles.editText}>Edit</Text>
        </TouchableOpacity>
      </View>

      {/* Info Row 1: Full name */}
      <View style={[styles.infoRow, { borderBottomColor: colors.border }]}>
        <Text style={[styles.label, { color: colors.textSecondary }]}>Full name</Text>
        <Text style={[styles.value, { color: colors.textPrimary }]}>{fullName}</Text>
      </View>

      {/* Info Row 2: Phone number */}
      <View style={[styles.infoRow, { borderBottomColor: colors.border }]}>
        <Text style={[styles.label, { color: colors.textSecondary }]}>Phone number</Text>
        <Text style={[styles.value, { color: colors.textPrimary }]}>{phoneNumber}</Text>
      </View>

      {/* Info Row 3: Gender */}
      <View style={[styles.infoRow, { borderBottomColor: colors.border }]}>
        <Text style={[styles.label, { color: colors.textSecondary }]}>Gender</Text>
        <Text style={[styles.value, { color: colors.textPrimary }]}>{gender}</Text>
      </View>

      {/* Conditional Rows */}
      {role === 'driver' ? (
        <>
          <View style={[styles.infoRow, { borderBottomColor: colors.border }]}>
            <Text style={[styles.label, { color: colors.textSecondary }]}>License No</Text>
            <Text style={[styles.value, { color: colors.textPrimary }]}>{licenseNo}</Text>
          </View>

          <View style={[styles.infoRow, styles.lastRow]}>
            <Text style={[styles.label, { color: colors.textSecondary }]}>Vehicle No</Text>
            <Text style={[styles.value, { color: colors.textPrimary }]}>{vehicleNo}</Text>
          </View>
        </>
      ) : (
        <View style={[styles.infoRow, styles.lastRow]}>
          <Text style={[styles.label, { color: colors.textSecondary }]}>Blood Group</Text>
          <Text style={[styles.value, { color: colors.textPrimary }]}>{bloodGroup}</Text>
        </View>
      )}

    </View>
  )
}

export default PersonalInfoCard

const styles = StyleSheet.create({
  cardContainer: {
    borderRadius: 20,
    padding: 20,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
    marginBottom: 16,
    marginTop: 30
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 14,
    borderBottomWidth: 1,
    marginBottom: 4,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  editText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#E83F45',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  lastRow: {
    borderBottomWidth: 0,
    paddingBottom: 0,
  },
  label: {
    fontSize: 14,
  },
  value: {
    fontSize: 14,
    fontWeight: '600',
  },
})