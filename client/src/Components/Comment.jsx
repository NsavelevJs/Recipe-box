import React, { useState } from 'react'
import { updateComment, deleteComment } from "../Services/recipes"

export default function Comment(props) {

  const { index, recipe, setRecipe, } = props
  const { _id, commentAuthor, commentDetails, commentTime } = props.comment

  const [isClicked, setClick] = useState(false)
  const [comment, setComment] = useState({})

  const handleChange = (event) => {
    const { name, value } = event.target
    setComment({
      ...comment,
      [name]: value
    })
  }

  const handleEditClick = () => {
    setClick(!isClicked)
    setComment({
      ...comment,
      commentAuthor: commentAuthor,
      commentDetails: commentDetails,
      commentTime: commentTime
    })
  }

  const handleSubmitClick = () => {
    const cloneRecipe = { ...recipe }
    cloneRecipe.comments[index] = comment
    cloneRecipe.comments.reverse()
    setRecipe(cloneRecipe)
    updateComment(recipe._id, _id, comment)
    setClick(!isClicked)
  }

  const removeComment = () => {
    deleteComment(recipe._id, _id)
    const cloneRecipe = { ...recipe }
    cloneRecipe.comments.splice(index, 1)
    cloneRecipe.comments.reverse()
    setRecipe(cloneRecipe)
  }

  return (
    <div className=" border-gray-400 border-b-2 my-3 py-1 px-4 w-full ">

      <h4><b>{commentAuthor}</b></h4>

      {isClicked ? <textarea className="h-full border border-gray-400 rounded-lg py-2 px-4 mb-4 block w-full appearance-none" value={comment.commentDetails} name="commentDetails" id='content' onChange={handleChange}></textarea> : <p>{commentDetails}</p>}

      <p className="text-sm text-gray-500"><i>{commentTime}</i></p>

      {isClicked ? <button className="bg-green-300 hover:bg-green-600 text-white m-3 py-2 px-5 rounded focus:outline-none focus:shadow-outline" onClick={handleSubmitClick} type="button"> Submit </button> : <button className="bg-blue-200 rounded-full py-1 px-5 mr-2 outline-none focus:outline-none focus:shadow-outline" onClick={handleEditClick} type="button"> Edit </button>}

      <button className="bg-blue-200 rounded-full py-1 px-5 outline-none focus:outline-none focus:shadow-outline" onClick={removeComment} type="button"> Delete </button>
      
    </div>
  )
}
