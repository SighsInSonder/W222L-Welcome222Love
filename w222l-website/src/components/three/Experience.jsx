import { useFrame } from '@react-three/fiber'
import { Sparkles, OrbitControls } from '@react-three/drei'
import * as THREE from 'three'
import Avatar from './models/Avatar.jsx'
import Ground from './models/Ground.jsx'
import Scene from './models/Scene'
import TarotCard from './models/TarotCard.jsx'

export default function Experience({ 
    websiteState,
    setWebsiteState,
    cameraState, 
    avatarAnimationState,
    avatarDialogueState,
    tarotCardState,
    tarotCardAnimationState
}) {
    useFrame( ( state, delta ) => {
        const camera = state.camera

        camera.position.lerp( cameraState.position, cameraState.interpolationSpeed )

        camera.fov += ( cameraState.fieldOfView - camera.fov ) * cameraState.interpolationSpeed
        camera.updateProjectionMatrix()

        const target = new THREE.Vector3();
        target.lerpVectors( camera.lookAtTarget || new THREE.Vector3(), cameraState.lookAt, cameraState.interpolationSpeed )

        camera.lookAt( target.x, target.y, target.z )

        camera.lookAtTarget = target
    } )

    return <>
        <OrbitControls />

        <fog attach='fog' color='#FFFFFF' near={ 1 } far={ 6 } />

        <ambientLight intensity={ 2 } />
        <directionalLight position={[ 1, 2, 3 ]} intensity={ 2 } />
        <spotLight 
            position={[ 0, 2, 0.5 ]}
            intensity={ 5 }
            angle={ Math.PI / 8 }
            penumbra={ 0.6 }
        />

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

        <Sparkles 
            position={[ 0, 0.5, 0 ]}
            scale={[ 4, 3, 2 ]}
            speed={ 0.1 }
            count={ 350 }
        />
    </>
}