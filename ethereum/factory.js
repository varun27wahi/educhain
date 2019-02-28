import web3 from './web3';
import IssuerFactory from './build/IssuerFactory.json';

const instance = new web3.eth.Contract(
  JSON.parse(IssuerFactory.interface),
  '0xCF49b9a8e4883FfF6b5648b8B3E66b85f292A602'
);

export default instance;
