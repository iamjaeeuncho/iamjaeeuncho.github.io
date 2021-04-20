---
title: "[SQL] 조건 연산자 - Case, Coalesce, NullIf, Cast"
date: 2021-2-17
categories:
  - study
tags:
  - sql
toc: true
toc_ads: true
toc_sticky: true
---

## Case ≒ IF/ELSE문
- Case 표현식으로 IF/ELSE문과 같은 다양한 조건문 처리를 할 수 있다

```sql
---------- # CASE
SELECT
	    SUM (
			CASE
		    WHEN RENTAL_RATE = 0.99 THEN 1
		    ELSE 0
			END ) AS "C"
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
	    FILM
;
	   	   
|C  |B  |A              -- 행은 1개만 가져가면서
|---|---|---            -- 컬럼은 3개로 출력
|341|323|336
;

---------- # CASE
SELECT
	  SUM (
		CASE
		WHEN RENTAL_RATE = 0.99 THEN 1
		ELSE 0 END ) AS "C"
	, SUM (
		CASE
		WHEN RENTAL_RATE = 2.99 THEN 1
		ELSE 0 END ) AS "B"
	, SUM (
		CASE
		WHEN RENTAL_RATE = 4.99 THEN 1
		ELSE 0 END ) AS "A"
	FROM FILM
;
---------- # 위와 동일한 일반 SQL문
SELECT * 
FROM (
	SELECT 
		  SUM(CASE WHEN RENTAL_RATE = 0.99 THEN CNT ELSE 0 END) AS C 
		, SUM(CASE WHEN RENTAL_RATE = 2.99 THEN CNT ELSE 0 END) AS B
		, SUM(CASE WHEN RENTAL_RATE = 4.99 THEN CNT ELSE 0 END) AS A		   
	FROM (
		SELECT 
			RENTAL_RATE, COUNT(*) CNT 
		FROM FILM 
		GROUP BY RENTAL_RATE) A
	) A 
;
```
<br>
<br>

## Coalesce - 첫번째 값 리턴
- Coalsesce 함수는 입력한 인자값 중에서 Null값이 아닌 첫번째 값을 리턴한다
- Null 처리할 때 유용 (ex. 500 - Null = Null)

```sql
---------- # Coalesce
SELECT
	  PRODUCT
	, (PRICE - COALESCE(DISCOUNT, 0)) AS NET_PRICE    -- Discount가 Null이면 0
FROM
	TB_ITEM_COALESCE_TEST
;
---------- # CASE
SELECT
	   PRODUCT
	, (PRICE -
		CASE
			WHEN DISCOUNT IS NULL THEN 0              -- Discount가 Null이면 0
			ELSE DISCOUNT                             -- 아니면 Discount 값
			END ) AS NET_PRICE
FROM
	TB_ITEM_COALESCE_TEST
;
```
<br>
<br>

## NullIf - Null or 첫번째값
- NullIf 함수는 입력한 두개의 인자값이 동일하면 Null을 리턴하고, 아니면 첫번째 인자값을 리턴한다

```sql
---------- # 여자 대비 남자 비율 구하기
SELECT
	(SUM (
		  CASE
			WHEN GENDER = 1 THEN 1
			ELSE 0
			END) /
	 SUM (
		  CASE
			WHEN GENDER = 2 THEN 1
			ELSE 0
			END)) * 100 AS "MALE/FEMALE RATIO"
FROM
	TB_MEMBER_NULLIF_TEST
;
	
|MALE/FEMALE RATIO
|-----------------
|              200

---------- # 여자 대비 남자 비율 구하기 + NullIf
SELECT
	   (SUM (
		  CASE
			WHEN GENDER = 1 THEN 1
			ELSE 0
			END) /                         -- 0으로 나누면 에러남
NULLIF (SUM (                              -- 0이면 null 나오도록해서 sql 오류 피하기
		  CASE
			WHEN GENDER = 2 THEN 1
			ELSE 0
			END), 0)
			) * 100 AS "MALE/FEMALE RATIO"
FROM
	TB_MEMBER_NULLIF_TEST
;

|MALE/FEMALE RATIO
|-----------------
|           (NULL)
```
<br>
<br>

## Cast - 형변환
- Cast 표현식은 데이터값을 특정 데이터 타입으로 형변환이 가능하도록 한다
- 각종 데이터 값을 CAST 표현식을 이용해 적절하게 형변환 한다

```sql
---------- # 문자열을 정수형으로 형변환
SELECT
 CAST ('100' AS INTEGER);

SELECT
 '100'::INTEGER;
---------- # 문자열을 실수형으로 형변환
SELECT
 CAST ('10.2' AS DOUBLE PRECISION);

SELECT
  '10.2'::DOUBLE PRECISION;
---------- # DATE타입으로 형변환
SELECT
 CAST ('2015-01-01' AS DATE);
 
SELECT 
  '2015-01-01'::DATE; 
```
<br>
<br>
