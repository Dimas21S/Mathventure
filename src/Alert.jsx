import { Alert } from "react-bootstrap";

export default function AlertComponent({ message, variant }) {
    return (
        <Alert variant={variant} className="mt-4">
            {message}
        </Alert>
    )
}