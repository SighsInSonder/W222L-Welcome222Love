export default function CardFront() {
    return <div className='flex justify-center items-center w-full h-full font-lily font-bold text-2xl text-pinkPalette-2'>

        <div className='flex flex-col w-[90%] h-[95%] bg-white rounded-[15px] border-4 border-pinkPalette-2 overflow-hidden'>
         
            <div className='flex-grow basis-[80%]'>
                <div className='flex justify-center items-center w-full h-full'>
                    <div className='flex justify-center items-center w-[75%] h-[75%]'>
                        
                        <img src="./images/content-cards/filler.svg" />

                    </div>
                </div>
            </div>

            <div className='flex-grow basis-[20%] border-t-4 border-pinkPalette-2'>
                <div className='flex justify-center items-center w-full h-full'>
                    
                    the empress

                </div>
            </div>
        </div>

    </div>
}