import React, { useState, useEffect } from "react";
import { Grid, GridItem } from "@mui/material";
import AddFriendItem from "./AddFriendItem";
import UserService from "../../services/user";
import { CircularProgress } from "@mui/material";
import storage from "../../utils/storage";
import { Box } from "@mui/system";
import { useDispatch, useSelector } from "react-redux";
import { setListTempUsers, setListUsers } from "../../actions/Main";
export const ListFriendAdd = ({ isSuggestFriend = false }) => {
  const user = storage.getUserInfo();
  const { listUsers } = useSelector((state) => state.main);
  const dispatch = useDispatch();
  const [listUser, setListUser] = useState(undefined);
  const [listFriend, setListFriend] = useState([]);
  const [listSentRequest, setListSentRequest] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    handleCallAPI();
    getSentRequest();
    getFriends();
  }, []);

  const handleCallAPI = async () => {
    setLoading(true);
    if (isSuggestFriend) {
      UserService.getRecommendAddFriend(user._id)
        .then((res) => {
          setLoading(false);
          setListUser([...res.users]);
        })
        .catch((e) => console.log(e));
    } else {
      UserService.getAllUsers()
        .then((res) => {
          setLoading(false);
          setListUser([...res.users]);
        })
        .catch((e) => console.log(e));
    }
  };

  const getSentRequest = async () => {
    UserService.getSentRequestFriends(user._id).then((res) => {
      setListSentRequest(res.friends);
    });
  };

  const getFriends = async () => {
    UserService.getFriends(user._id)
      .then((res) => {
        setListFriend([...res.friends]);
      })
      .catch((e) => console.log(e));
  };

  const getItem = () => {
    let list = [];
    if (!listUser) return null;

    list = listUsers.map((item) => (
      <AddFriendItem
        isSentRequest={checkSentRequest(item)}
        key={item._id}
        user={item}
        setListUser={setListUser}
        setListSentRequest={setListSentRequest}
      />
    ));
    return list;
  };

  useEffect(() => {
    let listUserOrigin = [];
    if (!listUser) return null;

    listUser.forEach((item) => {
      const check = listFriend.find((it) => it._id === item._id);
      if (!check) {
        listUserOrigin.push(item);
      }
    });
    listUserOrigin = listUserOrigin.filter((item) => item._id !== user._id);
    dispatch(setListUsers(listUserOrigin));
    dispatch(setListTempUsers(listUserOrigin));
  }, [listFriend, listUser?.length]);
  const checkSentRequest = (userCheck) => {
    let check = false;
    const userAvailable = listSentRequest.find(
      (item) => userCheck._id === item._id
    );
    if (userAvailable) {
      check = true;
      return check;
    }
    return check;
  };

  return (
    <Grid container spacing={1}>
      {loading && <CircularProgress sx={{ margin: "30% auto" }} />}
      {getItem()}
    </Grid>
  );
};
