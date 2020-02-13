import React, { useState } from 'react'
import { View, Text, Button, TextInput, StyleSheet } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { useDispatch } from 'react-redux'

import Colors from '../constants/Colors'
import * as placesActions from '../store/places-actions'
import ImgPicker from '../components/ImagePicker'

const NewPlaceScreen = props => {
  // access to redux dispatch
  const dispatch = useDispatch()

  const [titleValue, setTitleValue] = useState('')

  const titleChangeHandler = text => {
    setTitleValue(text)
  }

  const savePlaceHandler = () => {
    dispatch(placesActions.addPlace(titleValue))
    props.navigation.goBack()
  }

  return (
    <ScrollView>
      <View style={styles.form}>
        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={titleChangeHandler}
          value={titleValue}
        />
        <ImgPicker />
        <Button
          title='Save Place'
          color={Colors.primary}
          onPress={savePlaceHandler}
        />
      </View>
    </ScrollView>
  )
}

export const navigationScreenOptions = navData => {
  return {
    headerTitle: 'Add Place'
  }
}

const styles = StyleSheet.create({
  form: {
    margin: 30
  },
  label: {
    fontSize: 18,
    marginBottom: 15
  },
  textInput: {
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    marginBottom: 15,
    paddingVertical: 4,
    paddingHorizontal: 2
  }
})

export default NewPlaceScreen
