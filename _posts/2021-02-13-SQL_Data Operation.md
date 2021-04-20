---
title: "[SQL] 데이터 조작 - Insert, Update, UpdateJoin, Delete, Upsert, Export, Import"
date: 2021-2-13
categories:
  - study
tags:
  - sql
toc: true
toc_ads: true
toc_sticky: true
---

## Insert
- 테이블 안에 데이터 삽입

```sql
---------- # INSERT 
INSERT 
  INTO LINK 
(URL, NAME)
VALUES
 ('http://naver.com','Naver')
;
---------- # 작은따옴표 자체를 데이터로 입력
INSERT 
   INTO LINK 
(URL, NAME)
VALUES
 ('''http://naver.com''','''Naver''')
;
---------- # 동시에 N개 로우 입력
INSERT INTO LINK 
(URL, NAME)
VALUES
  ('http://www.google.com','Google')
, ('http://www.yahoo.com','Yahoo')
, ('http://www.bing.com','Bing')
;
---------- # 테이블을 테이블에 입력
CREATE TABLE LINK_TMP AS             -- LINK 테이블의 스키마(껍데기)만 가져와서 LINK_TMP 테이블을 생성
SELECT * FROM LINK WHERE 0=1;        -- LINK_TMP 테이블은 구조는 LINK와 같고 데이터는 0건

INSERT 
   INTO LINK_TMP 
SELECT * 
  FROM LINK
;

SELECT * FROM LINK_TMP;               -- A-B=0
SELECT * FROM LINK;                   -- B-A=0
```
<br>
<br>

## Update
- 테이블 데이터 수정
- 동시성에 유의해야 함

```sql
---------- # Update
ALTER TABLE LINK ADD COLUMN LAST_UPDATE DATE;                       -- 테이블에 컬럼 추가
ALTER TABLE LINK ALTER COLUMN LAST_UPDATE SET DEFAULT CURRENT_DATE; -- lastupdate 컬럼 변경 및 디폴트 값을 currentdate로

UPDATE LINK
   SET LAST_UPDATE = DEFAULT     -- lastupdate를 default로 update
 WHERE                           -- default는 currentdate로 이미 설정됨
       LAST_UPDATE IS NULL       -- LAST_UPDATE컬럼이 NULL인 값을 대상으로
;
---------- # Update: where절이 없으면 전체 테이블 대상
UPDATE LINK
   SET REL = 'NO DATA'
;
---------- # Update 전체 테이블 대상 + 특정 컬럼을 이용
UPDATE LINK
   SET DESCRIPTION = NAME         -- DESCRIPTION컬럼의 값을 NAME컬럼으로 수정
;
```
<br>
<br>

## Update Join
- 업데이트시 다른 테이블 내용 참조하고 싶을 때 사용

```sql
UPDATE PRODUCT A
   SET NET_PRICE = A.PRICE - (A.PRICE * B.DISCOUNT)  -- NET PRICE는 내부라 ALIAS 쓰지 않음
  FROM PRODUCT_SEGMENT B
   WHERE A.SEGMENT_ID = B.ID;
```
<br>
<br>

## Delete
- 전체 테이블이나 특정 데이터를 삭제할 때 사용

```sql
---------- # Delete + 전체 행
DELETE FROM LINK;
DELETE FROM LINK_TMP; 
---------- # Delete + 특정 조건의 행
DELETE 
  FROM 
       LINK
WHERE ID = 5                    -- id가 5인걸 삭제
;
---------- # Delete Join
DELETE 
  FROM 
      LINK_TMP A                -- LINK_TMP테이블 삭제
USING LINK B                    -- LINK테이블과 조인해서
WHERE A.ID = B.ID               -- id가 매칭되는 것만
;
```
<br>
<br>

## Upsert
- Insert 시도할 때 조건에 따라 Update할 수 있는 구문

```sql
---------- # Upsert + DO NOTHING
INSERT INTO CUSTOMERS (NAME, EMAIL)
VALUES
 (
 'Microsoft',                   -- name이 unique 조건인데, microsoft 이미있는데 추가 입력하므로 에러 발생
 'hotline@microsoft.com'
 ) ON CONFLICT (NAME)           -- name이 충돌 에러 발생시 
DO NOTHING;                     -- 아무것도 하지 마라
---------- # Upsert + DO NOTHING
INSERT INTO CUSTOMERS (NAME, EMAIL)
VALUES (
 'Microsoft',
 'hotline@microsoft.com'
 ) ON CONFLICT (NAME) 
DO UPDATE                       -- 충돌시 수정
   SET EMAIL = EXCLUDED.EMAIL ||
                          ';' ||
               CUSTOMERS.EMAIL
;
```
<br>
<br>

## Export
- 테이블 데이터를 다른 형태의 데이터로 추출
- 대표적으로 csv형식으로 가장 많이 추출함

```sql
---------- # Export + 엑셀형식
COPY CATEGORY(CATEGORY_ID, NAME, LAST_UPDATE) -- 추출할 테이블과 컬럼 지정
TO 'C:\tmp\DB_CATEGORY.csv'                   -- 추출한 데이터를 저장할 파일을 지정
DELIMITER ','                                 -- 구분자
CSV HEADER                                    -- 파일형식
;
---------- # Export + 텍스트형식
COPY CATEGORY(CATEGORY_ID, NAME, LAST_UPDATE) 
TO 'C:\tmp\DB_CATEGORY.txt' 
DELIMITER '|' 
CSV HEADER
;
---------- # Export + 컬럼명 없이
COPY CATEGORY(CATEGORY_ID, NAME, LAST_UPDATE) 
TO 'C:\tmp\DB_CATEGORY_2.csv' 
DELIMITER ',' 
CSV
;
```
<br>
<br>

## Import
- 다른 형식의 데이터를 테이블에 넣는 작업
- 데이터 구축시 사용

```sql
---------- # Import + 텍스트파일 적재
COPY CATEGORY_IMPORT(CATEGORY_ID, "NAME", LAST_UPDATE) 
FROM 'C:\tmp\DB_CATEGORY.txt' 
DELIMITER '|' 
CSV HEADER
;
---------- # Import + 엑셀파일 적재
COPY CATEGORY_IMPORT(CATEGORY_ID, "NAME", LAST_UPDATE)   -- 적재할 테이블 및 컬럼 지정
FROM 'C:\tmp\DB_CATEGORY.csv'                            -- 적재할 파일 지정
DELIMITER ','                                            -- 구분자
CSV HEADER                                               -- 파일형식
;
---------- # Import + 컬럼명 없는 엑셀 파일 적재
COPY CATEGORY_IMPORT(CATEGORY_ID, "NAME", LAST_UPDATE) 
FROM 'C:\tmp\DB_CATEGORY_2.csv' 
DELIMITER ',' 
CSV
;
```
<br>
<br>