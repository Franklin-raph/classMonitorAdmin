import React,{ useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import  Paper  from '@mui/material/Paper'
import Avatar from '@mui/material/Avatar';
import  Container  from '@mui/material/Container'
import { Button, Box } from '@mui/material';
import Modal from '@mui/material/Modal';
// import makeStyles from '@mui/styles/makeStyles';
// export { jssPreset } from '@mui/styles';

// const useStyles = makeStyles((theme) => ({
//   paper: {
//     marginTop: '-70px',
//     padding: '80px 30px 30px 30px',
//     textAlign: 'center',
//     backgroundColor:'rgb(0, 33, 65) !important',
//     color: '#fff !important'
//   },
//   nameandemail : {
//     display: 'flex',
//     justifyContent: 'space-around',
//     alignItems: 'flex-start',
//     textAlign: 'center',
//     [theme.breakpoints.down("sm")]:{
//       flexDirection:'column'
//     }
//   },
//   numberandgender: {
//     display: 'flex',
//     justifyContent: 'space-around',
//     alignItems: 'flex-start',
//     textAlign: 'center',
//     marginRight: '11rem',
//     [theme.breakpoints.down("sm")]:{
//       flexDirection:'column',
//       width: '100%',
//     }
//   },
//   studentID :{
//     display: 'flex',
//     justifyContent: 'space-around',
//     alignItems: 'flex-start',
//     textAlign: 'center',
//     marginRight: '17.5rem',
//     [theme.breakpoints.down("sm")]:{
//       flexDirection:'column',
//       width: '100%',
//     }
//   }, 
//   avatarBox : {
//     display: 'flex',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginTop:'2rem',
    
//   },
//   avatar : {
//     padding: '6rem',
//     border:'10px solid #fff',
//   },
//   containerStyle : {
//     [theme.breakpoints.down("lg")] : {
//         marginTop: '5rem',
//         marginBottom: '4rem'
//     }
// }
// }))

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  borderRadius: '10px',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

const paperStyle = {
  padding: '2rem 0 1rem 2rem',
  margin: '9rem 0 1rem',
}

const imageStyle = {
  width:'10rem',
  height:'10rem'
}

const imageContainer = {
  width:'9rem',
  height:'9rem',
  position:'absolute',
  top:'20%',
  left:'50%',
  transform: 'translate(-50%, -50%)'
}

const StudentDetails = () => {

  const navigate = useNavigate();

    // const classes = useStyles();
    const { id } = useParams()
    const [studentDetails, setStudentDetails] = useState([]);
    const [open, setOpen] = useState(false);
    
    const handleOpen = () => {
      setOpen(true);
    };
    const handleClose = () => {
      setOpen(false);
    };  

    useEffect(() => {
      getStudentDetails()
  },[])

  const getStudentDetails = async () => {
      try{
        const resp = await fetch(`https://classmonitorapp.herokuapp.com/student/${id}`)
        const data = await resp.json()
        setStudentDetails(data)
        console.log(data)
        // setEmailInitials(data.email.charAt(0))
    } catch (error){
        console.log(error)
    }
  }

  // https://classmonitorapp.herokuapp.com/auth/student/deleteStuentRecord

  const handleStudentDelete = async (e) => {
    e.preventDefault()
      try{
        const resp = await fetch(`http://localhost:5000/auth/student/deleteStuentRecord/${id}`,{
          method: "DELETE"
        })
        const data = await resp.json()
        if(data) navigate(`/dashboard`)
        else console.log(data)
        console.log(data)
        // setEmailInitials(data.email.charAt(0))
    } catch (error){
        console.log(error)
    }
  }

  return (
    <>
      <Container>
        <div>
          <Avatar style={imageContainer}>
            <img src={studentDetails.avatar} style={imageStyle}/>
          </Avatar>
        </div>
        <Paper elevation={3} sx={paperStyle}>
          
          <div>
            <p style={{padding: '10px 0'}}> <span style={{fontWeight:'bolder'}}>Student Name : </span>{studentDetails.name}</p>
            <p style={{padding: '10px 0'}}> <span style={{fontWeight:'bolder'}}>Student Email : </span>{studentDetails.email}</p>
          </div>
          
          <div>
            <p style={{padding: '10px 0'}}> <span style={{fontWeight:'bolder'}}>Phone Number : </span>{studentDetails.phoneNum}</p>
            <p style={{padding: '10px 0'}}> <span style={{fontWeight:'bolder'}}>Gender : </span> {studentDetails.gender}</p>
          </div>
          
          <div>
          <p style={{padding: '10px 0'}}> <span style={{fontWeight:'bolder'}}>Student ID : </span>{studentDetails.studentID}</p>
          <p style={{padding: '10px 0'}}> <span style={{fontWeight:'bolder'}}>Address : </span>{studentDetails.address}</p>
            
          </div>
        </Paper>
         <Button 
            variant="contained" 
            color="warning" 
            onClick={handleOpen}
            >
              Delete Students Record
            </Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="child-modal-title"
          aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style }}>
          <h4 id="child-modal-title">Delete Record</h4>
          <p id="child-modal-description">
            Are you sure you want to delete this student's record?
          </p>
          <div style={{ display: 'flex', justifyContent:'flex-end' }}>
            <form onSubmit={handleStudentDelete}>
              <Button 
                type="submit"
                variant="contained" 
                color="error"
                onClick={() => handleStudentDelete }
                style={{ marginRight:'1rem' }}
                >
                  Yes i'm sure
              </Button>
            </form>
            
            <Button
              variant="contained" 
              color="primary"
              onClick={handleClose}
              >
                cancel
            </Button>
          </div>
        </Box>
      </Modal>
      </Container>
    </>
  )
}

export default StudentDetails