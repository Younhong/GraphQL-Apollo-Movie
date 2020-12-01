import React from 'react';
import {useParams} from 'react-router-dom';
import {gql} from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import styled from "styled-components";
import Movie2 from '../components/Movie2';

const GET_MOVIE = gql`
    query getMovie($id:Int!){
        movie(id:$id) {
            id
            title
            medium_cover_image
            language
            rating
            description_intro,
            isLiked @client
        },
        suggestions(id:$id){
            id
            medium_cover_image
        }
    }
`;

const Container = styled.div`
    height: 100vh;
    background-image: linear-gradient(-45deg, #d754ab, #fd723a);
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    color: white;
`;

const Column = styled.div`
    margin-left: 10px;
    width: 50%;
`;

const Title = styled.h1`
    font-size: 65px;
    margin-bottom: 15px;
`;

const Subtitle = styled.h4`
    font-size: 35px;
    margin-bottom: 10px;
`;

const Description = styled.p`
    font-size: 28px;
`;

const Poster = styled.div`
    margin-bottom: 7%;
    width: 25%;
    height: 60%;
    background-color: transparent;
    background-image: url(${props => props.bg});
    background-size: cover;
    background-position: center center;
`;

const Movies = styled.div`
    margin-top: 42%;
    margin-left: 35%;
    margin-bottom: 5%;
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    grid-gap: 25px;
    width: 65%;
    position: absolute;
    top: -50px;
`;

export default () => {
    const {id} = useParams();
    const {loading, data} = useQuery(GET_MOVIE, {
        variables: {id: parseInt(id)}
    });
    console.log(data);
    return (
        <Container>
            <Column>
                <Title>{loading ? "Loading..." 
                    : `${data.movie.title} ${data.movie.isLiked 
                        ? "💖" : "💔"}`}</Title>
                <>
                    <Subtitle>
                    {data?.movie?.language} · {data?.movie?.rating}
                    </Subtitle>
                    <Description>{data?.movie?.description_intro}</Description>
                </>
            </Column>
            <Poster
                bg={data?.movie?.medium_cover_image}
            ></Poster>
            <Movies> 
                {data?.suggestions?.map(m => (
                    <Movie2 key={m.id} id={m.id} bg={m.medium_cover_image} />
                ))}
            </Movies>
        </Container>
      );
};