---
title: "[SQL] 데이터 조건문 - Where, Between, Limit, Fetch"
date: 2019-7-6
categories:
  - study
tags:
  - sql
toc: true
toc_sticky: true
---

## Where: 조건

```sql
-- where 조건이 한 개일 때

SELECT
       LAST_NAME --3
     , FIRST_NAME
  FROM
       CUSTOMER --1
 WHERE
       FIRST_NAME = 'Jamie'; --2
       
-----------------------------------------------
-- where 조건이 두 개일 때, 'AND'

SELECT
	  LAST_NAME
	, FIRST_NAME
  FROM
	  CUSTOMER
WHERE
  	  FIRST_NAME = 'Jamie'
AND   LAST_NAME = 'Rice';

--------------------------------------------------
-- 조건 2개

SELECT
	   CUSTOMER_ID
	 , AMOUNT
	 , PAYMENT_DATE
  FROM
	   PAYMENT
 WHERE AMOUNT <= 1     -- 1 이하
	OR AMOUNT >= 8;    -- 8 이상

-----------------------------------------------------
      
```
<br>
<br>

## Between: 사잇값

```sql
-- between 사잇값
-- between A And B : sth >= A & sth <= B
-- not between A And B: sth < A or sth > B
 
SELECT
        CUSTOMER_ID
      , PAYMENT_ID
      , AMOUNT
   FROM
        PAYMENT
  WHERE AMOUNT BETWEEN 8 AND 9;
 
-----------------------------------------------
-- 위의 BETWEEN이랑 동일

  SELECT
        CUSTOMER_ID
      , PAYMENT_ID
      , AMOUNT
   FROM
        PAYMENT
WHERE amount >= 8 
AND amount <= 9
;

-------------------------------------------------------
SELECT
        CUSTOMER_ID
      , PAYMENT_ID
      , AMOUNT
   FROM
        PAYMENT
  WHERE AMOUNT NOT BETWEEN 8 AND 9;
 
---------------------------------------------------------- 
-- 위의 BETWEEN이랑 동일

 SELECT
        CUSTOMER_ID
      , PAYMENT_ID
      , AMOUNT
   FROM
        PAYMENT
  WHERE AMOUNT < 8 OR amount > 9;
 
-------------------------------------------------
-- cast 데이터형 변환
-- date형으로 바꾸면 시분초는 없어짐

 SELECT
        CUSTOMER_ID, PAYMENT_ID
      , AMOUNT         , PAYMENT_DATE
  FROM PAYMENT
 WHERE CAST(PAYMENT_DATE AS DATE) BETWEEN '2007-02-07' AND '2007-02-15';

---------------------------------------------------
-- to_char(변환시킬값, '이런 형식으로')

SELECT
        CUSTOMER_ID, PAYMENT_ID
      , AMOUNT         , PAYMENT_DATE, to_char(PAYMENT_DATE, 'yyyy-mm-dd')
      , CAST(PAYMENT_DATE AS DATE)
  FROM PAYMENT
  WHERE to_char(PAYMENT_DATE, 'yyyy-mm-dd') BETWEEN '2007-02-07' AND '2007-02-15';

```
<br>
<br>

## Limit: 출력수 제한

```sql
-- LIMIT 출력하는 행의 수를 한정
-- OFFSET M에서 M은 시작위치
-- LIMIT 100 OFFSET 3은 4부터 100개 출력 

SELECT
	   FILM_ID
	 , TITLE
	 , RELEASE_YEAR
  FROM
	   FILM
ORDER BY FILM_ID --ORDER BY를 한 결과중에서 
   LIMIT 5 ; --5건만 
 
--------------------------------------
-- OFFSET

SELECT
       FILM_ID
     , TITLE
     , RELEASE_YEAR
  FROM
       FILM
ORDER BY FILM_ID
   LIMIT 4
  OFFSET 3  -- 시작 위치는 3이므로 1,2,3 이후 4부터 시작
;

-----------------------------------------
-- 내림차순 DESC 기준 (설정 안하면 오름차순 ASC가 기본)

SELECT
       FILM_ID
     , TITLE
     , RENTAL_RATE
  FROM
       FILM
ORDER BY RENTAL_RATE DESC
   LIMIT 10
;
```
<br>
<br>

## Fetch: 출력수 제한

```sql
-- fetch: limit절처럼 행의 수를 한정 
-- fetch(가져오다) first N (처음 몇개부터)
-- row only는 단 한건만 출력
-- OFFSET M에서 M은 시작위치

SELECT
      FILM_ID
	, TITLE
 FROM
	  FILM
ORDER BY TITLE 
FETCH FIRST ROW ONLY   -- first 숫자 미지정시 최초 한 건만
;

--------------------------------------------------
-- first 숫자

SELECT
       FILM_ID
     , TITLE
  FROM
       FILM
ORDER BY TITLE 
FETCH FIRST 3 ROW ONLY
;

----------------------------------------------------
SELECT
              FILM_ID
            , TITLE
  FROM
              FILM
ORDER BY TITLE 
     OFFSET 5 ROWS          -- 6번째 행부터 시작
FETCH FIRST 5 ROW only      -- 5건의 행을 리턴
;




```
<br>
<br>


※ Credit: Fast Campus, 모두를 위한 SQL/DB 올인원 패키지