import { Alert, StyleSheet, TouchableOpacity, View } from 'react-native'
import React from 'react'
import AntDesign from '@expo/vector-icons/AntDesign';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Feather from '@expo/vector-icons/Feather';
import { useRouter } from 'expo-router';
import { auth } from '../../config/firebase'
import { signOut } from 'firebase/auth';
import { useTheme } from '../context/ThemeContext'; // পাথ ঠিক করে নিও

const Navbar = () => {
    const router = useRouter();
    const insets = useSafeAreaInsets();
    const { colors, isDarkMode } = useTheme();

    const handleLogout = async ()=>{
      try {
        await signOut(auth)
        router.replace('/(auth)/LoginScreen')
      } catch (error) {
        Alert.alert('logout Failed')
        console.log('failed logout',error);
      }
    }

  return (
    <View style={[
        styles.navContainer, 
        { 
          bottom: insets.bottom > 0 ? insets.bottom : 10,
          backgroundColor: colors.cardBackground,
          borderTopColor: colors.border,
          shadowColor: isDarkMode ? '#000000' : '#000',
        }
    ]}>
      <TouchableOpacity onPress={()=>router.push('/(main)/UserProfile')} style={styles.navBtn}>
        <AntDesign name="user" size={24} color={colors.textPrimary} />
      </TouchableOpacity>

      <TouchableOpacity onPress={()=>router.push('/(main)/AmbulanceBookingScreen')} style={styles.navBtn}>
        <MaterialCommunityIcons name="ambulance" size={24} color={colors.textPrimary} />
      </TouchableOpacity>

       <TouchableOpacity onPress={()=>router.push('/(main)/Home')} style={styles.navBtn}>
        <AntDesign name="home" size={24} color={colors.textPrimary} />
      </TouchableOpacity>

      <TouchableOpacity onPress={()=>router.push('/(main)/AllBookingScreen')} style={styles.navBtn}>
        <Feather name="bar-chart-2" size={24} color={colors.textPrimary} />
      </TouchableOpacity>

      <TouchableOpacity onPress={handleLogout} style={styles.navBtn}>
        <AntDesign name="logout" size={24} color="#EF4444" />
      </TouchableOpacity>
    </View>
  )
}

export default Navbar

const styles = StyleSheet.create({
    navContainer:{
        position:'absolute',
        left:0,
        right:0,
        bottom:20,
        height:70,
        zIndex:1000,
        flexDirection:'row',
        width:'100%',
        justifyContent:'space-between',
        elevation:100,
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        borderTopWidth: 1,
    },
    navBtn:{
        width:'20%',
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    }
})