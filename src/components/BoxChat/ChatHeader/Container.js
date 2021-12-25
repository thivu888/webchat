import HeaderWaper from "../../ContentRight/Header";
import React from 'react'
import {  useSelector } from "react-redux";

const Header = () => {

    const {avatars,name,updatedAt} = useSelector(state => state.chatControl)

    return (
       <HeaderWaper chat = {true} avatars={avatars} name={name} updatedAt={updatedAt} />
    )
}

export default Header