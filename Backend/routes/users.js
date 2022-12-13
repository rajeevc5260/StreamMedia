const router = require("express").Router();
// Bring the resgitration function
const { userRegister, userLogin, userAuth, serializeUser, checkRole } = require("../utils/auth");

//  users registration route
router.post("/registerUser", async (req, res) => {
  await userRegister(req.body, "user", res);
});
//  Admin registration route
router.post("/registerAdmin", async (req, res) => {
  await userRegister(req.body, "admin", res);
});
//  Super Admin registration route
router.post("/registerSuperAdmin", async (req, res) => {
  await userRegister(req.body, "superAdmin", res);
});

//  users login route
router.post("/loginUser", async (req, res) => {
  await userLogin(req.body, "user", res);
});

//  admin login route
router.post("/loginAdmin", async (req, res) => {
  await userLogin(req.body, "admin", res);
});

//  superAdmin login route
router.post("/loginSuperAdmin", async (req, res) => {
  await userLogin(req.body, "superAdmin", res);
});

// common profile route
router.get("/profile", userAuth, async (req, res) => {
   console.log(req.user);
  return res.json(serializeUser(req.user));
});

//  users protected route
router.get("/userProtected", userAuth, checkRole(["user"]), async (req, res) => {
    return res.json("Hello User");
});

//  admin protected route
router.get("/adminProtected", userAuth, checkRole(["admin"]), async (req, res) => {
    return res.json("Hello admin");
});

//  superAdmin protected route
router.get("/superAdminProtected",  userAuth, checkRole(["superAdmin"]), async (req, res) => {
    return res.json("Hello superAdmin");
});

module.exports = router;
