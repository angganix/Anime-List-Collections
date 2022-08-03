import styled from '@emotion/styled'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { AiOutlineDelete, AiOutlineStar } from 'react-icons/ai'
import { useDispatch } from 'react-redux'
import Swal from 'sweetalert2'
import base from '../../styles/emotions/base'
import SkeletonLoader from '../widgets/SkeletonLoader'
import { AnimeHead, AnimeScore, AnimeSeason, AnimeTitle, Card, CardImage, GenreItem, GenreWrapper, ListItem, ListWrapper } from './Anime'

const ActionWrapper = styled.div`
    position: absolute;
    top: 0;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 10;
`

const RemoveButton = styled.button`
    margin: 0.4rem 0.3rem;
    cursor: pointer;
    padding: 0.2rem 0.4rem;
    border-radius: 50px;
    background-color: ${base.red}ee;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.2rem;
    &:hover {
        background-color: ${base.red};
    }
    @media (max-width: 576px) {
        font-size: 11.5px;
        margin: 0.5rem 0.3rem;
    }
`

const AnimeList = ({ loading, list, actions = false, deleteAnime = null, wide = false }) => {
    return (
        <ListWrapper>
            {loading
                ? [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(item => (
                    <ListItem key={item} forceWide={wide}>
                        <Card>
                            <CardImage>
                                <SkeletonLoader mobileHeight="180px" height="300px" />
                            </CardImage>
                        </Card>
                    </ListItem>
                ))
                : list?.map((item, index) => (
                    <ListItem forceWide={wide} key={index} style={{ zIndex: 5 }}>
                        {actions ? (
                            <ActionWrapper>
                                <RemoveButton
                                    onClick={() => deleteAnime({ id: item?.id, title: item?.title?.romaji })}
                                >
                                    <AiOutlineDelete />
                                    <span>Delete</span>
                                </RemoveButton>
                            </ActionWrapper>
                        ) : null}
                        <Link href={`/anime/${item?.id}`}>
                            <Card>
                                <AnimeHead>
                                    {item?.season ? (
                                        <AnimeSeason>{item?.season}</AnimeSeason>
                                    ) : (
                                        <div></div>
                                    )}
                                    {!actions ? (
                                        <AnimeScore>
                                            <AiOutlineStar
                                                style={{ marginBottom: -1.8, marginRight: 1.5 }}
                                            />
                                            <span>{item?.averageScore / 10}</span>
                                        </AnimeScore>
                                    ) : null}
                                </AnimeHead>
                                <CardImage>
                                    <Image
                                        src={item?.coverImage?.large}
                                        width="100%"
                                        height="132px"
                                        layout="responsive"
                                        priority
                                        alt={item?.title?.romaji}
                                    />
                                </CardImage>
                                <GenreWrapper>
                                    {item?.genres?.slice(0, 3)?.map((genre) => (
                                        <GenreItem key={genre}>{genre}</GenreItem>
                                    ))}
                                </GenreWrapper>
                                <AnimeTitle title={item?.title?.romaji}>
                                    {item?.title?.romaji}
                                </AnimeTitle>
                            </Card>
                        </Link>
                    </ListItem>
                ))}
        </ListWrapper>
    )
}

export default AnimeList