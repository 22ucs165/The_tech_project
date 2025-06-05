const mongoose = require("mongoose");

const layoutSChema = mongoose.Schema({
    data:Object
})

const layoutModel = mongoose.model("layout",layoutSChema);

module.exports = {
    layoutModel
}