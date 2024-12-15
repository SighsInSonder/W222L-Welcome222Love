export default function CardSun() {
    return <div 
        className="absolute w-full h-full bg-[url('./images/loading-screen/card-front-SUN.svg')] rounded-[10px] shadow-md"
        style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
    ></div>
}