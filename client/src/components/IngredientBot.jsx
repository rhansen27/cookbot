import React, { useState } from 'react';
import { Input, Button } from 'antd';
import { useLazyQuery } from '@apollo/client'
import { GET_RECIPE_FROM_AI } from '../utils/queries'
const { TextArea } = Input;

const IngredientBot = () => {
    const [ingredients, setIngredients] = useState('');

    const [getRecipeFromAi, {loading, error, data }] = useLazyQuery(GET_RECIPE_FROM_AI) 

    const handleFetchRecipes = async () => {
        if (ingredients.trim()) {
            const response = await getRecipeFromAi({ variables: { ingredients } })
            console.log(response)
        }  
    };

    return (
        <>
            <TextArea 
                rows={5} 
                placeholder='Enter your ingredients here, separated by commas' 
                value={ingredients}
                onChange={(e) => setIngredients(e.target.value)}
            />
            <Button 
            type="primary" onClick={handleFetchRecipes} style={{ marginTop: '10px' }}>
                Find Recipes
            </Button>
            {/* {recipes && recipes.length > 0 && (
                <div style={{ marginTop: '20px' }}>
                    {recipes.map((recipe, index) => (
                        <div key={index}>
                            <h3>{recipe.title}</h3>
                            <p>{recipe.description}</p>
                        </div>
                    ))}
                </div>
            )} */}
        </>
    );
};

export default IngredientBot;
