import React, { useEffect, useState } from 'react'
import {  Button, Form, Modal } from 'react-bootstrap'

const priorities = ["High", "Medium", "Low"]
const statuses = ["Todo", "Doing", "Done", "Warning", "Pending", "Failed"]

export default function TaskModal({ show, onHide, editingTask, updateTask, addTask }) {

    const [title, setTitle] = useState('')
    const [priority, setPriority] = useState('')
    const [dateTime, setDateTime] = useState('')
    const [estimate, setEstimate] = useState('')
    const [status, setStatus] = useState('')


    useEffect(() => {
        if (editingTask) {
            setTitle(editingTask.title)
            setPriority(editingTask.priority)
            setDateTime(editingTask.dateTime)
            setEstimate(editingTask.estimate)
            setStatus(editingTask.status)
        } else {
            setTitle('')
            setPriority("High")
            setDateTime(new Date().toLocaleString())
            setEstimate(8)
            setStatus('Todo')
        }
    }, [editingTask])

    const submitHandler = () => {
        if (title.trim() !== '') {
            console.log('submited');

            const newTask = {
                title,
                priority,
                dateTime: new Date().toLocaleString(),
                estimate,
                status
            }

            if (editingTask) {
                updateTask({ ...editingTask, ...newTask })
            } else {
                console.log("Adding task", newTask);
                addTask(newTask)

            }
            onHide()
        }else{
            onHide()
        }
       
    }

    return (
            <Modal show={show} onHide={onHide}>
                <Modal.Header closeButton>
                    <Modal.Title>{editingTask ? "Edit Task" : "Add New Task"}</Modal.Title>
                </Modal.Header>

                <Modal.Body>

                    <Form>
                        <Form.Group>
                            <Form.Label>Title</Form.Label>
                            <Form.Control type='text' value={title} onChange={(e) => setTitle(e.target.value)}/>
                        </Form.Group>

                        <Form.Group className='mt-3'>
                            <Form.Label>Priority</Form.Label>
                            <Form.Select value={priority} onChange={(e) => setPriority(e.target.value)}>
                                {priorities.map((option) =>
                                (
                                    <option key={option} value={option}>{option}</option>
                                ))}
                            </Form.Select>
                        </Form.Group>

                        <Form.Group className='mt-3'>
                            <Form.Label>Date Time</Form.Label>
                            <Form.Control value={dateTime} onChange={(e) => setDateTime(e.target.value)} disabled />
                        </Form.Group>

                        <Form.Group className='mt-3'>
                            <Form.Label>Estimate (h)</Form.Label>
                            <Form.Control type='number' value={estimate} onChange={(e) => setEstimate(e.target.value)} />
                        </Form.Group>

                        <Form.Group className='mt-3'>
                            <Form.Label>Status</Form.Label>
                            <Form.Select value={status} onChange={(e) => setStatus(e.target.value)}>
                                {statuses.map((option) => (
                                    <option key={option} value={option}>{option}</option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                    </Form>



                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={onHide}>Close</Button>
                    <Button variant="primary" onClick={submitHandler}>{(editingTask ? "Edit task" : "Add task")}</Button>
                </Modal.Footer>
            </Modal>
        
    )
}
