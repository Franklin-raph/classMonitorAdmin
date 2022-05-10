import React, { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import Container from '@mui/material/Container'

const TaskDetails = () => {

    let { taskID } = useParams();
    
    const [taskDetails, setTaskDetails] = useState({})
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate();

    if(!localStorage.getItem('admin')) navigate(`/`)

    const fetchTaskDetails = async () => {
        const task = await fetch(`https://classmonitorapp.herokuapp.com/assessment/getAnAssessment/${taskID}`)
        const data = await task.json();
        console.log(data)
        setTaskDetails(data)
        localStorage.setItem('taskDetails', JSON.stringify(data))
    }

    const updateTask = async () => {
        console.log("Hello")
    }

    useEffect(() => {
        fetchTaskDetails();
    },[])

  return (
    <Container>
      <h2 style={{ fontWeight: 'bold', textAlign:'center', marginTop:'1rem' }} >Task</h2>
      <p><span style={{fontWeight:'bold'}}>Task</span>:  {taskDetails.task} </p>
      <p><span style={{fontWeight:'bold'}}>Task Details </span>: <span className='taskDetails'> {taskDetails.details} </span></p>
      <p><span style={{fontWeight:'bold'}}>Task Reference </span>:  {taskDetails.reference} </p>
      <p><span style={{fontWeight:'bold'}}>Task Deadline </span>:  {taskDetails.submissionDate} </p>

      {/* <form onSubmit={ updateTask }>
            <button type="submit" className="form-control btn-dark mt-3" disabled={loading}>
                {loading && (
                        <span 
                        className='spinner-border spinner-border-sm'
                        role='status'
                        aria-hidden='true'
                        />
                    )}
                    Update Task
            </button>
      </form> */}
      <Link to={`/taskupdate`} id="updateBtn">
        <p style={{ textAlign: 'center', marginTop: '7px', backgroundColor:'#1976d2', width:'50%', marginRight:'auto', marginLeft:'auto', padding:'.5rem', color:'white', borderRadius:'8px'}}>
          Update Task
        </p>
      </Link>
    </Container>
  )
}

export default TaskDetails