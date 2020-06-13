import React from "react";
import { Modal, Button } from "react-bootstrap";

function OverwriteModal({
  showOverwriteModal,
  setShowOverwriteModal,
  recipeName,
  uploadRecipe,
}) {
  return (
    <Modal
      show={showOverwriteModal}
      onHide={() => setShowOverwriteModal(false)}
    >
      <Modal.Header closeButton>
        <Modal.Title>Are You Sure?</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          A recipe with this name already exists, by clicking confirm you will
          overwrite the currently saved recipe for {recipeName}.
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="secondary"
          onClick={() => setShowOverwriteModal(false)}
        >
          Cancel
        </Button>
        <Button variant="primary" onClick={() => uploadRecipe()}>
          Confirm
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default OverwriteModal;
