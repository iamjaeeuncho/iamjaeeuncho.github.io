---
title: "[SQL] 데이터 조건문 - Where, Between, Limit, Fetch"
date: 2021-2-6
categories:
  - study
tags:
  - sql
toc: true
toc_ads: true
toc_sticky: true
---

## Where: 조건
- 집합을 가져올 때 어떤 조건의 집합을 가져올 것인지 설정하는 절
- 연산자
> * = 같은
> * > ~보다 큰
> * < ~보다 작은
> * >= ~보다 크거나 같은
> * <= ~보다 작거나 같은
> * <>, != ~가 아닌
> * AND 그리고
> * OR 혹은

```sql
---------- # where 조건 한 개
SELECT
       LAST_NAME
     , FIRST_NAME
FROM
       CUSTOMER
WHERE
       FIRST_NAME = 'Jamie'       -- FIRST_NAME이 ‘Jamie’인 행을 출력
;
---------- # where 조건 두 개 + AND
SELECT
        LAST_NAME
      , FIRST_NAME
FROM
	      CUSTOMER
WHERE
  	    FIRST_NAME = 'Jamie' -- FIRST_NAME이 ‘Jamie’이면서
AND     LAST_NAME = 'Rice'       -- LAST_NAME이 ‘Rice’인 행을 출력함
;
---------- # where 조건 두 개 + OR
SELECT
        CUSTOMER_ID
      , AMOUNT
      , PAYMENT_DATE
FROM
        PAYMENT
WHERE   AMOUNT <= 1               -- AMOUNT가 1이하 이거나
OR      AMOUNT >= 8               -- AMOUNT가 8이상인 행을 출력 
;
```
<br>
<br>

## Between: 사잇값
- 특정 범위 안에 들어가는 집합을 출력하는 연산자
- between A And B: sth >= A & sth <= B
- not between A And B: sth < A or sth > B

```sql
---------- # BETWEEN AND
SELECT
        CUSTOMER_ID
      , PAYMENT_ID
      , AMOUNT
FROM
        PAYMENT
WHERE   AMOUNT BETWEEN 8 AND 9     -- 8과 9 사이  
;
---------- # 위의 BETWEEN이랑 동일
SELECT
        CUSTOMER_ID
      , PAYMENT_ID
      , AMOUNT
FROM
        PAYMENT
WHERE   AMOUNT >= 8 AND AMOUNT <= 9  -- 8 이상 9 이하  
;
---------- # NOT BETWEEN
SELECT
        CUSTOMER_ID
      , PAYMENT_ID
      , AMOUNT
FROM
        PAYMENT
WHERE   AMOUNT NOT BETWEEN 8 AND 9  -- 8부터 9사이가 아닌
;
---------- # cast 데이터형 변환, date형으로 바꾸면 시분초 없어짐
SELECT
        CUSTOMER_ID
      , PAYMENT_ID
      , AMOUNT
      , PAYMENT_DATE
FROM
        PAYMENT
WHERE CAST(PAYMENT_DATE AS DATE)
BETWEEN '2007-02-07' AND '2007-02-15'
;
---------- # to_char 문자로 변환, to_char(변환시킬값, '이런 형식으로')
SELECT
        CUSTOMER_ID, PAYMENT_ID
      , AMOUNT         
      , PAYMENT_DATE
      , TO_CHAR(PAYMENT_DATE, 'yyyy-mm-dd')
      , CAST(PAYMENT_DATE AS DATE)
FROM
      PAYMENT
WHERE TO_CHAR(PAYMENT_DATE, 'yyyy-mm-dd') 
BETWEEN '2007-02-07' AND '2007-02-15'
;
```
<br>
<br>

## Limit: 출력수 제한
- 특정 집합 출력시 출력하는 행의 수를 한정 (PostgreSQL, MySQL 등에서 지원)

```sql
---------- # LIMIT
SELECT
      FILM_ID
    , TITLE
    , RELEASE_YEAR
FROM
      FILM
ORDER BY FILM_ID
      LIMIT 5                   -- ORDER BY를 한 결과중 5건만
;
---------- # LIMIT + OFFSET은 시작 위치를 나타냄
SELECT
       FILM_ID
     , TITLE
     , RELEASE_YEAR
FROM
       FILM
ORDER BY FILM_ID
      LIMIT 4
      OFFSET 3                -- 시작 위치 3이므로 1,2,3 이후 4부터 4개 출력
;
---------- # LIMIT + DESC 내림차순 (설정 안하면 ASC 오름차순가 기본)
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
- 특정 집합 출력시 출력하는 행의 수를 한정

```sql
---------- # Fetch(가져오다) First 숫자 (처음 몇개부터) Row Only
SELECT
        FILM_ID
      , TITLE
FROM
	FILM
ORDER BY TITLE 
FETCH FIRST ROW ONLY   -- first 숫자 미지정시 최초 한 건만
;
---------- # First 숫자
SELECT
       FILM_ID
     , TITLE
FROM
       FILM
ORDER BY TITLE 
FETCH FIRST 1 ROW ONLY
;
---------- # Row only는 단 한건만 출력
SELECT
        FILM_ID
      , TITLE
FROM
        FILM
ORDER BY TITLE 
     OFFSET 5 ROWS          -- 6번째 행부터 시작
FETCH FIRST 5 ROW ONLY      -- 5건의 행을 리턴
;
```
<br>
