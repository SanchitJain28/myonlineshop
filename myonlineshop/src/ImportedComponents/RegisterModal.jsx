import { useToast } from "@chakra-ui/react";
import { Modal } from "flowbite-react";
import { useContext, useState } from "react";
import { authContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Button, TextField } from "@mui/material";


export default function RegisterModal(props) {
    const [openModal, setOpenModal] = useState(false);
    const toast = useToast()
    const auth = useContext(authContext)
    const navigate = useNavigate();

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [name, setName] = useState("")
    const [phoneNo, setPhoneNo] = useState("")



    return (
        <>
            <a onClick={() => setOpenModal(true)} className={props.className}>SignUp</a>
            <Modal dismissible show={openModal} onClose={() => setOpenModal(false)} className="">
                <Modal.Header className=" rounded text-white" >Register</Modal.Header>
                <Modal.Body className="">
                    <div className="flex-col">
                    <TextField id="outlined-basic" label="Email" variant="outlined" onChange={(e) => {
                        setEmail(e.target.value)
                    }} value={email} className='mx-2 my-2 w-full' />
                    <TextField id="outlined-basic" label="Password" variant="outlined" onChange={(e) => {
                        setPassword(e.target.value)
                    }} value={password} className='mx-2 my-2 w-full' />
                    <TextField id="outlined-basic" label="Name" variant="outlined" onChange={(e) => {
                        setName(e.target.value)
                    }} value={name} className='mx-2 my-2 w-full' />
                
                    <TextField id="outlined-basic" label="Phone no" variant="outlined" onChange={(e) => {
                        setPhoneNo(e.target.value)
                    }} value={phoneNo} className='mx-2 my-2 w-full' />
                   

                    <Button variant="outlined" onClick={async () => {
                        const data = await auth.getMeRegistered(email, password, name, phoneNo)
                        if (!data.errors) {
                            setEmail("")
                            setName("")
                            setPassword("")
                            setPhoneNo("")
                            localStorage.setItem("userId", data.token)
                            localStorage.setItem("loginDetails",JSON.stringify(data.user))
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

                    }} className='mx-2 my-2  '>Register</Button>
                    </div>
                    
                </Modal.Body>
            </Modal>
        </>
    );
}
