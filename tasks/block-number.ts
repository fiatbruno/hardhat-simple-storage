// Just remember that task are mainly for plugins
// And scripts are for your development purposes
// But apart from that they just do the same things

import { task } from "hardhat/config"

export default task("block-number", "Prints the current block number").setAction(
    async (taskArgs, hre) => {
        const blockNumber = await hre.ethers.provider.getBlockNumber()
        console.log(`Current block number: ${blockNumber}`)
    }
) 