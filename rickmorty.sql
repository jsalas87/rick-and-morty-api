--
-- PostgreSQL database dump
--

-- Dumped from database version 15.6
-- Dumped by pg_dump version 16.2

-- Started on 2024-08-08 10:01:39

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 220 (class 1259 OID 24770)
-- Name: Category; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Category" (
    id integer NOT NULL,
    description text NOT NULL
);


ALTER TABLE public."Category" OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 24769)
-- Name: Category_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Category_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Category_id_seq" OWNER TO postgres;

--
-- TOC entry 3415 (class 0 OID 0)
-- Dependencies: 219
-- Name: Category_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Category_id_seq" OWNED BY public."Category".id;


--
-- TOC entry 224 (class 1259 OID 24788)
-- Name: Character; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Character" (
    id integer NOT NULL,
    name text NOT NULL,
    "estatusId" integer NOT NULL,
    "subCategoryId" integer NOT NULL,
    type text NOT NULL,
    gender text NOT NULL,
    image text NOT NULL,
    url text NOT NULL,
    created timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."Character" OWNER TO postgres;

--
-- TOC entry 230 (class 1259 OID 24815)
-- Name: CharacterApparition; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."CharacterApparition" (
    id integer NOT NULL,
    "characterparticipationId" integer NOT NULL,
    finish integer NOT NULL,
    init integer NOT NULL
);


ALTER TABLE public."CharacterApparition" OWNER TO postgres;

--
-- TOC entry 229 (class 1259 OID 24814)
-- Name: CharacterApparition_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."CharacterApparition_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."CharacterApparition_id_seq" OWNER TO postgres;

--
-- TOC entry 3416 (class 0 OID 0)
-- Dependencies: 229
-- Name: CharacterApparition_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."CharacterApparition_id_seq" OWNED BY public."CharacterApparition".id;


--
-- TOC entry 228 (class 1259 OID 24808)
-- Name: CharacterParticipation; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."CharacterParticipation" (
    id integer NOT NULL,
    "episodeId" integer NOT NULL,
    "characterId" integer NOT NULL
);


ALTER TABLE public."CharacterParticipation" OWNER TO postgres;

--
-- TOC entry 227 (class 1259 OID 24807)
-- Name: CharacterParticipation_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."CharacterParticipation_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."CharacterParticipation_id_seq" OWNER TO postgres;

--
-- TOC entry 3417 (class 0 OID 0)
-- Dependencies: 227
-- Name: CharacterParticipation_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."CharacterParticipation_id_seq" OWNED BY public."CharacterParticipation".id;


--
-- TOC entry 223 (class 1259 OID 24787)
-- Name: Character_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Character_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Character_id_seq" OWNER TO postgres;

--
-- TOC entry 3418 (class 0 OID 0)
-- Dependencies: 223
-- Name: Character_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Character_id_seq" OWNED BY public."Character".id;


--
-- TOC entry 226 (class 1259 OID 24798)
-- Name: Episode; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Episode" (
    id integer NOT NULL,
    name text NOT NULL,
    "airDate" text NOT NULL,
    episode text NOT NULL,
    url text NOT NULL,
    created timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    duration integer NOT NULL,
    "estatusId" integer NOT NULL,
    "subCategoryId" integer NOT NULL
);


ALTER TABLE public."Episode" OWNER TO postgres;

--
-- TOC entry 225 (class 1259 OID 24797)
-- Name: Episode_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Episode_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Episode_id_seq" OWNER TO postgres;

--
-- TOC entry 3419 (class 0 OID 0)
-- Dependencies: 225
-- Name: Episode_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Episode_id_seq" OWNED BY public."Episode".id;


--
-- TOC entry 218 (class 1259 OID 24761)
-- Name: Estatus; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Estatus" (
    id integer NOT NULL,
    description text NOT NULL,
    "estatusTypeId" integer NOT NULL
);


ALTER TABLE public."Estatus" OWNER TO postgres;

--
-- TOC entry 216 (class 1259 OID 24712)
-- Name: EstatusType; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."EstatusType" (
    id integer NOT NULL,
    description text NOT NULL
);


ALTER TABLE public."EstatusType" OWNER TO postgres;

--
-- TOC entry 215 (class 1259 OID 24711)
-- Name: EstatusType_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."EstatusType_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."EstatusType_id_seq" OWNER TO postgres;

--
-- TOC entry 3420 (class 0 OID 0)
-- Dependencies: 215
-- Name: EstatusType_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."EstatusType_id_seq" OWNED BY public."EstatusType".id;


--
-- TOC entry 217 (class 1259 OID 24760)
-- Name: Estatus_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Estatus_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Estatus_id_seq" OWNER TO postgres;

--
-- TOC entry 3421 (class 0 OID 0)
-- Dependencies: 217
-- Name: Estatus_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Estatus_id_seq" OWNED BY public."Estatus".id;


--
-- TOC entry 222 (class 1259 OID 24779)
-- Name: SubCategory; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."SubCategory" (
    id integer NOT NULL,
    description text NOT NULL,
    "categoryId" integer NOT NULL
);


ALTER TABLE public."SubCategory" OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 24778)
-- Name: SubCategory_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."SubCategory_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."SubCategory_id_seq" OWNER TO postgres;

--
-- TOC entry 3422 (class 0 OID 0)
-- Dependencies: 221
-- Name: SubCategory_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."SubCategory_id_seq" OWNED BY public."SubCategory".id;


--
-- TOC entry 214 (class 1259 OID 24700)
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);


ALTER TABLE public._prisma_migrations OWNER TO postgres;

--
-- TOC entry 3216 (class 2604 OID 24773)
-- Name: Category id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Category" ALTER COLUMN id SET DEFAULT nextval('public."Category_id_seq"'::regclass);


--
-- TOC entry 3218 (class 2604 OID 24791)
-- Name: Character id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Character" ALTER COLUMN id SET DEFAULT nextval('public."Character_id_seq"'::regclass);


--
-- TOC entry 3223 (class 2604 OID 24818)
-- Name: CharacterApparition id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."CharacterApparition" ALTER COLUMN id SET DEFAULT nextval('public."CharacterApparition_id_seq"'::regclass);


--
-- TOC entry 3222 (class 2604 OID 24811)
-- Name: CharacterParticipation id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."CharacterParticipation" ALTER COLUMN id SET DEFAULT nextval('public."CharacterParticipation_id_seq"'::regclass);


--
-- TOC entry 3220 (class 2604 OID 24801)
-- Name: Episode id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Episode" ALTER COLUMN id SET DEFAULT nextval('public."Episode_id_seq"'::regclass);


--
-- TOC entry 3215 (class 2604 OID 24764)
-- Name: Estatus id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Estatus" ALTER COLUMN id SET DEFAULT nextval('public."Estatus_id_seq"'::regclass);


--
-- TOC entry 3214 (class 2604 OID 24715)
-- Name: EstatusType id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."EstatusType" ALTER COLUMN id SET DEFAULT nextval('public."EstatusType_id_seq"'::regclass);


--
-- TOC entry 3217 (class 2604 OID 24782)
-- Name: SubCategory id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."SubCategory" ALTER COLUMN id SET DEFAULT nextval('public."SubCategory_id_seq"'::regclass);


--
-- TOC entry 3399 (class 0 OID 24770)
-- Dependencies: 220
-- Data for Name: Category; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Category" (id, description) FROM stdin;
1	SPECIES
2	SEASON
\.


--
-- TOC entry 3403 (class 0 OID 24788)
-- Dependencies: 224
-- Data for Name: Character; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Character" (id, name, "estatusId", "subCategoryId", type, gender, image, url, created) FROM stdin;
2	Rick Sanchez	8	1		Male	https://rickandmortyapi.com/api/character/avatar/1.jpeg		2017-11-04 18:48:46.25
3	Morty Smith	8	1		Male	https://rickandmortyapi.com/api/character/avatar/2.jpeg		2017-11-04 18:50:21.651
4	Summer Smith	8	1		Female	https://rickandmortyapi.com/api/character/avatar/3.jpeg		2017-11-04 19:09:56.428
5	Beth Smith	8	1		Female	https://rickandmortyapi.com/api/character/avatar/4.jpeg		2017-11-04 19:22:43.665
6	Jerry Smith	8	1		Male	https://rickandmortyapi.com/api/character/avatar/5.jpeg		2017-11-04 19:26:56.301
7	Abadango Cluster Princess	8	2		Female	https://rickandmortyapi.com/api/character/avatar/6.jpeg		2017-11-04 19:50:28.25
8	Abradolf Lincler	10	1	Genetic experiment	Male	https://rickandmortyapi.com/api/character/avatar/7.jpeg		2017-11-04 19:59:20.523
9	Adjudicator Rick	9	1		Male	https://rickandmortyapi.com/api/character/avatar/8.jpeg		2017-11-04 20:03:34.737
10	Agency Director	9	1		Male	https://rickandmortyapi.com/api/character/avatar/9.jpeg		2017-11-04 20:06:54.976
11	Alan Rails	9	1	Superhuman (Ghost trains summoner)	Male	https://rickandmortyapi.com/api/character/avatar/10.jpeg		2017-11-04 20:19:09.017
12	Albert Einstein	9	1		Male	https://rickandmortyapi.com/api/character/avatar/11.jpeg		2017-11-04 20:20:20.965
13	Alexander	9	1		Male	https://rickandmortyapi.com/api/character/avatar/12.jpeg		2017-11-04 20:32:33.144
14	Alien Googah	10	2		unknown	https://rickandmortyapi.com/api/character/avatar/13.jpeg		2017-11-04 20:33:30.779
15	Alien Morty	10	2		Male	https://rickandmortyapi.com/api/character/avatar/14.jpeg		2017-11-04 20:51:31.373
16	Alien Rick	10	2		Male	https://rickandmortyapi.com/api/character/avatar/15.jpeg		2017-11-04 20:56:13.215
17	Amish Cyborg	9	2	Parasite	Male	https://rickandmortyapi.com/api/character/avatar/16.jpeg		2017-11-04 21:12:45.235
18	Annie	8	1		Female	https://rickandmortyapi.com/api/character/avatar/17.jpeg		2017-11-04 22:21:24.481
19	Antenna Morty	8	1	Human with antennae	Male	https://rickandmortyapi.com/api/character/avatar/18.jpeg		2017-11-04 22:25:29.008
20	Antenna Rick	10	1	Human with antennae	Male	https://rickandmortyapi.com/api/character/avatar/19.jpeg		2017-11-04 22:28:13.756
21	Ants in my Eyes Johnson	10	1	Human with ants in his eyes	Male	https://rickandmortyapi.com/api/character/avatar/20.jpeg		2017-11-04 22:34:53.659
23	Juan Salas	2	1	type	Male	Image	Image	2024-08-07 15:23:28.647
\.


--
-- TOC entry 3409 (class 0 OID 24815)
-- Dependencies: 230
-- Data for Name: CharacterApparition; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."CharacterApparition" (id, "characterparticipationId", finish, init) FROM stdin;
\.


--
-- TOC entry 3407 (class 0 OID 24808)
-- Dependencies: 228
-- Data for Name: CharacterParticipation; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."CharacterParticipation" (id, "episodeId", "characterId") FROM stdin;
\.


--
-- TOC entry 3405 (class 0 OID 24798)
-- Dependencies: 226
-- Data for Name: Episode; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Episode" (id, name, "airDate", episode, url, created, duration, "estatusId", "subCategoryId") FROM stdin;
1	Pilot	41610	S01E01		2017-11-10 12:56:33.798	39	4	4
2	Lawnmower Dog	41617	S01E02		2017-11-10 12:56:33.916	53	3	4
3	Anatomy Park	41624	S01E03		2017-11-10 12:56:34.022	33	3	4
4	M. Night Shaym-Aliens!	41652	S01E04		2017-11-10 12:56:34.129	55	3	4
5	Meeseeks and Destroy	41659	S01E05		2017-11-10 12:56:34.236	42	3	4
6	Rick Potion #9	41666	S01E06		2017-11-10 12:56:34.339	40	4	5
7	Raising Gazorpazorp	41708	S01E07		2017-11-10 12:56:34.441	38	3	5
8	Rixty Minutes	41715	S01E08		2017-11-10 12:56:34.543	48	4	5
9	Something Ricked This Way Comes	41722	S01E09		2017-11-10 12:56:34.645	34	4	4
10	Close Rick-counters of the Rick Kind	41736	S01E10		2017-11-10 12:56:34.747	37	3	5
11	Ricksy Business	41743	S01E11		2017-11-10 12:56:34.85	51	4	4
12	A Rickle in Time	42211	S02E01		2017-11-10 12:56:34.953	39	3	3
13	Mortynight Run	42218	S02E02		2017-11-10 12:56:35.055	37	3	3
14	Auto Erotic Assimilation	42225	S02E03		2017-11-10 12:56:35.158	37	3	5
15	Total Rickall	42232	S02E04		2017-11-10 12:56:35.261	52	4	5
16	Get Schwifty	42239	S02E05		2017-11-10 12:56:35.364	48	4	4
17	The Ricks Must Be Crazy	42246	S02E06		2017-11-10 12:56:35.467	37	3	5
18	Big Trouble in Little Sanchez	42260	S02E07		2017-11-10 12:56:35.569	39	4	5
19	Interdimensional Cable 2: Tempting Fate	42267	S02E08		2017-11-10 12:56:35.669	34	4	4
20	Look Whos Purging Now	42274	S02E09		2017-11-10 12:56:35.772	55	3	5
\.


--
-- TOC entry 3397 (class 0 OID 24761)
-- Dependencies: 218
-- Data for Name: Estatus; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Estatus" (id, description, "estatusTypeId") FROM stdin;
1	ACTIVE	1
2	SUSPENDED	1
3	CANCELLED	2
4	ACTIVE	2
8	ALIVE	1
9	DEAD	1
10	UNKNOWN	1
\.


--
-- TOC entry 3395 (class 0 OID 24712)
-- Dependencies: 216
-- Data for Name: EstatusType; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."EstatusType" (id, description) FROM stdin;
1	CHARACTERS
2	EPISODES
\.


--
-- TOC entry 3401 (class 0 OID 24779)
-- Dependencies: 222
-- Data for Name: SubCategory; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."SubCategory" (id, description, "categoryId") FROM stdin;
1	HUMAN	1
2	ALIEN	1
3	SEASON 1	2
4	SEASON 2	2
5	SEASON 3	2
\.


--
-- TOC entry 3393 (class 0 OID 24700)
-- Dependencies: 214
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
80466113-6efb-45bd-a893-11cb3211e167	53358f2263b92973451145c25be9aeb4197dd4fc33acff0dc9c5ad815019bb1f	2024-08-05 15:16:45.890653-04	20240805191645_migrations	\N	\N	2024-08-05 15:16:45.87931-04	1
8794ae02-3ac5-426f-8ceb-e779bad494c1	26cdd4943ee71a25d292a6039000fdb3b2f0cfa6ceea60d65ba9f7f299cf622a	2024-08-06 11:40:22.126065-04	20240806154022_esquema	\N	\N	2024-08-06 11:40:22.076707-04	1
4f83650f-f6e5-4374-a247-b796dc17ff49	72f11bc7ea38393c7deb1718c2af2d53aa4c28f20920ffb8058aec451e54e76d	2024-08-06 15:22:31.446654-04	20240806192231_min_sec_init_finish	\N	\N	2024-08-06 15:22:31.442663-04	1
2cf89704-4429-45b3-860d-6a06112b4f20	2735b78f8bff18210cac311042353eef73c12bcb6076ee3b473b48a1fb9649f5	2024-08-06 15:24:25.076327-04	20240806192425_min_sec_init_finish	\N	\N	2024-08-06 15:24:25.072766-04	1
0e7803ab-f885-45c8-bd5d-beb62a48e651	cedb300144fad977b16c2c6fed8529de243395f8ac5e2a4a70e3814972e4bd0a	2024-08-07 16:56:00.526492-04	20240807205600_apariciones	\N	\N	2024-08-07 16:56:00.522563-04	1
\.


--
-- TOC entry 3423 (class 0 OID 0)
-- Dependencies: 219
-- Name: Category_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Category_id_seq"', 2, true);


--
-- TOC entry 3424 (class 0 OID 0)
-- Dependencies: 229
-- Name: CharacterApparition_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."CharacterApparition_id_seq"', 14, true);


--
-- TOC entry 3425 (class 0 OID 0)
-- Dependencies: 227
-- Name: CharacterParticipation_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."CharacterParticipation_id_seq"', 13, true);


--
-- TOC entry 3426 (class 0 OID 0)
-- Dependencies: 223
-- Name: Character_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Character_id_seq"', 23, true);


--
-- TOC entry 3427 (class 0 OID 0)
-- Dependencies: 225
-- Name: Episode_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Episode_id_seq"', 20, true);


--
-- TOC entry 3428 (class 0 OID 0)
-- Dependencies: 215
-- Name: EstatusType_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."EstatusType_id_seq"', 2, true);


--
-- TOC entry 3429 (class 0 OID 0)
-- Dependencies: 217
-- Name: Estatus_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Estatus_id_seq"', 10, true);


--
-- TOC entry 3430 (class 0 OID 0)
-- Dependencies: 221
-- Name: SubCategory_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."SubCategory_id_seq"', 5, true);


--
-- TOC entry 3231 (class 2606 OID 24777)
-- Name: Category Category_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Category"
    ADD CONSTRAINT "Category_pkey" PRIMARY KEY (id);


--
-- TOC entry 3241 (class 2606 OID 24822)
-- Name: CharacterApparition CharacterApparition_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."CharacterApparition"
    ADD CONSTRAINT "CharacterApparition_pkey" PRIMARY KEY (id);


--
-- TOC entry 3239 (class 2606 OID 24813)
-- Name: CharacterParticipation CharacterParticipation_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."CharacterParticipation"
    ADD CONSTRAINT "CharacterParticipation_pkey" PRIMARY KEY (id);


--
-- TOC entry 3235 (class 2606 OID 24796)
-- Name: Character Character_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Character"
    ADD CONSTRAINT "Character_pkey" PRIMARY KEY (id);


--
-- TOC entry 3237 (class 2606 OID 24806)
-- Name: Episode Episode_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Episode"
    ADD CONSTRAINT "Episode_pkey" PRIMARY KEY (id);


--
-- TOC entry 3227 (class 2606 OID 24719)
-- Name: EstatusType EstatusType_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."EstatusType"
    ADD CONSTRAINT "EstatusType_pkey" PRIMARY KEY (id);


--
-- TOC entry 3229 (class 2606 OID 24768)
-- Name: Estatus Estatus_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Estatus"
    ADD CONSTRAINT "Estatus_pkey" PRIMARY KEY (id);


--
-- TOC entry 3233 (class 2606 OID 24786)
-- Name: SubCategory SubCategory_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."SubCategory"
    ADD CONSTRAINT "SubCategory_pkey" PRIMARY KEY (id);


--
-- TOC entry 3225 (class 2606 OID 24708)
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- TOC entry 3250 (class 2606 OID 24863)
-- Name: CharacterApparition CharacterApparition_characterparticipationId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."CharacterApparition"
    ADD CONSTRAINT "CharacterApparition_characterparticipationId_fkey" FOREIGN KEY ("characterparticipationId") REFERENCES public."CharacterParticipation"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 3248 (class 2606 OID 24858)
-- Name: CharacterParticipation CharacterParticipation_characterId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."CharacterParticipation"
    ADD CONSTRAINT "CharacterParticipation_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES public."Character"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 3249 (class 2606 OID 24853)
-- Name: CharacterParticipation CharacterParticipation_episodeId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."CharacterParticipation"
    ADD CONSTRAINT "CharacterParticipation_episodeId_fkey" FOREIGN KEY ("episodeId") REFERENCES public."Episode"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 3244 (class 2606 OID 24833)
-- Name: Character Character_estatusId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Character"
    ADD CONSTRAINT "Character_estatusId_fkey" FOREIGN KEY ("estatusId") REFERENCES public."Estatus"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 3245 (class 2606 OID 24838)
-- Name: Character Character_subCategoryId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Character"
    ADD CONSTRAINT "Character_subCategoryId_fkey" FOREIGN KEY ("subCategoryId") REFERENCES public."SubCategory"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 3246 (class 2606 OID 24843)
-- Name: Episode Episode_estatusId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Episode"
    ADD CONSTRAINT "Episode_estatusId_fkey" FOREIGN KEY ("estatusId") REFERENCES public."Estatus"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 3247 (class 2606 OID 24848)
-- Name: Episode Episode_subCategoryId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Episode"
    ADD CONSTRAINT "Episode_subCategoryId_fkey" FOREIGN KEY ("subCategoryId") REFERENCES public."SubCategory"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 3242 (class 2606 OID 24823)
-- Name: Estatus Estatus_estatusTypeId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Estatus"
    ADD CONSTRAINT "Estatus_estatusTypeId_fkey" FOREIGN KEY ("estatusTypeId") REFERENCES public."EstatusType"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 3243 (class 2606 OID 24828)
-- Name: SubCategory SubCategory_categoryId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."SubCategory"
    ADD CONSTRAINT "SubCategory_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES public."Category"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


-- Completed on 2024-08-08 10:01:39

--
-- PostgreSQL database dump complete
--

