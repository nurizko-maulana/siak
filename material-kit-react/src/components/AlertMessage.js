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

function AlertMessage({ message }) {
  /* eslint-disable-next-line */
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
        <Button
          onClick={() => {
            handleClose();
          }}
          autoFocus
        >
          OK
        </Button>
      </DialogActions>
    </Dialog>
  );
}

AlertMessage.propTypes = {
  message: PropTypes.string
};

export default AlertMessage;
