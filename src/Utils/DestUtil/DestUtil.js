const rows = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
const cols = ['1', '2', '3', '4', '5', '6', '7', '8'];
const SQUARES = rows.flatMap(row => cols.map(col => row+col));

const toDests = (chess) => {
	const dests = new Map();
	SQUARES.forEach(s => {
	const ms = chess.moves({square: s, verbose: true});
	if (ms.length) dests.set(s, ms.map(m => m.to));
	});
	return dests;
}

// Translate colors between chess.js & chessground
const toColor = (chess) => {
	return (chess.turn() === 'w') ? 'white' : 'black';

}

// Update the chess engine and board based on the most recent move
const playOtherSide = (cg, chess, metadata = {}) => {
	return (orig, dest) => {
	// Update chess.js
	// Note: we don't check the return value here which would tell
	// us if this is a legal move.  That's because we only allowed legal moves by setting "dests"
	// on the board.
	chess.move({from: orig, to: dest});
	
	cg.set({
		// I'm not sure what this does! You can comment it out and not much changes
		// turnColor: toColor(chess),
		
		// this highlights the checked king in red
		check:chess.in_check(),
		
		movable: {
		// Only allow moves by whoevers turn it is
		color: this.toColor(chess),
		
		// Only allow legal moves
		dests: this.toDests(chess)
		}
	});
	};
}

export {toDests, toColor, playOtherSide};