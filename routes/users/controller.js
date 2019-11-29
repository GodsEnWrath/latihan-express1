const { user: users } = require("../../models");
const { get } = require("../../config");
const objectId = require("mongodb").ObjectId;

module.exports = {
  getAll: (req, res) => {
    get()
      .collection("user")
      .find({})
      .toArray()
      .then(result => {
        res.send({ message: "Get all User", data: result });
      })
      .catch(error => {
        console.log(error);
      });
  },
  getById: (req, res) => {
    const { id } = req.params;

    get()
      .collection("user")
      // .findOne({ email: req.params.id })
      .findOne({ _id: objectId(id) })
      .then(result => {
        res.send({ message: `Get data with id ${id}`, data: result });
        // res.send({ message: "Get User Id", data: result });
      })
      .catch(error => {
        console.log(error);
      });
  },

  deleteOne: (req, res) => {
    const { id } = req.params;

    get()
      .collection("user")
      // .deleteOne({email: req.params.id})
      .deleteOne({ _id: objectId(id) })
      .then(result => {
        res.send({ message: `Delete data with id ${id}`, data: result });
        // res.send({ message: "User sucessfully deleted", data: result });
      })
      .catch(error => {
        console.log(error);
      });
  },

  addOne: (req, res) => {
    get()
      .collection("user")
      .insertOne(req.body)
      .then(result => {
        res.status(201).send({
          message: "Data successfully added",
          data: result
        });
        // res.send({ message: "User sucessfully added", data: result });
      })
      .catch(error => {
        console.log(error);
      });
  },

  updateOne: (req, res) => {
    const { id } = req.params;
    get()
      .collection("user")
      // .updateOne({ email: req.params.id }, { $set: req.body })
      .updateOne({ _id: objectId(id) }, { $set: req.body })
      .then(result => {
        res.send({
          message: `Data successfully update with id ${id}`,
          data: result
        });
        // res.send({ message: "User Data Updated", data: result });
      })
      .catch(error => {
        console.log(error);
      });
  },

  deleteAll: (req, res) => {
    get()
      .collection("user")
      .drop()
      .then(result => {
        res.send({ message: "All User Deleted", data: result });
      })
      .catch(error => {
        console.log(error);
      });
  },

  login: (req, res) => {
    console.log(req.body);

    get()
      .collection("user")
      .findOne({ email: req.body.email, password: req.body.password })
      .then(response => {
        const { email, firstName } = response;
        res.status(200).send({
          message: "Login Successfull",
          data: { email, firstName }
        });
      })
      .catch(error => {
        console.log(error);
      });
  }
};
