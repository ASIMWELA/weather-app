import React from "react";
import { PageHeader } from "antd";
import { Link } from "react-router-dom";
import "./NavBar.css";

export default function NavBar() {
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
          </Link>
                ]}
            />
        </div>
    );
}
