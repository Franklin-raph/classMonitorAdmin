import React,{useEffect, useState} from 'react'
import axios from 'axios'
import { Container, Row, Col } from "reactstrap";
import Backdrop from '@mui/material/Backdrop';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import CircularProgress from '@mui/material/CircularProgress';
import { Link } from 'react-router-dom';

const AllStudents = () => {

  const [students, setStudents] = useState([]);
  const [searchInput, setSearchInput] = useState('');

  useEffect(() => {
    fetchStudentsData() 
},[])

const fetchStudentsData = async () => {
    try {
      const res = await axios.get('https://classroommonitorbackend.herokuapp.com/student')
      const data = await res.data
      setStudents(data)
      console.log(data)
  } catch (error) {
      console.log(error)
  }
}

console.log(students)

  return (
    <div>
        <Container>
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
              else if (val.email.toLowerCase().includes(searchInput.toLowerCase()) || val.name.toLowerCase().includes(searchInput.toLowerCase())) return val
          }).map((student) => {
              return(
                <>
                  <Col sm="12" md="6" lg="4" className='my-3' key={student.studentID} >
                      <Link to={`/student/${student.studentID}`}>
                        <div id="studentCard">
                                <Box > 
                                  <h5>Name : {student.name}</h5>
                                  <h5>Email : {student.email}</h5>
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
        </Container>
    </div>
  )
}

export default AllStudents

const Box = props => <div className="box">{props.children} </div>;