import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

const Error = ({ statusCode }) => {
  return (
    <div>
      <h3>Error</h3>
      {statusCode ? (
        <h5>An error {statusCode} occurred on server</h5>
      ) : (
        <h5>An error occurred on client</h5>
      )}
      <Link href="/">
        <a>Home page</a>
      </Link>
    </div>
  );
};

Error.getInitialProps = ({ res, err }) => {
  const responseStatusCode = res ? res.statusCode : null;
  const errorStatusCode = err ? err.statusCode : null;
  const statusCode = errorStatusCode || responseStatusCode;
  if (res && statusCode) res.statusCode = statusCode;
  return { statusCode };
};

Error.propTypes = {
  statusCode: PropTypes.number,
};

Error.defaultProps = {
  statusCode: null,
};

export default Error;
