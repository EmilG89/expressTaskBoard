-- Up

CREATE TABLE tasks (
    id INTEGER PRIMARY KEY,
    header TEXT NOT NULL,
    description TEXT NOT NULL,
    color TEXT NOT NULL
);

-- Down

DROP TABLE tasks;