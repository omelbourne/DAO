const { ethers } = require("hardhat");
const { ANTIPARALLEL_NFT_CONTRACT_ADDRESS } = require("../constants/index.js");

async function main() {
  // Deploy the DummyNFTMarketplace contract first
  const DummyNFTMarketplace = await ethers.getContractFactory(
    "DummyNFTMarketplace"
  );
  const dummyNftMarketplace = await DummyNFTMarketplace.deploy();
  await dummyNftMarketplace.deployed();

  console.log("DummyNFTMarketplace deployed to: ", dummyNftMarketplace.address);

  // Deploy the DAO contract
  const AntiparallelDAO = await ethers.getContractFactory("AntiparallelDAO");
  const antiparallelDAO = await AntiparallelDAO.deploy(
    dummyNftMarketplace.address,
    ANTIPARALLEL_NFT_CONTRACT_ADDRESS,
    {
      // This assumes account has at least 0.5 ETH 
      value: ethers.utils.parseEther("0.5"),
    }
  );
  await antiparallelDAO.deployed();

  console.log("AntiparallelDAO deployed to: ", antiparallelDAO.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
