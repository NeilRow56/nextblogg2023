import dbConnect from "../../../lib/dbConnect";
import nc from "next-connect";
import { getUsers } from "../../../controllers/userControllers";

const handler = nc();

dbConnect();

handler.get(getUsers);

export default handler;
