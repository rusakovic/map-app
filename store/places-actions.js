import * as FileSystem from 'expo-file-system'

import { insertPlaceToDatabase } from '../helpers/db'

export const ADD_PLACE = 'ADD_PLACE'

export const addPlace = (title, image) => {
  return async dispatch => {
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
        'Dummy address',
        15.6,
        12.3
      )

      console.log(databaseResult)
      dispatch({
        type: ADD_PLACE,
        placeData: { id: databaseResult.insertId, title: title, image: newPath }
      })
    } catch (error) {
      console.log(error)
      throw error
    }
  }
}
