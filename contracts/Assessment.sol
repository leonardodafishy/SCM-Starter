// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract Assessment {
    address payable public owner;
    uint256 private _balance;

    event Deposit(uint256 amount);
    event Withdraw(uint256 amount);

    modifier onlyOwner {
        require(msg.sender == owner, "You are not the owner of this account");
        _;
    }

    constructor(uint initBalance) payable {
        owner = payable(msg.sender);
        _balance = initBalance;
    }

    function balance() public view returns(uint256) {
        return _balance;
    }

    function deposit() public payable onlyOwner {
        uint _previousBalance = _balance;

        _balance += msg.value;

        assert(_balance == _previousBalance + msg.value);
        emit Deposit(msg.value);
    }

    error InsufficientBalance(uint256 balance, uint256 withdrawAmount);

    function withdraw(uint256 _withdrawAmount) public onlyOwner {
        uint _previousBalance = _balance;

        if (_balance < _withdrawAmount) {
            revert InsufficientBalance({
                balance: _balance,
                withdrawAmount: _withdrawAmount
            });
        }

        _balance -= _withdrawAmount;

        assert(_balance == (_previousBalance - _withdrawAmount));

        emit Withdraw(_withdrawAmount);

        owner.transfer(_withdrawAmount);
    }
}
