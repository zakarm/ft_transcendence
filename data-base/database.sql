DO $$
BEGIN
    IF NOT EXISTS (SELECT FROM pg_database WHERE datname = 'transcendence') THEN
        CREATE DATABASE transcendence;
    END IF;
END $$;

\c transcendence;

BEGIN;


CREATE TABLE IF NOT EXISTS public."Achievements"
(
    achievement_id serial NOT NULL,
    achiev_name character(45) COLLATE pg_catalog."default" NOT NULL,
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
    message_content character(512) COLLATE pg_catalog."default" NOT NULL,
    message_date date NOT NULL,
    message_direction character(20) COLLATE pg_catalog."default" NOT NULL,
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

CREATE TABLE IF NOT EXISTS public."Users"
(
    user_id serial NOT NULL,
    first_name character(20) COLLATE pg_catalog."default" NOT NULL,
    last_name character(20) COLLATE pg_catalog."default" NOT NULL,
    nick_name character(20) COLLATE pg_catalog."default" NOT NULL,
    email character(60) COLLATE pg_catalog."default" NOT NULL,
    user_xp real NOT NULL,
    image_url character(200) COLLATE pg_catalog."default" NOT NULL,
    cover_url character(200) COLLATE pg_catalog."default" NOT NULL,
    first_log date NOT NULL,
    last_log date NOT NULL,
    is_log boolean NOT NULL,
    is_two_fact boolean NOT NULL,
    two_fact_secret character(200) COLLATE pg_catalog."default" NOT NULL,
    country character(60) COLLATE pg_catalog."default" NOT NULL,
    city character(60) COLLATE pg_catalog."default" NOT NULL,
    password character(200) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT "Users_pkey" PRIMARY KEY (user_id)
);

CREATE TABLE IF NOT EXISTS public."UserAchievements"
(
    user_id integer NOT NULL,
    achivement_id integer NOT NULL,
    achive_date date NOT NULL,
    PRIMARY KEY (user_id, achivement_id)
);

CREATE TABLE IF NOT EXISTS public."Tournaments"
(
    tournament_id serial NOT NULL,
    tournament_name character(30) NOT NULL,
    tournament_start date NOT NULL,
    tournament_end date NOT NULL,
    PRIMARY KEY (tournament_id)
);

CREATE TABLE IF NOT EXISTS public."TournamentsMatches"
(
    tournament_id integer NOT NULL,
    match_id integer NOT NULL,
    tournament_round character(30) NOT NULL,
    PRIMARY KEY (tournament_id, match_id)
);

ALTER TABLE IF EXISTS public."Friendship"
    ADD CONSTRAINT user_from FOREIGN KEY (user_from)
    REFERENCES public."Users" (user_id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS public."Friendship"
    ADD CONSTRAINT user_to FOREIGN KEY (user_to)
    REFERENCES public."Users" (user_id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS public."Messages"
    ADD CONSTRAINT user_one FOREIGN KEY (user_one)
    REFERENCES public."Users" (user_id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS public."Messages"
    ADD CONSTRAINT user_two FOREIGN KEY (user_two)
    REFERENCES public."Users" (user_id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS public."Matches"
    ADD CONSTRAINT user_one FOREIGN KEY (user_one)
    REFERENCES public."Users" (user_id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS public."Matches"
    ADD CONSTRAINT user_two FOREIGN KEY (user_two)
    REFERENCES public."Users" (user_id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS public."UserAchievements"
    ADD CONSTRAINT user_id FOREIGN KEY (user_id)
    REFERENCES public."Users" (user_id) MATCH SIMPLE
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