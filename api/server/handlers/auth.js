const Users = require("../models/user");
const bcrypt = require("bcrypt");
const { client } = require("../utils/redis");

const login = async (req, res) => {
  async function validatePassword(plainPassword, hashedPassword) {
    return await bcrypt.compare(plainPassword, hashedPassword);
  }

  try {
    const { email, password } = req.body;

    const user = await Users.findByCredentials(email, password);

    const match = await validatePassword(password, user.password);
    if (!match) throw new Error("Password does not match");

    const token = await user.createAuthToken();
    // await client.set('authToken', token, 'EX', 60 * 60)

    await Users.findByIdAndUpdate(user._id, { token });
    res.status(200).send({
      data: { email: user.email, role: user.role },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: error.message });
  }
};

module.exports = {
  login,
};
