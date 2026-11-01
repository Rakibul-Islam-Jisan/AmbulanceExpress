import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import AntDesign from '@expo/vector-icons/AntDesign'
import { useRouter } from 'expo-router'

const Card = () => {
    const router = useRouter()
  return (
    <View style={styles.cardContainer}>
      
      {/* Top Status & ETA Badge Section */}
      <View style={styles.topSection}>
        <View style={styles.statusRow}>
          <View style={styles.greenDot} />
          <Text style={styles.statusText}>ambulances available nearby</Text>
        </View>

        {/* 6 Min Away Badge */}
        <View style={styles.etaBadge}>
          <Text style={styles.etaNumber}>6</Text>
          <Text style={styles.etaText}>MIN{'\n'}AWAY</Text>
        </View>
      </View>

      {/* Main Heading */}
      <Text style={styles.mainTitle}>
        Emergency care,{'\n'}just one tap away.
      </Text>

      {/* Sub-details */}
      <Text style={styles.subText}>
        Verified paramedics • Live tracking • 24/7
      </Text>

      {/* Book Ambulance Button */}
      <TouchableOpacity onPress={()=>router.push('/(main)/AmbulanceBookingScreen')} style={styles.bookButton} activeOpacity={0.9}>
        <View style={styles.buttonLeft}>
          <View style={styles.ambulanceIconBox}>
            <MaterialCommunityIcons name="ambulance" size={22} color="#ffffff" />
          </View>
          <View>
            <Text style={styles.buttonTitle}>Book an ambulance</Text>
            <Text style={styles.buttonSubtitle}>Fast, safe & reliable</Text>
          </View>
        </View>
        <AntDesign name="arrow-right" size={20} color="#ffffff" style={styles.arrowIcon} />
      </TouchableOpacity>

    </View>
  )
}

export default Card

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#0B2527', // ডার্ক টিল ব্যাকগ্রাউন্ড কালার
    borderRadius: 20,
    padding: 20,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 8,
    marginTop:30
  },
  topSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
  },
  greenDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#00FFA6',
    marginRight: 6,
  },
  statusText: {
    color: '#A0B4B5',
    fontSize: 12,
    fontWeight: '500',
  },
  etaBadge: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
  },
  etaNumber: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
    lineHeight: 20,
  },
  etaText: {
    color: '#A0B4B5',
    fontSize: 7,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  mainTitle: {
    color: '#ffffff',
    fontSize: 26,
    fontWeight: '700',
    lineHeight: 32,
    marginBottom: 8,
  },
  subText: {
    color: '#A0B4B5',
    fontSize: 13,
    marginBottom: 20,
  },
  bookButton: {
    backgroundColor: '#E83F45', // প্রিমিয়াম রেড বাটন কালার
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  buttonLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ambulanceIconBox: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  buttonTitle: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonSubtitle: {
    color: '#FFD1D3',
    fontSize: 11,
    marginTop: 2,
  },
  arrowIcon: {
    marginRight: 4,
  },
})