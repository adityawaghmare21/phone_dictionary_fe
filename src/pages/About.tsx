import { Accordion, Badge, Container, ListGroup, Nav, Stack } from "react-bootstrap";

const About = () => {
    return (
        <Container style={{ paddingTop: '20px', alignContent: 'center', maxWidth: '720px' }}>
            <Accordion defaultActiveKey="0">
                <Accordion.Item eventKey="0">
                    <Accordion.Header>Application Info</Accordion.Header>
                    <Accordion.Body>
                        A basic phonebook/ phone dictionary app for creating, editing and deleting contacts.
                        This application also contains authorization, meaning user has to login and if user does not have an
                        account then user can signup.
                        Thank you!
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                    <Accordion.Header>Created by</Accordion.Header>
                    <Accordion.Body>
                        <ListGroup>
                            <ListGroup.Item>Aditya Waghmare</ListGroup.Item>
                            <ListGroup.Item>
                                Github Link:
                                <Nav className="flex-column">
                                    <Nav.Link href="https://github.com/adityawaghmare21/phone_dictionary_fe">Frontend</Nav.Link>
                                    <Nav.Link href="https://github.com/adityawaghmare21/phone_dictionary_be1">BackEnd</Nav.Link>
                                </Nav>
                            </ListGroup.Item>
                            <ListGroup.Item>Tech stack:
                                <Stack direction="horizontal" gap={2}>
                                    <Badge bg="primary">ReactJS</Badge>
                                    <Badge bg="primary">JAVA</Badge>
                                    <Badge bg="secondary">Postgres</Badge>
                                    <Badge bg="secondary">Bootstrap</Badge>
                                    <Badge bg="secondary">Springboot</Badge>
                                </Stack>
                            </ListGroup.Item>
                        </ListGroup>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>

        </Container>
    );
}

export default About;