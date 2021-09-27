import { useRef, useState } from "react";
import { useHistory } from "react-router-dom";
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
  Link,
  LinkContent, fontFaces
} from "./styles";

import { Delete, Add, Create, Search } from '@material-ui/icons';
import { TextField, Button } from '@material-ui/core';
import logo from '../../assets/logo.png'; 
import api from "../../services/api";


function LoginAdmin() {
  const codeAccessRef = useRef('');
  const passwordRef = useRef('');
  const [message, setMessage] = useState('');
  const history = useHistory();

  const login = async() =>{

    const data = {
      codeAccess: codeAccessRef.current.value,
      password: passwordRef.current.value
    }

    await api.post('/administrator/login', data).then((resp) =>{
      localStorage.setItem('Token',JSON.stringify(resp.data))
      history.push('/HomeAdmin');
    }).catch((err) => {
      setMessage('SENHA ERRADA OU USUÁRIO NÃO')
      console.log(err);
    });
  
  }

  


  return (
    <Container>
      <fontFaces>
      <SideLeft>
        <Box>
        <Title>Controle de Usuários</Title>
        <div>
          <Component>
          <Search fontSize="large"/>
                <Text>Pesquise</Text>
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
            <Field>
            <TextField className="input"  style={{width:377,
    height:19}} label="Código de Acesso" variant="outlined" inputRef={codeAccessRef} />
            </Field>
            <Field>
            <TextField className="input" style={{width:377,
    height:19}} label="Senha" type="password" variant="outlined" inputRef={passwordRef} />
            </Field>
            <Field>
            <Button variant="contained" style={{marginLeft: "30%" , width: 150}}color="primary"
            onClick={() => login()}>LogIn</Button>
            </Field>
          </FormContent>
          <label style={{textAlign: 'left'}}>{message}</label>       
        
          </div>
      </SideRight>
      </fontFaces>
    </Container>
  );
}

export default LoginAdmin;
