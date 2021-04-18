---
title: "[SQL] 데이터 조작-Insert, Update, UpdateJoin, Delete, Upsert, Export, Import"
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
```sql
DROP TABLE LINK; 

CREATE TABLE LINK (
  ID SERIAL PRIMARY KEY
, URL VARCHAR (255) NOT NULL
, NAME VARCHAR (255) NOT NULL
, DESCRIPTION VARCHAR (255)
, REL VARCHAR (50)
);

SELECT * FROM link; 



 INSERT 
  INTO LINK 
(URL, NAME)
VALUES
 ('http://naver.com','Naver')
;

COMMIT;




SELECT * FROM LINK; 





 INSERT 
   INTO LINK 
(URL, NAME)
VALUES
 ('''http://naver.com''','''Naver''')
;

COMMIT;






SELECT * FROM LINK; 










 INSERT INTO LINK 
(URL, NAME)
VALUES
  ('http://www.google.com','Google')
, ('http://www.yahoo.com','Yahoo')
, ('http://www.bing.com','Bing')
;
COMMIT;

SELECT * FROM link; 



 

CREATE TABLE LINK_TMP AS 
SELECT * FROM LINK WHERE 0=1;













INSERT 
   INTO LINK_TMP 
SELECT * 
  FROM LINK
;

COMMiT;

SELECT * FROM LINK_TMP
EXCEPT 
SELECT * FROM link;

SELECT * FROM link
EXCEPT 
SELECT * FROM LINK_TMP; 


--A-B=0
--B-A=0


```
<br>
<br>

## Update
```sql
ALTER TABLE LINK ADD COLUMN LAST_UPDATE DATE;
ALTER TABLE LINK ALTER COLUMN LAST_UPDATE SET DEFAULT CURRENT_DATE;
-- link 테이블 lastupdate 컬럼 변경, 디폴트 값을 currentdate로


SELECT * FROM LINK;



-- default는 currentdate로 이미 설정됨
UPDATE LINK
   SET LAST_UPDATE = DEFAULT     -- lastupdate를 default로 설정
 WHERE 
       LAST_UPDATE IS NULL;

COMMiT;

SELECT * FROM LINK;





-- where절이 없으면 전체 테이블 대상
UPDATE LINK
   SET REL = 'NO DATA'
;

COMMIT;


SELECT * FROM LINK;











UPDATE LINK
   SET DESCRIPTION = NAME
;

COMMIT;




SELECT * FROM LINK;


```
<br>
<br>

## Update Join
```sql
CREATE TABLE PRODUCT_SEGMENT 
(
  ID SERIAL PRIMARY KEY
, SEGMENT VARCHAR NOT NULL
, DISCOUNT NUMERIC (4, 2)
);
 
INSERT INTO PRODUCT_SEGMENT 
(SEGMENT, DISCOUNT)
VALUES
       ('Grand Luxury', 0.05)
     , ('Luxury', 0.06)
     , ('Mass', 0.1);
     
COMMIT; 

SELECT * FROM PRODUCT_SEGMENT; 








DROP TABLE PRODUCT; 
CREATE TABLE PRODUCT(
  ID SERIAL PRIMARY KEY
, NAME VARCHAR NOT NULL
, PRICE NUMERIC(10, 2)
, NET_PRICE NUMERIC(10, 2)
, SEGMENT_ID INT NOT NULL
, FOREIGN KEY(SEGMENT_ID) 
  REFERENCES PRODUCT_SEGMENT(ID)
);












INSERT INTO PRODUCT (NAME, PRICE, SEGMENT_ID) 
VALUES   
         ('K5', 804.89, 1)
       , ('K7', 228.55, 3)
       , ('K9', 366.45, 2)
       , ('SONATA', 145.33, 3)
       , ('SPARK', 551.77, 2)
       , ('AVANTE', 261.58, 3)
       , ('LOZTE', 519.62, 2)
       , ('SANTAFE', 843.31, 1)
       , ('TUSON', 254.18, 3)
       , ('TRAX', 427.78, 2)
       , ('ORANDO', 936.29, 1)
       , ('RAY', 910.34, 1)
       , ('MORNING', 208.33, 3)
       , ('VERNA', 985.45, 1)
       , ('K8', 841.26, 1)
       , ('TICO', 896.38, 1)
       , ('MATIZ', 575.74, 2)
       , ('SPORTAGE', 530.64, 2)
       , ('ACCENT', 892.43, 1)
       , ('TOSCA', 161.71, 3);

COMMIT; 

SELECT * FROM PRODUCT;













UPDATE PRODUCT A
   SET NET_PRICE = A.PRICE - (A.PRICE * B.DISCOUNT)  -- NET PRICE는 내부라 ALIAS 쓰지 않음
  FROM PRODUCT_SEGMENT B
 WHERE A.SEGMENT_ID = B.ID;

SELECT * FROM PRODUCT; 

COMMIT; 



```
<br>
<br>

## Delete
```sql
SELECT * FROM LINK_TMP; 

SELECT * FROM LINK; 

-- id가 5인걸 삭제해라
DELETE 
  FROM 
       LINK
WHERE ID = 5
;

COMMIT;







SELECT * FROM LINK; 

SELECT * FROM LINK_TMP;


--LINK_TMP A를 삭제, link b와 조인해서 id가 매칭되는 것만
--1 2 3 4 매칭 -> 1 2 3 4 날라가고 5는 살아남는다. 
DELETE 
  FROM 
      LINK_TMP A
USING LINK B
WHERE A.ID = B.ID
;

COMMIT; 

SELECT * FROM LINK_TMP;

--------------------------------------

DELETE FROM LINK;

COMMIT; 

DELETE FROM LINK_TMP; 

COMMIT;

SELECT COUNT(*) FROM LINK; 

SELECT COUNT(*) FROM LINK_TMP;




```
<br>
<br>

## Upsert
```sql
CREATE TABLE CUSTOMERS 
(
   CUSTOMER_ID SERIAL PRIMARY KEY
 , NAME VARCHAR UNIQUE
 , EMAIL VARCHAR NOT NULL
 , ACTIVE BOOL NOT NULL DEFAULT TRUE
);

INSERT INTO CUSTOMERS (NAME, EMAIL)
VALUES
 ('IBM', 'contact@ibm.com'),
 ('Microsoft', 'contact@microsoft.com'),
 ('Intel', 'contact@intel.com');
 
COMMIT; 

SELECT * FROM CUSTOMERS; 

INSERT INTO CUSTOMERS (NAME, EMAIL)
VALUES
 (
 'Microsoft',                -- name이 unique 조건인데, microsoft 이미있는데 추가 입력하므로 에러 발생
 'hotline@microsoft.com'
 ) 
ON CONFLICT (NAME)           -- name이 충돌 에러 발생시 아무것도 하지 마라
DO NOTHING;

INSERT INTO CUSTOMERS (NAME, EMAIL)
VALUES
 (
 'Microsoft',
 'hotline@microsoft.com'
 ) 
 ;
ON CONFLICT (NAME) 
DO NOTHING;

COMMIT;

SELECT * FROM CUSTOMERS; 

INSERT INTO CUSTOMERS (NAME, EMAIL)
VALUES
 (
 'Microsoft',
 'hotline@microsoft.com'
 ) 
ON CONFLICT (NAME) 
DO
 UPDATE
   SET EMAIL = EXCLUDED.EMAIL || ';' || CUSTOMERS.EMAIL;

  COMMIT;

SELECT * FROM CUSTOMERS; 


  


```
<br>
<br>

## Export
```sql
SELECT * FROM CATEGORY;

COPY CATEGORY(CATEGORY_ID, NAME, LAST_UPDATE) 
TO 'C:\tmp\DB_CATEGORY.csv' 
DELIMITER ',' 
CSV HEADER;












COPY CATEGORY(CATEGORY_ID, NAME, LAST_UPDATE) 
TO 'C:\tmp\DB_CATEGORY.txt' 
DELIMITER '|' 
CSV HEADER
;







COPY CATEGORY(CATEGORY_ID, NAME, LAST_UPDATE) 
TO 'C:\tmp\DB_CATEGORY_2.csv' 
DELIMITER ',' 
CSV;

```
<br>
<br>

## Import
```sql
CREATE TABLE CATEGORY_IMPORT
(
  CATEGORY_ID SERIAL NOT NULL
, "NAME" VARCHAR(25) NOT NULL
, LAST_UPDATE TIMESTAMP NOT NULL DEFAULT NOW()
, CONSTRAINT CATEGORY_IMPORT_PKEY PRIMARY KEY (CATEGORY_ID)
);

SELECT * FROM CATEGORY_IMPORT; 

COPY CATEGORY_IMPORT(CATEGORY_ID, "NAME", LAST_UPDATE) 
FROM 'C:\tmp\DB_CATEGORY.csv' 
DELIMITER ',' 
CSV HEADER
;

SELECT * FROM CATEGORY_IMPORT;

DELETE FROM CATEGORY_IMPORT; 
COMMIT;

COPY CATEGORY_IMPORT(CATEGORY_ID, "NAME", LAST_UPDATE) 
FROM 'C:\tmp\DB_CATEGORY.txt' 
DELIMITER '|' 
CSV HEADER
;

SELECT * FROM CATEGORY_IMPORT;

DELETE FROM CATEGORY_IMPORT; 
COMMIT;

COPY CATEGORY_IMPORT(CATEGORY_ID, "NAME", LAST_UPDATE) 
FROM 'C:\tmp\DB_CATEGORY_2.csv' 
DELIMITER ',' 
CSV
;


SELECT * FROM CATEGORY_IMPORT;
```
<br>
<br>