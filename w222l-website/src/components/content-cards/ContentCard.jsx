import gsap from 'gsap'
import { useEffect, useRef } from 'react'

export default function ContentCard({ showContentCard }) {

    const contentCardRef = useRef( null )

    useEffect( () => {
        if ( showContentCard ) {
            gsap.to(contentCardRef.current, {
                y: 0, 
                scale: 1, 
                opacity: 1, 
                duration: 1.5,
                ease: 'elastic.out(1, 0.75)'
            })
        }
    }, [ showContentCard ] )

    return <div className={ `fixed top-0 left-0 flex justify-center items-center w-full h-full text-[#313131] 
                            ${ showContentCard ? 'z-40 pointer-events-auto' : 'z-0 pointer-events-none' }` }>

        <div 
            ref={ contentCardRef }
            className='w-[320px] h-[550px] bg-white/10 backdrop-blur-sm rounded-lg shadow-lg border border-white/30 overflow-hidden'
            style={{ transform: 'translateY(100%)', opacity: 0 }}
        >
            
        </div>

    </div>
}