import { Box } from "@mui/material";
import { useSelector } from "react-redux";
import storage from "../../utils/storage";
import ConversationItem from "./ConversationItem";
import useStyle from "./style";
const Index = () => {
  const classes = useStyle();
  const user = storage.getUserInfo();

  const { listConversations } = useSelector((state) => state.chatControl);
  const getListconverSations = () => {
    const list = listConversations.map((item) => (
      <ConversationItem
        key={item._id}
        id={item._id}
        isRead={
          item.sender._id === user._id ||
          !!item.readBy.find((reader) => reader._id === user._id)
        }
        value={item}
      />
    ));

    return list;
  };

  return <Box className={classes.container}>{getListconverSations()}</Box>;
};

export default Index;
