import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import Jumbotron from "react-bootstrap/Jumbotron";
import Fade from "react-reveal/Fade";
import ListGroup from "react-bootstrap/ListGroup";
import Tab from "react-bootstrap/Tab";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import classes from "./RiskManagement.module.css";

import { DarkModeContext } from "../../contexts/DarkModeContext";
import { Carousel } from "react-bootstrap";

class RiskManagement extends Component {
  render() {
    return (
      <div
        className={
          this.context.isDarkMode ? classes.wrapperDark : classes.wrapperLight
        }
      >
        <Container>
          <div>
            <Jumbotron
              className={this.context.isDarkMode ? "bg-dark" : "bg-light"}
            >
              <h1>What Is Risk?</h1>
              <p>
                Every Investment decision we make carries some chance that our
                asset's value go down. This chance we take is called risk. We're
                here to help you naviagate understanding risk in your investment
                decisions.
              </p>
            </Jumbotron>
          </div>
          <div>
            <Tab.Container
              id="list-group-tabs-example"
              defaultActiveKey="#link1"
            >
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
                      <Carousel controls={false} interval={null}>
                        <Carousel.Item>
                          <Card
                            style={{ height: "20rem" }}
                            className={
                              this.context.isDarkMode ? "bg-dark" : "bg-light"
                            }
                          >
                            <Card.Body>
                              <Card.Title>Market Risks</Card.Title>
                              <Card.Text>
                                Market risk is probably the most broad form of
                                risk. Factors that effect the entire economic
                                market are market risks. When the performance of
                                the entire market shifts in a certain direction,
                                whether due to political, social, or economic
                                causes, we call that a market risk.
                              </Card.Text>
                            </Card.Body>
                          </Card>
                        </Carousel.Item>
                        <Carousel.Item>
                          <Card
                            style={{ height: "20rem" }}
                            className={
                              this.context.isDarkMode ? "bg-dark" : "bg-light"
                            }
                          >
                            <Card.Body>
                              <Card.Title>Avoiding Risk</Card.Title>
                              <Card.Text>
                                When it comes to risk as broad as market risk,
                                your best bet is to diversify your portfolio.
                                Overall economic trends are out of our control
                                so it's important to make your portfolio, and
                                financial situation, resistant to economic
                                downturns.
                              </Card.Text>
                            </Card.Body>
                          </Card>
                        </Carousel.Item>
                        <Carousel.Item>
                          <Card
                            style={{ height: "20rem" }}
                            className={
                              this.context.isDarkMode ? "bg-dark" : "bg-light"
                            }
                          >
                            <Card.Body>
                              <Card.Title>Example</Card.Title>
                              <Card.Text>
                                When the Great Recession first hit in the mid
                                2000s, many investments began to plummet. Many
                                low risk assets such as bonds became popular
                                investments in spite of this. With a diversified
                                portfolio where you have a healthy mix of high
                                and low risk invements, you can feel more
                                confident of riding out downturns such as the
                                one in 2008.
                              </Card.Text>
                            </Card.Body>
                          </Card>
                        </Carousel.Item>
                      </Carousel>
                    </Tab.Pane>
                    <Tab.Pane eventKey="#link2">
                      <Carousel controls={false} interval={null}>
                        <Carousel.Item>
                          <Card
                            style={{ height: "20rem" }}
                            className={
                              this.context.isDarkMode ? "bg-dark" : "bg-light"
                            }
                          >
                            <Card.Body>
                              <Card.Title>Specific Risks</Card.Title>
                              <Card.Text>
                                Also known as an unsystematic risk, specific
                                risks are those that effect a sector or single
                                company. When new regulations, or a change of
                                managemet effect the company, we call that a
                                specific risk that an investor needs to weigh.
                              </Card.Text>
                            </Card.Body>
                          </Card>
                        </Carousel.Item>
                        <Carousel.Item>
                          <Card
                            style={{ height: "20rem" }}
                            className={
                              this.context.isDarkMode ? "bg-dark" : "bg-light"
                            }
                          >
                            <Card.Body>
                              <Card.Title>Avoiding Risk</Card.Title>
                              <Card.Text>
                                Specific risks are more avoidable than
                                systematic risks. Good, quality research can
                                help invesorts When it comes to avoiding
                                specific risks. While some events, such as
                                faults in a product, might be unforseeable, it's
                                important to determine whether there is any
                                looming threat to a company or sector before
                                investing.
                              </Card.Text>
                            </Card.Body>
                          </Card>
                        </Carousel.Item>
                        <Carousel.Item>
                          <Card
                            style={{ height: "20rem" }}
                            className={
                              this.context.isDarkMode ? "bg-dark" : "bg-light"
                            }
                          >
                            <Card.Body>
                              <Card.Title>Example</Card.Title>
                              <Card.Text>
                                A great example of a specific risk that might
                                have been unforseaable was the Volkswagen
                                emission scandal. When Volkswagen was forced to
                                recall millions of vehicles and pay millions in
                                fines, their value as an investment fell. As an
                                investor you need to be cautious because events
                                like Volkswagen emission scandal could happen to
                                a holding in your portfolio.
                              </Card.Text>
                            </Card.Body>
                          </Card>
                        </Carousel.Item>
                      </Carousel>
                    </Tab.Pane>
                    <Tab.Pane eventKey="#link3">
                      <Carousel controls={false} interval={null}>
                        <Carousel.Item>
                          <Card
                            style={{ height: "20rem" }}
                            className={
                              this.context.isDarkMode ? "bg-dark" : "bg-light"
                            }
                          >
                            <Card.Body>
                              <Card.Title>Business Risk</Card.Title>
                              <Card.Text>
                                Business Risk is simply the question of whether
                                a company will make a profit, of whether a
                                company's level of business will rise. An easy
                                way to measaure business risk is by quarterly
                                reports and financial statements.
                              </Card.Text>
                            </Card.Body>
                          </Card>
                        </Carousel.Item>
                        <Carousel.Item>
                          <Card
                            style={{ height: "20rem" }}
                            className={
                              this.context.isDarkMode ? "bg-dark" : "bg-light"
                            }
                          >
                            <Card.Body>
                              <Card.Title>Avoiding Risk</Card.Title>
                              <Card.Text>
                                Business risk is the most fundamental risk to
                                weigh when you consider investing into a
                                specific company. You should consider whether
                                the company has seen increased or decreased
                                profits in recent quarters, whether demand for
                                their product or service has changed, and a
                                multitude of other levels.
                              </Card.Text>
                            </Card.Body>
                          </Card>
                        </Carousel.Item>
                        <Carousel.Item>
                          <Card
                            style={{ height: "20rem" }}
                            className={
                              this.context.isDarkMode ? "bg-dark" : "bg-light"
                            }
                          >
                            <Card.Body>
                              <Card.Title>Example</Card.Title>
                              <Card.Text>
                                Sears Holdings has seen its stock value decrease
                                year over year for at least the last 5 years. As
                                an investor, you might have done your research
                                and noted that their quarterly earnings reports
                                had shown decreased sales revenue. You might
                                have also determined that overall demand for
                                their model of sales had decreased in light of
                                companies like Amazon. Your research would have
                                prevented you from assuming a large business
                                risk in Sears.
                              </Card.Text>
                            </Card.Body>
                          </Card>
                        </Carousel.Item>
                      </Carousel>
                    </Tab.Pane>
                    <Tab.Pane eventKey="#link4">
                      <Carousel controls={false} interval={null}>
                        <Carousel.Item>
                          <Card
                            style={{ height: "20rem" }}
                            className={
                              this.context.isDarkMode ? "bg-dark" : "bg-light"
                            }
                          >
                            <Card.Body>
                              <Card.Title>Credit Risk</Card.Title>
                              <Card.Text>
                                Credit risk is the risk that a borrower will be
                                unable to pay back either the principle or its
                                interest. There are two primary types of credit
                                risk sources: government bonds and corporate
                                bonds. Government bonds usually have less risk
                                and lower yield while corporate bonds generaly
                                have a higher yield but higher risk of
                                defaulting.
                              </Card.Text>
                            </Card.Body>
                          </Card>
                        </Carousel.Item>
                        <Carousel.Item>
                          <Card
                            style={{ height: "20rem" }}
                            className={
                              this.context.isDarkMode ? "bg-dark" : "bg-light"
                            }
                          >
                            <Card.Body>
                              <Card.Title>Avoiding Risk</Card.Title>
                              <Card.Text>
                                Credit risk is all about how much risk you are
                                willing to take on. Bond ratings are readily
                                available from places such as Stand and Poor's
                                which can give you an idea of their risk. If you
                                are interested in low credit risk government
                                bonds might be better suited for you. In the
                                end, it's still important to diversify your
                                portfolio to avoid concentrated risk.
                              </Card.Text>
                            </Card.Body>
                          </Card>
                        </Carousel.Item>
                        <Carousel.Item>
                          <Card
                            style={{ height: "20rem" }}
                            className={
                              this.context.isDarkMode ? "bg-dark" : "bg-light"
                            }
                          >
                            <Card.Body>
                              <Card.Title>Example</Card.Title>
                              <Card.Text>
                                In 2012 Greece made international headlines when
                                it defaulted on its national debt. This example
                                of credit risk showed how large scale a national
                                default could be. Investors had to strike a deal
                                with the Greek government that reduced the
                                amount owed by around half.
                              </Card.Text>
                            </Card.Body>
                          </Card>
                        </Carousel.Item>
                      </Carousel>
                    </Tab.Pane>
                    <Tab.Pane eventKey="#link5">
                      <Carousel controls={false} interval={null}>
                        <Carousel.Item>
                          <Card
                            style={{ height: "20rem" }}
                            className={
                              this.context.isDarkMode ? "bg-dark" : "bg-light"
                            }
                          >
                            <Card.Body>
                              <Card.Title>Political Risk</Card.Title>
                              <Card.Text>
                                Also known as geopolitical risk, it is the risk
                                that investments could go sour because of
                                political instability or general changes in the
                                country's politics. In certain parts of the
                                world, it is mainly a result of conflict and
                                military control.
                              </Card.Text>
                            </Card.Body>
                          </Card>
                        </Carousel.Item>
                        <Carousel.Item>
                          <Card
                            style={{ height: "20rem" }}
                            className={
                              this.context.isDarkMode ? "bg-dark" : "bg-light"
                            }
                          >
                            <Card.Body>
                              <Card.Title>Avoiding Risk</Card.Title>
                              <Card.Text>
                                Politicl risks are difficult to hedge againsts
                                because of how irregularly they can occur. The
                                most common, war and terrorism, are usually
                                insured against by large multinational
                                corporations. As an investors, it's important to
                                be aware of where a company might have
                                significant holdings and whether that area is
                                experiencing strife or conflict.
                              </Card.Text>
                            </Card.Body>
                          </Card>
                        </Carousel.Item>
                        <Carousel.Item>
                          <Card
                            style={{ height: "20rem" }}
                            className={
                              this.context.isDarkMode ? "bg-dark" : "bg-light"
                            }
                          >
                            <Card.Body>
                              <Card.Title>Example</Card.Title>
                              <Card.Text>
                                With the escalation in sanctions on Iran began
                                during Trump's presidency, many investors saw
                                political risk turn to fruition. Companies like
                                Boeing experienced lost revenue because of being
                                forced to cancel business deals with foreign
                                countries.
                              </Card.Text>
                            </Card.Body>
                          </Card>
                        </Carousel.Item>
                      </Carousel>
                    </Tab.Pane>
                    <Tab.Pane eventKey="#link6">
                      <Carousel controls={false} interval={null}>
                        <Carousel.Item>
                          <Card
                            style={{ height: "20rem" }}
                            className={
                              this.context.isDarkMode ? "bg-dark" : "bg-light"
                            }
                          >
                            <Card.Body>
                              <Card.Title>Interest Rate Risk</Card.Title>
                              <Card.Text>
                                Interest rate risk is the risk that a change in
                                the interest rates will effect the value of your
                                investment. This is primarily a concern for
                                bondholders, where your yield and what bonds you
                                decide to hold depends on the projected and
                                current interest rates.
                              </Card.Text>
                            </Card.Body>
                          </Card>
                        </Carousel.Item>
                        <Carousel.Item>
                          <Card
                            style={{ height: "20rem" }}
                            className={
                              this.context.isDarkMode ? "bg-dark" : "bg-light"
                            }
                          >
                            <Card.Body>
                              <Card.Title>Avoiding Risk</Card.Title>
                              <Card.Text>
                                The simple way of reducing interest rate risk is
                                to hold bonds of different durations. This helps
                                alleviate risk because if interest rate changes
                                mostly effect bonds with a maturity of one year,
                                holding bonds with longer or shorter maturities
                                will offset some of that loss.
                              </Card.Text>
                            </Card.Body>
                          </Card>
                        </Carousel.Item>
                        <Carousel.Item>
                          <Card
                            style={{ height: "20rem" }}
                            className={
                              this.context.isDarkMode ? "bg-dark" : "bg-light"
                            }
                          >
                            <Card.Body>
                              <Card.Title>Example</Card.Title>
                              <Card.Text>
                                Let's say that you purchase a bond from the
                                federal government that has a maturity date of
                                one year and pays 2% interest. If, during your
                                time holding that bond, interest rates jump to
                                3% from say, 1%, you've now missed out on a
                                higher return. Instead of holding a bond, you
                                would have had a 1% higher return loaning your
                                money out. That is interest rate risk.
                              </Card.Text>
                            </Card.Body>
                          </Card>
                        </Carousel.Item>
                      </Carousel>
                    </Tab.Pane>
                  </Tab.Content>
                </Col>
              </Row>
            </Tab.Container>
          </div>
          <br />
          <Fade opposite={true}>
            <Card
              style={{ height: "10rem" }}
              className={this.context.isDarkMode ? "bg-dark" : "bg-light"}
            >
              <Card.Body>
                <Card.Title>Final Word</Card.Title>
                <Card.Text>
                  Risk is unavoidable in making investments, but that doesn't
                  mean you should be afraid of making one. Take it into your own
                  hands to learn about the market, determine what risk you're
                  willing to assume, and diversify your portfolio. Investing is
                  a great step to make your future more secure!
                </Card.Text>
              </Card.Body>
            </Card>
          </Fade>
        </Container>
      </div>
    );
  }
}

RiskManagement.contextType = DarkModeContext;
export default RiskManagement;
