import {
  Container,
  SideLeft,
  SideRight,
  Logo,
  LogoIcon,
  Field,
  FormContent
} from "./styles";
import React, { useState, useRef } from "react";
import { TextField, Button } from '@material-ui/core';
import logo from '../../assets/logo.png';
import api from '../../services/api';


function RegisterAccount() {
  const [IsValidation, setValidation] = useState(false);
  const nameRef = useRef('');
  const emailRef = useRef('');
  const passwordRef = useRef('');
  const confirmPassRef = useRef('');
  
  function Greeting() {

    const registerApi = async () =>{
      console.log('email', emailRef)
      if(passwordRef.current.value===confirmPassRef.current.value){
        const json = {
          username: nameRef.current.value,
          email: emailRef.current.value,
          password: passwordRef.current.value,
        } 
        console.log('post')
        await api.post('/user/add', json).then((resp)=> setValidation(true)).catch((err)=>console.log('Erro'))
      }else{
        alert('Senha errada');
      }      
    }

    if (IsValidation) {
      return (
        <div>
          <h2 style={{ textAlign: 'center', fontFamily: 'Otomanopee One' }}>
          Verifique seu E-mail, Foi enviado um link de Validação de conta!
          </h2>
        </div>
      )
    }
    else {
      return(
        <>
        <div>
          <h2 style={{ textAlign: 'center' }}>
            Cadastre-se
          </h2>
        </div>
        <FormContent noValidate autoComplete="off">
          <Field>
            <TextField className="input" style={{
              width: 377,
              height: 19
            }} label="Nome" type="text" variant="outlined" inputRef={nameRef} />
          </Field>
          <Field>
            <TextField className="input" style={{
              width: 377,
              height: 19
            }} label="E-mail" variant="outlined" inputRef={emailRef} />
          </Field>
          <Field>
            <TextField className="input" style={{
              width: 377,
              height: 19
            }} label="Senha" type="password" variant="outlined" inputRef={passwordRef} />
          </Field>
          <Field>
            <TextField className="input" style={{
              width: 377,
              height: 19
            }} label="Confirmar Senha" type="password" variant="outlined" inputRef={confirmPassRef}/>
          </Field>
          <Field>
            <Button variant="contained" style={{ marginLeft: "30%" , position: 'relative', width: 150 }} onClick={ () => registerApi()} color="primary">LogIn</Button>
          </Field>
        </FormContent>
        </>
      )
    }
  }

  return (
    <Container>
      <SideLeft>
      </SideLeft>
      <SideRight>
        <div>
          <Logo>
            <LogoIcon src={logo} alt="logo" />
          </Logo>
          <Greeting />
        </div>
      </SideRight>
    </Container>
  );
}
export default RegisterAccount;
