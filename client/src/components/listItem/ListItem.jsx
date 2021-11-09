import { Add, PlayArrow, ThumbDownAltOutlined, ThumbUpAltOutlined } from '@material-ui/icons'
import { useEffect, useState } from 'react'
import './listItem.scss'
import axios from 'axios'
import { Link } from 'react-router-dom'

export default function ListItem({item, index}) {
    const [isHovered, setIsHovered] = useState(false)
    const [movie, setMovie] = useState({})
    
    useEffect(() => {
        const getMovie = async () => {
            try {
                const REACT_APP_API_URL = process.env.REACT_APP_API_URL
                const res = await axios.get(
                    `${REACT_APP_API_URL}/movies/find/${item}`,
                    {
                        headers: {
                        token:
                        "Bearer "+ process.env.REACT_APP_TOKEN,
                        },
                    }
                )
                setMovie(res.data)
            } catch (error) {
                console.log(error)
            }
        }
        getMovie()

        return {
                       
        }
    }, [item])
    return (
        <Link to={{pathname:'/watch', movie:movie}}>
            <div 
            className="list-item"
            onMouseEnter={ () => setIsHovered(true) } 
            onMouseLeave={() => setIsHovered(false)}
            style={{left: isHovered && index * 225 - 50 + index * 2.5}} 
            >
                <img
                    src={movie.imgSm}
                    alt=""
                />
                {isHovered && (
                    <>
                    <video src={movie.trailer} autoPlay={true} loop />

                    <div className="item-info">
                        <div className="icons">
                            <PlayArrow className="icon"/>
                            <Add className="icon"/>
                            <ThumbUpAltOutlined className="icon"/>
                            <ThumbDownAltOutlined className="icon"/>
                        </div>
                        <div className="item-info-top">
                            <span>{movie.duration}</span>
                            <span className="limit">{movie.limit}</span>
                            <span>{movie.year}</span>
                        </div>
                        <div className="desc">
                            {movie.desc}
                        </div>
                        <div className="genre">{movie.genre}</div>
                    </div>
                </>
                )}
            </div>
        </Link>
    )
}
