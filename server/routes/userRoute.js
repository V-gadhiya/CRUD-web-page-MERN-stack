import express from "express";
import create, {
    deleteUser,
  getAll,
  getOne,
  upadate,
} from "../controller/userController.js";

const router = new express.Router();

router.post("/create", create);
router.get("/getall", getAll);
router.get("/getone/:id", getOne);
router.put("/update/:id", upadate);
router.delete("/delete/:id",deleteUser)

router.get("/get", async (req, res) => {
  res.send("Called");
});

export default router;
