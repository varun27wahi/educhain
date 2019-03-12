import web3 from './web3';
import IssuerFactory from './build/IssuerFactory.json';

const instance = new web3.eth.Contract(
  JSON.parse(IssuerFactory.interface),
  '0xc6842c70c8407fd034f35db56a39ac0d1849db7e'
);

export default instance;
