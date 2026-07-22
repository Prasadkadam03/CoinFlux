import express from "express";
const router = express.Router();
router.post("/login", (req, res) => {
    res.send("login route");
});
router.get("/login", (req, res) => {
    res.send("login route");
});
router.post("/signup", (req, res) => {
});
export default router;
//# sourceMappingURL=auth.js.map