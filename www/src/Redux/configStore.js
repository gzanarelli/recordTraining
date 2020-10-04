import { createStore } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import reducer from './Reducers'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
  key: 'record_redux',
  storage
}

const persistedReducer = persistReducer(persistConfig, reducer)

export default () => {
  const store = createStore(
    persistedReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )

  const persistor = persistStore(store)
  return { store, persistor }
}
