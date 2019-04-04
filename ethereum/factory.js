import web3 from './web3';
import IssuerFactory from './build/IssuerFactory.json';

const instance = new web3.eth.Contract(
  JSON.parse(IssuerFactory.interface),
  '0xD87d55f46722a8dA273CB9A7865F5736705aC74C'
);

export default instance;
