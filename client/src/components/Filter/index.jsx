import React from 'react';
import { Button, Flex } from 'antd';
import MealType from '../Dropdowns/MealType'
import Allergy from '../Dropdowns/Allergy'
import Diet from '../Dropdowns/Diet'
import Region from '../Dropdowns/Region'


const Filter = () => {
    return (
        <Flex>
            <MealType />
            <Diet />
            <Allergy />
            <Region />
            <Button>Find My Recipe</Button>
        </Flex>
    );
};
  
export default Filter;
