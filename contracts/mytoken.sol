// SPDX-License-Identifier: MIT

pragma solidity ^0.8.17;

import "openzeppelin-solidity/contracts/token/ERC20/ERC20.sol";
import "openzeppelin-solidity/contracts/access/Ownable.sol";

contract mytoken is ERC20, Ownable{
    constructor()ERC20 ("mytoken","dvs"){}

    function mint(address to, uint256 amount) public onlyOwner {
    _mint(to, amount);
    }
    function decimals() public view virtual override returns(uint8){
        return 8;
    }
}