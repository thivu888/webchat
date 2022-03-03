import { Box } from "@mui/system";
import { useState } from "react";
import ListConversation from "../ListConversation";
import ListContacts from "../ListContacts";
import { styled } from "@mui/styles";
import { useSelector } from "react-redux";
import Header from "./Header";
import useStyle from "../ListConversation/style";
import { ContactsItem } from "../ListContacts/ContactsItem";
import ListNotify from '../ListNotify'
const Container = styled("div")((props) => {
  return {
    position: "fixed",
    left: 64,
    width: 336,
    top: 0,
    bottom: 0,
    background: "#fff",
    borderRight: "1px solid #dbdbdb",
    cursor: "pointer",
    display: "block",
    [props.theme.breakpoints.down("tablet")]: {
      width: `calc(100vw - 64px)`,
      display: (props) => {
        return `${props.focus ? "none" : "block"}`;
      },
    },
    "&::-webkit-scrollbar": {
      width: "5px",
    },
  };
});

const Index = (props) => {
  const classes = useStyle();

  const { focusContentRight, targetContent } = useSelector(
    (state) => state.main
  );

  let body = null;

  const [finding, setFinding] = useState(false);
  const [listUser, setListUser] = useState([]);
  const getItem = () => {
    let list = [];
    list = listUser.map((item) => (
      <ContactsItem key={item._id} id={item._id} user={item} />
    ));
    return list;
  };

  return (
    <Container focus={focusContentRight}>
      <Header
        setFinding={setFinding}
        finding={finding}
        setListUser={setListUser}
      />
      {finding ? (
        <Box className={classes.container}>{getItem()}</Box>
      ) : (
        <Box>
          {targetContent === "message" && <ListConversation />}
          {targetContent === "contacts" && <ListContacts />}
          {targetContent === "notify" && <ListNotify />}
        </Box>
      )}
    </Container>
  );
};

export default Index;
