import gsap from 'gsap'
import { useEffect, useRef, useState } from 'react'

export default function ContentCard({ 
    websiteState, 
    setWebsiteState,
    showContentCard 
}) {
    const [ isFlipping, setIsFlipping ] = useState( false )

    const contentCardContainerRef = useRef( null )
    const contentCardRef = useRef( null )

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
        } else {
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
            })
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
            {/* CARD FRONT:: */}
            <div 
                className='absolute w-full h-full bg-white/80 rounded-[20px] shadow-lg border border-pinkPalette-1/80 overflow-hidden'
                style={{ backfaceVisibility: 'hidden', transform: 'rotateY(0deg)' }}
            >
                {/* CARD FRONT:: content */}
                <div className='flex justify-center items-center w-full h-full font-lily font-bold text-2xl text-pinkPalette-2'>

                    <div className='flex flex-col w-[90%] h-[95%] bg-white rounded-[15px] border-4 border-pinkPalette-2 overflow-hidden'>
                        {/* CARD FRONT CONTENT:: top */}
                        <div className='flex-grow basis-[80%]'>
                            <div className='flex justify-center items-center w-full h-full'>
                                <div className='flex justify-center items-center w-[75%] h-[75%]'>
                                    <img src='./images/content-cards/intro/sun.svg' />
                                </div>
                            </div>
                        </div>

                        {/* CARD FRONT CONTENT:: bottom */}
                        <div className='flex-grow basis-[20%] border-t-4 border-pinkPalette-2'>
                            <div className='flex justify-center items-center w-full h-full'>
                                the sun
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            {/* CARD BACK:: */}
            <div 
                className='absolute w-full h-full bg-white/80 rounded-[20px] shadow-lg border border-pinkPalette-1/80 overflow-hidden'
                style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
            >
                {/* CARD BACK:: content */}
                <div className='flex justify-center items-center w-full h-full font-lily text-pinkPalette-2'>
                
                    <div className='flex justify-center items-center w-[90%] h-[95%] bg-white rounded-[15px] border-4 border-pinkPalette-2'>
                        <div className='flex justify-center items-center w-[80%] h-[80%] text-center'>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce posuere a massa non dictum. Cras at elit hendrerit, aliquet diam sed, tempus turpis. Phasellus lobortis efficitur libero, vitae ornare eros aliquam in. Ut justo quam, elementum vel enim elementum, pellentesque finibus massa
                        </div>
                    </div>

                </div>
            </div>
        </div>

    </div> 
}