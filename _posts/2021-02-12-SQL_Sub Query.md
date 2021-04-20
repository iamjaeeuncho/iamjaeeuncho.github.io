---
title: "[SQL] 서브쿼리 - Any, All, Exists"
date: 2021-2-12
categories:
  - study
tags:
  - sql
toc: true
toc_ads: true
toc_sticky: true
---

## 서브쿼리
- 서브쿼리란 SQL문에서 메인 쿼리가 아닌 하위에 존재하는 쿼리를 말한다

```sql
---------- # 평균 구하기
SELECT
      AVG(RENTAL_RATE)
 FROM
      FILM
;
---------- # 평균보다 큰 RENTAL_RATE집합 구하기
SELECT
       FILM_ID
     , TITLE
     , RENTAL_RATE
  FROM FILM
 WHERE RENTAL_RATE > 2.98
;
---------- # 위에 두개를 합쳐서 하나의 중첩 서브쿼리로
SELECT
       FILM_ID
     , TITLE
     , RENTAL_RATE
  FROM FILM
 WHERE RENTAL_RATE > (
  SELECT
    AVG (RENTAL_RATE)
    FROM FILM)
;
```

### 인라인뷰
- From절 안에 있으면 인라인 뷰

```sql
---------- # 인라인뷰
SELECT
       A.FILM_ID
     , A.TITLE
     , A.RENTAL_RATE
FROM FILM A, (
  SELECT
    AVG(RENTAL_RATE)
    AS AVG_RENTAL_RATE
    FROM FILM) B
WHERE A.RENTAL_RATE > B.AVG_RENTAL_RATE
;
```

#### 스칼라 쿼리
- 인라인 안에 select 구문 안 서브쿼리를 스칼라 쿼리라고 함

```sql
---------- # 스칼라 서브쿼리
SELECT 	  
       A.FILM_ID
     , A.TITLE
     , A.RENTAL_RATE 
 FROM (
  SELECT
        A.FILM_ID
      , A.TITLE
      , A.RENTAL_RATE
      , (SELECT AVG(L.RENTAL_RATE) 
            FROM FILM L
        ) AS AVG_RENTAL_RATE 
    FROM FILM A) A
WHERE A.RENTAL_RATE > A.AVG_RENTAL_RATE
;
```
<br>
<br>

## Any - 어떤 값이든 가능
- Any 연산자는 서브쿼리의 값이 어떠한 값이라도 만족하면 조건이 성립됨

```sql
---------- # 
SELECT TITLE, LENGTH
  FROM FILM
WHERE LENGTH >= ANY (
    SELECT MAX(LENGTH)        -- 상영시간이 가장 긴
    FROM FILM A
       , FILM_CATEGORY B 
    WHERE A.FILM_ID = B.FILM_ID
    GROUP BY B.CATEGORY_ID
    )
;
---------- # Any가 없으면 SQL 에러 발생
SELECT TITLE, LENGTH
  FROM FILM
  WHERE LENGTH >= (
    SELECT MAX(LENGTH)
    FROM FILM A
        , FILM_CATEGORY B 
    WHERE A.FILM_ID = B.FILM_ID
    GROUP BY B.CATEGORY_ID
    )
;
---------- # '=ANY'
SELECT TITLE, LENGTH
  FROM FILM
WHERE LENGTH = ANY (
    SELECT MAX(LENGTH)
    FROM FILM A
       , FILM_CATEGORY B 
    WHERE A.FILM_ID = B.FILM_ID
    GROUP BY B.CATEGORY_ID
    )
;
---------- # '=ANY'는 'IN'과 동일
SELECT TITLE, LENGTH
  FROM FILM
WHERE LENGTH IN (
    SELECT MAX(LENGTH)
    FROM FILM A
       , FILM_CATEGORY B 
    WHERE A.FILM_ID = B.FILM_ID
    GROUP BY B.CATEGORY_ID 
    )
;
```
<br>
<br>

## All - 모든 값 만족해야
- All 연산자는 서브쿼리의 모든 값이 만족해야만 조건이 성립됨


```sql
---------- # All
SELECT TITLE, LENGTH
  FROM FILM
WHERE LENGTH >= ALL (            -- 상영시간이 가장 긴 영화의 모든 상영시간 보다 크거나 같아야만 조건 성립
  SELECT MAX(LENGTH)             -- 영화 분류별 상영시간이 가장 긴 상영시간을 구함
    FROM FILM A
       , FILM_CATEGORY B
    WHERE A.FILM_ID = B.FILM_ID
    GROUP BY B.CATEGORY_ID
    )
;
---------- # All 없으면 에러 발생
SELECT TITLE, LENGTH
  FROM FILM
WHERE LENGTH >= (                 -- ALL이 없다면 SQL 에러가 발생.
  SELECT MAX(LENGTH)              -- 서브쿼리의 반환되는 집합은 단 한건이어야만 함.
  FROM FILM A
     , FILM_CATEGORY B
  WHERE A.FILM_ID = B.FILM_ID
  GROUP BY B.CATEGORY_ID
  )
;
---------- # ALL
SELECT FILM_ID
     , TITLE
     , LENGTH
   FROM FILM
  WHERE LENGTH > ALL (
   SELECT ROUND(AVG (LENGTH), 2)
    FROM FILM
   GROUP BY RATING)
   ORDER BY LENGTH
;
```
<br>
<br>

## Exists - 존재 여부
- Exists 연산자는 서브쿼리 내에 집합이 존재하는지 존재 여부만을 판단
- 해당 집합이 존재하기만 하면 더이상 연산을 멈추므로 성능상 유리함

```sql
---------- # EXISTS
SELECT
       FIRST_NAME
     , LAST_NAME
  FROM
       CUSTOMER C
WHERE
EXISTS ( SELECT 1
           FROM PAYMENT P                     -- 지불내역이
          WHERE P.CUSTOMER_ID = C.CUSTOMER_ID -- 고객이 있는지 확인
            AND P.AMOUNT > 11
        )
ORDER BY FIRST_NAME, LAST_NAME
;
---------- # NOT EXISTS
SELECT
       FIRST_NAME
     , LAST_NAME
  FROM
       CUSTOMER C
WHERE
  NOT EXISTS ( SELECT 1
                 FROM PAYMENT P
                WHERE P.CUSTOMER_ID = C.CUSTOMER_ID
                  AND P.AMOUNT > 11 
              )
ORDER BY FIRST_NAME, LAST_NAME
;
```
<br>
<br>

## 연습문제
* 2번 스캔하는 SQL문을 1번 스캔해 동일 집합 구하기

```sql
---------- # 문제의 SQL - 2번 스캔하는 SQL문
SELECT
       FILM_ID
     , TITLE
     , RENTAL_RATE
  FROM FILM
 WHERE RENTAL_RATE > 
 (
      SELECT
             AVG (RENTAL_RATE)
        FROM FILM 
  )
;
---------- # 1. AVG 사용해서 평균 구하기
SELECT A.FILM_ID
     , A.TITLE
     , A.RENTAL_RATE
     , AVG(A.RENTAL_RATE) OVER() AS AVG_RENTAL_RATE
FROM FILM A
;
---------- # 2. 1번에서 구한 집합을 인라인뷰로 감싸서 평균보다 큰 값을 구함
SELECT A.FILM_ID
     , A.TITLE
     , A.RENTAL_RATE
FROM (
  SELECT A.FILM_ID
       , A.TITLE
       , A.RENTAL_RATE
       , AVG(A.RENTAL_RATE) OVER() AS AVG_RENTAL_RATE
  FROM FILM A) A
WHERE A.RENTAL_RATE > A.AVG_RENTAL_RATE
;
```
<br>
<br>

* Except연산 사용하지 말고 같은 결과 도출하기

```sql
---------- # 문제의 SQL - 재고가 없는 영화 구하기
SELECT
  FILM_ID, TITLE
FROM FILM
EXCEPT 
SELECT DISTINCT INVENTORY.FILM_ID, TITLE
  FROM INVENTORY
INNER JOIN FILM 
  ON FILM.FILM_ID = INVENTORY.FILM_ID
ORDER BY TITLE
;
---------- # 1. FILM 테이블을 조회
SELECT
  FILM_ID, TITLE
FROM FILM A
;
---------- # 2. 재고 존재하는 집합은 FILM집합에서 제외
--재고가 없는 거다. 
SELECT FILM_ID, TITLE
  FROM FILM A
WHERE NOT EXISTS (
      SELECT 1
        FROM INVENTORY B, FILM C
      WHERE B.FILM_ID = C.FILM_ID
        AND A.FILM_ID = C.FILM_ID
      )
;
```
<br>
<br>
