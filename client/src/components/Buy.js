import { ethers } from "ethers";
// import { ethers } from "https://cdn.ethers.io/lib/ethers-5.2.umd.min.js";
import { useState } from "react";
// import Buy from "../"

const Buy = ({state}) => {
    // const [text, setfirst] = useState('');
    const [number, setnumber] = useState();
    const [bal,setbal] = useState();
    const [orderid,set_order_id] = useState(0)
    const Token_bal = async (data)=>{
        const { contract } = state;
        // const add = document.querySelector("#name").value;
        // setcontract_add(add);
        const {Buy_contract} = state;
        console.log('ethers==================',ethers);
        const minttoken = await contract.balanceOf(Buy_contract.address);
        // const minttoken = await contract.balanceOf(data);
        const min = Number(minttoken);
        setbal(min);
    };

    const Buy_token = async (event) => {
        event.preventDefault();
        const { Buy_contract } = state;
        // console.log('----------------',Buy_contract);
        const n = Number(number)/100;
        const amount={value:ethers.utils.parseEther(`${n}`)};
        const buytoken = await Buy_contract.buyTokens(Number(number),amount);
        const s1=await buytoken.wait();
        console.log(s1)
        const order_id = s1.events[0].args.OrderID;
        const number_orderid = Number(order_id);
        
        set_order_id(number_orderid);
        // const b = s1.events[0].args.OrderID;
        // console.log("order_id -------------",s1.events[0].args.OrderID);
    };

    const Claim_token = async (event) => {
        event.preventDefault();
        const {Buy_contract} = state;
        console.log('Buy_contract-----------------',Buy_contract);
        const { contract } = state;
        console.log('----------------',contract.address);
        const { ethereum } = window;
        const account = await ethereum.request({
            method: 'wallet_watchAsset',
            params: {
                type: 'ERC20',
                options: {
                    address: "0x07145ac9E67600965e6fEe26D0B1a3A531E6489F",
                    symbol: 'M',
                    decimals: 2,
                    image: 'https://foo.io/token-image.svg',
                },
            },
        })
        
        // const token_bal = Buy_contract.orderToken[orderid].Amount;
        // const amount={value:ethers.utils.parseEther(`${number}`)};
            
        if(!Buy_contract.claim(orderid)){
            const claim_token = await Buy_contract.claim(orderid);
            const c1 = await claim_token.wait();
        }
        else{
            alert("Please Wait 1 Minute AfterThen Claim This Token!");
        }

        // const claim_token = await Buy_contract.claim(orderid);
        // const c1 = await claim_token.wait();
    };
    return (
    <>
    {/* <input id="name" type="text" value={text} placeholder="Enter Contract Address" onChange={(e)=>setfirst(e.target.value)}></input><br></br><br></br> */}
    <div class="div1">
        <br></br>
        <h1>Buy Token</h1>
        <h2 style={{color: "black",fontSize:"40px"}}>{bal}</h2>
        <button className="btn btn-info" type="submit" onClick={()=>Token_bal()}>Available Token Balance</button><br></br><br></br>
        <div class="div2">
            <form onSubmit={Buy_token}><br></br>
                <input class="input1" id="name" type="number" value={number} placeholder="Enter Token Value" onChange={(e)=>setnumber(e.target.value)}></input><br></br><br></br>
                <h3 style={{color:"red"}}>Your Order Id Is :- {orderid}</h3>
                <button className="btn btn-primary" type="submit">Buy-Token</button><br></br><br></br>
            </form>
        </div><br></br>
        <div class="div2">
            <form class="claim" onSubmit={Claim_token}><br></br>
                <input class="input1" type="number" placeholder="Enter Order id"></input><br></br><br></br>
                <button className="btn btn-success"  type="submit">Claim</button><br></br><br></br>
            </form>
        </div><br></br>
        <div className="d2 d-flex flex-column justify-content-center align-items-center">
            <a href='/admin'><button class="btn btn-primary d-flex my-4" type='button'>Admin</button></a>
            <a href='/'><button class="btn btn-primary" type='button'>Home</button></a>
        </div>
    </div>
    </>
    );
}

export default Buy;