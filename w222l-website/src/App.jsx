import { useEffect, useMemo, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import * as THREE from 'three'
import ContentCard from './components/content-cards/ContentCard.jsx'
import Experience from './components/three/Experience.jsx'
import LoadingScreen from './components/loading-screen/LoadingScreen.jsx'
import Navigation from './components/navigation/Navigation.jsx'
import { contentCardData } from './assets/data/contentCards.js'

export default function App() {
    const [ isWebsiteLoading, setIsWebsiteLoading ] = useState( true )
    const [ websiteState, setWebsiteState ] = useState( 'intro' )

    const [ userActionNeeded, setUserActionNeeded ] = useState( null )

    const [ cameraState, setCameraState ] = useState({
        position: new THREE.Vector3( 0, 0.6, 10 ),
        fieldOfView: 75,
        lookAt: new THREE.Vector3( 0, 0.4, 0 ),
        interpolationSpeed: 0.1
    })

    const [ avatarAnimationState, setAvatarAnimationState ] = useState( null )
    const [ avatarDialogueState, setAvatarDialogueState ] = useState( '' )

    const [ tarotCardState, setTarotCardState ] = useState( null )
    const [ tarotCardAnimationState, setTarotCardAnimationState ] = useState( null )

    const [ showNavigationMenu, setShowNavigationMenu ] = useState( false )
    const [ showContentCard, setShowContentCard ] = useState( false )
    const [ currentContentCardLabel, setCurrentContentCardLabel ] = useState( null )

    const contentCardInfo = useMemo( () => {
        return contentCardData
    }, [] )

    const handleScreenClick = () => {
        if ( userActionNeeded === 'click' ) {
            setUserActionNeeded( null )

            if ( websiteState === 'intro-draw-card' ) {
                setShowContentCard( false )
            } else if ( websiteState === 'content-card' ) {
                handleContentCardToNavigation()
            }
        }
    }

    const handleContentCardToNavigation = () => {
        setShowContentCard( false )

        setTimeout( () => {
            setCameraState( ( prev ) => ({
                ...prev,
                position: new THREE.Vector3( 0, 0.7, 1.2 ),
                fieldOfView: 30,
                lookAt: new THREE.Vector3( 0, 1, 0 )
            }))

            setTimeout( () => {
                setShowNavigationMenu( true )
            }, 1000);
        }, 500);
    } 

    const handleNavigationToContentCard = ( chosenIconLabel ) => {
        setWebsiteState( 'content-card' )
        setCurrentContentCardLabel( chosenIconLabel )
        setShowNavigationMenu( false )

        setTimeout( () => {
            setCameraState( ( prev ) => ({
                ...prev,
                lookAt: new THREE.Vector3( 0, 2, 0 ),
                interpolationSpeed: 0.01
            }))
        
            setTimeout( () => {
                setShowContentCard( true )
                setUserActionNeeded( 'click' )
            }, 1000 )
        }, 500);
    }

    const handleNavigationMenu = () => {
        setShowNavigationMenu( true )
    }

    const handleIntroContentCard = () => {
        setCurrentContentCardLabel( 'intro' )
        setTarotCardAnimationState( 'intro' )

        setTimeout(() => {
            setShowContentCard( true )
            setUserActionNeeded( 'click' )
        }, 750)
    }

    const handleIntro = () => {
        setCameraState( ( prev ) => ({
            ...prev,
            position: new THREE.Vector3( 0, 0.6, 1.2 )
        }))

        setTimeout(() => {
            setAvatarDialogueState( 'intro' )
        }, 1500)
    }

    const handleLoadingScreenCleanup = () => {
        setIsWebsiteLoading( false )
        setCurrentContentCardLabel( 'intro' )

        handleIntro()
    }

    useEffect( () => {
        if ( websiteState ) {
            switch ( websiteState ) {
                case 'intro-draw-card':
                    handleIntroContentCard()
                    break
                case 'navigation-menu':
                    setCameraState( ( prev ) => ({
                        ...prev,
                        position: new THREE.Vector3( 0, 0.7, 1.2 ),
                        fieldOfView: 30,
                        lookAt: new THREE.Vector3( 0, 1, 0 )
                    }))

                    setTimeout( handleNavigationMenu, 1000 )
                    break
            
                default:
                    break
            }
        }
    }, [ websiteState ] )

    return <div className='fixed top-0 left-0 w-full h-full m-0 p-0 uppercase overflow-hidden'>

        { isWebsiteLoading && <LoadingScreen handleLoadingScreenCleanup={ handleLoadingScreenCleanup } /> }

        { websiteState === 'navigation-menu' && <Navigation showNavigationMenu={ showNavigationMenu } toggleToContentCard={ handleNavigationToContentCard } /> }

        <ContentCard 
            websiteState={ websiteState }
            setWebsiteState={ setWebsiteState }
            showContentCard={ showContentCard }
            contentCardInfo={ contentCardInfo }
            currentContentCardLabel={ currentContentCardLabel }
            handleContentCardToNavigation={ handleContentCardToNavigation }
        />
        
        <div className='fixed top-0 left-0 w-full h-full z-30'>
            <Canvas
                camera={{
                    position: cameraState.position,
                    fov: cameraState.fieldOfView,
                    near: 0.1,
                    far: 5
                }}
                onClick={ handleScreenClick }
            >
                <Experience 
                    websiteState={ websiteState }
                    setWebsiteState={ setWebsiteState }
                    cameraState={ cameraState }
                    avatarAnimationState={ avatarAnimationState } 
                    avatarDialogueState={ avatarDialogueState }
                    tarotCardState={ tarotCardState }
                    tarotCardAnimationState={ tarotCardAnimationState }
                />
            </Canvas>
        </div>

    </div>
}