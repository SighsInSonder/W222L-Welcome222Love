import gsap from 'gsap'
import { useEffect, useRef, useState } from 'react'
import CardContainer from './components/CardContainer'

export default function LoadingScreen({ handleLoadingScreenCleanup }) {
    const [ title, setTitle ] = useState( '' )

    const loadingScreenRef = useRef( null )
    const loadingScreenCardContainerRef = useRef( null )
    const loadingScreenTitleRef = useRef( null )

    const handleCardFlipCompletion = () => {
        const tl = gsap.timeline({
            onComplete: () => {
                handleLoadingScreenCleanup()
            }
        })

        tl.to( loadingScreenCardContainerRef.current, {
            scale: 0,
            duration: 0.5,
            ease: "bounce.in"
        }).to( loadingScreenTitleRef.current, {
            scale: 1,
            duration: 1,
            ease: "elastic.out(1, 0.5)"
        }).to( loadingScreenRef.current, {
            opacity: 0,
            duration: 0.75,
            ease: "elastic.out(1, 0.75)"
        })
    }

    useEffect( () => {
        setTitle( 'welcome 222 love' )
    }, [] )

    return <div ref={ loadingScreenRef } className='relative w-full h-full bg-slate-100 opacity-100 z-50'>

        <div 
            ref={ loadingScreenCardContainerRef }
            className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'
        >
            <CardContainer handleCardFlipCompletion={ handleCardFlipCompletion } />
        </div>

        <div 
            ref={ loadingScreenTitleRef } 
            className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 scale-0 font-lily font-bold text-4xl  text-pinkPalette-2 cursor-default'
        >
            { title }
        </div>

    </div>
}