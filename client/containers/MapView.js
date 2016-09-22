import React from 'react';
//import {GoogleApiWrapper} from 'google-maps-react';
import Map from '../components/mapview/Map';
import Marker from '../components/mapview/Marker';
import InfoWindow from '../components/mapview/InfoWindow';
import { connect } from 'react-redux';

export class MapView extends React.Component {
  constructor(props) {
    super(props);
    this.onMarkerClick = this.onMarkerClick.bind(this);
    this.onMapClick = this.onMapClick.bind(this);
    this.onInfoWindowClose = this.onInfoWindowClose.bind(this);

    this.state = {
      // events: [
      //   {name: 'Church', key: 123424, position: {lat: 40.7726241, lng: -111.8923509}},
      //   {name: 'Convention Center', key: 25467456, position: {lat: 40.7668879, lng: -111.8961526}},
      //   {name: 'Mazza', key: 345675467, position: {lat: 40.7494759, lng: -111.8649065}}
      // ],
      showingInfoWindow: false,
      activeMarker: {},
      selectedEvent: {name:'', position:''}
    };
  }

  onMapClick() {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  }

  onInfoWindowClose() {
    this.setState({
      showingInfoWindow: false,
      activeMarker: null
    })
  }

  onMarkerClick(props, marker, e) {
    this.setState({
      selectedEvent: props,
      activeMarker: marker,
      showingInfoWindow: true
    });
  }

  render() {
    let myMarkers = this.props.events.map(event => (
      <Marker key={event._id} id={event._id} onClick={this.onMarkerClick} name={event.title} lat={parseFloat(event.lat)} lng={parseFloat(event.lng)} />
    ));

    if(!this.props.loaded) {
      return <div>Loading...</div>
    }

    return (
      <div className="mapContainer">
        <Map google={this.props.google} onClick={this.onMapClick}>
          {myMarkers}
          <InfoWindow
            marker={this.state.activeMarker}
            visible={this.state.showingInfoWindow}
            onClose={this.onInfoWindowClose}>
            <div>
              <p>{this.state.selectedEvent.name}</p>
              <p>Lat: {this.state.selectedEvent.lat}</p>
              <p>Lat: {this.state.selectedEvent.lng}</p>
            </div>
          </InfoWindow>
        </Map>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return { events: state.events };
};

export default connect(mapStateToProps)(MapView);

// export default GoogleApiWrapper({
//   apiKey: "AIzaSyBVclnbSo5qaDo0AUjCAHn7C0b_YGCBdWM"
// })(MapView)
