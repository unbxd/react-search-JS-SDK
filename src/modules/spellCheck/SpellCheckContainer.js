import React from 'react';
import PropTypes from 'prop-types';

import GenerateSpellCheck from './generateSpellCheck';
import { conditionalRenderer, executeCallback } from '../../common/utils';
import { searchStatus } from '../../config';

/**
 * Component to manage query suggestions.
 */
class SpellCheckContainer extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            typedQuery: '',
            spellChecks: [],
            currentSuggestion: ''
        };
        this.isLoadedFromSpellCheck = false;
    }

    componentDidMount() {
        const {
            helpers: { setSpellCheckConfiguration }
        } = this.props;
        setSpellCheckConfiguration({ enable: true });
    }

    componentDidUpdate(prevProps) {
        const {
            unbxdCore,
            unbxdCoreStatus,
            helpers: { setSearchBoxConfiguration },
            query
        } = this.props;
        // get the number of product
        const { numberOfProducts = 0 } = unbxdCore.getSearchResults() || {};
        // check if we got spellcheck suggestion
        const spellChecks = unbxdCore.getDidYouMeanFromResponse();
        const { currentSuggestion } = this.state;
        if (
            unbxdCoreStatus !== prevProps.unbxdCoreStatus &&
            unbxdCoreStatus === 'READY' &&
            numberOfProducts === 0 &&
            spellChecks.length
        ) {
            // trigger a new search
            // save the typed query
            if(!this.isLoadedFromSpellCheck){
                const currentSuggestion = spellChecks[0]['suggestion'];
                this.setState({
                    typedQuery: query,
                    currentSuggestion,
                    spellChecks
                });
                setSearchBoxConfiguration({ query: currentSuggestion });
            }
            this.isLoadedFromSpellCheck = false;
        } else if (
            unbxdCoreStatus !== prevProps.unbxdCoreStatus &&
            unbxdCoreStatus === searchStatus.LOADING &&
            query !== prevProps.query &&
            currentSuggestion.length &&
            query !== currentSuggestion
        ) {
            this.setState({
                typedQuery: '',
                currentSuggestion: '',
                spellChecks: []
            });
        }
    }

    getSpellCheckProps() {
        const {
            helpers: { setSearchBoxConfiguration },
            onSpellCheckClick
        } = this.props;

        const { spellCheckItemComponent } = this.props;
        const handleSuggestionClick = (currentItem) => {
            const { suggestion } = currentItem;
            this.isLoadedFromSpellCheck = true;
            const onFinish = () => {
                setSearchBoxConfiguration({ query: suggestion });
                this.setState({ typedQuery: suggestion, spellChecks: []});
            };

            executeCallback(onSpellCheckClick, [suggestion], onFinish);
        };
        const { typedQuery: currentQuery, spellChecks } = this.state;
        return {
            spellChecks,
            currentQuery,
            onSuggestionClick: handleSuggestionClick,
            spellCheckItemComponent
        };
    }

    render() {
        const DefaultRender = GenerateSpellCheck;

        return conditionalRenderer(
            this.props.children,
            this.getSpellCheckProps(),
            DefaultRender
        );
    }
}

SpellCheckContainer.propTypes = {
    unbxdCore: PropTypes.object.isRequired,
    helpers: PropTypes.object.isRequired,
    spellCheckItemComponent: PropTypes.element,
    onSpellCheckClick: PropTypes.func
};

export default SpellCheckContainer;
