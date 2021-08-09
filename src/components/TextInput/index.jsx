import './styles.css'

export const TextInput = ({ searchValue, handleChange, placeHolder }) => {
    return (
        <input type="search"
            className='input'
            value={searchValue}
            placeholder={placeHolder}
            onChange={handleChange}
        />
    )
}