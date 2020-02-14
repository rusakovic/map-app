import * as SQLite from 'expo-sqlite'

const db = SQLite.openDatabase('places.db')

// Initiliazing the database
export const initDb = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS places (id INTEGER PRIMARY KEY NOT NULL, title TEXT NOT NULL, imageUri TEXT NOT NULL, address TEXT NOT NULL, lat REAL NOT NULL, lng REAL NOT NULL);',
        [],
        () => {
          resolve()
        },
        (_, err) => {
          reject()
        }
      )
    })
  })
  return promise
}

// Inserting data to database
// ?, ?, ? used for secure replacing of our values, we placed them into array
export const insertPlaceToDatabase = (title, imageUri, address, lat, lng) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'INSERT INTO places (title, imageUri, address, lat, lng) VALUES (?, ?, ?, ?, ?)',
        [title, imageUri, address, lat, lng],
        (_, result) => {
          resolve(result)
        },
        (_, err) => {
          reject()
        }
      )
    })
  })
  return promise
}

// fetching data from SQLite database
export const fetchPlaces = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM places',
        [],
        (_, result) => {
          resolve(result)
        },
        (_, err) => {
          reject()
        }
      )
    })
  })
  return promise
}
