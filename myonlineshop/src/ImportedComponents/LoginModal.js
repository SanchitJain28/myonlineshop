import { useToast } from "@chakra-ui/react";
import { Button, Modal } from "flowbite-react";
import { Button as ChakraButton } from "@chakra-ui/react";
import { useContext, useState } from "react";
import { authContext } from "../contexts/AuthContext";
import { FormHelperText, Input, FormControl, FormLabel } from "@chakra-ui/react";

export default function LoginModal(props) {
  const [openModal, setOpenModal] = useState(false);
  const toast = useToast()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const auth = useContext(authContext)

  return (
    <>
      <ChakraButton onClick={() => setOpenModal(true)} className="mx-4">{props.msg}</ChakraButton>
      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>login</Modal.Header>
        <Modal.Body>
          <FormControl className=''>
            <FormLabel>Email address</FormLabel>
            <Input type='email' onChange={(e) => {
              setEmail(e.target.value)
            }} value={email} />
            <FormHelperText className='text-white'>We'll never share your email.</FormHelperText>
          </FormControl>


          <FormControl className=''>
            <FormLabel>password</FormLabel>
            <Input type='email' onChange={(e) => {
              setPassword(e.target.value)
            }} value={password} />
          </FormControl>

          <Button backgroundColor='#000000' onClick={async () => {
            const data = await auth.getMelogin(email, password)
            console.log(data)
            if (!data.errors) {
              localStorage.setItem("userId", data.token)
              auth.setLoginDetails(data.user)
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
          }} className='text-white w-40 my-4 '>Register</Button>
        </Modal.Body>
      </Modal>
    </>
  );
}
