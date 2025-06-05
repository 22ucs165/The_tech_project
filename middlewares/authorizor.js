const { userModel } = require("../models/user.model");
const bcrypt = require("bcrypt");

const auhtorizor = async (req, res, next) => {
    const data = req.body;

    const account = await userModel.findOne({ email: data.email });
    if (!account) {
        res.send({ msg: "account does not exist" });
        return;
    }

    bcrypt.compare(data.password, account.password, (err, result) => {
        if (err) {
            console.log(err);
            res.send({ msg: "something went wrong" ,error:err.message});
            return;
        }
        if (result) {
            next();
        } else {
            res.send({ msg: "password do not match" });
        }
    });
};

module.exports = {
    auhtorizor,
};
