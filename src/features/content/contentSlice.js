import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
//  http://localhost:3006/content (JSON SERVER CALL)

const initialState = {
  allContentData: [],
  moviesData: [],
  tvSeriesData: [],
  bookmarkedContent: [],
  trendingContent: [],
  searchQueryAndLocation: {},
  searchQuery: "",
  isLoading: false,
};

export const getContent = createAsyncThunk("content/getContent", async () => {
  try {
    const res = await axios.get("http://localhost:3006/content");
    return res.data;
  } catch (error) {
    console.error(error);
    return error;
  }
});

const contentSlice = createSlice({
  name: "content",
  initialState,
  reducers: {
    bookmarkContent: (state, { payload }) => {
      const markedItem = state.allContentData.find(
        (item) => item.id === payload
      );
      markedItem.isBookmarked = !markedItem.isBookmarked;
      if (markedItem.isBookmarked) {
        state.bookmarkedContent = [...state.bookmarkedContent, markedItem];
      }
      if (!markedItem.isBookmarked) {
        const newBookmarks = state.bookmarkedContent.filter(
          (marked) => marked.id !== payload
        );
        state.bookmarkedContent = newBookmarks;
      }
    },
    updateTrending: (state, { payload }) => {
      const markedItem = state.trendingContent.find(
        (item) => item.id === payload
      );
      if (markedItem) {
        markedItem.isBookmarked = !markedItem.isBookmarked;
      }
      // state.trendingContent = [state.trendingContent, markedItem]
    },
    updateTvSeries: (state, { payload }) => {
      const markedItem = state.tvSeriesData.find((item) => item.id === payload);
      if (markedItem) {
        markedItem.isBookmarked = !markedItem.isBookmarked;
      }
    },
    updateMovies: (state, { payload }) => {
      const markedItem = state.moviesData.find((item) => item.id === payload);
      if (markedItem) {
        markedItem.isBookmarked = !markedItem.isBookmarked;
      }
    },
    renderCurrentBookmarks: (state, { payload }) => {
      const markedItems = state.allContentData.filter(
        (item) => item.isBookmarked
      );
      state.bookmarkedContent = markedItems;
    },
    searchQuery: (state, { payload }) => {
      const { query } = payload;
      state.searchQueryAndLocation = payload;
      state.searchQuery = query;
    },
  },
  extraReducers: (builder) => {
    // GET ALL DATA
    builder.addCase(getContent.fulfilled, (state, { payload }) => {
      if (state.allContentData.length <= 0) {
        state.allContentData = payload;
        const trendingData = payload.filter((item) => item.isTrending);
        state.trendingContent = trendingData;
        const movies = payload.filter((item) => item.category === "Movie");
        const tv = payload.filter((item) => item.category === "TV Series");
        state.moviesData = movies;
        state.tvSeriesData = tv;
        state.isLoading = false;
      }
      state.isLoading = false;
    });
    builder.addCase(getContent.rejected, (state, { payload }) => {
      state.isLoading = false;
    });
    builder.addCase(getContent.pending, (state, { payload }) => {
      state.isLoading = true;
    });
  },
});

// FOR WHEN WE HAVE ACTIONS
export const {
  bookmarkContent,
  updateTrending,
  updateMovies,
  updateTvSeries,
  renderCurrentBookmarks,
  searchQuery,
} = contentSlice.actions;

export default contentSlice.reducer;
