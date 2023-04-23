import {React, Component} from "react";

class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            signInEmail: "",
            signInPassword: "",
        }
    };

    onEmailChange = (event) => {
        this.setState({signInEmail: event.target.value});
    }

    onPasswordChange = (event) => {
        this.setState({signInPassword: event.target.value});
    }

    onSubmit = () => {
        console.log(this.state);
        fetch('http://localhost:3000/signin', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: this.state.signInEmail,
                password: this.state.signInPassword,
            })})
        .then(response => response.json())
        .then(result => {
            console.log(result);
            if(result.message === "success") this.props.onRouteChange('home');
        })
    }

    render() {
        let {onRouteChange} = this.props;
        return (
            <article className="center br2 ba dark-gray b--black-10 mv4 w-200 w-100-m w-50-l mw5 shadow-5">
                <main className="pa4 black-80 center">
                    <div className="measure center">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                            <legend className="f2 fw6 ph0 mh0">Sign In</legend>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                                <input 
                                    className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                    type="email" 
                                    name="email-address"  
                                    id="email-address"
                                    onChange={this.onEmailChange}
                                />
                            </div>
                            <div className="mv3">
                                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                                <input 
                                    className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                    type="password" 
                                    name="password"  
                                    id="password"
                                    onChange={this.onPasswordChange}
                                />
                            </div>
                        </fieldset>
                        <div className="">
                            <input onClick={this.onSubmit} className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Sign in" />
                            <div className="lh-copy mt3">
                                <p onClick={() => onRouteChange('register')} className="f6 link dim black db pointer">Register</p>
                            </div>
                        </div>
                    </div>
                </main>         
            </article>
        );       
    };
}

export default SignIn;