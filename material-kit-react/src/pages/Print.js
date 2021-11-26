/* eslint-disable no-underscore-dangle */
import axios from 'axios';
import { useState, useEffect } from 'react';
import moment from 'moment';
import { makeStyles } from '@material-ui/styles';

const mixin = {
  border: '1px solid black',
  padding: '0px 10px'
};

const useStyle = makeStyles({
  table: {
    ...mixin,
    borderCollapse: 'collapse',
    width: '100%',
    '& tr': {
      ...mixin
    },
    '& th': {
      ...mixin
    },
    '& td': {
      ...mixin
    }
  }
});

const Print = () => {
  const [absensi, setAbsensi] = useState([]);
  const classes = useStyle();
  const getAbsensi = () => {
    axios.get(`${process.env.REACT_APP_API}absensi?matakuliah}`).then((res) => {
      console.log(res);
      setAbsensi(res.data);
    });
  };
  useEffect(() => {
    getAbsensi();
  }, []);
  return (
    <div>
      <h1>LAPORAN ABSENSI</h1>
      <table style={{ border: '1px solid black' }} className={classes.table}>
        <tr>
          <th rowSpan={2}>NO</th>
          <th rowSpan={2}>Kelas</th>
          <th rowSpan={2}>Matakuliah</th>
          <th rowSpan={2}>Tanggal</th>
          <th rowSpan={2}>Masuk</th>
          <th rowSpan={2}>Keluar</th>
          <th colSpan={2}>Kehadiran</th>
        </tr>
        <tr>
          <th>nama</th>
          <th>keterangan</th>
        </tr>
        {absensi.map((data, index) => (
          data.absensi.map((absen, idx) => (
            <tr>
              {
                idx === 0
                && (
                  <>
                    <td rowSpan={data.absensi.length}>{index + 1}</td>
                    <td rowSpan={data.absensi.length}>{data.id_kelas[0].nama}</td>
                    <td rowSpan={data.absensi.length}>{data.id_matakuliah[0].nama}</td>
                    <td rowSpan={data.absensi.length}>{moment(new Date(+data.tanggal)).format('DD/MM/YYYY')}</td>
                    <td rowSpan={data.absensi.length}>{data.masuk ? moment(data.masuk).format('LT') : ''}</td>
                    <td rowSpan={data.absensi.length}>{data.keluar ? moment(data.keluar ?? '2021-11-15T02:00:00.853Z').format('LT') : ''}</td>
                  </>
                )
              }
              <td>{`${absen.firstName} ${absen.lastName}`}</td>
              <td>{`${absen.keterangan}`}</td>
            </tr>
          ))
        ))}
      </table>
    </div>
  );
};

export default Print;
