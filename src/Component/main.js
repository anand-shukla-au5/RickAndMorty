import React, { Component, useState, useEffect } from 'react'
import axios from 'axios'
import Page from './page'
export default () => {
    const [page, setPage] = useState(1)
    const [posts, setPosts] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
    const [load, setLoad] = useState(false)
    const [call, callPosts] = useState([])
    const [search, setSearch] = useState('')
    const [sposts, setSposts] = useState([])
    function previous(no) {
        if (no === 1) {
            setPage(no)
        }
        else if (no === 2) {
            setPage(no)
            let arr = [11, 12, 13, 14, 15, 16, 17, 18, 19, 20]
            setPosts(arr)
        }
        else if (no === 3) {
            setPage(no)
            let arr = [21, 22, 23, 24, 25, 26, 27, 28, 29, 30]
            setPosts(arr)
        }
        else {
            if (no === 'back') {
                if (page === 1) {
                    let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
                    setPosts(arr)
                    setPage(1)
                }
                else {
                    setPage(page - 1)
                    let arr = posts.map(el => {
                        return el - posts.length
                    })
                    setPosts(arr)
                }

            }
            if (no === 'next') {
                if (page <= 3) {
                    setPage(page + 1)
                    let arr = posts.map(el => {
                        return el + posts.length
                    })
                    setPosts(arr)
                }
                if (page === 4) {
                    let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
                    setPosts(arr)
                    setPage(1)
                }
            }
        }
    }
    useEffect(() => {
        setLoad(true)
        const fetching = async () => {
            let res = await axios.get(`https://rickandmortyapi.com/api/episode/${posts}`)
            if (res.data) {
                let array = res.data
                array.forEach(async (element, i) => {
                    let url = element.characters[i]
                    let res = await axios.get(url)
                    element["image"] = (res.data.image)
                });
                callPosts(array)
            }
        }
        fetching()
        setLoad(false)
    }, [posts])
    useEffect(() => {
        setLoad(true)
        const searching = async () => {
            try {
                let res = await axios.get(`https://rickandmortyapi.com/api/episode/?name=${search}`)
                console.log("status", res.status)
                setSposts(res.data.results)
            } catch (err) {
                console.log("STATUS", err)
                setSposts([])
            }
        }
        searching()
        setLoad(false)
    }, [search])
    function searchBar(val) {
        setSearch(val)
    }
    console.log("All", call, posts, page, search, sposts,)
    return (
        <div>
            <nav className="navbar navbar-light bg-light">
                <a className="navbar-brand">
                    <img src="https://cutewallpaper.org/21/rick-and-morty-silhouette/Rick-and-Morty-Circle-Silhouette-Die-Cut-Vinyl-Decal-Sticker.jpg" width="40" height="35" alt="" loading="lazy" />
                     Rick And Morty
                </a>

                <form className="form-inline my-2 my-lg-0">
                    <input className="form-control mr-sm-2" onChange={(e) => searchBar(e.target.value)} type="search" placeholder="Search Episodes" aria-label="Search Episodes" />
                </form>
            </nav>
            {sposts.length === 20 ?
                <div>
                    <nav aria-label="Page navigation example">
                        <ul className="pagination justify-content-center mt-3">
                            <li className="page-item ">
                                <a className="page-link" tabIndex="1" onClick={() => previous('back')} >Previous</a>
                            </li>
                            <li className="page-item"><a className="page-link" onClick={() => { previous(1) }}>1</a></li>
                            <li className="page-item"><a className="page-link" onClick={() => { previous(2) }} >2</a></li>
                            <li className="page-item"><a className="page-link" onClick={() => { previous(3) }} >3</a></li>
                            <li className="page-item">
                                <a className="page-link" onClick={() => { previous('next') }} >Next</a>
                            </li>
                        </ul>
                    </nav>
                    <div className="" >
                        <Page data={call} loading={load} pgno={page} />
                    </div>
                </div> :
                <div>
                    <Page data={sposts} loading={load} pgno={1} />
                </div>
            }
        </div>
    )
}