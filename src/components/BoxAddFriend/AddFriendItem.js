import React from "react";
import { Box } from "@mui/system";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import { Avatar, Button } from "@mui/material";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import { Grid } from "@mui/material";
import storage from "../../utils/storage";
import UserService from "../../services/user";
const AddFriendItem = ({
  user,
  isSentRequest,
  setListUser,
  setListSentRequest,
}) => {
  const userInfo = storage.getUserInfo();
  const handleRequestAddFriend = async () => {
    UserService.addFriend({
      friend_id: user._id,
      user_id: userInfo._id,
    }).then(() => setListSentRequest((list) => [...list, { ...user }]));
  };

  const cancelRequest = () => {
    UserService.cancelAddFriend(userInfo._id, user._id).then((res) =>
      setListSentRequest((list) => list.filter((item) => item._id !== user._id))
    );
  };

  const handleOnclick = () => {
    if (isSentRequest) {
      cancelRequest();
    } else {
      handleRequestAddFriend();
    }
  };

  return (
    <Grid
      item
      mobile={12}
      mobileplus={6}
      tablet={6}
      desktop={4}
      desktopplus={3}
    >
      <Card
        sx={{
          position: "relative",
          width: 250,
          height: 250,
          background: "#fff",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          margin: "16px auto",
        }}
      >
        <CancelOutlinedIcon
          sx={{
            position: "absolute",
            top: 6,
            right: 6,
            color: "gray",
            zIndex: "1000",
            cursor: "pointer",
          }}
          onClick={() =>
            setListUser((list) => list.filter((item) => item._id !== user._id))
          }
        />
        <Box>
          <Avatar sx={{ width: 96, height: 96, mt: 3 }} src={user.avatar} />
        </Box>
        <Box>
          <Typography
            sx={{
              fontSize: "16px",
              fontWeight: "600",
              height: "25px",
              mt: 1,
              padding: "0 16px",
            }}
          >
            {user.username}
          </Typography>
        </Box>
        <Button sx={{ mt: 3 }} variant="outlined" onClick={handleOnclick}>
          {" "}
          {isSentRequest ? "Hủy yêu cầu kết bạn" : "Kết bạn"}
        </Button>
      </Card>
    </Grid>
  );
};

export default AddFriendItem;
