import {
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  StatGroup,
} from '@chakra-ui/react'

import React from 'react'

export default function Stats(props) {
  return (
    <StatGroup className='border p-4'>
  <Stat>
    <StatLabel>Users clicked</StatLabel>
    <StatNumber>{props.userClicked}</StatNumber>
    <StatHelpText>
      <StatArrow type='increase' />
      23.36%
    </StatHelpText>
  </Stat>

  <Stat>
    <StatLabel>Orders in last month</StatLabel>
    <StatNumber>{props.lastMonthOrders}</StatNumber>
    <StatHelpText>
      <StatArrow type='increase' />
      9.05%
    </StatHelpText>
  </Stat>
</StatGroup>
  )
}

