---
title: "[SQL] 테이블 관리-데이터 타입, 테이블 생성, CTAS, 테이블 및 컬럼 변경, 임시 테이블, TRUNCATE"
date: 2021-2-13
categories:
  - study
tags:
  - sql
toc: true
toc_ads: true
toc_sticky: true
---

## 데이터 타입
```sql
DROP TABLE DATA_TYPE_TEST_1; 
CREATE TABLE DATA_TYPE_TEST_1 
(
  	  A_BOOLEAN BOOLEAN
	, B_CHAR CHAR(10)
	, C_VARCHAR VARCHAR(10)
	, D_TEXT TEXT 
	, E_INT INT 
	, F_SMALLINT SMALLINT 
	, G_FLOAT FLOAT 
	, H_NUMERIC NUMERIC(15, 2)
);

INSERT INTO 
	DATA_TYPE_TEST_1
VALUES 
(
   TRUE --A_BOOLEAN
, 'ABCDE' --B_CHAR
, 'ABCDE' --C_VARCHAR
, 'TEXT' --D_TEXT
, 1000 --E_INT
, 10 --F_SMALLINT
, 10.12345 --G_FLOAT
, 10.25 --H_NUMERIC
);

COMMIT; 

SELECT * FROM DATA_TYPE_TEST_1;

ABCDE     
ABCDE



;
DROP TABLE DATA_TYPE_TEST_2; 
CREATE TABLE DATA_TYPE_TEST_2
(
  A_DATE DATE 
, B_TIME TIME
, C_TIMESTAMP TIMESTAMP
, D_ARRAY TEXT[] 
, E_JSON JSON 
)
;

INSERT INTO DATA_TYPE_TEST_2
VALUES 
	(
		CURRENT_DATE --A_DATE
		, LOCALTIME --B_TIME
		, CURRENT_TIMESTAMP --C_TIMESTAMP		
		, ARRAY [ '010-1234-1234','010-4321-4321' ] --D_ARRAY
		,  '{ "customer": "John Doe", "items": {"product": "Beer","qty": 6}}' --E_JSON
	)
;

COMMIT; 

SELECT * FROM DATA_TYPE_TEST_2; 

SELECT TO_CHAR(C_TIMESTAMP, 'YYYY-MM-DD HH24:MI:SS.MS'), C_TIMESTAMP FROM DATA_TYPE_TEST_2;
```
<br>
<br>

## 테이블 생성
```sql
CREATE TABLE ACCOUNT(
  USER_ID SERIAL PRIMARY KEY
, USERNAME VARCHAR (50) UNIQUE NOT NULL
, PASSWORD VARCHAR (50) NOT NULL
, EMAIL VARCHAR (355) UNIQUE NOT NULL
, CREATED_ON TIMESTAMP NOT NULL
, LAST_LOGIN TIMESTAMP
);

CREATE TABLE ROLE(
  ROLE_ID SERIAL PRIMARY KEY
, ROLE_NAME VARCHAR (255) UNIQUE NOT NULL
);

CREATE TABLE ACCOUNT_ROLE
(
  USER_ID INTEGER NOT NULL
, ROLE_ID INTEGER NOT NULL
, GRANT_DATE TIMESTAMP WITHOUT TIME ZONE
, PRIMARY KEY (USER_ID, ROLE_ID)
, CONSTRAINT ACCOUNT_ROLE_ROLE_ID_FKEY FOREIGN KEY (ROLE_ID) 
  REFERENCES ROLE (ROLE_ID) MATCH SIMPLE 
  ON UPDATE NO ACTION ON DELETE NO ACTION
, CONSTRAINT ACCOUNT_ROLE_USER_ID_FKEY FOREIGN KEY (USER_ID) REFERENCES ACCOUNT (USER_ID) MATCH SIMPLE ON
  UPDATE NO ACTION ON DELETE NO ACTION
);

INSERT INTO ACCOUNT VALUES (1, '이경오', '1234', 'dbmsexpert@naver.com', CURRENT_TIMESTAMP, null );
COMMIT; 

SELECT * FROM ACCOUNT; 

INSERT INTO ROLE VALUES(1, 'DBA'); 
COMMIT;

SELECT * FROM ROLE; 

INSERT INTO ACCOUNT_ROLE VALUES(1, 1, CURRENT_TIMESTAMP); 

COMMIT; 

SELECT * FROM ACCOUNT_ROLE;

SELECT * FROM ACCOUNT; 

INSERT INTO ACCOUNT_ROLE VALUES(2, 1, CURRENT_TIMESTAMP); -- 2번 user가 없으므로 에러남

SQL Error [23503]: 오류: "account_role" 테이블에서 자료 추가, 갱신 작업이 "account_role_user_id_fkey" 참조키(foreign key) 제약 조건을 위배했습니다
  Detail: (user_id)=(2) 키가 "account" 테이블에 없습니다.
  
SELECT * FROM ROLE;   
INSERT INTO ACCOUNT_ROLE VALUES(1, 2, CURRENT_TIMESTAMP);-- 2번 없으므로 에러남

SQL Error [23503]: 오류: "account_role" 테이블에서 자료 추가, 갱신 작업이 "account_role_role_id_fkey" 참조키(foreign key) 제약 조건을 위배했습니다
  Detail: (role_id)=(2) 키가 "role" 테이블에 없습니다.
  
;

SELECT * FROM ACCOUNT_ROLE; 
INSERT INTO ACCOUNT_ROLE VALUES(1, 1, CURRENT_TIMESTAMP);
SQL Error [23505]: 오류: 중복된 키 값이 "account_role_pkey" 고유 제약 조건을 위반함
  Detail: (user_id, role_id)=(1, 1) 키가 이미 있습니다.
;

UPDATE ACCOUNT 
SET USER_ID = 2 -- userid 2가 없어서 에러
WHERE USER_ID = 1; 

SQL Error [23503]: 오류: "account" 테이블의 자료 갱신, 삭제 작업이 "account_role_user_id_fkey" 참조키(foreign key) 제약 조건 - "account_role" 테이블 - 을 위반했습니다
  Detail: (user_id)=(1) 키가 "account_role" 테이블에서 여전히 참조됩니다.
  
DELETE FROM ACCOUNT 
WHERE USER_ID = 1; -- 1번 아이디는 다른 것에 참조하고 있기때문에 지울수가 없음. account_role 지우고 지워야함

SQL Error [23503]: 오류: "account" 테이블의 자료 갱신, 삭제 작업이 "account_role_user_id_fkey" 참조키(foreign key) 제약 조건 - "account_role" 테이블 - 을 위반했습니다
  Detail: (user_id)=(1) 키가 "account_role" 테이블에서 여전히 참조됩니다.
  
  
  


  
  





SELECT * FROM account; 

```
<br>
<br>

## CTAS
```sql
SELECT
    A.FILM_ID,
    A.TITLE,
    A.RELEASE_YEAR,
    A.LENGTH,
    A.RATING
FROM
      FILM A
    , FILM_CATEGORY B 
WHERE A.FILM_ID = B.FILM_ID
AND B.CATEGORY_ID = 1
;

SELECT * FROM CATEGORY WHERE CATEGORY_ID = 1; 

CREATE TABLE ACTION_FILM AS 
SELECT
       A.FILM_ID
     , A.TITLE
     , A.RELEASE_YEAR
     , A.LENGTH
     , A.RATING
  FROM
       FILM A, FILM_CATEGORY B 
 WHERE A.FILM_ID = B.FILM_ID
   AND B.CATEGORY_ID = 1
;

SELECT * FROM ACTION_FILM; 






CREATE TABLE ACTION_FILM AS 
SELECT
       A.FILM_ID
     , A.TITLE
     , A.RELEASE_YEAR
     , A.LENGTH
     , A.RATING
  FROM
       FILM A, FILM_CATEGORY B 
 WHERE A.FILM_ID = B.FILM_ID
   AND B.CATEGORY_ID = 1
;

CREATE TABLE IF NOT EXISTS ACTION_FILM AS 
SELECT
       A.FILM_ID
     , A.TITLE
     , A.RELEASE_YEAR
     , A.LENGTH
     , A.RATING
  FROM
       FILM A, FILM_CATEGORY B 
 WHERE A.FILM_ID = B.FILM_ID
   AND B.CATEGORY_ID = 1
;

SELECT * FROM ACTION_FILM; 
 
```
<br>
<br>

## 테이블 변경
### 테이블 구조 변경
```sql
DROP TABLE LINKS; 
CREATE TABLE LINKS (
  LINK_ID SERIAL PRIMARY KEY
, TITLE VARCHAR (512) NOT NULL
, URL VARCHAR (1024) NOT NULL UNIQUE
);

SELECT * FROM LINKS; 

ALTER TABLE LINKS ADD COLUMN ACTIVE BOOLEAN;

SELECT * FROM LINKS; 

ALTER TABLE LINKS DROP COLUMN ACTIVE;

SELECT * FROM LINKS; 

ALTER TABLE LINKS RENAME COLUMN TITLE TO LINK_TITLE;

SELECT * FROM LINKS; 





ALTER TABLE LINKS ADD COLUMN TARGET VARCHAR(10);

SELECT * FROM LINKS;

ALTER TABLE LINKS ALTER COLUMN TARGET
SET DEFAULT '_blank'; -- 사용자가 아무런 값 안 넣어도 디폴트 값으로 _blank 들어감

INSERT INTO LINKS (LINK_TITLE, URL)
VALUES('PostgreSQL Tutorial','http://www.postgresqltutorial.com/');

COMMIT;






SELECT * FROM LINKS;

ALTER TABLE LINKS ADD CHECK (TARGET IN ('_self', '_blank', '_parent', '_top'));

INSERT INTO LINKS(LINK_TITLE,URL,TARGET) 
VALUES('PostgreSQL','http://www.postgresql.org/','_self');

-- target컬럼의 체크 제약 조건에 없는 'whatever' 값으로 insert하면 에러
SQL Error [23514]: 오류: 새 자료가 "links" 릴레이션의 "links_target_check" 체크 제약 조건을 위반했습니다
  Detail: 실패한 자료: (2, PostgreSQL, http://www.postgresql.org/, whatever)
```
<br>
<br>

### 테이블 이름 변경
```sql
DROP TABLE VENDORS;
DROP TABLE SUPPLIERS;
DROP TABLE SUPPLIER_GROUPS;
DROP VIEW SUPPLIER_DATA;






CREATE TABLE VENDORS (
  ID SERIAL PRIMARY KEY
, NAME VARCHAR NOT NULL
);











ALTER TABLE VENDORS RENAME TO SUPPLIERS;


SELECT * FROM VENDORS;
SELECT * FROM SUPPLIERS;
 








CREATE TABLE SUPPLIER_GROUPS 
(
  ID SERIAL PRIMARY KEY
, NAME VARCHAR NOT NULL
);

ALTER TABLE SUPPLIERS ADD COLUMN GROUP_ID INT NOT NULL;

ALTER TABLE SUPPLIERS ADD FOREIGN KEY (GROUP_ID) REFERENCES SUPPLIER_GROUPS (ID);

CREATE VIEW SUPPLIER_DATA AS 
SELECT
       S.ID
     , S.NAME
     , G.NAME "GROUP"
  FROM
    SUPPLIERS S, SUPPLIER_GROUPS G 
WHERE G.ID = S.GROUP_ID;

SELECT * FROM SUPPLIER_DATA; 



ALTER TABLE SUPPLIER_GROUPS RENAME TO GROUPS; -- supplier_groups 이름을 바꾸면 다른 sql문에서도 supplier_groups 이름 바뀜

SELECT * FROM SUPPLIER_DATA;






--테이블 이름 변경 가능하다. alter table문 
--테이블 이름을 변경하면, 기존의 참조무결성 제약조건이나 뷰등이 자동으로 반영된다. 




```
<br>
<br>

## 컬럼 변경
### 컬럼 추가
```sql
--현재 현존하는 최고의 dbms -> oracle 오라클 
--오라클 no.1 

--기본적으로는 오라클의 특성을 알아두는게 좋다. 
--create, drop, alter 이런건 오라클 => 치는 순간에 commit이 됩니다. 즉 commit 할필요없습니다. DDL 
--delete , update, merge, insert 이런 명령들은 commit

--포스그레sql
--create, drop, alter, delete , update, merge, insert commit; 

--기본적인걸 알아두시고, 포스그레는 이렇구나~ 하고 이해하시는게~ 
--하고 넘어가시는게 좋습니다. 

--commit, rollback 



DROP TABLE TB_CUST; 

CREATE TABLE TB_CUST (
  CUST_ID SERIAL PRIMARY KEY
, CUST_NAME VARCHAR(50) NOT NULL
);

ALTER TABLE TB_CUST ADD COLUMN PHONE_NUMBER VARCHAR(13);

ALTER TABLE TB_CUST 
 ADD COLUMN FAX_NUMBER VARCHAR(13),
 ADD COLUMN EMAIL_ADDR VARCHAR(50);
 
SELECT * FROM TB_CUST; 

TRUNCATE TABLE TB_CUST; 
COMMIT; 
ROLLBACK; 

SELECT * FROM TB_CUST; 

INSERT INTO TB_CUST 
VALUES 
	(
		1, '이경오', '010-1234-5678', '02-123-1234', 'dbmsexpert@naver.com'
	); 
	
COMMIT; 

SELECT * FROM TB_CUST; 




ALTER TABLE TB_CUST 
ADD COLUMN CONTACT_NM VARCHAR NOT NULL; -- 새로 컬럼 추가하면 당연히 null값으로 들어가는데, NOT null로 지정하니까 오류남

SQL Error [23502]: 오류: "contact_nm" 열에는 null 값 자료가 있습니다
;

ALTER TABLE TB_CUST 
ADD COLUMN CONTACT_NM VARCHAR NULL;

UPDATE TB_CUST 
SET CONTACT_NM = '홍길동'
WHERE CUST_ID = 1; 
COMMIT; 

SELECT * FROM TB_CUST; 

ALTER TABLE TB_CUST
ALTER COLUMN CONTACT_NM SET NOT NULL;
-----------------------------------------








```
<br>
<br>

### 컬럼 제거
```sql
DROP VIEW BOOK_INFO;
DROP TABLE BOOKS;
DROP TABLE PUBLISHERS; 
DROP TABLE CATEGORIES;



CREATE TABLE PUBLISHERS (
  PUBLISHER_ID SERIAL PRIMARY KEY
, NAME VARCHAR NOT NULL
);

SELECT * FROM PUBLISHERS; 
 
CREATE TABLE CATEGORIES (
  CATEGORY_ID SERIAL PRIMARY KEY
, NAME VARCHAR NOT NULL
);

SELECT * FROM CATEGORIES; 
 
CREATE TABLE BOOKS (
  BOOK_ID SERIAL PRIMARY KEY
, TITLE VARCHAR NOT NULL
, ISBN VARCHAR NOT NULL
, PUBLISHED_DATE DATE NOT NULL
, DESCRIPTION VARCHAR
, CATEGORY_ID INT NOT NULL
, PUBLISHER_ID INT NOT NULL
, FOREIGN KEY (PUBLISHER_ID) REFERENCES PUBLISHERS (PUBLISHER_ID)
, FOREIGN KEY (CATEGORY_ID) REFERENCES CATEGORIES (CATEGORY_ID)
);

SELECT * FROM books; 

CREATE VIEW BOOK_INFO AS SELECT
    B.BOOK_ID,
    B.TITLE,
    B.ISBN,
    B.PUBLISHED_DATE,
    P.NAME
FROM
     BOOKS B
   , PUBLISHERS P 
WHERE P.PUBLISHER_ID = B.PUBLISHER_ID
ORDER BY TITLE;

SELECT * FROM BOOK_INFO; 

SELECT * FROM BOOKS; 
ALTER TABLE BOOKS DROP COLUMN CATEGORY_ID; -- categoryid제거 가능. categoryid 제거시 fk도 함께 삭제

ALTER TABLE BOOKS DROP COLUMN PUBLISHER_ID; -- view에서 참조하고 있기때문에 지울수가 없음

SQL Error [2BP01]: 오류: 기타 다른 개체들이 이 개체에 의존하고 있어,  publisher_id 칼럼(books 테이블 의) 삭제할 수 없음
  Detail: book_info 뷰 의존대상:  publisher_id 칼럼(books 테이블 의)
  Hint: 이 개체와 관계된 모든 개체들을 함께 삭제하려면 DROP ... CASCADE 명령을 사용하십시오
;

-- 컬럼 하나만 삭제해도 다른게 다 삭제되므로 항상 조심

ALTER TABLE BOOKS DROP COLUMN PUBLISHER_ID CASCADE;

SELECT * FROM BOOK_INFO; 

SQL Error [42P01]: 오류: "book_info" 이름의 릴레이션(relation)이 없습니다
  Position: 15
;

ALTER TABLE BOOKS 
  DROP COLUMN ISBN,
  DROP COLUMN DESCRIPTION;

```
<br>
<br>

### 컬럼 데이터 타입 변경
```sql
DROP TABLE ASSETS; 

CREATE TABLE ASSETS (
  ID SERIAL PRIMARY KEY
, NAME TEXT NOT NULL
, ASSET_NO VARCHAR(10) NOT NULL
, DESCRIPTION TEXT
, LOCATION TEXT
, ACQUIRED_DATE DATE NOT NULL
);
 










INSERT INTO ASSETS (
  NAME
, ASSET_NO
, LOCATION
, ACQUIRED_DATE
)
VALUES
('Server', '10001', 'Server room', '2017-01-01'), 
('UPS', '10002', 'Server room', '2017-01-02');

COMMIT; 

SELECT * FROM ASSETS; 

ALTER TABLE ASSETS ALTER COLUMN NAME TYPE VARCHAR(50);

ALTER TABLE ASSETS 
    ALTER COLUMN LOCATION TYPE VARCHAR(100),
    ALTER COLUMN DESCRIPTION TYPE VARCHAR(500);
    
ALTER TABLE ASSETS ALTER COLUMN ASSET_NO TYPE INT;   

SQL Error [42804]: 오류: "asset_no" 칼럼의 자료형을 integer 형으로 형변환할 수 없음
  Hint: "USING asset_no::integer" 구문을 추가해야 할 것 같습니다.
  ;
  
ALTER TABLE ASSETS
    ALTER COLUMN ASSET_NO TYPE INT USING ASSET_NO::INTEGER; 
    
   
```
<br>
<br>

### 컬럼 이름 변경
```sql
DROP VIEW CUSTOMER_DATA;
DROP TABLE CUSTOMERS;
DROP TABLE CUSTOMER_GROUPS;


CREATE TABLE CUSTOMER_GROUPS (
  ID SERIAL PRIMARY KEY
, NAME VARCHAR NOT NULL
);


CREATE TABLE CUSTOMERS (
  ID SERIAL PRIMARY KEY
, NAME VARCHAR NOT NULL
, PHONE VARCHAR NOT NULL
, EMAIL VARCHAR
, GROUP_ID INT
, FOREIGN KEY (GROUP_ID) REFERENCES CUSTOMER_GROUPS (ID)
);

CREATE VIEW CUSTOMER_DATA 
AS SELECT
    C.ID,
    C.NAME,
    G.NAME CUSTOMER_GROUP
FROM
     CUSTOMERS C
   , CUSTOMER_GROUPS G 
WHERE G.ID = C.GROUP_ID;

SELECT * FROM CUSTOMER_DATA; 





ALTER TABLE CUSTOMERS 
RENAME COLUMN EMAIL TO CONTACT_EMAIL;







SELECT * FROM CUSTOMERS; 

ALTER TABLE CUSTOMER_GROUPS 
RENAME COLUMN NAME TO GROUP_NAME;

SELECT * FROM CUSTOMER_GROUPS; 

SELECT * FROM customer_data; 
```
<br>
<br>

### 테이블 제거
```sql
DROP TABLE AUTHOR;
DROP TABLE PAGE;

CREATE TABLE AUTHOR 
(
  AUTHOR_ID INT NOT NULL PRIMARY KEY
, FIRSTNAME VARCHAR (50)
, LASTNAME VARCHAR (50)
);
 
CREATE TABLE PAGE (
  PAGE_ID SERIAL PRIMARY KEY
, TITLE VARCHAR (255) NOT NULL
, CONTENT TEXT
, AUTHOR_ID INT NOT NULL
, FOREIGN KEY (AUTHOR_ID) REFERENCES AUTHOR (AUTHOR_ID) 
);

INSERT INTO AUTHOR 
VALUES (1, 'kyounhoh', 'Lee');

INSERT INTO PAGE 
VALUES (1, 'SQL과 데이터베이스', 'drop table', 1);

COMMIT; 

DROP TABLE PAGE; 

SELECT * FROM AUTHOR; 
SELECT * FROM page; 

DROP TABLE AUTHOR; -- 자식은 날릴수있어도 부모 테이블은 못 날림

SQL Error [2BP01]: 오류: 기타 다른 개체들이 이 개체에 의존하고 있어, author 테이블 삭제할 수 없음
  Detail: page_author_id_fkey 제약 조건(해당 개체: page 테이블) 의존대상: author 테이블
  Hint: 이 개체와 관계된 모든 개체들을 함께 삭제하려면 DROP ... CASCADE 명령을 사용하십시오
 ;
 
DROP TABLE AUTHOR CASCADE; -- 부모 테이블 날리고 싶으면 CASCADE.


 

SELECT * FROM AUTHOR;
SQL Error [42P01]: 오류: "author" 이름의 릴레이션(relation)이 없습니다
  Position: 15
  ;
SELECT * FROM PAGE;
```
<br>
<br>

### 임시 테이블
```sql
DROP TABLE TB_CUST_TEMP_TEST;

CREATE TEMP TABLE TB_CUST_TEMP_TEST(CUST_ID INT);

SELECT * FROM TB_CUST_TEMP_TEST;
INSERT INTO TB_CUST_TEMP_TEST VALUES (1); 

--세션 재접속 후
SELECT * FROM TB_CUST_TEMP_TEST;























SQL Error [42P01]: 오류: "tb_cust_temp_test" 이름의 릴레이션(relation)이 없습니다
  Position: 15
-----------------------------------------------------------------  

DROP TABLE TB_CUST_TEMP_TEST; 

--일반 테이블 
CREATE TABLE TB_CUST_TEMP_TEST(CUST_ID SERIAL PRIMARY KEY, CUST_NM VARCHAR NOT NULL);

SELECT * FROM TB_CUST_TEMP_TEST; 


CREATE TEMP TABLE TB_CUST_TEMP_TEST(CUST_ID INT);

SELECT * FROM TB_CUST_TEMP_TEST;

--세션 재접속

SELECT * FROM TB_CUST_TEMP_TEST;

DROP TABLE TB_CUST_TEMP_TEST;

SELECT * FROM TB_CUST_TEMP_TEST;

-----------------------------------------------------------------  

DROP TABLE TB_CUST_TEMP_TEST; 

CREATE TABLE TB_CUST_TEMP_TEST(CUST_ID SERIAL PRIMARY KEY, CUST_NM VARCHAR NOT NULL);

CREATE TEMP TABLE TB_CUST_TEMP_TEST(CUST_ID INT);

SELECT * FROM TB_CUST_TEMP_TEST;

DROP TABLE TB_CUST_TEMP_TEST;

SELECT * FROM TB_CUST_TEMP_TEST;


```
<br>
<br>

### TRUNCATE
```sql
CREATE TABLE big_table AS 
SELECT * FROM account; 

INSERT INTO big_table
SELECT * FROM account; 


SELECT * from big_table; 

TRUNCATE TABLE big_table;

COMMIT; 
ROLLBACK; 

SELECT * from big_table;

INSERT INTO big_table
SELECT * FROM account; 
SELECT * from big_table;

TRUNCATE TABLE big_table;
```
<br>
<br>

## 연습문제
### 1
```sql
--고객별 amount의 합계

CREATE TABLE customer_rank as
SELECT a.customer_id, row_number() over(ORDER BY a.sum_amount desc) AS customer_rank
FROM 
(
	SELECT a.customer_id, sum(a.amount) AS sum_amount  
	FROM payment a 
	GROUP BY a.customer_id
) a
ORDER BY customer_rank;

SELECT * FROM customer_rank; 





















DROP TABLE CUSTOMER_RANK;

CREATE TABLE CUSTOMER_RANK 
AS 
SELECT A.CUSTOMER_ID, ROW_NUMBER() OVER(ORDER BY A.SUM_AMOUNT DESC) AS CUSTOMER_RANK
FROM 
(
	SELECT CUSTOMER_ID, SUM(A.AMOUNT) AS SUM_AMOUNT
	FROM PAYMENT A	
	GROUP BY A.CUSTOMER_ID
) A
ORDER BY CUSTOMER_RANK ASC;

SELECT * FROM CUSTOMER_RANK; 

```
<br>
<br>

### 2
```sql
CREATE TABLE CUSTOMER_RANK_YYYYMM AS 
SELECT A.CUSTOMER_ID
     , YYYYMM
     , SUM_AMOUNT
     , ROW_NUMBER() OVER(PARTITION BY YYYYMM ORDER BY SUM_AMOUNT DESC) AS RANK_YYYYMM
  FROM 
 (
   SELECT
  	      CUSTOMER_ID
	    , TO_CHAR(payment_date, 'YYYYMM') AS YYYYMM
	    , SUM(A.AMOUNT) AS SUM_AMOUNT
     FROM
	      PAYMENT A
 GROUP BY
  	      A.CUSTOMER_ID, TO_CHAR(payment_date, 'YYYYMM')
) A
ORDER BY YYYYMM, RANK_YYYYMM ;

SELECT * FROM CUSTOMER_RANK_YYYYMM; 

---------------------------------------------------------


CREATE TABLE customer_rank_yyyymm AS 
SELECT a.customer_id, a.yyyymm, a.sum_amount, 
row_number() over(PARTITION BY a.yyyymm ORDER BY a.sum_amount desc) AS rank_yyyymm
FROM 
(
SELECT
	  a.customer_id
	, TO_CHAR(payment_date, 'yyyymm') AS yyyymm
	, SUM(a.amount) AS sum_amount
FROM
	payment a
GROUP BY
	  a.customer_id
	, TO_CHAR(payment_date, 'yyyymm')
) a
ORDER BY yyyymm, rank_yyyymm;

SELECT * FROM customer WHERE customer_id IN 
(
	SELECT DISTINCT customer_id FROM customer_rank_yyyymm
	WHERE rank_yyyymm in(1,2,3)
); 
	

SELECT DISTINCT customer_id 
FROM payment; 

```
<br>
<br>