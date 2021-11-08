import PropTypes from 'prop-types';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button
} from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { setAlertFalse } from '../store/action/masterAction';

function Alert({ onConfirm, message }) {
  /* eslint-disable-next-line */
  const id = useSelector((s) => s.master.alert.data?._id);
  const data = useSelector((s) => s.master.alert?.data);
  const state = useSelector((s) => s.master.alert?.state);

  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(setAlertFalse());
  };
  return (
    <Dialog
      open={state}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{message}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {data?.nama}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Tidak</Button>
        <Button
          onClick={() => {
            onConfirm(id);
            handleClose();
          }}
          autoFocus
        >
          Ya
        </Button>
      </DialogActions>
    </Dialog>
  );
}

Alert.propTypes = {
  onConfirm: PropTypes.func,
  message: PropTypes.string
};

export default Alert;
