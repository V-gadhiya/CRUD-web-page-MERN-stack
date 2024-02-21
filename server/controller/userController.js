import User from "../models/useModel.js";
const create = async (req, res) => {
  try {
    const userData = new User(req.body);
    if (!userData) {
      return res.status(404).json({ msg: "user data not found" });
    }

    const saveData = await userData.save();
    res.status(200).json({ msg: "Data create successfully" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export default create;

export const getAll = async (req, res) => {
  try {
    const userData = await User.find();
    if (!userData) {
      return res.status(404).json({ msg: "user data not found" });
    }
    res.status(200).json(userData);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const getOne = async (req, res) => {
  try {
    const id = req.params.id;
    const userexist = await User.findById(id);
    if (!userexist) {
      return res.status(404).json({ msg: "user data not found" });
    }

    res.status(200).json(userexist);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const upadate = async (req, res) => {
  try {
    const id = req.params.id;
    const userexist = await User.findById(id);
    if (!userexist) {
      return res.status(401).json({ msg: "user not found" });
    }
    const updatedData = await User.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json({ msg: "Data update successfully" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    const userexist = await User.findById(id);
    if (!userexist) {
      return res.status(404).json({ msg: "user not exist" });
    }
    await User.findByIdAndDelete(id);
    res.status(200).json({ msg: "Data delete successfully" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};
