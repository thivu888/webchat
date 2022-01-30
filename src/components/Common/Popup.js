import React from "react";
import { Backdrop } from "@mui/material";
import { Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { updateUserInfo } from "../../actions/Main";
const Popup = (props) => {
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.main);

  return (
    <Backdrop
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={!!userInfo}
    >
      <Box
        sx={{
          width: 360,
          height: 615,
          background: "#fff",
          borderRadius: 3,
          p: 1,
        }}
      >
        {props.children}
      </Box>
    </Backdrop>
  );
};

export default Popup;
