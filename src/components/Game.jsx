import React, { useState } from 'react'
import '../App.css'
import Board from './Board'

export default function Game() {
	const [history, setHisory] = useState([Array(9).fill(null)])
	const [xIsNext, setXIsNext] = useState(true)
	const [stepNo, setStepNo] = useState(0)
	let status

	const calculateWinner = squares => {
		const lines = [
			[0, 1, 2],
			[3, 4, 5],
			[6, 7, 8],
			[0, 3, 6],
			[1, 4, 7],
			[2, 5, 8],
			[0, 4, 8],
			[2, 4, 6],
		]
		for (let i = 0; i < lines.length; i++) {
			const [a, b, c] = lines[i]
			if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c])
				return squares[a]
		}
		return null
	}

	const handleClick = i => {
		const h = history.slice(0, stepNo + 1)
		const current = h[h.length - 1]
		const sqr = [...current]
		if (calculateWinner(sqr) || sqr[i])
			return
		sqr[i] = xIsNext ? 'X' : '0'
		setHisory(h.concat([sqr]))
		setStepNo(h.length)
		setXIsNext(!xIsNext)
	}

	const current = history[stepNo]
	const winner = calculateWinner(current)
	if (winner)
		status = `Winner: ${winner}`
	else
		status = `Next player: ${xIsNext ? 'X' : '0'}`

	const jumpTo = step => {
		setStepNo(step)
		setXIsNext(step % 2 === 0)
	}

	const moves = history.map((step, move) => {
		const desc = move ? `Go to move #${move}` : 'Go to game start'
		return (
			<li key={move}>
				<button onClick={() => jumpTo(move)}>{desc}</button>
			</li>
		)
	})

	return (
		<div className="game">
			<div className="game-board">
				<Board squares={current} onClick={i => handleClick(i)} />
			</div>
			<div className="game-info">
				<div>{status}</div>
				<ol>{moves}</ol>
			</div>
		</div>
	)
}
