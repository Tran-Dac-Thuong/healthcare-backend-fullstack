import express from "express";
import homeController from "../controller/homeController";
import userController from "../controller/userController";
import doctorController from "../controller/doctorController";
import patientController from "../controller/patientController";
import specialtyController from "../controller/specialtyController";
import clinicControlller from "../controller/clinicController";
let router = express.Router();
let initWebRouter = (app) => {
  router.get("/", homeController.getHomePage);

  router.get("/about", homeController.getAboutPage);

  router.get("/crud", homeController.getCRUD);

  router.post("/post-crud", homeController.postCRUD);

  router.get("/get-crud", homeController.displayCRUD);

  router.get("/edit-crud", homeController.getEditCRUD);

  router.post("/put-crud", homeController.putCRUD);

  router.get("/delete-crud", homeController.deleteCRUD);

  router.post("/api/login", userController.handleLogin);

  router.get("/api/get-all-users", userController.handlegetAllUser);

  router.post("/api/create-new-user", userController.handleCreateNewUser);

  router.put("/api/edit-user", userController.handleEditUser);

  router.delete("/api/delete-user", userController.handleDeleteUser);

  router.get("/api/allcodes", userController.getAllCodes);

  router.get("/api/get-doctor-home", doctorController.getDoctorHome);

  router.get("/api/get-all-doctors", doctorController.getAllDoctors);

  router.post("/api/save-info-doctor", doctorController.PostInfoDoctor);

  router.get(
    "/api/get-detail-doctor-by-id",
    doctorController.getDetailDoctorById
  );

  router.post("/api/bulk-create-schedule", doctorController.BulkCreateSchedule);

  router.get(
    "/api/get-schedule-doctor-by-date",
    doctorController.getScheduleDate
  );

  router.get(
    "/api/get-extra-info-doctor-by-id",
    doctorController.getExtraInfoDoctor
  );

  router.get(
    "/api/get-profile-doctor-by-id",
    doctorController.getProfileDoctor
  );

  router.post(
    "/api/patient-book-appointment",
    patientController.postBookAppointment
  );

  router.post(
    "/api/verify-book-appointment",
    patientController.postVerifyBookAppointment
  );

  router.post("/api/create-new-specialty", specialtyController.CreateSpecialty);

  router.get("/api/get-all-specialty", specialtyController.getAllSpecialty);

  router.get(
    "/api/get-detail-specialty-by-id",
    specialtyController.getDetailSpecialty
  );

  router.post("/api/create-new-clinic", clinicControlller.CreateNewClinic);

  router.get("/api/get-all-clinic", clinicControlller.getAllClinic);

  router.get(
    "/api/get-detail-clinic-by-id",
    clinicControlller.getDetailClinicById
  );

  router.get(
    "/api/get-list-patient-for-doctor",
    doctorController.getListPatientForDoctor
  );

  router.post("/api/send-remedy", doctorController.sendRemedy);

  return app.use("/", router);
};

module.exports = initWebRouter;
