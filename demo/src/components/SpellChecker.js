import React from 'react';

import { SpellCheck } from '@unbxd-ui/react-search-sdk';
import { scrollTop } from '../utils';

export const SpellCheckItemComponent = ({ itemData, onClick }) => {
    const { suggestion } = itemData;
    const handleClick = () => {
        onClick(itemData);
    };
    return (
        <div className="UNX-spellCheck__item">
            Did you mean
            <span
                className="-suggestion"
                onClick={handleClick}
                data-testid="UNX_spellCheck"
                tabIndex={0}
                role={'button'}
            >
                {suggestion}
            </span>
            ?
        </div>
    );
};

const onSpellCheckClick = () => {
    scrollTop();
    return true;
};

const SpellChecker = () => {
    return (
        <SpellCheck
            spellCheckItemComponent={<SpellCheckItemComponent />}
            onSpellCheckClick={onSpellCheckClick}
        />
    );
};

export default SpellChecker;
