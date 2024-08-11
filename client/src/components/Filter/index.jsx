import React from 'react';
import { Button, Flex } from 'antd';
import MealType from '../Dropdowns/MealType'
import Allergy from '../Dropdowns/Allergy'
import Diet from '../Dropdowns/Diet'
import CuiseneType from '../Dropdowns/CuiseneType';


const Filter = () => {
    return (
        <Flex>
            <MealType />
            <Diet />
            <Allergy />
            <CuiseneType />
            <Button style={{marginTop: 10}}>Find My Recipe</Button>
        </Flex>
    );
};
  
export default Filter;
