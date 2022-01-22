--
-- PostgreSQL database dump
--

-- Dumped from database version 14.0
-- Dumped by pg_dump version 14.0

-- Started on 2021-12-17 17:23:32

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
-- TOC entry 212 (class 1259 OID 16425)
-- Name: operation; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.operation (
    id integer NOT NULL,
    user_id integer NOT NULL,
    description text,
    is_come boolean,
    time_stamp timestamp without time zone,
    value_cash_flow bigint
);


ALTER TABLE public.operation OWNER TO postgres;

--
-- TOC entry 211 (class 1259 OID 16424)
-- Name: operation_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.operation_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.operation_id_seq OWNER TO postgres;

--
-- TOC entry 3320 (class 0 OID 0)
-- Dependencies: 211
-- Name: operation_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.operation_id_seq OWNED BY public.operation.id;


--
-- TOC entry 210 (class 1259 OID 16416)
-- Name: user_cash_flow; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.user_cash_flow (
    id integer NOT NULL,
    email text,
    password_user text,
    company_name text,
    phone_number text
);


ALTER TABLE public.user_cash_flow OWNER TO postgres;

--
-- TOC entry 209 (class 1259 OID 16415)
-- Name: user_cash_flow_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.user_cash_flow_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.user_cash_flow_id_seq OWNER TO postgres;

--
-- TOC entry 3321 (class 0 OID 0)
-- Dependencies: 209
-- Name: user_cash_flow_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.user_cash_flow_id_seq OWNED BY public.user_cash_flow.id;


--
-- TOC entry 3170 (class 2604 OID 16428)
-- Name: operation id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.operation ALTER COLUMN id SET DEFAULT nextval('public.operation_id_seq'::regclass);


--
-- TOC entry 3169 (class 2604 OID 16419)
-- Name: user_cash_flow id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_cash_flow ALTER COLUMN id SET DEFAULT nextval('public.user_cash_flow_id_seq'::regclass);


--
-- TOC entry 3174 (class 2606 OID 16432)
-- Name: operation operation_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.operation
    ADD CONSTRAINT operation_pkey PRIMARY KEY (id);


--
-- TOC entry 3172 (class 2606 OID 16423)
-- Name: user_cash_flow user_cash_flow_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_cash_flow
    ADD CONSTRAINT user_cash_flow_pkey PRIMARY KEY (id);


--
-- TOC entry 3175 (class 2606 OID 16433)
-- Name: operation fk_user_cash_flow; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.operation
    ADD CONSTRAINT fk_user_cash_flow FOREIGN KEY (user_id) REFERENCES public.user_cash_flow(id);


-- Completed on 2021-12-17 17:23:33

--
-- PostgreSQL database dump complete
--

