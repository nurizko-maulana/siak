import {
  SET_EDIT_RUANGAN,
  SET_EDIT_FALSE,
  SET_EDIT_MATKUL,
  SET_EDIT_PRODI,
  SET_EDIT_KELAS,
  SET_EDIT_MAHASISWA,
  SET_ALERT_TRUE,
  SET_ALERT_FALSE,
  SET_EDIT_ABSENSI
} from '../types';

export const setEditAbsensi = (data) => (dispatch) => {
  dispatch({
    type: SET_EDIT_ABSENSI,
    payload: data
  });
};
export const setEditMahasiswa = (mahasiswa) => (dispatch) => {
  dispatch({
    type: SET_EDIT_MAHASISWA,
    payload: mahasiswa
  });
};
export const setEditRuangan = (ruangan) => (dispatch) => {
  dispatch({
    type: SET_EDIT_RUANGAN,
    payload: ruangan
  });
};
export const setEditMatkul = (matkul) => (dispatch) => {
  dispatch({
    type: SET_EDIT_MATKUL,
    payload: matkul
  });
};
export const updateData = () => (dispatch) => {
  dispatch({
    type: SET_EDIT_FALSE
  });
};
export const setEditKelas = (kelas) => (dispatch) => {
  dispatch({
    type: SET_EDIT_KELAS,
    payload: kelas
  });
};
export const setEditProdi = (prodi) => (dispatch) => {
  dispatch({
    type: SET_EDIT_PRODI,
    payload: prodi
  });
};
export const setAlertTrue = (data) => (dispatch) => {
  dispatch({
    type: SET_ALERT_TRUE,
    payload: data
  });
};
export const setAlertFalse = (data) => (dispatch) => {
  dispatch({
    type: SET_ALERT_FALSE,
    payload: data
  });
};
