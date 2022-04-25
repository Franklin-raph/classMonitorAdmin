import React,{ useState } from 'react'
import { useNavigate } from 'react-router-dom';

const AdminSignIn = () => {
    
    const navigate = useNavigate();

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [error, setError] = useState("");

    const adminSignInDetails = { email, password };

    const handleAdminLogin = async (e) => {
        e.preventDefault();
        const resp = await fetch('https://classroommonitorbackend.herokuapp.com/auth/admin/login',{
            method:"POST",
            body: JSON.stringify(adminSignInDetails),
            headers: {
                "Content-type": "application/json"
            }
        })
        const data = await resp.json()
        localStorage.setItem('admin', JSON.stringify(data.signedInAdmin))
        if(data.msg === "Invalid login credentials"){
            setError("Invalid login credentials")
            setTimeout(() => {setError("")}, 5000)
            navigate(`/`)
        }else{
            navigate(`/dashboard`)
        }
        
        console.log(data)
    }
  return (
    <div>
    <div className="card card-body">
        <div className="text-center">
            <p className='text-danger'>{error}</p>
            <h3>Login</h3>
            <i className="fas fa-user-circle" style={{fontSize: "3rem"}}></i>
        </div>
    <form onSubmit={handleAdminLogin}>
        <div className="form-group">
            
            <label className="mt-3">Email</label>
            <input type="email" placeholder="test@test.com" onChange={(e) => setEmail(e.target.value)} className="form-control" name="email"required />

            <label className="mt-3">Password</label>
            <input type="password" placeholder="****" onChange={(e) => setPassword(e.target.value)} className="form-control" name="password" required />

            <input type="submit" className="form-control btn-dark mt-3"  value="Login" />
        </div>
    </form>
    </div>
</div>
  )
}

export default AdminSignIn