import React, { Component } from 'react';
import { getMovies } from '../services/fakeMovieService'

class movies extends Component {
    state = {
        movies: getMovies()
    }
    handleDelete = (movie) => {
        const movies = this.state.movies.filter(m => m._id !== movie._id)
        this.setState({ movies })
    }

    render() {
        const { length: count } = this.state.movies

        if (!count) { return <p> nothing movies found </p> }
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
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.movies.map(movie => (
                            <tr key={movie._id}>
                                <td> {movie.title} </td>
                                <td> {movie.genre.name} </td>
                                <td> {movie.numberInStock} </td>
                                <td> {movie.dalyRentalRate} </td>
                                <td> <button onClick={() => { this.handleDelete(movie) }} className="btn btn-danger btn-sm"> delete </button> </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </React.Fragment>
        )
    }
}

export default movies;