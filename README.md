# PERN Stack Blog App

A simple full-stack blog application built with PostgreSQL, Express, React, Node.

## Features

- User registration and authentication
- Registered users can create, update, and delete blog posts
- Comment system

## Built With

**Client:** React, SCSS Modules

**Server:** Node, Express, PostgreSQL, AWS S3 Buckets

## Prerequisites

- PostgreSQL - [Download & install PostgreSQL](https://www.postgresql.org/download/) and make sure it's running. Set up the database using the `setup.sql` file found in the `server` folder.
- AWS S3 - This project uses [AWS S3](https://aws.amazon.com/s3/) buckets to store images uploaded by blog users. Checkout [this video](https://youtu.be/yGYeYJpRWPM?si=gkEvoCORm4hcUgO8&t=264) on how to set up the bucket. When creating an IAM policy for the Express backend ([9:12 in video](https://youtu.be/yGYeYJpRWPM?si=dA3-66AGo6wr-fx0&t=552)), make sure to add the DeleteObject permission in addition to the PutObject permission.

## Running the app locally

Clone the project:

```bash
git clone https://github.com/jacquelineb/pern-stack-blog.git
```

Go to the project directory:

```bash
cd pern-stack-blog
```

### Server setup

Go to the project's server directory:

```bash
cd server
```

Set up the environment variables in a `.env` file. See `.env.example`.

Set up the database. Make sure your Postgres server is running:

```bash
psql setup.sql
```

Install dependencies:

```bash
npm install
```

Start the server:

```bash
npm start
```

### Client setup

Go to the project's client directory:

```bash
cd ../client
```

Install dependencies:

```bash
npm install
```

Run the app in development mode:

```bash
npm start
```

Open <http://localhost:3000> to view in browser.
