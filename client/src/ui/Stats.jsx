import {
  HiOutlineChatBubbleOvalLeft,
  HiOutlineHeart,
  HiOutlineRectangleStack,
} from 'react-icons/hi2'
import styled, { css } from 'styled-components'

const StyledStats = styled.div`
  gap: 1rem 2rem;
  margin-bottom: 3rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(25rem, 1fr));
`
const Stat = styled.div`
  display: grid;
  grid-template-columns: min-content 1fr;
  align-items: center;
  gap: 1.6rem;
  border: 1px solid var(--color-grey-100);
  border-radius: 5px;
  padding: 1.6rem;
  background-color: #fff;
`
const Box = styled.div`
  font-size: 1.4rem;
  display: flex;
  flex-direction: column;
  & span:first-child {
    font-size: 1.2rem;
    text-transform: uppercase;
    font-weight: 600;
    color: var(--color-grey-500);
  }
  & span:last-child {
    font-size: 2.4rem;
    font-weight: 500;
  }
`
const Icon = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 6.4rem;
  height: 6.4rem;
  border-radius: 50%;
  background-color: var(--color-${(props) => props.color}-50);
  & svg {
    stroke-width: 1.5;
    color: var(--color-${(props) => props.color}-600);
    width: 3.2rem;
    height: 3.2rem;
  }
`

function Stats() {
  return (
    <StyledStats>
      {/* Total Posts     1540 Posts */}
      {/* Total Comments  12400 Comments */}
      {/* Total Likes     69766 Likes */}
      {/* Average Like per post  */}
      {/* Average comment per post */}

      <Stat>
        <Icon color="blue">
          <HiOutlineRectangleStack />
        </Icon>
        <Box>
          <span>Posts</span>
          <span>1540</span>
        </Box>
      </Stat>
      <Stat>
        <Icon color="green">
          <HiOutlineChatBubbleOvalLeft />
        </Icon>
        <Box>
          <span>Comments</span>
          <span>1540</span>
        </Box>
      </Stat>
      <Stat>
        <Icon color="amber">
          <HiOutlineHeart />
        </Icon>
        <Box>
          <span>Likes</span>
          <span>1540</span>
        </Box>
      </Stat>
      <Stat>
        <Icon color="green">
          <HiOutlineChatBubbleOvalLeft />
        </Icon>
        <Box>
          <span>Average comments per post</span>
          <span>31</span>
        </Box>
      </Stat>
      <Stat>
        <Icon color="amber">
          <HiOutlineHeart />
        </Icon>
        <Box>
          <span>Average likes per post</span>
          <span>54</span>
        </Box>
      </Stat>
    </StyledStats>
  )
}

export default Stats
