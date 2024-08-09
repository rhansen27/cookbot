import React, { useState } from 'react';
import { Input, Button } from 'antd';
import { useLazyQuery } from '@apollo/client'
import { GET_RECIPE_FROM_AI } from '../utils/queries'
const { TextArea } = Input;

const IngredientBot = () => {
    const [ingredients, setIngredients] = useState('');

    const [recipe, setRecipe] = useState(null); 

    const [getRecipeFromAi, { loading, error }] = useLazyQuery(GET_RECIPE_FROM_AI, {
        onCompleted: (data) => {
            const content = data.getRecipeFromAi.content;
            const [title, description, ...steps] = content.split('\n').filter(Boolean);
            setRecipe({
                title,
                description,
                steps
            });
        }
    });

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
                type="primary"
                onClick={handleFetchRecipes}
                style={{ marginTop: '10px',backgroundColor: '#7C5BEA', width: '200px' }}
                disabled={loading}
            >
                Find Recipes
            </Button>
            {error && <p>Error: {error.message}</p>}
            {recipe && (
                <div style={{ marginTop: '20px' }}>
                    <h2>{recipe.title}</h2>
                    <p>{recipe.description}</p>
                    <ul style={{ marginBottom: '5px'}}>
                        {recipe.steps.map((step, index) => (
                            <li key={index}>{step}</li>
                        ))}
                    </ul>

                </div>
            )}
        </>
    );
};

export default IngredientBot;
