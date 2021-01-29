interface InterfaceFuncIcons {
  start: InterfaceCoords;
  end: InterfaceCoords;
}

interface InterfaceCoords {
  lat: number;
  lng: number;
}

export const polylineBillingMapIcons = (props: InterfaceFuncIcons) => {
  return [
    {
      icon: {
        path: "M 0,-1.2 0,1.2",
        strokeOpacity: 1,
        strokeWeight: 9,
        strokeColor: "rgba(90,90,90,0.1)",
        scale: 5,
      },
      offset: "0",
      repeat: "30px",
    },
    {
      icon: {
        path: "M 0,-1 0,1",
        strokeOpacity: 1,
        strokeColor: "white",
        scale: 3,
      },
      offset: "0",
      repeat: "30px",
    },

    {
      icon: {
        path:
            "M-9.06667 -3C-9.06667 -6.35053 -6.35053 -9.06667 -3 -9.06667C0.350527 -9.06667 3.06667 -6.35053 3.06667 -3C3.06667 0.350527 0.350527 3.06667 -3 3.06667C-6.35053 3.06667 -9.06667 0.350527 -9.06667 -3ZM-3 -10C-6.86599 -10 -10 -6.86599 -10 -3C-10 0.865993 -6.86599 4 -3 4C0.865993 4 4 0.865993 4 -3C4 -6.86599 0.865993 -10 -3 -10ZM-3.0002 1.20078C-0.680599 1.20078 1.1998 -0.679623 1.1998 -2.99922C1.1998 -5.31881 -0.680599 -7.19922 -3.0002 -7.19922C-5.31979 -7.19922 -7.2002 -5.31881 -7.2002 -2.99922C-7.2002 -0.679623 -5.31979 1.20078 -3.0002 1.20078Z" ,
        strokeColor: "#white",
        strokeOpacity: 1,
        fillColor: "blue",
        fillOpacity: 1,
      },
      fixedRotation: true,
      offset: "0%",
    },
    {
      icon: {
        path:
            "M18 -3C18 0.865993 14.866 4 11 4C7.13401 4 4 0.865993 4 -3C4 -6.86599 7.13401 -10 11 -10C14.866 -10 18 -6.86599 18 -3Z",
        strokeColor: "#FFC8C8",
        strokeOpacity: 1,
        fillColor: "#FFC8C8",
        fillOpacity: 1,
      },
      fixedRotation: true,
      offset: "100%",
    },
  ];
};
