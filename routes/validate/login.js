const { get } = require("../../config");
const { comparedPassword } = require ("../../helpers");

// const login = async ({ email, password }) => {
//     try {
//         const result = {};
//         const data = await get()
//             .collection("users")
//             .findOne({ email: email, password: password });

const login = async ({ email, password }) => {
  try {
    const result = {};
    const data = await get()
      .collection("users")
      .findOne({ email: email })
      .then(async result => {
        const compared = await comparedPassword(
            password, result.password
            );
        return compared;
      });

    if (!email) {
      result.email = "Wajib Isi";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
      result.email = "Format Email salah";
    }

    if (!password) {
      result.password = "Wajib Isi";
    } else if (password) {
      if (!data) {
        result.password = "Email/Password Salah";
      }
    }

    return result;
  } catch (error) {
    throw error;
  }
};

module.exports = login;
