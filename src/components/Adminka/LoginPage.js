import React, { useState, useEffect } from "react";
import "./style.scss";
import { useFirebase } from "../../hooks/useFirebase";
import { useDispatch } from "react-redux";
import { setToken } from "../../store/slices/user";
import { Link, useNavigate } from "react-router-dom";

const LoginPage = ({token}) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const { fbAuth } = useFirebase();
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const authHandler = async (event) => {
        event.preventDefault();
        if (!email || !password) {
            setError("Введіть логін та/або пароль");
            return;
        }
        setLoading(true);
        const res = await fbAuth({ email, password });
        if (res === "authError") {
            setError("Логін або пароль вказані невірно");
        }
        if (res === "unknown") {
            setError("Невідома помилка, спробуйте пізніше");
        }
        if (res.user?.accessToken) {
            dispatch(setToken(res.user.accessToken));
        }
        setLoading(false);
    };

    useEffect(() => {
        if (token) {
            navigate("/admin");
        }
    }, [token, navigate]);

    return (
        <div className="center">
            <h1>Привіт!</h1>
            <form method="post">
                <div className="txt_field">
                    <input
                        type="text"
                        value={email}
                        onChange={(event) => {
                            setError("");
                            setEmail(event.target.value);
                        }}
                    />
                    <span></span>
                    <label>Пошта</label>
                </div>
                <div className="txt_field">
                    <input
                        type="password"
                        value={password}
                        onChange={(event) => {
                            setError("");
                            setPassword(event.target.value);
                        }}
                    />
                    <span></span>
                    <label>Пароль</label>
                </div>
                <input
                    type="submit"
                    value={loading ? "Waiting..." : "Login"}
                    onClick={authHandler}
                />
            </form>
            <Link className="auth__return" to="/">
                <span>До меню</span>
            </Link>
            {error && <div className="auth">{error}</div>}
        </div>
    );
};

export default LoginPage;
