import Profile from "../Model/profileModel.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

const userRegister = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      phone,
      address,
      gender,
      role,
      image,
    } = req.body;
    const existingProfile = await Profile.findOne({ email });

    if (existingProfile) {
      return res.status(400).json({ message: "Profile already exists" });
    }

    const passwordHash = await bcryptjs.hash(password, 10);
    const profile = await Profile.create({
      firstName,
      lastName,
      email,
      password: passwordHash,
      phone,
      address,
      gender,
      role,
      image,
    });
    return res
      .status(201)
      .json({ profile, message: "Profile Created Successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const existingProfile = await Profile.findOne({ email });

    if (!existingProfile) {
      return res.status(401).json({ message: "Invalid Email or Password" });
    }

    const isMatch = await bcryptjs.compare(password, existingProfile.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid Email or Password" });
    }

    const token = await jwt.sign(
      { _id: existingProfile._id },
      process.env.JWT_SECRET_CODE,
      { expiresIn: "1h" }
    );
    return res
      .status(200)
      .json({ token, existingProfile, message: "Login Successful" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const updateProfile = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      phone,
      address,
      gender,
      role,
      image,
    } = req.body;
    const existingProfile = await Profile.findOne({ _id: req.id });

    if (!existingProfile) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    const isMatch = await bcryptjs.compare(password, existingProfile.password);
    if (!isMatch) {
      return res.status(201).json({ message: "Invalid email or password" });
    }
    const token = await jwt.sign(
      { _id: existingProfile._id },
      process.env.JWT_SECRET_CODE,
      { expiresIn: "1h" }
    );
    const passwordHash = await bcryptjs.hash(password, 10);
    const Updated = await Profile.findByIdAndUpdate(req.id, {
      firstName,
      lastName,
      email,
      password: passwordHash,
      phone,
      address,
      gender,
      role,
      image,
    },{new:true});
    return res
      .status(201)
      .json({ token, Updated, message: "Profile Created Successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export { userRegister, userLogin, updateProfile };
