CREATE DATABASE transcendence;

\c transcendence;

BEGIN;


CREATE TABLE IF NOT EXISTS public."Achievements"
(
    achievement_id serial NOT NULL,
    user_id integer NOT NULL,
    achiev_name character(45) COLLATE pg_catalog."default" NOT NULL,
    xp_to_get real NOT NULL,
    CONSTRAINT "Achievements_pkey" PRIMARY KEY (achievement_id)
);

CREATE TABLE IF NOT EXISTS public."Friendship"
(
    user_from integer NOT NULL,
    user_to integer NOT NULL,
    is_accepted boolean NOT NULL,
    CONSTRAINT "Friendship_pkey" PRIMARY KEY (user_from, user_to)
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

CREATE TABLE IF NOT EXISTS public."Rgames"
(
    id_rgame serial NOT NULL,
    user_one integer NOT NULL,
    user_two integer NOT NULL,
    score_user_one integer NOT NULL,
    score_user_two integer NOT NULL,
    game_start date NOT NULL,
    game_end date NOT NULL,
    CONSTRAINT "Rgames_pkey" PRIMARY KEY (id_rgame)
);

CREATE TABLE IF NOT EXISTS public."Users"
(
    user_id serial NOT NULL,
    first_name character(20) COLLATE pg_catalog."default" NOT NULL,
    last_name character(20) COLLATE pg_catalog."default" NOT NULL,
    nick_name character(20) COLLATE pg_catalog."default" NOT NULL,
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

CREATE TABLE IF NOT EXISTS public."Tgames"
(
    id_tgame serial NOT NULL,
    rgame_one integer NOT NULL,
    rgame_two integer NOT NULL,
    rgame_three integer NOT NULL,
    rgame_four integer NOT NULL,
    game_start date NOT NULL,
    game_end date NOT NULL,
    PRIMARY KEY (id_tgame)
);

ALTER TABLE IF EXISTS public."Achievements"
    ADD CONSTRAINT user_id FOREIGN KEY (user_id)
    REFERENCES public."Users" (user_id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


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


ALTER TABLE IF EXISTS public."Rgames"
    ADD CONSTRAINT user_one FOREIGN KEY (user_one)
    REFERENCES public."Users" (user_id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS public."Rgames"
    ADD CONSTRAINT user_two FOREIGN KEY (user_two)
    REFERENCES public."Users" (user_id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS public."Tgames"
    ADD CONSTRAINT rgame_one FOREIGN KEY (rgame_one)
    REFERENCES public."Rgames" (id_rgame) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS public."Tgames"
    ADD CONSTRAINT rgame_two FOREIGN KEY (rgame_two)
    REFERENCES public."Rgames" (id_rgame) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS public."Tgames"
    ADD CONSTRAINT rgame_three FOREIGN KEY (rgame_three)
    REFERENCES public."Rgames" (id_rgame) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS public."Tgames"
    ADD CONSTRAINT rgame_four FOREIGN KEY (rgame_four)
    REFERENCES public."Rgames" (id_rgame) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;

END;