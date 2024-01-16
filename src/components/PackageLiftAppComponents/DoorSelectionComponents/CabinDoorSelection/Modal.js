// CabinDoorModal.js
import React from 'react';
import { Button, Icon, Modal } from 'semantic-ui-react';
import CabinDoorTable from './Table';

const CabinDoorModal = () => {
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Modal
      open={open}
      closeIcon
      onClose={handleClose}
      onOpen={() => setOpen(true)}
      trigger={<Button>Cabin Door Selection</Button>}
    >
      <Modal.Header>Cabin Doors</Modal.Header>
      <Modal.Content image scrolling>
        <CabinDoorTable onClose={handleClose} /> {/* onClose prop'u geçiriliyor */}
      </Modal.Content>
      <Modal.Actions>
       
      </Modal.Actions>
    </Modal>
  );
}

export default CabinDoorModal;
