import React from "react";
import { Layout } from 'antd'
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

const { Footer } = Layout

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

  searchCityCountry = async (event) => {
    event.preventDefault()
    let country = document.getElementById("country").value
    let city = document.getElementById("city").value

    await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=47173cae29386c36db52a1678fb5c144`)
      .then(city => {
        this.setState({
          city: city.data,
          isLoading: false
        })
      })

    if (!this.state.city) {
      return <Load />
    }

    console.log(this.state.city)
  }

  handleCityOnChange = event => {
    let value = event.target.value
    return value
  }

  handleCountryOnChange = event => {
    let value = event.target.value
    return value
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
      return null
    }
    )
    const dataPoints = [{
      type: "bar",
      dataPoints: [
        { y: cityTemp.cityTemparature[0], label: cityTemp.name[0] },
        { y: cityTemp.cityTemparature[1], label: cityTemp.name[1] },
        { y: cityTemp.cityTemparature[2], label: cityTemp.name[2] },
        { y: cityTemp.cityTemparature[3], label: cityTemp.name[3] }

      ]
    }
    ]
    return <Chart title="TEMPERATURE IN FOUR CITIES" xTitle="cities" yTitle="temperature in degrees" data={dataPoints} />
  }

  humidityChart = () => {
    const { data } = this.state
    if (!data) {
      return <Load />
    }

    const cityHumidity = {
      name: [],
      cityHumidity: []
    }
    data.list.map(humidity => {
      cityHumidity.cityHumidity.push(humidity.main.humidity)
      cityHumidity.name.push(humidity.name)
      return null
    }
    )
    const dataPoints = [{
      type: "spline",
      dataPoints: [
        { y: cityHumidity.cityHumidity[0], label: cityHumidity.name[0] },
        { y: cityHumidity.cityHumidity[1], label: cityHumidity.name[1] },
        { y: cityHumidity.cityHumidity[2], label: cityHumidity.name[2] },
        { y: cityHumidity.cityHumidity[3], label: cityHumidity.name[3] }

      ]
    }
    ]
    return <Chart title="HUMIDITY IN THREE CITIES" xTitle="cities" yTitle="humidity (in %)" data={dataPoints} />
  }

  pressureChart = () => {
    const { data } = this.state
    if (!data) {
      return <Load />
    }
    const cityPressure = {
      name: [],
      cityPressure: []
    }
    data.list.map(humidity => {
      cityPressure.cityPressure.push(humidity.main.pressure)
      cityPressure.name.push(humidity.name)
      return null
    }
    )

    const dataPoints = [{
      type: "spline",
      dataPoints: [
        { y: cityPressure.cityPressure[0], label: cityPressure.name[0] },
        { y: cityPressure.cityPressure[1], label: cityPressure.name[1] },
        { y: cityPressure.cityPressure[2], label: cityPressure.name[2] },
        { y: cityPressure.cityPressure[3], label: cityPressure.name[3] }

      ]
    }
    ]
    return <Chart title=" PRESSURE IN THREE CITIES" xTitle="cities" yTitle="pressure (in hpA)" data={dataPoints} />
  }

  render() {
    const { isLoading } = this.state

    return (
      <div className="App">
        <NavBar SeachWeather={this.searchCityCountry} handleCityOnChange={this.handleCityOnChange} handleCountryOnChange={this.handleCountryOnChange} cityId="city" countryId="country" />
        {isLoading ? <Load /> :
          <Switch>
            <Route path="/stat" exact component={() =>
              <WeatherStat>
                <CardComponent chartOne={this.temperatureChart()} titleOne={"temperature comparisons"} chartTwo={this.humidityChart()} titleTwo="humidity comparisons" chartThree={this.pressureChart()} titleThree={"pressure grapgh"} />
                <CardComponent chartOne={null} titleOne={null} chartTwo={null} titleTwo={null} chartThree={null} titleThree={null} />
              </WeatherStat>
            } />
            <Route path="/current" exact component={CurrentWeather} />
          </Switch>
        }

        <Footer>
          <h4>Contacts</h4>
          <h4>connect with us</h4>

        </Footer>

      </div>
    );

  }
}

export default App