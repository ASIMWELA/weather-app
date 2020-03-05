import React from "react";
import { PageHeader, Input, Button } from "antd";
import { Link } from "react-router-dom";
import "./NavBar.css";
import { SearchOutlined } from '@ant-design/icons'

export default function NavBar(props) {
    return (
        <div>
            <PageHeader
                className="site-page-header"
                title="Weather app"
                extra={[
                    <Link to="/stat" key={"stat"} className="link-stat">
                        WeatherStat
          </Link>,
                    <Link to="/current" key={"current"} className="link-current">
                        current
          </Link>, <Input key={"city"} id={props.cityId}
                        placeholder="enter city"
                        style={{ width: 200 }} onChange={props.handleCityOnChange}
                    />, <Input key={"country"} 
                        placeholder="enter county"
                        style={{ width: 200 }} onChange={props.handleCountryOnChange} id={props.countryId}
                    />,
                    <Button type="primary" icon={<SearchOutlined />} key={"search"} onClick={props.SeachWeather}>Search</Button>

                ]}
            />
        </div>
    );
}
