import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

const Snackbar = ({ global, messages, onClose, variant }) => {
  const isOpen = messages.filter(text => !!text).length > 0;

  const handleKeyDown = event => {
    if (!isOpen) return;
    if (event.keyCode === 27 && onClose) {
      onClose();
    }
  };

  useEffect(() => {
    if (!global) return () => {};
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  });

  return (
    <div className={clsx('snackbar', isOpen && 'open', global && 'global', variant || 'info')}>
      <div>
        {messages.map(text => (
          <span key={text}>
            {text}
            <br />
          </span>
        ))}
      </div>
      <div className="close-button" onClick={onClose} role="presentation">
        X
      </div>
      <style jsx>
        {`
          .global.snackbar {
            position: fixed;
            bottom: 20px;
            right: 20px;
          }
          .snackbar {
            display: none;
            padding: 20px;
            min-width: 30%;
            border-radius: 3px;
          }
          .open {
            display: flex;
            justify-content: space-between;
            flex-wrap: nowrap;
            align-items: center;
          }
          .info {
            background-color: #7986cb;
            color: #fff;
          }
          .warning {
            background-color: #e57373;
          }
          .success {
            background-color: #ff4081;
          }
          .close-button {
            cursor: pointer;
            padding: 10px;
          }
          .close-button:hover {
            background-color: #ccc;
          }
        `}
      </style>
    </div>
  );
};

Snackbar.propTypes = {
  global: PropTypes.bool,
  messages: PropTypes.arrayOf(PropTypes.string),
  onClose: PropTypes.func,
  variant: PropTypes.oneOf(['info', 'success', 'warning']),
};

Snackbar.defaultProps = {
  global: true,
  messages: [],
  onClose: undefined,
  variant: 'info',
};

export default Snackbar;
