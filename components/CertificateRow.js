import React, { Component } from 'react';
import { Table, Button } from 'semantic-ui-react';

class CertificateRow extends Component {
  render() {
    const { Row, Cell } = Table;
    const { id, certificate } = this.props;

    return (
      <Row>
        <Cell>{id + 1}</Cell>
        <Cell>{certificate.description}</Cell>
        <Cell>{certificate.issuingAuthority}</Cell>
        <Cell>{certificate.recipientID}</Cell>
        <Cell>{certificate.typeOfCertificate}</Cell>
        <Cell>
          <Button primary>Verify</Button>
        </Cell>
      </Row>
    );
  }
}

export default CertificateRow;
