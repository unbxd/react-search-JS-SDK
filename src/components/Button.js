import React from 'react';
import PropTypes from 'prop-types';

const Button = (props) => (
    <button type="button" tabIndex={0} {...props}>
        {props.children}
    </button>
);

Button.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};

export default Button;
