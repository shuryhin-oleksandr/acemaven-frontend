import React from "react";
import { Outer } from "./rates-style";
import makeStyles from "@material-ui/core/styles/makeStyles";
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import Tooltip from "@material-ui/core/Tooltip";
import plane_surcharge from "../../../../assets/icons/rates&services/plane-surcharge.svg";
import styled from "styled-components";
import sort_arrows from "../../../../assets/icons/rates&services/sort_arrows.svg";
import search_icon from "../../../../assets/icons/rates&services/search_loop.svg";
import template_icon from "../../../../assets/icons/rates&services/template.svg";
import pause_icon from "../../../../assets/icons/rates&services/pause.svg";

const useStyles = makeStyles({
  container: {
    boxShadow: "none",
  },
  table: {
    "& .MuiTableHead-root": {},
  },
  shipping_cell: {
    width: "220px",
    color: "#115B86",
    fontFamily: "Helvetica Bold",
    fontSize: "16px",
    borderBottom: "1px solid #828282",
    paddingLeft: "63px",
    padding: "0",
  },
  cell: {
    color: "#115B86",
    fontFamily: "Helvetica Bold",
    fontSize: "16px",
    borderBottom: "1px solid #828282",
    padding: "0",
    paddingBottom: "15px",
  },
  innerMainCell: {
    borderBottom: "1px solid #BDBDBD",
    fontFamily: "Helvetica Light",
    fontSize: "16px",
    color: "#1B1B25",
    position: "relative",
    paddingLeft: "63px",
    height: "72px",
  },
  innerCell: {
    borderBottom: "1px solid #BDBDBD",
    fontFamily: "Helvetica Light",
    fontSize: "16px",
    color: "#1B1B25",
    height: "72px",
    padding: "0",
  },
  customTooltip: {
    maxWidth: 330,
    height: 60,
    fontFamily: 'Helvetica Reg',
    fontSize: '14px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '15px'
  },
});

const RatesPage: React.FC = () => {
  const classes = useStyles();

  function createData(
    shipping_mode: string,
    carrier: string,
    origin: string,
    destination: string,
    exp_date: string
  ) {
    return { shipping_mode, carrier, origin, destination, exp_date };
  }

  const rows = [
    createData(
      "Loose Cargo/RORO",
      "BestAmericanairlines Co.",
      "SSZ",
      "BCN",
      "12/10/2020 "
    ),
    createData(
      "Loose Cargo/RORO",
      "BestAmericanairlines Co.",
      "SSZ",
      "BCN",
      "12/10/2020 "
    ),
    createData(
      "FCL",
      "PerfectAmericanairlines Co.",
      "SSZ",
      "BCN",
      "12/10/2020"
    ),
    createData(
      "Loose Cargo/RORO",
      "BestAmericanairlines Co.",
      "SSZ",
      "BCN",
      "12/10/2020 "
    ),
  ];

  return (
    <Outer>
      <TableContainer className={classes.container} component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell className={classes.cell} align="left" />
              <TableCell className={classes.cell} align="left">
                <div style={{ display: "flex" }}>
                  SHIPPING MODE
                  <SortButton>
                    <img src={sort_arrows} alt="" />
                  </SortButton>
                  <SearchButton>
                    <img src={search_icon} alt="" />
                  </SearchButton>
                </div>
              </TableCell>
              <TableCell className={classes.cell} align="left">
                <div style={{ display: "flex" }}>
                  CARRIER
                  <SortButton>
                    <img src={sort_arrows} alt="" />
                  </SortButton>
                  <SearchButton>
                    <img src={search_icon} alt="" />
                  </SearchButton>
                </div>
              </TableCell>
              <TableCell className={classes.cell} align="left">
                <div style={{ display: "flex" }}>
                  Origin
                  <SortButton>
                    <img src={sort_arrows} alt="" />
                  </SortButton>
                  <SearchButton>
                    <img src={search_icon} alt="" />
                  </SearchButton>
                </div>
              </TableCell>
              <TableCell className={classes.cell} align="left">
                <div style={{ display: "flex" }}>
                  Destination
                  <SortButton>
                    <img src={sort_arrows} alt="" />
                  </SortButton>
                  <SearchButton>
                    <img src={search_icon} alt="" />
                  </SearchButton>
                </div>
              </TableCell>
              <TableCell className={classes.cell} align="left">
                <div style={{ display: "flex" }}>EXPIRATION DATE</div>
              </TableCell>
              <TableCell className={classes.cell} align="left">
                <div style={{ display: "flex" }}>ACTIONS</div>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.shipping_mode}>
                <TableCell
                  className={classes.innerMainCell}
                  align="left"
                  component="th"
                  scope="row"
                >
                  <ModeIcon src={plane_surcharge} alt="" />
                </TableCell>
                <TableCell className={classes.innerCell} align="left">
                  {" "}
                  <SpanMode>{row.shipping_mode}</SpanMode>
                </TableCell>
                <TableCell className={classes.innerCell} align="left">
                  <span>{row.carrier}</span>
                </TableCell>
                <TableCell className={classes.innerCell} align="left">
                  {row.origin}
                </TableCell>
                <TableCell className={classes.innerCell} align="left">
                  {row.destination}
                </TableCell>
                <TableCell className={classes.innerCell} align="left">
                  {row.exp_date}
                </TableCell>
                <TableCell className={classes.innerCell} align="left">
                  <div style={{ display: "flex" }}>
                    <Tooltip
                      arrow
                      title="Rates can be paused or reactivated using this button."
                      classes={{ tooltip: classes.customTooltip }}
                    >
                      <TemplateIcon>
                        <img src={pause_icon} alt="" />
                      </TemplateIcon>
                    </Tooltip>
                    <Tooltip
                      arrow
                      title="Use this registry as a template for a new rate, with the same values and parameters."
                      classes={{ tooltip: classes.customTooltip }}
                    >
                      <TemplateIcon>
                        <img src={template_icon} alt="" />
                      </TemplateIcon>
                    </Tooltip>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Outer>
  );
};

export default RatesPage;

const ModeIcon = styled.img`
  position: absolute;
  left: 0;
  top: 22%;
`;
const SearchButton = styled.button`
  padding: 0;
  outline: none;
  border: none;
  background: none;
  margin: 0 5px;
  display: flex;
  align-items: center;
  img {
  }
`;
const SortButton = styled(SearchButton)``;

const TemplateIcon = styled(SearchButton)``;
const SpanMode = styled.div`
  transition: 0.3s;
  &:hover {
    cursor: pointer;
    text-decoration: underline;
    transition: 0.3s;
  }
`;
