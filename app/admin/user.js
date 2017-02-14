"use strict";
/**
 * Created by daniellydon on 2/13/17.
 */
var User = (function () {
    function User() {
    }
    return User;
}());
exports.User = User;
(function (Role) {
    Role[Role["Basic"] = 0] = "Basic";
    Role[Role["Bob"] = 1] = "Bob";
    Role[Role["Admin"] = 2] = "Admin";
})(exports.Role || (exports.Role = {}));
var Role = exports.Role;
//# sourceMappingURL=user.js.map