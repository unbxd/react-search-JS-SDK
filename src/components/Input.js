import React, { createRef } from 'react';
import PropTypes from 'prop-types';
import { cloneElement } from '../common/utils';
class Input extends React.PureComponent {
    inputRef = createRef();

    componentDidMount() {
        const { autoFocus } = this.props;
        if (autoFocus) {
            this.inputRef.current.focus();
        }
    }

    handleClickClear = () => {
        const { onClear } = this.props;
        onClear();

        this.inputRef.current.focus();
    };

    render() {
        const {
            value,
            name,
            onChange,
            className,
            clearable,
            clearComponent,
            onClear,
            placeholder,
            ariaLabel
        } = this.props;
        const showClear = value && value.length > 0 && clearable;

        return (
            <>
                <input
                    value={value}
                    name={name}
                    placeholder={placeholder}
                    onChange={onChange ? onChange : null}
                    className={className}
                    ref={this.inputRef}
                    aria-label={ariaLabel}
                />
                {showClear &&
                    (clearComponent ? (
                        cloneElement(clearComponent, {
                            onSearchBoxClear: onClear
                        })
                    ) : (
                        <div
                            onClick={this.handleClickClear}
                            className="UNX-searchbox__clearIcon"
                            data-testid="UNX-searchbox__clearIcon"
                        >
                            X
                        </div>
                    ))}
            </>
        );
    }
}

Input.defaultProps = {
    value: '',
    className: '',
    clearable: false,
    autoFocus: false,
    placeholder: ''
};

Input.propTypes = {
    value: PropTypes.string,
    name: PropTypes.string,
    placeholder: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    className: PropTypes.string,
    clearable: PropTypes.bool,
    autoFocus: PropTypes.bool,
    onChange: PropTypes.func,
    ariaLabel: PropTypes.string
};

export default Input;
