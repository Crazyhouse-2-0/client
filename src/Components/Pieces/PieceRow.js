import { Piece } from "./Piece";

export const PieceRow = ({color, withKing}) => {
	const pieces = withKing ? ["p", "b", "n", "r", "q", "k"] : ["p", "b", "n", "r", "q"];

	return(
		<div className="flex bg-slate-300">
			{pieces.map((p) => {
				return <Piece color={color} piece={p} key={p} />
			})}
		</div>
	)
}