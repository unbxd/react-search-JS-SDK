import React from 'react';
import PropTypes from 'prop-types';

const Button = (props) => <button {...props}>{props.children}</button>;

Button.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};

export default Button;
