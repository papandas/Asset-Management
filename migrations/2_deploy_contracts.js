const AssetsManagement = artifacts.require("AssetsManagement");

module.exports = function(deployer) {
  deployer.deploy(AssetsManagement);
};
