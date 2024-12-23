import gsap from 'gsap'
import { useEffect, useRef, useState } from 'react'
import CardBack from './CardBack'
import CardFront from './CardFront'

export default function ContentCard({ 
    websiteState, 
    setWebsiteState,
    showContentCard,
    contentCardInfo,
    currentContentCardLabel,
    handleContentCardToNavigation
}) {
    const [ currentContentCardInformation, setCurrentContentCardInformation ] = useState( null )
    const [ isFlipping, setIsFlipping ] = useState( false )

    const contentCardContainerRef = useRef( null )
    const contentCardRef = useRef( null )
    const returnTextRef = useRef( null )

    const handleContentCardClick = () => {
        if ( !isFlipping ) {
            setIsFlipping( true )

            const tl = gsap.timeline({
                onComplete: () => {
                    setIsFlipping( false )
                }
            })

            tl.to( contentCardRef.current, {
                rotateY: '+=180',
                duration: 0.5,
                ease: "power1.inOut"
            })
        }
        
    }

    const handleHidingContentCard = () => {
        if ( websiteState ) {
            switch ( websiteState ) {
                case 'intro-draw-card':
                    setWebsiteState( 'navigation-menu' )
                    break;
            
                default:
                    break;
            }
        }
    }

    useEffect( () => {
        if ( showContentCard ) {
            const showAnimation = () => {
                gsap.fromTo( contentCardContainerRef.current, {
                    y: '100%', 
                    scale: 0,
                    opacity: 0,
                },
                {
                    y: 0,
                    scale: 1,
                    opacity: 1,
                    duration: 1.2, 
                    ease: "elastic.out(1, 0.75)"
                })
            }
            requestAnimationFrame( showAnimation )
        } else {
            const hideAnimation = () => {
                const tl = gsap.timeline({
                    onComplete: () => {
                        handleHidingContentCard()
                    }
                })
    
                tl.to( contentCardContainerRef.current, {
                    y: '100%',
                    scale: 0,
                    opacity: 0,
                    duration: 1,
                    ease: "elastic.out(1, 0.75)"
                }).to( returnTextRef.current, {
                    scale: 0,
                    opacity: 0,
                    duration: 0.5
                })
            }
            requestAnimationFrame( hideAnimation )
        }
    }, [ showContentCard ] )

    return <div
        ref={ contentCardContainerRef }
        className='fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[320px] h-[550px] scale-0 opacity-0 z-40'
        style={{ perspective: '1000px' }}
    >

        <div 
            ref={ contentCardRef }
            className='relative w-full h-full hover:cursor-pointer'
            style={{ transformStyle: 'preserve-3d' }}
            onClick={ handleContentCardClick }
        >
            <div 
                className='absolute w-full h-full bg-white/80 rounded-[20px] shadow-lg border border-pinkPalette-1/80 overflow-hidden'
                style={{ backfaceVisibility: 'hidden', transform: 'rotateY(0deg)' }}
            >
                
                <CardFront />
                
            </div>

            <div 
                className='absolute w-full h-full bg-white/80 rounded-[20px] shadow-lg border border-pinkPalette-1/80 overflow-hidden'
                style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
            >
                
                <CardBack  />
                
            </div>
        </div>

        {
            currentContentCardLabel !== 'intro' 
            && 
            <div className='flex items-center justify-center fixed bottom-0 left-0 w-full h-[20%] text-xs scale-0 opacity-0 hover:cursor-pointer'>
                <div ref={ returnTextRef } className='opacity-0 cursor-pointer' onClick={ handleContentCardToNavigation }>
                    go back
                </div>
            </div>
        }
        
    </div> 
}