---
title: "[SQL] 서브쿼리-Any, All, Exists"
date: 2021-2-10
categories:
  - study
tags:
  - sql
toc: true
toc_ads: true
toc_sticky: true
---

## 서브쿼리란
```sql
SELECT
      AVG(RENTAL_RATE)
 FROM
      FILM;

     
     
     
SELECT
       FILM_ID
     , TITLE
     , RENTAL_RATE
  FROM FILM
 WHERE RENTAL_RATE > 2.98
;











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
 );







-- from절 안에 있으면 인라인 뷰

SELECT
       A.FILM_ID
     , A.TITLE
     , A.RENTAL_RATE
FROM FILM A
   , (
      SELECT
	   AVG(RENTAL_RATE) AS AVG_RENTAL_RATE
       FROM FILM
     ) B
WHERE A.RENTAL_RATE > B.AVG_RENTAL_RATE
;












-- 인라인 안에 select 구문 안 서브쿼리를 스칼라쿼리라고 함



SELECT 	  
       A.FILM_ID
     , A.TITLE
     , A.RENTAL_RATE 
 FROM 
(
SELECT
       A.FILM_ID
     , A.TITLE
     , A.RENTAL_RATE
     , (
         SELECT AVG(L.RENTAL_RATE) 
           FROM FILM L
       ) AS AVG_RENTAL_RATE 
  FROM FILM A
) A
WHERE A.RENTAL_RATE > A.AVG_RENTAL_RATE;

```
<br>
<br>

## Any
```sql
SELECT TITLE, LENGTH
  FROM FILM
WHERE LENGTH >= ANY
(
    SELECT MAX(LENGTH)
    FROM FILM A
       , FILM_CATEGORY B 
    WHERE A.FILM_ID = B.FILM_ID
    GROUP BY B.CATEGORY_ID 
);


    SELECT b.CATEGORY_ID,  MAX(LENGTH)
    FROM FILM A
       , FILM_CATEGORY B 
    WHERE A.FILM_ID = B.FILM_ID
    GROUP BY B.CATEGORY_ID 
    ;
 
-- any가 없으면 에러
   SELECT TITLE, LENGTH
  FROM FILM
WHERE LENGTH >= 
(
    SELECT MAX(LENGTH)
    FROM FILM A
       , FILM_CATEGORY B 
    WHERE A.FILM_ID = B.FILM_ID
    GROUP BY B.CATEGORY_ID 
);
















SELECT TITLE, LENGTH
  FROM FILM
WHERE LENGTH = ANY
(
    SELECT MAX(LENGTH)
    FROM FILM A
       , FILM_CATEGORY B 
    WHERE A.FILM_ID = B.FILM_ID
    GROUP BY B.CATEGORY_ID 
);
















SELECT TITLE, LENGTH
  FROM FILM
WHERE LENGTH IN
(
    SELECT MAX(LENGTH)
    FROM FILM A
       , FILM_CATEGORY B 
    WHERE A.FILM_ID = B.FILM_ID
    GROUP BY B.CATEGORY_ID 
);

```
<br>
<br>

## All
```sql
SELECT
  FILM_ID, TITLE
FROM FILM
EXCEPT 
SELECT DISTINCT INVENTORY.FILM_ID
     , TITLE
  FROM INVENTORY
INNER JOIN FILM 
ON FILM.FILM_ID = INVENTORY.FILM_ID
ORDER BY TITLE;


--재고가 없는 거다. 
SELECT a.film_id, a.title  
FROM film a
WHERE NOT EXISTS (
			SELECT 1 
			FROM inventory b , film c 
			WHERE b.film_id = c.film_id 
			AND a.film_id = c.film_id
);

SELECT a.film_id, a.title  
FROM film a
WHERE NOT EXISTS (
			SELECT 1 
			FROM inventory b  
			WHERE 1=1
			AND a.film_id = b.film_id
);











```
<br>
<br>

## Exists
```sql
SELECT
       FIRST_NAME
     , LAST_NAME
  FROM
       CUSTOMER C
WHERE
EXISTS ( SELECT 1
           FROM PAYMENT P
          WHERE P.CUSTOMER_ID = C.CUSTOMER_ID
            AND P.AMOUNT > 11 
               )
ORDER BY FIRST_NAME, LAST_NAME;












SELECT * FROM CUSTOMER; --599-8=591 591+8=599






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
ORDER BY FIRST_NAME, LAST_NAME;

```
<br>
<br>



## 연습문제
### 1
```sql
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
 );


SELECT  FILM_ID
     , TITLE
     , RENTAL_RATE 
FROM 
(
SELECT FILM_ID, title, rental_rate, AVG(A.RENTAL_RATE) OVER() AS AVG_RENTAL_RATE
FROM FILM A 
) A 
WHERE rental_rate > AVG_RENTAL_RATE

```
<br>
<br>

### 2
```sql
SELECT
  FILM_ID, TITLE
FROM FILM
EXCEPT 
SELECT DISTINCT INVENTORY.FILM_ID
     , TITLE
  FROM INVENTORY
INNER JOIN FILM 
ON FILM.FILM_ID = INVENTORY.FILM_ID
ORDER BY TITLE;


--재고가 없는 거다. 
SELECT a.film_id, a.title  
FROM film a
WHERE NOT EXISTS (
			SELECT 1 
			FROM inventory b , film c 
			WHERE b.film_id = c.film_id 
			AND a.film_id = c.film_id
);

SELECT a.film_id, a.title  
FROM film a
WHERE NOT EXISTS (
			SELECT 1 
			FROM inventory b  
			WHERE 1=1
			AND a.film_id = b.film_id
);











```
<br>
<br>