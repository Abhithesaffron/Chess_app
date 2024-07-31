export const horizontalAxis = ["a", "b", "c", "d", "e", "f", "g", "h"];
export const verticalAxis = ["1", "2", "3", "4", "5", "6", "7", "8"];

export enum PieceType {
    PAWN,
    ROOK,
    BISHOP,
    KNIGHT,
    KING,
    QWEEN
}
export enum TeamType {
    OPPONENT,
    OURS
}
export interface piece {
    image: string;
    x: number;
    y: number;
    type: PieceType;
    team: TeamType;
    enpassant: boolean;
}
export const initialBoardState: piece[] = [];
for (let i = 0; i < 8; i++) {

    initialBoardState.push({ image: "assets/pieces/Chess_pdt60.png", x: i, y: 1, type: PieceType.PAWN, team: TeamType.OURS ,enpassant:false});
    initialBoardState.push({ image: "assets/pieces/Chess_plt60.png", x: i, y: 6, type: PieceType.PAWN, team: TeamType.OPPONENT ,enpassant:false});

}
for (let j = 0; j < 2; j++) {
    const team = j === 0 ? TeamType.OURS : TeamType.OPPONENT;
    const y = team === TeamType.OURS ? 0 : 7;
    const color = team === TeamType.OURS ? "d" : "l";

    initialBoardState.push({ image: `assets/pieces/Chess_r${color}t60.png`, x: 0, y, type: PieceType.ROOK, team ,enpassant:false});
    initialBoardState.push({ image: `assets/pieces/Chess_r${color}t60.png`, x: 7, y, type: PieceType.ROOK, team ,enpassant:false});
    initialBoardState.push({ image: `assets/pieces/Chess_n${color}t60.png`, x: 1, y, type: PieceType.KNIGHT, team ,enpassant:false});
    initialBoardState.push({ image: `assets/pieces/Chess_n${color}t60.png`, x: 6, y, type: PieceType.KNIGHT, team,enpassant:false });
    initialBoardState.push({ image: `assets/pieces/Chess_b${color}t60.png`, x: 2, y, type: PieceType.BISHOP, team ,enpassant:false});
    initialBoardState.push({ image: `assets/pieces/Chess_b${color}t60.png`, x: 5, y, type: PieceType.BISHOP, team ,enpassant:false});
    initialBoardState.push({ image: `assets/pieces/Chess_k${color}t60.png`, x: 3, y, type: PieceType.KING, team ,enpassant:false});
    initialBoardState.push({ image: `assets/pieces/Chess_q${color}t60.png`, x: 4, y, type: PieceType.QWEEN, team ,enpassant:false});

}
