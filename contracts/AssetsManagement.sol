pragma solidity ^0.5.0;

contract AssetsManagement {

  enum AccountType { DEALER, SERVICE_CENTER, DRIVER }

  struct ParticipantDetail {
    address client;
    AccountType accountType;
  }

  struct Asset {
    uint256 index;
    address creator;
    string Item;
    string SerialNumber;
    string DateCommissioned;
    address Administrator;
  }

  struct Calibration {
    uint256 index;
    uint256 assetIndex;
    string Date;
    string CalibrationType1;
    string CalibrationType2;
    string CalibrationType3;
    address CalibratedBy;
  }

  address public owner;
  uint256 public assetIndex;
  uint256 public calibrationsIndex;

  mapping(address => ParticipantDetail) public participants;
  mapping(uint256 => Asset) public assets;
  mapping(uint256 => Calibration) public calibrations;

  // EVENTS

  event SignupEvent(address sender, AccountType _type);
  event AddAssetEvent(address sender, uint256 assetid);
  event AddCalibrationsEvent(address sender, uint calibrationsid);

  // EVENTS ENDS

  modifier onlyOwner() {
    require(msg.sender == owner, "Sender is not owner.");
    _;
  }

  constructor() public {
    owner = msg.sender;
  }

  function signup(
    AccountType _type
  ) public {
    require(msg.sender != participants[msg.sender].client, "Sender is not yet signup");

    participants[msg.sender] = ParticipantDetail(msg.sender, _type);

    emit SignupEvent(msg.sender, _type);
  }

  function addAsset (
    string memory item,
    string memory serialNumber,
    string memory dateCommissioned,
    address administrator
  ) public {

    require(
      participants[msg.sender].accountType == AccountType.DEALER,
      "Sender is not a dealer."
    );

    require(
      participants[msg.sender].accountType == AccountType.DEALER,
      "Sender is not a dealer."
    );

    assetIndex++;
    assets[assetIndex] = Asset(
      assetIndex,
      msg.sender,
      item,
      serialNumber,
      dateCommissioned,
      administrator
    );

    emit AddAssetEvent(msg.sender, calibrationsIndex);
  }

  function addCalibration (
    uint256 _assetIndex,
    string memory _date,
    string memory _calibrationType1,
    string memory _calibrationType2,
    string memory _calibrationType3
  ) public {

    require(
      participants[msg.sender].accountType == AccountType.SERVICE_CENTER,
      "Sender is not a service center."
    );

    calibrationsIndex++;
    calibrations[calibrationsIndex] = Calibration(
      calibrationsIndex,
      _assetIndex,
      _date,
      _calibrationType1,
      _calibrationType2,
      _calibrationType3,
      msg.sender
    );

    emit AddCalibrationsEvent(msg.sender, calibrationsIndex);
  }
}
