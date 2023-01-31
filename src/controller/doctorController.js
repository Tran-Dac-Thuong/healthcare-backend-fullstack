import DoctorService from "../services/DoctorService";

let getDoctorHome = async (req, res) => {
  let limit = req.query.limit;
  if (!limit) limit = 10;
  try {
    let doctor = await DoctorService.getDoctorHome(+limit);
    return res.status(200).json(doctor);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};

let getAllDoctors = async (req, res) => {
  try {
    let doctors = await DoctorService.getAllDoctorService();
    return res.status(200).json(doctors);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: 1,
      errMessage: "Error from server",
    });
  }
};

let PostInfoDoctor = async (req, res) => {
  try {
    let doctorinfo = await DoctorService.PostInfoDoctorService(req.body);
    return res.status(200).json(doctorinfo);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: 1,
      errMessage: "Error from server",
    });
  }
};

let getDetailDoctorById = async (req, res) => {
  try {
    let info = await DoctorService.getDetailDoctorByIdService(req.query.id);
    return res.status(200).json(info);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: 1,
      errMessage: "Error from server",
    });
  }
};

let BulkCreateSchedule = async (req, res) => {
  try {
    let info = await DoctorService.BulkCreateScheduleService(req.body);
    return res.status(200).json(info);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: 1,
      errMessage: "Error from server",
    });
  }
};

let getScheduleDate = async (req, res) => {
  try {
    let dateInfo = await DoctorService.getScheduleDateService(
      req.query.doctorId,
      req.query.date
    );
    return res.status(200).json(dateInfo);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: 1,
      errMessage: "Error from server",
    });
  }
};

let getExtraInfoDoctor = async (req, res) => {
  try {
    let extraInfo = await DoctorService.getExtraInfoDoctorService(
      req.query.doctorId
    );
    return res.status(200).json(extraInfo);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: 1,
      errMessage: "Error from server",
    });
  }
};

let getProfileDoctor = async (req, res) => {
  try {
    let profile = await DoctorService.getProfileDoctorService(
      req.query.doctorId
    );
    return res.status(200).json(profile);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: 1,
      errMessage: "Error from server",
    });
  }
};

let getListPatientForDoctor = async (req, res) => {
  try {
    let list = await DoctorService.getListPatientForDoctorService(
      req.query.doctorId,
      req.query.date
    );
    return res.status(200).json(list);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: 1,
      errMessage: "Error from server",
    });
  }
};

let sendRemedy = async (req, res) => {
  try {
    let send = await DoctorService.sendRemedyService(req.body);
    return res.status(200).json(send);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: 1,
      errMessage: "Error from server",
    });
  }
};

module.exports = {
  getDoctorHome: getDoctorHome,
  getAllDoctors: getAllDoctors,
  PostInfoDoctor: PostInfoDoctor,
  getDetailDoctorById: getDetailDoctorById,
  BulkCreateSchedule: BulkCreateSchedule,
  getScheduleDate: getScheduleDate,
  getExtraInfoDoctor: getExtraInfoDoctor,
  getProfileDoctor: getProfileDoctor,
  getListPatientForDoctor: getListPatientForDoctor,
  sendRemedy: sendRemedy,
};
