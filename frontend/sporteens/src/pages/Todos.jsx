import Axios from 'axios'
import React, { Component } from 'react'

export class Todos extends Component {
    state ={
        isVerified : null
    }
    componentDidMount(){
        this.checkIsUserVeried()
    }

    checkIsUserVeried = () => {
        const token = localStorage.getItem('tkn-u')
        console.log(token)
        if(token){
            Axios.post('http://localhost:4000/auth/is-user-verified',{token})
            .then((res) => {
                console.log(res)
                if(res.data.error){
                    alert(res.data.message)
                }else{
                    var isVerified = res.data.is_verified === 1 ? true : false
                    this.setState({isVerified})
                }
            })
            .catch((err) => {
                console.log(err)
            })
        }else{
            this.setState({isVerified :false})
        }
    }

    render(){
        if(this.state.isVerified === null){
            return <p className='text-center mt-5'>loading...</p>
        }
        return(
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        
                        {
                        this.state.isVerified ?
                        null
                        :
                        <div className="alert alert-danger">
                            Verify your email to make todos
                        </div>}
                        <div className="border p-3 bg-light rounded-top">
                            <input type="button" value="Add Task" className='btn btn-primary'/>

                            
                        </div>
                        <div className="border p-3 bg-light rounded-bottom">
                            <h3>Ini Title</h3>
                            <p className='p-0 m-0'>Todo 1</p>
                            <p className='p-0 m-0'>Todo 2</p>
                            <p className='p-0 m-0'>Todo 3</p>


                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Todos
