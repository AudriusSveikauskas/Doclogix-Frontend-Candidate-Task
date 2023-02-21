import { createSlice } from '@reduxjs/toolkit';

const initialUser = {
  userId: -1,
  userAvatar: '',
  userData: {
    id: -1,
    firstName: '',
    lastName: '',
    maidenName: '',
    age: -1,
    gender: '',
    email: '',
    phone: '',
    username: '',
    password: '',
    birthDate: '',
    image: '',
    bloodGroup: '',
    height: -1,
    weight: -1,
    eyeColor: '',
    hair: {
      color: '',
      type: '',
    },
    domain: '',
    ip: '',
    address: {
      address: '',
      city: '',
      coordinates: {
        lat: -1,
        lng: -1,
      },
      postalCode: '',
      state: '',
    },
    macAddress: '',
    university: '',
    bank: {
      cardExpire: '',
      cardNumber: '',
      cardType: '',
      currency: '',
      iban: '',
    },
    company: {
      address: {
        address: '',
        city: '',
        coordinates: {
          lat: -1,
          lng: -1,
        },
        postalCode: '',
        state: '',
      },
      department: '',
      name: '',
      title: '',
    },
    ein: '',
    ssn: '',
    userAgent: '',
  },
};

const initialUserSlice = createSlice({
  name: 'user',
  initialState: initialUser,
  reducers: {
    setUserId(state, action) {
      state.userId = action.payload;
    },

    setUserData(state, action) {
      state.userData = action.payload;
    },

    setUserAvatar(state, action) {
      state.userAvatar = action.payload;
    },
  },
});

export const userActions = initialUserSlice.actions;

export default initialUserSlice.reducer;
