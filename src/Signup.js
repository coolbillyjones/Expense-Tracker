import { use, useState } from "react"
import axios from "axios"
import { Link, useNavigate } from "react-router-dom"

const Signup = () => {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  async function submit(e){
    e.preventDefault()
    try{
      await axios.post("http://localhost:3500/register",{
        user: username, pwd: password
      })
      await axios.post("http://localhost:3500/data", {
        username: username
      })
      .then(res=>{
        if(res.status===409){
          alert("Username already exists")
        }
        else if(res.status===201){
          navigate("/home", {state:{id:username}})
        }
      })
    } catch(e){
        console.log(e)
    }
  }


  return (
    <div>
      <h1>Signup</h1>

      <form action ="Post">
        <input type="text" onChange={(e)=>{setUsername(e.target.value)}} placeholder="username" name="" id="" />
        <input type="password" onChange={(e)=>{setPassword(e.target.value)}} placeholder="password" name="" id="" />

        <input type="submit" onClick={submit} />
      </form>

      <p>Or</p>
      <br />
      <Link to="/">Back to Start</Link>
    </div>
    
  )
}

export default Signup