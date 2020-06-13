import React from "react";
import { Modal, Button } from "react-bootstrap";

function DeleteModal({
  showDeleteModal,
  setShowDeleteModal,
  recipeName,
  deleteRecipe,
}) {
  return (
    <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Are You Sure?</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Are you sure you want to delete the recipe for: {recipeName}?</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
          Cancel
        </Button>
        <Button
          variant="primary"
          onClick={() => {
            deleteRecipe();
            setShowDeleteModal(false);
          }}
        >
          Confirm
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default DeleteModal;
