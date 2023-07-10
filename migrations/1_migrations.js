const Token = artifacts.require("../contracts/mytoken.sol");
const Buy = artifacts.require("../contracts/UserBuy.sol");

module.exports = function(deployer){
    deployer.deploy(Token).then(function(){
        return deployer.deploy(Buy,Token.address);
    });
}