import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { FontAwesome5, MaterialIcons, Ionicons } from '@expo/vector-icons';
import { auth, db } from '../../config/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { useTheme } from '../context/ThemeContext'; // পাথ তোমার প্রজেক্ট অনুযায়ী ঠিক করে নিও

const BookingCards = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const { colors, isDarkMode } = useTheme();

    useEffect(() => {
        const fetchBookingData = async () => {
            try {
                const currentUser = auth.currentUser;
                if (currentUser) {
                    const q = query(
                        collection(db, 'ambulance_bookings'), 
                        where('userId', '==', currentUser.uid)
                    );
                    
                    const querySnapshot = await getDocs(q);

                    if (!querySnapshot.empty) {
                        const bookingList = querySnapshot.docs.map(doc => ({
                            id: doc.id,
                            ...doc.data()
                        }));
                        setBookings(bookingList);
                    } else {
                        setBookings([]);
                    }
                }
            } catch (error) {
                console.log('Error fetching booking data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchBookingData();
    }, []);

    if (loading) {
        return (
            <View style={styles.centerContainer}>
                <ActivityIndicator size="small" color="#EF4444" />
            </View>
        );
    }

    if (bookings.length === 0) {
        return (
            <View style={styles.noBookingContainer}>
                <Text style={[styles.noBookingText, { color: colors.textSecondary }]}>No Active Bookings Found</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {bookings.map((item) => (
                <View 
                    key={item.id} 
                    style={[
                        styles.card, 
                        { 
                            backgroundColor: colors.cardBackground, 
                            borderColor: isDarkMode ? colors.border : '#FECACA' 
                        }
                    ]}
                >
                    {/* Card Header: Ambulance Type & Status */}
                    <View style={styles.cardHeader}>
                        <View style={styles.ambulanceTypeGroup}>
                            <FontAwesome5 name="ambulance" size={18} color="#EF4444" />
                            <Text style={[styles.ambulanceTypeText, { color: colors.textPrimary }]}>
                                {item.ambulanceType || 'Ambulance'}
                            </Text>
                        </View>
                        
                        <View style={[styles.statusBadge, { backgroundColor: isDarkMode ? 'rgba(239, 68, 68, 0.15)' : '#FEF2F2', borderColor: isDarkMode ? '#7F1D1D' : '#FCA5A5' }]}>
                            <Ionicons name="radio-button-on" size={12} color="#EF4444" />
                            <Text style={[styles.statusText, { color: '#EF4444' }]}>
                                {item.status ? item.status.toUpperCase() : 'PENDING'}
                            </Text>
                        </View>
                    </View>

                    <View style={[styles.divider, { backgroundColor: colors.border }]} />

                    {/* Card Body: Patient, Pickup & Destination */}
                    <View style={styles.detailsContainer}>
                        {/* Patient Name */}
                        <View style={styles.row}>
                            <MaterialIcons name="person" size={16} color={colors.textSecondary} />
                            <Text style={[styles.label, { color: colors.textSecondary }]}>Patient:</Text>
                            <Text style={[styles.value, { color: colors.textPrimary }]}>{item.patientName || 'N/A'}</Text>
                        </View>

                        {/* Pickup Location */}
                        <View style={styles.row}>
                            <MaterialIcons name="my-location" size={16} color="#EF4444" />
                            <Text style={[styles.label, { color: colors.textSecondary }]}>Pickup:</Text>
                            <Text style={[styles.value, { color: colors.textPrimary }]} numberOfLines={1}>{item.pickupLocation || 'N/A'}</Text>
                        </View>

                        {/* Destination */}
                        <View style={styles.row}>
                            <MaterialIcons name="assistant-navigation" size={16} color="#10B981" />
                            <Text style={[styles.label, { color: colors.textSecondary }]}>Destination:</Text>
                            <Text style={[styles.value, { color: colors.textPrimary }]} numberOfLines={1}>{item.destination || 'N/A'}</Text>
                        </View>
                    </View>

                    <View style={[styles.divider, { backgroundColor: colors.border }]} />
                </View>
            ))}
        </View>
    );
};

export default BookingCards;

const styles = StyleSheet.create({
    container: {
        width: '100%',
        paddingBottom: 20,
    },
    centerContainer: {
        padding: 20,
        alignItems: 'center',
    },
    noBookingContainer: {
        padding: 20,
        alignItems: 'center',
    },
    noBookingText: {
        fontSize: 14,
        fontWeight: '600',
    },
    card: {
        borderRadius: 16,
        padding: 14,
        borderWidth: 1,
        marginHorizontal: 16,
        marginVertical: 8,
        shadowColor: '#EF4444',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.08,
        shadowRadius: 10,
        elevation: 3,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    ambulanceTypeGroup: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    ambulanceTypeText: {
        fontSize: 16,
        fontWeight: '700',
    },
    statusBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 8,
        borderWidth: 1,
    },
    statusText: {
        fontSize: 11,
        fontWeight: '700',
        textTransform: 'uppercase',
    },
    divider: {
        height: 1,
        marginVertical: 10,
    },
    detailsContainer: {
        gap: 6,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    label: {
        fontSize: 13,
        width: 85,
        fontWeight: '500',
    },
    value: {
        fontSize: 13,
        fontWeight: '600',
        flex: 1,
    },
});