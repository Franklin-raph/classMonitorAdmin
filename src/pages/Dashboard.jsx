import React, { useEffect, useState } from 'react'
import axios from 'axios'
import GroupsIcon from '@mui/icons-material/Groups';
import PeopleIcon from '@mui/icons-material/People';
import PersonIcon from '@mui/icons-material/Person';
import TaskIcon from '@mui/icons-material/Task';
import { Container, Row, Col } from "reactstrap";
import Backdrop from '@mui/material/Backdrop';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import CircularProgress from '@mui/material/CircularProgress';
import { Link } from 'react-router-dom';

const Dashboard = () => {

const [students, setStudents] = useState([]);
const [stdentTasks, setStudentTasks] = useState([]);
const [studentSolution, setStudentSolution] = useState([])
const [searchInput, setSearchInput] = useState('');

useEffect(() => {
  fetchStudentsData()
  fetchStudentsSolution()
  fetchStudentTasks()
  // fetchStudentSolutions()
},[])

  const fetchStudentsData = async () => {
    try {
      const res = await axios.get('https://classmonitorapp.herokuapp.com/student')
      const data = await res.data
      setStudents(data)
      console.log(data)
  } catch (error) {
      console.log(error)
  }
}

const fetchStudentsSolution = async () => {
    try {
      const res = await axios.get('https://classmonitorapp.herokuapp.com/student/studentSolution')
      const data = await res.data
      setStudentSolution(data)
      console.log(data)
  } catch (error) {
      console.log(error)
  }
}

const fetchStudentTasks = async () => {
  try {
    const resp = await fetch('https://classmonitorapp.herokuapp.com/assessment/getAllAssessment')
    const allAssessment = await resp.json()
    
    setStudentTasks(allAssessment)
    
  } catch (error) {
    console.log(error)
  }
}

// const fetchStud

  return (
    <>
    <Container>
      <div className="row mt-4" id="adminDashboard">

        <div className="col-lg-3 col-md-6 col-sm-12">
          <div className="dashboardCard m-3">
            <div className="iconAndTitle">
              <GroupsIcon sx={{fontSize:'4rem', marginRight:'10px'}}/> <h4>Students</h4>
            </div>
            <h4 className='dashboardCardNum'>{students.length}</h4>
          </div>
        </div>

        <div className="col-lg-3 col-md-6 col-sm-12">
          <div className="dashboardCard m-3">
            <div className="iconAndTitle">
              <PersonIcon sx={{fontSize:'4rem', marginRight:'10px'}}/> <h4>Admins</h4>
            </div>
            <h4 className='dashboardCardNum'>2</h4>
          </div>
        </div>

        <div className="col-lg-3 col-md-6 col-sm-12">
          <Link to={`/alltasks`} style={{color:'white'}}>
              <div className="dashboardCard m-3">
                <div className="iconAndTitle">
                  <TaskIcon sx={{fontSize:'4rem', marginRight:'10px', textAlign:'center'}}/> <h4>Total Tasks Given</h4>
                </div>
                <h4 className='dashboardCardNum'>{stdentTasks.length}</h4>
              </div>
          </Link>
        </div>

        <div className="col-lg-3 col-md-6 col-sm-12">
          <div className="dashboardCard m-3">
            <div className="iconAndTitle">
              <PeopleIcon sx={{fontSize:'4rem', marginRight:'10px'}}/> <h4>Students</h4>
            </div>
            <h4 className='dashboardCardNum'>20</h4>
          </div>
        </div>

       </div>

      <Paper
            component="form"
            sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', justifyContent: 'center', width: 250, margin: '18px auto' }}
            >
            <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="Search for a student"
                onChange={(e) => {
                    setSearchInput(e.target.value)
                }}
            />
            <IconButton sx={{ p: '10px' }} aria-label="search">
                <SearchIcon />
            </IconButton>
        </Paper>
        <Row>
        {students.length !== 0 ? 
        students.filter((val) => {
          if(searchInput === "") return val
          else if (val.email.toLowerCase().includes(searchInput.toLowerCase()) || val.studentID.toLowerCase().includes(searchInput.toLowerCase()) || val.name.toLowerCase().includes(searchInput.toLowerCase())) return val
        }).map((student) => {
          return(
            <>
              <Col sm="12" md="6" lg="4" className='my-3' key={student._id} >
                  <Link to={`/student/${student.studentID}`}>
                    <div id="studentCard">
                            <Box > 
                              <h6>Name : {student.name}</h6>
                              <h6>Email : {student.email}</h6>
                              <h6>StudentID : {student.studentID}</h6>
                            </Box>
                    </div>
                </Link>
            </Col>
            </> 
          )
        })
        :
        <Backdrop sx={{ color: '#002141', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={true}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      }
        </Row>

        <Row className='solutionBody'>
          <h3 style={{textAlign:'center', margin:'2.5rem 0 .75rem'}}>Solution To Students Tasks</h3>
        {studentSolution.length !== 0 ? 
        studentSolution.filter((val) => {
          if(searchInput === "") return val
          else if (val.solution.toLowerCase().includes(searchInput.toLowerCase()) || val.studentID.toLowerCase().includes(searchInput.toLowerCase())) return val
        }).map((solutions) => {
          return(
            <>
              <Col sm="12" md="6" lg="4" className='my-3' key={solutions._id} >
                  
                    <div id="studentCard">
                      <Box>
                        <h6>Github link : <a href={solutions.solution} target="_blank" rel="noopener noreferrer">{solutions.solution}</a></h6>
                        <h6>StudentID : {solutions.studentID}</h6>
                      </Box>
                    </div>
                
            </Col>
            </> 
          )
        })
        :
        <Backdrop sx={{ color: '#002141', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={true}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      }
        </Row>
    </Container>

</>
  )
}

export default Dashboard

const Box = props => <div className="box">{props.children} </div>;