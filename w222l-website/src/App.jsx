import { useEffect, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import * as THREE from 'three'
import ContentCard from './components/content-cards/ContentCard.jsx'
import Experience from './components/three/Experience.jsx'
import LoadingScreen from './components/loading-screen/LoadingScreen.jsx'

export default function App() {
    const [ isWebsiteLoading, setIsWebsiteLoading ] = useState( true )
    const [ websiteState, setWebsiteState ] = useState( 'intro' )

    const [ userActionNeeded, setUserActionNeeded ] = useState( null )

    const [ currentCameraPosition, setCurrentCameraPosition ] = useState( new THREE.Vector3( 0, 0.6, 10 ) )

    const [ avatarAnimationState, setAvatarAnimationState ] = useState( null )
    const [ avatarDialogueState, setAvatarDialogueState ] = useState( '' )

    const [ tarotCardState, setTarotCardState ] = useState( null )
    const [ tarotCardAnimationState, setTarotCardAnimationState ] = useState( null )

    const [ showContentCard, setShowContentCard ] = useState( false )
    const [ contentCardState, setContentCardState ] = useState({

    })

    const handleScreenClick = () => {
        if ( userActionNeeded === 'click' ) {
            setUserActionNeeded( null )
        }
    }

    const handleIntroContentCard = () => {
        setTarotCardAnimationState( 'intro' )

        setTimeout(() => {
            setShowContentCard( true )
        }, 750)
    }

    const handleIntro = () => {
        setCurrentCameraPosition( new THREE.Vector3( 0, 0.6, 1.2 ) )

        setTimeout(() => {
            setAvatarDialogueState( 'intro' )
        }, 1500)
    }

    const handleLoadingScreenCleanup = () => {
        setIsWebsiteLoading( false )
        console.log( '[+] LOADING SCREEN:: complete n unmounted' )

        handleIntro()
    }

    useEffect( () => {
        if ( websiteState ) {
            switch ( websiteState ) {
                case 'intro-draw-card':
                    handleIntroContentCard()
                    break;
            
                default:
                    break;
            }
        }
    }, [ websiteState ] )

    return <div className='fixed top-0 left-0 w-full h-full m-0 p-0 uppercase overflow-hidden'>

        { isWebsiteLoading && <LoadingScreen handleLoadingScreenCleanup={ handleLoadingScreenCleanup } /> }

        <ContentCard 
            showContentCard={ showContentCard }
        />
        
        <div className='fixed top-0 left-0 w-full h-full z-30'>
            <Canvas
                camera={{
                    position: currentCameraPosition,
                    near: 0.1,
                    far: 5
                }}
                onClick={ handleScreenClick }
            >
                <Experience 
                    websiteState={ websiteState }
                    setWebsiteState={ setWebsiteState }
                    currentCameraPosition={ currentCameraPosition }
                    avatarAnimationState={ avatarAnimationState } 
                    avatarDialogueState={ avatarDialogueState }
                    tarotCardState={ tarotCardState }
                    tarotCardAnimationState={ tarotCardAnimationState }
                />
            </Canvas>
        </div>

    </div>
}