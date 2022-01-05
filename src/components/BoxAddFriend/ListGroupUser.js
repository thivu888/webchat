import React, { useState, useEffect } from "react";
import { Grid, GridItem } from "@mui/material";
import { GroupItem } from "./GroupItem";
import UserService from "../../services/user";
import storage from "../../utils/storage";
export const ListGroupUser = () => {
  const [state, setstate] = useState([]);
  useEffect(() => {
    (async () => {
        const list = []
    const user = storage.getUserInfo();
    const result = await UserService.getListConverSations(user._id)
        result.forEach( (item) => {
          UserService.getUsersInRoom(item._id).then((res) => {
            if(res.data.length > 2) {
                list.push(item)
                setstate(list)
            }
          });
        });
      })()
  }, []);
  return (
    <Grid container spacing={1}>
      {state.map((item) => (
        <GroupItem key={item._id} item={item} />
      ))}
    </Grid>
  );
};
