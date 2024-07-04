import Marquee from "react-fast-marquee"

type Props = {
  text : string
  direction : "left" | "right" | "up" | "down" | undefined
}

const LoopingText = ({ text, direction } : Props) => {



  return (
    <Marquee direction={direction} className='flex'>
      {[...Array(6)].map((index) => (
        <h2 key={index} className='text-[100px] md:text-[220px] opacity-40 mx-7'>{text}</h2>
      ))}
    </Marquee>
  )
}

export default LoopingText