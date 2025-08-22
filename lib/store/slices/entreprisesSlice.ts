import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { userEntreprisesService, UserEntreprise } from '@/lib/services/api/user-entreprises.service';

// Types
export interface EntreprisesState {
  entreprises: UserEntreprise[];
  selectedEntreprise: UserEntreprise | null;
  loading: boolean;
  error: string | null;
  initialized: boolean;
}

// État initial
const initialState: EntreprisesState = {
  entreprises: [],
  selectedEntreprise: null,
  loading: false,
  error: null,
  initialized: false,
};

// Thunks asynchrones
export const fetchUserEntreprises = createAsyncThunk(
  'entreprises/fetchUserEntreprises',
  async (_, { rejectWithValue }) => {
    try {
      console.log('Redux: Fetching user entreprises...');
      const result = await userEntreprisesService.getUserEntreprises();
      
      if (result.success && result.data) {
        return result.data;
      }
      
      // Si pas de données API, essayer les données mock
      const mockData = userEntreprisesService.getMockEntreprises();
      if (mockData.length > 0) {
        return mockData;
      }
      
      return [];
    } catch (error) {
      return rejectWithValue('Erreur lors de la récupération des entreprises');
    }
  }
);

export const addEntreprise = createAsyncThunk(
  'entreprises/addEntreprise',
  async (entrepriseData: Partial<UserEntreprise>, { rejectWithValue }) => {
    try {
      const result = await userEntreprisesService.addEntreprise(entrepriseData);
      
      if (result.success && result.data) {
        return result.data;
      }
      
      return rejectWithValue('Erreur lors de l\'ajout de l\'entreprise');
    } catch (error) {
      return rejectWithValue('Erreur lors de l\'ajout de l\'entreprise');
    }
  }
);

export const setPrimaryEntreprise = createAsyncThunk(
  'entreprises/setPrimaryEntreprise',
  async (entrepriseId: string, { rejectWithValue }) => {
    try {
      const result = await userEntreprisesService.setPrimaryEntreprise(entrepriseId);
      
      if (result.success && result.data) {
        return result.data;
      }
      
      return rejectWithValue('Erreur lors de la définition de l\'entreprise principale');
    } catch (error) {
      return rejectWithValue('Erreur lors de la définition de l\'entreprise principale');
    }
  }
);

export const removeEntreprise = createAsyncThunk(
  'entreprises/removeEntreprise',
  async (entrepriseId: string, { rejectWithValue }) => {
    try {
      const result = await userEntreprisesService.removeEntreprise(entrepriseId);
      
      if (result.success) {
        return entrepriseId;
      }
      
      return rejectWithValue('Erreur lors de la suppression de l\'entreprise');
    } catch (error) {
      return rejectWithValue('Erreur lors de la suppression de l\'entreprise');
    }
  }
);

// Slice
const entreprisesSlice = createSlice({
  name: 'entreprises',
  initialState,
  reducers: {
    selectEntreprise: (state, action: PayloadAction<UserEntreprise>) => {
      state.selectedEntreprise = action.payload;
      // Sauvegarder dans le localStorage pour persistance
      if (typeof window !== 'undefined') {
        localStorage.setItem('selected_entreprise_id', action.payload.id);
      }
    },
    clearEntreprises: (state) => {
      state.entreprises = [];
      state.selectedEntreprise = null;
      state.error = null;
      state.initialized = false;
      if (typeof window !== 'undefined') {
        localStorage.removeItem('selected_entreprise_id');
      }
    },
    setEntreprises: (state, action: PayloadAction<UserEntreprise[]>) => {
      state.entreprises = action.payload;
      state.initialized = true;
      
      // Sélectionner automatiquement une entreprise si aucune n'est sélectionnée
      if (action.payload.length > 0 && !state.selectedEntreprise) {
        // Chercher l'entreprise principale ou prendre la première
        const primaryEntreprise = action.payload.find(e => e.is_primary) || action.payload[0];
        state.selectedEntreprise = primaryEntreprise;
        
        if (typeof window !== 'undefined') {
          localStorage.setItem('selected_entreprise_id', primaryEntreprise.id);
        }
      }
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Fetch entreprises
    builder
      .addCase(fetchUserEntreprises.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserEntreprises.fulfilled, (state, action) => {
        state.loading = false;
        state.entreprises = action.payload;
        state.initialized = true;
        
        // Sélectionner automatiquement une entreprise
        if (action.payload.length > 0 && !state.selectedEntreprise) {
          // Restaurer la sélection précédente ou prendre l'entreprise principale
          const savedId = typeof window !== 'undefined' ? localStorage.getItem('selected_entreprise_id') : null;
          const savedEntreprise = savedId ? action.payload.find(e => e.id === savedId) : null;
          const primaryEntreprise = action.payload.find(e => e.is_primary);
          
          state.selectedEntreprise = savedEntreprise || primaryEntreprise || action.payload[0];
          
          if (typeof window !== 'undefined' && state.selectedEntreprise) {
            localStorage.setItem('selected_entreprise_id', state.selectedEntreprise.id);
          }
        }
      })
      .addCase(fetchUserEntreprises.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.initialized = true;
      });
    
    // Add entreprise
    builder
      .addCase(addEntreprise.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addEntreprise.fulfilled, (state, action) => {
        state.loading = false;
        state.entreprises.push(action.payload);
        
        // Si c'est la première entreprise, la sélectionner
        if (state.entreprises.length === 1) {
          state.selectedEntreprise = action.payload;
          if (typeof window !== 'undefined') {
            localStorage.setItem('selected_entreprise_id', action.payload.id);
          }
        }
      })
      .addCase(addEntreprise.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
    
    // Set primary entreprise
    builder
      .addCase(setPrimaryEntreprise.fulfilled, (state, action) => {
        // Mettre à jour les flags is_primary
        state.entreprises = state.entreprises.map(e => ({
          ...e,
          is_primary: e.id === action.payload.id,
        }));
        
        // Sélectionner l'entreprise principale
        const primaryEntreprise = state.entreprises.find(e => e.id === action.payload.id);
        if (primaryEntreprise) {
          state.selectedEntreprise = primaryEntreprise;
          if (typeof window !== 'undefined') {
            localStorage.setItem('selected_entreprise_id', primaryEntreprise.id);
          }
        }
      });
    
    // Remove entreprise
    builder
      .addCase(removeEntreprise.fulfilled, (state, action) => {
        state.entreprises = state.entreprises.filter(e => e.id !== action.payload);
        
        // Si l'entreprise supprimée était sélectionnée, sélectionner une autre
        if (state.selectedEntreprise?.id === action.payload) {
          state.selectedEntreprise = state.entreprises[0] || null;
          if (typeof window !== 'undefined') {
            if (state.selectedEntreprise) {
              localStorage.setItem('selected_entreprise_id', state.selectedEntreprise.id);
            } else {
              localStorage.removeItem('selected_entreprise_id');
            }
          }
        }
      });
  },
});

// Actions
export const { selectEntreprise, clearEntreprises, setEntreprises, setError } = entreprisesSlice.actions;

// Selectors
export const selectAllEntreprises = (state: { entreprises: EntreprisesState }) => state.entreprises.entreprises;
export const selectSelectedEntreprise = (state: { entreprises: EntreprisesState }) => state.entreprises.selectedEntreprise;
export const selectEntreprisesLoading = (state: { entreprises: EntreprisesState }) => state.entreprises.loading;
export const selectEntreprisesError = (state: { entreprises: EntreprisesState }) => state.entreprises.error;
export const selectEntreprisesInitialized = (state: { entreprises: EntreprisesState }) => state.entreprises.initialized;

// Reducer
export default entreprisesSlice.reducer;