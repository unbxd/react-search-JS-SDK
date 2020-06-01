import React from 'react';

class Dropdown extends React.PureComponent {
    state = {
        isOpen: false,
        openOn: "",
        selection: ""
    }

    toggle = () => {
        this.setState({ ...this.state, open: !this.state.open });
    }

    handleOnClick = (item) => {

    }

    render() {

        const { title, items = [], multiSelect = false } = this.props;

        return (<div className='UBX-dropdown-wrapper'>
            <div tabIndex={0}
                className='UBX-dropdown-header'
                role='button'
                onKeyPress={this.toggle}
                onClick={this.toggle}
            >
                <div className='UBX-dropdown-header-title'>
                    <p className='UBX-dropdown-title'>{title}</p>
                </div>
                <div>
                    <p>{this.state.open ? "close" : "open"}</p>
                </div>
            </div>
            {this.state.open && (<ul className='UBX-dropdown-options'>
                {items.map(item => (<li className='UBX-dropdown-option' key={item.id}>
                    <button onClick={this.handleOnClick}>
                        <span>{item.value}</span>
                    </button>
                </li>))}
            </ul>)}
        </div>)
    }
}

export default Dropdown
