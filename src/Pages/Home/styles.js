import Styled from "styled-components";


export const Container = Styled.div`
  font-family: 'Otomanopee One';
  display: flex;
`;

export const SideLeft = Styled.div`
    position: absolute;
    background-color: #FFCE2E;
    height: 100%;
    width: 10%;
    margin-top: 0;
    padding-left: 10px;
    color: #FFF;
    display: flex;
    justify-items: center;
    align-content: center;
`;

export const Logo = Styled.div`
    text-align: center;
    margin-bottom: 13px;


`;
export const LogoIcon = Styled.img`
    width: 50px;
`;

export const SideRight = Styled.div`
    
position: absolute;
   display: flex;
   flex-direction: column;
    margin-left: 15%;
    height: 100%;
    width: 80%;
    justify-items: center;
    align-content: center;
    justify-content: center;
`;

export const Icons = Styled.div`
  width: 100px;
    height: 47px;
`;

export const Text = Styled.label`
  
    margin-left: 15px;
    text-shadow: 1px 1px 1px #000;
    font-size: 30px;
`;

export const Title = Styled.p`
  
    font-size: 35px;
    text-shadow: 1px 1px 1px #000;
    margin-bottom: 10%;
`;
export const Box = Styled.div`
margin-left: 23%;
    margin-top: 30%;
`;
export const TitlePartner = Styled.label`
margin: 4px;
text-align: left;
font-size: 1rem;
`;
export const Component = Styled.div`
 margin-bottom: 37px;
    justify-items: center;
    display: flex;
`;
export const FormContent = Styled.form`
display: block !important;

`;
export const Field = Styled.div`
margin-bottom: 47px;

`;
export const FieldButton = Styled.div`

margin-top: 30px;
display: flex;
justify-content: space-evenly;

`;
export const FieldTableButton = Styled.div`

margin-top: 30px;
display: flex;
justify-content: flex-end;

`;
export const LogoutBT = Styled.button`
height: 40px
;
`;