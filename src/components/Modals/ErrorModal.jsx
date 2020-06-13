import React from "react";
import { Modal, Button } from "react-bootstrap";

function ErrorModal({ showErrorModal, setShowErrorModal, recipeName }) {
  return (
    <Modal show={showErrorModal} onHide={() => setShowErrorModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Error</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          You have changed the name for {recipeName} and therefore cannot delete
          it.
        </p>
        <p>
          This is likely a mistake you have accidentally made. Revert the name
          back in order to delete it.
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setShowErrorModal(false)}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ErrorModal;
