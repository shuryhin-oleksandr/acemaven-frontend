import moment from "moment/moment";


export const smallManualPolylineIcons = ( processType: string, start: string, end: string, now: string) => {
    //incoming dates
    let s = moment(start.slice(6)).format('DD/MM/YYYY')
    let e = moment(end.slice(6)).format('DD/MM/YYYY')
    let n = moment(now, 'DD/MM/YYYY').toDate()

    //shipment numbers
    let shipment_start = moment(s, 'DD/MM/YYYY').toDate()
    let shipment_end = moment(e, 'DD/MM/YYYY').toDate()
    let shipment_duration = moment(shipment_end).diff(moment(shipment_start), 'days')
    let passedDaysFromStart = moment(n).diff(moment(shipment_start), 'days')

    //offset for current icon position
    let offsetHelper = () => {
        if(passedDaysFromStart > 0 && passedDaysFromStart < shipment_duration) {
            return (((passedDaysFromStart / shipment_duration) * 100).toFixed(0) + '%')
        }
        if(passedDaysFromStart < 0) {
            return '0%'
        } else if(passedDaysFromStart >= shipment_duration){
            return '100%'
        } else return '0%'
    }
    let offset = offsetHelper()
    console.log(offset)

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
        ...iconTransportation
    ]
}