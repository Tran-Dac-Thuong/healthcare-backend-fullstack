import bcrypt from 'bcryptjs';
import db from '../models/index';
const salt = bcrypt.genSaltSync(10);

let createnewUser = async (data) => {
    return new Promise( async (resolve, reject) => {
        try {
            let hashpasswordbyBcrypt = await hashUserpassword(data.password);
            await db.User.create({
                email: data.email,
                password: hashpasswordbyBcrypt,
                firstName: data.firstname,
                lastName: data.lastname,
                address: data.address,
                phonenumber: data.phonenumber,
                gender: data.gender === "1" ? true : false,
                roleId: data.roleId,
            })    
            resolve("Create new user ok");

        } catch (error) {
            reject(error);
        }
    })
}

let hashUserpassword = (password) => {
    return new Promise( async (resolve, reject) => {  
        try {
            var hashpassword = await bcrypt.hashSync(password, salt);
            resolve(hashpassword);        
        } catch (error) {
            reject(error);
        }
    });
}

let getAllUser = async () => {
    return new Promise( async (resolve, reject) => {
        try {
            let users = db.User.findAll({
                raw: true,
            });
            resolve(users); 
        } catch (error) {
            reject(error);
        }
    })
}

let getUserInfoById = async (userid) => {
    return new Promise( async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: {id: userid},
                raw: true
            })
            if(user){
                resolve(user);
            }else{
                resolve({})
            }
        } catch (error) {
            reject(error);
        }
    })
}

let updateUserData = (data) => {
    return new Promise( async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: {id: data.id}
            })
            if(user){
                user.firstName = data.firstname;
                user.lastName = data.lastname;
                user.address = data.address;

                await user.save();
                let allusers = await db.User.findAll();
                resolve(allusers);
            }else{
                resolve();
            }
        } catch (error) {
            reject(error)
        }
    })
}

let deleteUserById = (userId) => {
    return new Promise( async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: {id: userId}
            })
            if(user){
                await user.destroy();
            }
            resolve();
        } catch (error) {
            reject(error);
        }
    })
}

module.exports = {
    hashUserpassword: hashUserpassword,
    createnewUser: createnewUser,
    getAllUser: getAllUser,
    getUserInfoById: getUserInfoById,
    updateUserData: updateUserData,
    deleteUserById: deleteUserById,
}