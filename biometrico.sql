PGDMP         ,                w         
   biometrico    11.2    11.1 D    \           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                       false            ]           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                       false            ^           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                       false            _           1262    82131 
   biometrico    DATABASE     �   CREATE DATABASE biometrico WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'Spanish_Spain.1252' LC_CTYPE = 'Spanish_Spain.1252';
    DROP DATABASE biometrico;
             postgres    false            �            1259    82182    Perfil    TABLE     X   CREATE TABLE public."Perfil" (
    id integer NOT NULL,
    nombre character varying
);
    DROP TABLE public."Perfil";
       public         postgres    false            �            1259    82180    Perfil_id_seq    SEQUENCE     �   CREATE SEQUENCE public."Perfil_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE public."Perfil_id_seq";
       public       postgres    false    204            `           0    0    Perfil_id_seq    SEQUENCE OWNED BY     C   ALTER SEQUENCE public."Perfil_id_seq" OWNED BY public."Perfil".id;
            public       postgres    false    203            �            1259    82235 
   asistencia    TABLE       CREATE TABLE public.asistencia (
    id integer NOT NULL,
    id_trabajador integer,
    imagen character varying,
    created_at timestamp without time zone,
    updated_at timestamp without time zone,
    tipo_registro boolean DEFAULT false,
    tipo_llegada smallint
);
    DROP TABLE public.asistencia;
       public         postgres    false            a           0    0    COLUMN asistencia.tipo_registro    COMMENT     T   COMMENT ON COLUMN public.asistencia.tipo_registro IS 'false: mañana, true: tarde';
            public       postgres    false    210            b           0    0    COLUMN asistencia.tipo_llegada    COMMENT     U   COMMENT ON COLUMN public.asistencia.tipo_llegada IS 'false: temprano , true: tarde';
            public       postgres    false    210            �            1259    82233    asistencia_id_seq    SEQUENCE     �   CREATE SEQUENCE public.asistencia_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public.asistencia_id_seq;
       public       postgres    false    210            c           0    0    asistencia_id_seq    SEQUENCE OWNED BY     G   ALTER SEQUENCE public.asistencia_id_seq OWNED BY public.asistencia.id;
            public       postgres    false    209            �            1259    82221    cargo    TABLE     i   CREATE TABLE public.cargo (
    id integer NOT NULL,
    cargo character varying,
    id_ente integer
);
    DROP TABLE public.cargo;
       public         postgres    false            �            1259    82219    cargo_id_seq    SEQUENCE     �   CREATE SEQUENCE public.cargo_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.cargo_id_seq;
       public       postgres    false    208            d           0    0    cargo_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.cargo_id_seq OWNED BY public.cargo.id;
            public       postgres    false    207            �            1259    82256    config    TABLE     �   CREATE TABLE public.config (
    id integer NOT NULL,
    entrada_minuto_extra integer,
    salida_minuto_extra integer,
    id_ente integer
);
    DROP TABLE public.config;
       public         postgres    false            �            1259    82254    config_id_seq    SEQUENCE     �   CREATE SEQUENCE public.config_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 $   DROP SEQUENCE public.config_id_seq;
       public       postgres    false    212            e           0    0    config_id_seq    SEQUENCE OWNED BY     ?   ALTER SEQUENCE public.config_id_seq OWNED BY public.config.id;
            public       postgres    false    211            �            1259    82164    departamento    TABLE     w   CREATE TABLE public.departamento (
    id integer NOT NULL,
    departamento character varying,
    id_ente integer
);
     DROP TABLE public.departamento;
       public         postgres    false            �            1259    82162    departamento_id_seq    SEQUENCE     �   CREATE SEQUENCE public.departamento_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 *   DROP SEQUENCE public.departamento_id_seq;
       public       postgres    false    201            f           0    0    departamento_id_seq    SEQUENCE OWNED BY     K   ALTER SEQUENCE public.departamento_id_seq OWNED BY public.departamento.id;
            public       postgres    false    200            �            1259    82145    ente    TABLE     k   CREATE TABLE public.ente (
    id integer NOT NULL,
    ente character varying,
    direccion_ente text
);
    DROP TABLE public.ente;
       public         postgres    false            �            1259    82143    ente_id_seq    SEQUENCE     �   CREATE SEQUENCE public.ente_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 "   DROP SEQUENCE public.ente_id_seq;
       public       postgres    false    199            g           0    0    ente_id_seq    SEQUENCE OWNED BY     ;   ALTER SEQUENCE public.ente_id_seq OWNED BY public.ente.id;
            public       postgres    false    198            �            1259    82173 
   trabajador    TABLE     �  CREATE TABLE public.trabajador (
    nombre character varying,
    apellido character varying,
    cedula character varying,
    nacionalidad character varying,
    telefono character varying,
    id_cargo integer,
    imagen character varying,
    created_at timestamp without time zone,
    updated_at timestamp without time zone,
    id_turno integer,
    direccion text,
    email character varying,
    id_departamento integer,
    qrcode character varying,
    id integer NOT NULL
);
    DROP TABLE public.trabajador;
       public         postgres    false            �            1259    82282    trabajador_id_seq    SEQUENCE     �   CREATE SEQUENCE public.trabajador_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public.trabajador_id_seq;
       public       postgres    false    202            h           0    0    trabajador_id_seq    SEQUENCE OWNED BY     G   ALTER SEQUENCE public.trabajador_id_seq OWNED BY public.trabajador.id;
            public       postgres    false    213            �            1259    82193    turno    TABLE     �   CREATE TABLE public.turno (
    id integer NOT NULL,
    desde time without time zone,
    hasta time without time zone,
    turno character varying,
    id_ente integer
);
    DROP TABLE public.turno;
       public         postgres    false            �            1259    82191    turno_trabajo_id_seq    SEQUENCE     �   CREATE SEQUENCE public.turno_trabajo_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 +   DROP SEQUENCE public.turno_trabajo_id_seq;
       public       postgres    false    206            i           0    0    turno_trabajo_id_seq    SEQUENCE OWNED BY     E   ALTER SEQUENCE public.turno_trabajo_id_seq OWNED BY public.turno.id;
            public       postgres    false    205            �            1259    82134    users    TABLE     �  CREATE TABLE public.users (
    id bigint NOT NULL,
    nombre character varying,
    cedula character varying,
    telefono character varying,
    direccion character varying,
    id_perfil smallint,
    email character varying,
    password character varying,
    created_at timestamp without time zone,
    updated_at timestamp without time zone,
    id_ente integer,
    id_departamento integer,
    apellido character varying,
    nacionalidad character varying
);
    DROP TABLE public.users;
       public         postgres    false            �            1259    82132    users_id_seq    SEQUENCE     u   CREATE SEQUENCE public.users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.users_id_seq;
       public       postgres    false    197            j           0    0    users_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;
            public       postgres    false    196            �
           2604    82185 	   Perfil id    DEFAULT     j   ALTER TABLE ONLY public."Perfil" ALTER COLUMN id SET DEFAULT nextval('public."Perfil_id_seq"'::regclass);
 :   ALTER TABLE public."Perfil" ALTER COLUMN id DROP DEFAULT;
       public       postgres    false    204    203    204            �
           2604    82238    asistencia id    DEFAULT     n   ALTER TABLE ONLY public.asistencia ALTER COLUMN id SET DEFAULT nextval('public.asistencia_id_seq'::regclass);
 <   ALTER TABLE public.asistencia ALTER COLUMN id DROP DEFAULT;
       public       postgres    false    210    209    210            �
           2604    82224    cargo id    DEFAULT     d   ALTER TABLE ONLY public.cargo ALTER COLUMN id SET DEFAULT nextval('public.cargo_id_seq'::regclass);
 7   ALTER TABLE public.cargo ALTER COLUMN id DROP DEFAULT;
       public       postgres    false    207    208    208            �
           2604    82259 	   config id    DEFAULT     f   ALTER TABLE ONLY public.config ALTER COLUMN id SET DEFAULT nextval('public.config_id_seq'::regclass);
 8   ALTER TABLE public.config ALTER COLUMN id DROP DEFAULT;
       public       postgres    false    212    211    212            �
           2604    82167    departamento id    DEFAULT     r   ALTER TABLE ONLY public.departamento ALTER COLUMN id SET DEFAULT nextval('public.departamento_id_seq'::regclass);
 >   ALTER TABLE public.departamento ALTER COLUMN id DROP DEFAULT;
       public       postgres    false    201    200    201            �
           2604    82148    ente id    DEFAULT     b   ALTER TABLE ONLY public.ente ALTER COLUMN id SET DEFAULT nextval('public.ente_id_seq'::regclass);
 6   ALTER TABLE public.ente ALTER COLUMN id DROP DEFAULT;
       public       postgres    false    199    198    199            �
           2604    82284    trabajador id    DEFAULT     n   ALTER TABLE ONLY public.trabajador ALTER COLUMN id SET DEFAULT nextval('public.trabajador_id_seq'::regclass);
 <   ALTER TABLE public.trabajador ALTER COLUMN id DROP DEFAULT;
       public       postgres    false    213    202            �
           2604    82196    turno id    DEFAULT     l   ALTER TABLE ONLY public.turno ALTER COLUMN id SET DEFAULT nextval('public.turno_trabajo_id_seq'::regclass);
 7   ALTER TABLE public.turno ALTER COLUMN id DROP DEFAULT;
       public       postgres    false    205    206    206            �
           2604    82137    users id    DEFAULT     d   ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);
 7   ALTER TABLE public.users ALTER COLUMN id DROP DEFAULT;
       public       postgres    false    197    196    197            P          0    82182    Perfil 
   TABLE DATA               .   COPY public."Perfil" (id, nombre) FROM stdin;
    public       postgres    false    204   �G       V          0    82235 
   asistencia 
   TABLE DATA               t   COPY public.asistencia (id, id_trabajador, imagen, created_at, updated_at, tipo_registro, tipo_llegada) FROM stdin;
    public       postgres    false    210   H       T          0    82221    cargo 
   TABLE DATA               3   COPY public.cargo (id, cargo, id_ente) FROM stdin;
    public       postgres    false    208   (H       X          0    82256    config 
   TABLE DATA               X   COPY public.config (id, entrada_minuto_extra, salida_minuto_extra, id_ente) FROM stdin;
    public       postgres    false    212   EH       M          0    82164    departamento 
   TABLE DATA               A   COPY public.departamento (id, departamento, id_ente) FROM stdin;
    public       postgres    false    201   bH       K          0    82145    ente 
   TABLE DATA               8   COPY public.ente (id, ente, direccion_ente) FROM stdin;
    public       postgres    false    199   H       N          0    82173 
   trabajador 
   TABLE DATA               �   COPY public.trabajador (nombre, apellido, cedula, nacionalidad, telefono, id_cargo, imagen, created_at, updated_at, id_turno, direccion, email, id_departamento, qrcode, id) FROM stdin;
    public       postgres    false    202   �H       R          0    82193    turno 
   TABLE DATA               A   COPY public.turno (id, desde, hasta, turno, id_ente) FROM stdin;
    public       postgres    false    206   �H       I          0    82134    users 
   TABLE DATA               �   COPY public.users (id, nombre, cedula, telefono, direccion, id_perfil, email, password, created_at, updated_at, id_ente, id_departamento, apellido, nacionalidad) FROM stdin;
    public       postgres    false    197   �H       k           0    0    Perfil_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public."Perfil_id_seq"', 3, true);
            public       postgres    false    203            l           0    0    asistencia_id_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public.asistencia_id_seq', 28, true);
            public       postgres    false    209            m           0    0    cargo_id_seq    SEQUENCE SET     :   SELECT pg_catalog.setval('public.cargo_id_seq', 5, true);
            public       postgres    false    207            n           0    0    config_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.config_id_seq', 4, true);
            public       postgres    false    211            o           0    0    departamento_id_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('public.departamento_id_seq', 9, true);
            public       postgres    false    200            p           0    0    ente_id_seq    SEQUENCE SET     :   SELECT pg_catalog.setval('public.ente_id_seq', 29, true);
            public       postgres    false    198            q           0    0    trabajador_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.trabajador_id_seq', 6, true);
            public       postgres    false    213            r           0    0    turno_trabajo_id_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('public.turno_trabajo_id_seq', 4, true);
            public       postgres    false    205            s           0    0    users_id_seq    SEQUENCE SET     :   SELECT pg_catalog.setval('public.users_id_seq', 1, true);
            public       postgres    false    196            �
           2606    82190    Perfil Perfil_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public."Perfil"
    ADD CONSTRAINT "Perfil_pkey" PRIMARY KEY (id);
 @   ALTER TABLE ONLY public."Perfil" DROP CONSTRAINT "Perfil_pkey";
       public         postgres    false    204            �
           2606    82244    asistencia asis_key 
   CONSTRAINT     Q   ALTER TABLE ONLY public.asistencia
    ADD CONSTRAINT asis_key PRIMARY KEY (id);
 =   ALTER TABLE ONLY public.asistencia DROP CONSTRAINT asis_key;
       public         postgres    false    210            �
           2606    82229    cargo cargo_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.cargo
    ADD CONSTRAINT cargo_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.cargo DROP CONSTRAINT cargo_pkey;
       public         postgres    false    208            �
           2606    82261    config config_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public.config
    ADD CONSTRAINT config_pkey PRIMARY KEY (id);
 <   ALTER TABLE ONLY public.config DROP CONSTRAINT config_pkey;
       public         postgres    false    212            �
           2606    82153    ente ente_pkey 
   CONSTRAINT     L   ALTER TABLE ONLY public.ente
    ADD CONSTRAINT ente_pkey PRIMARY KEY (id);
 8   ALTER TABLE ONLY public.ente DROP CONSTRAINT ente_pkey;
       public         postgres    false    199            �
           2606    82292    trabajador primary_key 
   CONSTRAINT     T   ALTER TABLE ONLY public.trabajador
    ADD CONSTRAINT primary_key PRIMARY KEY (id);
 @   ALTER TABLE ONLY public.trabajador DROP CONSTRAINT primary_key;
       public         postgres    false    202            �
           2606    82198    turno turno_trabajo_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public.turno
    ADD CONSTRAINT turno_trabajo_pkey PRIMARY KEY (id);
 B   ALTER TABLE ONLY public.turno DROP CONSTRAINT turno_trabajo_pkey;
       public         postgres    false    206            �
           2606    82142    users user_key 
   CONSTRAINT     L   ALTER TABLE ONLY public.users
    ADD CONSTRAINT user_key PRIMARY KEY (id);
 8   ALTER TABLE ONLY public.users DROP CONSTRAINT user_key;
       public         postgres    false    197            P   6   x�3�t�OJ-�KL�<�9�ˈ�1%73/���(1%��˘�%�(5�Ȍ���� ��s      V      x������ � �      T      x������ � �      X      x������ � �      M      x������ � �      K      x������ � �      N      x������ � �      R      x������ � �      I   �   x�=�9�@ ���)(h�?*wq�R��L�I 
w�^�ha�ǡ*� qB���.'W4�)�L���&*��W
�NL�>%������M����6�ٺ���FQ�����j=�9����]w��*���q��j�!�j(k(,D���[��}ra���}�`�vc�(�2o     