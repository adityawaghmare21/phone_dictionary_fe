import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button, Row, Col, Container } from "react-bootstrap";
import { AuthContext } from "../context/AuthProvider";

interface LoginPageProps {
    onLogin?: () => void;
}

const LoginPage = (props: LoginPageProps) => {


    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        props.onLogin(formData);

    };

    return (
        <div>
            <h2 style={{ textAlign: 'center', marginTop: '5px' }}>Login</h2>
            <Container className="mt-5">
                <Form onSubmit={handleFormSubmit}>
                    <Row className="mb-1">
                        <Form.Group
                            controlId="formEmail"
                            as={Col}
                            className='position-relative'
                        >
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                type="email"
                                name="email"
                                placeholder="Enter email"
                                value={formData.email}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                    </Row>
                    <Row className="mb-1">
                        <Form.Group
                            controlId="formPassword"
                            as={Col}
                            className='position-relative'
                        >
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                name="password"
                                placeholder="Password"
                                value={formData.password}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                    </Row>
                    <Row className="mb-1">
                        <Form.Group
                            as={Col}
                            className='col-md-12 text-center'
                        >
                            <Button variant="primary" type="submit">
                                Login
                            </Button>
                        </Form.Group>
                    </Row>
                </Form>
            </Container>
            <p style={{ textAlign: 'center' }}>
                Don't have an account? <Link to="/signup">Sign up</Link>
            </p>
        </div>
    );
};

export default LoginPage;