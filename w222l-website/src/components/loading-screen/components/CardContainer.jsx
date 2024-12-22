import gsap from 'gsap'
import { useEffect, useRef } from 'react'
import CardBack from './CardBack.jsx'
import CardMoon from './CardMoon.jsx'
import CardStar from './CardStar'
import CardSun from './CardSun'

export default function CardContainer({ handleCardFlipCompletion }) {
    const cardContainer = useRef( null )
    const sunCardRef = useRef( null )
    const moonCardRef = useRef( null )
    const starCardRef = useRef( null )

    useEffect( () => {
        const cards = [ sunCardRef.current, moonCardRef.current, starCardRef.current ]
        cards.forEach( ( card ) => {
            gsap.set( card, {
                rotateY: 0,
                transformStyle: 'preserve-3d',
                backfaceVisibility: 'hidden'
            })
        } )

        const flipCard = () => {
            const tl = gsap.timeline({
                onComplete: () => {
                    setTimeout(() => {
                        handleCardFlipCompletion()
                    }, 150);
                }
            })
    
            tl.to( cardContainer.current, {
                scale: 1,
                duration: 1,
                ease: "elastic.out(1, 0.5)",
                delay: 0.75
            }).to( sunCardRef.current, {
                duration: 0.25,
                rotateY: "+=180", 
                ease: "power1.inOut",
                stagger: 0.5
            }).to( moonCardRef.current, {
                duration: 0.25,
                rotateY: "+=180", 
                ease: "power1.inOut",
                stagger: 0.5
            }).to( starCardRef.current, {
                duration: 0.25,
                rotateY: "+=180", 
                ease: "power1.inOut"
            })
        }
        requestAnimationFrame( flipCard )
    }, [] )

    return <div 
        ref={ cardContainer }
        className='flex flex-row gap-3 justify-between items-center scale-0' 
    >

        {/* CARD:: SUN */}
        <div
            ref={ sunCardRef }
            className='relative w-[57px] h-[84px] bg-white rounded-[10px]'
            style={{ perspective: '1000px' }}
        >
            <div
                className='w-full h-full'
                style={{ transformStyle: 'preserve-3d' }}
            >
                <CardBack />

                <CardSun />
            </div>
        </div>
        

        {/* CARD:: MOON */}
        <div
            ref={ moonCardRef }
            className='relative w-[57px] h-[84px] bg-white rounded-[10px]'
            style={{ perspective: '1000px' }}
        >
            <div
                className='w-full h-full'
                style={{ transformStyle: 'preserve-3d' }}
            >
                <CardBack />

                <CardMoon />
            </div>
        </div>


        {/* CARD:: STAR */}
        <div
            ref={ starCardRef }
            className='relative w-[57px] h-[84px] bg-white rounded-[10px]'
            style={{ perspective: '1000px' }}
        >
            <div
                className='w-full h-full'
                style={{ transformStyle: 'preserve-3d' }}
            >
                <CardBack />

                <CardStar />
            </div>
        </div>

    </div>
}