import React, { createRef } from 'react';
import PropTypes from 'prop-types';

class Input extends React.PureComponent {

    inputRef = createRef();

    componentDidMount() {

        const { autoFocus } = this.props;
        if (autoFocus) {
            this.inputRef.current.focus();
        }
    }

    onClickClear = () => {

        const { onClear } = this.props;
        onClear();

        this.inputRef.current.focus();
    }

    render() {

        const { value, onChange, className, clearable } = this.props;
        const showClear = value && value.length > 0;

        return (<div className='UNX-input-container'>
            <input
                value={value}
                onChange={onChange}
                className={`UNX-input-el ${className}`}
                ref={this.inputRef}
            />
            {showClear && clearable && <div onClick={this.onClickClear} className='UNX-input clear-icon'>X</div>}
        </div>)
    }

}

Input.defaultProps = {
    value: "",
    className: "",
    clearable: false,
    autoFocus: false
}

Input.propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    className: PropTypes.string,
    clearable: PropTypes.bool,
    autoFocus: PropTypes.bool
}

export default Input;
