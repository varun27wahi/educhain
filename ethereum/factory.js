import web3 from './web3';
import IssuerFactory from './build/IssuerFactory.json';

const instance = new web3.eth.Contract(
  JSON.parse(IssuerFactory.interface),
  '0x5e75323146a88017493188455ABa396C7B458638'
);

export default instance;
