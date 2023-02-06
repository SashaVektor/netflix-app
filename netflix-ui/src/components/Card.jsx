import React, { useDebugValue, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components'
import video from '../assets/video.mp4'
import { IoPlayCircleSharp } from 'react-icons/io5'
import { RiThumbUpFill, RiThumbDownFill } from 'react-icons/ri'
import { BsCheck } from 'react-icons/bs';
import { AiOutlinePlus } from 'react-icons/ai'
import { BiChevronDown } from 'react-icons/bi'
import { onAuthStateChanged } from 'firebase/auth';
import { firebaseAuth } from '../utils/firebase-config'
import axios from 'axios'
import { useDispatch } from 'react-redux';
import { removeFromLikedMovies } from '../store/slices/netflixSlice';

const Card = ({ movieData, isLiked = false }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [email, setEmail] = useState(undefined)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  onAuthStateChanged(firebaseAuth, (currentUser) => {
    if (currentUser) {
      setEmail(currentUser.email);
    } else navigate('/login')
  })

  const addToList = async () => {
    try {
      await axios.post('http://localhost:5000/api/user/add', { email, data: movieData })
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <Container onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      <img src={`https://image.tmdb.org/t/p/w500${movieData.image}`} alt="movie" />
      {
        isHovered && (
          <div className="hover">
            <div className="image-video__container">
              <img onClick={() => navigate('/player')}
                src={`https://image.tmdb.org/t/p/w500${movieData.image}`} alt="movie" />
              <video src={video} autoPlay loop muted onClick={() => navigate('/player')} />
            </div>
            <div className="info-container flex column">
              <h3 className='name' onClick={() => navigate('/player')}>{movieData.name}</h3>
              <div className="icons flex j-between">
                <div className="controls flex">
                  <IoPlayCircleSharp title='play' onClick={() => navigate('/player')} />
                  <RiThumbUpFill title='Like' />
                  <RiThumbDownFill title='Dislike' />
                  {
                    isLiked ?
                      <BsCheck title='Remove From List'
                        onClick={() =>
                          dispatch(removeFromLikedMovies({ movieId: movieData.id, email }))} /> :
                      <AiOutlinePlus title='Add to my list' onClick={addToList} />
                  }
                  <div className='info'>
                    <BiChevronDown title='More Info' />
                  </div>
                </div>
              </div>
              <div className="genres flex">
                <ul className='flex'>
                  {movieData.genres.map(genre => <li key={genre}>{genre}</li>)}
                </ul>
              </div>
            </div>
          </div>
        )
      }
    </Container>
  )
}

const Container = styled.div`
width: 230px;
height: 100%;
cursor: pointer;
position: relative;
img{
  border-radius: .2rem;
  width: 100%;
  height: 100%;
  z-index: 110;
}
.hover{
  z-index: 190;
  height: max-content;
  width: 20rem;
  position: absolute;
  top: -18vh;
  left: 0;
  border-radius: .3rem;
  box-shadow: 0 3px 10px rgba(0,0,0, .75);
  background-color: #181818;
  transition: .3s ease-in-out;
  .image-video__container{
    position: relative;
    height: 140px;
    img, video{
      width: 100%;
      height: 140px;
      object-fit:cover;
      border-radius: .3rem;
      position: absolute;
      top: 0;
      z-index: 114;
    }
  }
  .info-container{
    padding: 1rem;
    gap: .5rem;
  }
  .icons{
    .controls{
      display: flex;
      gap: 1rem;
    }
    svg{
      font-size: 2rem;
      cursor: pointer;
      transition: .3s ease-in-out;
      &:hover{
        color: #b8b8b8;
      }
    }
  }
  .genres {
    ul{
      gap: 1rem;
      li{
        padding: 0 .7rem 0 0;
      }
    }
  }
}
`

export default Card;
