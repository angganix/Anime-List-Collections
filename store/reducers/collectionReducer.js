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
    removeCollection: (state, action) => {
      const updatedCollection = state.list.filter(
        (item) => item.name !== action.payload.name
      );
      state.list = updatedCollection;
    },
    addToCollection: (state, action) => {
      action.payload.collections.map((item) => {
        const findCollection = state.list.find(
          (collection) => collection.name === item
        );
        if (findCollection) {
          const updateAnime = state.list.map((collection) => {
            if (
              collection.name === item &&
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
    removeFromCollection: (state, action) => {},
  },
});

export const { addCollection, removeCollection, addToCollection } =
  collectionReducer.actions;
export default collectionReducer.reducer;
