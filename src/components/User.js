import React from 'react'
import Logo from '../images/Logo.png'

function User(){

    return(
        <div className='User'>
            <div className="logo">
                <img src={Logo} alt="logo"/>
            </div>
            <div className='info'>
                <p>Todo App</p>
                <a href="#">Logout!</a>
            </div>
        </div>
    )
}

export default User