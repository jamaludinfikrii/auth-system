import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export class Header extends Component {
    render() {
        return (
            <div className='text-center mt-5'>
            <Link to='/'>
              home
            </Link>
            <Link className='mx-3' to='/register'>
              register
            </Link>
            <Link to='/login'>
              login
            </Link>
            </div>
        )
    }
}

export default Header
