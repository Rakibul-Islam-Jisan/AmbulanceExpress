import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Navbar from '../../components/Navbar'
import ProfileCard from '../../components/ProfileCard'
import KeyboardWrapper from '../../components/KeyboardWrapper' 
import PersonalInfoCard from '../../components/PersonalInfoCard'
import MenuCard from '../../components/MenuCard'
import Feather from '@expo/vector-icons/Feather';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useTheme } from '../../context/ThemeContext' // পাথ প্রজেক্ট অনুযায়ী ঠিক করে নিও

const UserProfile = () => {
    const { colors } = useTheme();

    const customMenuItems = [
    {
      icon: <Feather name="bell" size={20} color="#F59E0B" />,
      iconBg: '#FEF3C7',
      title: 'Notifications',
      subtitle: 'Manage push notifications',
      onPress: () => console.log('Notifications clicked'),
    },
    {
      icon: <MaterialIcons name="language" size={20} color="#8B5CF6" />,
      iconBg: '#EDE9FE',
      title: 'Booking History',
      subtitle: 'See all Booking history',
      onPress: () => console.log('Language clicked'),
    },
  ];

  return (
      <View style={[styles.profileContainer, { backgroundColor: colors.background }]}>
          <KeyboardWrapper justifyContent="flex-start">
        
        <Text style={[styles.headerTitle, { color: colors.textPrimary }]}>My Profile</Text>

        {/* Profile Card */}
        <ProfileCard />

        {/* Personal Info Card */}
        <PersonalInfoCard />

        <MenuCard items={customMenuItems} />

    </KeyboardWrapper>
        <Navbar />
      </View>
  )
}

export default UserProfile

const styles = StyleSheet.create({
  profileContainer: {
    flex: 1,
    paddingBottom: 90,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 10,
  },
})