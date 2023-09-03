import { useEffect, useState } from "react";
import { Button, Col, Container, Modal, Row } from "react-bootstrap";
import ContactCard from "../components/ContactCard/ContactCard";
import ContactForm from "../components/ContactForm";
import Toaster from "../utils/toaster/Toaster";
import { BASE_URL } from "../utils/utils";

const Home = () => {

    const [showContactForm, setShowContactForm] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [contacts, setContacts] = useState([]);
    const [editData, setEditData] = useState({});
    const [variant, setVariant] = useState('');
    const [msg, setMsg] = useState('');
    const [showToast, setShowToast] = useState(false);

    useEffect(() => {
        fetchContactData();
    }, []);

    const token = localStorage.getItem('jwt')

    const fetchContactData = () => {
        fetch(`${BASE_URL}/contacts`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            },
        })
            .then((resp) => resp.json())
            .then((data) => {
                setContacts(data);
            })
            .catch((error) => {
                console.log('error->', error)
            })
    }

    const updateContact = (payload) => {

        const requestObj = {
            firstname: payload.firstName,
            lastname: payload.lastName,
            email: payload.email,
            contact: payload.contact,
        }

        fetch(`${BASE_URL}/contacts/${payload.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(requestObj)
        })
            .then((resp) => {
                if (resp.status === 200) {
                    setVariant('success');
                    setMsg('Data updated successfully');
                    setShowToast(true);
                    fetchContactData();
                }
            })
            .catch((error) => {
                setVariant('danger')
                setMsg('Data not updated successfully');
                console.log('Data not updated successfully', error)
            })
    }

    const updateStatus = (payload) => {

        fetch(`${BASE_URL}/contacts/${payload.id}/toggle-status`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
        })
            .then((resp) => {
                if (resp.status === 200) {
                    setVariant('success');
                    setMsg('Status changed successfully');
                    setShowToast(true);
                    fetchContactData();
                }
            })
            .catch((error) => {
                setVariant('danger')
                setMsg('Status not changed successfully');
                console.log('Status not changed successfully', error)
            })
    }

    const deleteContact = (payload) => {

        fetch(`${BASE_URL}/contacts/${payload.id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
        })
            .then((resp) => {
                if (resp.status === 200) {
                    setVariant('success');
                    setMsg('Data deleted successfully');
                    setShowToast(true);
                    fetchContactData();
                }
            })
            .catch((error) => {
                setVariant('danger')
                setMsg('Data not deleted successfully');
                console.log('Data not deleted successfully', error)
            })
    }

    return (
        <>
            {showToast && <Toaster
                variant={variant}
                toastMsg={msg}
                onClose={() => setShowToast(false)}
            />}
            {showDeleteModal &&
                <Modal
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                    show={showDeleteModal}
                    onHide={() => setShowDeleteModal(false)}
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Delete the contact
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Are you sure you want to delete this contact?
                    </Modal.Body>
                    <Modal.Footer className="justify-content-center">
                        <Button onClick={() => { deleteContact(editData); setShowDeleteModal(false) }}>Yes</Button>
                        <Button onClick={() => setShowDeleteModal(false)}>Close</Button>
                    </Modal.Footer>
                </Modal>
            }
            <Container>
                {showContactForm &&
                    <Modal
                        size="lg"
                        aria-labelledby="contained-modal-title-vcenter"
                        centered
                        show={showContactForm}
                        onHide={() => setShowContactForm(false)}
                    >
                        <Modal.Header closeButton>
                            <Modal.Title id="contained-modal-title-vcenter">
                                Edit the contact
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <ContactForm contactInfo={editData} showContactForm={showContactForm} updateContact={updateContact} updateStatus={updateStatus} isEditMode={true} />
                        </Modal.Body>
                    </Modal>
                }
                <div className="user-profile-grid" style={{ display: 'flex', flexWrap: 'wrap' }}>
                    {contacts?.map((item) => (
                        <ContactCard contactInfo={item} setShowContactForm={setShowContactForm} setEditData={setEditData} setShowDeleteModal={setShowDeleteModal} />
                    ))
                    }
                </div>
            </Container>
        </>
    );
}

export default Home;