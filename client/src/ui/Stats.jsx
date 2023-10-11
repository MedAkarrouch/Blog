import styled from 'styled-components'

const StyledStats = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
  margin: 3rem;
`

const Stat = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--color-grey-100);
  border-radius: 5px;
  padding: 1.6rem;
  font-size: 1.4rem;
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
        <span>Total posts</span>
        <span>1540</span>
      </Stat>
      <Stat>
        <span>Total Comments</span>
        <span>1540</span>
      </Stat>
      <Stat>
        <span>Total Likes</span>
        <span>1540</span>
      </Stat>
      <Stat>
        <span>Like per post</span>
        <span>54</span>
      </Stat>
      <Stat>
        <span>Comment per post</span>
        <span>31</span>
      </Stat>
    </StyledStats>
  )
}

export default Stats
