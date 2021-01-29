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
            "M-10 -23C-17.1797 -23 -23 -17.1797 -23 -10C-23 -2.8203 -17.1797 3 -10 3C-2.8203 3 3 -2.8203 3 -10C3 -17.1797 -2.8203 -23 -10 -23ZM-25 -10C-25 -18.2843 -18.2843 -25 -10 -25C-1.71573 -25 5 -18.2843 5 -10C5 -1.71573 -1.71573 5 -10 5C-18.2843 5 -25 -1.71573 -25 -10Z" ,
        strokeColor: "#white",
        strokeOpacity: 1,
        fillColor: "white",
        fillOpacity: 1,
      },
      fixedRotation: true,
      offset: "0%",
    },
    {
      icon: {
        path:
            "M4 -5C4 -0.0294371 -0.0294371 4 -5 4C-9.97056 4 -14 -0.0294371 -14 -5C-14 -9.97056 -9.97056 -14 -5 -14C-0.0294371 -14 4 -9.97056 4 -5Z",
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
