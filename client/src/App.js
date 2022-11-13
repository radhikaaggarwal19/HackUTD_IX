import './App.css';
//import Users from './components/User';

//const API_KEY = `${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`;

function App() {
    return (
        navigator.geolocation.getCurrentPosition(success, error, options)
    );
}

const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
};

function success(pos) {
    const crd = pos.coords;

    console.log('Your current position is:');
    console.log(`Latitude : ${crd.latitude}`);
    console.log(`Longitude: ${crd.longitude}`);
    console.log(`More or less ${crd.accuracy} meters.`);
}

function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
}


export default App;
