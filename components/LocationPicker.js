import React, { useState } from 'react'
import {
  View,
  Button,
  Text,
  ActivityIndicator,
  Alert,
  StyleSheet
} from 'react-native'
import Colors from '../constants/Colors'
import * as Location from 'expo-location'
import * as Permissions from 'expo-permissions'

const LocationPicker = props => {
  const [isFetching, setisFetching] = useState(false)
  const [pickedLocation, setpickedLocation] = useState()

  const verifyPermissions = async () => {
    const result = await Permissions.askAsync(Permissions.LOCATION)
    if (result.status !== 'granted') {
      Alert.alert(
        'Insufficient permission!',
        'You need to grant location permissions to use this app',
        [{ text: 'Okay' }]
      )
      return false
    }
    return true
  }

  const getLocationHandler = async () => {
    const hasLocationPermission = await verifyPermissions()
    if (!hasLocationPermission) {
      return
    }
    try {
      setisFetching(true)
      const location = await Location.getCurrentPositionAsync({ timeout: 5000 })
      console.log(location)
      setpickedLocation({
        lat: locatition.coords.latitude,
        lng: locatition.coords.longitude
      })
    } catch (error) {
      Alert.alert(
        'Could not fetch location!',
        'Please try again later or pick a location on the map',
        [{ text: 'Okay' }]
      )
    }
    setisFetching(false)
  }

  return (
    <View style={styles.locationPicker}>
      <View style={styles.mapPreview}>
        {isFetching ? (
          <ActivityIndicator size='large' color={Colors.primary} />
        ) : (
          <Text>No lacation chosen yet</Text>
        )}
      </View>
      <Button
        title='Get user location'
        color={Colors.primary}
        onPress={getLocationHandler}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  locationPicker: {
    marginBottom: 15
  },
  mapPreview: {
    marginBottom: 10,
    width: '100%',
    height: 150,
    borderColor: '#ccc',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default LocationPicker
