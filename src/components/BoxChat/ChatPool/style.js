import { makeStyles } from "@mui/styles";

const useStyle = makeStyles(() => ({
  container: {
    display: "flex",
    flexDirection: "column",
    position: "relative",
    height: "90vh",
    overflowY: "scroll",
    overflowX: "hidden",
    padding: "0 40px 0 20px",
    "&::-webkit-scrollbar": {
      width: 8,
      opacity: 0.8,
      display: "none",
    },
    "&:hover::-webkit-scrollbar": {
      width: 8,
      opacity: 1,
      display: "block",
    },
    "&::-webkit-scrollbar-track": {
      backgroundColor: "#fff",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "#b9c0c7",
      height: "10%",
      borderRadius: "10px",
    },
  },
  iconLoading: {
    margin: "0 auto",
    width: "20px !important",
    height: "20px !important",
  },
}));

export default useStyle;
