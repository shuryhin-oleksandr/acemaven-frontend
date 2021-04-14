import React, { ReactElement, useState } from "react";
//moment js
import moment from "moment";
//react-google-maps
import { withGoogleMap, GoogleMap, Polyline } from "react-google-maps";
import InfoBox from "react-google-maps/lib/components/addons/InfoBox";

//helpers
import { polylineIcons } from "../../../../_BLL/helpers/tracker/GetIconsForPolylineGoogleMap";
import { manualPolyline } from "../../../../_BLL/helpers/tracker/manualPolyline";
import styled from "styled-components";

interface Interface {
  isMarkerShown?: boolean;
  loadingElement?: ReactElement;
  containerElement: ReactElement;
  mapElement: ReactElement;
  events: any;
}

const MapComponent: React.FC<Interface> = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <GoogleMap
      options={{
        disableDefaultUI: true,
        minZoom: 3,
        restriction: {
          strictBounds: true,
          latLngBounds: {
            north: 85,
            south: -85,
            east: 180,
            west: -180,
          },
        },
      }}
      defaultZoom={3}
      defaultCenter={{ lat: -3.731862, lng: -38.526669 }}
    >
      {props.events &&
        props.events.length > 0 &&
        props.events.map((ev: any) => (
          <div key={ev.aceid}>
            {isOpen && (
              <InfoBox
                defaultPosition={
                  new google.maps.LatLng(
                    ev?.locations
                      ? ev?.locations[ev?.locations?.length - 1]?.lat
                      : ev?.destination?.latitude,
                    ev?.locations
                      ? ev?.locations[ev?.locations?.length - 1]?.lng
                      : ev?.destination?.longitude
                  )
                }
                options={{
                  closeBoxURL: ``,
                  enableEventPropagation: true,
                  pixelOffset: new google.maps.Size(10, 15),
                }}
              >
                <InfoBoxWrapper>
                  <LabelsWrapper>
                    <InfoBoxLabel style={{ marginBottom: 5 }}>
                      ACEID:
                    </InfoBoxLabel>
                    {ev.booking_number && (
                      <InfoBoxLabel style={{ marginBottom: 5 }}>
                        BOOKING ID:
                      </InfoBoxLabel>
                    )}
                    <InfoBoxLabel>ROUTE:</InfoBoxLabel>
                  </LabelsWrapper>
                  <div>
                    <InfoBoxValue style={{ marginBottom: 5 }}>
                      {ev.aceid}
                    </InfoBoxValue>
                    {ev.booking_number && (
                      <InfoBoxValue style={{ marginBottom: 5 }}>
                        {ev.booking_number}
                      </InfoBoxValue>
                    )}
                    <InfoBoxValue>
                      {ev.origin_code} - {ev.destination_code}
                    </InfoBoxValue>
                  </div>
                </InfoBoxWrapper>
              </InfoBox>
            )}

            <Polyline
              path={[
                { lat: ev?.origin?.latitude, lng: ev?.origin?.longitude },
                //...ev?.locations,
                {
                  lat: ev?.destination?.latitude,
                  lng: ev?.destination?.longitude,
                },
              ]}
              options={{
                geodesic: true,
                strokeColor: "rgba(255,255,255,.09)",
                strokeOpacity: 1.0,
                strokeWeight: 15,
                icons: ev?.locations
                  ? polylineIcons({
                      start: {
                        lat: ev?.origin?.latitude,
                        lng: ev?.origin?.longitude,
                      },
                      end: {
                        lat: ev?.destination?.latitude,
                        lng: ev?.destination?.longitude,
                      },
                      now: {
                        lat: ev?.locations[ev?.locations?.length - 1]?.lat,
                        lng: ev?.locations[ev?.locations?.length - 1]?.lng,
                      },
                      typeTransportation: ev?.shipping_type,
                      processType: ev?.direction,
                    })
                  : manualPolyline(
                      ev?.shipping_type,
                      ev?.direction,
                      ev?.actual_date_of_departure
                        ? ev?.actual_date_of_departure
                        : ev?.date_of_departure,
                      ev?.actual_date_of_arrival
                        ? ev?.actual_date_of_arrival
                        : ev?.date_of_arrival,
                      moment(new Date()).format("DD/MM/YYYY")
                    ),
              }}
              onMouseOver={() => {
                setIsOpen(true);
              }}
              onMouseOut={() => {
                setIsOpen(false);
              }}
            />
          </div>
        ))}
    </GoogleMap>
  );
};

export default withGoogleMap(MapComponent);

const InfoBoxLabel = styled.div`
  font-family: "Helvetica Neue", sans-serif;
  font-size: 12px;
  color: #000000;
  line-height: 1;
  white-space: nowrap;
`;
const InfoBoxValue = styled.div`
  font-family: "Helvetica Light", sans-serif;
  font-size: 12px;
  color: #1b1b25;
  line-height: 1;
  white-space: nowrap;
`;

const InfoBoxWrapper = styled.div`
  background-color: rgba(255, 255, 255, 0.9);
  border: 1px solid #bdbdbd;
  box-sizing: border-box;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  padding: 15px;
  cursor: default;
  display: flex;
  opacity: 0.9;
`;

const LabelsWrapper = styled.div`
  margin-right: 7px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;
