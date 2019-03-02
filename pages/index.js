import React, { Component } from 'react';
import { Card, Menu } from 'semantic-ui-react';
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
          <Menu secondary>
            <Link route={`/issuers/${address}/certificates/view`}>
              <a className="item">View Certificates for this Issuer</a>
            </Link>

            <Menu.Menu position="right">
              <Link route={`/issuers/${address}/certificates/new`}>
                <a className="item">Are you the Issuer? Add a New Certificate</a>
              </Link>
            </Menu.Menu>
          </Menu>
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
