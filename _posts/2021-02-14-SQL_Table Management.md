---
title: "[SQL] 테이블 관리 - 테이블 및 컬럼 생성/변경, CTAS, Truncate"
date: 2021-2-14
categories:
  - study
tags:
  - sql
toc: true
toc_ads: true
toc_sticky: true
---

## 테이블 생성
### 테이블 생성시 컬럼 제약 조건
- NOT NULL: 해당 컬럼은 NULL이 저장될수 없다
- UNIQUE: 해당 컬럼의 값은 테이블 내에서 유일해야 한다
- PRIMARY KEY: 해당 컬럼의 값은 테이블내에서 유일해야 하고 반드시 NOTNULL이어야 한다
- CHECK: 해당 컬럼은 지정하는 조건에 맞는 값이 들어가야 한다.
- REFERENCES: 해당 컬럼의 값은 참조하는 테이블의 특정 컬럼에 값이 존재해야 한다

```sql
---------- # 테이블 생성
CREATE TABLE ACCOUNT_ROLE (
    USER_ID INTEGER NOT NULL
  , ROLE_ID INTEGER NOT NULL
  , GRANT_DATE TIMESTAMP WITHOUT TIME ZONE
  , PRIMARY KEY (USER_ID, ROLE_ID)                             -- 기본키는 USER_ID + ROLE_ID로
  , CONSTRAINT ACCOUNT_ROLE_ROLE_ID_FKEY FOREIGN KEY (ROLE_ID) 
    REFERENCES ROLE (ROLE_ID) MATCH SIMPLE 
    ON UPDATE NO ACTION ON DELETE NO ACTION
  , CONSTRAINT ACCOUNT_ROLE_USER_ID_FKEY FOREIGN KEY (USER_ID) -- USER_ID 컬럼은 ACCOUNT테이블의 USER_ID컬럼을 참조
    REFERENCES ACCOUNT (USER_ID) MATCH SIMPLE ON               -- USER_ID 컬럼은 ACCOUNT테이블의 USER_ID컬럼에 대한
    UPDATE NO ACTION ON DELETE NO ACTION                       --  삭제 혹은 변경시 아무것도 하지 않는다
  )
;
---------- # 컬럼 수정
INSERT INTO ACCOUNT VALUES (1, '이름', '1234', 'dbmsexpert@naver.com', CURRENT_TIMESTAMP, null );
INSERT INTO ROLE VALUES(1, 'DBA'); 
INSERT INTO ACCOUNT_ROLE VALUES(2, 1, CURRENT_TIMESTAMP); -- 2번 user가 없으므로 에러
UPDATE ACCOUNT SET USER_ID = 2 WHERE USER_ID = 1;         -- userid 2가 없어서 에러
DELETE FROM ACCOUNT WHERE USER_ID = 1;                    -- 1번 아이디는 다른 것에 참조하고 있기때문에
                                                          -- 지울수 없음. account_role 지우고 지워야함
```
<br>
<br>

## CTAS
- Create Table As Select의 약어로, Select문을 기반으로 Create Table을 할 수 있는 문법

```sql
---------- # 기존 - 액션영화의 정보만으로 신규 테이블을 생성
SELECT
    A.FILM_ID
  , A.TITLE
  , A.RELEASE_YEAR
  , A.LENGTH
  , A.RATING
  FROM
    FILM A
  , FILM_CATEGORY B 
 WHERE A.FILM_ID = B.FILM_ID
   AND B.CATEGORY_ID = 1
;
---------- # CTAS - 액션영화의 정보만으로 신규 테이블을 생성
CREATE TABLE ACTION_FILM AS 
SELECT
       A.FILM_ID
     , A.TITLE
     , A.RELEASE_YEAR
     , A.LENGTH
     , A.RATING
  FROM
       FILM A
      , FILM_CATEGORY B 
 WHERE A.FILM_ID = B.FILM_ID
   AND B.CATEGORY_ID = 1
;
---------- # CTAS + IF NOT EXISTS
CREATE TABLE IF NOT EXISTS ACTION_FILM AS   -- 기존에 테이블이 있어도 
SELECT                                      -- IF NOT EXISTS로인해 에러 안 남
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
```
<br>
<br>

## 테이블 변경
### 테이블 구조 변경

```sql
---------- # ALTER 수정
ALTER TABLE LINKS ADD COLUMN ACTIVE BOOLEAN;                  -- 컬럼 추가
ALTER TABLE LINKS DROP COLUMN ACTIVE;                         -- 컬럼 제거
ALTER TABLE LINKS RENAME COLUMN TITLE TO LINK_TITLE;          -- 컬럼명 변경
ALTER TABLE LINKS ADD COLUMN TARGET VARCHAR(10);              -- 컬럼 추가
ALTER TABLE LINKS ALTER COLUMN TARGET SET DEFAULT '_blank';   -- 사용자가 아무런 값 안 넣어도 디폴트 값으로 _blank 들어감

---------- # 응용
INSERT INTO LINKS (LINK_TITLE, URL)                           -- TARGET컬럼은 NULL로 새로운 행을 입력
VALUES('PostgreSQL Tutorial','http://www.postgresqltutorial.com/');

ALTER TABLE LINKS                                             -- TARGET컬럼에 체크 제약 조건 추가
ADD CHECK (TARGET IN ('_self', '_blank', '_parent', '_top'));

INSERT INTO LINKS(LINK_TITLE,URL,TARGET)                      -- target컬럼의 체크 제약 조건에 없는 
VALUES('PostgreSQL','http://www.postgresql.org/','_self');    -- whatever 값으로 insert하면 에러
```
<br>
<br>

### 테이블 이름 변경
- 테이블 이름을 변경하면, 기존의 참조무결성 제약조건이나 뷰 등이 자동으로 반영된다. 

```sql
---------- # 테이블 생성
CREATE TABLE VENDORS (
  ID SERIAL PRIMARY KEY
, NAME VARCHAR NOT NULL
);
---------- # 이름 변경
ALTER TABLE VENDORS RENAME TO SUPPLIERS;
---------- # 테이블 컬럼 추가 + FK 생성
ALTER TABLE SUPPLIERS ADD COLUMN GROUP_ID INT NOT NULL;
ALTER TABLE SUPPLIERS ADD FOREIGN KEY (GROUP_ID) REFERENCES SUPPLIER_GROUPS (ID);
---------- # 뷰 생성 - 뷰는 실체하는 데이터가 아닌 보기용
CREATE VIEW SUPPLIER_DATA AS 
SELECT
       S.ID
     , S.NAME
     , G.NAME "GROUP"
  FROM
    SUPPLIERS S, SUPPLIER_GROUPS G 
WHERE G.ID = S.GROUP_ID
;
---------- # 이름을 바꾸면 다른 sql문에서도 자동으로 이름 바뀜
ALTER TABLE SUPPLIER_GROUPS RENAME TO GROUPS; 
```
<br>
<br>

## 컬럼 변경
### 컬럼 추가

```sql
---------- # 테이블 생성
CREATE TABLE TB_CUST (
  CUST_ID SERIAL PRIMARY KEY
, CUST_NAME VARCHAR(50) NOT NULL
);
---------- # 컬럼 추가
ALTER TABLE TB_CUST
ADD COLUMN PHONE_NUMBER VARCHAR(13);       -- 한번에 한개
ALTER TABLE TB_CUST                        -- 한번에 두개
 ADD COLUMN FAX_NUMBER VARCHAR(13),
 ADD COLUMN EMAIL_ADDR VARCHAR(50);
---------- # Not null 오류시
ALTER TABLE TB_CUST                        -- 새로 컬럼 추가하면 null값으로 들어가는데
ADD COLUMN CONTACT_NM VARCHAR NOT NULL;    -- NOT null로 지정하니까 오류남

ALTER TABLE TB_CUST 
ADD COLUMN CONTACT_NM VARCHAR NULL;        -- NULL 조건으로 컬럼 추가시 해결됨
```
<br>
<br>

### 컬럼 제거
- 컬럼 하나만 삭제해도 다른게 다 삭제되므로 항상 조심

```sql
---------- # categoryid 제거시 fk도 함께 삭제
ALTER TABLE BOOKS DROP COLUMN CATEGORY_ID;
---------- # view에서 참조하고 있기때문에 지울수 없음
ALTER TABLE BOOKS DROP COLUMN PUBLISHER_ID;
---------- # 이런 경우에는 CACADE옵션을 줘서 삭제
ALTER TABLE BOOKS DROP COLUMN PUBLISHER_ID CASCADE;  -- 
---------- # 동시에 N개 컬럼 제거
ALTER TABLE BOOKS
  DROP COLUMN ISBN,
  DROP COLUMN DESCRIPTION
;
```
<br>
<br>

### 컬럼 데이터 타입 변경

```sql
---------- # NAME컬럼의 데이터 타입 변경
ALTER TABLE ASSETS ALTER COLUMN NAME TYPE VARCHAR(50);
---------- # 한번에 N개 컬럼의 데이터 타입을 변경
ALTER TABLE ASSETS 
    ALTER COLUMN LOCATION TYPE VARCHAR(100),
    ALTER COLUMN DESCRIPTION TYPE VARCHAR(500);
---------- # INT형으로 변경
ALTER TABLE ASSETS ALTER COLUMN ASSET_NO TYPE INT;    -- 실패
ALTER TABLE ASSETS                                    -- 성공
    ALTER COLUMN ASSET_NO TYPE INT
    USING ASSET_NO::INTEGER
;    
```
<br>
<br>

### 컬럼 이름 변경

```sql
ALTER TABLE CUSTOMERS RENAME COLUMN EMAIL TO CONTACT_EMAIL;
ALTER TABLE CUSTOMER_GROUPS RENAME COLUMN NAME TO GROUP_NAME;
```
<br>
<br>

### 테이블 제거
- 자식 테이블은 삭제할 수 있어도 부모 테이블은 삭제 못 함

```sql
---------- # FK제약조건으로 인해 테이블 제거 실패
DROP TABLE AUTHOR; 
---------- # 부모 테이블 날리고 싶으면 CASCADE 사용
DROP TABLE AUTHOR CASCADE;
---------- # 자식 테이블은 존재하지만 FK제약조건은 삭제됨
SELECT * FROM PAGE;
```
<br>
<br>

### 임시 테이블
- 임시테이블은 DB 접속 세션의 활동 기간 동안만 존재하는 테이블
- 세션이 종료되면 임시테이블은 자동으로 소멸됨
- 세션 접속 방법: 왼쪽 DB패널에서 이름 오른쪽 클릭 > Connect/Disconnect
- 기존 테이블과 같은 이름의 임시 테이블이 있을 때, 테이블을 삭제하면 임시 테이블 먼저 삭제됨.

```sql
---------- # 임시 테이블 생성
CREATE TEMP TABLE TB_CUST_TEMP_TEST(CUST_ID INT);

---------- # 세션 재접속 후 임시 테이블 뷰 사라짐
SELECT * FROM TB_CUST_TEMP_TEST;

SQL Error [42P01]: 오류: "tb_cust_temp_test" 이름의 릴레이션(relation)이 없습니다

---------- # 기존 테이블과 같은 이름의 임시 테이블
CREATE TABLE TB_CUST_TEMP_TEST (                  -- 기존 테이블
    CUST_ID SERIAL PRIMARY KEY
  , CUST_NM VARCHAR NOT NULL
  )
;

CREATE TEMP TABLE TB_CUST_TEMP_TEST(CUST_ID INT); -- 기존과 같은 이름의 임시 테이블 생성
SELECT * FROM TB_CUST_TEMP_TEST;                  -- 임시 테이블로 인식
DROP TABLE TB_CUST_TEMP_TEST;                     -- 테이블 제거
SELECT * FROM TB_CUST_TEMP_TEST;                  -- 다시 일반 테이블로 인식
```
<br>
<br>

### TRUNCATE
- 대용량의 테이블을 빠르게 지우는 방법
- 테이블의 세그먼트 자체를 바로 지워서 빠르다
- Delete와 Truncate 차이
  - DELETE명령어
   - 데이터는 지워지지만 테이블 용량은 줄어 들지 않는다
   - 원하는 데이터만 지울 수 있다
   - 삭제 후 잘못 삭제한 것을 되돌릴 수있다
   - 속도가 느리다
  - TRUNCATE명령어
    - 용량이 줄어 들어 든다
    - 테이블은 삭제하지는 않고, 데이터만 삭제한다
    - 한꺼번에 다 지워야 한다
    - 삭제 후 되돌릴 수 없다
    - 속도가 빠르다

```sql
TRUNCATE TABLE BIG_TABLE;                          -- 테이블 데이터를 빠르게 삭제
TRUNCATE TABLE BIG_TABLE, BIG_TABLE_2;             -- N개 테이블의 데이터를 빠르게 삭제
```
<br>
<br>

## 연습문제
### 1. 고객별 매출 순위

```sql
---------- # 1. CUSTOMER_ID로 GROUPBY한후 AMOUNT의 합계
SELECT CUSTOMER_ID, SUM(A.AMOUNT) AS SUM_AMOUNT
  FROM PAYMENT A
  GROUP BY A.CUSTOMER_ID
;
---------- # 2. 1번에 추출한 집합을 인라인 뷰로 감싸서 AMOUNT합계별 순위
SELECT A.CUSTOMER_ID, ROW_NUMBER()
  OVER (ORDER BY A.SUM_AMOUNT DESC) AS CUSTOMER_RANK
  FROM (
    SELECT CUSTOMER_ID, SUM(A.AMOUNT) AS SUM_AMOUNT
      FROM PAYMENT A
      GROUP BY A.CUSTOMER_ID) A
  ORDER BY CUSTOMER_RANK ASC
;
---------- # 3. 최종적으로 CTAS문을 이용하여 테이블 생성 및 데이터를 입력
CREATE TABLE CUSTOMER_RANK AS
  SELECT A.CUSTOMER_ID, ROW_NUMBER()
    OVER(ORDER BY A.SUM_AMOUNT DESC) AS CUSTOMER_RANK
  FROM (
    SELECT CUSTOMER_ID, SUM(A.AMOUNT) AS SUM_AMOUNT
      FROM PAYMENT A
      GROUP BY A.CUSTOMER_ID) A
  ORDER BY CUSTOMER_RANK ASC
;
```
<br>
<br>

### 2. 매출 1순위 고객

```sql
---------- # 1. CUSTOMER_ID,YYYYMM기준으로 GROUPBY한 후 AMOUNT 합계
SELECT
  CUSTOMER_ID
  , TO_CHAR(payment_date, 'YYYYMM') AS YYYYMM
  , SUM(A.AMOUNT) AS SUM_AMOUNT
  FROM PAYMENT A
  GROUP BY A.CUSTOMER_ID
        , TO_CHAR(payment_date, 'YYYYMM')
;
---------- # 2. 1번에 추출한 집합을 인라인 뷰로 감싸서 YYYYMM을 기준으로 AMOUNT합계 별 순위
SELECT A.CUSTOMER_ID
     , YYYYMM, SUM_AMOUNT
     , ROW_NUMBER() OVER (
       PARTITION BY YYYYMM ORDER BY SUM_AMOUNT DESC) AS RANK_YYYYMM
  FROM (
    SELECT CUSTOMER_ID
    , TO_CHAR(payment_date, 'YYYYMM') AS YYYYMM
    , SUM(A.AMOUNT) AS SUM_AMOUNT
      FROM PAYMENT A
      GROUP BY A.CUSTOMER_ID
             , TO_CHAR(payment_date, 'YYYYMM')) A
  ORDER BY YYYYMM, RANK_YYYYMM
;
---------- # 3. CTAS문을 이용하여 최종적으로 테이블 생성 및 데이터를 입력
CREATE TABLE CUSTOMER_RANK_YYYYMM AS
SELECT A.CUSTOMER_ID
     , YYYYMM
     , SUM_AMOUNT
     , ROW_NUMBER() OVER(
       PARTITION BY YYYYMM ORDER BY SUM_AMOUNT DESC) AS RANK_YYYYMM
  FROM (
    SELECT
      CUSTOMER_ID
    , TO_CHAR(payment_date, 'YYYYMM') AS YYYYMM
    , SUM(A.AMOUNT) AS SUM_AMOUNT
    FROM PAYMENT A
    GROUP BY A.CUSTOMER_ID
           , TO_CHAR(payment_date, 'YYYYMM')
        ) A
  ORDER BY YYYYMM
         , RANK_YYYYMM
;
```
<br>
<br>