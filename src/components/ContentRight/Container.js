import Boxchat from "../BoxChat/Container";
import { useSelector } from "react-redux";
import { styled } from "@mui/styles";
import BoxAddFriend from "../BoxAddFriend";
import Welcome from "./Welcome";
const Container = styled("div")((props) => ({
  position: "relative",
  background: "#fff",
  left: 401,
  height: "100vh",
  width: `calc(100vw - 401px)`,
  [props.theme.breakpoints.down("tablet")]: {
    left: 64,
    width: `calc(100vw - 64px)`,
    display: (props) => {
      return `${props.focus ? "block" : "none"}`;
    },
  },
  "&::-webkit-scrollbar": {
    width: 8,
    opacity: 0.8,
    display: "none",
  },
  "&:hover::-webkit-scrollbar": {
    width: 8,
    opacity: 0.8,
    display: "block",
  },
  "&::-webkit-scrollbar-track": {
    backgroundColor: "#fff",
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: "#fff",
    height: "70%",
    borderRadius: "10px",
  },
}));

const Index = (props) => {
  const { focusContentRight, targetContent } = useSelector(
    (state) => state.main
  );
  return (
    <Container focus={focusContentRight}>
      {targetContent === "message" && <Boxchat />}
      {targetContent === "contacts" && <BoxAddFriend />}
    </Container>
  );
};

export default Index;
