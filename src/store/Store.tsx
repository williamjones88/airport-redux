import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import googleMapReducer from '../components/googleMap/googleMapSlice';
// import notificationsReducer from "../features/notifications/notificationsSlice"

// export const store = configureStore({
//     reducer: {
//         // notifications: notificationsReducer,
//     },
// });

export const store = configureStore({
    reducer: {
        // searchBar: searchReducer,
        googleMap: googleMapReducer,
    }
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>; 
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
