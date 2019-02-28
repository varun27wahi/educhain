import React, { Component } from 'react';
import { Table } from 'semantic-ui-react';
import Layout from '../../../components/Layout';
import Issuer from '../../../ethereum/issuer';

class ViewCertificates extends Component {
  static async getInitialProps(props) {
    const issuer = Issuer(props.query.address);
    const issuerName = await issuer.methods.issuerName().call();

    return { issuerName };
  }

  render() {
    return (
      <Layout>
        <h3>{`Certificates for ${this.props.issuerName}`}</h3>
      </Layout>
    );
  }
}

export default ViewCertificates;
