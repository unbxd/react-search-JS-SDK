import React from 'react';

import { SpellCheckContextConsumer } from '../context';
import SpellCheckItem from './SpellCheckItem';
import { List } from '../../../components';

const GenerateSpellCheck = () => {
    return (<SpellCheckContextConsumer>
        {({ data, helpers }) => {
            const { spellChecks, currentQuery } = data;
            const { onSuggestionClick, SpellCheckItemComponent } = helpers;

            return (<List
                items={spellChecks}
                ListItem={SpellCheckItemComponent || SpellCheckItem}
                idAttribute={"suggestion"}
                onClick={onSuggestionClick}
                currentQuery={currentQuery}
                className={'UNX-spellCheck__list'} />);
        }}
    </SpellCheckContextConsumer>)
}

export default GenerateSpellCheck;
