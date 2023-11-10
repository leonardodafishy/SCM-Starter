# Smart Contract Management - Miguel Fesalbon
This project is a smart contract that simulates a bank account on the Ethereum blockchain. The owner of the contract can deposit and withdraw Ether, and the contract keeps track of the balance and logs the transactions.

## Description
The smart contract is coded in Solidity and uses the index.js library to communicate with the Ethereum network. The contract has the following features:
* deposit: The owner can send Ether to the contract and increase the balance.
* withdraw: The owner can withdraw Ether from the contract and decrease the balance.
* balance: The owner can check the current balance of the contract.


## Getting Started
After cloning from GitHub, you will want to do the following to get the code running on your computer.

1. Inside the project directory, in the terminal type: npm i
2. Open two additional terminals in your VS code
3. In the second terminal type: npx hardhat node
4. In the third terminal, type: npx hardhat run --network localhost scripts/deploy.js
5. Back in the first terminal, type npm run dev to launch the front-end.

After this, the project will be running on your localhost. 
Typically at http://localhost:3000/

## Author
Miguel Angelo M. Fesalbon
