import { useState, useContext } from "react";
import AuthContext from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);
        const result = await login(email, password);
        setLoading(false);

        if(result.success) {
            navigate("/");
        } else {
            setError(result.error);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-24 p-6 bg-white rounded shadow">
            <h1 className="text-2xl font-bold mb-4">Login</h1>
            {error && <div className="text-red-600 mb-2">{error}</div>}
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    type="email"
                    className="w-full p-2 border rounded"
                />
                <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    type="password"
                    className="w-full p-2 border rounded"
                />
                <button className="w-full bg-primary text-white py-2 rounded" disabled={loading}>
                    {loading ? 'Logging in...' : 'Login'}
                </button>
            </form>
            <p className="mt-4 text-center">Don't have an account? <Link to="/register" className="text-primary">Register</Link></p>
        </div>
    );
}

export default Login;