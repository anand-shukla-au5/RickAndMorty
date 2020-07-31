import React, { Component, useState, useEffect } from 'react'
import { Spinner, Card } from 'react-bootstrap'
export default ({ data, loading, pgno }) => {
    if (loading) {
        return (
            <div className="text-center">
                <Spinner animation="grow" />
            </div>
        )
    }
    console.log("images", data)
    return (
        <div className="content">
            {data.map((el, i) => {
                return (
                    <Card bg="dark"
                        className="mt-4"
                        key={el.id}
                        text='white'
                        style={{ width: '18rem' }}>
                        <Card.Img variant="top" src={`https://rickandmortyapi.com/api/character/avatar/${Math.floor(Math.random() * (15 * pgno)) + i + 1}.jpeg`} />
                        <Card.Header>
                            {el.episode}
                        </Card.Header>
                        <Card.Body>
                            <Card.Title>{el.name}</Card.Title>
                            <Card.Text>{el.air_date}</Card.Text>
                        </Card.Body>
                    </Card>
                )
            })}
        </div>
    )
}