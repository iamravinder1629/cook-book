import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Fetch all posts
export const fetchAllPosts = createAsyncThunk(
    "posts/fetchAllPosts",
    async (_, { rejectWithValue }) => {
        try {
            console.log("slice all posts");
            const response = await axios.get("http://localhost:8080/api/posts", { withCredentials: true });

            if (!response.data || response.data.length === 0) {
                console.warn("No posts found");
                return [];
            }
            console.log(response)
            return response.data;
        } catch (error) {
            console.error("Error fetching all posts:", error.response?.data || error.message);
            return rejectWithValue(error.response?.data || "Failed to fetch all posts");
        }
    }
);

// Fetch search results
export const fetchSearchResults = createAsyncThunk(
    "posts/fetchSearchResults",
    async (query, { rejectWithValue }) => {
        try {
            console.log("slice search api");
            const response = await axios.get(`http://localhost:8080/api/posts/search/?search=${query}`, { withCredentials: true });

            if (!response.data || response.data.length === 0) {
                console.warn("No posts found");
                return [];
            }
            console.log(response)

            return response.data;
        } catch (error) {
            console.error("Error fetching search results:", error.response?.data || error.message);
            return rejectWithValue(error.response?.data || "Failed to fetch search results");
        }
    }
);


const initialState = {
    posts: [],
    status: "idle",
    error: null,
};

// Redux slice
const postsSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllPosts.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchAllPosts.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.posts = action.payload;
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
                state.posts = action.payload;
            })
            .addCase(fetchSearchResults.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            });
    },
});

// Export reducer
export default postsSlice.reducer;
