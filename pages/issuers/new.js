import React, { Component } from 'react';
import { Form, Message, Button, Input, Icon } from 'semantic-ui-react';
import { Router } from '../../routes';
import Layout from '../../components/Layout';
import factory from '../../ethereum/factory';
import web3 from '../../ethereum/web3';

class NewIssuer extends Component {
  state = {
    name: '',
    issuerAddress: '',
    errorMessage: '',
    warning: false,
    loading: false
  }

  onSubmit = async (event) => {
    event.preventDefault();

    this.setState({
      loading: true,
      errorMessage: '',
      warning: false
    });

    try {
      this.setState({ warning: true });

      const accounts = await web3.eth.getAccounts();
      await factory.methods.createNewIssuer(this.state.name, this.state.issuerAddress).send({
        from: accounts[0]
      });

      Router.pushRoute('/');
    } catch (err) {
      this.setState({
        errorMessage: err.message ,
        warning: false
      });
    }

    this.setState({ loading: false });
  }

  render() {
    return (
      <Layout>
        <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage} warning={this.state.warning}>
          <Form.Field>
            <label>Issuer Name</label>
            <Input
              value={this.state.name}
              onChange={event => this.setState({ name: event.target.value })}
            />
          </Form.Field>

          <Form.Field>
            <label>Issuer Address</label>
            <Input
              value={this.state.issuerAddress}
              onChange={event => this.setState({ issuerAddress: event.target.value })}
            />
          </Form.Field>

          <Message warning header="Please see!"
            list={[
              "The transaction will only be processed if you're the Central Authority.",
              "Your transaction will take 10-15 seconds to be completed in the Blockchain."
            ]} />
          <Message error header="Oops!" content={this.state.errorMessage} />
          <Button icon labelPosition="left" primary loading={this.state.loading}>
            <Icon name="add circle" />
            Create
          </Button>
        </Form>
      </Layout>
    );
  }
}

export default NewIssuer;
