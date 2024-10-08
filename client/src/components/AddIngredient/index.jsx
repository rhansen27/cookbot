import React, { useState } from 'react';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, Space, Upload, TreeSelect, notification } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { useMutation } from '@apollo/client'
import { ADD_RECIPE } from '../../utils/mutations.js'


import Auth from '../../utils/auth.js';


const Profile = () => {
  const userProfile = Auth.getProfile()
  return userProfile.data._id
}

const recipeData = {}
const normFile = (e) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

const AddIngredient = () => {
  const [formState, setFormState] = useState({ title: "", ingredients: "", descritpion: "", filter: "", createdBy: "" })
  const [addUserRecipe, { error, data }] = useMutation(ADD_RECIPE)


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
    const userId = Profile()
    const recipe = {userId, ...values, ...recipeData}
    console.log(recipe)
    try{
      const {data} = await addUserRecipe({variables: {
        title: recipe.recipeName, 
        createdBy: recipe.userId, 
        filter: recipe.filter,
        description: recipe.description,
        ingredients: recipe.ingredients
      }})
      console.log('Mutation successful:', data)
    } catch (e) {
      console.error(e)
    }
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

    return (
    <div className='form-container'>
      <Form
      className='ingredient-form'
      name="dynamic_form_nest_item"
      autoComplete="off"
      onFinish={(values) => 
        handleFormSubmit(values)
      }
    >
      <Form.Item label="Add Image" valuePropName="fileList" getValueFromEvent={normFile} name="image">
        <Upload action="/upload.do" listType="picture-card" maxCount={1}
        >
          <div className="upload-button">
              <PlusOutlined />
              <div className="upload-text">Upload</div>
            </div>
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
                className='ingredient-space'
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
      className='submit-button-container'
      >
        <NotifySuccess/>
      </Form.Item>
    </Form>
    </div>
  )
}
export default AddIngredient;
