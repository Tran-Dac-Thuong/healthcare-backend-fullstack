import PatientService from "../services/PatientService";

let postBookAppointment = async (req, res) => {
  try {
    let patient = await PatientService.postBookAppointmentService(req.body);
    return res.status(200).json(patient);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: 1,
      errMessage: "Error from server",
    });
  }
};

let postVerifyBookAppointment = async (req, res) => {
  try {
    let patient = await PatientService.postVerifyBookAppointmentService(
      req.body
    );
    return res.status(200).json(patient);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: 1,
      errMessage: "Error from server",
    });
  }
};

module.exports = {
  postBookAppointment: postBookAppointment,
  postVerifyBookAppointment: postVerifyBookAppointment,
};
