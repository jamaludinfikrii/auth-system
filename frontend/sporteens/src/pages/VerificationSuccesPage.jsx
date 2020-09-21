import React, { Component } from 'react'

export class VerificationSuccess extends Component {
    state = {
        loading : false
    }

    componentDidMount(){
        this.verifyEmailByIdAndPassword()
    }

    verifyEmailByIdAndPassword = () => {
        this.setState({loading : true})
        var password = this.props.match.params.password
        var id = this.props.match.params.id
        
        var data = {id,password}
        data = JSON.stringify(data)
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var requestOptions = {
        method: 'PATCH',
        headers: myHeaders,
        body: data,
        redirect: 'follow'
        };

        fetch("http://localhost:4000/auth/user-email-verification", requestOptions)
        .then((response) => {
            return response.text()
        })
        .then((result) => {
            var dataRes = JSON.parse(result)
            this.setState({loading : false})
        })

        .catch((err) => {
            alert(err.message)
            this.setState({loading : false})
        })

     
    }
    render() {
        if(this.state.loading){
            return(
                <div className="text-cener py-5">
                    loading ...
                </div>
            )
        }
        return (
            <div>
                <div className='container mt-5'>
                    <div className="row justify-content-center align-items-center">
                        <div className="col-md-6">
                            <div className="p-4 bg-info rounded">
                                <h4 className='text-white text-center'>Your Email Verification Success</h4>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default VerificationSuccess;
