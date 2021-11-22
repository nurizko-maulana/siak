import {
  SET_EDIT_RUANGAN,
  SET_EDIT_FALSE,
  SET_EDIT_MATKUL,
  SET_EDIT_PRODI,
  SET_EDIT_KELAS,
  SET_EDIT_MAHASISWA,
  SET_ALERT_FALSE,
  SET_ALERT_TRUE,
  SET_EDIT_ABSENSI,
  SET_FILTER_ABSENSI,
  SET_FILTER
} from '../types';

const intialValue = {
  absensi: {},
  ruangan: {},
  matkul: {},
  edit: false,
  prodi: {},
  kelas: {},
  mahasiswa: {},
  filterAbsensi: {
    matkul: '',
    kelas: '',
    prodi: '',
  },
  filter: {
    matkul: '', kelas: '', ruangan: '', prodi: '', mahasiswa: ''
  },
  alert: {
    data: {},
    state: false
  }
};

const masterReducer = (state = intialValue, action) => {
  switch (action.type) {
    case SET_FILTER:
      return {
        ...state,
        filter: { ...state.filter, ...action.payload }
      };
    case SET_FILTER_ABSENSI:
      return {
        ...state,
        filterAbsensi: { ...state.filterAbsensi, ...action.payload }
      };
    case SET_EDIT_ABSENSI:
      return {
        ...state,
        absensi: action.payload,
        edit: true
      };
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
    case SET_ALERT_TRUE:
      return {
        ...state,
        alert: {
          state: true,
          data: action.payload
        }
      };
    case SET_ALERT_FALSE:
      return {
        ...state,
        alert: {
          state: false,
          data: null
        }
      };

    default:
      return state;
  }
};

export default masterReducer;
