import React from "react";
import NavBar from "./components/NavBar.jsx";
import WeatherStat from "./components/WeatherStat.jsx";
import CurrentWeather from "./components/CurrentWeather.jsx";
import "antd/dist/antd.css";
import axios from "axios";
import Load from './components/Loading.jsx'
import { Switch, Route } from "react-router-dom";
import "./styles.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: "",
      city: "",
      min_temp: "",
      max_temp: "",
      humidity: "",
      isLoading: true
    };
  }


  componentDidMount() {

    axios.get(
      "http://api.openweathermap.org/data/2.5/group?id=925475,931755,927967,923295&units=metric&APPID=47173cae29386c36db52a1678fb5c144"
    )
      .then(weatherData => {
        this.setState({
          data: weatherData.data,
          isLoading: false
        })
      }
      )
  }

  temperatureChart = () => {
    const { data } = this.state
    if (!data) {
      return <Load />
    }

    const filtered = data.list.flatMap(data => [data.name, data.main]
    )
    console.log(filtered)
  }

  render() {
    const { isLoading, data } = this.state
    console.log(data)
    return (
      <div className="App">
        <NavBar />
        {isLoading ? <Load /> :
          <Switch>
            <Route path="/stat" exact component={() =>
              <WeatherStat>
                <h2>Hello</h2>
              </WeatherStat>
            } />
            <Route path="/current" exact component={CurrentWeather} />
          </Switch>
        }

      </div>
    );

  }
}

export default App