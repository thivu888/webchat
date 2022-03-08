import { makeStyles } from "@mui/styles";
import iconCamera from "../../../static/images/icon-camera.svg";
import iconPicture from "../../../static/images/icon-picture.svg";
import iconSmile from "../../../static/images/icon-smile.svg";
import iconMic from "../../../static/images/icon-mic.svg";
import iconSend from "../../../static/images/icon-send-white.svg";
const useStyle = makeStyles(({ theme }) => ({
  InputWraper: {
    height: "60%",
    width: "90%",
    padding: "6px 6px",
    position: "relative",
    bottom: "6px",
    display: "flex",
    alignItems: "center",
    "&>div": {
      height: "100%",
      background: "#dbdbdb",
      borderRadius: "30px",
      borderRadiusTopLeft: "30px",
      paddingLeft: "16px",
    },
  },
  icon: {
    width: 24,
    height: 24,
    backgroundRepeat: "no-repeat",
    cursor: "pointer",
  },
  IconCamera: {
    backgroundImage: `url(${iconCamera})`,
  },
  iconPicture: {
    backgroundImage: `url(${iconPicture})`,
    marginLeft: "16px",
  },
  iconMic: {
    backgroundImage: `url(${iconMic})`,
    marginBottom: "8px",
  },
  iconSmileWraper: {
    position: "relative",
    right: 35,
    display: "flex",
  },
  iconSmile: {
    backgroundImage: `url(${iconSmile})`,
    position: "relative",
    top: 7,
    right: 5,
  },
  WrapSend: {
    backgroundColor: "#42a5f5",
    marginBottom: "8px",
    borderRadius: "50%",
    width: 30,
    height: 30,
    marginRight: 12,
    cursor: "pointer",
  },
  iconSend: {
    backgroundImage: `url(${iconSend})`,
    position: "relative",
    top: 8,
    left: 4,
  },
  chatFooterTypeWraper: {
    whiteSpace: "pre-wrap",
    position: "relative",
    display: "flex",
    width: "90%",
    margin: "0 20px",
    alignItems: "center",
    zIndex: "1000",
  },
  chatFooterType: {
    height: "auto",
    border: "1px solid #E9ECF1",
    padding: "4px 8px 4px 16px",
    width: "100%",
    borderRadius: "16px",
    backgroundColor: "#E9ECF1",
  },
}));

export default useStyle;
