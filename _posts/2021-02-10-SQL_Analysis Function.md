---
title: "[SQL] 분석 함수 - AVG, Row_Number, Rank, Dense_Rank, First/Last_Value, Lag, Lead"
date: 2021-2-10
categories:
  - study
tags:
  - sql
toc: true
toc_ads: true
toc_sticky: true
---

## 분석함수
- 분석 함수란 특정 집합 내에서 결과 건수의 변화 없이 해당 집합안에서 합계 및 카운트 등을 계산할 수 있는 함수
<br>
<br>

## AVG - 평균
- 특정 집합 내에서 결과 건수의 변화 없이 해당 집합안에서 특정 컬럼의 평균을 구하는 함수

```sql
SELECT
      AVG (PRICE)        --PRICE컬럼의 평균값
 FROM
      PRODUCT
;
---------- # AVG + Group By
SELECT
      B.GROUP_NAME
    , AVG (PRICE)
 FROM PRODUCT A
  INNER JOIN PRODUCT_GROUP B
    ON (A.GROUP_ID = B.GROUP_ID)
 GROUP BY B.GROUP_NAME
;
---------- # AVG
SELECT
       A.PRODUCT_NAME 
     , A.PRICE
     , B.GROUP_NAME
     , AVG (A.PRICE) OVER (PARTITION BY B.GROUP_NAME)  -- GROUP_NAME컬럼 기준의 PRICE의 평균값
  FROM PRODUCT A
    INNER JOIN PRODUCT_GROUP B
      ON (A.GROUP_ID = B.GROUP_ID)
;
---------- # 누적평균
SELECT
       A.PRODUCT_NAME 
     , A.PRICE
     , B.GROUP_NAME
     , AVG (A.PRICE) OVER (PARTITION BY B.GROUP_NAME ORDER BY A.PRICE)
FROM
PRODUCT A
INNER JOIN PRODUCT_GROUP B
ON (A.GROUP_ID = B.GROUP_ID)
;
```
<br>
<br>

## Row_Number, Rank, Dense_Rank - 순위
- 특정 집합 내에서 결과 건수의 변화와 상관없이, 해당 집합안에서 특정 컬럼의 순위를 구하는 함수

```sql
---------- # 무조건 순차 (ex. 1,2,3,4,5 ~)
SELECT
       A.PRODUCT_NAME
     , B.GROUP_NAME
     , A.PRICE
     , ROW_NUMBER () OVER 
       (PARTITION BY B.GROUP_NAME ORDER BY A.PRICE DESC)
 FROM PRODUCT A
INNER JOIN PRODUCT_GROUP B
    ON (A.GROUP_ID = B.GROUP_ID)
;
---------- # 같은 순위면 같은 순위 + 건너뜀 (ex. 1,1,3,4~)
SELECT
       A.PRODUCT_NAME
     , B.GROUP_NAME
     , A.PRICE
     , RANK () OVER 
       (PARTITION BY B.GROUP_NAME ORDER BY A.PRICE ASC)
  FROM PRODUCT A
INNER JOIN PRODUCT_GROUP B
    ON (A.GROUP_ID = B.GROUP_ID)
;       
---------- # 같은 순위면 같은 순위 + 건너뛰지 않음 (ex. 1,1,2,3~) 
SELECT
       A.PRODUCT_NAME
     , B.GROUP_NAME
     , A.PRICE
     , DENSE_RANK () OVER 
       (PARTITION BY B.GROUP_NAME ORDER BY A.PRICE)
  FROM PRODUCT A
INNER JOIN PRODUCT_GROUP B
    ON (A.GROUP_ID = B.GROUP_ID)
;       
```
<br>
<br>

## First/Last_Value - 값 구하기
- 특정 집합 내에서 결과 건수의 변화 없이, 해당 집합안에서 특정 컬럼의 첫번째 또는 마지막 값을 구하는 함수

```sql
---------- # First_Value
SELECT
       A.PRODUCT_NAME, B.GROUP_NAME, A.PRICE
     , FIRST_VALUE (A.PRICE) OVER 
       (PARTITION BY B.GROUP_NAME ORDER BY A.PRICE DESC) 
        AS LOWEST_PRICE_PER_GROUP
FROM PRODUCT A
INNER JOIN PRODUCT_GROUP B
        ON (A.GROUP_ID = B.GROUP_ID)
;
---------- # Last_Value + RANGE BETWEEN
SELECT
       A.PRODUCT_NAME, B.GROUP_NAME, A.PRICE
     , LAST_VALUE (A.PRICE) OVER 
       (PARTITION BY B.GROUP_NAME ORDER BY A.PRICE DESC 
        RANGE BETWEEN UNBOUNDED PRECEDING               -- UNBOUNDED PRECEDING 그룹의 첫번째값
        AND UNBOUNDED FOLLOWING)                        -- UNBOUNDED FOLLOWING 그룹의 마지막값
        AS LOWEST_PRICE_PER_GROUP
FROM PRODUCT A
INNER JOIN PRODUCT_GROUP B
        ON (A.GROUP_ID = B.GROUP_ID)
;
---------- # Last_Value 
SELECT
       A.PRODUCT_NAME, B.GROUP_NAME, A.PRICE
     , LAST_VALUE (A.PRICE) OVER                        -- Range between 없으면 Lastvalue 못 뽑음
       (PARTITION BY B.GROUP_NAME ORDER BY A.PRICE)     -- Range between 안쓰면 Current row가 Default
        AS LOWEST_PRICE_PER_GROUP                       -- Current row까지만 지정한다는 뜻
FROM PRODUCT A
INNER JOIN PRODUCT_GROUP B
        ON (A.GROUP_ID = B.GROUP_ID)
;
```
<br>
<br>

## Lag, Lead - 이전/다음행의 값
- 특정 집합 내에서 결과 건수의 변화 없이, 해당 집합안에서 특정 컬럼의 이전이나 다음 행의 값을 구함

```sql
---------- # LAG (카테고리, 간격): 이전 행 값 찾기
SELECT
	  A.PRODUCT_NAME, B.GROUP_NAME, A.PRICE
	, LAG (A.PRICE, 1) OVER (                          -- PRICE의 이전 행의 값을 구함
    PARTITION BY B.GROUP_NAME ORDER BY A.PRICE)      -- GROUP_NAME컬럼 기준 PRICE컬럼으로 정렬한 값 중에서
    AS PREV_PRICE
	, A.PRICE - LAG (A.PRICE, 1) OVER (                -- 현재행 PRICE - 이전행 PRICE
    PARTITION BY B.GROUP_NAME ORDER BY A.PRICE)      -- GROUP_NAME컬럼 기준으로 PRICE컬럼으로 정렬한 값 중에서
    AS CUR_PREV_DIFF
FROM
    PRODUCT A
INNER JOIN PRODUCT_GROUP B
    ON (A.GROUP_ID = B.GROUP_ID)
;
---------- # LEAD (카테고리, 간격): 다음 행 값 찾기
SELECT
	  A.PRODUCT_NAME, B.GROUP_NAME, A.PRICE
	, LEAD (A.PRICE , 1) OVER (
    PARTITION BY B.GROUP_NAME ORDER BY A.PRICE)
    AS NEXT_PRICE
	, A.PRICE - LEAD (A.PRICE , 1) OVER (
    PARTITION BY B.GROUP_NAME ORDER BY A.PRICE)
    AS CUR_NEXT_DIFF
FROM
  	PRODUCT A
INNER JOIN PRODUCT_GROUP B
   ON (A.GROUP_ID = B.GROUP_ID)
;
```
<br>
<br>

## 연습문제
1. 연/연월/연월일/전체 Rental_ID 기준 렌탈 일어난 횟수 

```sql
---------- # 일반
SELECT TO_CHAR(rental_date, 'YYYY'), COUNT(*) FROM RENTAL
GROUP BY TO_CHAR(rental_date, 'YYYY')
;

SELECT TO_CHAR(rental_date, 'YYYYMM'), COUNT(*) FROM RENTAL
GROUP BY TO_CHAR(rental_date, 'YYYYMM')
ORDER BY TO_CHAR(rental_date, 'YYYYMM')
;

SELECT TO_CHAR(rental_date, 'YYYYMMDD'), COUNT(*) FROM RENTAL
GROUP BY TO_CHAR(rental_date, 'YYYYMMDD')
ORDER BY TO_CHAR(rental_date, 'YYYYMMDD')
;

SELECT COUNT(*) FROM rental
; 

---------- # RollUp
SELECT
      TO_CHAR(RENTAL_DATE, 'YYYY') Y
    , TO_CHAR(RENTAL_DATE, 'MM') M
    , TO_CHAR(RENTAL_DATE, 'DD') D
    , COUNT (RENTAL_ID)
  FROM RENTAL
GROUP BY
ROLLUP(
      TO_CHAR(RENTAL_DATE, 'YYYY')
    , TO_CHAR(RENTAL_DATE, 'MM')
    , TO_CHAR(RENTAL_DATE, 'DD'))
;
```
<br>
<br>

2. 가장 많이 Rental 한 고객ID/렌탈순위/누적렌탈횟수/이름 출력

```sql
---------- # RENTAL 순위 구하기
SELECT A.CUSTOMER_ID
     , ROW_NUMBER() OVER(ORDER BY COUNT(A.RENTAL_ID) DESC) AS RENTAL_RANK
     , COUNT(A.RENTAL_ID) RENTAL_COUNT
FROM RENTAL A
GROUP BY A.CUSTOMER_ID
; 
---------- # 가장 많이 RENTAL한 1명 고객
SELECT A.CUSTOMER_ID
     , ROW_NUMBER() OVER(ORDER BY COUNT(A.RENTAL_ID) DESC) AS RENTAL_RANK
     , COUNT(A.RENTAL_ID) RENTAL_COUNT
FROM RENTAL A
GROUP BY A.CUSTOMER_ID ORDER BY RENTAL_RANK LIMIT 1
;
---------- # 고객의 이름을 출력하기 위해서 CUSTOMER테이블과 조인
SELECT A.CUSTOMER_ID
     , ROW_NUMBER() OVER(ORDER BY COUNT(A.RENTAL_ID) DESC) AS RENTAL_RANK
     , COUNT(A.RENTAL_ID) RENTAL_COUNT
     , MAX(B.FIRST_NAME) AS FIRST_NAME
     , MAX(B.LAST_NAME) AS LAST_NAME
FROM RENTAL A, CUSTOMER B
WHERE A.CUSTOMER_ID = B.CUSTOMER_ID
GROUP BY A.CUSTOMER_ID ORDER BY RENTAL_RANK LIMIT 1
;
```
<br>
<br>
<i> ※ credit: Fast Campus, 모두를 위한 SQL/DB 올인원 패키지 Online </i>