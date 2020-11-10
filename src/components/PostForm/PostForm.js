import React, {useState, useRef, useEffect} from 'react';

const empty = {
    id: 0,
    author: {
        avatar: 'https://lms.openjs.io/logo_js.svg',
        name: 'OpenJS',
    },
    content: '',
    photo: null,
    hit: false,
    likes: 0,
    likedByMe: false,
    hidden: false,
    tags: null,
    created: 0,
};

function PostForm({edited = empty, onSave, onCancel}) {

    const [post, setPost] = useState(edited);
    const firstFocusEl = useRef(null);
    useEffect(() => {
        setPost(edited);
    }, [edited]);

    const handleSubmit = ev => {
        ev.preventDefault();
        post.tags = post.tags && post.tags.join(' ').trim().replace(/\s+/g, ' ').replace(/#/g, '').split(' ');

        if ((post.tags && post.tags.length === 1 && post.tags[0] === '') || post.tags === undefined) {
            post.tags = null;
        }
        if (post.photo?.url === undefined || post.photo?.url === '') {
            post.photo = null;
        }
        if (post.photo?.alt === undefined && post.photo !== null) {
            post.photo.alt = '';
        }
        onSave({
            ...post, 
            id: post.id || Date.now(), 
            created: post.created || Date.now()
        });
        setPost(empty);
        firstFocusEl.current.focus();
    };

    const photo = {
        url: post.photo?.url,
        alt: post.photo?.alt,
    };
    const handleChange = ev => {
        const {name, value} = ev.target;
        
        if (name === 'tags') {
            const parsed = value.split(' ');
            setPost(prevState => ({...prevState, [name]: parsed}));
            return;
        }
        if (name === 'photo') {
            photo.url = value;
            setPost(prevState => ({...prevState, photo}));
            return;
        }
        if (name === 'alt') {
            photo.alt = value;
            setPost(prevState => ({...prevState, photo}));
            return;
        }
        setPost(prevState => ({...prevState, [name]: value}));
    };

    const handleCancelEdit = () => onCancel();

    return (
        <>
            <form onSubmit={handleSubmit}>
                <textarea 
                    ref={firstFocusEl} name="content" 
                    placeholder="content" value={post.content || ''} 
                    onChange={handleChange}>
                </textarea>
                <input 
                    name="tags" placeholder="tags" 
                    value={post.tags?.join(' ') || ''} 
                    onChange={handleChange} />
                
                <input name="photo" placeholder="photo" 
                    value={post.photo?.url || ''} 
                    onChange={handleChange} />
                
                <input name="alt" placeholder="alt" 
                    value={post.photo?.alt || ''} 
                    onChange={handleChange} />
                
                <button>Ok</button>
            </form>
            {post.id !== 0 && <button onClick={handleCancelEdit}>Отменить</button>}
        </>
    )
}

export default PostForm;
