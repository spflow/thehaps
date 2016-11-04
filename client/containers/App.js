import React from 'react';
import { connect } from 'react-redux';
import NavBar from '../components/NavBar';
import { fetchEvents } from '../actions/event';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {

    if (!this.props.auth.isAuthenticated) {
      if (localStorage.userId && localStorage.token) {
        this.props.dispatch({
          type: 'LOGIN',
          id: localStorage.userId,
          token: localStorage.token,
          email: localStorage.email,
          username: localStorage.username
        });
      }
    }

    //fetches initial events for current day
    let startDate = moment().startOf('day').format('x');
    let endDate = moment().endOf('day').format('x');
    let maxLat = 40.785293884504796;
    let minLat = 40.703228647350485;
    let maxLng = -111.78194041035158;
    let minLng = -111.98381418964846;
    this.props.dispatch(fetchEvents(startDate, endDate, maxLat, minLat, maxLng, minLng));

  }

  render() {
    return (
      <div>
        <NavBar />
        {this.props.children}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { auth: state.auth };
};

export default connect(mapStateToProps)(App);
