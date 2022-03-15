import React from 'react';

import { SpellCheck } from '../../../src/index';
import { scrollTop } from '../utils';

export const SpellCheckItemComponent = (props) => {
    const {
        itemData,
        currentQuery,
        onClick
    } = props;
    const { suggestion } = itemData;
    const handleClick = () => {
        onClick({
            suggestion:currentQuery
        });
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
                {currentQuery}
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
