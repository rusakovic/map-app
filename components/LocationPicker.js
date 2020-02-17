import React, { useState, useEffect } from 'react'
import {
  View,
  Button,
  Text,
  ActivityIndicator,
  Alert,
  StyleSheet
} from 'react-native'
import * as Location from 'expo-location'
import * as Permissions from 'expo-permissions'

import MapPreview from './MapPreview'
import Colors from '../constants/Colors'

const LocationPicker = props => {
  const [isFetching, setisFetching] = useState(false)
  const [pickedLocation, setpickedLocation] = useState()

  // optional chaining approach https://reactnavigation.org/docs/en/upgrading-from-4.x.html#no-more-getparam
  const mapPickedLocation = props.route.params?.pickedLocation ?? null

  const { onLocationPicked } = props

  // we check if we already picked marker on map or not
  useEffect(() => {
    if (mapPickedLocation) {
      setpickedLocation(mapPickedLocation)
      onLocationPicked(mapPickedLocation)
    }
  }, [mapPickedLocation, onLocationPicked])

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
      setpickedLocation({
        lat: location.coords.latitude,
        lng: location.coords.longitude
      })
      props.onLocationPicked({
        lat: location.coords.latitude,
        lng: location.coords.longitude
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

  const pickOnMapHandler = () => {
    props.navigation.navigate('Map')
  }

  return (
    <View style={styles.locationPicker}>
      <MapPreview
        style={styles.mapPreview}
        location={pickedLocation}
        onPress={pickOnMapHandler}
      >
        {isFetching ? (
          <ActivityIndicator size='large' color={Colors.primary} />
        ) : (
          <Text>No lacation chosen yet</Text>
        )}
      </MapPreview>
      <View style={styles.actions}>
        <Button
          title='Get user location'
          color={Colors.primary}
          onPress={getLocationHandler}
        />
        <Button
          title='Pick on map'
          color={Colors.primary}
          onPress={pickOnMapHandler}
        />
      </View>
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
    borderWidth: 1
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%'
  }
})

export default LocationPicker
