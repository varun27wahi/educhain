import web3 from './web3';
import Issuer from './build/Issuer.json';

export default (address) => {
  return new web3.eth.Contract(
    JSON.parse(Issuer.interface),
    address
  );
}
