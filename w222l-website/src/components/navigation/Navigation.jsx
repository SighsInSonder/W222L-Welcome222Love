import gsap from 'gsap'
import { useEffect, useMemo, useRef } from 'react'
import DesktopNavigationWheel from './components/DesktopNavigationWheel'
import NavBtnListArray from '../../assets/data/navigationMenu'

export default function Navigation({ showNavigationMenu, toggleToContentCard }) {
    const navigationContainer = useRef( null )

    const btnListArray = useMemo( () => {
        return NavBtnListArray
    }, [] )

    useEffect( () => {
        if ( showNavigationMenu ) {
            gsap.to( navigationContainer.current, {
                scale: 1,
                duration: 1.5,
                ease: 'elastic.out( 1, 0.3 )'
            })
        } else {
            const tl = gsap.timeline({
                onComplete: () => {
                    console.log( 'nav gone...' )
                }
            })

            tl.to( navigationContainer.current, {
                scale: 0,
                duration: 0.25,
                ease: "bounce.in"
            })
        }
    }, [ showNavigationMenu ] )

    return <div 
        ref={ navigationContainer }
        className='fixed inset-0 top-0 left-0 w-full h-[75%] flex items-center justify-center scale-0 z-50'
    >
        <DesktopNavigationWheel btnList={ btnListArray } toggleToContentCard={ toggleToContentCard } />
    </div>
}