import React from 'react'
import './Student.css'
import StuExamCard from '../StudentCard/StuExamCard'

export default function Student() {
    return (
        <div className='student'>
            <div className='sidebar'>
                <h1 style={{ color: '#2866cd' , fontWeight: 'bold', textAlign: 'center'}}>FALL 23</h1>
            </div>
            <StuExamCard />
        </div>
    )
}
