import { useState } from "react";
import { Container } from "react-bootstrap";
import ContactForm from "../components/ContactForm";
import Toaster from "../utils/toaster/Toaster";
import { BASE_URL } from "../utils/utils";

const AddContact = () => {

    const [showToast, setShowToast] = useState(false);
    const [variant, setVariant] = useState('');
    const [msg, setMsg] = useState('');

    const token = localStorage.getItem('jwt')

    const addcontact = (payload: unknown) => {

        const requestObj = {
            firstname: payload.firstName,
            lastname: payload.lastName,
            email: payload.email,
            contact: payload.contact,
        }

        fetch(`${BASE_URL}/contacts`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(requestObj)
        })
            .then((resp) => {
                if (resp.status === 200) {
                    setVariant('success');
                    setMsg('Data saved successfully');
                    setShowToast(true);
                }
            })
            .catch((error) => {
                setVariant('danger')
                setMsg('Data not saved successfully');
                console.log('data not saved successfully', error)
            })
    }

    return (
        <>
            {showToast && <Toaster
                variant={variant}
                toastMsg={msg}
                onClose={() => setShowToast(false)}
            />}
            <Container style={{ paddingTop: '20px', alignContent: 'center', maxWidth: '720px' }}>
                <p style={{ fontSize: '30px' }}>Add new contact information</p>
                <ContactForm operation='addNewContact' addContact={addcontact} isEditMode={false} />
            </Container>
        </>
    );
}

export default AddContact;