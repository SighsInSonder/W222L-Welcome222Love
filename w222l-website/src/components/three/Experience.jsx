import { useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import Avatar from './models/Avatar.jsx'
import Ground from './models/Ground.jsx'
import Scene from './models/Scene'
import TarotCard from './models/TarotCard.jsx'

export default function Experience({ 
    websiteState,
    setWebsiteState,
    currentCameraPosition, 
    avatarAnimationState,
    avatarDialogueState,
    tarotCardState,
    tarotCardAnimationState
}) {

    useFrame( ( state, delta ) => {
        const camera = state.camera

        camera.position.lerp( currentCameraPosition, 0.1 )
        camera.lookAt( 0, 0.4, 0 )
    } )

    return <>
        <OrbitControls />

        <ambientLight intensity={ 2 } />
        <directionalLight position={[ 1, 2, 3 ]} intensity={ 2 } />

        <Avatar 
            websiteState={ websiteState }
            setWebsiteState={ setWebsiteState }
            animationState={ avatarAnimationState }
            dialogueState={ avatarDialogueState }
        />
        <Ground />
        <Scene />
        <TarotCard 
            cardState={ tarotCardState }
            animationState={ tarotCardAnimationState }
        />
    </>
}