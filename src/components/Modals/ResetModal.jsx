import React from "react";
import { Modal, Button } from "react-bootstrap";

function ResetModal({
  showResetModal,
  setShowResetModal,
  recipeName,
  resetRecipe,
}) {
  return (
    <Modal show={showResetModal} onHide={() => setShowResetModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Are You Sure?</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Are you sure you want to clear the recipe for: {recipeName}?</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setShowResetModal(false)}>
          Cancel
        </Button>
        <Button
          variant="primary"
          onClick={() => {
            resetRecipe();
            setShowResetModal(false);
          }}
        >
          Confirm
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ResetModal;
