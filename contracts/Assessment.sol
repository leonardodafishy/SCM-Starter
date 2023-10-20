// contracts/Assessment.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Assessment {
    uint public balance;

    constructor(uint initialBalance) {
        balance = initialBalance;
    }

    function setBalance(uint newBalance) public {
        balance = newBalance;
    }

    function getBalance() public view returns (uint) {
        return balance;
    }

    function addFunds(uint amount) public {
        balance += amount;
    }
}
