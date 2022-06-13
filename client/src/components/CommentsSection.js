import React, { useEffect, useState } from 'react';
import formatDate from '../utils/formatDate.js';
import {
  getCommentsForPost,
  createCommentForPost,
  getCommentById,
  getNumCommentsForPost,
} from '../api/comments.js';
import style from '../styles/CommentsSection.module.scss';

const COMMENTS_PER_LOAD = 25;

function CommentsSection({ postAuthor, postId }) {
  const [comments, setComments] = useState([]);
  const [totalNumComments, setTotalNumComments] = useState(0);
  const [page, setPage] = useState(1);

  useEffect(() => {
    async function getAndSetTotalNumComments() {
      const numComments = await getNumCommentsForPost(postId);
      setTotalNumComments(numComments);
    }
    getAndSetTotalNumComments();
  }, [postId]);

  useEffect(() => {
    async function getAndSetComments() {
      const comments = await getCommentsForPost(
        postId,
        COMMENTS_PER_LOAD,
        COMMENTS_PER_LOAD * (page - 1)
      );

      setComments((prevState) => [...prevState, ...comments]);
    }
    getAndSetComments().catch(console.error);
  }, [postId, page]);

  async function handleSubmit(comment) {
    const commentId = await createCommentForPost(comment, postId);
    if (commentId) {
      const newComment = await getCommentById(commentId);
      setComments((prevState) => [newComment, ...prevState]);
      setTotalNumComments(totalNumComments + 1);
    }
  }

  return (
    <div className={style.CommentsSectionContainer}>
      <h1>{totalNumComments} Comments</h1>
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

      {comments.length === totalNumComments ? null : (
        <button onClick={() => setPage(page + 1)}>Load more comments</button>
      )}
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
