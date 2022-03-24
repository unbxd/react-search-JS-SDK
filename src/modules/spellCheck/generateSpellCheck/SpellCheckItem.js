import React from 'react';
import PropTypes from 'prop-types';

const SpellCheckItem = (props) => {
    const {
        itemData, currentQuery, onClick
    } = props;
    const { suggestion } = itemData;
    const handleClick = () => {
        onClick(itemData);
    };
    return (
        <div className="UNX-spellCheck__item">
            <div className="UNX-spellCheck__query">
                Showing results for
                <span className="-query"> {currentQuery}</span>
            </div>
            <div className="UNX-spellCheck__suggestion">
                Did you mean
                <span
                    className="-suggestion"
                    onClick={handleClick}
                    data-testid="UNX_spellCheck"
                    tabIndex={0}
                    role={'button'}
                >
                    {' '}
                    {suggestion}
                </span>
                ?
            </div>
        </div>
    );
};

SpellCheckItem.propTypes = {
    itemData: PropTypes.shape({
        suggestion: PropTypes.string,
        frequency: PropTypes.string
    }),
    currentQuery: PropTypes.string.isRequired
};

export default SpellCheckItem;
