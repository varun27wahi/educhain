import React, { Component } from 'react';
import Layout from '../../../components/Layout';
import { Table, Message } from 'semantic-ui-react';
import Issuer from '../../../ethereum/issuer';
import { Link, Router } from '../../../routes';

class VerifyCertificate extends Component {
  static async getInitialProps(props) {
    const { address, id } = props.query;

    const issuer = Issuer(address);
    const issuerName = await issuer.methods.issuerName().call();
    const certificate = await issuer.methods.certificates(id).call();

    return { certificate, address, id, issuerName };
  }

  render() {
    const { Header, Row, HeaderCell, Body, Cell } = Table;
    const { certificate, address, id, issuerName } = this.props;

    return (
      <Layout>
        <Link route={`/issuers/${address}/certificates/view`}>
         <a>
          Back to List
         </a>
        </Link>
        <h3>Verify Certificate for {issuerName}</h3>

        <Table basic="very" celled collapsing>
          <Header>
            <HeaderCell textAlign="center">Property</HeaderCell>
            <HeaderCell>Value</HeaderCell>
          </Header>

          <Body>
            <Row>
              <Cell active textAlign="center">Unique Certificate ID</Cell>
              <Cell>{certificate.id}</Cell>
            </Row>
            <Row>
              <Cell active textAlign="center">Description</Cell>
              <Cell>{certificate.description}</Cell>
            </Row>
            <Row>
              <Cell active textAlign="center">Issuing Authority</Cell>
              <Cell>{certificate.issuingAuthority}</Cell>
            </Row>
            <Row>
              <Cell active textAlign="center">Recipient ID</Cell>
              <Cell>{certificate.recipientID}</Cell>
            </Row>
            <Row>
              <Cell active textAlign="center">Issuing Date</Cell>
              <Cell>{certificate.issuingDate}</Cell>
            </Row>
            <Row>
              <Cell active textAlign="center">Type of Certificate</Cell>
              <Cell>{certificate.typeOfCertificate}</Cell>
            </Row>
            <Row>
              <Cell active textAlign="center">Additional Details</Cell>
              <Cell>{certificate.details}</Cell>
            </Row>
          </Body>
        </Table>

        <Message
          info
          icon="info"
          header="How to Verify!"
          content="To verify the certificate, match the ID given here to the one given by the student."
        />
      </Layout>
    );
  }
}

export default VerifyCertificate;
