"use client"
import React, { useEffect } from 'react'
import { Button, Icon,  Modal } from 'semantic-ui-react'
import LandingDoorTable from './Table'
import { useSelector } from 'react-redux'

const LandingDoorModal = () => {
const otherLandingDoor=useSelector((state)=>state.extraGlobal.otherLandingDoor)
  useEffect(() => {
  }, [otherLandingDoor]);

  const [open, setOpen] = React.useState(false)
 
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Modal
      closeIcon
      open={open}
      size='large'
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      trigger={<Button>Landing Door Selection</Button>}
    >
      <Modal.Header>Landing Doors</Modal.Header>
      <Modal.Content image scrolling>
      <LandingDoorTable  onClose={handleClose}/>  
    
      </Modal.Content>
      <Modal.Actions>
      </Modal.Actions>
    </Modal>
  )
}

export default LandingDoorModal