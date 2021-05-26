import React from "react";
import {Scrollbars} from "react-custom-scrollbars";
import {makeStyles} from "@material-ui/core/styles";

export const useStyles = makeStyles(() => ({
  trackVertical: {
    backgroundColor: "#ECECEC",
    top: "2px",
    bottom: "2px",
    right: "0",
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
  trackVerticalNav: {
    top: "2px",
    bottom: "2px",
    right: "2px",
    borderRadius: "3px"
  },
  thumbVerticalNav: {
    // backgroundColor: `#FFFFFF`,
    position: "relative",
    display: "block",
    width: "100%",
    cursor: "pointer",
    borderRadius: "inherit"
  },
  trackHorizontalNav: {
    height: "6px",
    left: "2px",
    bottom: "2px",
    right: "2px",
    borderRadius: "3px"
  },
  thumbHorizontalNav: {
    // backgroundColor: `#FFFFFF`,
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
  const { navBar, autoHeight, autoHeightMin, autoHeightMax } = props;
  return (
      <Scrollbars
        renderThumbHorizontal={props => <div {...props} className={navBar ? classes.thumbHorizontalNav : classes.thumbHorizontal}/>}
        renderThumbVertical={props => <div {...props} className={navBar ? classes.thumbVerticalNav : classes.thumbVertical}/>}
        renderTrackHorizontal={props => <div {...props} className={navBar ? classes.trackHorizontalNav : classes.trackHorizontal}/>}
        renderTrackVertical={props => <div {...props} className={navBar ? classes.trackVerticalNav : classes.trackVertical}/>}
        style={props.style}
        hideTracksWhenNotNeeded={true}
        autoHeight={autoHeight}
        autoHeightMin={autoHeightMin}
        autoHeightMax={autoHeightMax}
      >
        {props.children}
      </Scrollbars>
  )
}

export default ScrollbarStyled;