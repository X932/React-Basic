import React from 'react';
import './Post.css';
import Tags from '../Tags/Tags';

function Post({ post, onLike, onRemove, onHide, onShow }) {

	const { author } = post;
	const { photo } = post;
	const likeIcon = post.likedByMe ? "https://lms.openjs.io/liked.svg" : "https://lms.openjs.io/unliked.svg";

	const handleClick = () => onLike(post.id);
	const handleRemove = () => onRemove(post.id);	
	const handleHide = () => onHide(post.id);
	const handleShow = () => onShow(post.id);
	
	if (post.hidden) {
		return (
			<article>
				<header>
					<img className="Post-avatar" src={author.avatar} width="50" height="50" alt={post.author.name} />
					<h5>{author.name}</h5>
					<button onClick={handleShow}>показать</button>
				</header>
			</article>
		);
	}
	return (
		<article>
			<header>
				<img className="Post-avatar" src={author.avatar} width="50" height="50" alt={post.author.name} />
				<h5>{author.name}</h5>
				<button onClick={handleRemove}>удалить</button>
				<button onClick={handleHide}>скрыть</button>
				<div>{post.created}</div>
				{post.hit && <span>HIT</span>}
			</header>
			<div>
				<div className="Post-content">{post.content}</div>
				{photo && <img src={post.photo.url} alt={post.photo.alt} className="Post-photo" />}
			</div>
			<footer>
				<span className="Post-likes" onClick={handleClick}>
					<img src={likeIcon} width="20" height="20" alt="likes" />
					<span className="Post-likes-count">{post.likes}</span>
					{post.tags && <Tags tags={post.tags} />}
				</span>
			</footer>
		</article>
	);
}

export default Post;