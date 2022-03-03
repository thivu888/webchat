import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { Box } from "@mui/system";
import { useDispatch } from "react-redux";
import { tranferCallData } from "../../actions/call";
import { resetDataCall } from "../../actions/call";
import { Link } from "react-router-dom";
import { Backdrop } from "@mui/material";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import PhoneDisabledIcon from "@mui/icons-material/PhoneDisabled";
import { setShowIncomming } from "../../actions/call";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide({ data }) {
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();
  const handleClose = () => {
    setOpen(false);
  };

  const handleAccept = () => {
    dispatch(setShowIncomming(null));
    dispatch(
      tranferCallData({
        ...data,
      })
    );
  };
  const handleReject = () => {
    dispatch(setShowIncomming(null));
    dispatch(resetDataCall());
  };
  return (
    <Backdrop sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }} open={true}>
      <Box
        sx={{
          width: 470,
          height: 655,
          position: "relative",
          backgroundImage: `url(${data?.data.data.userId.avatar})`,
          backgroundPosition: "center center",
          backgroundSize: "cover",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            bottom: 120,
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: (theme) => theme.zIndex.drawer + 2,
          }}
        >
          <p style={{ fontWeight: 900, fontSize: 20, color: "#000" }}>
            {data?.data.data.userId.username}
          </p>
        </Box>
        <Box
          sx={{
            display: "flex",
            width: "60%",
            justifyContent: "space-around",
            position: "absolute",
            bottom: 50,
            left: "50%",
            transform: "translateX(-50%)",
          }}
        >
            <Link to="/call">
          <Box
            sx={{
              width: 60,
              height: 60,
              background: "#3fcc35",
              borderRadius: "50%",
              textAlign: "center",
              position: "relative",
              cursor: "pointer",
            }}
            onClick={handleAccept}
          >
              <LocalPhoneIcon
                sx={{
                  position: "absolute",
                  top: 17,
                  right: 17,
                  fill: "#fff",
                  fontWeight: "bold",
                }}
              />
          </Box>
          </Link>

          <Box
            sx={{
              width: 60,
              height: 60,
              background: "red",
              borderRadius: "50%",
              textAlign: "center",
              position: "relative",
              cursor: "pointer",
            }}
            onClick={handleReject}
          >
            <PhoneDisabledIcon
              sx={{
                position: "absolute",
                top: 17,
                right: 17,
                fill: "#fff",
                fontWeight: "bold",
              }}
            />
          </Box>
        </Box>
      </Box>
    </Backdrop>
  );
}
