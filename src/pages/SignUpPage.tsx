import React, { useState } from "react";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/utils";

const SignUpPage = () => {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleUserNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserName(e.target.value);
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const handleSignup = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const requestObj = {
            firstname: 'ABC',
            lastname: 'KBC',
            email: userName,
            password: password,
        }
        fetch(`${BASE_URL}/auth/signup`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(requestObj)
        })
            .then((resp) => {
                if (resp.status === 200) {
                    navigate("/");
                }
            })
            .catch((error) => {
                console.log('error in signup', error);
            })
    };

    return (
        <><div style={{ textAlign: 'center', marginTop: '5px' }}>
            <h1>SignUp</h1>
        </div>
            <Container className="mt-5">
                <Form onSubmit={handleSignup}>
                    <Row className='mb-1'>
                        <Form.Group controlId="userName">
                            <Form.Label>Username</Form.Label>
                            <Form.Control
                                type="userName"
                                placeholder="Enter userName"
                                value={userName}
                                onChange={handleUserNameChange}
                                required />
                        </Form.Group>
                    </Row>
                    <Row className='mb-1'>
                        <Form.Group controlId="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={handlePasswordChange}
                                required />
                        </Form.Group>
                    </Row>
                    <Row className='mb-1'>
                        <Form.Group
                            as={Col}
                            className='col-md-12 text-center'
                        >
                            <Button variant="primary" type="submit">
                                SignUp
                            </Button>
                        </Form.Group>
                    </Row>
                </Form>
            </Container></>
    );
};

export default SignUpPage;
