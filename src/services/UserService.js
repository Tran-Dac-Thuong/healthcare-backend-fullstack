import db from "../models/index";
import bcrypt from "bcryptjs";

const salt = bcrypt.genSaltSync(10);

let hashUserpassword = (password) => {
  return new Promise(async (resolve, reject) => {
    try {
      var hashpassword = await bcrypt.hashSync(password, salt);
      resolve(hashpassword);
    } catch (error) {
      reject(error);
    }
  });
};

let handleUserLogin = (email, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let userdata = {};
      let isExist = await checkUserEmail(email);

      if (isExist) {
        let user = await db.User.findOne({
          where: { email: email },
          attributes: [
            "id",
            "email",
            "roleId",
            "password",
            "firstName",
            "lastName",
          ],
          raw: true,
        });
        if (user) {
          let check = await bcrypt.compareSync(password, user.password);
          if (check) {
            userdata.errCode = 0;
            userdata.errMessage = "OK";
            delete user.password;
            userdata.user = user;
          } else {
            userdata.errCode = 3;
            userdata.errMessage = "Wrong password";
          }
        } else {
          userdata.errCode = 2;
          userdata.errMessage = "User not found";
        }
      } else {
        userdata.errCode = 1;
        userdata.errMessage = "Email isn't exist";
      }
      resolve(userdata);
    } catch (error) {
      reject(error);
    }
  });
};

let checkUserEmail = (userEmail) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { email: userEmail },
      });
      if (user) {
        resolve(true);
      } else {
        resolve(false);
      }
    } catch (error) {
      reject(error);
    }
  });
};

let getAllUser = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = "";
      if (userId === "ALL") {
        user = await db.User.findAll({
          attributes: {
            exclude: ["password"],
          },
        });
      }
      if (userId && userId !== "ALL") {
        user = await db.User.findOne({
          where: { id: userId },
          attributes: {
            exclude: ["password"],
          },
        });
      }
      resolve(user);
    } catch (error) {
      reject(error);
    }
  });
};

let CreateNewUser = (data) => {
  return new Promise(async (resolve, reject) => {
    let check = await checkUserEmail(data.email);
    if (check === true) {
      resolve({
        errCode: 1,
        errMessage: "Your email is already exist",
      });
    } else {
      try {
        let hashpasswordbyBcrypt = await hashUserpassword(data.password);
        await db.User.create({
          email: data.email,
          password: hashpasswordbyBcrypt,
          firstName: data.firstName,
          lastName: data.lastName,
          address: data.address,
          phonenumber: data.phonenumber,
          gender: data.gender,
          roleId: data.roleId,
          positionId: data.positionId,
          image: data.avatar,
        });
        resolve({
          errCode: 0,
          message: "OK",
        });
      } catch (error) {
        reject(error);
      }
    }
  });
};

let deleteUser = (userId) => {
  return new Promise(async (resolve, reject) => {
    let user = await db.User.findOne({
      where: { id: userId },
    });

    if (!user) {
      resolve({
        errCode: 1,
        errMessage: "User is not exist",
      });
    }
    await db.User.destroy({
      where: { id: userId },
    });

    resolve({
      errCode: 0,
      message: "Delete OK",
    });
  });
};

let updateUser = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id || !data.roleId || !data.positionId || !data.gender) {
        resolve({
          errCode: 2,
          errMessage: "Missing parameters",
        });
      }
      let user = await db.User.findOne({
        where: { id: data.id },
        raw: false,
      });
      if (user) {
        user.firstName = data.firstName;
        user.lastName = data.lastName;
        user.address = data.address;
        user.roleId = data.roleId;
        user.positionId = data.positionId;
        user.gender = data.gender;
        user.phonenumber = data.phonenumber;
        if (user.image) {
          user.image = data.avatar;
        }

        await user.save();

        resolve({
          errCode: 0,
          errMessage: "Update OK",
        });
      } else {
        resolve({
          errCode: 1,
          errMessage: "User not found",
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

let getAllCodesService = (typeInput) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!typeInput) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter",
        });
      } else {
        let res = {};
        let allcode = await db.Allcode.findAll({
          where: { type: typeInput },
        });
        res.errCode = 0;
        res.data = allcode;
        resolve(res);
      }
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  handleUserLogin: handleUserLogin,
  checkUserEmail: checkUserEmail,
  getAllUser: getAllUser,
  CreateNewUser: CreateNewUser,
  deleteUser: deleteUser,
  updateUser: updateUser,
  getAllCodesService: getAllCodesService,
};
