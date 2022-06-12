import React, { useEffect, useState } from 'react';
import { formatDateWithTime } from '../utils/formatDate.js';
import style from '../styles/CommentsSection.module.scss';

function CommentsSection({ postAuthor, postId }) {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    async function getComments() {
      try {
        const response = await fetch(`/api/comments/?postId=${postId}`);
        console.log(response);
        const comments = await response.json();
        setComments(comments);
      } catch (error) {}
    }
    getComments();
  }, [postId]);

  async function handleSubmit(comment) {
    try {
      let response = await fetch(`/api/comments/`, {
        method: 'POST',
        mode: 'cors',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ postId: postId, body: comment }),
      });

      // Should probably put this into a separate function
      if (response.status === 201) {
        console.log(response.headers.get('Location'));
        response = await fetch(`/api/comments${response.headers.get('Location')}`);
        const newComment = await response.json();
        setComments((prevState) => [newComment, ...prevState]);
      }
    } catch (error) {
      console.error(error);
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
  return (
    <div className={style.CommentContainer} id='comments'>
      <div>
        <p className={style.author}>
          {data.author ? data.author : 'Anonymous'}
          {isPostAuthor ? <span className={style.postAuthorBadge}> (Post Author)</span> : null}
        </p>
        <p className={style.datePosted}>{formatDateWithTime(data.created_on)}</p>
      </div>
      <p className={style.body}>{data.body}</p>
    </div>
  );
}

export default CommentsSection;
