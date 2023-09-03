import { Card } from "react-bootstrap";
import { FaEdit, FaTrash, FaUser } from 'react-icons/fa';
import './contact-card.css';

interface ContactCardProps {
    contactInfo?: unknown,
    setShowContactForm?: unknown,
    setEditData?: unknown,
    setShowDeleteModal?: unknown
}

const ContactCard = (props: ContactCardProps) => {

    return (
        <Card className="user-profile-card">
            <div className="profile-image-container">
                <FaUser className="default-profile-icon" />
            </div>
            <Card.Body className="text-center">
                <Card.Title>{`${props.contactInfo.firstname} ${props.contactInfo.lastname}`}</Card.Title>
                <Card.Text>{props.contactInfo.contact}</Card.Text>
                <Card.Text>{props.contactInfo.email}</Card.Text>
                <div className={props.contactInfo.status === 'ACTIVE' ? 'status-tag' : 'status-tag-inactive'}>{props.contactInfo.status}</div>
                <div className="icons-container">
                    <FaEdit className="icon" onClick={() => { props.setEditData(props.contactInfo); props.setShowContactForm(true); }} />
                    <FaTrash className="icon" onClick={() => { props.setEditData(props.contactInfo); props.setShowDeleteModal(true) }} />
                </div>
            </Card.Body>
        </Card>
    );
}

export default ContactCard;