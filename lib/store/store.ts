import { configureStore } from '@reduxjs/toolkit';
import entreprisesReducer from './slices/entreprisesSlice';

export const store = configureStore({
  reducer: {
    entreprises: entreprisesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignorer ces paths pour les checks de sérialisation
        ignoredActions: ['entreprises/fetchUserEntreprises/fulfilled'],
        ignoredPaths: ['entreprises.selectedEntreprise', 'entreprises.entreprises'],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;