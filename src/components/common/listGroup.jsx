import React from 'react';

const ListGroup = props => {
    const { items, textProperty, valueProperty, onItemSelect, selectedItem } = props

    return (<ul className="list-grop">
        {items.map(item => <li key={item[valueProperty]} onClick={() => onItemSelect(item)} className={`list-group-item cursor-pointer ${item === selectedItem ? 'active' : ''} `}>{item[textProperty]}</li>)}
    </ul>);
}

ListGroup.defaultProps = {
    textProperty: 'name',
    valueProperty: '_id'
}

export default ListGroup;