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
          <div>
            <Link route={`/issuers/${address}/certificates/new`}>
              <Button floated="right" color="black" basic>
                <a>Issue New Certificate</a>
              </Button>
            </Link>

            <Link route={`/issuers/${address}/certificates/view`}>
              <Button style={{ marginTop: '10px' }} color="black" basic>
                <a>View Certificates for this Issuer</a>
              </Button>
            </Link>
          </div>
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
