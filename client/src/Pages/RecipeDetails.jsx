import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getRecipe } from '../Services/recipes'


import Header from '../Shared/Header'
import StepNav from '../Components/StepNav'
import ActionBar from '../Components/ActionBar'
import AmountAndTime from '../Components/AmountAndTime'
import Ingredient from '../Components/Ingredient'
import Step from '../Components/Step'
import Comments from '../Components/Comments'
import Footer from '../Shared/Footer'


export default function RecipeDetails() {


  const { id } = useParams()
  const [recipe, setRecipe] = useState({})

  useEffect(() => {
    (async () => setRecipe(await getRecipe(id)))()
  }, [])

  const {
    title,
    coverImage,
    servesPeople,
    cookTime,
    cookTimeUnit,
    ingredients,
    preparation,
    comments } = recipe





  return (
    <>
      <div class="container bg-white mx-auto px-4 font-serif">
        <Header />
      </div>
      <div class="flex container mx-auto  px-4 bg-white">

        {/* Recipe Details Page */}
        <aside class="w-2/12  sticky  h-screen  mr-4 mb-4 xl:mb-0 text-gray-400 text-center text-3xl" style={{ top: '10px' }}>
          <StepNav />
        </aside>
        
        
        <div class="w-10/12">

          <img class="w-full h-auto" src={coverImage} />
          <h3 class="text-2xl text-bold mb-5 text-center border-b-2 border-gray-400 ">{title}</h3>

          <ActionBar />

          <AmountAndTime servesPeople={servesPeople} cookTime={cookTime} cookTimeUnit={cookTimeUnit} />

          <h4 class="text-xl text-bold mt-5 ">Ingredients</h4>
          {ingredients && ingredients.map((ingredient, index) =>
            <Ingredient amount={ingredient.amount} unit={ingredient.unit} consistency={ingredient.consistency} name={ingredient.name} meta={ingredient.meta} key={index} />
          )}

          {preparation && preparation.map((step, index) =>
            <Step step={step.step} description={step.description} stepImage={step.stepImage} key={index} />
          )}

          <h3 class="text-2xl text-bold mb-5">You're Finished!</h3>
          <div class="xl:w-3/4">
            <Comments comments={comments} setRecipe={setRecipe}/>
          </div>
          <Footer/>
        </div>
        

      </div>
    </>
  )
}
