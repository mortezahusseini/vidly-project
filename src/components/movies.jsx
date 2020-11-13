import React, { Component } from 'react';
import Like from './common/like'
import Pagination from './common/pagination'
import { getMovies } from '../services/fakeMovieService'
import { paginate } from '../utils/paginate'
import { getGenres } from '../services/fakeGenreService';
import ListGroup from './common/listGroup';

class movies extends Component {
    state = {
        movies: [],
        genres: [],
        pageSize: 4,
        currentPage: 1,
    }

    componentDidMount() {
        const genres = [{name: 'allGenres'}, ...getGenres()]
        this.setState({ movies: getMovies(), genres })
    }

    handleDelete = (movie) => {
        const movies = this.state.movies.filter(m => m._id !== movie._id)
        this.setState({ movies })
    }

    handleGenresSelect = genre => {
        this.setState({ selectedGenre: genre, currentPage: 1 })
    }

    likeHandler = (movie) => {
        const movies = [...this.state.movies]
        const index = movies.indexOf(movie)
        movies[index] = { ...movies[index] }
        movies[index].liked = !movies[index].liked
        this.setState({ movies })
    }

    handlePageChange = page => {
        this.setState({ currentPage: page })
    }

    render() {
        const { length: count } = this.state.movies

        const { pageSize, currentPage, movies: allMovies, selectedGenre } = this.state

        if (!count) { return <p> nothing movies found </p> }

        const filterd = selectedGenre?._id ? allMovies.filter(m => m.genre._id === selectedGenre._id) : allMovies
        
        const movies = paginate(filterd, currentPage, pageSize)
        
        return (
            <React.Fragment>
                <div className="row pt-4">
                    <div className="col-2">
                        <ListGroup items={this.state.genres} onItemSelect={this.handleGenresSelect} selectedItem={this.state.selectedGenre} />
                    </div>
                    <div className="col"><h5> we have {filterd.length} movies </h5>
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
                        <Pagination itemsCount={filterd.length} pageSize={pageSize} onPageChange={this.handlePageChange} currentPage={currentPage} />
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default movies;