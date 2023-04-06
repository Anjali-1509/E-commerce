import React from 'react'

const CategoryForm = ({ handleSubmit, value, setValue }) => {
    return (
        <>
            <form onSubmit={handleSubmit}>
                <div class="mb-3">
                    <input
                        type="text"
                        class="form-control"
                        value={value}
                        placeholder="Enter New Category"
                        onChange={(e) => setValue(e.target.value)}
                    />
                </div>
                <button type="submit" class="button">Submit</button>
            </form>
        </>
    )
}

export default CategoryForm
