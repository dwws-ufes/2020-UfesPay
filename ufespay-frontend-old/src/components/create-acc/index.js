import React, { Component } from 'react';

import './styles.css'

import { Button, TextField, InputAdornment } from '@material-ui/core'

import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import EmailIcon from '@material-ui/icons/Email';
import LockIcon from '@material-ui/icons/Lock';

class CreateAcc extends Component {

    constructor(props) {
        super(props)

        this.state = {

            name: '',
            email: '',
            password: '',
            repPassword: '',
            
            success: '',
            id: '',
            errorMessages: []
        }
    }

    handleSubmit = event => {

        // const PORT = "3333"
        // const URL = "http://localhost:"

        // const requestOptions = {
        //     method: "post",
        //     body: JSON.stringify({
        //         name: this.state.name,
        //         email: this.state.email,
        //         password: this.state.password
        //     }),
        //     headers: {
        //         "Content-Type": "application/json"
        //     }
        // }
        
        // fetch(`${URL}${PORT}/users`, requestOptions)
        // .then(response => response.json())
        // .then(data => {
        //     if(data.sucesso === true) {
        //         this.setState({
        //             success: true,
        //             id: data.id
        //         })
        //     } else {
        //         this.setState({
        //             success: false,
        //             errorMessages: data.errorMessages
        //         })
        //     }
        // })

        this.setState({
            success: 'deu bom'
        })

        event.preventDefault(); // evitar que abra uma nova pagina
    }


    handleTextFieldChange = (field, event) => {
        this.setState({
            [field]: event.target.value
        })
    }

    render() {
        return (
            <div id="create-acc">
                <div id="form-create-acc">
                    <h1>UfesPay</h1>

                    <h3>Cadastre-se!</h3>

                    <form onSubmit = {this.handleSubmit}>

                        <div className="TextField">
                            <TextField
                                className="TextField"
                                variant="filled"
                                color="secondary"
                                label="Nome"
                                placeholder="Nome completo"
                                type="text"
                                required
                                value={this.state.name}
                                onChange={(e) => this.handleTextFieldChange("name", e)}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <AccountCircleIcon />
                                        </InputAdornment>
                                    )
                                }} 
                            />
                        </div>

                        <div className="TextField">
                            <TextField
                                className="TextField"
                                variant="filled"
                                color="secondary"
                                label="Email"
                                placeholder="exemplo@exemplo.com"
                                type="text"
                                required
                                value={this.state.email}
                                onChange={(e) => this.handleTextFieldChange("email", e)}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <EmailIcon />
                                        </InputAdornment>
                                    )
                                }} 
                            />
                        </div>

                        <div className="TextField">
                            <TextField
                                className="TextField"
                                variant="filled"
                                color="secondary"
                                label="Senha"
                                placeholder="Senha"
                                type="password"
                                required
                                value={this.state.password}
                                onChange={(e) => this.handleTextFieldChange("password", e)}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <LockIcon />
                                        </InputAdornment>
                                    )
                                }}
                            />
                        </div>

                        <div className="TextField">
                            <TextField
                                className="TextField"
                                variant="filled"
                                color="secondary"
                                label="Confirme a senha"
                                placeholder="Confirme a senha"
                                type="password"
                                required
                                value={this.state.repPassword}
                                onChange={(e) => this.handleTextFieldChange("repPassword", e)}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <LockIcon />
                                        </InputAdornment>
                                    )
                                }}
                            />
                        </div>

                        <Button className="Button" variant="contained" color="secondary" type="submit">
                            Cadastrar
                        </Button>

                    </form>
                </div>
            </div>
        )
    }
}

export default CreateAcc;