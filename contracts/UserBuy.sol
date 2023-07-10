// SPDX-License-Identifier: MIT

pragma solidity ^0.8.17;

import "../contracts/mytoken.sol";
import "openzeppelin-solidity/contracts/token/ERC20/IERC20.sol";

import "openzeppelin-solidity/contracts/utils/math/SafeMath.sol";
// import "openzeppelin/contracts@4.6.0/token/ERC20/IERC20.sol";

contract UserBuy {
    using SafeMath for uint;
    mytoken token;  

    struct Order{
        address Buyer;
        uint Amount;
        bool is_Claimed;
        uint claimTime; 
    }
    address payable[] public user;
    mapping(uint=>Order) public orderToken;
    mapping(address=>Order[]) userData; 
    uint tokenPrice = 1;
    uint orderId = 1;

    event OrderPlaced(uint OrderID, uint BuyTime);
    event OrderClaimed(uint OrderID, uint ClaimTime);
    address addressA;
    constructor (address _add) public {
        addressA=_add;
        token = mytoken(addressA);
    } 
    function buyTokens(uint _amount) public payable {
        // address _ad = address(this);
        // uint a = msg.value*100;
        // require((msg.value/1000000000000000000)*100 == _amount,"Insufficiant Paid amount");
        require(token.balanceOf(address(this))>=_amount,"Insufficiant Token Balance");
        
        // require(msg.value==_amount.mul(tokenPrice),"Insufficiant Paid amount");
        orderToken[orderId] = Order(msg.sender,_amount,false,block.timestamp+60);
        userData[msg.sender].push(Order(msg.sender,_amount,false,block.timestamp+60));
        emit OrderPlaced(orderId,block.timestamp);
        orderId++;
    }
    function claim(uint _orderId) public {
        
        require(isClaimer(msg.sender, _orderId),"You are not the Buyer of this order");
        require(isClaimed(_orderId),"Tokens are already Claimed");
        require(isClaimable(_orderId),"You can't Claim Tokens Now");
        // bool is_Claimed = true;
        token.transfer(orderToken[_orderId].Buyer,orderToken[_orderId].Amount);
        emit OrderClaimed(_orderId,block.timestamp);
        orderToken[_orderId].is_Claimed = true;
    }
    function isClaimable(uint _orderId) public view returns(bool){
        if(orderToken[_orderId].claimTime <block.timestamp){
            return (true);
        }
        return (false);
    }

    function isClaimed(uint _orderId) public view returns(bool) {
        // require(orderToken[_orderId].is_Claimed);
        if(orderToken[_orderId].is_Claimed==false){
            return true;
        }
        return false;
    }

    function isClaimer(address _user, uint _orderId) public view returns(bool) {
        if(orderToken[_orderId].Buyer==_user){
            return true;
        }
        return false;
    }

    function getUserData(address _user) public view returns(Order[] memory){
        return userData[_user];
    }

    receive() external payable
    {   
        require(msg.value>=1 ether);
        user.push(payable(msg.sender));
    }
    function value() payable public  returns(uint){
        return msg.value;
    }
    
    function ViewToken() public view returns(uint){
        return address(this).balance;
    }
}