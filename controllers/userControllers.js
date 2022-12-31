import User from "../models/User";
import bcrypt from "bcrypt";

//GET all users = http://localhost:3000/api/users

const allUsers = async (req, res) => {
  const usersCount = await User.countDocuments();

  try {
    const users = await User.find().select("-password").lean();

    // If no users
    if (!users?.length) {
      return res.status(400).json({ message: "No users found" });
    }

    res.status(200).json({
      success: true,
      usersCount,
      users,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

// // Create new User = http://localhost:3000/api/user
const newUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Confirm data
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check for duplicate email
    const duplicate = await User.findOne({ email }).lean().exec();

    if (duplicate) {
      return res.status(409).json({ message: "Email address already in use" });
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
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Invalid user data received",
    });
  }
};

// //GET single Employee details => api/Employees/:id

// const getSingleEmployee = async (req, res) => {
//   try {
//     const singleEmployee = await Employee.findById(req.query.id);

//     if (!singleEmployee) {
//       return res.status(404).json({
//         success: false,
//         error: "Employee not found with this ID",
//       });
//     }

//     res.status(200).json({
//       success: true,
//       singleEmployee,
//     });
//   } catch (error) {
//     res.status(400).json({
//       success: false,
//       error: error.message,
//     });
//   }
// };

// //UPDATE single Employee details => api/Employees/:id
// const updateSingleEmployee = async (req, res) => {
//   try {
//     let singleEmployee = await Employee.findById(req.query.id);

//     if (!singleEmployee) {
//       return res.status(404).json({
//         success: false,
//         error: "Employee not found with this ID",
//       });
//     }

//     singleEmployee = await Employee.findByIdAndUpdate(req.query.id, req.body, {
//       new: true,
//       runValidators: true,
//     });
//     res.status(200).json({
//       success: true,
//       singleEmployee,
//     });
//   } catch (error) {
//     res.status(400).json({
//       success: false,
//       error: error.message,
//     });
//   }
// };

// // DELETE images associated with Employee

// //DELETE single Employee details => api/Employees/:id

// const deleteSingleEmployee = async (req, res) => {
//   try {
//     const { id } = await Employee.findById(req.query.id);

//     // Confirm data
//     if (!id) {
//       return res.status(400).json({ message: "Employee ID Required" });
//     }

//     // Does the employee still have assigned notes?
//     const note = await Note.findOne({ employee: id }).lean().exec();
//     if (note) {
//       return res.status(400).json({ message: "Employee has assigned notes" });
//     }

//     // Does the employee exist to delete?
//     const employee = await Employee.findById(id).exec();

//     if (!employee) {
//       return res.status(404).json({
//         success: false,
//         error: "Employee not found with this ID",
//       });
//     }

//     const result = await employee.deleteOne();

//     const reply = `Empoyee ${result.employeeName} with ID ${result._id} deleted`;

//     res.json(reply);
//   } catch (error) {
//     res.status(400).json({
//       success: false,
//       error: error.message,
//     });
//   }
// };

export {
  allUsers,
  newUser,
  //   getSingleEmployee,
  //   updateSingleEmployee,
  //   deleteSingleEmployee,
};
