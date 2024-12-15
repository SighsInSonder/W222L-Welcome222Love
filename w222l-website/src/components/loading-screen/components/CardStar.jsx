export default function CardStar() {
    return <div 
        className="absolute w-full h-full bg-[url('./images/loading-screen/card-front-STAR.svg')] rounded-[10px] shadow-md"
        style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
    ></div>
}