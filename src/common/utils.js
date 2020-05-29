export const conditionalRenderer = (children, state, DefaultComponents) => {
    const isChildren = children ? true : false;

    return isChildren ?
        (typeof children === 'function' ?
            children(state) : children) :
        (DefaultComponents)
}
