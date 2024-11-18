const express=require("express")
const {checkout, paymentVerification,getAllUsersWithPayments}=require("../controllers/paymentController.js")


const router = express.Router();

router.route("/checkout").post(checkout);

router.route("/paymentverification").post(paymentVerification);
router.route("/getAllUserPayments").get(getAllUsersWithPayments)
module.exports = router;