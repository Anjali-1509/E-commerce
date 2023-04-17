import React from 'react'
import { useSearch } from '../../context/Search'
import axios from "axios"
import { useNavigate } from 'react-router-dom'

const SearchInput = () => {
    const [values, setValues] = useSearch()
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const { data } = await axios.get(`https://e-commerce-9xkj.onrender.com/product/search/${values.keyword}`)
            setValues({ ...values, results: data })
            navigate("/search")
        }
        catch (err) {
            console.log(err)
        }
    }
    return (
        <div>
            <form className="d-flex" role="search" onSubmit={handleSubmit}>
                <input
                    className="form-control me-2"
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                    values={values.keyword}
                    onChange={(e) => setValues({ ...values, keyword: e.target.value })}
                />
                <button className="btn btn-outline-dark" type="submit">Search</button>
            </form>
        </div>
    )
}

export default SearchInput
