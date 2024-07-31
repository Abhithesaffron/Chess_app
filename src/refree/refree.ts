import {piece, PieceType,TeamType } from "../constants/constants";

export default class Refree{
    tileisOccupied(x:number, y:number, board:piece[]): boolean{
        // console.log(board);
        const piece= board.find(p => p.x===x && p.y===y );
        
        if(piece) return true;
        else return false;
        // return false;
    }
    tileisOccupiedbyOpponent(x:number, y:number , board:piece[], team:TeamType){
        const piece= board.find(p => p.x===x && p.y===y && p.team!==team);
        // console.log("checking", piece);
        if(piece) return true;
        else return false;
    }
    isEnPassant(px:number, py:number , x:number, y:number , type: PieceType, team: TeamType,board:piece[]){
        const rowNumber= team===TeamType.OURS? 1:-1;
        if(((px-x===1 || px-x===-1)&& y-py===rowNumber) && !this.tileisOccupied(x,y,board)){
            const piece= board.find(p => p.x===x && p.y===y-rowNumber&& p.team!==team && p.type===PieceType.PAWN && p.enpassant===true);
            
            if(piece) return true;
            else return false;
        }
    }
    isValidMove(px:number, py:number , x:number, y:number , type: PieceType, team: TeamType,board:piece[]){
        const rowNumber= team===TeamType.OURS? 1:-1
        const start= team===TeamType.OURS? 1:6;
        
        if(type===PieceType.PAWN ){
                const piece= board.find(p => p.x===px && p.y===py);
                
                if(py===start && y-py===2*rowNumber && px===x){
                     if(!this.tileisOccupied(x,y,board) && !this.tileisOccupied(x,y-rowNumber,board)){
                       
                        // console.log("checking", piece);
                        if(piece) piece.enpassant=true;
                        else return false;
                        return true;
                     }
                      
                }
                else if(px===x && y-py===rowNumber) {
                    if(!this.tileisOccupied(x,y,board)){
                        if(piece) piece.enpassant=false;
                        return true;
                    }
                      
                }
                else if(this.isEnPassant(px,py,x,y,type,team,board)) return true;
                else if((px-x===1 || px-x===-1)&& y-py===rowNumber){
                    if(this.tileisOccupiedbyOpponent(x,y,board,team))
                     return true;
                }
                
                else return false;
           
        }
        else if(type===PieceType.KNIGHT ){
            const xdist=Math.abs(px-x);
            const ydist=Math.abs(py-y);
            if(Math.abs(xdist-ydist)===1 && xdist+ydist===3 &&(this.tileisOccupiedbyOpponent(x,y,board,team ) || !this.tileisOccupied(x,y,board)))
                return true;
        }
        else if(type===PieceType.BISHOP ){
            const xdist=Math.abs(px-x);
            const ydist=Math.abs(py-y);
            const xdir= x>px?1:-1;
            const ydir= y>py?1:-1;
            if(xdist===ydist && (this.tileisOccupiedbyOpponent(x,y,board,team ) || !this.tileisOccupied(x,y,board)) ){
                for(let i=px+xdir,j=py+ydir ; Math.abs(px-i)<xdist && Math.abs(py-j)<ydist ; i+=xdir,j+=ydir){
                    console.log(i,j);
                    if(this.tileisOccupied(i,j,board))
                        return false;
                }
                return true;
            }
        }
        else if(type===PieceType.ROOK ){
            const xdist=Math.abs(px-x);
            const ydist=Math.abs(py-y);
            const xdir= x>px?1:-1;
            const ydir= y>py?1:-1;
            const dir= xdist>0?xdir:ydir;
            if((xdist>0 ||ydist>0)&&(xdist===0 ||ydist===0) && (this.tileisOccupiedbyOpponent(x,y,board,team ) || !this.tileisOccupied(x,y,board)) ){
                if(px===x){
                    for(let j=py+dir ;Math.abs(py-j)<ydist ;j+=dir){
                        console.log(x,j);
                        if(this.tileisOccupied(x,j,board))
                            return false;
                    }
                }
                if(py===y){
                    for(let i=px+dir; Math.abs(px-i)<xdist; i+=dir){
                        console.log(i,y);
                        if(this.tileisOccupied(i,y,board))
                            return false;
                    }
                }
                return true;
            }
        }
        else if(type===PieceType.QWEEN ){
            const xdist=Math.abs(px-x);
            const ydist=Math.abs(py-y);
            const xdir= x>px?1:-1;
            const ydir= y>py?1:-1;
            const dir= xdist>0?xdir:ydir;
            if(this.tileisOccupiedbyOpponent(x,y,board,team ) || !this.tileisOccupied(x,y,board)){
                if(xdist===ydist){
                    for(let i=px+xdir,j=py+ydir ; Math.abs(px-i)<xdist && Math.abs(py-j)<ydist ; i+=xdir,j+=ydir){
                        console.log(i,j);
                        if(this.tileisOccupied(i,j,board))
                            return false;
                    }
                    return true;
                }
                else if((xdist>0 ||ydist>0)&&(xdist===0 ||ydist===0)){
                    if(px===x){
                        for(let j=py+dir ;Math.abs(py-j)<ydist ;j+=dir){
                            console.log(x,j);
                            if(this.tileisOccupied(x,j,board))
                                return false;
                        }
                    }
                    if(py===y){
                        for(let i=px+dir; Math.abs(px-i)<xdist; i+=dir){
                            console.log(i,y);
                            if(this.tileisOccupied(i,y,board))
                                return false;
                        }
                    }
                    return true;
                }
            }
            
        }
        else if(type===PieceType.KING ){
            const xdist=Math.abs(px-x);
            const ydist=Math.abs(py-y);
            if(((xdist===ydist && xdist===1) || (xdist===0 && ydist===1) || (xdist===1 && ydist===0))&& (this.tileisOccupiedbyOpponent(x,y,board,team ) || !this.tileisOccupied(x,y,board))){
                return true;
            }
        }
        else return false;
    }

}