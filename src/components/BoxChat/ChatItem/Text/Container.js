import { Typography } from "@mui/material";
import { Box, styled } from "@mui/system";
import { setURL } from "../../../../utils/helper";
import useStyle from "./style";

const Index = (props) => {
  const classes = useStyle();
  return (
    <>
      <Box className={classes.content}>
        <Box className={props.isOwn ? classes.content_me : classes.content_you}>
          {typeof props.content === "string" ? (
            <Typography
              dangerouslySetInnerHTML={{ __html: setURL(props.content || "") }}
              id="link-message"
            />
          ) : (
            <Typography id="link-message">{props.content}</Typography>
          )}
        </Box>
      </Box>
    </>
  );
};

export default Index;
