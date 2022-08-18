const { role } = require("../../middlewear/auth");

const endPoints = {
    deleteProfile:[role.User,role.Admin],
    updateProfile:[role.User,role.Admin],
    getUsers :[role.Admin],
    deactivate:[role.Admin],
}
module.exports = {endPoints}