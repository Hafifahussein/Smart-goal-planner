import React from 'react'
import GoalItem from './GoalItem'

const GoalList = ({ goals, deleteGoal, startEditing, updateProgress }) => {
  if (goals.length === 0) {
    return <div className="no-goals">No goals yet. Add your first SMART goal!</div>
  }

  return (
    <div className="goal-list">
      <h2>Your SMART Goals</h2>
      {goals.map((goal) => (
        <GoalItem
          key={goal.id}
          goal={goal}
          deleteGoal={deleteGoal}
          startEditing={startEditing}
          updateProgress={updateProgress}
        />
      ))}
    </div>
  )
}

export default GoalList
