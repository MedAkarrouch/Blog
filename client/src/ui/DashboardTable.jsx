import { useState } from 'react'
import DashboardRow from './DashboardRow'
import Table from './Table'

function DashboardTable({ posts }) {
  const [selectedId, setSelectedId] = useState(null)
  return (
    <Table columns="7rem 2fr 1fr 0.7fr 0.7fr 0.1fr">
      <Table.Header>
        <div></div>
        <div>title</div>
        <div>category</div>
        <div>date</div>
        <div>stats</div>
        <div></div>
      </Table.Header>
      <Table.Body
        // data={[posts.at(0)]}
        data={posts}
        render={(post) => (
          <DashboardRow
            key={post._id}
            isMenuOpen={selectedId === post._id}
            openMenu={(id) =>
              setSelectedId((current) => (current === id ? null : id))
            }
            closeMenu={() => setSelectedId(null)}
            post={post}
          />
        )}
      />
    </Table>
  )
}

export default DashboardTable
