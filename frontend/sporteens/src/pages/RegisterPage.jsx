import React, { Component } from 'react'

export class RegisterPage extends Component {
    render() {
        return (
            <div>
                <div className='container mt-5'>
                <div className="row justify-content-center align-items-center">
                    <div className="col-md-6">
                        <div className="p-4 bg-warning rounded">
                            <h4>Register Here</h4>
                            <input type="text" className='form-control mt-4' placeholder='Your Email '/>
                            <input type="text" className='form-control mt-2' placeholder='Your Password '/>
                            <input type="text" className='form-control mt-2' placeholder='Confirm Your Password '/>
                            <input type="button" className='btn btn-light mt-4' value='submit'/>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        )
    }
}

export default RegisterPage
