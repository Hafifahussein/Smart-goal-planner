import React, { useState, useEffect } from 'react'
import Header from './components/Header'
import GoalList from './components/GoalList'
import GoalForm from './components/GoalForm'
import ProgressTracker from './components/ProgressTracker'
import './App.css'

const API_URL = 'http://localhost:3001/goals'

function App() {
  const [goals, setGoals] = useState([])
  const [editingGoal, setEditingGoal] = useState(null)

  // Fetch goals from JSON Server
  useEffect(() => {
    const fetchGoals = async () => {
      try {
        const response = await fetch(API_URL)
        const data = await response.json()
        setGoals(data)
      } catch (error) {
        console.error('Error fetching goals:', error)
      }
    }
    fetchGoals()
  }, [])

  const addGoal = async (goal) => {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...goal,
          id: Date.now().toString(),
          createdAt: new Date().toISOString().split('T')[0],
          savedAmount: 0, // Initialize saved amount to 0
        }),
      })
      const newGoal = await response.json()
      setGoals([...goals, newGoal])
    } catch (error) {
      console.error('Error adding goal:', error)
    }
  }

  const updateGoal = async (updatedGoal) => {
    try {
      await fetch(`${API_URL}/${updatedGoal.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedGoal),
      })
      setGoals(goals.map((goal) => (goal.id === updatedGoal.id ? updatedGoal : goal)))
      setEditingGoal(null)
    } catch (error) {
      console.error('Error updating goal:', error)
    }
  }

  const deleteGoal = async (id) => {
    try {
      await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
      })
      setGoals(goals.filter((goal) => goal.id !== id))
    } catch (error) {
      console.error('Error deleting goal:', error)
    }
  }

  const updateSavedAmount = async (id, amount) => {
    try {
      const goalToUpdate = goals.find((goal) => goal.id === id)
      const updatedGoal = {
        ...goalToUpdate,
        savedAmount: parseFloat(amount),
      }

      await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedGoal),
      })

      setGoals(goals.map((goal) => (goal.id === id ? updatedGoal : goal)))
    } catch (error) {
      console.error('Error updating saved amount:', error)
    }
  }

  return (
    <div className="app">
      <Header />
      <div className="main-content">
        <div className="form-section">
          <GoalForm addGoal={addGoal} updateGoal={updateGoal} editingGoal={editingGoal} />
          <ProgressTracker goals={goals} />
        </div>
        <GoalList
          goals={goals}
          deleteGoal={deleteGoal}
          startEditing={setEditingGoal}
          updateProgress={updateSavedAmount} 
        />
      </div>
    </div>
  )
}

export default App
