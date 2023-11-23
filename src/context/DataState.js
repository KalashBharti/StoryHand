import React, { useState } from 'react'
import DataContext from './DataContext'

const DataState = (props) => {

    const [MyParagraph, setMyParagraph] = useState([
        {
            'title': 'slrknmgks',
            'mess': `Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos cupiditate error possimus quam quas illum dolore autem necessitatibus dolorem nisi, nam fuga, ipsa tempora magnam?`
        }
    ])

    return (
        <DataContext.Provider value={{ MyParagraph, setMyParagraph }}>
            {props.children}
        </DataContext.Provider>
    )
}

export default DataState
