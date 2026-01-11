export const adminLogin = async (req, res) => {
  const { username, password } = req.body;

  // PERMANENT ADMIN ACCOUNT
  const ADMIN_USER = "Khadija";
  const ADMIN_PASS = "Sprinter@6001";

  if (username === ADMIN_USER && password === ADMIN_PASS) {
    return res.json({
      success: true,
      message: "Admin login successful",
      admin: true
    });
  }

  res.json({ success: false, message: "Invalid admin credentials" });
};
