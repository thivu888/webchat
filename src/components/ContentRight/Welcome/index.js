import { Box } from "@mui/system";
import React from "react";
import { useDispatch } from "react-redux";
import { updateFocusRight } from "../../../actions/Main";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import logo from "../../../static/images/logo.jpg";
const Index = () => {
  const dispatch = useDispatch();
  const handleCloseConversation = () => {
    dispatch(updateFocusRight(false));
  };
  return (
    <Box sx={{ position: "relative", width: "100%", background: "#EFEFEF" }}>
      <Box
        sx={{
          ml: 2,
          cursor: "pointer",
          color: "#000",
          top: 2,
          position: "absolute",
        }}
        onClick={handleCloseConversation}
      >
        <ArrowBackIcon />
      </Box>
      <Box sx={{ width: "100%", height: "100vh" }}>
        <img
          style={{ width: "100%", height: "100%", objectFit: "contain" }}
          src={logo}
          alt="logo"
        />
      </Box>
    </Box>
  );
};

export default Index;
