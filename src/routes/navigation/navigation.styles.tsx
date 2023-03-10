import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { ReactComponent as CrwnLogo } from '../../assets/crwn.svg';

export const NavigationContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 1rem 0 1.5rem;
`;

export const LogoContainer = styled(Link)`
  height: 100%;
  width: 70px;
  padding: 0 1.5rem;
`;

export const Logo = styled(CrwnLogo)`
  height: 3rem;
`;

export const NavLinks = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

export const NavLink = styled(Link)`
  position: relative;
  padding: 0 1rem;
  cursor: pointer;
`;

export const Count = styled.span` 
  position: absolute;
  top: -10px;
  right: -8px;
  background-color: red;
  color: white;
  width: 23px;
  text-align: center;
  border-radius: 5rem;
  font-size: 12px;
`;