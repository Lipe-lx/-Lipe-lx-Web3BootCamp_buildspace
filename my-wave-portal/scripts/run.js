const main = async () => {
    //Aqui compilará nosso contrato => O Hardhat Runtime Environment, ou hre abreviado, é um objeto que contém todas as funcionalidades que o Hardhat expõe ao executar uma tarefa, teste ou script.
    const waveContractFactory = await hre.ethers.getContractFactory("WavePortal");
    //Cria uma rede local blockchain e toda vez que rodarmos ele limpa a rede
    const waveContract = await waveContractFactory.deploy();
    //Esperar até que nosso contrato seja oficialmente implantado em nosso blockchain local
    await waveContract.deployed();
    //waveContract.address é o nosso endereço de contrato implantado na rede
    console.log("Contract deployed to:", waveContract.address);
    

    //Chamando as funções na hora do deployed para testes de interação com o contrato
    let waveCount;
    waveCount = await waveContract.getTotalWaves();
    console.log(waveCount.toNumber());

    /**
     * Let's send a few waves!
     */
    let waveTxn = await waveContract.wave("A message!");
    await waveTxn.wait(); // Wait for the transaction to be mined
  
    const [_, randomPerson] = await hre.ethers.getSigners();
    waveTxn = await waveContract.connect(randomPerson).wave("Another message!");
    await waveTxn.wait(); // Wait for the transaction to be mined
  
    let allWaves = await waveContract.getAllWaves();
    console.log(allWaves);
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