import React from 'react';
import { Menu } from 'semantic-ui-react';
import { Link } from '../routes';

export default () => {
  return (
    <Menu style={{ marginTop: '10px' }}>
      <Link route="/">
        <a className="item">EduChain</a>
      </Link>

      <Menu.Menu position="right">
        <Link route="/issuers/new">
          <a className="item">Add Issuer (CA)</a>
        </Link>
      </Menu.Menu>
    </Menu>
  );
}
