import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getUserLikedMovies } from '../store/slices/netflixSlice';
import { onAuthStateChanged } from 'firebase/auth';
import { firebaseAuth } from '../utils/firebase-config';
import styled from 'styled-components';
import NavBar from '../components/NavBar';
import Card from '../components/Card';


const UserLiked = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const movies = useSelector(state => state.netflixSlice.movies)
    const [isScrolled, setIsScrolled] = useState(false);
    const [email, setEmail] = useState(undefined)

    onAuthStateChanged(firebaseAuth, (currentUser) => {
        if (currentUser) {
            setEmail(currentUser.email);
        } else navigate('/login')
    })

    window.onscroll = () => {
        setIsScrolled(window.pageYOffset === 0 ? false : true)
        return () => (window.onscroll = null);
    }

    useEffect(() => {
        if (email) {
            dispatch(getUserLikedMovies(email))
        }
    }, [dispatch, email])

    return (
        <Container>
            <NavBar isScrolled={isScrolled} />
            <div className="content flex column">
                <h1>My list</h1>
                <div className="grid flex">
                    {movies.map((movie, i) => <Card movieData={movie} index={i} key={movie.id} isLiked={true} />)}
                </div>
            </div>
        </Container>
    )
}

const Container = styled.div`
.content{ 
    margin: 8rem 2.3rem 2.3rem;
    gap: 3rem;
    h1{
        margin-left: 3rem;
    }
    .grid{ flex-wrap: wrap;
    gap: 1rem;
}

}
`

export default UserLiked
