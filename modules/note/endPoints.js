const { role } = require("../../middlewear/auth");

const endPoints = {
    noteCrud: [role.Admin, role.User],
    getUsers: [role.Admin,role.User],
}
module.exports = { endPoints }