import { Avatar, Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import UserService from "../../services/user";
import storage from "../../utils/storage";
import useStyle from "../ListConversation/style";

export default function RequestFriendItem({ user, setData }) {
  const classes = useStyle();
  const userInfo = storage.getUserInfo();
  const handleAccept = async () => {
    const res = await UserService.acceptFriend({
      friend_id: user._id,
      user_id: userInfo._id,
    });
    if (res) {
      setData((list) => list.filter((item) => item._id !== user._id));
    }
  };

  const rejectRequest = () => {
    UserService.cancelAddFriend(userInfo._id, user._id).then((res) =>
      setData((list) => list.filter((item) => item._id !== user._id))
    );
  };

  return (
    <Box className={classes.item_wraper}>
      <Box className={classes.item_img_wraper}>
        <Avatar sx={{ width: 48, height: 48 }} src={user.avatar} />
      </Box>
      <Box className={classes.item_content_wraper}>
        <Box className={classes.text_wraper}>
          <Typography>{user.username}</Typography>
        </Box>
        <Box sx={{ mt: 1 }}>
          <Button size="small" variant="contained" onClick={handleAccept}>
            Đồng ý
          </Button>
          <Button
            size="small"
            variant="outlined"
            sx={{ ml: 1 }}
            onClick={rejectRequest}
          >
            Từ chối
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
