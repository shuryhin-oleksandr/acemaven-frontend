import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Tooltip } from "@material-ui/core";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Arrow from "../../assets/icons/selectArrow.svg";
import ArrowOpened from "../../assets/icons/selectArrowOpened.svg";
const useStyles = makeStyles({
  customTooltip: {
    "& .MuiTooltip-arrow::before": {
      backgroundColor: "rgba(59, 59, 65, 0.9)",
    },
    maxWidth: 330,
    fontFamily: "Helvetica Reg",
    fontSize: "14px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "15px",
    backgroundColor: "rgba(59, 59, 65, 0.9)",
  },
});

const ConditionSelect = ({
  options,
  name,
  setValue,
  defaultV,
  setFormMode,
}) => {
  const [boxVisible, setBoxVisible] = useState(false);
  const [displayValue, setDisplayValue] = useState(defaultV);
  const classes = useStyles();
  const Listener = () => {
    setBoxVisible(false);
  };
  useEffect(() => {
    document.addEventListener("click", Listener);
    setValue(name, defaultV);

    return () => {
      document.removeEventListener("click", Listener);
    };
  }, []);
  return (
    <Wrapper
      onClick={(e) => {
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
        !!setFormMode && setFormMode(true);
        setBoxVisible(!boxVisible);
      }}
    >
      <Main>{displayValue}</Main>
      {boxVisible && (
        <Box>
          {options.map((o) => (
            <Tooltip
              classes={{ tooltip: classes.customTooltip }}
              arrow={true}
              placement={"bottom-start"}
              key={o.id}
              title={o.tooltip}
            >
              <StyledOption
                onClick={() => {
                  setDisplayValue(o.title);
                  setBoxVisible(false);
                  setValue(name, o.title);
                }}
              >
                {o.title}
              </StyledOption>
            </Tooltip>
          ))}
        </Box>
      )}
      <ArrowImg src={boxVisible ? ArrowOpened : Arrow} alt="" />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
`;
const Main = styled.div`
  padding: 10px;
  color: #828282;
  font-size: 14px;
  font-family: "Helvetica Light", sans-serif;
  line-height: 17px;
  -webkit-transition: 0.5s;
  transition: 0.5s;
  width: 155px;
  height: 40px;
  border: 1px solid #bdbdbd;
  border-radius: 4px;
  outline: none;
  background: white;
  overflow: hidden;
`;

const Box = styled.div`
  position: absolute;
  top: 45px;
  min-width: 100%;
  background-color: white;
  z-index: 100;
  box-shadow: 0 5px 5px -3px rgba(0, 0, 0, 0.2),
    0px 8px 10px 1px rgba(0, 0, 0, 0.14), 0px 3px 14px 2px rgba(0, 0, 0, 0.12);
  border-radius: 4px;
  padding: 8px 2px;
`;

const StyledOption = styled.div`
  padding: 6px 16px;
  cursor: pointer;
  border-radius: 4px;
  font-family: "Helvetica Neue", sans-serif;
  color: #7c7c89;
  &:hover {
    background-color: #115b86;
    color: white;
  }
`;

const ArrowImg = styled.img`
  position: absolute;
  top: 18px;
  right: 20px;
  width: 10px;
`;

export default ConditionSelect;
