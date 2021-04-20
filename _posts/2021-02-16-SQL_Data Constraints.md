---
title: "[SQL] 제약조건 - 기본키, 외래키, Check, Unique, Not Null"
date: 2021-2-16
categories:
  - study
tags:
  - sql
toc: true
toc_ads: true
toc_sticky: true
---

## 기본키 - 메인
- 기본키는 테이블 내에서 유일한 값이어야하고 NOT NULL이어야 한다
- 테이블 내에서 반드시 존재해야하는 실체 무결성에 대한 제약

```sql
---------- # 기본키 생성
CREATE TABLE TB_PRODUCT_PK_TEST (
  PRODUCT_NO INTEGER
, DESCRIPTION TEXT
, PRODUCT_COST NUMERIC
);

ALTER TABLE TB_PRODUCT_PK_TEST ADD PRIMARY KEY (PRODUCT_NO);

---------- # 기본키 생성 + AUTOINCREMENT
ALTER TABLE TB_PRODUCT_PK_TEST_2     -- AUTOINCREMENT로 기본키를 생성하면
  ADD COLUMN ID SERIAL PRIMARY KEY;  -- 기본키 컬럼이 추가되면서 값도 자동으로 생성

---------- # 기본키 제거
ALTER TABLE TB_PRODUCT_PK_TEST
  DROP CONSTRAINT TB_PRODUCT_PK_TEST_PKEY;
```
<br>
<br>

## 외래키 - 참조
- 외래키는 자식 테이블의 특정 컬럼이 부모 테이블의 특정 컬럼 값을 참조하는 것이다.
- 이를 참조 무결성이라고 한다.

```sql
---------- # 테이블 생성과 동시에 외래키 생성
CREATE TABLE SO_ITEMS (
  ITEM_ID INTEGER NOT NULL, 
  SO_ID INTEGER REFERENCES SO_HEADERS(ID),
  PRODUCT_ID INTEGER,
  QTY INTEGER,
  NET_PRICE NUMERIC,
  PRIMARY KEY (ITEM_ID,SO_ID)
);
---------- # 복합 외래키도 생성 가능
CREATE TABLE CHILD_TABLE(
  C1 INTEGER PRIMARY KEY,
  C2 INTEGER,
  C3 INTEGER,
  FOREIGN KEY (C2, C3) REFERENCES PARENT_TABLE (P1, P2)
);
---------- # 외래키 추가 생성 'REFERENCES'
ALTER TABLE SO_ITEMS
ADD CONSTRAINT FK_SO_HEADERS_ID
FOREIGN KEY (SO_ID)
REFERENCES SO_HEADERS(ID); 
---------- # 외래키 삭제
ALTER TABLE SO_ITEMS 
DROP CONSTRAINT FK_SO_HEADERS_ID;
```
<br>
<br>

## Check - 제약
- 체크 제약 조건은 특정 컬럼에 들어가는 값에 대한 제약을 가하는 것이다.
- 절대로 들어갈 수 없는 값이 들어가서 오류가 나는 것을 사전에 차단

```sql
---------- # 테이블 생성시 체크 조건 
CREATE TABLE TB_EMP_CHECK_TEST (
  ID SERIAL PRIMARY KEY
, FIRST_NAME VARCHAR (50)
, LAST_NAME VARCHAR (50)
, BIRTH_DATE DATE CHECK (BIRTH_DATE > '1900-01-01')    -- 생일은 1900.1.1 이후
, JOINED_DATE DATE CHECK (JOINED_DATE > BIRTH_DATE)    -- 입사일은 생일보다 큼
, SALARY NUMERIC CHECK(SALARY > 0)                     -- 연봉은 0보다 큼
);
---------- # 테이블 생성 후 체크 조건 추가
ALTER TABLE TB_EMP_CHECK_TEST 
  ADD CONSTRAINT SALARY_RANGE_CHECK 
  CHECK (SALARY > 0 AND SALARY <= 10000000000)         -- 연봉은 0보다 크고 100억 이하
;
```
<br>
<br>

## Unique - 유일
- 특정 컬럼 값이 한 테이블 내에서 유일하기를 보장

```sql
---------- # UNIQUE
CREATE TABLE PERSON (
    ID SERIAL PRIMARY KEY
  , FIRST_NAME VARCHAR (50)
  , LAST_NAME VARCHAR (50)
  , EMAIL VARCHAR (50)
  , UNIQUE(EMAIL)                                   -- 이메일 주소는 유일해야함
  );
---------- # UNIQUE INDEX 생성
CREATE TABLE PERSON_UNIQUE_INDEX_TEST (
    ID SERIAL PRIMARY KEY
  , FIRST_NAME VARCHAR (50)
  , LAST_NAME VARCHAR (50)
  , EMAIL VARCHAR (50)
  );

CREATE UNIQUE INDEX IX_PERSON_UNIQUE_INDEX_TEST_01
ON PERSON_UNIQUE_INDEX_TEST(EMAIL); 
```
<br>
<br>

## Not Null - Null값 방지
- NOT NULL 제약 조건은 특정 컬럼에 NULL 값이 들어가는 것을 방지

```sql
---------- # Not Null 조건 명시
CREATE TABLE INVOICE(
    ID SERIAL PRIMARY KEY
  , PRODUCT_ID INT NOT NULL
  , QTY NUMERIC NOT NULL CHECK(QTY > 0)
  , NET_PRICE NUMERIC CHECK(NET_PRICE > 0)
  );
```
<br>
<br>
