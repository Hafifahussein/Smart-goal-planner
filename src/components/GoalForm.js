import React, { useState, useEffect } from 'react'

const GoalForm = ({ addGoal, updateGoal, editingGoal }) => {
  const [goal, setGoal] = useState({
    name: '',
    targetAmount: '',
    category: '',
    deadline: '',
  })

  useEffect(() => {
    if (editingGoal) {
      setGoal(editingGoal)
    }
  }, [editingGoal])

  const handleChange = (e) => {
    const { name, value } = e.target
    setGoal({ ...goal, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!goal.name || !goal.targetAmount || !goal.category || !goal.deadline) {
      alert('Please fill all required fields')
      return
    }

    if (editingGoal) {
      updateGoal(goal)
    } else {
      addGoal(goal)
    }

    setGoal({
      name: '',
      targetAmount: '',
      category: '',
      deadline: '',
    })
  }

  return (
    <form onSubmit={handleSubmit} className="goal-form">
      <h2>{editingGoal ? 'Edit Goal' : 'Add New Goal'}</h2>

      <div className="form-group">
        <label>Goal Name</label>
        <input type="text" name="name" value={goal.name} onChange={handleChange} required />
      </div>

      <div className="form-group">
        <label>Target Amount ($)</label>
        <input
          type="number"
          name="targetAmount"
          value={goal.targetAmount}
          onChange={handleChange}
          min="0"
          step="0.01"
          required
        />
      </div>

      <div className="form-group">
        <label>Category</label>
        <select name="category" value={goal.category} onChange={handleChange} required>
          <option value="">Select a category</option>
          <option value="Travel">Travel</option>
          <option value="Emergency">Emergency</option>
          <option value="Electronics">Electronics</option>
          <option value="Real Estate">Real Estate</option>
          <option value="Vehicle">Vehicle</option>
          <option value="Education">Education</option>
          <option value="Shopping">Shopping</option>
          <option value="Retirement">Retirement</option>
          <option value="Home">Home</option>
        </select>
      </div>

      <div className="form-group">
        <label>Deadline</label>
        <input type="date" name="deadline" value={goal.deadline} onChange={handleChange} required />
      </div>

      <button type="submit" className="submit-btn">
        {editingGoal ? 'Update Goal' : 'Add Goal'}
      </button>
    </form>
  )
}

export default GoalForm
