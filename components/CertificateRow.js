import React, { Component } from 'react';
import { Table, Button } from 'semantic-ui-react';
import { Link, Router } from '../routes';

class CertificateRow extends Component {
  render() {
    const { Row, Cell } = Table;
    const { id, certificate, address } = this.props;

    return (
      <Row>
        <Cell>{id + 1}</Cell>
        <Cell>{certificate.description}</Cell>
        <Cell>{certificate.issuingAuthority}</Cell>
        <Cell>{certificate.recipientID}</Cell>
        <Cell>{certificate.typeOfCertificate}</Cell>
        <Cell>
          <Link route={`/issuers/${address}/certificates/verify/${id}`}>
            <Button primary>Verify</Button>
          </Link>
        </Cell>
      </Row>
    );
  }
}

export default CertificateRow;
