import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

const PlacesDetailScreen = props => {
  return (
    <View>
      <Text>PlacesListScreen</Text>
    </View>
  )
}

export const navigationScreenOptions = navData => {
  return {
    headerTitle: navData.route.params.placeTitle
  }
}

const styles = StyleSheet.create({})

export default PlacesDetailScreen
