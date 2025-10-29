// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract CrowdFunding {
  struct Campaign {
    address owner;
    string title;
    string description;
    uint256 target;
    uint256 deadline;
    uint256 amountCollected;
    string image;
    address[] donators;
    uint256[] donations;
  }

  mapping(uint256 => Campaign) public campaigns;

  uint256 public numberOfCampaigns = 0;

  function createCampaign(address _owner, string memory _title, string memory _description, uint256 _target, uint256 _deadline, string memory _image) public returns (uint256) {
    Campaign storage campaign = campaigns[numberOfCampaigns];

    require(campaign.deadline < block.timestamp, "The deadline should be a data in the future.");

    campaign.owner = _owner;
    campaign.title = _title;
    campaign.description = _description;
    campaign.target = _target;
    campaign.deadline = _deadline;
    campaign.amountCollected = 0;
    campaign.image = _image;

    numberOfCampaigns++;

    return numberOfCampaigns - 1;
  }

  function donateToCampaign(uint256 _id) public payable {
    uint256 amount = msg.value;

    Campaign storage campaign = campaigns[_id];

    campaign.donators.push(msg.sender);
    campaign.donations.push(amount);

    // Store funds in contract instead of sending directly
    campaign.amountCollected = campaign.amountCollected + amount;
  }

  function getDonators(uint256 _id) view public returns (address[] memory, uint256[] memory) {
    return (campaigns[_id].donators, campaigns[_id].donations);
  }

  function withdrawCampaignFunds(uint256 _id) public {
    Campaign storage campaign = campaigns[_id];

    require(msg.sender == campaign.owner, "Only campaign owner can withdraw funds");
    require(campaign.amountCollected > 0, "No funds available to withdraw");

    uint256 amount = campaign.amountCollected;
    campaign.amountCollected = 0;

    (bool sent,) = payable(msg.sender).call{value: amount}("");
    require(sent, "Failed to send funds");
  }

  function withdrawPartialFunds(uint256 _id, uint256 _amount) public {
    Campaign storage campaign = campaigns[_id];

    require(msg.sender == campaign.owner, "Only campaign owner can withdraw funds");
    require(_amount > 0, "Amount must be greater than 0");
    require(_amount <= campaign.amountCollected, "Insufficient funds");

    campaign.amountCollected = campaign.amountCollected - _amount;

    (bool sent,) = payable(msg.sender).call{value: _amount}("");
    require(sent, "Failed to send funds");
  }

  function getCampaigns() public view returns (Campaign[] memory) {
    Campaign[] memory allCampaigns = new Campaign[](numberOfCampaigns);

    for (uint i = 0; i < numberOfCampaigns; i++) {
      Campaign storage item = campaigns[i];

      allCampaigns[i] = item;
    }

    return allCampaigns;
  }
}