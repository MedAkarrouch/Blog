import { useSearchParams } from 'react-router-dom'
import Select from './Select'
function SortBy({ options, page }) {
  const [searchParams, setSearchParams] = useSearchParams()
  let sortBy = searchParams.get('sortBy')
  sortBy = options.some((item) => sortBy === item.value)
    ? sortBy
    : options.at(0).value
  const handleChange = (e) => {
    searchParams.set('sortBy', e.target.value)
    setSearchParams(searchParams)
  }
  return (
    <Select
      value={sortBy}
      onChange={handleChange}
      page={page}
      options={options}
    />
  )
}

export default SortBy
