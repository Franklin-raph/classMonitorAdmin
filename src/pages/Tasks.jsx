import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Tasks = () => {

  const [reference, setTaskReference] = useState("");
  const [task, setTask] = useState("");

  const navigate = useNavigate();

  const studentTasks = { task, reference}

  const handleTaskPost = async (e) => {
    e.preventDefault();
        const resp = await fetch('https://classmonitorapp.herokuapp.com/assessment/task',{
            method:"POST",
            body: JSON.stringify(studentTasks),
            headers: {
                "Content-type": "application/json"
            }
        })
        const data = await resp.json()
        // localStorage.setItem('admin', JSON.stringify(data.signedInAdmin))
        navigate(`/dashboard`)
        console.log(data)
  }

  return (
    <div className='card card-body'>
      <form onSubmit={ handleTaskPost }>
      <div className="form-group">
            <label className="mt-3">Task Reference</label>
            <input type="text" placeholder="visit ...."onChange={(e) => setTaskReference(e.target.value)} className="form-control" name="taskRef" required />

            <label className="mt-3">Task Problem</label>
            <textarea cols="30" rows="10" placeholder="Build a ...." onChange={(e) => setTask(e.target.value)} className="form-control" name="taskProb" required></textarea>
            {/* <input type="texta"  /> */}

            <input type="submit" className="form-control btn-dark mt-3"  value="Submit" />
        </div>
      </form>
    </div>
  )
}

export default Tasks