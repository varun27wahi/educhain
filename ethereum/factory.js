import web3 from './web3';
import IssuerFactory from './build/IssuerFactory.json';

const instance = new web3.eth.Contract(
  JSON.parse(IssuerFactory.interface),
  '0x002491558B8080B350acF85c42930929a879f7AA'
);

export default instance;
