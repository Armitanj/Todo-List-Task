import React from 'react'
import { Button, Table } from 'react-bootstrap'

export default function TaskTable({ tasks, setEditingTask, setShowModal, handleDeleteClick }) {
    const editHandler = (task) => {
        setEditingTask(task)
        setShowModal(true)
    }


    return (

        <div>
            {tasks && tasks.length === 0 ? (
                <p>No tasks available. Please add a task!</p>
            ) : (
                <Table className='mt-3' variant='dark' striped hover>
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Priority</th>
                            <th>Date Time</th>
                            <th>Estimate (h)</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tasks.map((task) => (
                            <tr key={task.id}>
                                <td>{task.title}</td>
                                <td>{task.priority}</td>
                                <td>{task.dateTime}</td>
                                <td>{task.estimate}</td>
                                <td>{task.status}</td>
                                <td>
                                    <Button variant='primary' size='sm' onClick={() => editHandler(task)}>Edit</Button>{' '}
                                    <Button variant='danger' size='sm'
                                        onClick={() => handleDeleteClick(task.id)}
                                    >Delete</Button>
                                </td>
                            </tr>
                        ))
                         }


                    </tbody>
                </Table>
            )}

          
        </div>

    )
}
