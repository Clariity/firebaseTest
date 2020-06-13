import React from "react";
import { Modal, Button } from "react-bootstrap";

function NoPictureModal({
  showNoPictureModal,
  setShowNoPictureModal,
  recipeName,
  uploadRecipe,
}) {
  return (
    <Modal
      show={showNoPictureModal}
      onHide={() => setShowNoPictureModal(false)}
    >
      <Modal.Header closeButton>
        <Modal.Title>Are You Sure?</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          The recipe you wish to upload for: {recipeName} has no picture
          attached.
        </p>
        <p>
          Are you sure you want to upload this recipe without a picture? This
          can be added later.
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="secondary"
          onClick={() => setShowNoPictureModal(false)}
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

export default NoPictureModal;
