import RegisterComponent from "./Register";

export const RegisterPage = {
  key: "register-page",
  exact: true,
  path: "/",
  auth: "*",
  component: RegisterComponent,
  menu:{
    label:'Seja um Parceiro'
  }
};
