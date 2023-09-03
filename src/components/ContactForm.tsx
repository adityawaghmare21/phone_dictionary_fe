import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import { useEffect, useState } from 'react';
import { isInputValid } from '../utils/utils';

interface ContactFormProps {
    operation?: string,
    contactInfo?: unknown,
    addContact?: () => void,
    showContactForm?: boolean,
    updateContact?: () => void,
    updateStatus?: () => void,
    isEditMode?: boolean
}

const ContactForm = (props: ContactFormProps) => {

    const dataObject = {
        id: props?.contactInfo?.id ?? '',
        firstName: props?.contactInfo?.firstname ?? '',
        lastName: props?.contactInfo?.lastname ?? '',
        email: props?.contactInfo?.email ?? '',
        contact: props?.contactInfo?.contact ?? '',
        status: props?.contactInfo?.status === 'ACTIVE' ? true : false ?? true
    }

    const [contactData, setContactData] = useState(dataObject);
    const [validated, setValidated] = useState(false);

    const handleChange = (field: string, value: any) => {

        switch (field) {
            case 'firstName': if (isInputValid(value, 'ALPHA_ONLY')) {
                setContactData({ ...contactData, firstName: value })
            }
                break;
            case 'lastName': if (isInputValid(value, 'ALPHA_ONLY')) {
                setContactData({ ...contactData, lastName: value })
            }
                break;
            case 'email': setContactData({ ...contactData, email: value })
                break;
            case 'contact': if (isInputValid(value, 'NUMERIC_ONLY')) {
                setContactData({ ...contactData, contact: value })
            }
                break;
            case 'status': setContactData({ ...contactData, status: value })
                props.updateStatus(contactData);
                break;
        }
    }

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        setValidated(true);
        if (props.isEditMode) {
            props.updateContact(contactData);
        }
        else {
            props.addContact(contactData);
        }
    };

    useEffect(() => {
    }, [contactData])

    return (
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Row className='mb-2'>
                {/* First Name */}
                <Form.Group
                    as={Col}
                    className='position-relative'
                >
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                        required
                        type='text'
                        name='firstName'
                        value={contactData.firstName}
                        onChange={(e) => handleChange(e.target.name, e.target.value)}
                    />
                    <Form.Control.Feedback type="invalid">
                        Please provide a first name.
                    </Form.Control.Feedback>
                </Form.Group>
                {/* Last Name */}
                <Form.Group
                    as={Col}
                    className='position-relative'
                >
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                        required
                        type='text'
                        name='lastName'
                        value={contactData.lastName}
                        onChange={(e) => handleChange(e.target.name, e.target.value)}
                    />
                </Form.Group>
            </Row>
            <Row className='mb-1'>
                {/* Email */}
                <Form.Group
                    as={Col}
                    className='position-relative'
                >
                    <Form.Label>Email</Form.Label>
                    <InputGroup hasValidation>
                        <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                        <Form.Control
                            required
                            type="text"
                            placeholder="Email"
                            aria-describedby="inputGroupPrepend"
                            name="email"
                            value={contactData.email}
                            onChange={(e) => handleChange(e.target.name, e.target.value)}
                        />

                    </InputGroup>
                </Form.Group>
            </Row>
            <Row className='mb-2'>
                {/* Phone Number */}
                <Form.Group
                    as={Col}
                    className='position-relative'
                >
                    <Form.Label>Contact</Form.Label>
                    <Form.Control
                        required
                        type='text'
                        name='contact'
                        value={contactData.contact}
                        onChange={(e) => handleChange(e.target.name, e.target.value)}
                    />
                    <Form.Control.Feedback type="invalid">
                        Please provide a Contact.
                    </Form.Control.Feedback>
                </Form.Group>
                {/* Status */}
                <Form.Group
                    as={Col}
                    className='position-relative'
                >
                    <Form.Label>Status</Form.Label>
                    <Form.Check
                        type="switch"
                        id="status"
                        label="Active"
                        value={`${contactData.status}`}
                        onChange={(e) => handleChange(e.target.id, e.target.checked)}
                        defaultChecked={contactData.status}
                        disabled={!props.isEditMode}
                    />
                </Form.Group>
            </Row>
            <Row >
                <Form.Group
                    as={Col}
                    className='col-md-12 text-center'
                >
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form.Group>
            </Row>
        </Form>
    );
}

export default ContactForm;