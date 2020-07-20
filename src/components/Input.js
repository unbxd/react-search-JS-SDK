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

        const { value, onChange, className, clearable, ClearComponent, onClear,placeholder } = this.props;
        const showClear = value && value.length > 0 && clearable;

        return (<>
            <input
                value={value}
                placeholder={placeholder}
                onChange={onChange}
                className={className}
                ref={this.inputRef}
            />
            {showClear && (ClearComponent ?
                <ClearComponent onSearchBoxClear={onClear} /> :
                <div onClick={this.onClickClear} className='UNX-searchbox__clearIcon'>X</div>)}

        </>)
    }

}

Input.defaultProps = {
    value: '',
    className: '',
    clearable: false,
    autoFocus: false,
    placeholder:''
}

Input.propTypes = {
    value: PropTypes.string,
    placeholder: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    className: PropTypes.string,
    clearable: PropTypes.bool,
    autoFocus: PropTypes.bool
}

export default Input;
