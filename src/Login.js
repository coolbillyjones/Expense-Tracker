import { use, useState } from "react"
import axios from "axios"
import { Link, useNavigate } from "react-router-dom"

const Login = () => {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  async function submit(e){
    e.preventDefault()

    try{
      await axios.post("http://localhost:3500/login",{
        user: username, pwd: password
      })
      .then(res=>{
        if(res.status===200){
          navigate("/home", {state:{id:username}})
        }
        else if(res.status===400){
          alert("Username and Password Required")
        }
        else if(res.status===401){
          alert('Error: Incorrect Credentials')
        }
      })
    } catch(e){
        console.log(e)
    }
  }


  return (
    <div>
      <h1>Login</h1>

      <form action ="Post">
        <input type="text" onChange={(e)=>{setUsername(e.target.value)}} placeholder="username" name="" id="" />
        <input type="password" onChange={(e)=>{setPassword(e.target.value)}} placeholder="password" name="" id="" />

        <input type="submit" onClick={submit} />
      </form>

      <p>Or</p>
      <br />
      <Link to="/signup">Signup</Link>
    </div>
    
  )
}

export default Login