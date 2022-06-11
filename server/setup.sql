CREATE DATABASE my_blog;

\c my_blog;

CREATE TABLE IF NOT EXISTS blog_user (
  id SERIAL PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL CHECK(username <> ''),
  email VARCHAR(255) UNIQUE NOT NULL CHECK(email <> ''),
  hashed_password VARCHAR(255) NOT NULL CHECK(hashed_password <> ''),
  bio VARCHAR(160) NOT NULL DEFAULT '',
  avatar TEXT NOT NULL DEFAULT ''
);

CREATE TABLE IF NOT EXISTS post (
  id SERIAL PRIMARY KEY,
  author_id INTEGER NOT NULL REFERENCES blog_user(id),
  title VARCHAR(255) NOT NULL CHECK(title <> ''),
  body JSONB[] NOT NULL CHECK(body <> '{}'),
  created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS comment (
  id SERIAL PRIMARY KEY,
  post_id INTEGER NOT NULL REFERENCES post(id) ON DELETE CASCADE,
  author_id INTEGER REFERENCES blog_user(id),
  body VARCHAR(1000) NOT NULL CHECK(body <> ''),
  created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
