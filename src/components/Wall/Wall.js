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
            content: 'Ну как, вы справились с домашкой?',
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
            tags: ['deadline', 'homeork'],
            created: 1603774830,
        },
    ]);

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
    }

    const handleSave = post => setPosts(prevState => [{...post}, ...prevState]);

    return (
        <>
            <PostForm onSave={handleSave} />
            <div>
                {posts.map(o => <Post key={o.id} post={o}
                        onLike={handlePostLike} onRemove={handlePostRemove}
                        onHide={handleToggleVisibility} 
                        onShow={handleToggleVisibility} />)}
            </div>
        </>
    );
}

export default Wall;


