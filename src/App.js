import './App.css';
import TaskTable from './Components/TaskTable'
import TaskModal from './Components/TaskModal'
import DeleteTaskModal from './Components/DeleteTaskModal';
import { Container } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import Clock from './Components/Clock';

const getDataFromLocalStorage = () => {
  const savedTasks = localStorage.getItem('tasks')
  return savedTasks ? JSON.parse(savedTasks) : []
}
function App() {

  const [tasks, setTasks] = useState(getDataFromLocalStorage)
  const [showModal, setShowModal] = useState(false)
  const [editingTask, setEditingTask] = useState(null)
  const [deleteTaskModal, setDeleteTaskModal] = useState(false)
  const [taskId, setTaskId] = useState(null)

  useEffect(() => {
    console.log("saving task", tasks);

    localStorage.setItem('tasks', JSON.stringify(tasks))
  }, [tasks])
  const updateTask = (updatedTask) => {
    setTasks((prevTasks) => prevTasks.map((task) => (task.id === updatedTask.id ? updatedTask : task)))
  }

  const addTask = (task) => {
    setTasks((prevTasks) => [...prevTasks, { ...task, id: Date.now() }])
    setEditingTask('')
  }

  const deleteHandler = () => {
    console.log('Task Deleted');
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId))
    setDeleteTaskModal(false)
    // console.log(tasks);

  }
  const handleDeleteClick = (id) => {
    setTaskId(id)
    setDeleteTaskModal(true)
  }
  return (
    <Container>
      <h1 className='text-center mt-3'>Todo List</h1>
      <div className='d-flex justify-content-between align-items-center'>
        <span onClick={() => { setShowModal(true); setEditingTask('') }} ><img src='images/icons8-plus-60.png' alt='img' className='cursor-pointer' /></span>
        <div>
          <span className='me-3'><Clock /></span>
          <img src='images/icons8-clock-64.png' width='50px' alt='img' />
        </div>
      </div>
      <div>
        <TaskTable
          tasks={tasks}
          setEditingTask={setEditingTask}
          setShowModal={setShowModal}
          deleteHandler={deleteHandler}
          setDeleteTaskModal={setDeleteTaskModal}
          deleteTaskModal={deleteTaskModal}
          handleDeleteClick={handleDeleteClick}
        />
        <TaskModal
          show={showModal}
          onHide={() => { setShowModal(false); setEditingTask(null) }}
          addTask={addTask}
          editingTask={editingTask}
          updateTask={updateTask}

        />
        <DeleteTaskModal
          show={deleteTaskModal}
          onHide={() => setDeleteTaskModal(false)}
          deleteHandler={() => deleteHandler(taskId)}
        />

      </div>

    </Container>
  );
}

export default App;
