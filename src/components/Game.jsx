import React, { useState } from 'react'
import '../App.css'
import Board from './Board'

export default function Game() {
  return (
    <div className="game">
		<div className="game-board">
			<Board />
		</div>
		<div className="game-info">
			<div>{/* status */}</div>
			<ol>{/* moves */}</ol>
		</div>
	</div>
  )
}
