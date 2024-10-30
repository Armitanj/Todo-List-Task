import React from 'react'
import { Button, Modal } from 'react-bootstrap'

export default function DeleteTaskModal({ show, onHide, deleteHandler }) {


    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Delete Task</Modal.Title>
            </Modal.Header>
            <Modal.Body>Are you sure you want to delete this task?</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Cancel
                </Button>
                <Button variant="primary" onClick={deleteHandler}>
                    Delete
                </Button>
            </Modal.Footer>
        </Modal>
        
    )
}
