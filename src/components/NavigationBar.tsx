
import { Container, Nav, Navbar, Tooltip, OverlayTrigger } from "react-bootstrap";
import { FaSignOutAlt } from "react-icons/fa";
import { NavLink } from 'react-router-dom';

interface NavigationBarProps {
    isAuthenticated: boolean;
    onLogout: () => void;
}

const NavigationBar = (props: NavigationBarProps) => {

    const isAuthenticated = localStorage.getItem('isAuthenticated');

    return (
        <Navbar bg="dark" data-bs-theme="dark">
            <Container>
                <Navbar.Brand>Phone Dictionary</Navbar.Brand>
                {isAuthenticated === 'true' && (
                    <><Navbar.Collapse id="basic-navbar-nav">
                        <Nav>
                            <Nav.Link to='/home' as={NavLink}>Home</Nav.Link>
                            <Nav.Link to='/addcontact' as={NavLink}>New Contact</Nav.Link>
                            <Nav.Link to='/about' as={NavLink}>About</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                        <Nav.Item>
                            <OverlayTrigger overlay={<Tooltip id='button-tooltip'>LogOut</Tooltip>}>
                                <FaSignOutAlt className="icon" onClick={() => props.onLogout()} />
                            </OverlayTrigger>
                        </Nav.Item>
                    </>
                )}
            </Container>
        </Navbar>
    );
}

export default NavigationBar;