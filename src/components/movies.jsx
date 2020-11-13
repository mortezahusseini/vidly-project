import React, { Component } from 'react';
import Like from './common/like'
import Pagination from './common/pagination'
import { getMovies } from '../services/fakeMovieService'
import { paginate } from '../utils/paginate'

class movies extends Component {
    state = {
        movies: getMovies(),
        pageSize: 4,
        currentPage: 1,
    }
    handleDelete = (movie) => {
        const movies = this.state.movies.filter(m => m._id !== movie._id)
        this.setState({ movies })
    }

    likeHandler = (movie) => {
        const movies = [...this.state.movies]
        const index = movies.indexOf(movie)
        movies[index] = { ...movies[index] }
        movies[index].liked = !movies[index].liked
        this.setState({ movies })
    }

    handlePageChange = page => {
        this.setState({currentPage: page})
    }


    render() {
        const { length: count } = this.state.movies

        const { pageSize, currentPage, movies: allMovies } = this.state

        if (!count) { return <p> nothing movies found </p> }

        const movies = paginate(allMovies, currentPage, pageSize)

        return (
            <React.Fragment>
                <h5> we have {count} movies </h5>
                <table className="table">
                    <thead>
                        <tr>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {movies.map(movie => (
                            <tr key={movie._id}>
                                <td> {movie.title} </td>
                                <td> {movie.genre.name} </td>
                                <td> {movie.numberInStock} </td>
                                <td> {movie.dalyRentalRate} </td>
                                <td> <Like liked={movie.liked} onClick={() => this.likeHandler(movie)} /> </td>
                                <td> <button onClick={() => { this.handleDelete(movie) }} className="btn btn-danger btn-sm"> delete </button> </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <Pagination itemsCount={count} pageSize={pageSize} onPageChange={this.handlePageChange} currentPage={currentPage} />
            </React.Fragment>
        )
    }
}

export default movies;