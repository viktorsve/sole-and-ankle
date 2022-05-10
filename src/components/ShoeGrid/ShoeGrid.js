import React from 'react'
import styled from 'styled-components/macro'

import SHOES from '../../data'
import ShoeCard from '../ShoeCard'

const ShoeGrid = () => {
  return (
    <Wrapper>
      {SHOES.map(shoe => (
        <ShoeCard key={shoe.slug} {...shoe} />
      ))}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 32px;
`

export default ShoeGrid
