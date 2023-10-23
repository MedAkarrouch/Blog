import { useSearchParams } from 'react-router-dom'
import Select from './Select'
function SortBy({ options, page }) {
  const [searchParams, setSearchParams] = useSearchParams()
  const handleChange = (e) => {
    searchParams.set('sortBy', e.target.value)
    setSearchParams(searchParams)
  }
  return <Select onChange={handleChange} page={page} options={options} />
}

export default SortBy
