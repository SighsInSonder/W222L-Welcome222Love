import { useMemo } from 'react'
import Icon from './Icon'

export default function DesktopNavigationWheel({ btnList, toggleToContentCard }) {
    const angleIncrement = useMemo( () => {
        return 360 / btnList.length
    }, [] )

    return <div 
        className="w-full fixed h-screen flex items-center justify-center"
    >
        
        <div 
            className="w-max flex items-center justify-center relative animate-spin-slow hover:pause group"
        >
            {
                btnList.map( ( item, index ) => {
                    const angleInRadians = ( index * angleIncrement * Math.PI ) / 180
                    const radius = 'calc( 17vw - 1rem )'
                    const x = `calc( ${ radius } * ${ Math.cos( angleInRadians ) } )`
                    const y = `calc( ${ radius } * ${ Math.sin( angleInRadians ) } )`

                    return <Icon 
                        key={ index } 
                        { ...item } 
                        x={ x }
                        y={ y }
                        toggleToContentCard={ toggleToContentCard }
                    />
                })
            }
        </div>

    </div>
}