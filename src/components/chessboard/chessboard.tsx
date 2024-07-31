import React, { useState, useRef, useEffect } from "react";
import Refree from '../../refree/refree';
import './chessboard.css';
import Tile from "../tile/tile";
import { horizontalAxis, verticalAxis, PieceType, TeamType, piece, initialBoardState } from "../../constants/constants"





export default function Chessboard() {
    const [gridX, setgridX] = useState(0);
    const [gridY, setgridY] = useState(0);
    const [pieces, setPieces] = useState<piece[]>([]);
    const [promotionPawn, setpromotionPawn] = useState<piece | undefined>(undefined)
    const chessboardRef = useRef<HTMLDivElement | null>(null);
    const chessboard = chessboardRef.current;
    const promotionPawnRef = useRef<HTMLDivElement | null>(null);
    const promPawnref = promotionPawnRef.current;
    const [activeElement, setactiveElement] = useState<HTMLElement | null>(null);
    const refree = new Refree();

    useEffect(() => {
        setPieces(initialBoardState);
    }, []);


    function grabPiece(e: React.MouseEvent) {

        const element = e.target as HTMLElement;
        // console.log(element);

        if (element.classList.contains("chess_piece") && chessboard) {

            setgridX(Math.floor((e.clientX - chessboard.offsetLeft) / 70));
            setgridY(Math.floor(Math.abs((e.clientY - chessboard.offsetTop - 560) / 70)));

            const x = e.clientX - 30;
            const y = e.clientY - 30;
            element.style.position = "absolute";
            element.style.left = `${x}px`;
            element.style.top = `${y}px`;
            setactiveElement(element);
        }
    }

    function movePiece(e: React.MouseEvent) {



        // console.log(chessboard);
        if (activeElement && chessboard) {
            // console.log('move');  
            const minX = chessboard.offsetLeft - 15;
            const minY = chessboard.offsetTop - 15;


            const maxX = chessboard.offsetLeft + chessboard.offsetWidth - 45;
            const maxY = chessboard.offsetTop + chessboard.offsetHeight - 50;
            const x = e.clientX - 30;
            const y = e.clientY - 30;

            activeElement.style.position = "absolute";
            if (x < minX) activeElement.style.left = `${minX}px`;
            else if (x > maxX) activeElement.style.left = `${maxX}px`;
            else activeElement.style.left = `${x}px`;

            if (y < minY) activeElement.style.top = `${minY}px`;
            else if (y > maxY) activeElement.style.top = `${maxY}px`;
            else activeElement.style.top = `${y}px`;
        }
        // console.log(activeElement);
    }
    function dropPiece(e: React.MouseEvent) {


        if (activeElement && chessboard) {
            // console.log('drop');
            const x = Math.floor((e.clientX - chessboard.offsetLeft) / 70);
            const y = Math.floor(Math.abs((e.clientY - chessboard.offsetTop - 560) / 70));
            // console.log(x,y);
            const currentPiece = pieces.find(p => p.x === gridX && p.y === gridY);
            // console.log(currentPiece);  

            if (currentPiece) {
                const validMove = refree.isValidMove(gridX, gridY, x, y, currentPiece.type, currentPiece.team, pieces);
                const isenpassant = refree.isEnPassant(gridX, gridY, x, y, currentPiece.type, currentPiece.team, pieces);
                // console.log(isenpassant);
                const rowNumber = currentPiece.team === TeamType.OURS ? 1 : -1;
                if (validMove) {
                    const promotionRow = currentPiece.team === TeamType.OURS ? 7 : 0;
                    const updatedPeices = pieces.reduce((results, piece) => {
                        if (piece.x === gridX && piece.y === gridY) {
                            piece.x = x;
                            piece.y = y;
                            results.push(piece);

                            if (piece.y === promotionRow && piece.type === PieceType.PAWN) {

                                promPawnref?.classList.remove("hidden");
                                setpromotionPawn(piece);
                            }
                        }
                        else if (!(isenpassant && piece.x === x && piece.y === y - rowNumber) && !(piece.x === x && piece.y === y)) {

                            results.push(piece);
                        }
                        return results;
                    }, [] as piece[]);
                    // console.log(updatedPeices);
                    setPieces(updatedPeices);
                }
                else {
                    activeElement.style.position = "relative";
                    activeElement.style.removeProperty("top");
                    activeElement.style.removeProperty("left");
                }

            }

            setactiveElement(null);
        }
    }

    function promotioPawnType() {
        return promotionPawn?.team === TeamType.OURS ? "d" : "l";
    }


    function promotion(pieceType: PieceType) {
        const updatedPeices = pieces.reduce((results, piece) => {
            if (piece.x === promotionPawn?.x && piece.y === promotionPawn?.y) {
                piece.type = pieceType;
                let image = "";
                switch (pieceType) {
                    case PieceType.ROOK:
                        image = "r";
                        break;

                    case PieceType.KNIGHT:
                        image = "n";
                        break;
                    case PieceType.BISHOP:
                        image = "b";
                        break;
                    case PieceType.QWEEN:
                        image = "q";
                        break;
                }
                piece.image = `assets/pieces/Chess_${image}${promotioPawnType()}t60.png`;
            }
            results.push(piece);
            return results;
        }, [] as piece[]);
        setPieces(updatedPeices);
        promPawnref?.classList.add("hidden");
    }
    let board = [];

    for (let j = verticalAxis.length - 1; j >= 0; j--) {
        for (let i = 0; i < horizontalAxis.length; i++) {
            let image = undefined;

            pieces.forEach(p => {

                if (p.x === i && p.y === j) {
                    image = p.image;
                }
            })
            board.push(<Tile key={`${i},${j}`} number={i + j} image={image} />)

        }
    }
    return <>
        <div
            id="promotion_modal_parent"
            className="hidden"
            ref={promotionPawnRef}>
            <div
                className="promotion_modal"
            >
                <img onClick={() => promotion(PieceType.ROOK)} src={`assets/pieces/Chess_r${promotioPawnType()}t60.png`} alt="" />
                <img onClick={() => promotion(PieceType.KNIGHT)} src={`assets/pieces/Chess_n${promotioPawnType()}t60.png`} alt="" />
                <img onClick={() => promotion(PieceType.BISHOP)} src={`assets/pieces/Chess_b${promotioPawnType()}t60.png`} alt="" />
                <img onClick={() => promotion(PieceType.QWEEN)} src={`assets/pieces/Chess_q${promotioPawnType()}t60.png`} alt="" />
            </div>
        </div>
        <div
            onMouseMove={e => movePiece(e)}
            onMouseDown={e => grabPiece(e)}
            onMouseUp={e => dropPiece(e)}
            id='chessboard'
            ref={chessboardRef}>
            {board}
        </div>
    </>

}