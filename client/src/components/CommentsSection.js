import React, { useEffect, useState } from 'react';
import formatDate from '../utils/formatDate.js';
import { getCommentsForPost, createCommentForPost, getCommentById } from '../api/comments.js';
import style from '../styles/CommentsSection.module.scss';

function CommentsSection({ postAuthor, postId }) {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    async function getAndSetComments() {
      const comments = await getCommentsForPost(postId);
      setComments(comments);
    }
    getAndSetComments().catch(console.error);
  }, [postId]);

  async function handleSubmit(comment) {
    const commentId = await createCommentForPost(comment, postId);
    if (commentId) {
      const newComment = await getCommentById(commentId);
      setComments((prevState) => [newComment, ...prevState]);
    }
  }

  return (
    <div className={style.CommentsSectionContainer}>
      <h1>Comments</h1>
      <CommentForm onSubmit={handleSubmit} />
      {comments.map((comment) => {
        return (
          <Comment
            data={comment}
            isPostAuthor={comment.author === postAuthor}
            key={comment.id}
          />
        );
      })}
      <button>Load more comments</button>
    </div>
  );
}

function CommentForm({ onSubmit }) {
  const [comment, setComment] = useState('');

  return (
    <form
      className={style.CommentForm}
      onSubmit={(e) => {
        e.preventDefault();
        if (comment) {
          onSubmit(comment);
        }
      }}
    >
      <textarea
        className={style.bodyInput}
        required
        placeholder='Add a comment'
        value={comment}
        onChange={(e) => {
          setComment(e.target.value);
        }}
      />
      <button
        type='submit'
        onClick={() => {
          setComment(comment.trim());
        }}
      >
        Submit
      </button>
    </form>
  );
}

function Comment({ data, isPostAuthor }) {
  const { date, time } = formatDate(data.created_on);
  return (
    <div className={style.CommentContainer} id='comments'>
      <div>
        <p className={style.author}>
          {data.author ? data.author : 'Anonymous'}
          {isPostAuthor ? <span className={style.postAuthorBadge}> (Post Author)</span> : null}
        </p>
        <p className={style.datePosted}>
          {date} at {time}
        </p>
      </div>
      <p className={style.body}>{data.body}</p>
    </div>
  );
}

export default CommentsSection;
