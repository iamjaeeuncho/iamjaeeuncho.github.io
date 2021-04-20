---
title: "[SQL] 데이터 타입 - Boolean, Char/Varchar/Text, Numeric, Integer, Serial, Date/Time/Timestamp"
date: 2021-2-15
categories:
  - study
tags:
  - sql
toc: true
toc_ads: true
toc_sticky: true
---


## 데이터 타입
- Boolean: 참과 거짓
- Character: 문자
  - CHAR: 고정형 길이의 문자열. (ex. CHAR(10) 'ABCDE     ' 뒤에 공백을 붙여 저장)
  - VARCHAR: 가변형 길이의 문자열. (ex. CHAR(10) 'ABCDE'만 저장)
  - TEXT: 대용량의 문자데이터
- Numeric: 숫자
  - INT: 정수형 데이터. 크기는 4BYTE로 범위는 -2,147,483,648 ~ 
  2,147,483,647.
  - SMALLINT: 정수형 데이터. 크기는 2BYTE로 -32,768 ~ 32,767.
  - FLOAT: 부동 소수점의 데이터.크기는 8BYTE.
  - NUMERIC: NUMERIC(15,2)와 같이 전체 크기와 소수점의 자리를 지정
- Time
  - DATE: 일자 데이터
  - TIME: 시간 데이터
  - TIMESTAMP: 일자와 시간 데이터 모두
- ARRAY: 배열 형식의 데이터. 한개의 컬럼에 여러개의 데이터를 동시에 저장 가능. 저장한 순서로 조회도 가능.
- JSON: JSON형식 데이터. JSON 형식대로 각 LEVEL의 데이터 저장 가능.

```sql
---------- # Boolean, Character, Numeric
CREATE TABLE DATA_TYPE_TEST_1 (
  	A_BOOLEAN BOOLEAN
	, B_CHAR CHAR(10)
	, C_VARCHAR VARCHAR(10)
	, D_TEXT TEXT 
	, E_INT INT 
	, F_SMALLINT SMALLINT 
	, G_FLOAT FLOAT 
	, H_NUMERIC NUMERIC(15, 2)
  )
;
---------- # Boolean, Character, Numeric
INSERT INTO DATA_TYPE_TEST_1
VALUES (
    TRUE                                      -- A_BOOLEAN
  , 'ABCDE'                                   -- B_CHAR
  , 'ABCDE'                                   -- C_VARCHAR
  , 'TEXT'                                    -- D_TEXT
  , 1000                                      -- E_INT
  , 10                                        -- F_SMALLINT
  , 10.12345                                  -- G_FLOAT
  , 10.25                                     -- H_NUMERIC
  )
;
---------- # Time, JSON
CREATE TABLE DATA_TYPE_TEST_2 (
    A_DATE DATE 
  , B_TIME TIME
  , C_TIMESTAMP TIMESTAMP
  , D_ARRAY TEXT[] 
  , E_JSON JSON 
  )
;
---------- # Time, Arrays, JSON
INSERT INTO DATA_TYPE_TEST_2
VALUES (
		CURRENT_DATE                              -- A_DATE
  , LOCALTIME                                 -- B_TIME
  , CURRENT_TIMESTAMP                         -- C_TIMESTAMP	
  , ARRAY [ '010-1234-1234','010-4321-4321' ] -- D_ARRAY
  ,'{ "customer": "John Doe", "items": {"product": "Beer","qty": 6}}' --E_JSON
	)
;
```
<br>
<br>

### Boolean
- 참과 거짓에 대한 값을 저장하는 데이터 타입.
> ``참``: TRUE, true, t, yest, y, 1  
> ``거짓``: FALSE, false, f, no, n, 0  

```sql
---------- # 참 값 추출
SELECT * FROM STOCK_AVAILABILITY WHERE AVAILABLE = 'YES';
SELECT * FROM STOCK_AVAILABILITY WHERE available;  -- available 아무것도 안 쓰면 참으로 표시
---------- # 거짓 값 추출
SELECT * FROM STOCK_AVAILABILITY WHERE AVAILABLE = 'NO';
SELECT * FROM STOCK_AVAILABILITY WHERE NOT AVAILABLE;
```
<br>
<br>

### Char/Varchar/Text
- 문자 및 문자열을 다루는 데이터 타입
> Char(길이): 고정형 길이,공간이 남을시 공백으로 패딩
> Varchar(길이): 가변형 길이,공간이 남을시 공백으로 패딩하지 않음
> Varchar: TEXT와 동일
> Text: 무한대 길이의 문자열을 저장

```sql
---------- # CHAR,VARCHAR,TEXT
CREATE TABLE CHARACTER_TESTS (
   ID SERIAL PRIMARY KEY
 , X CHAR (3)
 , Y VARCHAR (10)
 , Z TEXT
 )
;
```
<br>
<br>

### Numeric
- 정수부터 실수형까지의 숫자를 표현하며 각각의 자릿수를 지정할 수 있는 데이터 타입

```sql
---------- # 자릿수 지정
CREATE TABLE PRODUCTS (
  ID SERIAL PRIMARY KEY
, NAME VARCHAR NOT NULL
, PRICE NUMERIC (5, 2)                    -- 5자리까지하는데, 소수점 2자리까지만
);

INSERT INTO PRODUCTS (NAME, PRICE)
VALUES ('Phone',500.215) 
     , ('Tablet',500.214)
;

INSERT INTO PRODUCTS (NAME, PRICE)       -- (5,2)의 범위를 가지므로 
VALUES                                   -- 123456.21은 허용할수 없어 에러
        ('공기청정기',123456.21)
;

INSERT INTO PRODUCTS (NAME, PRICE)
VALUES
        ('공기청정기', 456.213)           -- 반올림해서 들어가짐
;

```
<br>
<br>

### Integer
- 각 데이터 타입의 사이즈를 감안하여 테이블 생성 시 활용해야 함

> SMAILLINT (2바이트): -32,768 ~ +32,767
> INTEGER (4바이트): -2,147,483,648 ~ +2,147,483,647
> BIGINT (8바이트): -9,223,372,036,854,775,808 ~ +9,223,372,036,854,775,807

```sql
---------- # 32,767를 넘지 않는다면, SMALLINT
CREATE TABLE BOOKS (
  BOOK_ID SERIAL PRIMARY KEY
, TITLE VARCHAR (255) NOT NULL
, PAGES SMALLINT NOT NULL CHECK (PAGES > 0)
);
---------- # 2,147,483,647를 넘지 않는다면, INTEGER
CREATE TABLE CITIES (
  CITY_ID SERIAL PRIMARY KEY
, CITY_NAME VARCHAR (255) NOT NULL
, POPULATION INT NOT NULL CHECK (POPULATION >= 0)
);
```
<br>
<br>

### Date/Time/Timestamp
- 일자 및 시간을 관리하는 주요 데이터 타입
- Date는 일자, Time은 시간, Timestamp는 일자 및 시간 관리

#### DATE 데이터 타입
- DB기준 현재 일자
  - SELECT NOW()::date;
  - SELECT CURRENT_DATE;
- TO_CHAR를 이용하여 다른 형태의 포맷으로 가져옴
  - SELECT TO_CHAR(NOW() :: DATE, 'dd/mm/yyyy');
  - SELECT TO_CHAR(NOW() :: DATE, 'Mon dd, yyyy');

```sql
---------- # AGE함수로 나이계산
SELECT
    FIRST_NAME
  , LAST_NAME
  , AGE(CREATE_DATE) AS DIFF
  FROM
    CUSTOMER;
---------- # 다양한 일자 추출
SELECT 
    FIRST_NAME
  , LAST_NAME
  , EXTRACT (YEAR FROM CREATE_DATE) AS YEAR
  , EXTRACT (MONTH FROM CREATE_DATE) AS MONTH
  , EXTRACT (DAY FROM CREATE_DATE) AS DAY
  FROM
    CUSTOMER
;
```


#### TIME 데이터 타입
- DB기준 현재 시간
  - SELECT CURRENT_TIME;
  - SELECT LOCALTIME;

```sql
---------- # TIME + EXTRACT함수로 시,분,초 추출 가능
SELECT
    LOCALTIME,
    EXTRACT (HOUR FROM LOCALTIME) AS HOUR,
    EXTRACT (MINUTE FROM LOCALTIME) AS MINUTE, 
    EXTRACT (SECOND FROM LOCALTIME) AS SECOND, 
    EXTRACT (MILLISECONDS FROM LOCALTIME) AS MILLISECONDS; 
;	    
---------- # TIME 시간계산
SELECT TIME '10:00' - TIME '02:00' AS DIFF;        -- 시
SELECT TIME '10:59' - TIME '02:01' AS DIFF;        -- 시/분
SELECT TIME '10:59:59' - TIME '02:01:01' AS DIFF;  --시/분/초
---------- # INTERVAL 시간계산
SELECT LOCALTIME
	 , LOCALTIME + INTERVAL '2 HOURS' AS PLUS_2HOURS
	 , LOCALTIME - INTERVAL '2 HOURS' AS MINUS_2HOURS
;
```


#### TIMESTAMP 데이터 타입
- DB기준 현재 일자 및 시간
  - SELECT NOW();
  - SELECT CURRENT_TIMESTAMP;
- DB기준 현재 일자, 시간 및 요일
  - SELECT TIMEOFDAY();

```sql
---------- # 다양한 형태의 시간 포맷
SELECT 
	  TO_CHAR(current_timestamp, 'YYYY')
	, TO_CHAR(current_timestamp, 'YYYY-MM')
	, TO_CHAR(current_timestamp, 'YYYY-MM-DD')
	, TO_CHAR(current_timestamp, 'YYYY-MM-DD HH24')
	, TO_CHAR(current_timestamp, 'YYYY-MM-DD HH24:MI')
	, TO_CHAR(current_timestamp, 'YYYY-MM-DD HH24:MI:SS')
  , TO_CHAR(current_timestamp, 'YYYY-MM-DD HH24:MI:SS.MS')
  , TO_CHAR(current_timestamp, 'YYYY-MM-DD HH24:MI:SS.US');
```
<br>
<br>

### Serial
- Integer형식으로 구현된 순차적인(Sequential) 데이터
- 유일성을 보장하는 PK에 자주 사용

```sql
---------- # 시퀀스를 이용한 컬럼 생성
CREATE SEQUENCE TABLE_NAME_ID_SEQ;
 
CREATE TABLE TABLE_NAME (
    ID INTEGER NOT NULL DEFAULT NEXTVAL('TABLE_NAME_ID_SEQ')
);
 
ALTER SEQUENCE TABLE_NAME_ID_SEQ OWNED BY TABLE_NAME.ID;
---------- # 현재의 시퀀스 값 알고 싶을 때
SELECT CURRVAL(PG_GET_SERIAL_SEQUENCE('fruits', 'id'));  -- CURRVAL 현재 벨류값 구함

---------- # SERIAL 데이터 타입 사용
CREATE TABLE FRUITS(
  ID SERIAL PRIMARY KEY
, NAME VARCHAR NOT NULL
);

INSERT INTO FRUITS(NAME) VALUES('orange');               -- ID컬럼은 자동으로 1부터
INSERT INTO FRUITS(ID,NAME) VALUES(DEFAULT,'apple');     -- ID컬럼은 자동으로 2부터
```
<br>
<br>