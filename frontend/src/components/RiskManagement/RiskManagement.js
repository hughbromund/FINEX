import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import Jumbotron from 'react-bootstrap/Jumbotron';
import Fade from 'react-reveal/Fade';
import ListGroup from 'react-bootstrap/ListGroup';
import Tab from 'react-bootstrap/Tab';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";


import { DarkModeContext } from "../../contexts/DarkModeContext";
import { Carousel } from "react-bootstrap";

class RiskManagement extends Component {
  render() {
    return (
      <div>
        <div>
          <Jumbotron className={this.context.isDarkMode ? "bg-dark" : "bg-light"}>
            <h1>What Is Risk?</h1>
            <p>
              Every Investment decision we make carries some chance that our asset's value go down. This chance we take is
              called risk. We're here to help you naviagate understanding risk in your investment decisions.
            </p>
          </Jumbotron>
        </div>
        <div>
          <Tab.Container id="list-group-tabs-example" defaultActiveKey="#link1">
            <Row>
              <Col sm={4}>
                <ListGroup>
                  <ListGroup.Item action href="#link1">
                    Market Risks
                  </ListGroup.Item>
                  <ListGroup.Item action href="#link2">
                    Specific Risks
                  </ListGroup.Item>
                  <ListGroup.Item action href="#link3">
                    Business Risk
                  </ListGroup.Item>
                  <ListGroup.Item action href="#link4">
                    Credit Risk
                  </ListGroup.Item>
                  <ListGroup.Item action href="#link5">
                    Political Risk
                  </ListGroup.Item>
                  <ListGroup.Item action href="#link6">
                    Interest Rate Risk
                  </ListGroup.Item>
                </ListGroup>
              </Col>
              <Col sm={8}>
                <Tab.Content>
                  <Tab.Pane eventKey="#link1">
                    <Carousel controls={false}>
                      <Carousel.Item>
                        <Card style={{ height: '20rem' }} className={this.context.isDarkMode ? "bg-dark" : "bg-light"}>
                          <Card.Body>
                            <Card.Title>
                              Market Risks
                            </Card.Title>
                            <Card.Text>
                              Market risk is probably the most broad form of risk. Factors that effect the entire economic
                              market are market risks. When the performance of the entire market shifts in a certain direction,
                              whether due to political, social, or economic causes, we call that a market risk.
                            </Card.Text>
                          </Card.Body>
                        </Card>
                      </Carousel.Item>
                      <Carousel.Item>
                        <Card style={{ height: '20rem' }} className={this.context.isDarkMode ? "bg-dark" : "bg-light"}>
                          <Card.Body>
                            <Card.Title>
                              Avoiding Risk
                            </Card.Title>
                            <Card.Text>
                              When it comes to risk as broad as market risk, your best bet is to diversify your portfolio. Overall
                              economic trends are out of our control so it's important to make your portfolio, and financial situation,
                              resistant to economic downturns.
                            </Card.Text>
                          </Card.Body>
                        </Card>
                      </Carousel.Item>
                      <Carousel.Item>
                        <Card style={{ height: '20rem' }} className={this.context.isDarkMode ? "bg-dark" : "bg-light"}>
                          <Card.Body>
                            <Card.Title>
                              Example
                            </Card.Title>
                            <Card.Text>
                              When the Great Recession first hit in the mid 2000s, many investments began to plummet. Many low risk assets
                              such as bonds became popular investments in spite of this. With a diversified portfolio where you have a healthy
                              mix of high and low risk invements, you can feel more confident of riding out downturns such as the one in 2008.
                            </Card.Text>
                          </Card.Body>
                        </Card>
                      </Carousel.Item>
                    </Carousel>
                  </Tab.Pane>
                  <Tab.Pane eventKey="#link2">
                    <Card style={{ height: '20rem' }} className={this.context.isDarkMode ? "bg-dark" : "bg-light"}>
                      <Card.Body>
                        Examples
                      </Card.Body>
                    </Card>
                  </Tab.Pane>
                  <Tab.Pane eventKey="#link3">
                    <Card style={{ height: '20rem' }} className={this.context.isDarkMode ? "bg-dark" : "bg-light"}>
                      <Card.Body>
                        Examples
                      </Card.Body>
                    </Card>
                  </Tab.Pane>
                  <Tab.Pane eventKey="#link4">
                    <Card style={{ height: '20rem' }} className={this.context.isDarkMode ? "bg-dark" : "bg-light"}>
                      <Card.Body>
                        d
                      </Card.Body>
                    </Card>
                  </Tab.Pane>
                  <Tab.Pane eventKey="#link5">
                    <Card style={{ height: '20rem' }} className={this.context.isDarkMode ? "bg-dark" : "bg-light"}>
                      <Card.Body>
                        Examples
                      </Card.Body>
                    </Card>
                  </Tab.Pane>
                  <Tab.Pane eventKey="#link6">
                    <Card style={{ height: '20rem' }} className={this.context.isDarkMode ? "bg-dark" : "bg-light"}>
                      <Card.Body>
                        Examples
                      </Card.Body>
                    </Card>
                  </Tab.Pane>
                </Tab.Content>
              </Col>
            </Row>
          </Tab.Container>
        </div>
        <br />
        <Fade opposite={true}>
          <Card style={{ height: '10rem' }} className={this.context.isDarkMode ? "bg-dark" : "bg-light"}>
            <Card.Body>
              <Card.Title>
                Final Word
              </Card.Title>
              <Card.Text>
                Risk is unavoidable in making investments, but that doesn't mean you should be afraid of making one. Take it into
                your own hands to learn about the market, determine what risk you're willing to assume, and diversify your portfolio.
                Investing is a great step to make your future more secure!
              </Card.Text>
            </Card.Body>
          </Card>
        </Fade>
      </div>
    );
  }
}

RiskManagement.contextType = DarkModeContext;
export default RiskManagement;
