import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  list: [],
};

const collectionReducer = createSlice({
  name: "collection",
  initialState: initialState,
  reducers: {
    addCollection: (state, action) => {
      const collectionExist = state.list.find(
        (item) => item.name === action.payload.name
      );
      if (!collectionExist) {
        state.list = [...state.list, action.payload];
      }
    },
    editCollection: (state, action) => {
      const updatedCollection = state.list.map((item) => {
        if (item.id === action.payload.id) {
          return {
            ...item,
            name: action.payload.name,
          };
        }
        return item;
      });
      state.list = updatedCollection;
    },
    removeCollection: (state, action) => {
      const updatedCollection = state.list.filter(
        (item) => item.id !== action.payload.id
      );
      state.list = updatedCollection;
    },
    addToCollection: (state, action) => {
      action.payload.collections.map((item) => {
        const findCollection = state.list.find(
          (collection) => collection.id === item.id
        );
        if (findCollection) {
          const updateAnime = state.list.map((collection) => {
            if (
              collection.id === item.id &&
              !collection.anime.find(
                (anime) => anime.id === action.payload.anime.id
              )
            ) {
              return {
                ...collection,
                anime: [...collection.anime, action.payload.anime],
              };
            }
            return collection;
          });
          state.list = updateAnime;
        }
      });
    },
    removeFromCollection: (state, action) => {
      const updatedAnime = state.list.map((collection) => {
        if (collection.id === action.payload.collectionId) {
          return {
            ...collection,
            anime: collection.anime.filter(
              (anime) => anime.id !== action.payload.animeId
            ),
          };
        }
        return collection;
      });
      state.list = updatedAnime;
    },
  },
});

export const {
  addCollection,
  removeCollection,
  addToCollection,
  editCollection,
  removeFromCollection,
} = collectionReducer.actions;
export default collectionReducer.reducer;
