import React from 'react'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import ReduxThunk from 'redux-thunk'

import { AppNavigator } from './navigation/PlacesNavigator'
import placesReducer from './store/places-reducer'
import { initDb } from './helpers/db'

// initiliazing the SQlite database
initDb()
  .then(() => {
    console.log('initilized database')
  })
  .catch(error => {
    console.log('Initilialing database is failed')
    console.log(error)
  })

const rootReducer = combineReducers({
  places: placesReducer
})

const store = createStore(rootReducer, applyMiddleware(ReduxThunk))

export default function App() {
  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  )
}
