import React from 'react'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import Loader from 'react-loader-spinner'

export default function componentName() {
    return (
        <React.Fragment>
            <Loader
                type="Oval"
                color="#00BFFF"
                height={100}
                width={100}
            />
            <h3>Loading...</h3>
        </React.Fragment>
    );
}


