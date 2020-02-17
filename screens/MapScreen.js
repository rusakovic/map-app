import React, { useState, useCallback, useEffect } from 'react'
import { TouchableOpacity, Text, StyleSheet, Platform } from 'react-native'
import MapView, { Marker } from 'react-native-maps'

import Colors from '../constants/Colors'

const MapScreen = props => {
  console.log(props)
  const initialLocation = props.route.params?.initialLocation ?? null
  const readOnly = props.route.params?.readOnly ?? null
  const [selectedLocation, setSelectedLocation] = useState(initialLocation)

  const mapRegion = {
    latitude: initialLocation ? initialLocation.lat : 37.78,
    longitude: initialLocation ? initialLocation.lng : -122.43,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421
  }

  const selectLocationHandler = event => {
    // don't pick any location if we just want to see the map with marker
    if (readOnly) {
      return
    }

    setSelectedLocation({
      lat: event.nativeEvent.coordinate.latitude,
      lng: event.nativeEvent.coordinate.longitude
    })
  }

  // using useCallback for avoiding infinitive loop
  const savePickedLocationHandler = useCallback(() => {
    if (!selectedLocation) {
      return
    }
    props.navigation.navigate({
      name: 'NewPlace',
      params: { pickedLocation: selectedLocation }
    })
  }, [selectedLocation])

  useEffect(() => {
    // not show save button  in readOnly mode
    if (!readOnly) {
      props.navigation.setOptions({
        headerRight: () => (
          <TouchableOpacity
            style={styles.headerButton}
            onPress={savePickedLocationHandler}
          >
            <Text style={styles.headerButtonText}>Save</Text>
          </TouchableOpacity>
        )
      })
    }
  }, [savePickedLocationHandler])

  let markerCoordinates

  if (selectedLocation) {
    markerCoordinates = {
      latitude: selectedLocation.lat,
      longitude: selectedLocation.lng
    }
  }

  return (
    <MapView
      style={styles.map}
      region={mapRegion}
      onPress={selectLocationHandler}
    >
      {markerCoordinates && (
        <Marker title='Picked location' coordinate={markerCoordinates}></Marker>
      )}
    </MapView>
  )
}

const styles = StyleSheet.create({
  map: {
    flex: 1
  },
  headerButton: {
    marginHorizontal: 20
  },
  headerButtonText: {
    fontSize: 16,
    color: Platform.OS === 'android' ? 'white' : Colors.primary
  }
})

export default MapScreen
