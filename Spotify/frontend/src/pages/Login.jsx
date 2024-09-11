import LoginForm from "../components/LoginForm";

function Login() {
    return (
        <div>
            <LoginForm route="/api/token/" method="login" />
        </div>
    );
}

export default Login;


// import React from "react";
// import { Link } from "react-router-dom"; // Import Link from react-router-dom
// {/* Add a button linking to the register page */}
//<div className="register-link">
//<p>Don't have an account?</p>
//<Link to="/register">
//    <button>Register</button>
//</Link>

// import Form from "../components/Form"

// function Login() {
//     return <Form route="/api/token/" method="login" />
// }

// export default Login