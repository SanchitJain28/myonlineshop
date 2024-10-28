import { useToast, FormLabel, Input, FormControl, FormHelperText, Button as ChakraButton } from "@chakra-ui/react";
import { Button, Modal } from "flowbite-react";
import { useContext, useState } from "react";
import { authContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export default function RegisterModal(props) {
    const [openModal, setOpenModal] = useState(false);
    const toast = useToast()
    const auth = useContext(authContext)
    const navigate = useNavigate();

    const [email, setEmail] = useState("")
    const [password, setpassword] = useState("")
    const [name, setName] = useState("")
    const [phoneNo, setPhoneNo] = useState("")



    return (
        <>
            <a onClick={() => setOpenModal(true)} className={props.className}>SignUp</a>
            <Modal dismissible show={openModal} onClose={() => setOpenModal(false)} className="bg-black text-white">
                <Modal.Header className=" rounded text-white" >Register</Modal.Header>
                <Modal.Body className="bg-black p-20">
                    <FormControl >
                        <FormLabel>Email address</FormLabel>
                        <Input type='email' onChange={(e) => {
                            setEmail(e.target.value)
                        }} value={email} />
                        <FormHelperText className='text-white'>We'll never share your email.</FormHelperText>
                    </FormControl>


                    <FormControl className=''>
                        <FormLabel>password</FormLabel>
                        <Input type='email' onChange={(e) => {
                            setpassword(e.target.value)
                        }} value={password} />
                    </FormControl>

                    <FormControl className='my-2'>
                        <FormLabel>Your full name</FormLabel>
                        <Input onChange={(e) => {
                            setName(e.target.value)
                        }} value={name} />
                    </FormControl>

                    <FormControl className='my-2'>
                        <FormLabel>Your Contact No</FormLabel>
                        <Input onChange={(e) => {
                            setPhoneNo(e.target.value)
                        }} value={phoneNo} />
                    </FormControl>

                    <ChakraButton backgroundColor='#2C7A7B' onClick={async () => {
                        const data = await auth.getMeRegistered(email, password, name, phoneNo)
                        if (!data.errors) {
                            setEmail("")
                            setName("")
                            setpassword("")
                            setPhoneNo("")
                            localStorage.setItem("userId",data.token)
                            setTimeout(() => {
                                setOpenModal(false)
                            }, 1500);
                            return toast({
                                title: `Account created Succesfully`,
                                status: "success",
                                isClosable: true,
                            })
                        }
                        toast({
                            title: `Account cannot created`,
                            description: data.errors[0].msg,
                            status: "error",
                            isClosable: true,
                        })

                    }} className=' w-40 my-4 hover:bg-black hover:text-black '>Register</ChakraButton>
                </Modal.Body>
            </Modal>
        </>
    );
}
