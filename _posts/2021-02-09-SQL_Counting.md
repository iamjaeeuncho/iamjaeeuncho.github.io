---
title: "[SQL] 기초 집계 데이터 - GroupBy, Having, GroupingSet, RollUp, Cube"
date: 2021-2-9
categories:
  - study
tags:
  - sql
toc: true
toc_ads: true
toc_sticky: true
---

## Group By
- 특정 컬럼 기준으로 그룹을 만듬
- Select문에서 선택된 행을 그룹별로 묶어, 합계/평균/카운트 등을 계산할 수 있게 함

```sql
---------- # Group By
SELECT
      CUSTOMER_ID
  FROM
      PAYMENT
GROUP BY CUSTOMER_ID               -- 중복 값이 제거된 CUSTOMER_ID 구하기
;

SELECT
      DISTINCT CUSTOMER_ID
  FROM
      PAYMENT
;      
---------- # Group By + 합계 및 정렬
SELECT
       CUSTOMER_ID                  -- GROUPBY컬럼인 CUSTOMER_ID를 출력
     , SUM(AMOUNT) AS AMOUNT_SUM    -- 그룹핑한 CUSTOMER_ID기준 AMOUNT의 합계를 출력
  FROM
       PAYMENT
GROUP BY CUSTOMER_ID                -- PAYMENT테이블을 CUSTOMER_ID기준으로 GROUPBY
ORDER BY SUM(AMOUNT) DESC           -- 거래액이 가장 많은 고객순으로 출력
;

SELECT
       CUSTOMER_ID
     , SUM(AMOUNT) AS AMOUNT_SUM
  FROM
       PAYMENT
GROUP BY CUSTOMER_ID
ORDER BY AMOUNT_SUM DESC            -- 추천
;

SELECT
       CUSTOMER_ID
     , SUM(AMOUNT) AS AMOUNT_SUM
  FROM
       PAYMENT
GROUP BY CUSTOMER_ID
ORDER BY 2 DESC                     -- 비추
;
---------- # Group By + 카운트
SELECT 
       STAFF_ID                     -- GROUPBY컬럼인 STAFF_ID를 출력
     , COUNT(PAYMENT_ID) AS COUNT   -- STAFF_ID기준 PAYMENT_ID의 카운트를 출력
  FROM PAYMENT
GROUP BY STAFF_ID
;

SELECT 
       a.STAFF_ID
     , b.staff_id
     , b.first_name 
     , b.last_name
     , COUNT(a.PAYMENT_ID) AS COUNT
  FROM PAYMENT a, staff b
  WHERE a.staff_id = b.staff_id
GROUP BY a.STAFF_ID
       , b.staff_id
       , b.first_name 
       , b.last_name
;
```
<br>
<br>

## Having
-- where과 having의 차이점
-- 테이블의 행을 뽑는건 where절, 그룹핑한 테이블에서 어떤 데이터를 뽑는건 having절 


```sql
SELECT
       CUSTOMER_ID
     , SUM(AMOUNT) AS AMOUNT
  FROM
       PAYMENT
GROUP BY CUSTOMER_ID
ORDER BY amount DESC
;

SELECT
       A.CUSTOMER_ID
     , B.EMAIL
     , SUM(A.AMOUNT) AS AMOUNT_SUM
  FROM
       PAYMENT A
     , CUSTOMER B 
 WHERE A.CUSTOMER_ID = B.CUSTOMER_ID       
GROUP BY A.CUSTOMER_ID,B.EMAIL
HAVING SUM(A.AMOUNT) > 200
;

--having 절은 group by를 한 결과 중에서 -> 뽑을 정보만 뽑는다. 


SELECT
       STORE_ID
     , COUNT(CUSTOMER_ID) AS COUNT
  FROM
       CUSTOMER
GROUP BY STORE_ID
;


SELECT
        STORE_ID
     ,  COUNT(CUSTOMER_ID) AS COUNT
  FROM
        CUSTOMER
GROUP BY STORE_ID
HAVING COUNT(CUSTOMER_ID)  > 300
;


SELECT * FROM store 
WHERE store_id = 1
; 
```
<br>
<br>

## Grouping Set

```sql
CREATE TABLE SALES 
(
BRAND VARCHAR NOT NULL,
SEGMENT VARCHAR NOT NULL,
QUANTITY INT NOT NULL,
PRIMARY KEY (BRAND, SEGMENT)
);

INSERT INTO SALES (BRAND, SEGMENT, QUANTITY)
VALUES
  ('ABC', 'Premium', 100)
, ('ABC', 'Basic', 200)
, ('XYZ', 'Premium', 100)
, ('XYZ', 'Basic', 300);

COMMIT;

SELECT * FROM sales; 








SELECT
       BRAND
     , SEGMENT
     , SUM (QUANTITY)
  FROM
       SALES
GROUP BY BRAND, SEGMENT;









SELECT
       BRAND
     , SUM (QUANTITY)
  FROM
       SALES
GROUP BY
       BRAND;

     
      
      
      
      
      
SELECT
       SEGMENT
     , SUM (QUANTITY)
  FROM
       SALES
GROUP BY SEGMENT;










SELECT
       SUM (QUANTITY)
  FROM
       SALES;
   
      
      
--동일한 테이블을 4번씩이나 읽고있다. -> 성능저하 가능성이 존재합니다.
--너무 sql문이 길어진다. -> 복잡해진다 -> 유지보수가 용이하지않다.
SELECT BRAND
     , SEGMENT
     , SUM (QUANTITY)
  FROM SALES
GROUP BY BRAND, SEGMENT
UNION ALL 
SELECT BRAND
     , NULL
     , SUM (QUANTITY)
FROM SALES
GROUP BY BRAND
UNION ALL 
SELECT NULL
     , SEGMENT
     , SUM (QUANTITY)
 FROM SALES
GROUP BY SEGMENT
UNION ALL 
SELECT NULL
     , NULL
     , SUM (QUANTITY)
FROM SALES;














-- union all과 grouping set이 동일

SELECT
	  BRAND
	, SEGMENT
	, SUM (QUANTITY)
FROM
	SALES
GROUP BY                     -- GROUP by를 하는데 기준을 GROUPING SETS
	GROUPING SETS ( 
	  (BRAND, SEGMENT)
	, (BRAND)
	, (SEGMENT)
	, () 
);






SELECT
       GROUPING(BRAND) GROUPING_BRAND       -- GROUPING 하면 해당 컬럼이 집계에 사용되면 0, 아니면 1
     , GROUPING(SEGMENT) GROUPING_SEGEMENT
     , BRAND
     , SEGMENT
     , SUM (QUANTITY)
 FROM
      SALES
GROUP BY
GROUPING SETS 
( 
  (BRAND, SEGMENT)
, (BRAND)
, (SEGMENT)
, () 
)
ORDER BY BRAND, SEGMENT;



















SELECT
		CASE WHEN GROUPING(BRAND) = 0 AND GROUPING(SEGMENT) = 0 THEN '브랜드별+등급별' -- 브랜드와 세그먼트가 0이면 둘 다 사용된 것 
			 WHEN GROUPING(BRAND) = 0 AND GROUPING(SEGMENT) = 1 THEN '브랜드별'      -- 브랜드가 0이면 브랜드만 사용된 것 
		     WHEN GROUPING(BRAND) = 1 AND GROUPING(SEGMENT) = 0 THEN '등급별'
			 WHEN GROUPING(BRAND) = 1 AND GROUPING(SEGMENT) = 1 THEN '전체합계'
			 ELSE '' 
			 END AS "집계기준"	
     , BRAND
     , SEGMENT
     , SUM (QUANTITY)
 FROM
      SALES
GROUP BY
GROUPING SETS 
( 
  (BRAND, SEGMENT)
, (BRAND)
, (SEGMENT)
, () 
)
ORDER BY BRAND, SEGMENT;

```
<br>
<br>

## RollUp

```sql
-- 자주씀

SELECT
       SEGMENT
     , SUM (QUANTITY)
  FROM
            SALES
GROUP BY  SEGMENT;     
      
--------------------------------------------------------------------------------------      
SELECT
       SEGMENT
     , SUM (QUANTITY)
  FROM
            SALES
GROUP BY 
ROLLUP (SEGMENT)      -- 추가로 전체 합계가 나옴
ORDER BY
       SEGMENT;



SELECT
       BRAND
     , SEGMENT
     , SUM (QUANTITY)
  FROM
       SALES
GROUP BY
       BRAND, SEGMENT
ORDER BY
       BRAND, SEGMENT;
      
      
      
      

SELECT
       BRAND
     , SEGMENT
     , SUM (QUANTITY)
  FROM
       SALES
GROUP BY
       ROLLUP (BRAND, SEGMENT)
ORDER BY
       BRAND, SEGMENT;
      
--group by별 합계 + rollup절에 맨 앞에 쓴 컬럼 기준의 합계도 나오고 + 전체 합계도 나왔다 
      
SELECT
       BRAND
     , SEGMENT
     , SUM (QUANTITY)
  FROM
       SALES
GROUP BY BRAND, 
       ROLLUP (SEGMENT)
ORDER BY
       BRAND, SEGMENT;
      
      

      
      
      
      
      
      
--------------------------------------------------------------------------------------      
SELECT
       SEGMENT
     , BRAND
     , SUM (QUANTITY)
  FROM
            SALES
GROUP BY SEGMENT,
ROLLUP (BRAND)
ORDER BY
       SEGMENT, BRAND;
      
--부분 rollup = group by 별 합계 + 맨앞에 쓴 컬럼별 합계 + 전체 합계는 구하지 않는다.       
```
<br>
<br>

## Cube

```sql
SELECT
       BRAND, SEGMENT
     , SUM (QUANTITY)
  FROM   SALES
GROUP BY
        CUBE (BRAND, SEGMENT)
ORDER BY
        BRAND, SEGMENT;
       
--cube = group by 절 합계 + brand별 + segment별 + 전체합계 

SELECT
       BRAND, SEGMENT
     , SUM (QUANTITY)
  FROM   SALES
GROUP BY
        rollup (BRAND, SEGMENT)
ORDER BY
        BRAND, SEGMENT;
       
--rollup = group by 절 합계 + brand별 + 전체합계
--세그먼트별 합계는 나오지 않음 

       
       
       
       
       
       
       
       
       
       
       
       
SELECT
       BRAND, SEGMENT
     , SUM (QUANTITY)
  FROM   SALES
GROUP BY BRAND,
         CUBE (SEGMENT)
ORDER BY
         BRAND, SEGMENT;

--부분 cube = group by별 합계 + 맨앞에 쓴 컬럼별 합계 
--        = 뒤에쓴 컬럼이랑 전체 합계는 구하지 않는다. 
       
```
<br>
<br>
