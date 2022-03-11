import { Box } from "@mui/system";
import ChatType from "./ChatType";
import ChatHeader from "./ChatHeader";
import ChatPool from "./ChatPool/Container";
import { useSelector } from "react-redux";
import Welcome from "../ContentRight/Welcome";
import AudioRecord from "./AudioRecord";

const Index = () => {
  const { conversationId } = useSelector((state) => state.chatControl);
  const { targetContentRight } = useSelector((state) => state.main);
  if (!conversationId || targetContentRight !== "message") {
    return <Welcome />;
  }
  return (
    <Box sx={{ position: "relative", width: "100%" }}>
      <ChatHeader />
      <Box sx={{ position: "relative", minHeight: "90vh" }}>
        <ChatPool />
      </Box>
      <ChatType />
    </Box>
  );
};

export default Index;
