import React, { useRef } from "react";
import { Box } from "@mui/system";
import { styled } from "@mui/styles";
import GroupAddOutlinedIcon from "@mui/icons-material/GroupAddOutlined";
import SearchIcon from "@mui/icons-material/Search";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
import VideocamOutlinedIcon from "@mui/icons-material/VideocamOutlined";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Avatar, Typography, AvatarGroup } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { updateFocusRight } from "../../../actions/Main";
import useStyle from "./style";
import avatarAddFriend from "../../../static/images/avataraddfriend.png";
import avatar_Group from "../../../static/images/avatarground.png";
import moment from "moment";
import history from "../../../utils/history";
import { Link } from "react-router-dom";
export const ContainerWraper = styled("div")((props) => {
  return {
    height: 68,
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
    position: "relative",
    borderBottom: "1px solid #dbdbdb",
  };
});

const Container = (props) => {
  const classes = useStyle();
  const { isDesktop, focusContentRight, targetContentRight } = useSelector(
    (state) => state.main
  );

  const dispatch = useDispatch();

  const handleCloseConversation = () => {
    dispatch(updateFocusRight(false));
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
      });
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
          <Typography sx={{ fontSize: 24, fontWeight: 600, ml: 2 }}>
            Danh sách kết bạn
          </Typography>
        </>
      )}
      {addFriend && targetContentRight === "group" && (
        <>
          <Box className={classes.avatarWraper}>
            <Avatar src={avatar_Group} />
          </Box>
          <Typography sx={{ fontSize: 24, fontWeight: 600, ml: 2 }}>
            Danh sách nhóm
          </Typography>
        </>
      )}

      {chat && (
        <>
          {avatars ? (
            <AvatarGroup max={2}>
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
            <Box>
              <GroupAddOutlinedIcon />
            </Box>
            <Box>
              <SearchIcon onClick={() => console.log("/verify")} />
            </Box>
            <Link to="/call">
              <Box>
                <LocalPhoneOutlinedIcon onClick={onHandleRequestCall} />
              </Box>
            </Link>
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
