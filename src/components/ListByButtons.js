import React from 'react'

const ListByButtons = ({handleListSort}) => {

    return (
        <div>
            <h3>List By Likes:</h3>
            <button onClick={handleListSort}>↑</button>
            <button onClick={handleListSort}>Normal</button>
            <button onClick={handleListSort}>↓</button>
        </div>
    )
}

export default ListByButtons
