import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import AppContext from '../../common/context';
import { SpellCheckContextProvider } from './context'
import GenerateSpellCheck from './generateSpellCheck';
import { conditionalRenderer, hasUnbxdSearchWrapperContext } from '../../common/utils';


/**
 * Component to handle query suggestions.
 */
class SpellCheck extends React.Component {

    componentDidMount() {

        if (this.context === undefined) {
            hasUnbxdSearchWrapperContext(SpellCheck.displayName);
        }

        const { helpers: { setSpellCheckConfiguration } } = this.context;
        setSpellCheckConfiguration({ enable: true });
    }

    getSpellCheckProps() {
        const { unbxdCore, helpers: { setSearchBoxConfiguration } } = this.context;

        const { SpellCheckItemComponent } = this.props;
        const spellChecks = unbxdCore.getDidYouMeanFromResponse();
        const currentQuery = unbxdCore.getSearchQuery() || "";
        const onSuggestionClick = (event) => {
            const suggestion = event.target.dataset['suggestion'];
            setSearchBoxConfiguration({ query: suggestion });
        }


        const data = { spellChecks, currentQuery };
        const helpers = { onSuggestionClick, SpellCheckItemComponent };
        return { data, helpers };

    }

    render() {

        const DefaultRender = <Fragment>
            <GenerateSpellCheck />
        </Fragment>

        return (<SpellCheckContextProvider value={this.getSpellCheckProps()}>
            {conditionalRenderer(this.props.children, this.getSpellCheckProps(), DefaultRender)}
        </SpellCheckContextProvider>)
    }
}

SpellCheck.contextType = AppContext;
SpellCheck.GenerateSpellCheck = GenerateSpellCheck;
SpellCheck.displayName = "SpellCheck";

SpellCheck.propTypes = {
    /**
    * Custom Spell check component
    */
    SpellCheckItemComponent: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
}

export default SpellCheck;
