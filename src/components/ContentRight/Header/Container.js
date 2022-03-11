import React, { useRef } from "react";
import { Box } from "@mui/system";
import { styled } from "@mui/styles";
import GroupAddOutlinedIcon from "@mui/icons-material/GroupAddOutlined";
import SearchIcon from "@mui/icons-material/Search";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
import VideocamOutlinedIcon from "@mui/icons-material/VideocamOutlined";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {
  Avatar,
  Typography,
  AvatarGroup,
  useMediaQuery,
  TextField,
  InputAdornment,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  setListUsers,
  updateFocusRight,
  updateUserInfo,
} from "../../../actions/Main";
import useStyle from "./style";
import avatarAddFriend from "../../../static/images/avataraddfriend.png";
import avatar_Group from "../../../static/images/avatarground.png";
import { Theme } from "@mui/material/styles";
import moment from "moment";
import history from "../../../utils/history";
import { Link } from "react-router-dom";
import authentication from "../../../services/authentication";
import User from "../../../entities/User";
import { Image } from "@mui/icons-material";
import IconSearch from "../../../static/images/search_icon.svg";

export const ContainerWraper = styled("div")((props) => {
  return {
    minHeight: 55,
    background: "#fff",
    display: "flex",
    alignItems: "center",
    width: `calc(100vw - 401px)`,
    [props.theme.breakpoints.down("tablet")]: {
      width: `calc(100vw - 64px)`,
      display: (props) => {
        return `${props.focus ? "flex" : "none"}`;
      },
    },
    position: "fixed",
    zIndex: 1001,
    borderBottom: "1px solid #dbdbdb",
  };
});

const Container = (props) => {
  const classes = useStyle();
  const isDesktop = useMediaQuery("(min-width:800px)");

  const { focusContentRight, targetContentRight, listUsers, listTempUsers } =
    useSelector((state) => state.main);

  const dispatch = useDispatch();

  const handleCloseConversation = () => {
    dispatch(updateFocusRight(false));
  };

  const handleOpenFocusRight = () => {
    dispatch(updateFocusRight(true));
  };

  const handleSearch = (e) => {
    const listUser = [...listTempUsers];
    dispatch(
      setListUsers(
        listUser.filter((item) =>
          item.username.toLowerCase().includes(e.target.value.toLowerCase())
        )
      )
    );
  };
  const { chat, addFriend, user, avatars, name, updatedAt, data } = props;

  const onHandleRequestCall = () => {
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then(() => {
        window.socket.emit("call", {
          _id: Date.now() + Math.round(Math.random() * 10000001),
          userId: {
            _id: data.me.data._id,
            username: data.me.data.username,
            avatar: data.me.data.avatar,
          },
          roomId: data.conversationId,
          content: "đang gọi",
          type: "call",
          createdAt: Date.now(),
          updatedAt: Date.now(),
          userIds: Object.keys(data.yous),
          roomAvatar: avatars,
          roomName: name,
        });
      })
      .catch((er) => {
        console.log(er);
        alert(" Không tìm thấy thiết bị");
        history.back();
      });
  };

  const handleShowInfo = async (id) => {
    await authentication
      .getUserInfo(id)
      .then((res) => new User(res.data))
      .then((user) => dispatch(updateUserInfo(user)));
  };

  return (
    <ContainerWraper focus={focusContentRight}>
      {!isDesktop && focusContentRight && (
        <Box
          sx={{ ml: 2, cursor: "pointer", color: "#dbdbdb" }}
          onClick={handleCloseConversation}
        >
          <ArrowBackIcon />
        </Box>
      )}

      {addFriend && targetContentRight === "addfriend" && (
        <>
          <Box className={classes.avatarWraper}>
            <Avatar src={avatarAddFriend} />
          </Box>
          <Typography
            sx={{ fontSize: 24, fontWeight: 600, ml: 2 }}
            onClick={handleOpenFocusRight}
          >
            Danh sách kết bạn
          </Typography>
          <div className={classes.container}>
            <TextField
              className={classes.containerInput}
              InputProps={{
                className: classes.input,
                startAdornment: (
                  <InputAdornment position="start">
                    <img src={IconSearch} alt="icon" width={16} height={16} />
                  </InputAdornment>
                ),
              }}
              onChange={handleSearch}
              {...props}
            />
          </div>
        </>
      )}
      {/* {addFriend && targetContentRight === "group" && (
        <>
          <Box className={classes.avatarWraper}>
            <Avatar src={avatar_Group} />
          </Box>
          <Typography
            sx={{ fontSize: 24, fontWeight: 600, ml: 2 }}
            onClick={handleOpenFocusRight}
          >
            Danh sách nhóm
          </Typography>
        </>
      )} */}

      {chat && (
        <>
          {avatars ? (
            <AvatarGroup max={2} sx={{ ml: 1 }}>
              {avatars.map((item) => (
                <Avatar src={item} />
              ))}
            </AvatarGroup>
          ) : (
            <Box className={classes.avatarWraper}>
              <Avatar />
            </Box>
          )}
          <Box sx={{ ml: 2 }}>
            <Box className={classes.info}>
              <Typography className={classes.name}>{name}</Typography>
              <Typography className={classes.timeAgo}>
                {moment(updatedAt).fromNow()}
              </Typography>
            </Box>
          </Box>
          <Box className={classes.IconWraper}>
            <Link to="/call">
              <Box>
                <VideocamOutlinedIcon onClick={() => onHandleRequestCall()} />
              </Box>
            </Link>
          </Box>
        </>
      )}
    </ContainerWraper>
  );
};

export default Container;
