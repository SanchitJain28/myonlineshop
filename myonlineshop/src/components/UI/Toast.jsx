import { useToast } from '@chakra-ui/react'

import React from 'react'

export default function Toast(props) {
  const toast = useToast()

  return (
    <>
      { toast({
          title: 'Account created.',
          description: "We've created your account for you.",
          status: 'success',
          duration: 9000,
          isClosable: true,
        })}
    </>
  
  )
}


