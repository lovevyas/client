import React from 'react';
// import { Link } from 'react-router-dom';

import Logo from '../../images/logo.png';

import { Content, MainLogo, NavLink } from './Header.styles';

const Header = () => {
    
    return(
    <Content>
        <NavLink to='/home'>
            <MainLogo src={Logo} alt='main-logo' />
        </NavLink>
        <NavLink to='/stock'>
            Stocks
        </NavLink>
        <NavLink to='/about'>
            About
        </NavLink>
        <NavLink>
            <button >Logout</button> 
        </NavLink>
    </Content>
)
}

export default Header;