
import { deleteUser, updateUser } from "../controller/user/user.js";
import { addAddress } from "../controller/user/address.js";
import { Router } from "express";

// initial route http://localhost:9005/api/v1/utilisateur/

const router = Router()

router.patch("/updateUser/:id",updateUser)
router.patch("/updateUser/:id/address",addAddress)
router.delete("/updateUser/:id/delete",deleteUser)


export default router