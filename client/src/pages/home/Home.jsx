/* import { AcUnit } from '@material-ui/icons' */
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Featured from '../../components/featured/Featured'
import List from '../../components/list/List'
import Navbar from '../../components/navbar/Navbar'
import './home.scss'


export default function Home({ type }) {
    const [lists, setLists] = useState([])
    const [genre, setGenre] = useState(null)
    
    useEffect(() => {
        const getRandomLists = async () => {
          try {
            const REACT_APP_API_URL = process.env.REACT_APP_API_URL
            const res = await axios.get(
              `${REACT_APP_API_URL}/lists${type ? "?type=" + type : ""}${
                genre ? "&genre=" + genre : ""
              }`,
              {
                headers: {
                  token:
                  "Bearer "+ process.env.REACT_APP_TOKEN,
                },
              }
            );
            
            setLists(res.data);
          } catch (err) {
            console.log(err);
          }
        };
        getRandomLists();
      }, [type, genre]);
    return (
        <div className="home">
            <Navbar />
            <Featured type={type} />
            {lists.map((list) => (
                <List key={list._id} list={list} />
            ))}
        </div>
    )
}
