import styled from 'styled-components';
import { Link } from 'react-router-dom';
export const Content = styled.div`
    display: flex;
    gap: 30px;
    background-color: white;
    align-items: baseline;
    margin: -10px -10px 10px -10px;
    padding-top: 10px;
    padding-bottom: 10px;
    border-bottom: 2px solid black;
`;

export const MainLogo = styled.img`
    width: 172px;
    height: auto;
    padding-left: 20px;
`;

export const NavLink = styled(Link)`
    @import url('https://fonts.googleapis.com/css2?family=Molengo&display=swap');
    font-size: 27px;
    text-decoration: none;
    display: inline-block;
    font-family: 'Molengo', sans-serif;
    color: #3b3b3b;
    

    :hover {
        color: #17BECF;
    }
`;