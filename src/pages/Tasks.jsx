import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Tasks = () => {

  const [reference, setTaskReference] = useState("");
  const [task, setTask] = useState("");
  const [details, setDetails] = useState("");
  const [submissionDate, setSubmissionDate] = useState("");
  const [submissionCountdown, setsubmissionCountdown] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  if(!localStorage.getItem('admin')) navigate(`/`)

  const studentTasks = { task, reference, details, submissionDate, submissionCountdown }

  const handleTaskPost = async (e) => {
    e.preventDefault();
    setLoading(true)
        const resp = await fetch('https://classmonitorapp.herokuapp.com/assessment/task',{
            method:"POST",
            body: JSON.stringify(studentTasks),
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
        console.log(data)
  }

  return (
    <div className='card card-body'>
      <form onSubmit={ handleTaskPost }>
      <div className="form-group">
            <label className="mt-3">Task</label>
            <input type="text" placeholder="Build a ...."onChange={(e) => setTask(e.target.value)} className="form-control"  required />

            <label className="mt-3">Task Reference</label>
            <input type="text" placeholder="visit ...."onChange={(e) => setTaskReference(e.target.value)} className="form-control" required />

            <label className="mt-3">Task Details</label>
            <textarea cols="30" rows="10" placeholder="Build a ...." onChange={(e) => setDetails(e.target.value)} className="form-control" required></textarea>

            <label className="mt-3">Due Date</label>
            <input type="date" placeholder="Sun. 03 January 2022"onChange={(e) => setSubmissionDate(e.target.value)} className="form-control" required />

            <label className="mt-3">Due Time</label>
            <input type="time" placeholder="12:00:00 AM"onChange={(e) => setsubmissionCountdown(e.target.value)} className="form-control" required />

            <button type="submit" className="form-control btn-dark mt-3" disabled={loading}>
                {loading && (
                        <span 
                        className='spinner-border spinner-border-sm'
                        role='status'
                        aria-hidden='true'
                        />
                    )}
                    Send Task
            </button>
        </div>
      </form>
    </div>
  )
}

export default Tasks