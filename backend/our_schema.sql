-- users
-- badges
-- posts
-- tag_posts
-- tags
-- comments
-- post_history

-- Example of schema 
-- The schema does not include any indexes ( except PK's )

-- Users
--reputation calculated as (upvotes-downvotes)*10
CREATE TABLE users (
   account_id INTEGER AUTO_INCREMENT PRIMARY KEY,
   reputation INTEGER DEFAULT 0,
   views INTEGER DEFAULT 0,
   down_votes INTEGER DEFAULT 0,
   up_votes INTEGER DEFAULT 0,
    display_name VARCHAR(255) NOT NULL UNIQUE,
   profile_image_url VARCHAR(255),
   website_url VARCHAR(255),
   about_me TEXT,
   creation_date TIMESTAMP NOT NULL,
   last_access_date TIMESTAMP NOT NULL,
    password VARCHAR (255) NOT NULL
);

-- Badges
CREATE TABLE badges (
   account_id INTEGER NOT NULL,
   name VARCHAR(64) NOT NULL,
   work_location VARCHAR(50) ,
    FOREIGN KEY (account_id) REFERENCES users(account_id),
    PRIMARY KEY (account_id,name)
);

-- Posts
CREATE TABLE posts (
   post_id INTEGER AUTO_INCREMENT PRIMARY KEY,
   owner_display_name VARCHAR(255),
   last_editor_display_name VARCHAR(255),
   last_edit_date TIMESTAMP,
   post_type_id SMALLINT NOT NULL,
   is_accepted_answer BOOLEAN NOT NULL,
    up_vote INTEGER DEFAULT 0 NOT NULL,
    down_vote INTEGER DEFAULT 0 NOT NULL,
   score INTEGER NOT NULL,
   parent_id INTEGER,
   views INTEGER,
   acc_ans_count INTEGER DEFAULT 0,
   comment_count INTEGER DEFAULT 0,
   post_title VARCHAR(512),
   content_license VARCHAR(64) NOT NULL,
   body_text TEXT,
   creation_date TIMESTAMP NOT NULL,
   closed_date TIMESTAMP,
    FOREIGN KEY (owner_display_name) REFERENCES users(display_name),
    FOREIGN KEY (last_editor_display_name) REFERENCES users(display_name)
);

-- PostHistory -- to count no of views and no of users
CREATE TABLE post_history (
   post_id INT NOT NULL,
   display_name VARCHAR(255),
   PRIMARY KEY (post_id,display_name),
    FOREIGN KEY (display_name) REFERENCES users(display_name),
    FOREIGN KEY (post_id) REFERENCES posts(post_id)
); 

-- Comments
CREATE TABLE comments (
   post_id INTEGER NOT NULL,
   display_name VARCHAR(255),
    comment_text VARCHAR(500),
    PRIMARY KEY (post_id,display_name,comment_text) ,
    FOREIGN KEY (post_id) REFERENCES posts(post_id),
    FOREIGN KEY (display_name) REFERENCES users(display_name)
);

-- tag_posts
CREATE TABLE tag_posts (
   post_id INTEGER,
   tag_id INTEGER,
    FOREIGN KEY (post_id) REFERENCES posts(post_id),
    FOREIGN KEY (tag_id) REFERENCES tags(tag_id)
);



-- Tags
CREATE TABLE tags (
   tag_id INTEGER AUTO_INCREMENT UNIQUE,
   tag_name VARCHAR(255) PRIMARY KEY,
   tag_count INTEGER DEFAULT 0
);



git clone https://github.com/SkobelevIgor/stackexchange-xml-converter
cd stackexchange-xml-converter/
go build

./stackexchange-xml-converter -result-format=csv -source-path=/home/rohith/Desktop/Sem4\ Mat/DBMS/As2/CQA_Web/softwareengineering.stackexchange.com/Badges.xml -store-to-dir=/home/rohith/Desktop/Sem4\ Mat/DBMS/As2/CSV_Views

./stackexchange-xml-converter -result-format=csv -source-path=/home/rohith/Desktop/Sem4\ Mat/DBMS/As2/CQA_Web/softwareengineering.stackexchange.com/Comments.xml -store-to-dir=/home/rohith/Desktop/Sem4\ Mat/DBMS/As2/CSV_Views



./stackexchange-xml-converter -result-format=csv -source-path=/home/rohith/Desktop/Sem4\ Mat/DBMS/As2/CQA_Web/softwareengineering.stackexchange.com/PostHistory.xml -store-to-dir=/home/rohith/Desktop/Sem4\ Mat/DBMS/As2/CSV_Views

./stackexchange-xml-converter -result-format=csv -source-path=/home/rohith/Desktop/Sem4\ Mat/DBMS/As2/CQA_Web/softwareengineering.stackexchange.com/PostLinks.xml -store-to-dir=/home/rohith/Desktop/Sem4\ Mat/DBMS/As2/CSV_Views

./stackexchange-xml-converter -result-format=csv -source-path=/home/rohith/Desktop/Sem4\ Mat/DBMS/As2/CQA_Web/softwareengineering.stackexchange.com/Posts.xml -store-to-dir=/home/rohith/Desktop/Sem4\ Mat/DBMS/As2/CSV_Views

./stackexchange-xml-converter -result-format=csv -source-path=/home/rohith/Desktop/Sem4\ Mat/DBMS/As2/CQA_Web/softwareengineering.stackexchange.com/Tags.xml -store-to-dir=/home/rohith/Desktop/Sem4\ Mat/DBMS/As2/CSV_Views

./stackexchange-xml-converter -result-format=csv -source-path=/home/rohith/Desktop/Sem4\ Mat/DBMS/As2/CQA_Web/softwareengineering.stackexchange.com/Users.xml -store-to-dir=/home/rohith/Desktop/Sem4\ Mat/DBMS/As2/CSV_Views

./stackexchange-xml-converter -result-format=csv -source-path=/home/rohith/Desktop/Sem4\ Mat/DBMS/As2/CQA_Web/softwareengineering.stackexchange.com/Votes.xml -store-to-dir=/home/rohith/Desktop/Sem4\ Mat/DBMS/As2/CSV_Views


.import /home/rohith/Desktop/Sem4Mat/DBMS/As2/CSV_Views/Users.csv 


with posts_tag (post_id) as
(
   select A.post_id as post_id
   FROM tag_posts as A,tags as B
   WHERE A.tag_id=B.tag_id and (B.tag_name='Python' or B.tag_name='C' or B.tag_name='D')
   ----------------------------This sentence done 
)
select E.post_id,E.owner_display_name,E.last_editor_display_name,E.last_edit_date,E.up_vote,E.down_vote,E.score,E.acc_ans_count,E.post_title,E.content_license,E.body_text,E.creation_date,E.closed_date
from posts as E,posts_tag as C
WHERE E.post_id=C.post_id and post_type_id=1;



./stackexchange-xml-converter -result-format=csv -source-path=/home/rohith/Desktop/Sem4Mat/DBMS/As2/CQA_Web/softwareengineering.stackexchange.com/Tags.xml -store-to-dir=/home/rohith/Desktop/Sem4Mat/DBMS/As2/CSV_Views


   