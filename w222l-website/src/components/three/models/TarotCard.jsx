import gsap from 'gsap'
import React, { useEffect, useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'

export default function TarotCard({ 
  cardState, 
  animationState,
  ...props 
}) {
  const { nodes, materials } = useGLTF( '/models/tarot-card.glb' )

  const tarotCardRef = useRef( null )
  const pulseGlowAnimation = useRef( null )

  useEffect( () => {
    switch ( cardState ) {
      case 'pulse-glow':
        if ( pulseGlowAnimation.current === null ) {
          materials[ 'tarot-card' ].emissive = new THREE.Color( 0xB3B3B3 )

          pulseGlowAnimation.current = gsap.to( materials[ 'tarot-card' ], {
            emissiveIntensity: 5,
            duration: 0.5,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut'
          })
        }
        break
      case 'no-pulse-glow':
        if ( pulseGlowAnimation.current ) {
          pulseGlowAnimation.current.kill()
          pulseGlowAnimation.current = null

          materials[ 'tarot-card' ].emissiveIntensity = 0
        }
        break
    
      default:
        break
    }
  }, [ cardState ] )

  useEffect( () => {
    switch ( animationState ) {
      case 'intro':
        gsap.to( tarotCardRef.current.position, {
          z: tarotCardRef.current.position.z + 1,
          duration: 1,
          ease: 'power1.out'
        })

        tarotCardRef.current.position.z = 0
        break;
    
      default:
        break;
    }
  }, [ animationState ] )

  return (
    <group { ...props } dispose={ null }>
      <group>

        <mesh 
          ref={ tarotCardRef }
          geometry={ nodes.card.geometry } 
          material={ materials[ 'tarot-card' ] } 
          position={[ 0, 0, 0 ]}
        />
        
      </group>
    </group>
  )
}

useGLTF.preload( '/models/tarot-card.glb' )
