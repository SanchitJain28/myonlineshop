import { Input, useConst, useToast } from "@chakra-ui/react";
import { Button, Modal } from "flowbite-react";
import { useContext, useState } from "react";
import { productAPI } from "../contexts/ProductContext";

export function DeleteModal(props) {
    const [openModal, setOpenModal] = useState(false);
    const [deleteProduct, setDeleteProduct] = useState("")
    const deleteDetails=useContext(productAPI)
    const {_id}=deleteDetails.updateProduct
    const toast=useToast()
    return (
        <>
            <Button onClick={()=>{
                setOpenModal(true)
                deleteDetails.setUpdateProduct(props.myproduct)

            }}>Delete Product</Button>
            <Modal show={openModal} onClose={() => setOpenModal(false)}>
                <Modal.Header>Terms of Service</Modal.Header>
                <Modal.Body>
                    <p>Write DELETE to delete this product</p>
                    <Input placeholder="DELETE" onChange={(e)=>{
                        setDeleteProduct(e.target.value)

                    }} value={deleteProduct}/>
                
                </Modal.Body>
                <Modal.Footer>
                <Button onClick={async()=>{
                        console.log(_id)
                        const data=await deleteDetails.deleteProduct(_id)
                            toast({
                                title: `PRODUCT DELETED`,
                                status: "error",
                                isClosable: true,
                            })
                        console.log(data)
                    }} disabled={deleteProduct=="DELETE"?false:true}>Delete Product</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
