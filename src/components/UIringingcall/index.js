import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import {useDispatch} from 'react-redux';
import {tranferCallData } from '../../actions/call';
// import { Link } from '@mui/material';
import {Link } from 'react-router-dom'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide({data}) {
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch()
  const handleClose = () => {
    setOpen(false);
  };

  const handleAccept = () => {
    dispatch(tranferCallData({
       ...data
    }))
  }

  return (
      <Dialog
        open={true}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
           Cuộc gọi đến
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Từ chối</Button>
          <Link to = '/call'>
            <Button onClick={handleAccept}>Đồng ý</Button>
            </Link>
        </DialogActions>
      </Dialog>
  );
}