export default function CardBack() {
    return <div 
        className="absolute w-full h-full bg-[url('./images/loading-screen/card-back.svg')] rounded-[10px] shadow-md"
        style={{ backfaceVisibility: 'hidden', transform: 'rotateY(0deg)' }}
    ></div>
}