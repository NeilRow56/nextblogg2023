import bcrypt from "bcrypt";
import User from "../../../models/User";
import dbConnect from "../../../lib/dbConnect";

async function handler(req, res) {
  if (req.method !== "POST") {
    return;
  }
  const { name, email, password } = req.body;
  if (
    !name ||
    !email ||
    !email.includes("@") ||
    !password ||
    password.trim().length < 5
  ) {
    res.status(422).json({
      message: "Validation error",
    });
    return;
  }

  await dbConnect();

  const existingUser = await User.findOne({ email: email });
  if (existingUser) {
    res.status(422).json({ message: "User exists already!" });

    return;
  }

  // Hash password
  const hashedPwd = await bcrypt.hash(password, 10); // salt rounds
  const userObject = { name, email, password: hashedPwd };
  // Create and store new user
  const user = await User.create(userObject);

  if (user) {
    //created
    res.status(201).json({ message: `New user ${name} created` });
  }
}

export default handler;
