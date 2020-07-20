import React from 'react';

import { SpellCheck } from '@unbxd-ui/react-search-sdk';

const SpellCheckItemComponent = ({ itemData, onClick }) => {
    const { suggestion } = itemData;
    return (<div
        className='UNX-spellCheck__item'>Did you mean
        <span className='-suggestion'
            data-suggestion={suggestion}
            onClick={onClick}>{suggestion}</span>?</div>)
}


const SpellChecker = () => {
    return (<SpellCheck SpellCheckItemComponent={SpellCheckItemComponent} />)
}

export default SpellChecker;
