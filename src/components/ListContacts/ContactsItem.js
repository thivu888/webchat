import React from "react";
import { Box, Avatar, Typography, Menu, MenuItem } from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { useDispatch } from "react-redux";
import { updateFocusRight } from "../../actions/Main";
import useStyle from "../ListConversation/style";
import { updateTargetContentRight } from "../../actions/Main";
import { updateconversation } from "../../actions/socket";
import storage from "../../utils/storage";
import UserService from "../../services/user";

export const ContactsItem = ({ id, user, setListUser, isUnfriend }) => {
  const classes = useStyle();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const dispatch = useDispatch();

  const me = storage.getUserInfo();

  const handleFocusRight = () => {
    dispatch(
      updateconversation({
        roomId: [user._id],
        avatars: [user.avatar],
        users: [user],
        name: [user.username],
        updatedAt: Date.now(),
      })
    );
    dispatch(updateFocusRight(true));
    dispatch(updateTargetContentRight("message"));
  };

  const rejectRequest = () => {
    UserService.cancelAddFriend(me._id, user._id).then((res) =>
      setListUser((list) => list.filter((item) => item._id !== user._id))
    );
  };

  return (
    <>
      <Box className={classes.item_wraper}>
        <Box className={classes.item_img_wraper}>
          <Avatar sx={{ width: 48, height: 48 }} src={user.avatar} />
        </Box>
        <Box className={classes.item_content_wraper}>
          <Box className={classes.text_wraper} onClick={handleFocusRight}>
            <Typography>{user.username}</Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
            }}
          >
            <MoreHorizIcon
              className={classes.icon_more}
              onClick={handleClick}
            />
          </Box>
        </Box>
      </Box>
      {isUnfriend && (
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuItem onClick={rejectRequest}>Hủy kết bạn</MenuItem>
        </Menu>
      )}
    </>
  );
};
