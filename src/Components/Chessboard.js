import { useState } from 'react';

import { Chess } from 'chess.js'; 

import Chessground from '@react-chess/chessground';
import "chessground/assets/chessground.base.css";
import "chessground/assets/chessground.brown.css";
import "chessground/assets/chessground.cburnett.css";
import { toColor, toDests } from '../Utils/DestUtil/DestUtil';

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

	return (
	<Chessground width={500} height={500} config={config}/>
	)

}

export default Chessboard;