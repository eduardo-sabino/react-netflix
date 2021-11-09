import { ArrowBackIosOutlined, ArrowForwardIosOutlined } from '@material-ui/icons'
import { useRef, useState } from 'react'
import ListItem from '../listItem/ListItem'
import './list.scss'

export default function List({list}) {
    const [isMoved, setIsMoved] = useState(false)
    const [slideNumber, setSlideNumber] = useState(0)
    const listRef = useRef() // it's the same as using the getElementById function
    const handleClick = (direction) => {
        const isLeftDirection = direction === "left"
        const isRightDirection = direction === "right"
        const isSlideAtTheFirstIndex = !slideNumber > 0
        const isSlideNotAtTheLastIndex = slideNumber < 5
        let distance = listRef.current.getBoundingClientRect().x - 50
        setIsMoved(true)
        if (isLeftDirection && !isSlideAtTheFirstIndex) {
            setSlideNumber(slideNumber - 1)
            listRef.current.style.transform = `translateX(${230 + distance}px)`
            
        }
        if (isRightDirection && isSlideNotAtTheLastIndex) {
            setSlideNumber(slideNumber + 1)
            listRef.current.style.transform = `translateX(${-230 + distance}px)`
        }
    }

    return (
        <div className="list">
            <span className="list-title">{list.title}</span>
            <div className="wrapper">
                <ArrowBackIosOutlined 
                 className="slider-arrow left"
                 onClick={() => handleClick("left")}
                 style={{display: !isMoved && "none"}} 
                />
                <div className="container" ref={listRef}>
                    {
                        list.content.map((item, i) => (
                            <ListItem key={i} index={i} item={item}/>
                        ))
                    }
                
                </div>
                <ArrowForwardIosOutlined className="slider-arrow right" onClick={() => handleClick("right")}/>
            </div>
        </div>        
    )
}
