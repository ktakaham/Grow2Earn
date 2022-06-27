const main = async () => {
  const [owner, addr1] = await hre.ethers.getSigners();
  console.log("owner: ", owner.address);
  console.log("addr1: ", addr1.address);
  const nftContractFactory = await hre.ethers.getContractFactory("Grow2Earn");
  const nftContract = await nftContractFactory.deploy();
  await nftContract.deployed();
  console.log("Contract deployed to:", nftContract.address);
  let txn;
  txn = await nftContract.makeAgaveNFT("https://abcdefg", "https://hijkelmn");
  await txn.wait();
  txn = await nftContract.tokenURI(0);
  console.log(txn)
  txn = await nftContract.transferFrom(owner.address, addr1.address, 0);
  await txn.wait();
  txn = await nftContract.updateTokenURI(0, "hoge", "fuga");
  await txn.wait();
  txn = await nftContract.tokenURI(0);
  console.log(txn);
  txn = await nftContract.getRecord(0);
  console.log(txn);
  txn = await nftContract.connect(addr1).switchTokenURI(0,1);
  console.log(txn);
  txn = await nftContract.tokenURI(0);
  console.log(txn);
  txn = await nftContract.connect(addr1).redeem(0);
  await txn.wait();
  
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
runMain();