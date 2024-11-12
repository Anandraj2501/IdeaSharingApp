import { Router } from "express";
import { addIdea, deleteIdea, getIdea, updateIdea } from "../controllers/idea.controller.js";
import { upload } from "../middlewares/multer.middlewares.js";
import { verifyJWT } from "../middlewares/auth.middlewares.js";

const router = Router();
router.use(verifyJWT);

router.route("/create").post(upload.single("postImages"), addIdea);

router.route("/get").get(getIdea);
router.route("/update/:id").put(upload.array("postImages", 10), updateIdea);
router.route("/delete/:id").delete(deleteIdea);

export default router;