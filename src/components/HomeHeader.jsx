import { StyleSheet, Text, View } from 'react-native'
import { useEffect, useState } from 'react'
import { auth, db } from '../../config/firebase'
import { doc, getDoc } from 'firebase/firestore'
import { useTheme } from '../context/ThemeContext' // পাথ ঠিক করে নিও

const HomeHeader = () => {
  const [userName, setUserName] = useState('')
  const { colors } = useTheme()

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const currentUser = auth.currentUser
        if (currentUser) {
          const userDoc = doc(db, 'users', currentUser.uid)
          const userDocGet = await getDoc(userDoc)

          if (userDocGet.exists()) {
            setUserName(userDocGet.data().fullName)
          } else {
            setUserName('User')
          }
        }
      } catch (error) {
        console.log('error fetching user data', error)
      }
    }

    fetchUserData()
  }, [])
  
  return (
    <View>
      <Text style={[styles.subheader, { color: colors.textSecondary }]}>Good Morning</Text>
      <Text style={[styles.mainheader, { color: colors.textPrimary }]}>{userName}</Text>
    </View>
  )
}

export default HomeHeader

const styles = StyleSheet.create({
    subheader: {
        fontSize: 14,
    },
    mainheader: {
        fontWeight: '800',
        fontSize: 19
    }
})