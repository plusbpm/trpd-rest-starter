import React from 'react';

import Snackbar from '../blocks/Snackbar';

function IndexLayout() {
  return (
    <div>
      Index Layout
      <Snackbar messages={['Error message']} variant="warning" />
    </div>
  );
}

export default IndexLayout;
