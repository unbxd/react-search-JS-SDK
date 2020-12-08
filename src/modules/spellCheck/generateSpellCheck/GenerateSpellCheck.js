import React from 'react';
import PropTypes from 'prop-types';

import SpellCheckItem from './SpellCheckItem';
import { List } from '../../../components';

const GenerateSpellCheck = (props) => {
    const {
        spellChecks,
        currentQuery,
        onSuggestionClick,
        spellCheckItemComponent
    } = props;

    return (
        <List
            items={spellChecks}
            ListItem={spellCheckItemComponent || SpellCheckItem}
            idAttribute="suggestion"
            onClick={onSuggestionClick}
            currentQuery={currentQuery}
            className="UNX-spellCheck__list"
        />
    );
};

GenerateSpellCheck.propTypes = {
    spellChecks: PropTypes.arrayOf(PropTypes.object),
    currentQuery: PropTypes.string,
    onSuggestionClick: PropTypes.func.isRequired,
    spellCheckItemComponent: PropTypes.element
};

export default GenerateSpellCheck;
