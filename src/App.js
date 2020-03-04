import React from "react";
import NavBar from "./components/NavBar.jsx";
import WeatherStat from "./components/WeatherStat.jsx";
import CurrentWeather from "./components/CurrentWeather.jsx";
import "antd/dist/antd.css";
import axios from "axios";
import Load from './components/Loading.jsx'
import CardComponent from './components/CardComponent.jsx'
import Chart from './components/Chart.jsx'
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

    const cityTemp = {
      name: [],
      cityTemparature: []
    }
    data.list.map(temperature => {
      cityTemp.cityTemparature.push(temperature.main.temp)
      cityTemp.name.push(temperature.name)
    }
    )

    const dataPoints = [{
      title: "bar",
      dataPoints: [
        { y: cityTemp.cityTemparature[0], label: cityTemp.name[0] },
        { y: cityTemp.cityTemparature[1], label: cityTemp.name[1] },
        { y: cityTemp.cityTemparature[2], label: cityTemp.name[2] },
        { y: cityTemp.cityTemparature[3], label: cityTemp.name[3] }

      ]
    }
    ]
    return <Chart title="TEMPERATURE IN FOUR CITIES" xTitle="cities" yTitle="temperature" data={dataPoints} />
  }

  render() {
    const { isLoading } = this.state
    
    return (
      <div className="App">
        <NavBar />
        {isLoading ? <Load /> :
          <Switch>
            <Route path="/stat" exact component={() =>
              <WeatherStat>
                <CardComponent chartOne={this.temperatureChart()} titleOne={"temperature comparisons"} chartTwo={null} titleTwo={null} chartThree={null} titleThree={null} />
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