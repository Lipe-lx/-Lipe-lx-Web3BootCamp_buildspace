const main = async () => {
  //Aqui compilará nosso contrato => O Hardhat Runtime Environment, ou hre abreviado, é um objeto que contém todas as funcionalidades que o Hardhat expõe ao executar uma tarefa, teste ou script.
  const waveContractFactory = await hre.ethers.getContractFactory("WavePortal");
  //Cria uma rede local blockchain e toda vez que rodarmos ele limpa a rede
  const waveContract = await waveContractFactory.deploy();
  //Esperar até que nosso contrato seja oficialmente implantado em nosso blockchain local
  await waveContract.deployed();
  //waveContract.address é o nosso endereço de contrato implantado na rede
  console.log("Contract addy:", waveContract.address);
  
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