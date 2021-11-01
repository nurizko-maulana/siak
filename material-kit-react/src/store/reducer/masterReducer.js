import {
  SET_EDIT_RUANGAN,
  SET_EDIT_FALSE,
  SET_EDIT_MATKUL,
  SET_EDIT_PRODI,
  SET_EDIT_KELAS,
  SET_EDIT_MAHASISWA
} from '../types';

const intialValue = {
  ruangan: {},
  matkul: {},
  edit: false,
  prodi: {},
  kelas: {},
  mahasiswa: {}
};

const masterReducer = (state = intialValue, action) => {
  switch (action.type) {
    case SET_EDIT_MAHASISWA:
      return {
        ...state,
        mahasiswa: action.payload,
        edit: true
      };
    case SET_EDIT_RUANGAN:
      return {
        ...state,
        ruangan: action.payload,
        edit: true
      };
    case SET_EDIT_MATKUL:
      return {
        ...state,
        matkul: action.payload,
        edit: true
      };
    case SET_EDIT_FALSE:
      return {
        ...state,
        ruangan: {},
        edit: false
      };

    case SET_EDIT_PRODI:
      return { ...state, prodi: action.payload, edit: true };
    case SET_EDIT_KELAS:
      return { ...state, kelas: action.payload, edit: true };

    default:
      return state;
  }
};

export default masterReducer;
