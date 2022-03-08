import { makeStyles } from "@mui/styles";

const useStyle = makeStyles(({ theme }) => ({
  content: {
    maxWidth: "300px",
    marginLeft: "8px",
    borderRadius: "12px",
    overflow: "hidden",
    "&>div": {
      whiteSpace: "pre-wrap",
    },
  },
  content_you: {
    background: "#e4e6eb",
    wordBreak: "break-word",
    padding: "8px 16px",
    overflow: "hidden",
  },
  content_me: {
    background: "#0084ff",
    wordBreak: "break-word",
    padding: "8px 16px",
    color: "#fff",
    overflow: "hidden",
  },
}));

export default useStyle;
