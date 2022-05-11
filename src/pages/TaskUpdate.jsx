import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

const TaskUpdate = () => {

  const [reference, setTaskReference] = useState("");
  const [task, setTask] = useState("");
  const [details, setDetails] = useState("");
  const [submissionDate, setSubmissionDate] = useState("");
  const [submissionCountdown, setsubmissionCountdown] = useState("");
  const [taskID, setTaskID] = useState("")
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  // const { task_id } = useParams();

  if(!localStorage.getItem('admin')) navigate(`/`)


  useEffect(() => {
    
    const taskDetails = JSON.parse(localStorage.getItem('taskDetails'))
    console.log(taskDetails)
      
    setTaskReference(taskDetails.reference);
    setTask(taskDetails.task);
    setDetails(taskDetails.details);
    setSubmissionDate(taskDetails.submissionDate);
    setsubmissionCountdown(taskDetails.submissionCountdown);
    setTaskID(taskDetails._id)
  },[])
  
  const studentTasksUpdate = { task, reference, details, submissionDate, submissionCountdown }

  const showTask = (e) => {
    e.preventDefault()
    console.log(studentTasksUpdate)
  }

  const handleTaskUpdate = async (e) => {
    e.preventDefault();
    setLoading(true)
        const resp = await fetch(`https://classmonitorapp.herokuapp.com/assessment/taskUpdate/${taskID}`,{
            method:"PATCH",
            body: JSON.stringify(studentTasksUpdate),
            headers: {
                "Content-type": "application/json"
            }
        })
        const data = await resp.json()
        if(!data){
          setLoading(true)
        }else{
            setLoading(false)
        }
        navigate(`/dashboard`)
        // console.log(data)
  }

  return (
    <div className='card card-body'>
      <form onSubmit={ handleTaskUpdate }>
      <div className="form-group">
            <label className="mt-3">Task</label>
            <input type="text" placeholder="Build a ...."onChange={(e) => setTask(e.target.value)} className="form-control" value={task}  required />

            <label className="mt-3">Task Reference</label>
            <input type="text" placeholder="visit ...."onChange={(e) => setTaskReference(e.target.value)} className="form-control" value={reference} required />

            <label className="mt-3">Task Details</label>
            <textarea cols="30" rows="10" placeholder="Build a ...." onChange={(e) => setDetails(e.target.value)} className="form-control" value={details} required></textarea>

            <label className="mt-3">Due Date</label>
            <input type="date" placeholder="Sun. 03 January 2022"onChange={(e) => setSubmissionDate(e.target.value)} className="form-control" value={submissionDate} required />

            <label className="mt-3">Due Time</label>
            <input type="datetime-local" onChange={(e) => setsubmissionCountdown(e.target.value)} className="form-control" required />

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
        </div>
      </form>

      {/* <button onClick={showTask}>
        showTask
      </button> */}

    </div>
  )
}

export default TaskUpdate