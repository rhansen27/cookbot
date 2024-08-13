import React, { useState } from 'react';
import { Button, Space } from 'antd';
import { useLazyQuery } from '@apollo/client'
import MealType from '../Dropdowns/MealType'
import Health from '../Dropdowns/Health';
import Diet from '../Dropdowns/Diet'
import CuiseneType from '../Dropdowns/CuiseneType';
import { GET_FILTERED_RECIPES } from '../../utils/queries'


const Filter = () => {
    const [ cuiseneType, setCuiseneType ] = useState('')
    const [ mealType, setMealType ] = useState('')
    const [ diet, setDiet ] = useState('')
    const [ health, setHealth ] = useState('')

    const [ getFilteredRecipes, { loading, error, data }] = useLazyQuery(GET_FILTERED_RECIPES)

    const handleSearch = () => {
        getFilteredRecipes({ variables: { cuiseneType, mealType, diet, health }})
    }   
    return (
        <Space direction='horizontal'>
            <MealType onChange={setMealType} />
            <CuiseneType onChange={setCuiseneType} />
            <Diet onChange={setDiet} />
            <Health onChange={setHealth} />
            <Button onClick={handleSearch} style={{marginTop: 10}}>Find My Recipe</Button>
        </Space>
    );
};
  
export default Filter;
