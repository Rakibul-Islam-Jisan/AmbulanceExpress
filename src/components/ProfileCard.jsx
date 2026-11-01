import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import Feather from '@expo/vector-icons/Feather'
import { auth, db } from '../../config/firebase'
import { doc, getDoc } from 'firebase/firestore'
import { useTheme } from '../context/ThemeContext' // পাথ প্রজেক্ট অনুযায়ী ঠিক করে নিও

const ProfileCard = () => {
  const [userName, setuserName] = useState('')
  const [userEmail, setuserEmail] = useState('')
  const { colors, isDarkMode } = useTheme()

  useEffect(()=>{
    const fetchData = async ()=>{
      try {
        const currentUser = auth.currentUser
        if(currentUser) {
          const userDocinfo = doc(db, 'users', currentUser.uid)
          const userDocinofGet = await getDoc(userDocinfo)

          if(userDocinofGet.exists()) {
            setuserName(userDocinofGet.data().fullName)
            setuserEmail(userDocinofGet.data().email)
          } else {
            setuserName('user')
            setuserEmail('xyz@gmail.com')
          }
        }
      } catch (error) {
        console.log('error fetching data', error);
      }
    }
    fetchData()
  }, [])

  return (
    <View style={[
        styles.cardContainer, 
        { 
          backgroundColor: isDarkMode ? colors.cardBackground : '#0B2527',
          borderColor: colors.border,
          borderWidth: isDarkMode ? 1 : 0
        }
    ]}>
      
      {/* Avatar & Edit Button Section */}
      <View style={styles.avatarContainer}>
        <View style={styles.avatarCircle}>
          <Text style={styles.avatarText}>AM</Text>
        </View>
        <TouchableOpacity style={[styles.editButton, { backgroundColor: colors.cardBackground }]} activeOpacity={0.8}>
          <Text style={[styles.editText, { color: colors.textPrimary }]}>Edit</Text>
        </TouchableOpacity>
      </View>

      {/* User Name & Email */}
      <View style={styles.infoContainer}>
        <Text style={styles.userName}>{userName}</Text>
        <Text style={styles.userEmail}>{userEmail}</Text>
      </View>

      {/* Bottom Badges Section */}
      <View style={styles.badgeRow}>
        <View style={styles.badge}>
          <Feather name="shield" size={14} color="#00FFA6" />
          <Text style={styles.badgeText}>Verified profile</Text>
        </View>

        <View style={styles.badge}>
          <MaterialCommunityIcons name="water" size={14} color="#FF6B6B" />
          <Text style={styles.badgeText}>O+ Blood</Text>
        </View>
      </View>

    </View>
  )
}

export default ProfileCard

const styles = StyleSheet.create({
  cardContainer: {
    borderRadius: 24,
    padding: 24,
    width: '100%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 6,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 14,
  },
  avatarCircle: {
    width: 75,
    height: 75,
    borderRadius: 37.5,
    backgroundColor: '#E83F45',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: 'rgba(255, 255, 255, 0.15)',
  },
  avatarText: {
    color: '#ffffff',
    fontSize: 22,
    fontWeight: 'bold',
  },
  editButton: {
    position: 'absolute',
    bottom: 0,
    right: -10,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  editText: {
    fontSize: 11,
    fontWeight: 'bold',
  },
  infoContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  userName: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 4,
  },
  userEmail: {
    color: '#A0B4B5',
    fontSize: 13,
  },
  badgeRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  badgeText: {
    color: '#E0E0E0',
    fontSize: 12,
    fontWeight: '500',
    marginLeft: 6,
  },
})