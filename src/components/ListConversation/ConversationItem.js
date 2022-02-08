import { Box, Avatar, Typography } from "@mui/material";
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
const Index = (props) => {
  const { value, isRead } = props;
  const { avatar, name, content, updatedAt } = value;
  const { listConversations } = useSelector((state) => state.chatControl);
  const user = storage.getUserInfo();
  const classes = useStyle();

  const dispatch = useDispatch();

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
        return <Typography>Bạn đã gửi cho bạn một ảnh</Typography>;
      }
      return <Typography>{name} đã gửi cho bạn một ảnh</Typography>;
    }
    if (value.type === "video") {
      if (me._id == value.sender._id) {
        return <Typography>Bạn đã gửi cho bạn một video</Typography>;
      }
      return <Typography>{name} đã gửi cho bạn một video</Typography>;
    }
    return <Typography>{content}</Typography>;
  };

  return (
    <Box
      className={clsx(classes.item_wraper, !isRead ? classes.noRead : "")}
      onClick={handleFocusRight}
    >
      <Box className={classes.item_img_wraper}>
        <Avatar sx={{ width: 48, height: 48 }} src={avatar} />
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
