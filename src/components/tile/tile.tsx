import './tile.css';

interface TileProps {
    number: number;
    image?: string;
}

export default function Tile({ number, image }: TileProps) {
    
    if (number % 2 === 0) {
        return <div className='black_tile tile'>
            {image && <div style={{backgroundImage: `url(${image})`}} className='chess_piece'></div>}
        </div>;
    } else {
        return <div className='white_tile tile'>
            {image && <div style={{backgroundImage: `url(${image})`}} className='chess_piece'></div>}
        </div>;
    }
}
