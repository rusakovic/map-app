import * as FileSystem from 'expo-file-system'

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
    } catch (error) {
      console.log(error)
      throw error
    }

    dispatch({ type: ADD_PLACE, placeData: { title: title, image: newPath } })
  }
}
