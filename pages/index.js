import { useState, useEffect } from "react";
import { ethers } from "ethers";
import atm_abi from "../artifacts/contracts/Assessment.sol/Assessment.json";

export default function HomePage() {
  const [ethWallet, setEthWallet] = useState(undefined);
  const [account, setAccount] = useState(undefined);
  const [atm, setATM] = useState(undefined);
  const [balance, setBalance] = useState(undefined);

  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  const atmABI = atm_abi.abi;

  const getWallet = async () => {
    if (window.ethereum) {
      setEthWallet(window.ethereum);
    }

    if (ethWallet) {
      const account = await ethWallet.request({ method: "eth_accounts" });
      handleAccount(account);
    }
  }

  const handleAccount = (account) => {
    if (account) {
      console.log("Account connected: ", account);
      setAccount(account);
    }
    else {
      console.log("No account found");
    }
  }

  const connectAccount = async () => {
    if (!ethWallet) {
      alert('MetaMask wallet is required to connect');
      return;
    }

    const accounts = await ethWallet.request({ method: 'eth_requestAccounts' });
    handleAccount(accounts);

    getATMContract();
  };

  const getATMContract = () => {
    const provider = new ethers.providers.Web3Provider(ethWallet);
    const signer = provider.getSigner();
    const atmContract = new ethers.Contract(contractAddress, atmABI, signer);

    setATM(atmContract);
  }

  const getBalance = async () => {
    if (atm) {
      setBalance(ethers.utils.formatEther(await atm.balance()));
    }
  }

  const deposit = async () => {
    if (atm) {
      let tx = await atm.deposit({ value: ethers.utils.parseEther("1") });
      await tx.wait()
      await getBalance();
    }
  }

  const withdraw = async () => {
    if (atm) {
      let tx = await atm.withdraw(ethers.utils.parseEther("1"));
      await tx.wait()
      await getBalance();
    }
  }
  const initUser = () => {

    if (!ethWallet) {
      return <p>Please install Metamask in order to use this ATM.</p>
    }

    if (!account) {
      return (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <button onClick={connectAccount}>Connect Metamask Wallet</button>
          </div>
      );
    }

    if (balance === undefined) {
      getBalance();
    }

    return (
        <div style={{ color: '#8A0303', textAlign: 'left' }}>
          <p style={{ fontSize: '30px', fontFamily: 'Segoe UI', color: '#1b1c20' }}>Account Number: <span style={{ color: '#1b1c20', fontWeight: 'bold' }}>{account}</span></p>
          <p style={{ fontSize: '30px', fontFamily: 'Segoe UI', color: '#1b1c20' }}>Balance: <span style={{ color: '#1b1c20', fontWeight: 'bold' }}>{balance}</span></p>
          <div style={{ textAlign: 'center' }}>
            <button onClick={deposit} style={{
              backgroundColor: '#8DD9C7',
              color: 'black',
              padding: '15px 32px',
              fontSize: '16px',
              borderRadius: '12px',
              margin: '10px'
            }}>
              Deposit 1 ETH
            </button>
            <button onClick={withdraw} style={{
              backgroundColor: '#8DD9C7',
              color: 'black',
              padding: '15px 32px',
              fontSize: '16px',
              borderRadius: '12px',
              margin: '10px'
            }}>
              Withdraw 1 ETH
            </button>
          </div>
        </div>
    )
  }

  useEffect(() => { getWallet(); }, []);

  return (
      <main className="container">
        <header style={{
          textAlign: 'center',
          fontSize: '30px',
          fontFamily: 'Segoe UI',
          color: '#1b1c20'
        }}>
          <h1>Smart Contract Management - Miguel Fesalbon</h1>
        </header>
        {initUser()}
        <style jsx global>{`
          body {
            background-image: url('https://images.unsplash.com/photo-1699462515761-90db271d77c8?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D');
            background-size: auto;
          }
        `}</style>
      </main>
  );
}
