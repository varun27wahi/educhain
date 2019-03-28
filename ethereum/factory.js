import web3 from './web3';
import IssuerFactory from './build/IssuerFactory.json';

const instance = new web3.eth.Contract(
  JSON.parse(IssuerFactory.interface),
  '0x79a15aBc48F41ffeBafE079E6F04f3a70cc7CA98'
);

export default instance;
