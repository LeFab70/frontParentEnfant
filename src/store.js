import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import memberSlice from "./stores/members";
import parentsSlice from "./stores/parents";
import childSlice from "./stores/child";
import user from "./stores/user";
import checkParent from "./stores/checkParent";
import listParents from "./stores/listParents";
import autoMergeLevel2 from "redux-persist/es/stateReconciler/autoMergeLevel2";
const persistConfig = {
  key: "root",
  version: 1,
  storage,
  autoMergeLevel2,
};
const reducer = combineReducers({
  parent: parentsSlice,
  enfant: childSlice,
  member: memberSlice,
  user: user,
  checkParent: checkParent,
  listParents: listParents,
});
// const rootReducer = (state, action) => {
//   if (action.type === "hydrate") {
//     return reducer(action.payload, action);
//   }
//   return reducer(state, action);
// };

const persistedReducer = persistReducer(persistConfig, reducer);
export const store = configureStore({
  reducer: { cardMember: persistedReducer }, // reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  devTools: true,
});
export const persistor = persistStore(store);
