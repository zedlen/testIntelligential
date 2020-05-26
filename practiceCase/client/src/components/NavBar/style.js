import styled from "styled-components";

export const NavBarHolder = styled.nav`
    background-color: #000;
    overflow: hidden;
    position: sticky;
    top: 0;
    z-index: 1;
    display: flex;
  
  /* Style the links inside the navigation bar */
  &>a {
    float: left;
    color: #f2f2f2;
    text-align: center;
    padding: 14px 16px;
    text-decoration: none;
    font-size: 17px;
    cursor: pointer;
    &.active {
      background-color: #9b0063;      
    }
    &:hover {
      background-color: #ddd;
      color: black;
    }
  }
`;

export const LogOut = styled.div`
  float: right;
  color: #f2f2f2;
  text-align: center;
  text-decoration: none;
  font-size: 17px;
  right: 0;
  height: 100%;
  padding: 14px 16px;
  position: absolute;
  &:hover{
    background: blue;
    cursor: pointer;
  }
  &>a{    
    text-align: center;
    padding: 14px 16px;
    text-decoration: none;
    font-size: 17px;
    background: transparent;
    color: white !important;    
    &.active{
      background: transparent;
    }
  }
`;