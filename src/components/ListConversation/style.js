import { makeStyles } from "@mui/styles";

const useStyle = makeStyles((theme) => ({
  container: {
    height: "90vh",
    overflowY: "scroll",
    overflowX: "hidden",
    "&::-webkit-scrollbar": {
      width: 5,
    },
  },

  item_wraper: {
    width: "100%",
    height: 68,
    display: "flex",
    alignItems: "center",
    position: "relative",
    "&:hover": {
      background: "#f4f5f7",
      "& $icon_more": {
        opacity: "1",
        visibility: "visible",
      },
    },
  },
  item_img_wraper: {
    padding: "10px 12px",
  },
  item_content_wraper: {
    width: "calc( 100% - 88px )",
    paddingRight: "16px",
    // display: "flex",
    // flexDirection: "column",
  },
  text_wraper: {
    width: "80%",
    "&>p": {
      textAlign: "left",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
      overflow: "hidden",
      wordWrap: "break-word",
      color: "#001a33",
      fontSize: "14px",
      lineHeight: "18px",
      color: "#72808e",
    },
  },
  time_wraper: {
    fontWeight: 400,
    textAlign: "left",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    overflow: "hidden",
    wordWrap: "break-word",
    color: "#72808e",
  },
  icon_more: {
    fontSize: "24px",
    fontWeight: 400,
    textAlign: "left",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    overflow: "hidden",
    wordWrap: "break-word",
    color: "#72808e",
    opacity: "0",
    visibility: "hidden",
    transition: "all 0.6s ease",
    cursor: "pointer",
  },
  nameWraper: {
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    width: "130px",
  },
  noRead: {
    background: "#f4f5f7",
  },
  styleSubAvatar: {
    position: "relative",
    bottom: "4px",
    right: "4px",
  },
}));

export default useStyle;
