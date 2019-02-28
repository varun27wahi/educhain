import web3 from './web3';
import IssuerFactory from './build/IssuerFactory.json';

const instance = new web3.eth.Contract(
  JSON.parse(IssuerFactory.interface),
  '0x9820BA8db1D9a847c60Ab96773d28dB2Db53f3A4'
);

export default instance;
