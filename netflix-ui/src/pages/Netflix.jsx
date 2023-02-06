import React, { useEffect, useState } from 'react'
import NavBar from '../components/NavBar';
import backgroundImage from '../assets/home.jpg';
import movieLogo from '../assets/homeTitle.webp';
import { FaPlay } from 'react-icons/fa';
import Slider from '../components/Slider'
import { AiOutlineInfoCircle } from 'react-icons/ai';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux'
import { fetchMovies, getGenres } from '../store/slices/netflixSlice';


const Netflix = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const genresLoaded = useSelector(state => state.netflixSlice.genresLoaded);
  const movies = useSelector(state => state.netflixSlice.movies)
  const [isScrolled, setIsScrolled] = useState(false);

  window.onscroll = () => {
    setIsScrolled(window.pageYOffset===0 ? false : true)
    return () => ( window.onscroll = null);
  }

  useEffect(() => {
    dispatch(getGenres())
  },[dispatch])

  useEffect(() => {
    if(genresLoaded) dispatch(fetchMovies({type: 'all'}))
  },[dispatch, genresLoaded])
  return (
    <Container>
      <NavBar isScrolled={isScrolled}/>
      <div className="hero">
        <img src={backgroundImage} alt="backgroundImage" className='background-image'/>
      </div>
      <div className="container">
        <div className="logo">
          <img src={movieLogo} alt="movieLogo" />
        </div>
        <div className="buttons flex">
          <button className='flex j-center a-center'
          onClick={() => navigate('/player')}
          ><FaPlay /> Play</button>
          <button className='flex j-center a-center'><AiOutlineInfoCircle /> More Info</button>
        </div>
      </div>
      <Slider movies={movies}/>
    </Container>
  )
}

const Container = styled.div`
background-color:#000;
.hero{
  position:relative;
  .background-image{
    filter: brightness(60%)
  }
  img{
    width: 100vw;
    height: 100vh;
  }
}
.container{
  position: absolute;
  bottom: 5rem;
  .logo{
    img{
      width: 100%;
      height: 100%;
      margin-left: 5rem;
    }
  }
  .buttons{
    margin: 5rem;
    gap: 2rem;
    button{
      font-size: 1.4rem;
      gap: 1rem;
      border-radius: .2rem;
      padding: 0.5rem 2.4rem 0.5rem 2rem;
      transition: all .3s;
      background: #fff;
      &:hover{
        opacity: .8;
      }
      &:nth-of-type(2){
        background-color: rgba(109,109,110, .7);
        color: white;
        svg{
          font-size: 1.8rem;
        }
      }
    }
  }
}
`;
export default Netflix
