const db = require("../models");
const jwt = require("../auth/jwt");
const User = db.users;
const Op = db.Sequelize.Op;
const googleAuth = require("../auth/google-auth");

const getGoogleUser = (param) =>
  googleAuth
    .getGoogleUser(param.code)
    .then((response) => {
      const content = {
        token: jwt.generateToken(response, process.env.JWT_SECRET_PASSWORD),
        user: response,
      };
      return content;
    })
    .catch((e) => {
      console.log(e);
      throw new Error(e);
    });

exports.create = (req, res) => {
  const socialuser = req.body;
  if (!socialuser.code || !socialuser.type) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  // User.findByPk(id)
  //   .then(data => {
  //     res.send(data);
  //   })
  //   .catch(err => {
  //     res.status(500).send({
  //       message: "Error retrieving Tutorial with id=" + id
  //     });
  //   });

  getGoogleUser(socialuser)
    .then((current) => {
      User.findByPk(current.user.socialid)
        .then((data) => {
          if (data) {
            return res.status(200).send(current);
          } else {
            User.create(current.user)
              .then((data) => {
                console.log("data Saved");
                return res.send(current);
              })
              .catch((err) => {
                return res.status(500).send({
                  message:
                    err.message ||
                    "Some error occurred while creating the Tutorial.",
                });
              });
          }
        })
        .catch((err) => {
          return res.status(500).send({
            message: "Error retrieving User",
          });
        });
    })
    .catch((error) => {
      res.status(500).send({
        message:
          error.message || "Some error occurred while creating the Tutorial.",
      });
    });

  // Create a Tutorial
  // const user = {
  //   name: req.body.name,
  //   pic: req.body.pic,
  //   socialid: req.body.socialid,
  //   email_verified: req.body.email_verified,
  //   email: req.body.email,
  // };

  // Save Tutorial in the database
  // User.create(user)
  //   .then((data) => {
  //     res.send(data);
  //   })
  //   .catch((err) => {
  //     res.status(500).send({
  //       message:
  //         err.message || "Some error occurred while creating the Tutorial.",
  //     });
  //   });
};
