import SpecialtyService from "../services/SpecialtyService";

let CreateSpecialty = async (req, res) => {
  try {
    let info = await SpecialtyService.SpecialtyService(req.body);
    return res.status(200).json(info);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: 1,
      errMessage: "Error from server",
    });
  }
};

let getAllSpecialty = async (req, res) => {
  try {
    let info = await SpecialtyService.getAllSpecialtyService();
    return res.status(200).json(info);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: 1,
      errMessage: "Error from server",
    });
  }
};

let getDetailSpecialty = async (req, res) => {
  try {
    let info = await SpecialtyService.getDetailSpecialtyService(
      req.query.id,
      req.query.location
    );
    return res.status(200).json(info);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: 1,
      errMessage: "Error from server",
    });
  }
};

module.exports = {
  CreateSpecialty: CreateSpecialty,
  getAllSpecialty: getAllSpecialty,
  getDetailSpecialty: getDetailSpecialty,
};
