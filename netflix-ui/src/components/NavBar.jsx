import React, { useState } from 'react'
import styled from 'styled-components';
import logo from '../assets/logo.png'
import { Link, useNavigate } from 'react-router-dom';
import {FaSearch, FaPowerOff} from 'react-icons/fa';
import { signOut } from 'firebase/auth';
import { onAuthStateChanged } from 'firebase/auth';
import { firebaseAuth } from '../utils/firebase-config';


const NavBar = ({isScrolled, setIsScrolled}) => {
    const links = [
        {
            name: 'Home',
            link: '/'
        },
        {
            name: 'TV Shows',
            link: '/tv'
        },
        {
            name: 'Movies',
            link: '/movies'
        },
        {
            name: 'My List',
            link: '/mylist'
        }
    ]
    const navigate = useNavigate()
    const [showSearch, setShowSearch] = useState(false)
    const [inputHover, setInputHover] = useState(false)

    onAuthStateChanged(firebaseAuth, (currentUser) => {
        if (!currentUser) {
            navigate('/login')
        }
    }) 
  return (
    <Container>
        <nav className={`flex ${isScrolled ? 'scrolled' : ''}`}>
            <div className="left flex a-center">
                <div className="brand flex a-center j-center">
                    <Link to="/">
                    <img src={logo} alt="logo" />
                    </Link>
                </div>
                <ul className='links flex'>
                    {links.map((obj) => <li key={obj.name}><Link to={obj.link}>{obj.name}</Link></li>)}
                </ul>
            </div>
            <div className="right flex a-center">
                <div className={`search ${showSearch ? 'show-search' : ''}`}>
                    <button onFocus={() => setShowSearch(true)} 
                    onBlur={() => {
                        if(!inputHover) setShowSearch(false)
                    }}>
                        <FaSearch />
                    </button>
                    <input type="text" placeholder='Search'
                    onMouseEnter={() => setInputHover(true)}
                    onMouseLeave={() => setInputHover(false)}
                    onBlur={() => {setShowSearch(false); setInputHover(false)}}
                    />
                </div>
                <button onClick={() => signOut(firebaseAuth)}><FaPowerOff /></button>
            </div>
        </nav>
    </Container>
  )
}

const Container = styled.div`
.scrolled{
    background-color: #000;
}
nav{
    position: fixed;
    width: 100%;
    top: 0;
    height: 6.5rem;
    z-index: 3;
    padding: 0 4rem;
    transition: all .3s;
    justify-content: space-between;
    align-items: center;
    .left{
        gap: 2rem;
        .brand{
            img{
                height: 4rem;
            }
        }
        .links{
            gap:2rem;
        }
    }
    .right{
        gap: 1rem;
        justify-self: flex-end;
        svg{
            color:#f34242;
            font-size: 1.2rem;
        }
        .search{
            display: flex;
            gap: 0.4rem;
            align-items: center;
            justify-content: center;
            padding: .2rem .2rem .2rem .5rem;
            svg{ color : #fff}
            input{
                width: 0;
                opacity: 0;
                visibility: hidden;
                transition: all .3s;
                background-color: transparent;
                border: none;
                color: #fff;
                &:focus {
                    outline: none;
                }
            }
        }
        .show-search{
            border: 1px solid #fff;
            background-color: rgba(0,0,0,.6);
            input{
                width: 100%;
                opacity: 1;
                visibility: visible;
                padding: 0.3rem;
            }
        }
    }
}
`

export default NavBar
