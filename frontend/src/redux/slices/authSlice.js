import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAllPosts = createAsyncThunk(
    "auth/fetchAllPosts",
    async (_, { rejectWithValue }) => {
        try {
            console.log("Fetching all posts...");
            const response = await axios.get("http://localhost:8080/api/posts");

            if (!response.data || response.data.length === 0) {
                console.warn("No posts found");
                return [];
            }

            return response.data;

        } catch (error) {
            console.error("Error fetching all posts:", error.response?.data || error.message);
            return rejectWithValue(error.response?.data || "Failed to fetch all posts");
        }
    }
);

// Fetch search results
export const fetchSearchResults = createAsyncThunk(
    "auth/fetchSearchResults",
    async (query, { rejectWithValue }) => {
        try {
            let url = query.trim()
                ? `http://localhost:8080/api/posts/search/?search=${query}`
                : "http://localhost:8080/api/posts"; 

            console.log("Fetching data from:", url);
            const response = await axios.get(url);

            if (!response.data || response.data.length === 0) {
                console.warn("No search results found");
                return [];
            }

            return response.data;

        } catch (error) {
            console.error("API fetch error:", error.response?.data || error.message);
            return rejectWithValue(error.response?.data || "Failed to fetch search results");
        }
    }
);

const initialState = {
    userId: null,
    searchResults: [],
    searchQuery: "",
    status: "idle",
    error: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {
            state.userId = action.payload;
        },
        logout: (state) => {
            state.userId = null;
        },
        setSearchQuery: (state, action) => {
            state.searchQuery = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllPosts.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchAllPosts.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.searchResults = action.payload;
            })
            .addCase(fetchAllPosts.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            })
            .addCase(fetchSearchResults.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchSearchResults.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.searchResults = action.payload;
            })
            .addCase(fetchSearchResults.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            });
    },
});

export const { login, logout, setSearchQuery } = authSlice.actions;
export default authSlice.reducer;

