import Database from "better-sqlite3";

const db = new Database('./data.db', {
    verbose: console.log

})

db.exec(`
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS userSubreddits;
DROP TABLE IF EXISTS subreddits;
DROP TABLE IF EXISTS posts;
DROP TABLE IF EXISTS postsLike;
DROP TABLE IF EXISTS comments;
DROP TABLE IF EXISTS commentLikes;

CREATE TABLE users (
    id INTEGER,
    name TEXT NOT NULL,
    lastname TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL UNIQUE,
    username TEXT NOT NULL UNIQUE,
    createdAt DATE,
    PRIMARY KEY (id),
    CHECK(name <> ''),
    CHECK(email <> ''),
    CHECK(password <> '')
);

CREATE TABLE userSubreddits (
    id INTEGER,
    userId INTEGER,
    subredditId INTEGER,
    PRIMARY KEY (id),
    FOREIGN KEY (userId) REFERENCES users(id),
    FOREIGN KEY (subredditId) REFERENCES subreddits(id)

);

CREATE TABLE subreddits (
    id INTEGER,
    name TEXT,
    content TEXT,
    userSubredditsId INTEGER,
    PRIMARY KEY (id),
    FOREIGN KEY (userSubredditsId) REFERENCES userSubreddits(id)
);

CREATE TABLE posts (
    id INTEGER,
    userId INTEGER,
    subredditId INTEGER,
    title TEXT,
    content TEXT,
    createdAt DATE,
    PRIMARY KEY (id),
    FOREIGN KEY (userId) REFERENCES users(id),
    FOREIGN KEY (subredditId) REFERENCES subreddits(id)
);

CREATE TABLE postsLike (
    id INTEGER,
    userId INTEGER,
    postId INTEGER,
    PRIMARY KEY (id),
    FOREIGN KEY (userId) REFERENCES users(id), 
    FOREIGN KEY (postId) REFERENCES posts(id)
);

CREATE TABLE comments (
    id INTEGER,
    content TEXT,
    userId INTEGER,
    postId INTEGER,
    subredditId INTEGER,
    createdAt DATE,
    PRIMARY KEY (id),
    FOREIGN KEY (userId) REFERENCES users(id),
    FOREIGN KEY (postId) REFERENCES posts(id),
    FOREIGN KEY (subredditId) REFERENCES subreddits(id)
);

CREATE TABLE commentLikes (
    id INTEGER,
    userId INTEGER,
    commentId INTEGER,
    PRIMARY KEY (id),
    FOREIGN KEY (userId) REFERENCES users(id),
    FOREIGN KEY (commentId) REFERENCES comments(id)
);

`)

const users = [
    {
        name: "Elidon",
        lastname: "Morina",
        email: "elidon@live.com",
        password: "elidonmorina",
        username: "elidonn"
    },

    {
        name: "Super",
        lastname: "Admin",
        email: "admin@live.com",
        password: "supersuper",
        username: "superadmin"
    }
]

const createUsers = db.prepare(`
INSERT INTO users (name, lastname, email, password, username) VALUES (?,?,?,?,?);
`)

for (const user of users) {
    createUsers.run(user.name, user.lastname, user.email, user.password, user.username)
}

const userSubreddits = [
    {
        userId: 1,
        subredditId: 1
    },
    {
        userId: 2,
        subredditId: 2
    }
]

const createUserSubreddits = db.prepare(`
INSERT INTO userSubreddits (userId, subredditId) VALUES (?,?);
`);

for (const userSubreddit of userSubreddits) {
    createUserSubreddits.run(userSubreddit.userId, userSubreddit.subredditId)
}

const subreddits = [
    {

        name: "meme lords",
        content: "meme factory",
    },
    {
        name: "love story",
        content: "69 went wrong"
    }
]

const createSubreddits = db.prepare(`
INSERT INTO subreddits (name, content) VALUES (?,?);
`)

for (const subreddit of subreddits) {
    createSubreddits.run(subreddit.name, subreddit.content)
}

const posts = [
    {
        userId: 1,
        subredditId: 1,
        title: "monday",
        content: "morning",
        createdAt: "03/05/2022"
    },
    {
        userId: 2,
        subredditId: 2,
        title: "monday",
        content: "afternoon",
        createdAt: "03/05/2022"
    }
]

const createPosts = db.prepare(`
INSERT INTO posts (userId, subredditId, title, content, createdAt) VALUES (?,?,?,?,?);
`)

for (const post of posts) {
    createPosts.run(post.userId, post.subredditId, post.title, post.content, post.createdAt)
}

const postsLike = [
    {
        userId: 1,
        postId: 1
    },
    {
        userId: 2,
        postId: 2
    }
]

const createPostsLike = db.prepare(`
INSERT INTO postsLike (userId, postId) VALUES (?,?);
`)

for (const postLike of postsLike) {
    createPostsLike.run(postLike.userId, postLike.postId)
}

const comments = [
    {
        content: "teaser",
        userId: 1,
        postId: 1,
        subredditId: 2,
        createdAt: "03/05/2022"
    },
    {
        content: "model x",
        userId: 2,
        postId: 2,
        subredditId: 1,
        createdAt: "03/05/2022"
    }
]

const createComments = db.prepare(`
INSERT INTO comments(content,userId,postId,subredditId,createdAt) VALUES (?,?,?,?,?);
`)

for (const comment of comments) {
    createComments.run(comment.content, comment.userId, comment.postId, comment.subredditId, comment.createdAt)
}

const commentLikes = [
    {
        userId: 1,
        commentId: 2
    },
    {
        userId: 2,
        commentId: 1
    }
]

const createCommentLikes = db.prepare(`
INSERT INTO commentLikes (userId, commentId) VALUES (?, ?);
`)

for (const commentLike of commentLikes) {
    createCommentLikes.run(commentLike.userId, commentLike.commentId)
}