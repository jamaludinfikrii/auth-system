import React, { Component } from 'react'

export class Home extends Component {
    render() {
        return (
            <div>
                <div className='container mt-5'>
                    <div className="row justify-content-center align-items-center">
                        <div className="col-md-6">
                            <div className="p-4 bg-secondary rounded">
                                <h4 className='text-white text-center'>Welcome To Todo Apps</h4>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Home
