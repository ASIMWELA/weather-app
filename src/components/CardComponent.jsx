import React from 'react'
import './Card.css'
import { Card, Col, Row } from 'antd'

class CardComponent extends React.Component {

    render(props) {
        return (
            <div>

                <div className="site-card-wrapper">
                    <Row gutter={16}>
                        <Col span={8}>
                            <Card title={this.props.titleOne} bordered={true}>
                                {this.props.chartOne}
                            </Card>
                        </Col>
                        <Col span={8}>
                            <Card title={this.props.titleTwo} bordered={true}>
                                {this.props.chartTwo}
                            </Card>
                        </Col>
                        <Col span={8}>
                            <Card title={this.props.titleThree} bordered={true}>
                                {this.props.chartThree}
                            </Card>
                        </Col>
                    </Row>
                </div>

            </div>
        )
    }

}

export default CardComponent

