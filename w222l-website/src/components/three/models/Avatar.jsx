import gsap from 'gsap'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useGraph } from '@react-three/fiber'
import { Html, useGLTF, useAnimations } from '@react-three/drei'
import * as THREE from 'three'
import { SkeletonUtils } from 'three-stdlib'
import dialogueScript from '../../../data/dialogueScript'

export default function Model({ 
  websiteState,
  setWebsiteState,
  animationState, 
  dialogueState,
  ...props 
}) {
  const group = React.useRef()
  const { scene, animations } = useGLTF( '/models/avatar-transformed.glb' )
  const clone = React.useMemo( () => SkeletonUtils.clone( scene ), [ scene ] )
  const { nodes, materials } = useGraph( clone )
  const { actions } = useAnimations( animations, group )

  const [ isWaitingForUserClick, setIsWaitingForUserClick ] = useState( false )
  const [ isSpeaking, setIsSpeaking ] = useState( false )
  const [ currentDialogueDisplayText, setCurrentDialogueDisplayText ] = useState( '' )

  const dialogueContainerRef = useRef( null )
  const dialogueSectionRef = useRef( null )
  const dialogueSectionScriptLineRef = useRef( 0 )

  const scriptData = useMemo( () => {
    return dialogueScript
  }, [] )

  const playAvatarAction = ( action ) => {
    if ( actions[ action ] ) {
      actions[ action ].reset().fadeIn( 0.5 ).setLoop( THREE.LoopOnce ).play().clampWhenFinished = true
    }
  }

  const displayScriptChar = ( newChar ) => {
    setCurrentDialogueDisplayText( ( prev ) => prev + newChar )
  }

  const parseDialogueLine = ( text, action, onComplete ) => {
    setCurrentDialogueDisplayText( '' )
    let index = 0

    if ( action ) {
      playAvatarAction( action )
    }

    const parseNextChar = () => {
      if ( index >= text.length ) {
        dialogueSectionScriptLineRef.current += 1

        if ( onComplete ) {
          onComplete()
        }

        return
      }

      const char = text[ index ]
      if ( char === '|' ) {
        let delayMarker = ''
        index++

        while ( index < text.length && /\d/.test( text[ index ] )) {
          delayMarker += text[ index ]
          index++
        }

        const parsedDelayMarker = parseInt( delayMarker, 10 ) || 500

        setTimeout( parseNextChar, parsedDelayMarker )
      } else {
        displayScriptChar( char )
        index++

        setTimeout( parseNextChar, Math.floor( Math.random() * 60 ) + 12 )
      }
    }
    parseNextChar()
  }

  const onParseComplete = () => {
    setIsSpeaking( false )

    if ( dialogueSectionScriptLineRef.current < scriptData[ dialogueSectionRef.current ].length ) {
      setIsWaitingForUserClick( true )

      const handleClick = () => {
        document.removeEventListener( 'click', handleClick )

        setIsWaitingForUserClick( false )
        speak()
      }
      document.addEventListener( 'click', handleClick )
    } else {
      if ( websiteState === 'intro' ) {
        setIsWaitingForUserClick( true )

        const handleClick = () => {
          document.removeEventListener( 'click', handleClick )

          setIsWaitingForUserClick( false )
          
          const tl = gsap.timeline({
              onComplete: () => {
                setWebsiteState( 'intro-draw-card' )
              }
          })

          tl.to( dialogueContainerRef.current, {
            scale: 0,
            duration: 0.5,
            ease: "bounce.in"
          }).call( () => {
            setCurrentDialogueDisplayText( '' )
          }).to( dialogueContainerRef.current, {
            scale: 1,
            duration: 0.1
          })
        }
        document.addEventListener( 'click', handleClick )
      } else {
        setIsWaitingForUserClick( true )
        dialogueSectionScriptLineRef.current = 0

        const handleClick = () => {
          document.removeEventListener( 'click', handleClick )

          setIsWaitingForUserClick( false )
        }
        document.addEventListener( 'click', handleClick )
      }
    }
  }

  const speak = () => {
    if ( !isSpeaking ) {
      setIsSpeaking( true )

      const lineIndex = dialogueSectionScriptLineRef.current
      const currentLineObject = scriptData[ dialogueSectionRef.current ]?.[ lineIndex ]

      if ( currentLineObject ) {
        parseDialogueLine( currentLineObject.text, currentLineObject.action, onParseComplete )
      }
    }
  }

  useEffect( () => {
    if ( actions[ animationState ] ) {
      
    }
  }, [ animationState ] )

  useEffect( () => {
    if ( dialogueState ) {
      dialogueSectionRef.current = dialogueState

      if ( dialogueSectionRef.current ) {
        speak()
      }
    }
  }, [ dialogueState ] )

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <group name="rig">
          <primitive object={nodes['DEF-spine']} />
          <primitive object={nodes['DEF-pelvisL']} />
          <primitive object={nodes['DEF-pelvisR']} />
          <primitive object={nodes['DEF-thighL']} />
          <primitive object={nodes['DEF-thighR']} />
          <primitive object={nodes['DEF-earL']} />
          <primitive object={nodes['DEF-earL001']} />
          <primitive object={nodes['DEF-earL002']} />
          <primitive object={nodes['DEF-earL004']} />
          <primitive object={nodes['DEF-earR']} />
          <primitive object={nodes['DEF-earR001']} />
          <primitive object={nodes['DEF-earR002']} />
          <primitive object={nodes['DEF-earR004']} />
          <primitive object={nodes['DEF-teethT']} />
          <primitive object={nodes['DEF-nose002']} />
          <primitive object={nodes['DEF-noseL001']} />
          <primitive object={nodes['DEF-noseR001']} />
          <primitive object={nodes['DEF-eye_masterL']} />
          <primitive object={nodes['DEF-lidBL']} />
          <primitive object={nodes['DEF-lidTL']} />
          <primitive object={nodes['DEF-eyeL']} />
          <primitive object={nodes['DEF-eye_masterR']} />
          <primitive object={nodes['DEF-lidBR']} />
          <primitive object={nodes['DEF-lidTR']} />
          <primitive object={nodes['DEF-eyeR']} />
          <primitive object={nodes['DEF-teethB']} />
          <primitive object={nodes['DEF-tongue']} />
          <primitive object={nodes['DEF-jaw_master']} />
          <primitive object={nodes['DEF-chin']} />
          <primitive object={nodes['DEF-jaw']} />
          <primitive object={nodes['DEF-jawL']} />
          <primitive object={nodes['DEF-jawR']} />
          <primitive object={nodes['DEF-lipTL']} />
          <primitive object={nodes['DEF-lipTR']} />
          <primitive object={nodes['DEF-lipBL']} />
          <primitive object={nodes['DEF-lipBR']} />
          <primitive object={nodes['DEF-browBL']} />
          <primitive object={nodes['DEF-browBL004']} />
          <primitive object={nodes['DEF-browBR']} />
          <primitive object={nodes['DEF-browBR004']} />
          <primitive object={nodes['DEF-browTL']} />
          <primitive object={nodes['DEF-browTL001']} />
          <primitive object={nodes['DEF-browTL003']} />
          <primitive object={nodes['DEF-browTR']} />
          <primitive object={nodes['DEF-browTR001']} />
          <primitive object={nodes['DEF-browTR003']} />
          <primitive object={nodes['DEF-cheekBL']} />
          <primitive object={nodes['DEF-cheekBR']} />
          <primitive object={nodes['DEF-cheekTL']} />
          <primitive object={nodes['DEF-cheekTR']} />
          <primitive object={nodes['DEF-foreheadL']} />
          <primitive object={nodes['DEF-foreheadL001']} />
          <primitive object={nodes['DEF-foreheadL002']} />
          <primitive object={nodes['DEF-foreheadR']} />
          <primitive object={nodes['DEF-foreheadR001']} />
          <primitive object={nodes['DEF-foreheadR002']} />
          <primitive object={nodes['DEF-nose']} />
          <primitive object={nodes['DEF-nose004']} />
          <primitive object={nodes['DEF-templeL']} />
          <primitive object={nodes['DEF-templeR']} />
          <primitive object={nodes['DEF-shoulderL']} />
          <primitive object={nodes['DEF-upper_armL']} />
          <primitive object={nodes['DEF-shoulderR']} />
          <primitive object={nodes['DEF-upper_armR']} />
          <primitive object={nodes['DEF-breastL']} />
          <primitive object={nodes['DEF-breastR']} />
        </group>

        <skinnedMesh name="left-eye" geometry={nodes['left-eye'].geometry} skeleton={nodes['left-eye'].skeleton}>
          <meshStandardMaterial color='#FFFFFF' />
        </skinnedMesh>
        <skinnedMesh name="right-eye" geometry={nodes['right-eye'].geometry} skeleton={nodes['right-eye'].skeleton}>
          <meshStandardMaterial color='#FFFFFF' />
        </skinnedMesh>

        <skinnedMesh name="eyebrows" geometry={nodes.eyebrows.geometry} skeleton={nodes.eyebrows.skeleton}>
          <meshStandardMaterial color='#FFFFFF' />
        </skinnedMesh>

        <skinnedMesh name="Body" geometry={nodes.Body.geometry} material={materials['avatar-body']} skeleton={nodes.Body.skeleton} />

        <skinnedMesh name="hair-base" geometry={nodes['hair-base'].geometry} material={materials['avatar-body']} skeleton={nodes['hair-base'].skeleton}>
          <Html
            position={[ 0, 0.65, 0 ]}
            center
          >

            <div 
              ref={ dialogueContainerRef }
              className={ `w-80 font-lily font-bold text-lg text-pinkPalette-2 text-center uppercase ${ isWaitingForUserClick ? 'animate-pulse' : '' }` }
            >
              { currentDialogueDisplayText }
            </div>

          </Html>
        </skinnedMesh>
        <group name="hair">
          <skinnedMesh name="Mesh001" geometry={nodes.Mesh001.geometry} material={materials['avatar-body']} skeleton={nodes.Mesh001.skeleton} />
          <skinnedMesh name="Mesh001_1" geometry={nodes.Mesh001_1.geometry} material={materials['avatar-body']} skeleton={nodes.Mesh001_1.skeleton} />
          <skinnedMesh name="Mesh001_2" geometry={nodes.Mesh001_2.geometry} material={materials['avatar-body']} skeleton={nodes.Mesh001_2.skeleton} />
        </group>
        <skinnedMesh name="scrunchies" geometry={nodes.scrunchies.geometry} material={materials['avatar-body']} skeleton={nodes.scrunchies.skeleton} />

        <skinnedMesh name="pants" geometry={nodes.pants.geometry} material={materials['avatar-body']} skeleton={nodes.pants.skeleton} />
        <skinnedMesh name="shirt" geometry={nodes.shirt.geometry} material={materials['avatar-body']} skeleton={nodes.shirt.skeleton} />

        <skinnedMesh name="hoops" geometry={nodes.hoops.geometry} skeleton={nodes.hoops.skeleton}>
          <meshStandardMaterial color='#FFFFFF' />
        </skinnedMesh>

      </group>
    </group>
  )
}

useGLTF.preload( '/models/avatar-transformed.glb' )
