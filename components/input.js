import React from 'react';
import PropTypes from 'prop-types';

import './input.less';

const Input = ({ type, onChange, value, placeholder }) => (
  <input className="Input" onChange={event => onChange(event.target.value)}
    value={value} placeholder={placeholder} type={type} />
);

Input.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  placeholder: PropTypes.string,
  type: PropTypes.string
};

Input.defaultProps = {
  placeholder: '',
  type: 'text'
};

export default Input;