import React from 'react'
import styled from 'styled-components/macro'

import { COLORS, WEIGHTS } from '../../constants'
import { formatPrice, pluralize, isNewShoe } from '../../utils'
import Spacer from '../Spacer'

const ShoeCard = ({
  slug,
  name,
  imageSrc,
  price,
  salePrice,
  releaseDate,
  numOfColors
}) => {
  // There are 3 variants possible, based on the props:
  //   - new-release
  //   - on-sale
  //   - default
  //
  // Any shoe released in the last month will be considered
  // `new-release`. Any shoe with a `salePrice` will be
  // on-sale. In theory, it is possible for a shoe to be
  // both on-sale and new-release, but in this case, `on-sale`
  // will triumph and be the variant used.
  // prettier-ignore
  const variant = typeof salePrice === 'number'
    ? 'on-sale'
    : isNewShoe(releaseDate)
      ? 'new-release'
      : 'default'

  return (
    <Link href={`/shoe/${slug}`}>
      <Wrapper>
        <ImageWrapper>
          <Image alt='' src={imageSrc} />
          {variant === 'on-sale' && <SaleTag>Sale</SaleTag>}
          {variant === 'new-release' && <NewTag>Just released!</NewTag>}
        </ImageWrapper>
        <Spacer size={12} />
        <Row>
          <Name>{name}</Name>
          <Price
            style={{
              '--color': variant === 'on-sale' ? COLORS.gray[700] : undefined,
              '--text-decoration':
                variant === 'on-sale' ? 'line-through' : undefined
            }}
          >
            {formatPrice(price)}
          </Price>
        </Row>
        <Row>
          <ColorInfo>{pluralize('Color', numOfColors)}</ColorInfo>
          {variant === 'on-sale' && (
            <SalePrice>{formatPrice(salePrice)}</SalePrice>
          )}
        </Row>
      </Wrapper>
    </Link>
  )
}

const Link = styled.a`
  flex: 1 0 275px;
  text-decoration: none;
  color: inherit;
`

const Wrapper = styled.article``

const ImageWrapper = styled.div`
  position: relative;
`

const Image = styled.img`
  border-radius: 16px 16px 4px 4px;
`

const Row = styled.div`
  display: flex;
  justify-content: space-between;

  font-size: 1rem;
`

const Name = styled.h3`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.gray[900]};
`

const Price = styled.span`
  color: var(--color);
  text-decoration: var(--text-decoration);
`

const ColorInfo = styled.p`
  color: ${COLORS.gray[700]};
`

const Tag = styled.div`
  position: absolute;
  top: 12px;
  right: -4px;

  padding: 7px 9px 9px 11px;
  border-radius: 2px;

  font-size: 14px;
  font-weight: ${WEIGHTS.bold};
  color: ${COLORS.white};
`

const SaleTag = styled(Tag)`
  background: hsla(340, 65%, 47%, 1);
`

const NewTag = styled(Tag)`
  background: hsla(240, 60%, 63%, 1);
`

const SalePrice = styled.span`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.primary};
`

export default ShoeCard
