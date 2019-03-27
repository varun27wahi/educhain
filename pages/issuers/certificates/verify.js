import React, { Component } from 'react';
import Layout from '../../../components/Layout';
import { Table } from 'semantic-ui-react';
import { Link, Router } from '../../../routes';

class VerifyCertificate extends Component {
  static async getInitialProps(props) {
    const { address, id } = props.query;
    console.log(id);

    return { id };
  }

  render() {
    return (
      <Layout>
        <h3>Verify Certificate</h3>
      </Layout>
    );
  }
}

export default VerifyCertificate;
