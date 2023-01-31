import db from '../models/index';
import CRUDService from '../services/CRUDService';

let getHomePage = async (req, res) => {
    try {
        let data = await db.User.findAll();
        return res.render('homepage.ejs', {
            data: JSON.stringify(data)
        });    
    } catch (error) {
        console.log(error);
    }
    
}

let getAboutPage = (req, res) => {
    return res.render('about.ejs');
}

let getCRUD = (req, res) => {
    return res.render('crud.ejs');
}

let postCRUD = async (req, res) => {
    let message = CRUDService.createnewUser(req.body); 
    console.log(message)
    return res.send("Create Successfully");
}

let displayCRUD = async (req, res) => {
    let data = await CRUDService.getAllUser();
    console.log(data);
    return res.render("displayCRUD.ejs", {
        dataTable: data
    });
}

let getEditCRUD = async (req, res) => {
    let userId = req.query.id;
    if(userId){
        let userData = await CRUDService.getUserInfoById(userId);
        console.log(userData);
        return res.render("editCRUD.ejs", {
            user: userData
        });
    }else{
        return res.send("User not found");
    }
    
}

let putCRUD = async (req, res) => {
    let data = req.body;
    let alluser = await CRUDService.updateUserData(data);
    return res.render("displayCRUD.ejs", {
        dataTable: alluser
    });
}

let deleteCRUD = async (req, res) => {
    let id = req.query.id;
    if(id){
        await CRUDService.deleteUserById(id);
        return res.send("Delete Successfully");
    }else{
        return res.send("User not found")
    }
      
}

module.exports = {
    getHomePage: getHomePage,
    getAboutPage: getAboutPage,
    getCRUD: getCRUD,
    postCRUD: postCRUD,
    displayCRUD: displayCRUD,
    getEditCRUD: getEditCRUD,
    putCRUD: putCRUD,
    deleteCRUD: deleteCRUD,
}