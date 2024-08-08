import React from 'react';
import { Input } from 'antd';
const { TextArea } = Input;


const IngredientBot = () => {
    return (
        <>
            <TextArea rows={5} placeholder='Enter your ingredient in here seperated by commas' />
        </>
    )
}

export default IngredientBot