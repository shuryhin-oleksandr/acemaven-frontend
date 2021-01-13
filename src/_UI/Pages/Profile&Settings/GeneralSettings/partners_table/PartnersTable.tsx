import React, { useEffect } from "react";
import PartnersCard from "./PartnersCard";
import { useDispatch, useSelector } from "react-redux";
import { getPartnersThunk } from "../../../../../_BLL/thunks/search_client_thunks/searchClientThunks";
import { AppStateType } from "../../../../../_BLL/store";
import ScrollbarStyled from "../../../../components/_commonComponents/ScrollbarStyled/ScrollbarStyled";

type PropsType = {};

const PartnersTable: React.FC<PropsType> = () => {
  let dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPartnersThunk());
  }, []);

  let partners = useSelector((state: AppStateType) => state.search.partners);

  return (
    <ScrollbarStyled
      {...{
        style: { width: "100%" },
        autoHeightMin: 419,
        autoHeightMax: "calc(100vh - 341px)",
        autoHeight: true,
      }}
    >
      {partners.map((p) => (
        <PartnersCard partner={p} key={p.id} />
      ))}
    </ScrollbarStyled>
  );
};

export default PartnersTable;
