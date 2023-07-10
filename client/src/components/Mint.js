import { ethers } from "ethers";
import { useState } from "react";

const Mint = ({state})=>{
    const [text, setfirst] = useState('');
    const [number, setnumber] = useState('');
    const [bal, setbal] = useState(0);
    // const [contract_add, setcontract_add] = useState('');
    const mint_token = async (event)=>{
        event.preventDefault();
        const { contract } = state;
        // const add = document.querySelector("#name").value;
        const minttoken = await contract.mint(text,number);
        const s1=await minttoken.wait();
        console.log(minttoken);
        console.log(s1);
        // console.log(add);
        // return add;
    };

    const token_balance = async (data)=>{
        const { contract } = state;
        const add = document.querySelector("#name").value;
        // setcontract_add(add);
        const minttoken = await contract.balanceOf(data);
        const min = Number(minttoken);
        setbal(min);
        // console.log(add);
        // const min = ethers.utils.formatEther(minttoken)
        // const s1=await minttoken.wait();
    };
                                    
    return (
    <>
    <div class="div1"><br></br>
        <h1>Mint Token</h1>
        <div class="div2">
            <form class="form-text" onSubmit={mint_token}><br></br>
                <input class="input1" id="name" type="text" value={text} placeholder="Enter Contract Address" onChange={(e)=>setfirst(e.target.value)}></input><br></br><br></br>
                <input class="input1" id="num" type="number" value={number} placeholder="Enter Amount" onChange={(e)=>setnumber(e.target.value)}></input><br></br><br></br>
                <button type="submit" className="btn btn-success">Transfer</button><br></br><br></br>
            </form>
        </div>
        <p id="balance">Token Balance : {bal}</p>
        <button className="btn btn-info" type="submit" onClick={() => token_balance(text)}>Token-Balance</button>
        <div className="d2 d-flex flex-column justify-content-center align-items-center">
            <a href='/buy'><button class="btn btn-primary d-flex my-4" type='button'>Buy-Token</button></a>
            <a href='/'><button class="btn btn-primary" type='button'>Home</button></a>
        </div>
    </div>
    </>
    );
}
export default Mint;