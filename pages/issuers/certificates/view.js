import React, { Component } from 'react';
import { Table } from 'semantic-ui-react';
import Layout from '../../../components/Layout';
import Issuer from '../../../ethereum/issuer';
import CertificateRow from '../../../components/CertificateRow';

class ViewCertificates extends Component {
  static async getInitialProps(props) {
    const { address } = props.query;
    const issuer = Issuer(address);
    const issuerName = await issuer.methods.issuerName().call();
    const numberOfCertificates = await issuer.methods.getNumberOfCertificates().call();

    const certificates = await Promise.all(
      Array(parseInt(numberOfCertificates)).fill().map((element, index) => {
        return issuer.methods.certificates(index).call()
      })
    );

    return { issuerName, numberOfCertificates, certificates, address };
  }

  renderRows() {
    const address = this.props.address;

    return this.props.certificates.map((certificate, index) => {
      return <CertificateRow
        key={index}
        id={index}
        certificate={certificate}
        address={address}
      />
    });
  }

  render() {
    const { Header, Row, HeaderCell, Body } = Table;

    return (
      <Layout>
        <h3>{`Certificates for ${this.props.issuerName}`}</h3>

        <Table>
          <Header>
            <Row>
              <HeaderCell>S.No</HeaderCell>
              <HeaderCell>Description</HeaderCell>
              <HeaderCell>Issuing Authority</HeaderCell>
              <HeaderCell>Recipient ID</HeaderCell>
              <HeaderCell>Type</HeaderCell>
              <HeaderCell></HeaderCell>
            </Row>
          </Header>

          <Body>
            {this.renderRows()}
          </Body>
        </Table>

        <div>
          Found {this.props.numberOfCertificates} certificate(s).
        </div>
      </Layout>
    );
  }
}

export default ViewCertificates;
