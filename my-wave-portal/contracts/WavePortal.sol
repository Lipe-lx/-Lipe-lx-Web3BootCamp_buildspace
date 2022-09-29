// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.17;

import "hardhat/console.sol";

contract WavePortal {
    uint totalWaves;
    uint personWaves;
    mapping (address => uint) public addressWaves; 
    
    constructor() {
        console.log("Yo yo, I am a contract and I am smart");
    }

    function wave() public {
        totalWaves += 1;
        console.log("%s has waved!", msg.sender);
        personWaves += 1;
        addressWaves[msg.sender] = personWaves;
        console.log("Yours total waves is %s", addressWaves[msg.sender]);             
    }

    function getTotalWaves() public view returns (uint) {
        console.log("We have %d total waves!", totalWaves);
        return totalWaves;
    }

    
}