---
title: "[SQL] 조건 연산자-Case, Coalesce, NullIf, Cast"
date: 2021-2-17
categories:
  - study
tags:
  - sql
toc: true
toc_ads: true
toc_sticky: true
---

## Case
```sql
SELECT
	    SUM (
			CASE
		    WHEN RENTAL_RATE = 0.99 THEN 1
		    ELSE 0
	         END 
	       ) AS "C"
	  , SUM (
	        CASE
		    WHEN RENTAL_RATE = 2.99 THEN 1
		    ELSE 0
	         END ) AS "B"
	  , SUM (
	        CASE
		    WHEN RENTAL_RATE = 4.99 THEN 1
		    ELSE 0
	         END ) AS "A"
   FROM
	    FILM;
	   
-- 행은 1개만 가져가면서, 컬럼은 3개로 출력한다
	   
|C  |B  |A  
|---|---|---
|341|323|336
;


SELECT 
	RENTAL_RATE, COUNT(*) CNT 
FROM FILM 
GROUP BY RENTAL_RATE; 
-- rentalrate별 건수

|rental_rate|cnt
|-----------|---
|       2.99|323
|       4.99|336
|       0.99|341;
 


SELECT * 
FROM 
	(
	SELECT 
		  SUM(CASE WHEN RENTAL_RATE = 0.99 THEN CNT ELSE 0 END) AS C 
		, SUM(CASE WHEN RENTAL_RATE = 2.99 THEN CNT ELSE 0 END) AS B
		, SUM(CASE WHEN RENTAL_RATE = 4.99 THEN CNT ELSE 0 END) AS A		   
	FROM 
	(
		SELECT 
			RENTAL_RATE, COUNT(*) CNT 
		FROM FILM 
		GROUP BY RENTAL_RATE
	) A
) A 
;
```
<br>
<br>

## Coalesce
```sql
DROP TABLE TB_ITEM_COALESCE_TEST; 

CREATE TABLE TB_ITEM_COALESCE_TEST (
  ID SERIAL PRIMARY KEY
, PRODUCT VARCHAR (100) NOT NULL
, PRICE NUMERIC NOT NULL
, DISCOUNT NUMERIC
);

INSERT INTO TB_ITEM_COALESCE_TEST (PRODUCT, PRICE, DISCOUNT)
VALUES
 ('A', 1000 ,10),
 ('B', 1500 ,20),
 ('C', 800 ,5),
 ('D', 500, NULL);
 
COMMIT; 

SELECT * FROM TB_ITEM_COALESCE_TEST; 

SELECT
	   PRODUCT
	 , (PRICE - DISCOUNT) AS NET_PRICE
  FROM
	  TB_ITEM_COALESCE_TEST;
	  
	 
|product|net_price
|-------|---------
|A      |      990
|B      |     1480
|C      |      795
|D      |         	 
;

SELECT
	   PRODUCT, price, discount, COALESCE(DISCOUNT, 0)
	 , (PRICE - COALESCE(DISCOUNT, 0)) AS NET_PRICE
  FROM
	   TB_ITEM_COALESCE_TEST;
	   
|product|net_price
|-------|---------
|A      |      990
|B      |     1480
|C      |      795
|D      |      500
;

SELECT
	   PRODUCT
	 , ( PRICE -
	             CASE
		         WHEN DISCOUNT IS NULL THEN 0
		         ELSE DISCOUNT
	              END ) AS NET_PRICE
  FROM
	   TB_ITEM_COALESCE_TEST;
```
<br>
<br>

## NullIf
```sql
CREATE TABLE TB_MEMBER_NULLIF_TEST (
  ID SERIAL PRIMARY KEY
, first_name VARCHAR (50) NOT NULL
, last_name VARCHAR (50) NOT NULL
, gender SMALLINT NOT NULL -- 1: male, 2 female
);



INSERT INTO TB_MEMBER_NULLIF_TEST (
  FIRST_NAME
, LAST_NAME
, GENDER
)
VALUES
   ('John', 'Doe', 1)
 , ('David', 'Dave', 1)
 , ('Bush', 'Lily', 2)
;

COMMIT;

SELECT * FROM TB_MEMBER_NULLIF_TEST;

|id|first_name|last_name|gender
|--|----------|---------|------
| 1|John      |Doe      |     1
| 2|David     |Dave     |     1
| 3|Bush      |Lily     |     2
;

SELECT
	(SUM (
	CASE
		WHEN GENDER = 1 THEN 1
		ELSE 0
	END ) / SUM (
	CASE
		WHEN GENDER = 2 THEN 1
		ELSE 0
	END ) ) * 100 AS "MALE/FEMALE RATIO"
FROM
	TB_MEMBER_NULLIF_TEST;
	
|MALE/FEMALE RATIO
|-----------------
|              200
;

UPDATE TB_MEMBER_NULLIF_TEST 
   SET GENDER = 1
 WHERE GENDER = 2;

COMMIT; 
 
SELECT * FROM TB_MEMBER_NULLIF_TEST;

-- 0으로 나누면 에러남
SELECT
(SUM(CASE WHEN GENDER = 1 THEN 1 ELSE 0 END) / SUM(CASE WHEN GENDER = 2 THEN 1 ELSE 0 END) ) * 100 AS "MALE/FEMALE RATIO"
FROM
TB_MEMBER_NULLIF_TEST;

SQL Error [22012]: 오류: 0으로는 나눌수 없습니다.
;


-- 0이면 null이 나오도록해서 sql 오류 피하게
-- 3 나누기 null = null

SELECT
(SUM(CASE WHEN GENDER = 1 THEN 1 ELSE 0 END) / 
 NULLIF(SUM(CASE WHEN GENDER = 2 THEN 1 ELSE 0 END), 0)
 ) * 100 AS "MALE/FEMALE RATIO"
FROM
TB_MEMBER_NULLIF_TEST;

|MALE/FEMALE RATIO
|-----------------
|           (NULL)


```
<br>
<br>

## Cast
```sql
SELECT
 CAST ('100' AS INTEGER);
 
|int4
|----
| 100
;

SELECT
 CAST ('10C' AS INTEGER);
 
SQL Error [22P02]: 오류: 정수 자료형 대한 잘못된 입력 구문: "10C"
  Position: 16
  ;
  
SELECT
 CAST ('2015-01-01' AS DATE);
 
|date      
|----------
|2015-01-01
;

SELECT
 CAST ('10.2' AS DOUBLE PRECISION);
 
|float8
|------
|  10.2

;

SELECT
 '100'::INTEGER;

SELECT
 '10C'::INTEGER;

SELECT 
  '2015-01-01'::DATE; 
 
 SELECT
  '10.2'::DOUBLE PRECISION;



```
<br>
<br>