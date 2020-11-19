import React from "react";
import {Scrollbars} from "react-custom-scrollbars";
import {makeStyles} from "@material-ui/core/styles";

export const useStyles = makeStyles(() => ({
  trackVertical: {
    backgroundColor: "#ECECEC",
    top: "2px",
    bottom: "2px",
    right: "2px",
    borderRadius: "3px"
  },
  thumbVertical: {
    backgroundColor: `#115B86`,
    position: "relative",
    display: "block",
    width: "100%",
    cursor: "pointer",
    borderRadius: "inherit"
  },
  trackHorizontal: {
    backgroundColor: "#ECECEC",
    height: "6px",
    left: "2px",
    bottom: "2px",
    right: "2px",
    borderRadius: "3px"
  },
  thumbHorizontal: {
    backgroundColor: `#115B86`,
    position: "relative",
    display: "block",
    width: "100%",
    cursor: "pointer",
    borderRadius: "inherit"
  },
}));

type PropsType = {
}

const ScrollbarStyled:React.FC<PropsType> = (props: any) => {
  const classes = useStyles();
  return (
      <Scrollbars
        renderThumbHorizontal={props => <div {...props} className={classes.thumbHorizontal}/>}
        renderThumbVertical={props => <div {...props} className={classes.thumbVertical}/>}
        renderTrackHorizontal={props => <div {...props} className={classes.trackHorizontal}/>}
        renderTrackVertical={props => <div {...props} className={classes.trackVertical}/>}
        style={props.style}
        hideTracksWhenNotNeeded={true}
      >
        {props.children}
      </Scrollbars>
  )
}

export default ScrollbarStyled;