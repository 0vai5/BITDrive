import { Button, CustomForm } from '@/components'
import { Link } from "react-router-dom"

const LoginPage = () => {
  return (
    <main className='h-screen overflow-hidden'>
      <div className="loginHeader flex justify-end p-5 items-center">
        <Link to={'/signup'}>
          <Button>SignUp</Button>
        </Link>
      </div>
      <div className='flex justify-center items-center mt-12'>
        <CustomForm FormType={"login"} />
      </div>
    </main>
  )
}

export default LoginPage