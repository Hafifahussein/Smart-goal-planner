import React, { useState, useEffect } from 'react'

const GoalItem = ({ goal, deleteGoal, startEditing, updateProgress }) => {
  const safeTargetAmount = Number(goal?.targetAmount) || 0
  const initialSavedAmount = Number(goal?.savedAmount) || 0

  const [inputValue, setInputValue] = useState(initialSavedAmount)

  // Sync with props
  useEffect(() => {
    setInputValue(initialSavedAmount)
  }, [initialSavedAmount])

  const handleAmountChange = async (e) => {
    const value = parseFloat(e.target.value) || 0
    const clampedValue = Math.min(safeTargetAmount, Math.max(0, value))

    setInputValue(clampedValue)
    await updateProgress(goal.id, clampedValue)
  }

  const progressPercentage =
    safeTargetAmount > 0 ? Math.min(100, (initialSavedAmount / safeTargetAmount) * 100) : 0

  return (
    <div className="goal-item">
      <div className="goal-header">
        <h3>{goal?.name || 'Unnamed Goal'}</h3>
        <div className="goal-meta">
          <span className="category">{goal?.category || 'Uncategorized'}</span>
          <span className="deadline">Due: {goal?.deadline || 'No deadline'}</span>
        </div>
        <div className="goal-actions">
          <button onClick={() => startEditing(goal)}>Edit</button>
          <button onClick={() => deleteGoal(goal.id)}>Delete</button>
        </div>
      </div>

      <div className="goal-progress">
        <div className="amounts">
          <span>Saved: ${initialSavedAmount.toFixed(2)}</span>
          <span>Target: ${safeTargetAmount.toFixed(2)}</span>
        </div>
        <input
          type="number"
          value={inputValue}
          onChange={handleAmountChange}
          min="0"
          max={safeTargetAmount}
          step="0.01"
        />
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${progressPercentage}%` }}></div>
        </div>
        <div className="progress-text">{progressPercentage.toFixed(1)}% Complete</div>
      </div>
    </div>
  )
}

export default GoalItem
