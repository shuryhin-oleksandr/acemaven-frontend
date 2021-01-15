interface InterfaceFuncIcons {
    start: InterfaceCoords,
    end: InterfaceCoords,
    now: InterfaceCoords,
    processType: string,
    red_icon_marker: any
}

interface InterfaceCoords {
    lat: number,
    lng: number
}

export const polylineBillingMapIcons = (props: InterfaceFuncIcons) => {
    const pathValue = (value1: InterfaceCoords, value2: InterfaceCoords) => {
        return Math.sqrt((value2.lat - value1.lat) * (value2.lat -value1.lat) +
            (value2.lng - value1.lng) * (value2.lng - value1.lng))
    }
    const {red_icon_marker, start, end, now} = props;
    const passed = pathValue(start, now);
    const left = pathValue(now, end);
    const offset = passed * 100 /(passed + left) + "%";
    const iconTransportation = [{
        icon: {
            path: "",
            fillColor: "#F86565",
            fillOpacity: 1,
            width: 10,
            height: 10,
            offset: offset
        },
        fixedRotation:true,
    }]

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
                path: "M8 -1C8 3.97056 3.97056 8 -1 8C-5.97056 8 -10 3.97056 -10 -1C-10 -5.97056 -5.97056 -10 -1 -10C3.97056 -10 8 -5.97056 8 -1Z",
                strokeColor: '#F86565',
                strokeOpacity: 1,
                fillColor: '#F86565',
                fillOpacity: 1,
            },
            fixedRotation:true,
            offset: offset,
        },
        {
            icon: {
                path: "M8 -1C8 3.97056 3.97056 8 -1 8C-5.97056 8 -10 3.97056 -10 -1C-10 -5.97056 -5.97056 -10 -1 -10C3.97056 -10 8 -5.97056 8 -1Z",
                strokeColor: 'blue',
                strokeOpacity: 1,
                fillColor: 'blue',
                fillOpacity: 1,
            },
            fixedRotation:true,
            offset: "100%",
        },
        ...iconTransportation
    ]
}