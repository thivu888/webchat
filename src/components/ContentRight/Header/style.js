import { makeStyles } from "@mui/styles";

const useStyle = makeStyles(({ theme }) => ({
  IconWraper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "end",
    width: 150,
    position: "absolute",
    right: "20px",
    "&>div": {
      width: 28,
      height: 28,
      "&>svg:hover": {
        cursor: "pointer",
        borderRadius: "2px",
        background: "#bdbdbd4d",
      },
    },
  },
  avatarWraper: {
    padding: "10px 0",
    marginLeft: 20,
    "&>div": {
      width: 48,
      height: 48,
    },
  },
  name: {
    color: "001a33",
    fontSize: 18,
    fontWeight: 600,
  },
  timeAgo: {
    fontSize: 14,
    color: "#72808e",
  },
  info: {
    display: "flex",
    flexDirection: "column",
  },
  input: {
    width: "100%",
    height: 36,
    padding: "16px 8px 16px 16px",
    borderRadius: 20,
    border: "none",
    background: "white",
    fontSize: 14,
    color: "#283754",
    "& ::placeholder": {
      color: "#9E9E9E",
    },
  },
  containerInput: {
    width: "100%",
    border: "none",
  },
  container: {
    width: "50%",
    background: "#F5F8FC",
    padding: " 12px 16px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    flex: "1",
    "& .MuiInput-underline:after": {
      border: "none",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        border: "none",
      },
      "&:hover fieldset": {
        border: "none",
      },
      "&.Mui-focused fieldset": {
        border: "none",
      },
    },
  },
}));

export default useStyle;
