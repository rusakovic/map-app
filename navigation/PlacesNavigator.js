import React from 'react'
import { Platform } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import PlacesListScreen, {
  navigationScreenOptions as placesListScreenNavOptions
} from '../screens/PlacesListScreen'
import PlaceDetailScreen, {
  navigationScreenOptions as placeDetailScreenNavOptions
} from '../screens/PlaceDetailScreen'
import MapScreen from '../screens/MapScreen'
import NewPlaceScreen, {
  navigationScreenOptions as newPlacesScreenNavOptions
} from '../screens/NewPlaceScreen'
import Colors from '../constants/Colors'

const defaultNavigationOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === 'android' ? Colors.primary : ''
  },
  headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary
}

const PlacesStackNavigator = createStackNavigator()

export const PlacesNavigator = () => {
  return (
    <PlacesStackNavigator.Navigator screenOptions={defaultNavigationOptions}>
      <PlacesStackNavigator.Screen
        name='Places'
        component={PlacesListScreen}
        options={placesListScreenNavOptions}
      />
      <PlacesStackNavigator.Screen
        name='PlaceDetail'
        component={PlaceDetailScreen}
        options={placeDetailScreenNavOptions}
      />
      <PlacesStackNavigator.Screen
        name='NewPlace'
        component={NewPlaceScreen}
        options={newPlacesScreenNavOptions}
      />
      <PlacesStackNavigator.Screen name='Map' component={MapScreen} />
    </PlacesStackNavigator.Navigator>
  )
}

export const AppNavigator = () => {
  return (
    <NavigationContainer>
      <PlacesNavigator />
    </NavigationContainer>
  )
}
