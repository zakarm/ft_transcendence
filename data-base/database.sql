SELECT 'CREATE DATABASE db_member;'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'db_member')\gexec

\c db_member;

BEGIN;

CREATE TABLE IF NOT EXISTS public."authentication_users" 
(
    id serial NOT NULL PRIMARY KEY,
    password varchar(128) NOT NULL,
    last_login timestamp with time zone NOT NULL,
    is_superuser boolean NOT NULL,
    username varchar(150) NOT NULL UNIQUE,
    first_name varchar(30) NOT NULL,
    last_name varchar(30) NOT NULL,
    email varchar(254) NOT NULL,
    is_staff boolean NOT NULL,
    is_active boolean NOT NULL,
    date_joined timestamp with time zone NOT NULL,
    image_url varchar(200) NOT NULL,
    cover_url varchar(200) NOT NULL,
);

CREATE TABLE IF NOT EXISTS public."Achievements"
(
    achievement_id serial NOT NULL,
    achiev_name varchar(45) NOT NULL,
    xp_to_get real NOT NULL,
    CONSTRAINT "Achievements_pkey" PRIMARY KEY (achievement_id)
);

CREATE TABLE IF NOT EXISTS public."Friendship"
(
    freindship_id serial NOT NULL,
    user_from integer NOT NULL,
    user_to integer NOT NULL,
    is_accepted boolean NOT NULL,
    PRIMARY KEY (freindship_id)
);

CREATE TABLE IF NOT EXISTS public."Messages"
(
    user_one integer NOT NULL,
    user_two integer NOT NULL,
    message_content varchar(512) NOT NULL,
    message_date date NOT NULL,
    message_direction varchar(20) NOT NULL,
    CONSTRAINT "Messages_pkey" PRIMARY KEY (user_one, user_two)
);

CREATE TABLE IF NOT EXISTS public."Matches"
(
    match_id serial NOT NULL,
    user_one integer NOT NULL,
    user_two integer NOT NULL,
    score_user_one integer NOT NULL,
    score_user_two integer NOT NULL,
    match_start date NOT NULL,
    match_end date NOT NULL,
    tackle_user_one integer NOT NULL,
    tackle_user_two integer NOT NULL,
    CONSTRAINT "Matches_pkey" PRIMARY KEY (match_id)
);

CREATE TABLE IF NOT EXISTS public."UserAchievements"
(
    id integer NOT NULL,
    achivement_id integer NOT NULL,
    achive_date date NOT NULL,
    PRIMARY KEY (id, achivement_id)
);

CREATE TABLE IF NOT EXISTS public."Tournaments"
(
    tournament_id serial NOT NULL,
    tournament_name varchar(30) NOT NULL,
    tournament_start date NOT NULL,
    tournament_end date NOT NULL,
    PRIMARY KEY (tournament_id)
);

CREATE TABLE IF NOT EXISTS public."TournamentsMatches"
(
    tournament_id integer NOT NULL,
    match_id integer NOT NULL,
    tournament_round varchar(30) NOT NULL,
    PRIMARY KEY (tournament_id, match_id)
);

ALTER TABLE IF EXISTS public."Friendship"
    ADD CONSTRAINT user_from FOREIGN KEY (user_from)
    REFERENCES public."authentication_users" (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS public."Friendship"
    ADD CONSTRAINT user_to FOREIGN KEY (user_to)
    REFERENCES public."authentication_users" (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS public."Messages"
    ADD CONSTRAINT user_one FOREIGN KEY (user_one)
    REFERENCES public."authentication_users" (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS public."Messages"
    ADD CONSTRAINT user_two FOREIGN KEY (user_two)
    REFERENCES public."authentication_users" (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS public."Matches"
    ADD CONSTRAINT user_one FOREIGN KEY (user_one)
    REFERENCES public."authentication_users" (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS public."Matches"
    ADD CONSTRAINT user_two FOREIGN KEY (user_two)
    REFERENCES public."authentication_users" (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS public."UserAchievements"
    ADD CONSTRAINT id FOREIGN KEY (id)
    REFERENCES public."authentication_users" (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS public."UserAchievements"
    ADD CONSTRAINT achivement_id FOREIGN KEY (achivement_id)
    REFERENCES public."Achievements" (achievement_id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS public."TournamentsMatches"
    ADD CONSTRAINT tournament_id FOREIGN KEY (tournament_id)
    REFERENCES public."Tournaments" (tournament_id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS public."TournamentsMatches"
    ADD CONSTRAINT match_id FOREIGN KEY (match_id)
    REFERENCES public."Matches" (match_id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;

END;