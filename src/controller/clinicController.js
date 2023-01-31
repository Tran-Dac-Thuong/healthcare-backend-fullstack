import ClinicService from "../services/ClinicService";

let CreateNewClinic = async (req, res) => {
  try {
    let info = await ClinicService.CreateNewClinicService(req.body);
    return res.status(200).json(info);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: 1,
      errMessage: "Error from server",
    });
  }
};

let getAllClinic = async (req, res) => {
  try {
    let info = await ClinicService.getAllClinicService();
    return res.status(200).json(info);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: 1,
      errMessage: "Error from server",
    });
  }
};

let getDetailClinicById = async (req, res) => {
  try {
    let info = await ClinicService.getDetailClinicByIdService(req.query.id);
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
  CreateNewClinic: CreateNewClinic,
  getDetailClinicById: getDetailClinicById,
  getAllClinic: getAllClinic,
};
