import { useState } from "react";
import AuthContext from "../context/AuthContext";
import {useNavigate, Link} from "react-router-dom";
import { useContext } from "react";

const Login = () => {
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefalut();
        const result = await login(email, password);

        if(result.success) {
            navigate("/");
        }else {
            setError(result.error);
        }
    };

    return Login
}