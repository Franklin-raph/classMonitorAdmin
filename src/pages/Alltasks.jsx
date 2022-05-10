import React, { useEffect, useState } from 'react'
import Container from '@mui/material/Container'
// import { useSelector } from 'react-redux'
import { Backdrop, CircularProgress, Grid, Typography, Card, } from '@mui/material'
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import SearchIcon from '@mui/icons-material/Search';
import TextField from '@mui/material/TextField'
import { makeStyles } from '@mui/styles'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import { useNavigate, useLocation, useParams, Link } from 'react-router-dom'

const Alltasks = () => {
    const [allStudentTasks, setAllStudentTasks] = useState([]);
    const [searchInput, setSearchInput] = useState('');

    const navigate = useNavigate();

    if(!localStorage.getItem('admin')) navigate(`/`)

    useEffect(  () => {
        fetchAllTasks()
      },[]);

      const fetchAllTasks = async () => {
        try {
            const resp = await fetch('https://classmonitorapp.herokuapp.com/assessment/getAllAssessment')
            const allAssessment = await resp.json()
            //https://classmonitorapp.herokuapp.com/assessment/getAllAssessment
            setAllStudentTasks(allAssessment)
              console.log(allAssessment)
            
          } catch (error) {
            console.log(error)
          } 
      }
  return (
    <Container sx={{marginTop:'2rem'}}>
              <Grid container spacing={{ xs: 2, md: 3 }} >
            {allStudentTasks.length !== 0 ?
                allStudentTasks.filter((val) => {
                  console.log(typeof val.task)
                    if(searchInput === "") return val
                    else if (val.task.toLowerCase().includes(searchInput.toLowerCase()) || val.reference.toLowerCase().includes(searchInput.toLowerCase())) return val
                })
                .map((assessment) => {
                    return (
                    <Grid item key={assessment._id} xs={12} sm={6} md={6}>
                      <Link to={`/taskdetails/${assessment._id}`} >
                            <Card elevation={3} sx={{padding:'1rem'}}>
                                <div >
                                    <div style={{display:'flex', }}>
                                        <h6 style={{marginRight:'10px', fontWeight:'bold'}}>Task:</h6>
                                        <Typography variant='subtitle2' sx={{fontSize: '16px'}}>{assessment.task}</Typography>
                                    </div>
                                    <div style={{display:'flex'}}>
                                      <h6 style={{marginRight:'10px', fontWeight:'bold'}}>Reference:</h6>
                                      <Typography variant='subtitle2' sx={{fontSize: '16px'}}>{assessment.reference}</Typography>
                                    </div>
                                    <div style={{display:'flex'}}>
                                      <h6 style={{marginRight:'10px', fontWeight:'bold'}}>Date Given:</h6>
                                      <Typography variant='subtitle2' sx={{fontSize: '16px'}}>{new Date(assessment.createdAt).toDateString()}</Typography>
                                    </div>
                                </div>
                            </Card>
                        </Link>
                    </Grid> 
                    )
                }):(
                <Backdrop sx={{ color: '#002141', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={true}
                >
                <CircularProgress color="inherit" />
                </Backdrop>
            )}
      </Grid>
    </Container>
  )
}

export default Alltasks