import React, { Component } from 'react';
import { Form, Message, Button, Input } from 'semantic-ui-react';
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
    loading: false
  }

  static async getInitialProps(props) {
    const { address } = props.query;

    return { address };
  }

  onSubmit = async event => {
    event.preventDefault();

    this.setState({  loading: true, errorMessage: '' });

    const issuer = Issuer(this.props.address);
    const { description, issuingAuthority, recipientID, typeOfCertificate, details } = this.state;

    try {
      const accounts = await web3.eth.getAccounts();
      await issuer.methods.issueCertificate(
        description,
        issuingAuthority,
        recipientID,
        typeOfCertificate,
        details
      ).send({ from: accounts[0] });

      Router.pushRoute(`/issuers/${this.props.address}/certificates/view`);
    } catch (err) {
        this.setState({ errorMessage: err.message });
    }

    this.setState({ loading: false });
  }

  render() {
    return (
      <Layout>
        <Link route={`/issuers/${this.props.address}/certificates/view`}>
         <a>
          Back
         </a>
        </Link>
        <h3>Issue a New Certificate</h3>

        <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
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

          <Message error header="Oops!" content={this.state.errorMessage} />
          <Button primary loading={this.state.loading}>Issue to the Blockchain</Button>
        </Form>
      </Layout>
    );
  }
}

export default NewCertificate;
