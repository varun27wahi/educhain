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
    infoMessageContent: '',
    errorMessage: '',
    warning: false,
    loading: false
  }

  static async getInitialProps(props) {
    const { address } = props.query;
    const issuer = Issuer(address);
    const issuerName = await issuer.methods.issuerName().call();
    const numberOfCertificates = await issuer.methods.getNumberOfCertificates().call();

    return { address, issuer, issuerName, numberOfCertificates };
  }

  onSubmit = async event => {
    event.preventDefault();

    this.setState({
      loading: true,
      errorMessage: '',
      warning: false,
      infoMessageContent: ''
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

      const latestCertificate = await this.props.issuer.methods.certificates(this.props.numberOfCertificates).call();
      const uniqueID = latestCertificate.id;
      console.log(uniqueID);
      const messageContent = `${uniqueID}: Kindly pass it on to the student.`;
      console.log(messageContent);
      this.setState({ infoMessageContent: messageContent, warning: false });
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

          <Message warning header="Please see!"
            list={[
              "Your transaction will take 10-15 seconds to be completed in the Blockchain.",
              "The transaction will only go through if you're the Issuer."
            ]} />
          <Message error header="Oops!" content={this.state.errorMessage} />
          <Button icon labelPosition="left" primary loading={this.state.loading}>
            <Icon name="add circle" />
            Issue to Blockchain
          </Button>
        </Form>

        <Message
          info
          icon="file alternate outline"
          header="Unique ID of this Certificate"
          content={this.state.infoMessageContent}
        />
      </Layout>
    );
  }
}

export default NewCertificate;
