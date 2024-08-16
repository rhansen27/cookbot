import React, { useState } from 'react';
import { TreeSelect } from 'antd';
const treeData = [
  {
    title: 'Meal Type',
    value: 'Meal Type',
    children: [
      {
        title: 'Breakfast',
        value: 'Breakfast'
      },
      {
        title: 'Lunch',
        value: 'Lunch'
      },
      {
        title: 'Supper',
        value: 'Supper'
      },
      {
        title: 'Snack',
        value: 'Snack'
      },
      {
        title: 'Teatime',
        value: 'Teatime'
      },
    ],
  },
  {
    title: 'Cuisine Type',
    value: 'Cuisine Type',
    children: [
      {
        title: 'Italian',
        value: 'Italian'
      },
      {
        title: 'Mexican',
        value: 'Mexican'
      },
      {
        title: 'Chinese',
        value: 'Chinese'
      },
      {
        title: 'Indian',
        value: 'Indian'
      },
      {
        title: 'Mediterranean',
        value: 'Mediterranean'
      },
      {
        title: 'Japanese',
        value: 'Japanese'
      },
      {
        title: 'American',
        value: 'American'
      },
      {
        title: 'Middle Eastern',
        value: 'Middle Eastern'
      },
      {
        title: 'French',
        value: 'French'
      },
    ],
  },
  {
    title: 'Diet',
    value: 'Diet',
    children: [
      {
        title: 'High Protein',
        value: 'High Protein'
      },
      {
        title: 'High Fiber',
        value: 'High Fiber'
      },
      {
        title: 'Balanced',
        value: 'Balanced'
      },
      {
        title: 'Low Carb',
        value: 'Low Carb'
      },
      {
        title: 'Low Fat',
        value: 'Low Fat'
      },
      {
        title: 'Low Sodium',
        value: 'Low Sodium'
      },
    ],
  },
  {
    title: 'Health',
    value: 'Health',
    children: [
      {
        title: 'Dairy-Free',
        value: 'Dairy-Free'
      },
      {
        title: 'Gluten-Free',
        value: 'Gluten-Free'
      },
      {
        title: 'Peanut-Free',
        value: 'Peanut-Free'
      },
      {
        title: 'Tree-Nut-Free',
        value: 'Tree-Nut-Free'
      },
      {
        title: 'Shellfish-Free',
        value: 'Shellfish-Free'
      },
      {
        title: 'Soy-Free',
        value: 'Soy-Free'
      },
      {
        title: 'Pork-Free',
        value: 'Pork-Free'
      }
    ],
  },
];
const FilterSelect = () => {
  const [value, setValue] = useState();
  const onChange = (newValue) => {
    setValue(newValue);
  };
  const tProps = {
    treeData,
    value,
    onChange,
    treeCheckable: true,
    showCheckedStrategy: TreeSelect.SHOW_CHILD,
    placeholder: 'Please select',
    style: {
      width: '100%',
    },
  };
  const recipeData = <TreeSelect {...tProps} />
  console.log(recipeData.props.value)
  return <TreeSelect {...tProps} />;
};
export default FilterSelect;