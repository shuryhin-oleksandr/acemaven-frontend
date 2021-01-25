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
          "M8 -1C8 3.97056 3.97056 8 -1 8C-5.97056 8 -10 3.97056 -10 -1C-10 -5.97056 -5.97056 -10 -1 -10C3.97056 -10 8 -5.97056 8 -1Z",
        strokeColor: "#F86565",
        strokeOpacity: 1,
        fillColor: "#F86565",
        fillOpacity: 1,
      },
      fixedRotation: true,
      offset: "0%",
    },
    {
      icon: {
        path:
          "M8 -1C8 3.97056 3.97056 8 -1 8C-5.97056 8 -10 3.97056 -10 -1C-10 -5.97056 -5.97056 -10 -1 -10C3.97056 -10 8 -5.97056 8 -1Z",
        strokeColor: "blue",
        strokeOpacity: 1,
        fillColor: "blue",
        fillOpacity: 1,
      },
      fixedRotation: true,
      offset: "100%",
    },
  ];
};
