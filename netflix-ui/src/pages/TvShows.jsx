import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getGenres, fetchMovies } from '../store/slices/netflixSlice';
import { onAuthStateChanged } from 'firebase/auth';
import { firebaseAuth } from '../utils/firebase-config';
import styled from 'styled-components';
import NavBar from '../components/NavBar';
import Slider from '../components/Slider';
import NotAvalible from '../components/NotAvalible';
import SelectedGenre from '../components/SelectedGenre';

const TvShows = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const genresLoaded = useSelector(state => state.netflixSlice.genresLoaded);
    const movies = useSelector(state => state.netflixSlice.movies)
    const {genres} = useSelector(state => state.netflixSlice)
    const [isScrolled, setIsScrolled] = useState(false);

    window.onscroll = () => {
        setIsScrolled(window.pageYOffset === 0 ? false : true)
        return () => (window.onscroll = null);
    }

    useEffect(() => {
        dispatch(getGenres())
    }, [dispatch])

    useEffect(() => {
        if (genresLoaded) dispatch(fetchMovies({ type: 'tv' }))
    }, [dispatch, genresLoaded])

    onAuthStateChanged(firebaseAuth, (currentUser) => {
        /* if (currentUser) {
            navigate('/')
        } */
    }) 
    return (
        <Container>
            <div className="navbar">
                <NavBar isScrolled={isScrolled}/>
            </div>
            <div className="data">
            <SelectedGenre genres={genres} type="tv"/>
                {
                    movies.length ? <Slider movies={movies} />
                    :<NotAvalible />
                }
            </div>
        </Container>
    )
}

const Container = styled.div`
.data{
    margin-top: 8rem;
    .not-availible{
        text-align: center;
        color: #fff;
        margin-top: 4rem;
    }
}
`;

export default TvShows;
