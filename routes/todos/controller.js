const { user: users } = require("../../models");
const { get } = require("../../config");
const objectId =require("mongodb").ObjectId


module.exports = {
 

  getAll: (req, res) => {
    get()
      .collection("todo")
      .find({})
      .toArray()
      .then(result => {
        res.send({ message: "Get all Data", data: result });
      })
      .catch(error => {
        console.log(error);
      });
  },
  getById: (req, res) => {
    const { id } = req.params;

    get()
      .collection("todo")
      // .findOne({ email: req.params.id })
      .findOne({_id: objectId(id)})
      .then(result => {
        res.send({message: `Get data with id ${id}`,data: result})
        // res.send({ message: "Get data Id", data: result });
      })
      .catch(error => {
        console.log(error);
      });
  },

  deleteOne: (req, res) => {
    console.log(req.body);
    const { id } = req.params;
    get()
      .collection("todo")
      .deleteOne({email: req.params.id})
      .then(result => {
        // res.send({ message:`Delete data with id ${id}`, data: result})
        res.send({ message: "Data sucessfully deleted", data: result });
      })
      .catch(error => {
        console.log(error);
      });
  },

  addOne: (req, res) => {
    get()
      .collection("todo")
      .insertOne(req.body)
      .then(result => {
        res.send({ message: "Data sucessfully added", data: result });
      })
      .catch(error => {
        console.log(error);
      });
  },

  updateOne: (req, res) => {
    const { id } = req.params;
    get()
      .collection("todo")
      .updateOne({ email: req.params.id }, { $set: req.body })
      // .updateOne({_id: objectId(id)}, { $set: req.body})
      .then(result => {
        // res.send({
        //   message: `Data successfully update with id ${id}`, data: result
        // })
        res.send({ message: " Data successfully Updated", data: result });
      })
      .catch(error => {
        console.log(error);
      });
  },

  deleteAll: (req, res) => {
    get().collection("todo").drop()
    .then(result => {
      res.send({ message: "All todo data Deleted", data: result });
    })
    .catch(error => {
      console.log(error);
    });
  }

};
