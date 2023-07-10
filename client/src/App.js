import './App.css';
import { useState, useEffect } from 'react';
import abi from "./contracts/mytoken.json"
import Abi from "./contracts/UserBuy.json"
import Button from "./components/button";
import Mint from './components/Mint';
import Buy from './components/Buy';
import { BrowserRouter, Routes, Route } from "react-router-dom";

const { ethers } = require("ethers");
const App = () => {

  const [state, setState] = useState({ provider: null, signer: null, contract: null,Buy_contract:null });
  // const [buy,setbuy] = useState({provider:null,signer:null,contract:null,Buy_contract:null});
  useEffect(() => {
    const connectwallet = async () => {
      const admin_add = "0x07145ac9E67600965e6fEe26D0B1a3A531E6489F";
      const Buy_token_add = "0xFE7C990170C990651C73742aBf4529352902B9E5";
      const Buy_con_abi = Abi.abi;
      const contract_abi = abi.abi;
      const { ethereum } = window;
      const account = await ethereum.request({ method: "eth_requestAccounts" })
      // const account2 = await ethereum.request({ method: "eth_requestAccounts" })

      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const Buy_contract = new ethers.Contract(Buy_token_add, Buy_con_abi, signer)
      const contract = new ethers.Contract(admin_add, contract_abi, signer);
      setState({ provider, signer, contract,Buy_contract });
      console.log("hello-------------------------------------------");
    };
    connectwallet();
  },[]);
  return (
    <div className="App"><br></br>
      <BrowserRouter>
        <Routes>
          <Route path="" element={<Button/>}></Route>
          <Route path="/admin" element={<Mint state={state} />}></Route>
          <Route path="/buy" element={<Buy state={state} />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;