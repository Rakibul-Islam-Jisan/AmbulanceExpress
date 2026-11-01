import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import Navbar from '../../components/Navbar'
import HomeHeader from '../../components/HomeHeader'
import KeyboardWrapper from '../../components/KeyboardWrapper'
import Card from '../../components/Card'
import ActionCard from '../../components/ActionCard'
import Feather from '@expo/vector-icons/Feather';
import Fontisto from '@expo/vector-icons/Fontisto';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router'
import { useTheme } from '../../context/ThemeContext' // পাথ তোমার প্রজেক্ট অনুযায়ী ঠিক করে নিও

const Home = () => {
    const router = useRouter()
    const { colors, isDarkMode, toggleTheme } = useTheme()

  return (
    <View style={[styles.homeContainer, { backgroundColor: colors.background }]}>
        <KeyboardWrapper justifyContent='flex-start'>
            {/* Top Header & Theme Toggle Button */}
            <View style={styles.topHeaderContainer}>
                <HomeHeader/>
                
                <TouchableOpacity 
                    style={[styles.toggleBtn, { backgroundColor: colors.cardBackground, borderColor: colors.border }]} 
                    onPress={toggleTheme}
                    activeOpacity={0.8}
                >
                    <Ionicons 
                        name={isDarkMode ? "moon" : "sunny"} 
                        size={20} 
                        color="#E83F45" 
                    />
                </TouchableOpacity>
            </View>

            <Card/>
            
            <Text style={[styles.quickAction, { color: colors.textPrimary }]}>
                Quick Actions
            </Text>
            
            <View style={styles.actionContainer}>
                <ActionCard 
                    icon={<Feather name="phone" size={24} color={isDarkMode ? "#E83F45" : "black"} />} 
                    title={'Emergency Call'} 
                    subtitle={'call 911 instantly'}
                />
                <ActionCard 
                    icon={<Fontisto name="compass" size={24} color={isDarkMode ? "#E83F45" : "black"} />} 
                    title={'Track Booking'} 
                    subtitle={'show all Bookings'}
                />
            </View>
            
            <View style={styles.actionContainer}>
                <ActionCard 
                    onPress={()=>router.push('/(main)/AllBookingScreen')} 
                    icon={<MaterialCommunityIcons name="ambulance" size={24} color="green" />} 
                    title={'Availabe Driver'} 
                    subtitle={'see all drivers'}
                />
                <ActionCard 
                    icon={<FontAwesome5 name="list-alt" size={24} color={isDarkMode ? "#E83F45" : "black"} />} 
                    title={'All Booking'} 
                    subtitle={'show all Bookings'}
                />
            </View>
        </KeyboardWrapper>
      <Navbar/>
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
    homeContainer:{
        flex:1,
        position:'relative'
    },
    topHeaderContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        marginTop: 10,
    },
    toggleBtn: {
        width: 42,
        height: 42,
        borderRadius: 21,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    actionContainer:{
        flexDirection:'row',
        justifyContent:'space-between'
    },
    quickAction:{
        fontWeight: '800',
        fontSize: 20,
        paddingTop: 29
    }
})