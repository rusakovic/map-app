import * as FileSystem from 'expo-file-system'

import { insertPlaceToDatabase, fetchPlaces } from '../helpers/db'
import ENV from '../env'

export const ADD_PLACE = 'ADD_PLACE'
export const SET_PLACES = 'SET_PLACES'

export const addPlace = (title, image, location) => {
  return async dispatch => {
    // reverse geocoding by google. lat,lng to address
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.lat},${location.lng}&location_type=ROOFTOP&result_type=street_address&key=${ENV.googleApiKey}`
    )

    if (!response.ok) {
      throw new Error('Something went wrong with response')
    }

    const responseData = await response.json()
    console.log('responseData', responseData)
    if (responseData.status !== 'OK') {
      throw new Error('Something went wrong with responseData')
    }
    // getting adress from google map api
    const address = responseData.results[0].formatted_address
    console.log('address', address)

    // take the link to image and leave only file name
    const fileName = image.split('/').pop()
    const newPath = FileSystem.documentDirectory + fileName

    //move image from temporary folder to our folder
    try {
      FileSystem.moveAsync({
        from: image,
        to: newPath
      })
      const databaseResult = await insertPlaceToDatabase(
        title,
        newPath,
        address,
        location.lat,
        location.lng
      )

      dispatch({
        type: ADD_PLACE,
        placeData: {
          id: databaseResult.insertId,
          title: title,
          image: newPath,
          address: address,
          coords: {
            lat: location.lat,
            lng: location.lng
          }
        }
      })
    } catch (error) {
      console.log(error)
      throw error
    }
  }
}

export const loadPlaces = () => {
  return async dispatch => {
    try {
      const dbResult = await fetchPlaces()
      dispatch({ type: SET_PLACES, places: dbResult.rows._array })
    } catch (error) {
      throw error
    }
  }
}
