---
title: "[SQL] 제약조건-기본키, 외래키, Check, Unique, Not Null"
date: 2021-2-16
categories:
  - study
tags:
  - sql
toc: true
toc_ads: true
toc_sticky: true
---



## 기본키
```sql
CREATE TABLE TB_PRODUCT_PK_TEST (
  PRODUCT_NO INTEGER
, DESCRIPTION TEXT
, PRODUCT_COST NUMERIC
);

ALTER TABLE TB_PRODUCT_PK_TEST 
ADD PRIMARY KEY (PRODUCT_NO);











CREATE TABLE TB_PRODUCT_PK_TEST_2 
(
	NAME VARCHAR(255)
);

INSERT INTO TB_PRODUCT_PK_TEST_2 (NAME)
VALUES
  ('MICROSOFT')
, ('IBM')
, ('APPLE')
, ('SAMSUNG')
;

COMMIT; 

SELECT * FROM TB_PRODUCT_PK_TEST_2; 

|name     
|---------
|MICROSOFT
|IBM      
|APPLE    
|SAMSUNG  
;

ALTER TABLE TB_PRODUCT_PK_TEST_2 ADD COLUMN ID SERIAL PRIMARY KEY;

SELECT * FROM TB_PRODUCT_PK_TEST_2;

INSERT INTO TB_PRODUCT_PK_TEST_2 VALUES ('LG');

|name     |id
|---------|--
|MICROSOFT| 1
|IBM      | 2
|APPLE    | 3
|SAMSUNG  | 4
;

ALTER TABLE TB_PRODUCT_PK_TEST
DROP CONSTRAINT TB_PRODUCT_PK_TEST_PKEY;

SELECT * FROM TB_PRODUCT_PK_TEST; 

ALTER TABLE TB_PRODUCT_PK_TEST_2
DROP CONSTRAINT TB_PRODUCT_PK_TEST_2_PKEY;

SELECT * FROM TB_PRODUCT_PK_TEST_2;


```
<br>
<br>

## 외래키
```sql
DROP TABLE SO_HEADERS;
DROP TABLE SO_ITEMS;


CREATE TABLE SO_HEADERS (
  ID SERIAL PRIMARY KEY
, CUSTOMER_ID INTEGER
, SHIP_TO VARCHAR (255)
);

CREATE TABLE SO_ITEMS (
  ITEM_ID INTEGER NOT NULL
, SO_ID INTEGER
, PRODUCT_ID INTEGER
, QTY INTEGER
, NET_PRICE INTEGER
, PRIMARY KEY (ITEM_ID, SO_ID)
);

ALTER TABLE SO_ITEMS ADD CONSTRAINT FK_SO_HEADERS_ID FOREIGN KEY (SO_ID) REFERENCES SO_HEADERS(ID); 

INSERT INTO SO_HEADERS(CUSTOMER_ID, SHIP_TO)
VALUES 
 (10, '4000 North First Street, CA 95134, USA')
,(20, '1900 North First Street, CA 95134, USA')
,(10, '4000 North First Street, CA 95134, USA')
	; 

COMMIT;

SELECT * FROM SO_HEADERS; 

INSERT INTO SO_ITEMS(ITEM_ID, SO_ID, PRODUCT_ID, QTY, NET_PRICE)
VALUES 
 (1, 1, 1001, 2, 1000)
,(2, 1, 1000, 3, 1500)
,(3, 2, 1000, 4, 1500)
,(1, 2, 1001, 5, 1000)
,(2, 3, 1002, 2, 1700)
,(3, 3, 1003, 1, 2000)
; 

COMMIT; 

SELECT * FROM SO_ITEMS; 
-- 4가 없는데 넣으려고하면 오류
INSERT INTO SO_ITEMS(ITEM_ID, SO_ID, PRODUCT_ID, QTY, NET_PRICE)
VALUES 
 (1, 4, 1001, 2, 1000)
;



SELECT * FROM SO_ITEMS; 
ROLLBACK; 

COMMIT; 


SQL Error [23503]: 오류: "so_items" 테이블에서 자료 추가, 갱신 작업이 "fk_so_headers_id" 참조키(foreign key) 제약 조건을 위배했습니다
  Detail: (so_id)=(4) 키가 "so_headers" 테이블에 없습니다.

;

ALTER TABLE SO_ITEMS 
DROP CONSTRAINT FK_SO_HEADERS_ID;

CREATE TABLE SO_ITEMS (
  ITEM_ID INTEGER NOT NULL, 
  SO_ID INTEGER REFERENCES SO_HEADERS(ID),
  PRODUCT_ID INTEGER,
  QTY INTEGER,
  NET_PRICE NUMERIC,
  PRIMARY KEY (ITEM_ID,SO_ID)
);



CREATE TABLE CHILD_TABLE(
  C1 INTEGER PRIMARY KEY,
  C2 INTEGER,
  C3 INTEGER,
  FOREIGN KEY (C2, C3) REFERENCES PARENT_TABLE (P1, P2)
);

```
<br>
<br>

## Check
```sql
CREATE TABLE TB_EMP_CHECK_TEST (
  ID SERIAL PRIMARY KEY
, FIRST_NAME VARCHAR (50)
, LAST_NAME VARCHAR (50)
, BIRTH_DATE DATE CHECK (BIRTH_DATE > '1900-01-01')
, JOINED_DATE DATE CHECK (JOINED_DATE > BIRTH_DATE)
, SALARY NUMERIC CHECK(SALARY > 0)
);

INSERT INTO TB_EMP_CHECK_TEST (
  FIRST_NAME
, LAST_NAME
, BIRTH_DATE
, JOINED_DATE
, SALARY
)
VALUES
 (
  'JOHN'
, 'DOE'
, '1972-01-01'
, '2015-07-01'
, -100000
 );



SQL Error [23514]: 오류: 새 자료가 "tb_emp_check_test" 릴레이션의 "tb_emp_check_test_salary_check" 체크 제약 조건을 위반했습니다
  Detail: 실패한 자료: (1, John, Doe, 1972-01-01, 2015-07-01, -100000)

  ;
 
 
 

ALTER TABLE TB_EMP_CHECK_TEST 
ADD CONSTRAINT SALARY_RANGE_CHECK 
CHECK (SALARY > 0 AND SALARY <= 10000000000)
;

ALTER TABLE TB_EMP_CHECK_TEST 
ADD CONSTRAINT NAME_CHECK 
CHECK (LENGTH(FIRST_NAME) > 0 AND LENGTH(LAST_NAME) > 0)
;

------------------------------------------------------------------------

```
<br>
<br>

## Unique
```sql
CREATE TABLE PERSON (
  ID SERIAL PRIMARY KEY
, FIRST_NAME VARCHAR (50)
, LAST_NAME VARCHAR (50)
, EMAIL VARCHAR (50)
, UNIQUE(EMAIL)
);

INSERT INTO PERSON(FIRST_NAME,LAST_NAME,EMAIL)
VALUES
 (
 'john',
 'doe',
 'j.doe@postgresqltutorial.com'
 );
 
COMMIT;
SELECT * FROM person; 

INSERT INTO PERSON(FIRST_NAME,LAST_NAME,EMAIL)
VALUES
 (
 'john',
 'doe',
 'j.doe@postgresqltutorial.com'
 );
 
COMMIT; 

SQL Error [23505]: 오류: 중복된 키 값이 "person_email_key" 고유 제약 조건을 위반함
  Detail: (email)=(j.doe@postgresqltutorial.com) 키가 이미 있습니다.
  ;
  
 
CREATE TABLE PERSON_UNIQUE_INDEX_TEST (
  ID SERIAL PRIMARY KEY
, FIRST_NAME VARCHAR (50)
, LAST_NAME VARCHAR (50)
, EMAIL VARCHAR (50)
);

CREATE UNIQUE INDEX IX_PERSON_UNIQUE_INDEX_TEST_01 ON PERSON_UNIQUE_INDEX_TEST(EMAIL); 

INSERT INTO PERSON_UNIQUE_INDEX_TEST(FIRST_NAME,LAST_NAME,EMAIL)
VALUES
 (
 'john',
 'doe',
 'j.doe@postgresqltutorial.com'
 );
 
COMMIT;

SELECT * FROM PERSON_UNIQUE_INDEX_TEST;


INSERT INTO PERSON_UNIQUE_INDEX_TEST(FIRST_NAME,LAST_NAME,EMAIL)
VALUES
 (
 'john',
 'doe',
 'j.doe@postgresqltutorial.com'
 );
 
COMMIT;

SQL Error [23505]: 오류: 중복된 키 값이 "ix_person_unique_index_test_01" 고유 제약 조건을 위반함
  Detail: (email)=(j.doe@postgresqltutorial.com) 키가 이미 있습니다.

```
<br>
<br>

## Not Null
```sql
CREATE TABLE INVOICE(
  ID SERIAL PRIMARY KEY
, PRODUCT_ID INT NOT NULL
, QTY NUMERIC NOT NULL CHECK(QTY > 0)
, NET_PRICE NUMERIC CHECK(NET_PRICE > 0)
);

INSERT INTO INVOICE (PRODUCT_ID, QTY, NET_PRICE)
VALUES 
	(NULL, 1, 1)
; 

SQL Error [23502]: 오류: "product_id" 칼럼의 null 값이 not null 제약조건을 위반했습니다.
  Detail: 실패한 자료: (1, null, 1, 1)
  ;
  
 CREATE TABLE INVOICE_UPDATE_TEST(
  ID SERIAL PRIMARY KEY
, PRODUCT_ID INT NOT NULL
, QTY NUMERIC NOT NULL CHECK(QTY > 0)
, NET_PRICE NUMERIC CHECK(NET_PRICE > 0)
);

INSERT INTO INVOICE_UPDATE_TEST (PRODUCT_ID, QTY, NET_PRICE)
VALUES 
(1, 1, 1)
;

COMMIT; 

SELECT * FROM INVOICE_UPDATE_TEST; 

UPDATE
	INVOICE_UPDATE_TEST
SET
	PRODUCT_ID = NULL   -- productid가 NOT NULL 제약 조건이 걸려있어서 에러
WHERE
	PRODUCT_ID = 1
	;



SQL Error [23502]: 오류: "product_id" 칼럼의 null 값이 not null 제약조건을 위반했습니다.
  Detail: 실패한 자료: (1, null, 1, 1)

```
<br>
<br>

## 연습문제
### 1
```sql
영화 예매 시스템을 구축하고자 한다. 아래의 요구조건을 부합하는 물리 테이블을 생성하고 임의의 테스트 데이터를 입력하시오.

고객(TB_MOVIE_CUST) 테이블을 생성한다. 
예매(TB_MOVIE_RESV) 테이블을 생성한다.

고객 테이블의 테이블 구성은 아래와 같다.
  고객ID(문자열10자리)  
, 고객명(문자열최대50) 
, 성별(문자열최대6)
, 생년월일(DATE)
, 주소(문자열최대200)
, 핸드폰번호(문자열최대13자리)
, 고객등급(문자열1자리)
, 회원가입일자(DATE)
, 회원탈퇴일자(DATE)

고객ID는 고객 테이블의 기본키이다. 
고객명은 널값을 가질수 없다. 
성별은 남자 혹은 여자의 값만 가진다. 
생년월일은 널값을 가질수 없다. 
주소는 넒값을 가질수 있다. 
핸드폰번호는 널값을 가질 수 있다. 
고객등급은 널값을 가질수 없다.
고객등급은 S, A, B, C, D 값만 허용한다. 
회원가입일자는 널값을 가질수 없다. 
회원탈퇴일자는 널값을 가질수 없고 기본값은 9999년 12월 31일로 한다. 
회원가입일자는 회원탈퇴일자보다 작아야 한다. 

예매 테이블의 테이블 구성은 아래와 같다. 
 예매번호(문자열10자리)
,영화ID(문자열6자리)
,영화관번호(문자열6자리)
,고객ID(문자열10자리)
,영화시작시간(TIMESTAMP)
,영화종료시간(TIMESTAMP)
,좌석번호(문자열4자리)

예매번호는 예매테이블의 기본키이다. 
영화ID는 널값을 가질수 없다. 
영화관번호는 넒갑을 가질수 없다. 
고객ID는 널값을 가질수 없고 고객테이블의 고객ID를 참조한다. 
영화시작시간은 널값을 가질수 없다. 
영화종료시간은 넒값을 가질수 없다. 
영화시작시간은 영화종료시작보다 반드시 작아야 한다. 
좌석번호는 널값을 가질수 없다. 
;

DROP TABLE TB_MOVIE_CUST; 

CREATE TABLE TB_MOVIE_CUST 
(
  CUST_ID CHAR(10) PRIMARY KEY
, CUST_NM VARCHAR(50) NOT NULL		
, SEX VARCHAR(6) NOT NULL CHECK (SEX IN ('남자','여자') )
, BIRTH_DATE DATE NOT NULL 
, ADDRESS VARCHAR(200) 
, PHONE_NUMBER VARCHAR(13) 
, CUST_GRADE CHAR(1) CHECK (CUST_GRADE IN ('S', 'A', 'B', 'C', 'D') )
, JOIN_DT DATE NOT NULL CHECK (JOIN_DT <= EXPIRE_DT)
, EXPIRE_DT DATE NOT NULL DEFAULT TO_DATE('9999-12-31', 'YYYY-MM-DD')
);


INSERT INTO TB_MOVIE_CUST(CUST_ID, CUST_NM, SEX, BIRTH_DATE, ADDRESS, PHONE_NUMBER, CUST_GRADE,JOIN_DT) 
VALUES 
	  ('0000000001', '이경오', '남자', TO_DATE('1984-06-12', 'YYYY-MM-DD'), '경기도 안양시 동안구 비산동 1-1', '010-1234-1234', 'S', TO_DATE('2017-01-01', 'YYYY-MM-DD'))
	, ('0000000002', '홍길동', '남자', TO_DATE('1971-07-04', 'YYYY-MM-DD'), '경기도 안양시 동안구 비산동 1-2', '010-4321-4321', 'A', TO_DATE('2018-06-01', 'YYYY-MM-DD'))
	, ('0000000003', '이수지', '여자', TO_DATE('1994-12-28', 'YYYY-MM-DD'), '경기도 안양시 동안구 비산동 1-3', '010-5678-5678', 'B', TO_DATE('2019-12-01', 'YYYY-MM-DD'))
	; 

COMMIT; 

SELECT * FROM TB_MOVIE_CUST;
ROLLBACK; 

DROP TABLE TB_MOVIE_RESV; 

CREATE TABLE TB_MOVIE_RESV
(
  RESV_NO CHAR(10) PRIMARY KEY 
, MOVIE_ID CHAR(6) NOT NULL 
, MOVIE_Theater_ID CHAR(6) NOT NULL 
, CUST_ID CHAR(10) REFERENCES TB_MOVIE_CUST(CUST_ID) NOT NULL  
, MOVIE_START_TIME TIMESTAMP NOT NULL CHECK (MOVIE_START_TIME < MOVIE_END_TIME) 
, MOVIE_END_TIME TIMESTAMP NOT NULL 
, SEAT_NO CHAR(4) NOT NULL 
)
;

INSERT INTO TB_MOVIE_RESV 
VALUES 
	('9000000001', '000001', '000010', '0000000001', to_timestamp('2019-05-01 14:00:00', 'YYYY-MM-DD HH24:MI:SS'), to_timestamp('2019-05-01 17:30:00', 'YYYY-MM-DD HH24:MI:SS'), 'A-01')  
, 	('9000000002', '000002', '000020', '0000000001', to_timestamp('2019-04-01 14:00:00', 'YYYY-MM-DD HH24:MI:SS'), to_timestamp('2019-05-01 17:30:00', 'YYYY-MM-DD HH24:MI:SS'), 'A-11')
, 	('9000000003', '000003', '000040', '0000000002', to_timestamp('2019-03-01 16:00:00', 'YYYY-MM-DD HH24:MI:SS'), to_timestamp('2019-05-01 18:30:00', 'YYYY-MM-DD HH24:MI:SS'), 'B-12')
, 	('9000000004', '000004', '000050', '0000000002', to_timestamp('2019-03-25 21:00:00', 'YYYY-MM-DD HH24:MI:SS'), to_timestamp('2019-05-01 23:30:00', 'YYYY-MM-DD HH24:MI:SS'), 'C-02')
, 	('9000000005', '000005', '000060', '0000000003', to_timestamp('2018-07-11 16:00:00', 'YYYY-MM-DD HH24:MI:SS'), to_timestamp('2019-05-01 18:30:00', 'YYYY-MM-DD HH24:MI:SS'), 'E-03')
, 	('9000000006', '000006', '000060', '0000000003', to_timestamp('2018-08-15 21:00:00', 'YYYY-MM-DD HH24:MI:SS'), to_timestamp('2019-05-01 23:30:00', 'YYYY-MM-DD HH24:MI:SS'), 'D-10')
;

COMMIT; 

SELECT * FROM TB_MOVIE_RESV; 
```
<br>
<br>

### 2
```sql
DELETE FROM TB_MOVIE_CUST
WHERE CUST_ID NOT IN ('0000000001', '0000000002', '0000000003');

COMMIT; 

INSERT INTO TB_MOVIE_CUST(CUST_ID, CUST_NM, SEX, BIRTH_DATE, ADDRESS, PHONE_NUMBER, CUST_GRADE,JOIN_DT) 
VALUES 
  ('0000000001', '이경오', '남자', TO_DATE('1984-06-12', 'YYYY-MM-DD'), '경기도 안양시 동안구 비산동 1-1', '010-1234-1234', 'S', TO_DATE('2017-01-01', 'YYYY-MM-DD'))
, ('0000000002', '홍길동', '남자', TO_DATE('1971-07-04', 'YYYY-MM-DD'), '경기도 안양시 동안구 비산동 1-2', '010-4321-4321', 'A', TO_DATE('2018-06-01', 'YYYY-MM-DD'))
, ('0000000003', '이수지', '여자', TO_DATE('1994-12-28', 'YYYY-MM-DD'), '경기도 안양시 동안구 비산동 1-3', '010-5678-5678', 'B', TO_DATE('2019-12-01', 'YYYY-MM-DD'))
; 


INSERT INTO TB_MOVIE_CUST(CUST_ID, CUST_NM, SEX, BIRTH_DATE, ADDRESS, PHONE_NUMBER, CUST_GRADE,JOIN_DT) 
VALUES 
  ('0000000004', '이승우', '남자', TO_DATE('1984-06-12', 'YYYY-MM-DD'), '경기도 안양시 동안구 비산동 1-1', '010-1234-1234', 'A', TO_DATE('2017-01-01', 'YYYY-MM-DD'))
, ('0000000005', '안정환', '남자', TO_DATE('1971-07-04', 'YYYY-MM-DD'), '경기도 안양시 동안구 비산동 1-2', '010-4321-4321', 'A', TO_DATE('2018-06-01', 'YYYY-MM-DD'))
, ('0000000006', '고종수', '여자', TO_DATE('1994-12-28', 'YYYY-MM-DD'), '경기도 안양시 동안구 비산동 1-3', '010-5678-5678', 'C', TO_DATE('2019-12-01', 'YYYY-MM-DD'))
, ('0000000007', '기성용', '남자', TO_DATE('1984-06-12', 'YYYY-MM-DD'), '경기도 안양시 동안구 비산동 1-1', '010-1234-1234', 'B', TO_DATE('2017-01-01', 'YYYY-MM-DD'))
, ('0000000008', '이청용', '남자', TO_DATE('1971-07-04', 'YYYY-MM-DD'), '경기도 안양시 동안구 비산동 1-2', '010-4321-4321', 'C', TO_DATE('2018-06-01', 'YYYY-MM-DD'))
, ('0000000009', '박지성', '여자', TO_DATE('1994-12-28', 'YYYY-MM-DD'), '경기도 안양시 동안구 비산동 1-3', '010-5678-5678', 'D', TO_DATE('2019-12-01', 'YYYY-MM-DD'))

; 

SELECT * FROM TB_MOVIE_CUST;



COMMIT; 



SELECT 
       COUNT(*) "전체고객수"
     , COUNT(DISTINCT CUST_GRADE) "등급의개수"
     , ROUND(MAX(AVG_BY_GRADE), 2) "등급별평균고객수"
     , MAX(MAX_BY_GRADE) "등급별최대고객수"
     , MAX(MIN_BY_GRADE) "등급별최소고객수"
     , MAX(GRADE_BY_MIN_EMP_COUNT) "최소고객수의등급"
     , MAX(GRADE_BY_MAX_EMP_COUNT) "최대고객수의등급"
  FROM 
       TB_MOVIE_CUST
     , (SELECT AVG(CNT) AVG_BY_GRADE, MAX(CNT) MAX_BY_GRADE, MIN(CNT) MIN_BY_GRADE
		FROM 
		(
			SELECT COUNT(*) CNT  
			FROM TB_MOVIE_CUST A
			GROUP BY CUST_GRADE
		) A
       ) B
     , (
        SELECT CUST_GRADE AS GRADE_BY_MIN_EMP_COUNT
        FROM 
        (
        SELECT CUST_GRADE, COUNT(*) CNT 
          FROM TB_MOVIE_CUST
         GROUP BY CUST_GRADE
         ORDER BY CNT 
        ) A 
        LIMIT 1
       ) C 
     , (     
        SELECT CUST_GRADE AS GRADE_BY_MAX_EMP_COUNT
        FROM 
        (
        SELECT CUST_GRADE, COUNT(*) CNT 
          FROM TB_MOVIE_CUST
         GROUP BY CUST_GRADE
         ORDER BY CNT DESC 
        )  A
       LIMIT 1
       ) D         
       ;

      
|전체고객수|등급의개수|등급별평균고객수|등급별최대고객수|등급별최소고객수|최소고객수의등급|최대고객수
|-------|--------|------------|--------|--------|--------|--------
|    9|    5|    1.80|       3|       1|D       |A       
      
```
<br>
<br>