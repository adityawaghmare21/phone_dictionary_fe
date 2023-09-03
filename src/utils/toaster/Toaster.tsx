import { ToastContainer, Toast, Alert } from "react-bootstrap";

interface ToasterProps {
    variant?: string,
    toastMsg?: string,
    onClose?: () => void
}


const Toaster = (props: ToasterProps) => {

    return (
        <Alert key={`${props.variant}`} variant={`${props.variant}`} onClose={props.onClose} dismissible>
            {props.toastMsg}
        </Alert>
    )
}

export default Toaster;