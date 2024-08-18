import React, { useState } from 'react';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, Space, Upload, Alert, TreeSelect, notification } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { useMutation, useQuery } from '@apollo/client'
import { Navigate, useParams } from 'react-router-dom';
// import { ADD_RECIPE } from '../../utils/mutations.js'

import { QUERY_SINGLE_USER, QUERY_ME } from '../../utils/queries';

import Auth from '../../utils/auth.js';

const Profile = () => {
  const { userId } = useParams();

  // If there is no `userId` in the URL as a parameter, execute the `QUERY_ME` query instead for the logged in user's information
  const { loading, data } = useQuery(
    userId ? QUERY_SINGLE_USER : QUERY_ME,
    {
      variables: { userId },
    }
  );

  // Check if data is returning from the `QUERY_ME` query, then the `QUERY_SINGLE_PROFILE` query
  const user = data?.me || data?.user || {};
  console.log(user)
}

const recipeData = {}
const normFile = (e) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

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
  console.log(<TreeSelect {...tProps} />)
  Profile()
  const treeInfo = <TreeSelect {...tProps} />
  if(treeInfo.props.value){
    let filters = []
    let recipeInfo = treeInfo.props.value.map(i =>
       filters.push(i)
    )
    recipeData.filter = filters
  }

  return <TreeSelect {...tProps} />;
};

const handleFormSubmit = async (values) => {

  const recipe = {...values, ...recipeData}
  console.log(recipe)
  const [addRecipe, { error }] = useMutation(ADD_RECIPE)
  console.log(addRecipe)

  await addRecipe({
      variables: { recipe }
  })
  
  console.log(allData)
}

const NotifySuccess = () => {
  const [api, contextHolder] = notification.useNotification();
  const openNotification = (pauseOnHover) => () => {
    api.open({
      message: 'Recipe Added!',
      description:
        'This recipe has been successfully added to your profile.',
      showProgress: true,
      duration: 3,
      pauseOnHover,
    });
  };
  return (
    <>
      {contextHolder}
      <Space>
        <Button type="primary" htmlType="submit" onClick={openNotification(false)}>
          Submit
        </Button>
      </Space>
    </>
  );
};

const AddIngredient = () => (
  
  <Form
    name="dynamic_form_nest_item"
    style={{
      maxWidth: 600,
    }}
    autoComplete="off"
    onFinish={(values) => 
      handleFormSubmit(values)
    }
  >
    <Form.Item label="Add Image" valuePropName="fileList" getValueFromEvent={normFile} name="image">
      <Upload action="/upload.do" listType="picture-card" maxCount={1}
      >
        <button
          style={{
            border: 0,
            background: 'none',
          }}
          type="button"
        >
          <PlusOutlined />
          <div
            style={{
              marginTop: 8,
            }}
          >
            Upload
          </div>
        </button>
      </Upload>
    </Form.Item>
    Add Recipe Name
    <Form.Item name="recipeName">
      <Input placeholder="Recipe Name" />
    </Form.Item>
    Add Filters
    <FilterSelect value/>
    Add Ingredients
    <Form.List name="ingredients">
      {(fields, { add, remove }) => (
        <>
          {fields.map(({ key, name, ...restField }) => (
            <Space
              key={key}
              style={{
                display: 'flex',
                marginBottom: 8,
              }}
              align="baseline"
            >
              <Form.Item
                {...restField}
                name={[name, 'ingredient']}
                rules={[
                  {
                    required: true,
                    message: 'Missing Ingredient',
                  },
                ]}
              >
                <Input placeholder="Ingredient" />
              </Form.Item>
              <Form.Item
                {...restField}
                name={[name, 'amount']}
                rules={[
                  {
                    required: true,
                    message: 'Missing Amount',
                  },
                ]}
              >
                <Input placeholder="Amount" />
              </Form.Item>
              <MinusCircleOutlined onClick={() => remove(name)} />
            </Space>
          ))}
          <Form.Item>
            <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
              Add Another Ingredient
            </Button>
          </Form.Item>

        </>
      )}
    </Form.List>
    <Form.Item name="description">
            <TextArea  rows={4}/>
          </Form.Item>
    <Form.Item
      wrapperCol={{
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 8,
        },
      }}
    >
      <NotifySuccess/>
    </Form.Item>
  </Form>
);

export default AddIngredient;
