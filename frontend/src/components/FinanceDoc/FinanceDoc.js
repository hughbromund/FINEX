import React, { Component } from "react";
import classes from "./FinanceDoc.module.css";
import sourceRegular from "./Montserrat/Montserrat-Regular.ttf";
import sourceBold from "./Montserrat/Montserrat-Bold.ttf";
import sourceSemiBold from "./Montserrat/Montserrat-SemiBold.ttf";
import logo from "../../assets/img/logo-black.png";
import {
  USER_INFO_URL,
  LOGIN_PATH,
  GET_CATEGORY_BUDGET,
} from "../../constants/Constants";
import history from "../../routing/History";
import { Jumbotron } from "react-bootstrap";
import { DarkModeContext } from "../../contexts/DarkModeContext";

import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
  PDFViewer,
  Font,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
  image: {
    paddingTop: 20,
    paddingHorizontal: 100,
  },
  title: {
    fontFamily: "Montserrat",
    fontWeight: "bold",
    fontSize: "30pt",
    textAlign: "center",
    marginBottom: 40,
  },
  header: {
    fontFamily: "Montserrat",
    fontWeight: "bold",
    fontSize: "20pt",
    marginBottom: 10,
    marginLeft: 40,
    color: "#34C759",
  },
  category: {
    fontFamily: "Montserrat",
    fontWeight: "semibold",
    fontSize: "15pt",
    marginRight: 20,
    marginBottom: 5,
  },
  tableWrapper: {
    flexDirection: "row",
    marginLeft: 40,
  },
  amount: {
    fontFamily: "Montserrat",
    fontSize: "15pt",
    marginBottom: 5,
  },
  bodyWrapper: {
    display: "flex",
    flexDirection: "row",
  },
  budgetWrapper: {
    display: "flex",
    flexDirection: "column",
  },
  spendingWrapper: {
    display: "flex",
    flexDirection: "column",
    marginRight: 40,
    marginLeft: 60,
  },
  total: {
    fontFamily: "Montserrat",
    fontSize: "15pt",
    fontWeight: "bold",
    marginBottom: 5,
  },
  extraWrapper: {
    display: "flex",
    flexDirection: "column",
    marginTop: 40,
    marginLeft: 40,
  },
  extraInfo: {
    display: "flex",
    flexDirection: "row",
  },
  extraHeader: {
    fontFamily: "Montserrat",
    fontWeight: "semibold",
    fontSize: "15pt",
    marginRight: 20,
    marginBottom: 5,
    color: "#34C759",
  },
  amountRed: {
    fontFamily: "Montserrat",
    fontSize: "15pt",
    marginBottom: 5,
    color: "#FF3B30",
  },
});

Font.register({
  family: "Montserrat",
  fonts: [
    { src: sourceRegular },
    { src: sourceBold, fontWeight: "bold" },
    { src: sourceSemiBold, fontWeight: "semibold" },
  ],
});

class FinanceDoc extends Component {
  state = {
    isLoggedIn: null,
    data: null,
    spentTotal: 0,
    budgetedTotal: 0,
  };

  componentDidMount() {
    this.callAuthAPI().catch((err) => {
      console.log(err);
    });

    this.callBudgetAPI().catch((err) => {
      console.log(err);
    });
  }

  callAuthAPI = async () => {
    console.log(USER_INFO_URL);
    let response;
    response = await fetch(USER_INFO_URL);
    // const body = await response.json();
    // console.log(body.status);

    if (response.status !== 200) {
      // console.log("false");
      this.setState({ isLoggedIn: false });
    } else {
      // console.log("true");
      this.setState({ isLoggedIn: true });
    }
  };

  callBudgetAPI = async () => {
    console.log(GET_CATEGORY_BUDGET);
    let response;
    response = await fetch(GET_CATEGORY_BUDGET);
    const body = await response.json();
    console.log(body);

    if (body == null || body == undefined) {
      return;
    }

    let tempSpending = 0;
    let tempBudgeting = 0;

    for (let i = 0; i < body.length; i++) {
      tempSpending += body[i]["spent"];
      tempBudgeting += body[i]["budgeted"];
      if (body[i]["category"] === "Personal Entertainment") {
        body[i]["category"] = "Entertainment";
      }
    }

    this.setState({ spentTotal: tempSpending });
    this.setState({ budgetedTotal: tempBudgeting });
    this.setState({ data: body });
  };

  renderCategories = () => {
    if (this.state.data == null) return null;

    let categoriesArr = [];

    for (let i = 0; i < this.state.data.length; i++) {
      categoriesArr[i] = (
        <Text key={i} style={styles.category}>
          {this.state.data[i]["category"] + ":"}
        </Text>
      );
    }

    categoriesArr.push(
      <Text key={"total"} style={styles.total}>
        Total:
      </Text>
    );

    return <View>{categoriesArr}</View>;
  };

  renderSpending = () => {
    if (this.state.data == null) return null;

    let spendingArr = [];

    for (let i = 0; i < this.state.data.length; i++) {
      let isOver = this.state.data[i]["spent"] > this.state.data[i]["budgeted"];

      spendingArr[i] = (
        <Text key={i} style={isOver ? styles.amountRed : styles.amount}>
          {"$" + this.state.data[i]["spent"].toFixed(2)}
        </Text>
      );
    }

    let isNeg = false;
    if (this.state.budgetedTotal - this.state.spentTotal < 0) {
      isNeg = true;
    }

    spendingArr.push(
      <Text key={"total"} style={isNeg ? styles.amountRed : styles.amount}>
        {"$" + this.state.spentTotal.toFixed(2)}
      </Text>
    );

    return <View>{spendingArr}</View>;
  };

  renderBudget = () => {
    if (this.state.data == null) return null;

    let budgetArr = [];

    for (let i = 0; i < this.state.data.length; i++) {
      budgetArr[i] = (
        <Text key={i} style={styles.amount}>
          {"$" + this.state.data[i]["budgeted"].toFixed(2)}
        </Text>
      );
    }

    budgetArr.push(
      <Text key={"total"} style={styles.amount}>
        {"$" + this.state.budgetedTotal.toFixed(2)}
      </Text>
    );

    return <View>{budgetArr}</View>;
  };

  renderPercent = () => {
    if (
      this.state.budgetedTotal == 0 ||
      this.state.budgetedTotal == null ||
      this.state.budgetedTotal == undefined
    )
      return <Text style={styles.amount}>100.00%</Text>;

    let percent = (
      (this.state.spentTotal * 100.0) /
      this.state.budgetedTotal
    ).toFixed(2);

    return (
      <Text style={percent > 100 ? styles.amountRed : styles.amount}>
        {percent + "%"}
      </Text>
    );
  };

  renderRemaining = () => {
    let isNeg = false;
    if (this.state.budgetedTotal - this.state.spentTotal < 0) {
      isNeg = true;
    }
    return (
      <Text style={isNeg ? styles.amountRed : styles.amount}>
        {"$" + (this.state.budgetedTotal - this.state.spentTotal).toFixed(2)}
      </Text>
    );
  };

  render() {
    if (this.state.isLoggedIn != null && !this.state.isLoggedIn) {
      history.push(LOGIN_PATH);
      return null;
    } else if (this.state.isLoggedIn && this.state.data == null) {
      return (
        <div className={classes.jumboOuter}>
          <div className={classes.jumboInner}>
            <Jumbotron
              className={this.context.isDarkMode ? "bg-dark" : "bg-light"}
            >
              <h1>No Spending Found!</h1>
              <p>
                Try coming back when you have logged some of your spending for
                this month.
              </p>
            </Jumbotron>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <PDFViewer className={classes.wrapper}>
            <Document
              title="Financial Summary"
              author="FINEX"
              creator="FINEX"
              producer="FINEX"
            >
              <Page size="A4">
                <View>
                  <Image style={styles.image} src={logo} />
                </View>
                <View>
                  <Text style={styles.title}>FINANCIAL SUMMARY</Text>
                </View>
                <View style={styles.bodyWrapper}>
                  <View style={styles.budgetWrapper}>
                    <Text style={styles.header}>Budgeting</Text>
                    <View style={styles.tableWrapper}>
                      {this.renderCategories()}
                      {this.renderBudget()}
                    </View>
                  </View>
                  <View style={styles.spendingWrapper}>
                    <Text style={styles.header}>Spending</Text>
                    <View style={styles.tableWrapper}>
                      {this.renderCategories()}
                      {this.renderSpending()}
                    </View>
                  </View>
                </View>
                <View style={styles.extraWrapper}>
                  <View style={styles.extraInfo}>
                    <Text style={styles.extraHeader}>Remaining Money:</Text>
                    {this.renderRemaining()}
                  </View>
                  <View style={styles.extraInfo}>
                    <Text style={styles.extraHeader}>
                      Percent of Budget Spent:
                    </Text>
                    {this.renderPercent()}
                  </View>
                </View>
              </Page>
            </Document>
          </PDFViewer>
        </div>
      );
    }
  }
}

FinanceDoc.contextType = DarkModeContext;
export default FinanceDoc;
