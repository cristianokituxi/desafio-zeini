import express from "express";
import {
    createDoctor,
    getAllDoctors,
    getDoctorById,
    updateDoctor,
    deleteDoctor
} from "../controllers/doctorController";

const router = express.Router();

router.post("/add", createDoctor);
router.get("/", getAllDoctors);
router.get("/:id", getDoctorById);
router.put("/update:id", updateDoctor);
router.delete("/delete:id", deleteDoctor);

export default router;
