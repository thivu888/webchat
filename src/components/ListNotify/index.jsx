import React, { useEffect, useState } from "react";
import UserService from "../../services/user";
import storage from "../../utils/storage";
import RequestFriendItem from "./RequestFriendItem";

export default function Index() {
  const user = storage.getUserInfo();
  const [data, setData] = useState();

  useEffect(() => {
    getRequestFriend();
  }, []);

  const getRequestFriend = async () => {
    UserService.getRequestFriends(user._id).then((res) => setData(res.friends));
  };

  const getListRequest = () => {
    if (!data) return null;
    if (data.length) {
      return data.map((item) => (
        <RequestFriendItem key={item._id} user={item} setData={setData} />
      ));
    }
    return <p style={{ textAlign: "center" }}>Không có yêu cầu nào</p>;
  };

  return <div>{getListRequest()}</div>;
}
