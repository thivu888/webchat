import { Box, Avatar, Typography, Badge } from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
// import TimeAgo from 'react-time-ago'
import { useDispatch, useSelector } from "react-redux";
import { updateFocusRight, updateTargetContentRight } from "../../actions/Main";
import useStyle from "./style";
import storage from "../../utils/storage";
import { updateconversation } from "../../actions/socket";
import { updateConversations } from "../../actions/Chat";
import moment from "moment";
import clsx from "clsx";
import { styled } from "@mui/system";
import { useEffect, useState } from "react";
import UserService from "../../services/user";
import AuthService from "../../services/authentication";
const SmallAvatar = styled(Avatar)(() => ({
  width: 24,
  height: 24,
  position: "relative",
  bottom: "4px",
  right: "4px",
  border: `2px solid #F5F8FC`,
}));

const Index = (props) => {
  const { value, isRead } = props;
  const { avatar, name, content, updatedAt } = value;
  const { listConversations } = useSelector((state) => state.chatControl);
  const user = storage.getUserInfo();
  const classes = useStyle();
  const dispatch = useDispatch();

  const [smallAvatar, setSmallAvatar] = useState("");

  const handleFocusRight = () => {
    dispatch(
      updateconversation({
        roomId: value._id,
        avatars: avatar,
        name: name,
        updatedAt,
      })
    );
    dispatch(
      updateConversations(
        listConversations.map((conv) => {
          if (conv._id === value._id) {
            const newConv = {
              ...conv,
              readby: [...(conv.readby || []), user._id],
            };
            return newConv;
          }
          return conv;
        })
      )
    );
    dispatch(updateFocusRight(true));
    dispatch(updateTargetContentRight("message"));
  };

  const getContent = (content) => {
    const me = storage.getUserInfo();
    if (value.type === "image") {
      if (me._id == value.sender._id) {
        return <Typography>Bạn đã gửi một ảnh</Typography>;
      }
      return <Typography>{name} đã gửi cho bạn một ảnh</Typography>;
    }
    if (value.type === "video") {
      if (me._id == value.sender._id) {
        return <Typography>Bạn đã gửi một video</Typography>;
      }
      return <Typography>{name} đã gửi cho bạn một video</Typography>;
    }
    if (value.type === "audio") {
      if (me._id == value.sender._id) {
        return <Typography>Bạn đã gửi một voice</Typography>;
      }
      return <Typography>{name} đã gửi cho bạn một voice</Typography>;
    }
    return <Typography>{content}</Typography>;
  };

  const badgeContent = () => {
    if (avatar.length <= 1) return null;
    return <SmallAvatar className={classes.styleSubAvatar} src={smallAvatar} />;
  };

  useEffect(() => {
    AuthService.getUserInfo(value.sender._id).then((res) => {
      setSmallAvatar(res.data.avatar);
    });
  }, [value]);

  return (
    <Box
      className={clsx(classes.item_wraper, !isRead ? classes.noRead : "")}
      onClick={handleFocusRight}
    >
      <Box className={classes.item_img_wraper}>
        <Badge
          overlap="circular"
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          badgeContent={badgeContent()}
        >
          <Avatar sx={{ width: 48, height: 48 }} src={avatar[0]} />
        </Badge>
      </Box>
      <Box className={classes.item_content_wraper}>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography className={classes.nameWraper}>{name}</Typography>
          <Typography className={classes.time_wraper} sx={{ fontSize: 14 }}>
            {moment(updatedAt).fromNow()}
          </Typography>
        </Box>
        <Box
          sx={{ display: "flex", justifyContent: "space-between" }}
          className={classes.text_wraper}
        >
          {getContent(content)}
          <MoreHorizIcon className={classes.icon_more} />
        </Box>
      </Box>
      {!isRead && (
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            right: "10px",
            width: "20px",
            height: "20px",
            borderRadius: "50%",
            background: "red",
            color: "white",
            textAlign: "center",
            fontWeight: "600",
          }}
        >
          1
        </Box>
      )}
    </Box>
  );
};

export default Index;
