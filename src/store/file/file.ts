import { createSlice } from '@reduxjs/toolkit';

const initialFile = {
  uploadedFilesProps: [],
  showFilesType: 'pdf',
  selectedFile: -1,
};

const initialFileSlice = createSlice({
  name: 'file',
  initialState: initialFile,
  reducers: {
    setUploadedFilesProps(state, action) {
      state.uploadedFilesProps = action.payload;
    },

    setShowFilesType(state, action) {
      state.showFilesType = action.payload;
    },

    setSelectedFile(state, action) {
      state.selectedFile = action.payload;
    },
  },
});

export const fileActions = initialFileSlice.actions;

export default initialFileSlice.reducer;
