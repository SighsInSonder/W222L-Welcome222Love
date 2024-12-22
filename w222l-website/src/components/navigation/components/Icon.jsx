import { 
    BookMarked, 
    House, 
    Instagram, 
    MessageSquare, 
    NotebookText, 
    Sparkles, 
    Twitter, 
    User, 
    X 
} from 'lucide-react'

const getIcon = ( icon ) => {
    switch ( icon ) {
        case "house":
            return <House className="w-full h-auto" strokeWidth={ 1.5 } color='#FFFFFF' />
        case "user":
            return <User className="w-full h-auto" strokeWidth={ 1.5 } color='#FFFFFF' />
        case "notebook-text":
            return <NotebookText className="w-full h-auto" strokeWidth={ 1.5 } color='#FFFFFF' />
        case "message-square":
            return <MessageSquare className="w-full h-auto" strokeWidth={ 1.5 } color='#FFFFFF' />
        case "book-marked":
            return <BookMarked className="w-full h-auto" strokeWidth={ 1.5 } color='#FFFFFF' />
        case "sparkles":
            return <Sparkles className="w-full h-auto" strokeWidth={ 1.5 } color='#FFFFFF' />
        case "instagram":
            return <Instagram className="w-full h-auto" strokeWidth={ 1.5 } color='#FFFFFF' />
        case "x":
            return <X className="w-full h-auto" strokeWidth={ 1.5 } color='#FFFFFF' />
                    
        default:
            return <House className="w-full h-auto" strokeWidth={ 1.5 } color='#FFFFFF' />
    }
}

export default function Icon({ label, x, y, icon, toggleToContentCard }) {
    const handleIconClick = () => {
        if ( label === 'instagram' ) {
            window.open( 'https://www.instagram.com/welcome222love/' )
        } else if ( label === 'x ( twitter )' ) {
            window.open( '' )
        } else {
            toggleToContentCard( label )
        }
    }

    return <div
        className="absolute cursor-pointer z-50" 
        style={{ transform: `translate( ${ x }, ${ y } )` }}
    >
        <div
            className="text-foreground rounded-full flex items-center justify-center bg-background/40 border border-pink_two/30 border-solid backdrop-blur-[6px] shadow-glass-inset hover:shadow-glass-sm"
            onClick={ handleIconClick }       
        >

            <span className='relative w-14 h-14 p-4 animate-spin-slow-reverse group-hover:pause hover:text-pink_three'>
                { getIcon( icon ) }

                <span className='peer bg-transparent absolute top-0 left-0 w-full h-full' />

                <span className='absolute hidden peer-hover:block px-2 py-1 left-full mx-2 top-1/2 -translate-y-1/2 bg-background text-foreground text-sm rounded-md shadow-lg whitespace-nowrap'>
                    { label }
                </span>
            </span>

        </div>
    </div>
}