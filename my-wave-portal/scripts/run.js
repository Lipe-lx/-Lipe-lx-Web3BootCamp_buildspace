const main = async () => {
    //Instanciação de carteiras, owner é quem faz o deployed (nos) e randomPerson é um endereço aleatorio do hardhat local
    const [owner, randomPerson] = await hre.ethers.getSigners();
    //Aqui compilará nosso contrato => O Hardhat Runtime Environment, ou hre abreviado, é um objeto que contém todas as funcionalidades que o Hardhat expõe ao executar uma tarefa, teste ou script.
    const waveContractFactory = await hre.ethers.getContractFactory("WavePortal");
    //Cria uma rede local blockchain e toda vez que rodarmos ele limpa a rede
    const waveContract = await waveContractFactory.deploy();
    //Esperar até que nosso contrato seja oficialmente implantado em nosso blockchain local
    await waveContract.deployed();
    //waveContract.address é o nosso endereço de contrato implantado na rede
    console.log("Contract deployed to:", waveContract.address);
    //owner.address será o endereço da carteira de quem implantou o contrato na rede
    console.log("Contract deployed by:", owner.address);

    //Chamando as funções na hora do deployed para testes de interação com o contrato
    let waveCount;
    waveCount = await waveContract.getTotalWaves();

    let waveTxn = await waveContract.wave();
    await waveTxn.wait();

    waveCount = await waveContract.getTotalWaves();

    waveTxn = await waveContract.connect(randomPerson).wave();
    await waveTxn.wait();

    waveCount = await waveContract.getTotalWaves();

};

const runMain = async () => {
    try {
        await main();
        process.exit(0); // exit Node process without error
    } catch (error) {
        console.log(error);
        process.exit(1); // exit Node process while indicating 'Uncaught Fatal Exception' error
    }
    // Read more about Node exit ('process.exit(num)') status codes here: https://stackoverflow.com/a/47163396/7974948
};

runMain();