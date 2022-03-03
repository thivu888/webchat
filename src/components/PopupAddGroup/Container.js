import { styled } from "@mui/system";
import React from "react";
import { Box } from "@mui/system";
import { useSelector } from "react-redux";
import Popup from "../Common/Popup";
import Header from "./Header";
import {
  Button,
  InputBase,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import FaceIcon from "@mui/icons-material/Face";
import { useDispatch } from "react-redux";
import {
  updateFocusRight,
  updateShowAddGroup,
  updateTargetContentRight,
} from "../../actions/Main";
import { useState } from "react";
import UserService from "../../services/user";
import { Backdrop } from "@mui/material";
import AddFriendItem from "./AddFriendItem";
import _ from "lodash";
import { updateconversation } from "../../actions/socket";
const ContainerWraper = styled(Popup)((theme) => ({}));

const Container = () => {
  const { showFindAddGroup } = useSelector((state) => state.main);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [tags, setTags] = useState([]);
  const handleChangeInput = (e) => {
    handleCallAPI(e.target.value);
  };

  const CallAPI = (value) => {
    setLoading(true);
    UserService.findUsers(0, 10, value)
      .then((res) => setData([...res.data]))
      .then(() => setLoading(false));
  };
  const handleCallAPI = _.debounce((value) => CallAPI(value), 500);

  const getItems = () => {
    return data.map((user) => (
      <AddFriendItem key={user._id} user={user} setTags={setTags} />
    ));
  };
  const getTags = () => {
    return tags.map((item) => (
      <Chip
        icon={<FaceIcon />}
        key={item._id}
        id={item._id}
        user={item}
        label={item.username}
        onDelete={() => ondeleteTag(item._id)}
        variant="outlined"
      />
    ));
  };

  const ondeleteTag = (id) => {
    setTags((tags) => tags.filter((item) => item._id !== id));
  };

  const onSubmit = () => {
    const romid = tags.map((item) => item._id);
    const avatar = tags.map((item) => item.avatar);
    const name = tags.map((item) => item.username);
    dispatch(
      updateconversation({
        roomId: romid,
        avatars: avatar,
        users: tags,
        name: name,
        updatedAt: Date.now(),
      })
    );
    dispatch(updateShowAddGroup(false));
    dispatch(updateFocusRight(true));
    dispatch(updateTargetContentRight("message"));
  };

  if (!showFindAddGroup) {
    return <h1></h1>;
  }
  return (
    <Backdrop
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={!!showFindAddGroup}
      setData={setData}
    >
      <Box
        sx={{
          width: 360,
          height: 615,
          background: "#fff",
          borderRadius: 3,
          p: 1,
          zIndex: (theme) => theme.zIndex.drawer + 2,
        }}
      >
        <Header />
        <Box
          sx={{
            height: 32,
            display: "flex",
            alignItems: "center",
            pl: 2,
            justifyContent: "space-between",
          }}
        >
          <Box
            sx={{
              background: "#e8eaef",
              borderRadius: 6,
              height: "100%",
              width: "100%",
            }}
          >
            <Box sx={{ width: "100%", height: "100%", pl: 1, display: "flex" }}>
              <SearchIcon sx={{ position: "relative", top: 4 }} />
              <InputBase onChange={(e) => handleChangeInput(e)} />
            </Box>
          </Box>
        </Box>
        <Box sx={{ pl: 2, pr: 2, overflow: "scroll", height: 300 }}>
          {getItems()}
        </Box>
        <Box sx={{ mt: 3, height: 150, overflow: "scroll" }}>
          <Stack
            direction="row"
            spacing={1}
            justifyContent="center"
            sx={{ flexWrap: "wrap" }}
          >
            {getTags()}
          </Stack>
        </Box>
        <Box sx={{ float: "right", mt: 2 }}>
          <Button
            variant="contained"
            disabled={tags.length > 0 ? false : true}
            onClick={onSubmit}
          >
            Bắt đầu
          </Button>
        </Box>
      </Box>
    </Backdrop>
  );
};
export default Container;
