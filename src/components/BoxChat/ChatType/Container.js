import React, { useState } from "react";
import { Box } from "@mui/system";
import { styled } from "@mui/styles";
import InputBase from "@mui/material/InputBase";
import useStyle from "./style";
import { Typography, useMediaQuery } from "@mui/material";
import { sendMessage } from "../../../actions/socket";
import { useDispatch, useSelector } from "react-redux";
import { MessageTypes } from "../../../constant/types";
import InputFile from "./InputFile";

const ContainerWraper = styled("div")((props) => ({
  position: "fixed",
  right: 0,
  left: `${props.isDesktop ? "401px" : "64px"}`,
  bottom: 0,
  height: 56,
  background: "#fff",

  "&>div": {
    display: "flex",
    alignItems: "center",
    borderTop: "1px solid #bdbdbd",
    padding: "8px 0",
    height: "100%",
    width: "100%",
    "&>div": {
      "&>svg:hover": {
        cursor: "pointer",
        borderRadius: "2px",
      },
    },
  },
}));

const Container = () => {
  const { focusContentRight } = useSelector((state) => state.main);
  const isDesktop = useMediaQuery("(min-width:800px)");

  const dispatch = useDispatch();

  const classes = useStyle();
  const [state, setstate] = useState("");

  const onChangeInput = (e) => {
    setstate(e.target.value);
  };

  const handleSendMessage = () => {
    if (state.length > 0) {
      dispatch(
        sendMessage({
          content: state,
          type: MessageTypes.MESSAGE,
        })
      );

      setstate("");
    }
  };

  const onKeyPress = (event) => {
    if (event.keyCode === 13 || event.which === 13) {
      handleSendMessage();
    }
  };

  return (
    <ContainerWraper
      isDesktop={isDesktop}
      focusContentRight={focusContentRight}
    >
      <Box>
        <InputFile />
        <Box className={classes.InputWraper}>
          <InputBase
            fullWidth
            placeholder="Type ...."
            onChange={onChangeInput}
            value={state}
            onKeyPress={onKeyPress}
          />
          <Box className={classes.iconSmileWraper}>
            <Typography
              className={classes.iconSmile + " " + classes.icon}
            ></Typography>
          </Box>
        </Box>
        <Box sx={{ mr: 2 }}>
          <Typography
            className={classes.iconMic + " " + classes.icon}
          ></Typography>
        </Box>
        <Box>
          <Box className={classes.WrapSend} onClick={handleSendMessage}>
            <Typography
              className={classes.iconSend + " " + classes.icon}
            ></Typography>
          </Box>
        </Box>
      </Box>
    </ContainerWraper>
  );
};

export default Container;
