import React, { useEffect, useRef, useState } from 'react'
import styled from '@emotion/styled'
import base from '../../styles/emotions/base'
import { useSelector, useDispatch } from "react-redux";
import { AiOutlineCheck, AiOutlinePlus } from 'react-icons/ai';
import NoData from './NoData';
import { addCollection, addToCollection } from '../../store/reducers/collectionReducer';

const AnimeTitle = styled.h3`
    color: ${base.dark}99;
    font-weight: 400;
    font-size: 16px;
    margin-bottom: 1rem;
`

const CollectionWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-height: 100%;
`

const CollectionContent = styled.div`
    border-radius: 0.3rem;
    min-height: 100%;
    margin: 2rem 0;
`

const ButtonGroup = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
`

const CollectionButton = styled.button`
    cursor: pointer;
    padding: 0.5rem;
    border-radius: 0.6rem;
    box-shadow: 0px 0px 8px ${base.pink}44;
    background-color: ${props => props.color ? props.color : base.dark}cc;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.4rem;
    font-size: 18px;
    transition: all .2s ease-in-out;
    flex-grow: 1;
    flex-basis: 50%;
    &:hover {
        background-color: ${props => props.color ? props.color : base.dark};
    }
    @media (max-width: 576px) {
        flex-basis: 100%;
    }
`

const CollectionTitle = styled.h3`
    color: ${base.dark}88;
    font-weight: 500;
    text-align: ${props => props.align ? props.align : "left"};
    margin-bottom: 1rem;
`

const CollectionFormWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    flex-direction: column;
`

const FormGroup = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    min-width: 100%;
    margin-bottom: 2rem;
`

const FormLabel = styled.label`
    color: ${base.dark}aa;
`

const FormInput = styled.input`
    border: 1px solid ${base.dark}44;
    border-radius: 0.4rem;
    padding: 0.6rem 0.8rem;
    outline: none;
    transition: all .2s ease-in-out;
    &:focus {
        border: 1px solid ${base.blue}77;
        box-shadow: 0px 0px 3px ${base.blue}55;
    }
`

const CollectionList = styled.div`
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
    flex-direction: row;
    @media (max-width: 576px) {
        flex-direction: column;
    }
`

const CollectionItemWrapper = styled.div`
    cursor: pointer;
    width: 26.6%;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    position: relative;
    border-radius: 0.6rem;
    padding: 0.5rem 0.8rem;
    color: white;
    background-color: ${props => props.checked ? base.dark : `${base.dark}cc`};
    @media (max-width: 576px) {
        width: 90%;
    }
`

const CollectionItemLabel = styled.label`
    cursor: pointer;
`

const FieldSetCollection = styled.fieldset`
    border: 1px solid ${base.dark}55;
    border-radius: 0.5rem;
`

const LegendCollection = styled.legend`
    padding: 0 0.5rem;
    color: ${base.dark}88;
`

const Collection = ({ data, closeForm }) => {
    const dispatch = useDispatch()
    const { list } = useSelector(state => state.collection);
    const [showCollectionForm, setShowCollectionForm] = useState(false);
    const [selectedCollection, setSelectedCollection] = useState([]);

    const toggleFormCollection = () => {
        setShowCollectionForm(!showCollectionForm);
    }

    const saveToCollection = () => {
        dispatch(addToCollection({
            collections: selectedCollection,
            anime: data
        }));
        closeForm();
        alert(`${data?.title?.romaji} successfully add to collections!`);
    }

    const selectCollection = (name) => {
        const checkSelected = selectedCollection.find(item => item === name);
        if (checkSelected) {
            const updateSelected = selectedCollection.filter(item => item !== name);
            setSelectedCollection(updateSelected);
        } else {
            setSelectedCollection([...selectedCollection, name]);
        }
    }

    useEffect(() => {
        if (!showCollectionForm) {
            setSelectedCollection([]);
        }
    }, [showCollectionForm]);

    return (
        <CollectionWrapper>
            <div style={{ marginBottom: '1rem' }}>
                <AnimeTitle>
                    <strong>{data?.title?.romaji}</strong>
                </AnimeTitle>
                <CollectionContent>
                    {showCollectionForm ? (
                        <CollectionForm onHide={toggleFormCollection} />
                    ) : (
                        !list.length ? (
                            <NoData>
                                <>
                                    <CollectionTitle align="center">
                                        You don't have any collection
                                    </CollectionTitle>
                                    <CollectionButton onClick={toggleFormCollection}>
                                        <AiOutlinePlus />
                                        <span>Add New Collection</span>
                                    </CollectionButton>
                                </>
                            </NoData>
                        ) : (
                            <FieldSetCollection>
                                <LegendCollection>Please select collections</LegendCollection>
                                <CollectionList>
                                    {list?.map(item => (
                                        <CollectionItem
                                            key={item?.name}
                                            selectCollection={selectCollection}
                                            {...item}
                                        />
                                    ))}
                                </CollectionList>
                            </FieldSetCollection>
                        )
                    )}
                </CollectionContent>
            </div>
            {list?.length && !showCollectionForm ? (
                <ButtonGroup>
                    <CollectionButton
                        color={base.dark}
                        title="Add new collection"
                        onClick={toggleFormCollection}
                    >
                        <AiOutlinePlus />
                        <span>New Collection</span>
                    </CollectionButton>
                    {selectedCollection.length ? (
                        <CollectionButton
                            color={base.pink}
                            title="Save Collection"
                            onClick={saveToCollection}
                        >
                            <AiOutlineCheck />
                            <span>Add to Collection</span>
                        </CollectionButton>
                    ) : null}
                </ButtonGroup>
            ) : null}
        </CollectionWrapper>
    )
}

const CollectionItem = ({ name, selectCollection }) => {
    const checkRef = useRef(null);
    const [checked, setChecked] = useState(false);

    const checkItem = () => {
        checkRef.current.click();
        selectCollection(name);
    }

    return (
        <CollectionItemWrapper checked={checked} onClick={checkItem}>
            <input
                ref={checkRef}
                hidden
                checked={checked}
                type="checkbox"
                onChange={(e) => setChecked(e.target.checked)}
            />
            {checked ? (
                <AiOutlineCheck color={base.light} />
            ) : null}
            <CollectionItemLabel>
                {name}
            </CollectionItemLabel>
        </CollectionItemWrapper>
    )
}

const CollectionForm = ({ onHide }) => {
    const inputRef = useRef(null);
    const [collectionName, setCollectionName] = useState("");
    const { list } = useSelector(state => state.collection);
    const dispatch = useDispatch();

    const validate = (text) => {
        var regex = /^[A-Za-z0-9 ]+$/
        var isValid = regex.test(text);
        return isValid;
    }

    const onInputChange = (e) => {
        const { value } = e.target;
        setCollectionName(value);
    }

    const existsCheck = () => {
        return list.find(item => item.name === collectionName);
    }

    const addNewCollection = () => {
        if (validate(collectionName)) {
            if (!existsCheck()) {
                dispatch(addCollection({
                    name: collectionName,
                    anime: []
                }));
                onHide();
            } else {
                alert(`${collectionName} already exists!`);
            }
        } else {
            alert("Special character is not allowed on collection name!");
            return false;
        }
    }

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, []);

    return (
        <>
            <FormGroup>
                <FormLabel htmlFor="name">Collection Name</FormLabel>
                <FormInput ref={inputRef} id="name" onChange={onInputChange} />
            </FormGroup>
            <ButtonGroup>
                <CollectionButton color={base.orange} onClick={onHide}>
                    <span>Cancel</span>
                </CollectionButton>
                <CollectionButton onClick={addNewCollection}>
                    <span>Save Collection</span>
                </CollectionButton>
            </ButtonGroup>
        </>
    )
}

export default Collection