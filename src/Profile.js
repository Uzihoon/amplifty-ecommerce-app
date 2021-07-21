import { AmplifySignOut, withAuthenticator } from '@aws-amplify/ui-react';
import React from 'react';

function Profile() {
  return (
    <div>
      <AmplifySignOut />
    </div>
  );
}

export default withAuthenticator(Profile);
