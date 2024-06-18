import Register from './Register'
import Login from './Login'


const Entry = () => {
  return (
    <div className='container'>
      <div className='entery'>
        <Register />
        <p>OR</p>
        <Login />  
      </div> 
    </div>
  )
}

export default Entry