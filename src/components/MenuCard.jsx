import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'

const MenuCard = ({ items = [], backgroundColor = '#ffffff' }) => {
  return (
    <View style={[styles.cardContainer, { backgroundColor }]}>
      {items.map((item, index) => (
        <TouchableOpacity 
          key={index} 
          style={[styles.rowItem, index === items.length - 1 && styles.lastRow]}
          onPress={item.onPress}
          activeOpacity={0.7}
        >
          {/* Left: Icon & Text */}
          <View style={styles.leftSection}>
            <View style={[styles.iconBox, { backgroundColor: item.iconBg || '#FFF0F1' }]}>
              {item.icon}
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.subtitle}>{item.subtitle}</Text>
            </View>
          </View>

          {/* Right: Arrow Icon */}
          <MaterialIcons name="chevron-right" size={22} color="#888888" />
        </TouchableOpacity>
      ))}
    </View>
  )
}

export default MenuCard

const styles = StyleSheet.create({
  cardContainer: {
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 6,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
    marginBottom: 16,
  },
  rowItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#F2F2F2',
  },
  lastRow: {
    borderBottomWidth: 0, // শেষের আইটেমে কোনো বর্ডার থাকবে না
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconBox: {
    width: 46,
    height: 46,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 2,
  },
  subtitle: {
    fontSize: 12,
    color: '#777777',
  },
})