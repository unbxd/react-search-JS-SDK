import React from 'react';
import PropTypes from 'prop-types';

const SpellCheckItem = ({ itemData, currentQuery }) => {

    const { suggestion } = itemData;
    return (<div className='UNX-spellcheck-item'>
        <div className='UNX-spellcheck current-query'>Showing results for {currentQuery}</div>
        <div className='UNX-spellcheck suggestion-container'>Did you mean <strong className='UNX-spellcheck suggestion' data-suggestion={suggestion}>{suggestion}</strong>?</div>
    </div>)
}

SpellCheckItem.propTypes = {
    itemData: PropTypes.shape({
        suggestion: PropTypes.string,
        frequency: PropTypes.string,
    }),
    currentQuery: PropTypes.string.isRequired
}

export default SpellCheckItem;
