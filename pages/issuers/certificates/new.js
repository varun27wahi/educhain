import React, { Component } from 'react';
import { Form, Message, Button, Input, Icon } from 'semantic-ui-react';
import Issuer from '../../../ethereum/issuer';
import web3 from '../../../ethereum/web3';
import { Link, Router } from '../../../routes';
import Layout from '../../../components/Layout';

class NewCertificate extends Component {
  state = {
    description: '',
    issuingAuthority: '',
    recipientID: '',
    typeOfCertificate: '',
    details: '',
    errorMessage: '',
    warning: false,
    loading: false
  }

  static async getInitialProps(props) {
    const { address } = props.query;
    const issuer = Issuer(address);
    const issuerName = await issuer.methods.issuerName().call();

    return { address, issuer, issuerName };
  }

  onSubmit = async event => {
    event.preventDefault();

    this.setState({
      loading: true,
      errorMessage: '',
      warning: false
    });

    const { description, issuingAuthority, recipientID, typeOfCertificate, details } = this.state;

    try {
      this.setState({ warning: true });

      const accounts = await web3.eth.getAccounts();
      await this.props.issuer.methods.issueCertificate(
        description,
        issuingAuthority,
        recipientID,
        typeOfCertificate,
        details
      ).send({ from: accounts[0] });

      Router.pushRoute(`/issuers/${this.props.address}/certificates/view`);
    } catch (err) {
        this.setState({
          errorMessage: err.message,
          warning: false
        });
    }

    this.setState({ loading: false });
  }

  render() {
    return (
      <Layout>
        <Link route={`/issuers/${this.props.address}/certificates/view`}>
         <a>
          View Certificates
         </a>
        </Link>
        <h3>{`Issue a New Certificate for ${this.props.issuerName}`}</h3>

        <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage} warning={this.state.warning}>
          <Form.Field>
            <label>Description</label>
            <Input
              value={this.state.description}
              onChange={event => this.setState({ description: event.target.value })}
            />
          </Form.Field>

          <Form.Field>
            <label>Issuing Authority</label>
            <Input
              value={this.state.issuingAuthority}
              onChange={event => this.setState({ issuingAuthority: event.target.value })}
            />
          </Form.Field>

          <Form.Field>
            <label>ID of Recipient</label>
            <Input
              value={this.state.recipientID}
              onChange={event => this.setState({ recipientID: event.target.value })}
            />
          </Form.Field>

          <Form.Field>
            <label>Type of Certificate</label>
            <Input
              value={this.state.typeOfCertificate}
              onChange={event => this.setState({ typeOfCertificate: event.target.value })}
            />
          </Form.Field>

          <Form.Field>
            <label>Additional Details</label>
            <Form.TextArea
              value={this.state.details}
              onChange={event => this.setState({ details: event.target.value })}
            />
          </Form.Field>

          <Message warning header="Please wait!" content="Your transaction will take 10-15 seconds to be completed in the Blockchain." />
          <Message error header="Oops!" content={this.state.errorMessage} />
          <Button icon labelPosition="left" primary loading={this.state.loading}>
            <Icon name="add circle" />
            Issue to Blockchain
          </Button>
        </Form>
      </Layout>
    );
  }
}

export default NewCertificate;
