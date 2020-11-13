import React from 'react';
import PropTypes from 'prop-types'
import _ from 'lodash'

const Pagination = props => {
    const { itemsCount, pageSize, onPageChange, currentPage } = props
    const pagesCount = Math.ceil(itemsCount / pageSize)
    const pages = _.range(1, pagesCount + 1)
    if (pagesCount === 1) return null
    return (<nav>
        <ul className="pagination">
            {pages.map(page => (
                <li className={ `page-item ${page === currentPage ? 'active' : ''}` } style={{ cursor: "pointer" }} key={page}>
                    <button className="page-link" onClick={() => onPageChange(page)}> {page} </button>
                </li>
            ))
            }
        </ul>
    </nav>);
}

Pagination.propTypes = {
    itemsCount: PropTypes.number.isRequired,
    pageSize: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired, 
    currentPage: PropTypes.number.isRequired
}

export default Pagination;