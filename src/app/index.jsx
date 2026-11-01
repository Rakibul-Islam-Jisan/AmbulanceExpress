import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../config/firebase'; // পাথ প্রয়োজন অনুযায়ী অ্যাডজাস্ট করে নিও
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Feather from '@expo/vector-icons/Feather';

const IndexScreen = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        router.replace('/(main)/Home');
      } else {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#E83F45" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Hero / Visual Card Section */}
      <View style={styles.heroSection}>
        <View style={styles.iconBadge}>
          <MaterialCommunityIcons name="ambulance" size={64} color="#E83F45" />
        </View>

        <View style={styles.titleContainer}>
          <Text style={styles.appName}>
            Ambulance<Text style={styles.highlightText}>Express</Text>
          </Text>
          <Text style={styles.tagline}>
            Fast & Reliable Emergency Medical Transportation at Your Fingertips
          </Text>
        </View>

        {/* Feature Highlights */}
        <View style={styles.featuresContainer}>
          <View style={styles.featureItem}>
            <View style={styles.featureIconBox}>
              <Feather name="clock" size={16} color="#E83F45" />
            </View>
            <Text style={styles.featureText}>24/7 Rapid Response</Text>
          </View>

          <View style={styles.featureItem}>
            <View style={styles.featureIconBox}>
              <Feather name="shield" size={16} color="#E83F45" />
            </View>
            <Text style={styles.featureText}>Verified Drivers</Text>
          </View>
        </View>
      </View>

      {/* Action Buttons Section */}
      <View style={styles.actionSection}>
        <TouchableOpacity 
          style={styles.primaryButton}
          activeOpacity={0.85}
          onPress={() => router.push('/(auth)/RegistrationScreen')}
        >
          <Text style={styles.primaryButtonText}>Get Started</Text>
          <Feather name="arrow-right" size={18} color="#FFFFFF" style={styles.btnIcon} />
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.secondaryButton}
          activeOpacity={0.7}
          onPress={() => router.push('/(auth)/LoginScreen')}
        >
          <Text style={styles.secondaryButtonText}>I already have an account</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default IndexScreen;

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    backgroundColor: '#FAFAFA',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
    paddingHorizontal: 24,
    justifyContent: 'space-between',
    paddingTop: 80,
    paddingBottom: 40,
  },
  heroSection: {
    alignItems: 'center',
    width: '100%',
  },
  iconBadge: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#FFF5F5',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FFE0E0',
    shadowColor: '#E83F45',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 4,
    marginBottom: 32,
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  appName: {
    fontSize: 32,
    fontWeight: '800',
    color: '#111827',
    letterSpacing: -0.5,
    marginBottom: 10,
  },
  highlightText: {
    color: '#E83F45',
  },
  tagline: {
    fontSize: 15,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 22,
    paddingHorizontal: 10,
    fontWeight: '400',
  },
  featuresContainer: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 8,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 4,
    elevation: 1,
  },
  featureIconBox: {
    marginRight: 8,
  },
  featureText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#374151',
  },
  actionSection: {
    width: '100%',
    rowGap: 14,
  },
  primaryButton: {
    height: 56,
    backgroundColor: '#E83F45',
    borderRadius: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#E83F45',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  btnIcon: {
    marginLeft: 8,
  },
  secondaryButton: {
    height: 52,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  secondaryButtonText: {
    color: '#4B5563',
    fontSize: 15,
    fontWeight: '600',
  },
});