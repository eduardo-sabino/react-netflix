import { InfoOutlined, PlayArrow } from "@material-ui/icons";
import { useState, useEffect } from "react";
import axios from 'axios'
import './featured.scss'

export default function Featured({type}) {
    const [content, setContent] = useState({})

    useEffect(() => {
        const getRandomContent = async () => {
          try {
            const REACT_APP_API_URL = process.env.REACT_APP_API_URL
            const res = await axios.get(`${REACT_APP_API_URL}/movies/random/?type=${type}`, {
              headers: {
                token:
                  "Bearer " + process.env.REACT_APP_TOKEN,
              },
            });
            setContent(res.data[0]);
          } catch (err) {
            console.log(err);
          }
        };
        getRandomContent();
      }, [type]);


    return (
        <div className="featured">
            
            {type && (
                <div className="category">
                    
                    <span className="type">{type === "Movie" ? "Movies" : "Series"}</span>
                    <select name="genre" id="genre">
                        <option>Genre</option>
                        <option value="adventure">Adventure</option>
                        <option value="comedy">Comedy</option>
                        <option value="crime">Crime</option>
                        <option value="fantasy">Fantasy</option>
                        <option value="historical">Historical</option>
                        <option value="horror">Horror</option>
                        <option value="romance">Romance</option>
                        <option value="sci-fi">Sci-fi</option>
                        <option value="thriller">Thriller</option>
                        <option value="western">Western</option>
                        <option value="animation">Animation</option>
                        <option value="drama">Drama</option>
                        <option value="documentary">Documentary</option>
                    </select>
                </div>
            )}
            <img
                src={content.img}
                alt=""
            />
            
            <div className="info">
                
                <img
                    src={content.imgTitle}
                    alt=""
                />
                <span className="desc">
                    {content.desc}
                </span>
                <div className="buttons">
                    <button className="play">
                        <PlayArrow />
                        <span>Play</span>
                    </button>
                    <button className="more">
                        <InfoOutlined />
                        <span>Info</span>
                    </button>
                </div>
            </div>
        </div>
    )
}
