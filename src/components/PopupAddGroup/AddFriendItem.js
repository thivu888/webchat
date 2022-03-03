import React from "react";
import { Box, Avatar, Typography, Button } from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { useDispatch } from "react-redux";
import { updateFocusRight } from "../../actions/Main";
import useStyle from "../ListConversation/style";
import { updateTargetContentRight } from "../../actions/Main";
import { updateconversation } from "../../actions/socket";
import storage from "../../utils/storage";

export default function AddFriendItem({ user, setTags }) {
  const classes = useStyle();

  const dispatch = useDispatch();

  const handleAddToTag = (user) => {
    setTags((tag) => [
      ...tag?.filter((item) => item._id != user._id),
      { ...user },
    ]);
  };

  const me = storage.getUserInfo();
  return (
    <Box
      className={classes.item_wraper}
      sx={{
        display: "flex",
        alignItems: "center",
        borderRadius: "16px",
        height: "50px !important",
      }}
      onClick={() => handleAddToTag(user)}
    >
      <Box className={classes.item_img_wraper}>
        <Avatar sx={{ width: 36, height: 36 }} src={user?.avatar} />
      </Box>
      <Box className={classes.item_content_wraper}>
        <Box className={classes.text_wraper}>
          <Typography>{user?.username}</Typography>
        </Box>
      </Box>
    </Box>
  );
}
