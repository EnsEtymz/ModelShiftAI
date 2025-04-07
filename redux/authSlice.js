import { useAuthStore } from "@/app/authStore";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// API URL
const API_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "https://devtools-api.beratcarsi.com";


// Login İşlemi
export const login = createAsyncThunk(
  "auth/token",
  async ({ username, password, remember_me }, thunkAPI) => {
    try {
      const requestBody = JSON.stringify({ username, password, remember_me });
      const response = await fetch(`${API_URL}/auth/token`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: requestBody,
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Giriş başarısız! Hata: ${errorText}`);
      }

      const data = await response.json();
      if (data.data.token) {
        const { setToken } = useAuthStore.getState(); // Zustand Store'a eriş
        setToken(data.data.token); 
      } else {
        console.error("Token bulunamadı.");
      }
      

      return data;
    } catch (error) {
      console.error("Login Hatası:", error);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Kullanıcı Bilgisini Al
export const getUser = createAsyncThunk("auth/getUser", async (_, thunkAPI) => {
  const token = useAuthStore.getState().token; // Zustand Store'dan token al
  if (!token || token == undefined || token == null) return null;

  try {
    const response = await fetch(`${API_URL}/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok) throw new Error("Kullanıcı doğrulanamadı!");

    return await response.json();
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

// Register İşlemi
export const register = createAsyncThunk(
  "auth/register",
  async ({ first_name, last_name, email, password }, thunkAPI) => {
    try {
      const response = await fetch(`${API_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ first_name, last_name, email, password }),
      });

      if (!response.ok) throw new Error("Kayıt başarısız!");

      const data = await response.json();
      //localStorage.setItem("token", data.accessToken); // Token'ı sakla

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const changePassword = createAsyncThunk("auth/changePassword", async ({ current_password, new_password }, thunkAPI) => {
  const token = useAuthStore.getState().token;
  try {
    const response = await fetch(`${API_URL}/account/change-password`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ current_password, new_password }),
    });


    return await response.json();
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const updateUser = createAsyncThunk("auth/updateUser", async ({ first_name, last_name, email }, thunkAPI) => {
  const token = useAuthStore.getState().token;
  try {
    const response = await fetch(`${API_URL}/account`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ first_name, last_name, email }),
    });

    if (!response.ok) throw new Error("Kullanıcı güncellenemedi!");
    return await response.json();
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const deleteUser = createAsyncThunk("auth/deleteUser", async (_, thunkAPI) => {
  const token = useAuthStore.getState().token;
  try {
    const response = await fetch(`${API_URL}/account`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) throw new Error("Hesap silinemedi!");

    return await response.json();
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

// Çıkış Yapma
export const logout = createAsyncThunk("auth/logout", async () => {
  const { clearToken } = useAuthStore.getState(); // Zustand Store'dan token al
  clearToken(); // Token'ı sil
  window.location.href = "/"; // Anasayfaya yönlendir
  return null;
});

// Auth Slice
const authSlice = createSlice({
  name: "auth",
  initialState: { user: null, loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
      })
      .addCase(changePassword.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.user = action.payload;
      });
  },
});

export default authSlice.reducer;
