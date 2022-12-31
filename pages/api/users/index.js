import dbConnect from "../../../lib/dbConnect";
import nc from "next-connect";
import { allUsers, newUser } from "../../../controllers/userControllers";

const handler = nc();

dbConnect();

handler.get(allUsers);

handler.post(newUser);

export default handler;
