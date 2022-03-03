import { Box, styled } from "@mui/system";
import { Avatar } from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import Text from "./Text/Container";
import VideoItem from "./Video";
import ImageItem from "./Image";
import { MessageTypes, FileTypes } from "../../../constant/types";
import useStyleListConversation from "../../ListConversation/style";
import { DownLoad, GetUrlImg } from "../../../utils/download";
import CallEndIcon from "@mui/icons-material/CallEnd";
import { updateUserInfo } from "../../../actions/Main";
import { useDispatch } from "react-redux";
import authentication from "../../../services/authentication";
import User from "../../../entities/User";
const Container = styled("div")((props) => {
  const { isOwn } = props;
  return {
    padding: "16px 0 16px 16px",
    alignSelf: `${isOwn ? "flex-end" : "flex-start"}`,
    "& > div": {
      display: "flex",
      alignItems: "flex-start",
      alignItems: "center",
      "& > svg": {
        marginRight: `${isOwn ? "12px" : "0px"}`,
        marginLeft: `${!isOwn ? "12px" : "0px"}`,
      },
      "&:hover": {
        "& > svg": {
          opacity: "1",
          visibility: "visible",
        },
      },
    },
  };
});

const Index = (props) => {
  const dispatch = useDispatch();
  const classConversation = useStyleListConversation();
  const { me, you, isOwn, content, isRead, type, id, avatar } = props;
  const getItem = ({ isOwn, type, content, message }) => {
    if (MessageTypes.MESSAGE === type) {
      return <Text isOwn={isOwn} content={content} />;
    } else if (MessageTypes.VIDEO === type) {
      return JSON.parse(content).map((content) => (
        <>
          {isOwn ? (
            <FileDownloadIcon
              className={classConversation.icon_more}
              onClick={() => handleDownloadFile(content)}
            />
          ) : null}
          <VideoItem isOwn={isOwn} content={content} />
          {!isOwn ? (
            <FileDownloadIcon
              className={classConversation.icon_more}
              onClick={() => handleDownloadFile(content)}
            />
          ) : null}
        </>
      ));
    } else if (MessageTypes.IMAGE === type) {
      return JSON.parse(content).map((content) => (
        <>
          {isOwn ? (
            <FileDownloadIcon
              className={classConversation.icon_more}
              onClick={() => handleDownloadFile(content)}
            />
          ) : null}
          <ImageItem isOwn={isOwn} content={content} />
          {!isOwn ? (
            <FileDownloadIcon
              className={classConversation.icon_more}
              onClick={() => handleDownloadFile(content)}
            />
          ) : null}
        </>
      ));
    } else if (MessageTypes.CALL === type) {
      return <Text isOwn={isOwn} content={<CallEndIcon />} />;
    }
  };

  const handleDownloadFile = (url) => {
    GetUrlImg(url);
  };
  const handleShowInfo = async () => {
    dispatch(updateUserInfo(you));
  };

  return (
    <>
      <Container isOwn={isOwn} id={id}>
        <Box
          sx={{
            maxWidth: 400,
            display: "flex",
            flexWrap: "wrap",
            justifyConten: "start",
          }}
        >
          {!props.isOwn && (
            <Box>
              <Avatar src={avatar} onClick={handleShowInfo} />
            </Box>
          )}
          {getItem(props)}
        </Box>
      </Container>
    </>
  );
};

export default Index;
