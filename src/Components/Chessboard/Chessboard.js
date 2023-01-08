import { useState } from 'react';

import { Chess } from './chess'; 

import Chessground from '@react-chess/chessground';
import "chessground/assets/chessground.base.css";
import "chessground/assets/chessground.brown.css";
import "chessground/assets/chessground.cburnett.css";
import { toColor, toDests } from '../../Utils/DestUtil/DestUtil';
import { PieceRow } from '../Pieces/PieceRow';

//import {toDests, playOtherSide} from '../Utils/DestUtil/DestUtil';

const Chessboard = () => {
	const [fen, setFen] = useState("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1");
	//const [pendingMove, setPendingMove] = useState()
	//const [selectVisible, setSelectVisible] = useState(false)
	//const [lastMove, setLastMove] = useState()

	const chess = new Chess();

	const [config, setConfig] = useState({
		movable: {
			color: "white",
			free: false,
			dests: toDests(chess),
			events: {
				after: (orig, dest, metadata) => {
					chess.move({from: orig, to: dest});
					setFen(chess.fen())
					setConfig({...config, cgfen: fen, movable: {...config.movable, color: toColor(chess), dests: toDests(chess)}});
				}
			}
		},
		coordinates: true, 
		autoCastle: true,
		draggable: {
			showGhost: true
		},
		cgfen: fen,
	})

	const addPiece = (color, piece, square) => {
		console.log(chess.put({type: piece, color: color}, square, true));
		console.log(chess.fen())
		setConfig({...config, cgfen: chess.fen()});
	}

	return (
		<div className='w-screen h-screen flex justify-center items-center gap-x-8'>
			<Chessground width={480} height={480} config={config}/>
			<div className='h-[480px] flex flex-col justify-between py-[60px]'>
				<PieceRow color={"b"}/>
				<PieceRow color={"w"}/>
			</div>
			<button onClick={() => addPiece('w', 'p', 'h4')}>add piece to h4</button>
		</div>
	)

}

export default Chessboard;