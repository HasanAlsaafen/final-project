import LoginSideScreen from "../components/loginsiedscreen/LoginSideScreen";
import LoginForm from "../components/loginform/LoginForm";
export default function Login() {
  return (
    <div className="flex md:flex-col lg:flex-row h-full flex-wrap">
      <LoginSideScreen />
      <LoginForm />
    </div>
  );
}
