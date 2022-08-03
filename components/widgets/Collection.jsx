import React, { useEffect, useRef, useState } from 'react'
import styled from '@emotion/styled'
import base from '../../styles/emotions/base'
import { useSelector, useDispatch } from "react-redux";
import { AiOutlineCheck, AiOutlinePlus } from 'react-icons/ai';
import NoData from './NoData';
import { addCollection, addToCollection, editCollection } from '../../store/reducers/collectionReducer';
import toast from './toast';
import { v4 as uuidv4 } from 'uuid';

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
    &:hover {
        background-color: ${props => props.color ? props.color : base.dark};
    }
    @media (max-width: 576px) {
        flex-basis: 100%;
        font-size: 13px;
    }
`

const CollectionTitle = styled.h3`
    color: ${base.dark}88;
    font-weight: 500;
    text-align: ${props => props.align ? props.align : "left"};
    margin-bottom: 1rem;
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
    width: auto;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    position: relative;
    border-radius: 0.6rem;
    padding: 0.5rem 0.8rem;
    color: white;
    font-size: 14px;
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

const FormWrapper = styled.div`
    padding: 1rem;
    @media (max-width: 576px) {
        padding: 0.8rem 0;
        max-width: 100%;
    }
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
        toast("success", `${data?.title?.romaji} successfully add to collections!`);
    }

    const selectCollection = (collection) => {
        const checkSelected = selectedCollection.find(item => item.id === collection.id);
        if (checkSelected) {
            const updateSelected = selectedCollection.filter(item => item.id !== collection.id);
            setSelectedCollection(updateSelected);
        } else {
            setSelectedCollection([...selectedCollection, collection]);
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
                                        You don&apos;t have any collection
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
                                            key={item?.id}
                                            selectCollection={selectCollection}
                                            collection={{ id: item.id, name: item.name }}
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
                            <span>Save</span>
                        </CollectionButton>
                    ) : null}
                </ButtonGroup>
            ) : null}
        </CollectionWrapper>
    )
}

const CollectionItem = ({ collection, selectCollection }) => {
    const checkRef = useRef(null);
    const [checked, setChecked] = useState(false);

    const checkItem = () => {
        checkRef.current.click();
        selectCollection(collection);
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
                {collection.name}
            </CollectionItemLabel>
        </CollectionItemWrapper>
    )
}

export const CollectionForm = ({ onHide = null, data = null }) => {
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
        return list.find(item => (item.name).toLowerCase() === collectionName.toLocaleLowerCase());
    }

    const updateExistsCheck = () => {
        return list.find(item =>
            (item.name).toLocaleLowerCase() === collectionName.toLocaleLowerCase() &&
            item.id !== data?.id
        );
    }

    const addNewCollection = () => {
        if (validate(collectionName)) {
            if (!existsCheck()) {
                dispatch(addCollection({
                    id: uuidv4(),
                    name: collectionName,
                    anime: []
                }));
                toast("success", `${collectionName} successfully added!`)
                onHide();
            } else {
                toast("error", `${collectionName} already exists!`);
            }
        } else {
            toast("error", "Special character is not allowed on collection name!");
            return false;
        }
    }

    const updateCollectionData = () => {
        if (validate(collectionName)) {
            if (!updateExistsCheck()) {
                dispatch(editCollection({
                    id: data?.id,
                    name: collectionName
                }));
                toast("success", `${collectionName} successfully updated!`)
                onHide();
            } else {
                toast("error", `${collectionName} already use by another!`);
            }

        } else {
            toast("error", "Special character is not allowed on collection name!");
            return false;
        }
    }

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, []);

    useEffect(() => {
        if (data) {
            setCollectionName(data?.name);
        }
    }, [data]);

    return (
        <FormWrapper>
            <FormGroup>
                <FormLabel htmlFor="name">Collection Name</FormLabel>
                <FormInput
                    ref={inputRef}
                    id="name"
                    value={collectionName}
                    onChange={onInputChange}
                />
            </FormGroup>
            <ButtonGroup>
                <CollectionButton color={base.orange} onClick={onHide}>
                    <span>Cancel</span>
                </CollectionButton>
                {data?.id ? (
                    <CollectionButton onClick={updateCollectionData}>
                        <span>Update</span>
                    </CollectionButton>
                ) : (
                    <CollectionButton onClick={addNewCollection}>
                        <span>Save</span>
                    </CollectionButton>
                )}
            </ButtonGroup>
        </FormWrapper>
    )
}

export default Collection