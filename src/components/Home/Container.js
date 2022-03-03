import { Box } from "@mui/system";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useDispatch, useSelector } from "react-redux";
import { updateIsDesktop } from "../../actions/Main";
import LeftBar from "../LeftBar";
import ContentLeft from "../ContentLeft";
import ContentRight from "../ContentRight";
import ProfileUser from "../../components/profile";
import storage from "../../utils/storage";
import CallRinging from "../UIringingcall";
import PopupAddfriend from "../PopupAddfriend";
import PopupAddGroup from "../PopupAddGroup";
import AuthenService from "../../services/authentication";
import { useEffect } from "react";
const Home = () => {
  const dispatch = useDispatch();
  const { isShowIncomingCall } = useSelector((state) => state.tokbox);
  const { showFindAddFriend, showFindAddGroup } = useSelector(
    (state) => state.main
  );
  const user = storage.getUserInfo();
    useEffect(() => {
      AuthenService.getUserInfo(user._id).then((data) => {
        if (!data.data.verify) {
          window.location.href = "/verify";
        }
      });
    }, []);

  return (
    <Box sx={{ display: "flex" }}>
      <LeftBar />
      <ContentLeft />
      <ContentRight />
      <ProfileUser />
      {showFindAddFriend && <PopupAddfriend />}
      {showFindAddGroup && <PopupAddGroup />}
      {isShowIncomingCall && <CallRinging data={isShowIncomingCall} />}
    </Box>
  );
};

export default Home;
