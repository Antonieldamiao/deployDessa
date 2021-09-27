import { useState, useRef } from "react";
import {
  Container,
  SideLeft,
  SideRight,
  Box,
  Title,
  Component,
  Text,
  Logo,
  LogoIcon,
  Field,
  FormContent,
  Links,
  LinkContent
} from "./styles";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  Link,
  useHistory,
  useLocation
} from "react-router-dom";

import { Delete, Add, Create, Search } from '@material-ui/icons';
import { TextField, Button } from '@material-ui/core';
import logo from '../../assets/logo.png'; 
import api from "../../services/api";


function Login() {
  let history = useHistory();
  const emailRef = useRef('');
  const passwordRef = useRef('');
  const [message, setMessage] = useState('');

  const login = async() =>{
  
    const data = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    }
    try{
      let token =  await api.post('/user/login', data)
      
      localStorage.setItem("Token",JSON.stringify(token.data.token))
      history.push('/Home')     
    }catch(err){
    
      setMessage('SENHA INCORRETA OU USUÁRIO NÃO EXISTE');
      history.push('/')
    }
    
  }

  return (
    <Container>
      <SideLeft>
        <Box>
        <Title>Gerencie aqui seus contatos</Title>
        <div>
          <Component>
          <Add fontSize="large"/>
                <Text>Adicione</Text>
          </Component>
        </div>
        <div>
          <Component>
          <Search fontSize="large"/>
                <Text>Pesquise</Text>
          </Component>
        </div>
        <div>
          <Component>
          <Create fontSize="large"/>
                <Text>Edite</Text>
          </Component>
        </div>
        <div>
          <Component>
          <Delete fontSize="large"/>
                <Text>Delete</Text>
          </Component>
        </div>
        </Box>
        
      </SideLeft>
      <SideRight>
        <div>
          <Logo>
            <LogoIcon src={logo} alt="logo"/>
          </Logo>
          <FormContent  noValidate autoComplete="off">
            { message.length!==0 &&(
                <label style={{marginLeft: '12px', color: '#ff0000', textShadow: '0.2px 0.2px 0.2px #000'
              }}>{message}</label>
              )
            }
            <br/>
            <br/>
            <Field>
            <TextField className="input"  style={{width:377,
    height:19}} label="E-mail" variant="outlined" inputRef={emailRef} />
            </Field>
            <Field>
            <TextField className="input" style={{width:377,
    height:19}} label="Senha" type="password" variant="outlined" inputRef={passwordRef}/>
            </Field>
            <Field>
            <Button variant="contained" onClick={() => login()} style={{marginLeft: "30%" , width: 150}}color="primary">LogIn</Button>
            </Field>
          </FormContent>
          <LinkContent>
          <div>ou</div>
          <Links href='./RegisterAccount'>Cadastre-se</Links>
          </LinkContent>
         
        
           </div>
      </SideRight>
    </Container>
  );
}

export default Login;
