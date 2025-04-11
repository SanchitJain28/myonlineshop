import { useToast } from "@chakra-ui/react";
import { Modal } from "flowbite-react";
import { useContext, useState } from "react";
import LoginIcon from '@mui/icons-material/Login';
import { TextField, Button } from "@mui/material";
import CircularProgress from '@mui/material/CircularProgress';
import LinearProgress from '@mui/material/LinearProgress';
import { authContext } from "../../contexts/AuthContext";
import RegisterModal from "../../ImportedComponents/RegisterModal";


export default function LoginModal(props) {
  const [openModal, setOpenModal] = useState(false);
  const toast = useToast()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const auth = useContext(authContext)
  const[load,setLoad]=useState(false)
  return (
    <>{load &&<LinearProgress />}
      <a className="mx-2 my-2" onClick={() => setOpenModal(true)} >{props.msg}<LoginIcon /></a>
      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>login</Modal.Header>
        <Modal.Body>
          <div className="flex flex-col">
          <TextField id="outlined-basic" label="Email" variant="outlined" onChange={(e) => {
            setEmail(e.target.value)
          }} value={email} className='mx-2 my-2'/>
          <TextField id="outlined-basic" label="Password" variant="outlined" onChange={(e) => {
            setPassword(e.target.value)
          }} value={password} className='mx-2 my-2'/>
          <Button disabled={load} variant="outlined" onClick={async () => {
            setLoad(true)
            const data = await auth.getMelogin(email, password)
            console.log(data)
            setLoad(false)
            if (!data.errors) {
              localStorage.setItem("userId", data.token)
              auth.setLoginDetails(data.user)
              localStorage.setItem("loginDetails",JSON.stringify(data.user))
              setEmail("")
              setPassword("")
              setTimeout(() => {
                setOpenModal(false)
              }, 1500);
              return toast({
                title: 'You have been logged in.',
                description: "We've created your account for you.",
                status: 'success',
                duration: 9000,
                isClosable: true,
              })
            }
            toast({
              title: 'Error logging you in.',
              description: data.errors[0].msg,
              status: 'error',
              duration: 9000,
              isClosable: true,
            })
          }} className='mx-2 my-2'>Login {load && <CircularProgress/>}</Button>
          <p className="mx-2 my-2 text-lg">Not an user?</p>
          <Button variant="outlined" onClick={()=>{
            // setOpenModal(false)
          }} component={RegisterModal}></Button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
