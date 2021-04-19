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
```sql
CREATE TABLE PRODUCT_GROUP (
 GROUP_ID SERIAL PRIMARY KEY,
 GROUP_NAME VARCHAR (255) NOT NULL
);
 
CREATE TABLE PRODUCT (
  PRODUCT_ID SERIAL PRIMARY KEY
, PRODUCT_NAME VARCHAR (255) NOT NULL
, PRICE DECIMAL (11, 2)
, GROUP_ID INT NOT NULL
, FOREIGN KEY (GROUP_ID) 
  REFERENCES PRODUCT_GROUP (GROUP_ID)
);

INSERT INTO PRODUCT_GROUP (GROUP_NAME)
VALUES
  ('Smartphone')
, ('Laptop')
, ('Tablet');

COMMIT; 

SELECT * FROM PRODUCT_GROUP; 
 
INSERT INTO PRODUCT (PRODUCT_NAME, GROUP_ID,PRICE)
VALUES
  ('Microsoft Lumia', 1, 200)
, ('HTC One', 1, 400)
, ('Nexus', 1, 500)
, ('iPhone', 1, 900)
, ('HP Elite', 2, 1200)
, ('Lenovo Thinkpad', 2, 700)
, ('Sony VAIO', 2, 700)
, ('Dell Vostro', 2, 800)
, ('iPad', 3, 700)
, ('Kindle Fire', 3, 150)
, ('Samsung Galaxy Tab', 3, 200);

COMMIT; 

SELECT * FROM PRODUCT; 

-------------------------------------------------------------------


SELECT
      COUNT(*)
  FROM
      PRODUCT;
     
SELECT * FROM 
	product; 

--2번 

     
     
     
     
     
     
--집계의 결과와 테이블의 내용도 함께 보여준다. 
--이게바로 분석함수의 역할이다. 
--우리는 지금부터 다양한 분석함수를 배우게 된다.      
SELECT
       COUNT(*) OVER() , A.*   -- 건수와 A의 결과도 같이 보여줌
  FROM
       PRODUCT A 
;     
```
<br>
<br>

## AVG
```sql
SELECT
      AVG (PRICE)
 FROM
      PRODUCT;


     
     
     
     
     
     
     
     
     
     
     
     
     
     
SELECT
      B.GROUP_NAME
    , AVG (PRICE)
 FROM PRODUCT A
INNER JOIN PRODUCT_GROUP B
    ON (A.GROUP_ID = B.GROUP_ID)
GROUP BY
B.GROUP_NAME;






--보여줄꺼 다 보여주면서 
--group_name별 평균가격을 보고 싶어요~
SELECT
       A.PRODUCT_NAME 
     , A.PRICE
     , B.GROUP_NAME
     , AVG (A.PRICE) OVER (PARTITION BY B.GROUP_NAME)  
FROM
PRODUCT A
INNER JOIN PRODUCT_GROUP B
ON (A.GROUP_ID = B.GROUP_ID);




















SELECT
       A.PRODUCT_NAME 
     , A.PRICE
     , B.GROUP_NAME
     , AVG (A.PRICE) OVER (PARTITION BY B.GROUP_NAME ORDER BY B.GROUP_NAME)  
FROM
PRODUCT A
INNER JOIN PRODUCT_GROUP B
ON (A.GROUP_ID = B.GROUP_ID);










--누적평균을 구할수있다. 
SELECT
       A.PRODUCT_NAME 
     , A.PRICE
     , B.GROUP_NAME
     , AVG (A.PRICE) OVER (PARTITION BY B.GROUP_NAME ORDER BY A.PRICE)  --누적집계
FROM
PRODUCT A
INNER JOIN PRODUCT_GROUP B
ON (A.GROUP_ID = B.GROUP_ID);
```
<br>
<br>

## Row_Number, Rank, Dense_Rank

```sql
SELECT
       A.PRODUCT_NAME
     , B.GROUP_NAME
     , A.PRICE
     , ROW_NUMBER () OVER 
       ( PARTITION BY B.GROUP_NAME ORDER BY A.PRICE DESC)
 FROM PRODUCT A
INNER JOIN PRODUCT_GROUP B
        ON (A.GROUP_ID = B.GROUP_ID);

       
       
       
       
       
       
       
       
       
       
       
       
SELECT
       A.PRODUCT_NAME
     , B.GROUP_NAME
     , A.PRICE
     , RANK () OVER 
       ( PARTITION BY B.GROUP_NAME ORDER BY A.PRICE ASC  )
  FROM PRODUCT A
INNER JOIN PRODUCT_GROUP B
        ON (A.GROUP_ID = B.GROUP_ID);

       
       
       
       
       
       
       
       
       
       
       
       
       
SELECT
       A.PRODUCT_NAME
     , B.GROUP_NAME
     , A.PRICE
     , DENSE_RANK () OVER 
       ( PARTITION BY B.GROUP_NAME ORDER BY A.PRICE)
FROM PRODUCT A
INNER JOIN PRODUCT_GROUP B
        ON (A.GROUP_ID = B.GROUP_ID);
       
```
<br>
<br>

## First_Value, Last_Value

```sql
SELECT
       A.PRODUCT_NAME, B.GROUP_NAME, A.PRICE
     , FIRST_VALUE (A.PRICE) OVER 
       (PARTITION BY B.GROUP_NAME ORDER BY A.PRICE DESC 
       ) 
       AS LOWEST_PRICE_PER_GROUP
FROM PRODUCT A
INNER JOIN PRODUCT_GROUP B
        ON (A.GROUP_ID = B.GROUP_ID);

       
       
       
       
       
       
SELECT
       A.PRODUCT_NAME, B.GROUP_NAME, A.PRICE
     , LAST_VALUE (A.PRICE) OVER 
       (PARTITION BY B.GROUP_NAME ORDER BY A.PRICE DESC 
        RANGE BETWEEN UNBOUNDED PRECEDING -----------UNBOUNDED PRECEDING 그룹의 첫번째값
        AND UNBOUNDED FOLLOWING) ----------- UNBOUNDED FOLLOWING 그룹의 마지막값
        AS LOWEST_PRICE_PER_GROUP
FROM PRODUCT A
INNER JOIN PRODUCT_GROUP B
              ON (A.GROUP_ID = B.GROUP_ID);

             
-- range between이 없으면 lastvalue 못 뽑음 -> 의미없음
-- range between 안쓰면 current row가 default 값 -> current row까지만 지정한다는 이야기
             
SELECT
       A.PRODUCT_NAME, B.GROUP_NAME, A.PRICE
     , LAST_VALUE (A.PRICE) OVER 
       (PARTITION BY B.GROUP_NAME ORDER BY A.PRICE
        ) 
        AS LOWEST_PRICE_PER_GROUP
FROM PRODUCT A
INNER JOIN PRODUCT_GROUP B
              ON (A.GROUP_ID = B.GROUP_ID);
          

             
             
             
             
             
             
             
             
             
             
             
             
             
SELECT
       A.PRODUCT_NAME, B.GROUP_NAME, A.PRICE
     , LAST_VALUE (A.PRICE) OVER 
       (PARTITION BY B.GROUP_NAME ORDER BY A.PRICE        
       RANGE BETWEEN UNBOUNDED PRECEDING  
	       AND CURRENT ROW
       ) 
        AS LOWEST_PRICE_PER_GROUP
FROM PRODUCT A
INNER JOIN PRODUCT_GROUP B
              ON (A.GROUP_ID = B.GROUP_ID);
                    
             
             
```
<br>
<br>

## Lag, Lead
```sql
-- LAG (카테고리, 간격)

SELECT
	  A.PRODUCT_NAME
	, B.GROUP_NAME
	, A.PRICE
	,           LAG (A.PRICE  , 1) OVER ( PARTITION BY B.GROUP_NAME ORDER BY A.PRICE ) AS PREV_PRICE
	, A.PRICE - LAG (A.PRICE  , 1) OVER ( PARTITION BY B.GROUP_NAME   ORDER BY A.PRICE ) AS CUR_PREV_DIFF
FROM
	PRODUCT A
INNER JOIN PRODUCT_GROUP B ON
	(A.GROUP_ID = B.GROUP_ID);











SELECT
	  A.PRODUCT_NAME
	, B.GROUP_NAME
	, A.PRICE
	,           LEAD (A.PRICE , 1) OVER ( PARTITION BY B.GROUP_NAME ORDER BY A.PRICE ) AS NEXT_PRICE
	, A.PRICE - LEAD (A.PRICE , 1) OVER ( PARTITION BY B.GROUP_NAME ORDER BY A.PRICE ) AS CUR_NEXT_DIFF
FROM
	PRODUCT A
INNER JOIN PRODUCT_GROUP B ON
	(A.GROUP_ID = B.GROUP_ID);

```
<br>
<br>

## 연습문제
### 1
```sql
RENTAL 테이블을 이용하여 연, 연월, 연월일, 전체 각각의 기준으로 RENTAL_ID 기준 렌탈이 일어난 횟수를 출력하라. 
(전체 데이터 기준으로 모든 행을 출력)
;

SELECT * FROM RENTAL; 

--연
--연월 
--연월일
--전체 
--ROLLUP을 사용한다. 

SELECT
	   TO_CHAR(rental_date, 'YYYY')
     , TO_CHAR(rental_date, 'MM')
     , TO_CHAR(rental_date, 'DD') 
     , COUNT(*) 
FROM RENTAL 
GROUP BY 
	ROLLUP (
				TO_CHAR(rental_date, 'YYYY')
			  , TO_CHAR(rental_date, 'MM')
           	  , TO_CHAR(rental_date, 'DD')
			)
			;






SELECT TO_CHAR(rental_date, 'YYYY')
     , COUNT(*) FROM RENTAL
GROUP BY TO_CHAR(rental_date, 'YYYY')
;

SELECT TO_CHAR(rental_date, 'YYYYMM')
     , COUNT(*) FROM RENTAL
GROUP BY TO_CHAR(rental_date, 'YYYYMM')
ORDER BY TO_CHAR(rental_date, 'YYYYMM')
;

SELECT TO_CHAR(rental_date, 'YYYYMMDD')
     , COUNT(*) FROM RENTAL
GROUP BY TO_CHAR(rental_date, 'YYYYMMDD')
ORDER BY TO_CHAR(rental_date, 'YYYYMMDD')
;

SELECT COUNT(*) 
FROM rental; 
```
<br>
<br>

### 2
```sql
RENTAL과 CUSTOMER 테이블을 이용하여 
현재까지 가장 많이 RENTAL을 한 고객의 
고객ID, 렌탈순위, 누적렌탈횟수, 이름을 
출력하라.
;

SELECT a.customer_id
	 , ROW_NUMBER()  OVER (ORDER BY count(a.rental_id) desc) AS rental_rank 
     , count(*) rental_count  
     , max(b.first_name) AS first_name
     , max(b.last_name) AS last_name
FROM rental a, 
	 customer b 
WHERE a.customer_id = b.customer_id	 
GROUP BY a.customer_id
ORDER BY rental_rank
LIMIT 1
; 


SELECT a.customer_id, a.rental_rank, a.rental_count, b.first_name, b.last_name
FROM 
(
SELECT a.customer_id
	 , ROW_NUMBER()  OVER (ORDER BY count(a.rental_id) desc) AS rental_rank 
     , count(*) rental_count  
FROM rental a
GROUP BY a.customer_id
ORDER BY rental_rank
LIMIT 1
) a, customer b 
WHERE a.customer_id = b.customer_id
; 



```