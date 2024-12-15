import { useState } from 'react'
import { Canvas } from '@react-three/fiber'
import Experience from './components/three/Experience.jsx'
import LoadingScreen from './components/loading-screen/LoadingScreen.jsx'

export default function App() {
    const [ isWebsiteLoading, setIsWebsiteLoading ] = useState( true )

    const handleIntroTransition = () => {
        setIsWebsiteLoading( false )
        console.log( '[+] LOADING SCREEN:: complete n unmounted' )
    }

    return <div className='fixed top-0 left-0 w-full h-full m-0 p-0 uppercase overflow-hidden'>

        { isWebsiteLoading && <LoadingScreen handleIntroTransition={ handleIntroTransition } /> }
        
        <div className='fixed top-0 left-0 w-full h-full z-30'>
            <Canvas>
                <Experience />
            </Canvas>
        </div>

    </div>
}