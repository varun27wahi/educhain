import React, { Component } from 'react';
import { Card, Button } from 'semantic-ui-react';
import Layout from '../components/Layout';
import factory from '../ethereum/factory';
import { Link } from '../routes';

class IssuersIndex extends Component {
  static async getInitialProps() {
    const issuers = await factory.methods.getIssuers().call();

    return { issuers };
  }

  renderIssuers() {
    const items = this.props.issuers.map(address => {
      return {
        header: address,
        description: (
          <Link route={`/issuers/${address}/view`}>
            <Button style={{ marginTop: '10px' }}>
              <a>Verify Certificates for this Issuer</a>
            </Button>
          </Link>
        ),
        fluid: true
      }
    });

    return <Card.Group items={items} />
  }

  render() {
    return (
      <Layout>
        <h3>Issuers</h3>
        {this.renderIssuers()}
      </Layout>
    );
  }
}

export default IssuersIndex;
