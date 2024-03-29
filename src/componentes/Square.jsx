import React from 'react';
import {useState} from 'react';

function Square ({Value}) {
    const[value, setValue]= useState(null);
    function handleClick(){
        setValue('X');
    }
    return (
        <div>
            <button className='square' onClick={handleClick}>{value}</button>
        </div>
    );
};

export default Square;