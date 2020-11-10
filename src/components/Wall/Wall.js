import React, { useState } from 'react';
import Post from '../Post/Post';
import PostForm from '../PostForm/PostForm';

function Wall() {
    const [posts, setPosts] = useState([
        {
            id: 1,
            author: {
                id: 1,
                avatar: 'https://lms.openjs.io/logo_js.svg',
                name: 'OpenJS',
            },
            content: null,
            photo: null,
            hit: true,
            likes: 225,
            likedByMe: true,
            hidden: false,
            tags: ['deadline', 'homeork'],
            created: 1603774800,
        },
        {
            id: 2,
            author: {
                id: 1,
                avatar: 'https://lms.openjs.io/logo_js.svg',
                name: 'OpenJS',
            },
            content: 'Ну как, вы справились с домашкой?',
            photo: {
                alt: 'openjs logo',
                url: 'https://lms.openjs.io/openjs.jpg'
            },
            hit: false,
            likes: 222,
            likedByMe: false,
            hidden: true,
            tags: null,
            created: 1603774830,
        },
    ]);
    const [edited, setEdited] = useState();

    const handlePostLike = id => {
        setPosts((prevState) => prevState.map(o => {
            if (o.id !== id) {
                return o;
            }

            const likedByMe = !o.likedByMe;
            const likes = likedByMe ? o.likes + 1 : o.likes - 1;
            return { ...o, likedByMe, likes };
        }))
    };

    const handlePostRemove = id => setPosts((prevState) => prevState.filter(o => o.id !== id));

    const handleToggleVisibility = id => {
        setPosts((prevState) => prevState.map(o => {
            if (o.id !== id) {
                return o;
            }
            const hidden = !o.hidden;
            return { ...o, hidden };
        }
        ));
    };

    const handlePostEdit = id => {
        const post = posts.find(o => o.id === id);
        if (post === undefined) {
            return;
        }
        setEdited(post);
    };

    const handlePostSave = post => {
        if (edited !== undefined) {
            setPosts(prevState => prevState.map(o => {
                if (o.id !== post.id) {
                    return o;
                }
                return {...post};
            }));
            setEdited(undefined);
            return;
        }
        setPosts(prevState => [{...post}, ...prevState]);
    };

    const handlePostCancelEdit = () => setEdited(undefined);

    return (
        <>
            <PostForm edited={edited} onSave={handlePostSave}
            onCancel={handlePostCancelEdit} />
            <div>
                {posts.map(o => <Post key={o.id} post={o}
                        onLike={handlePostLike} onRemove={handlePostRemove}
                        onHide={handleToggleVisibility} 
                        onShow={handleToggleVisibility}
                        onEdit={handlePostEdit} />)}
            </div>
        </>
    );
}

export default Wall;


