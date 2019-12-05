const { user: users } = require("../../models");
const { get, JWT_SECRET_KEY  } = require("../../config");
const objectId = require("mongodb").ObjectId;
const { hashPassword, comparedPassword } = require("../../helpers");
const jwt = require("jsonwebtoken")
module.exports = {
  getAll: (req, res) => {
    get()
      .collection("users")
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
      .collection("users")
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
      .collection("users")
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

  // addOne: (req, res) => {
  //   get()
  //     .collection("users")
  //     .insertOne(req.body)
  //     .then(result => {
  //       res.status(201).send({
  //         message: "Data successfully added",
  //         data: result
  //       });
  //       // res.send({ message: "User sucessfully added", data: result });
  //     })
  //     .catch(error => {
  //       console.log(error);
  //     });
  // },

  addOne: async (req, res) => {
    const hash = await hashPassword(req.body.password);

    get()
      .collection("users")
      .insertOne({ ...req.body, password: hash })
      .then(result => {
        res.status(201).json({
          message: "Data successfull added",
          data: result
        });
      })
      .catch(error => {
        console.log(error);
      });
  },

  updateOne: (req, res) => {
    const { id } = req.params;
    get()
      .collection("users")
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
      .collection("users")
      .drop()
      .then(result => {
        res.send({ message: "All User Deleted", data: result });
      })
      .catch(error => {
        console.log(error);
      });
  },

  login: async (req, res) => {
    const { body } = req;

    get()
      .collection("users")
      .findOne({ email: body.email })
      .then(async response => {
        const compared = await comparedPassword(
          req.body.password,
          response.password
        );
        if (compared === true) {
          const { email, firstName } = response;
          const token = jwt.sign({
            email, firstName
          },
          JWT_SECRET_KEY,
          {
            expiresIn: "1d"
          }
          )

          console.log(token)

          res.status(200).json({
            message: "Login Succesfull",
            data: token
          });
        }
      });
  }

  // login: (req, res) => {
  //   console.log(req.body);

  //   get()
  //     .collection("users")
  //     .findOne({ email: req.body.email, password: req.body.password })
  //     .then(response => {
  //       const { email, firstName,_id } = response;
  //       res.status(200).send({
  //         message: "Login Successfull",
  //         data: { email, firstName, id:_id }
  //       });
  //     })
  //     .catch(error => {
  //       console.log(error);
  //     });
  // },
};
