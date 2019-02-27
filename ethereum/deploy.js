const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const compiledContract = require('./build/IssueCertificates.json');

const provider = new HDWalletProvider(
  'flat solar version wealth wreck lift betray carpet traffic outdoor motor chimney',
  'https://rinkeby.infura.io/v3/08fdcf2e42a741bdab1d4744442aa782'
);

const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();
  console.log('Attempting to deploy from account', accounts[0]);

  const result = await new web3.eth.Contract(JSON.parse(compiledContract.interface))
    .deploy({ data: compiledContract.bytecode })
    .send({ from: accounts[0], gas: '1000000' });

  console.log('Contract deployed at', result.options.address);
};

deploy();
