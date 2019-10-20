var AssetsManagement = artifacts.require("./AssetsManagement.sol");
const truffleAssert = require('truffle-assertions');

//var Web3 = require('web3');

contract('Assets Management Ethereum Network', function (accounts) {
    //var url = new Web3.providers.HttpProvider('http://localhost:7545');
    //var web3 = new Web3(url);

    const delear = accounts[0];
    const service = accounts[1];
    const driver = accounts[2];

    it("Sign-Up Accounts.", function () {
        return AssetsManagement.deployed().then(function (instance) {
            AM_Instance = instance;
            return AM_Instance.signup(0, { from: delear });
        }).then((receipt) => {
            return AM_Instance.participants(delear)
        }).then((receipt) => {
            assert.equal(receipt.client, delear, "Dealer address do not exist");
            assert.equal(receipt.accountType, 0, "Owner is not a Dealer");
            
            return AM_Instance.signup(1, { from: service });
        }).then((receipt) => {
            return AM_Instance.participants(service)
        }).then((receipt) => {
            assert.equal(receipt.client, service, "Service Provider address do not exist");
            assert.equal(receipt.accountType, 1, "Owner is not a Service Provider");
            
            return AM_Instance.signup(2, { from: driver });
        }).then((receipt) => {

            return AM_Instance.participants(driver)
        }).then((receipt) => {
            assert.equal(receipt.client, driver, "Driver address do not exist");
            assert.equal(receipt.accountType, 2, "Owner is not a Driver");
        })
    })


    it("Add Asset.", function () {
        return AssetsManagement.deployed().then(function (instance) {
            AM_Instance = instance;
            return AM_Instance.addAsset("ITEM01", "SERIALNUM01", "123456789", driver, { from: delear });
        }).then((receipt) => {
            //console.log("Events")
            //console.log(events)
            //console.log(receipt.tx)
            return AM_Instance.assetIndex();
        }).then((assetCount) => {
            //console.log("Asset Count", assetCount.toNumber())
            assert.equal(assetCount, 1, "In-correct number of assets");
            return AM_Instance.addAsset("ITEM02", "SERIALNUM02", "123456789", driver, { from: delear });
        }).then((receipt) => {
            //console.log(receipt)
            return AM_Instance.assetIndex();
        }).then((assetCount) => {
            assert.equal(assetCount.toNumber(), 2, "In-correct number of assets");
        })
    })

    it("Add Calibration.", function () {
        return AssetsManagement.deployed().then(function (instance) {
            AM_Instance = instance;
            return AM_Instance.addCalibration(1, "123456789", "A", "B", "C", { from: service });
        }).then((receipt) => {
            return AM_Instance.calibrationsIndex();
        }).then((calibrationsCount) => {
            assert.equal(calibrationsCount.toNumber(), 1, "In-correct number of calibrations");

            return AM_Instance.addCalibration(2, "123456789", "A", "B", "C", { from: service });
        }).then((receipt) => {
            return AM_Instance.calibrationsIndex();
        }).then((calibrationsCount) => {
            assert.equal(calibrationsCount.toNumber(), 2, "In-correct number of calibrations");
        })
    })
})