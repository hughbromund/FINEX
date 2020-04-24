//from https://github.com/b-bly/simple-mern-passport

// TEST

const path = require("path");

const User = require(path.resolve(__dirname, "../database/models/user"));
const Transaction = require(path.resolve(
  __dirname,
  "../database/models/transactions"
));
const Spending = require(path.resolve(
  __dirname,
  "../database/models/spending"
));

//var databaseAccess = require('../DatabaseAccess/mongo_commands')

exports.insertTransaction = async function (req, res, next) {
  try {
    console.log("new transaction");
    console.log(req.body);
    var { type, category, cost, name, date } = req.body;

    const newTransaction = new Transaction({
      username: req.user.username,
      type: type,
      category: category,
      cost: cost,
      name: name,
      date: date,
    });
    newTransaction.save((err, savedTransaction) => {
      if (err) {
        console.log(err);
      } //return res.json(err)
    });

    console.log("saved");
    //var mon = date.getMonth() + 1;
    //var yr = date.getYear() + 1990;

    console.log(date);
    if (date == null) {
      //console.log("date is undefined")
      date = new Date();
    }

    const month = date.getMonth();
    console.log(month);
    const year = date.getFullYear();
    console.log(year);

    if (type.localeCompare("expense") == 0) {
      console.log("is expense");
      Spending.findOneAndUpdate(
        { username: req.user.username, month: month, year: year },
        { $inc: { [category]: cost } },
        function (err, response) {
          if (err) {
            console.log("error with findoneandupdate");
          }
        }
      );
      Spending.findOneAndUpdate(
        { username: req.user.username, month: month, year: year },
        { $inc: { total: cost } },
        function (err, response) {
          if (err) {
            console.log("error with findoneandupdate");
          }
        }
      );
    } else if (type.localeCompare("income") == 0) {
      Spending.findOneAndUpdate(
        { username: req.user.username, month: month, year: year },
        { $inc: { income: cost } },
        function (err, response) {
          if (err) {
            console.log("error with findoneandupdate");
          }
        }
      );
    }
  } catch (e) {
    console.log(e);
    //return res.status(400).json({ status: 400, message: e.message });
  }
};

//in progress
exports.addTransactionToUser = async function (req) {
  return await User.updateOne(
    { username: req.user.username },
    { $push: { transaction_ids: transaction } }
  )
    .catch(() => {})
    .exec();
};

exports.getExpenses = async function (req) {
  var minDate = new Date();
  minDate.setMilliseconds(0);
  minDate.setSeconds(0);
  minDate.setMinutes(0);
  minDate.setHours(0);
  minDate.setDate(1);

  return await Transaction.find(
    { username: req.user.username, type: "expense", date: { $gte: minDate } },
    { _id: 0, username: 1, type: 1, category: 1, cost: 1, name: 1 },
    (err, user) => {}
  ).exec();
};

exports.getIncome = async function (req) {
  var minDate = new Date();
  minDate.setMilliseconds(0);
  minDate.setSeconds(0);
  minDate.setMinutes(0);
  minDate.setHours(0);
  minDate.setDate(1);

  return await Transaction.find(
    { username: req.user.username, type: "income", date: { $gte: minDate } },
    { _id: 0, username: 1, type: 1, category: 1, cost: 1, name: 1 },
    (err, user) => {}
  ).exec();
};

exports.getCategory = async function (req) {
  var minDate = new Date();
  minDate.setMilliseconds(0);
  minDate.setSeconds(0);
  minDate.setMinutes(0);
  minDate.setHours(0);
  minDate.setDate(1);

  return await Transaction.find(
    {
      username: req.user.username,
      type: "expense",
      category: req.params.category,
      date: { $gte: minDate },
    },
    { _id: 0, username: 1, type: 1, category: 1, cost: 1, name: 1 },
    (err, user) => {}
  ).exec();
};
