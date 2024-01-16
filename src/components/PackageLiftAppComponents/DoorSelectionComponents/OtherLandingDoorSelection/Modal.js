"use client"
import React, { useEffect } from 'react'
import { Button, Icon,  Modal } from 'semantic-ui-react'

import { useSelector } from 'react-redux'
import OtherLandingDoorTable from './OtherLandingDoorTable'

const OtherLandingDoorModal = () => {
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
      trigger={<Button> Other Landing Door Selection</Button>}
    >
      <Modal.Header>Other Landing Doors</Modal.Header>
      <Modal.Content image scrolling>
      <OtherLandingDoorTable onClose={handleClose}/>
 
      </Modal.Content>
      <Modal.Actions>
       
      </Modal.Actions>
    </Modal>
  )
}

export default OtherLandingDoorModal