const {
    authService
 } = require('../services');

const login = (req, res, next) => {
  authService.login(req, res, next);
}

const logout = (req, res) => {
  authService.logout(req, res);
}

module.exports = {
  login,
  logout
};