---
title: "[SQL] 기본 구문 - Select, "
date: 2020-11-5
categories:
  - study
tags:
  - sql
toc: true
toc_sticky: true
---

## Select : 선택

```sql
# 전체 선택 '*'
SELECT 
       *
  FROM 
       CUSTOMER
;
------------------------------------------
# 특정 칼럼만 선택
SELECT 
       FIRST_NAME 
     , LAST_NAME
     , EMAIL
  FROM 
       CUSTOMER 
;
------------------------------------------
# ALIAS는 어떤 그룹인지 알려줌. 코드의 가독성 및 찾는 속도 증가
SELECT 
       A.FIRST_NAME 
     , A.LAST_NAME
     , A.EMAIL
  FROM 
       CUSTOMER A 
;
```
<br>
<br>

## Select

```sql
# ASC 오름차순
SELECT 
       FIRST_NAME
     , LAST_NAME
  FROM 
       CUSTOMER
 ORDER BY FIRST_NAME ASC
 ;
--------------------------------------------
# DESC 내림차순
SELECT 
       FIRST_NAME
     , LAST_NAME
  FROM 
       CUSTOMER
 ORDER BY FIRST_NAME DESC
 ;
--------------------------------------------
# ASC + DESC 같이 쓰기
SELECT 
       FIRST_NAME --asc --오름차순 --순차적
     , LAST_NAME --desc --내림차순 --역순
  FROM 
       CUSTOMER
 ORDER BY FIRST_NAME ASC --가독성
       ,  LAST_NAME DESC
 ;
--------------------------------------------
# 1,2로 대체 가능 BUT 가독성 안 좋으므로 비추
SELECT 
       FIRST_NAME --asc --오름차순 --순차적
     , LAST_NAME --desc --내림차순 --역순
  FROM 
       CUSTOMER
 ORDER BY 1 ASC
       ,  2 DESC
 ;
```

```sql
-- 테이블 생성

DROP TABLE T1; 
CREATE TABLE T1 ( ID SERIAL NOT NULL PRIMARY KEY, BCOLOR VARCHAR, FCOLOR VARCHAR );

COMMIT; -- CREAT는 커밋할 필요 없음
        -- 테이블 생성하자마자 -> DDL --> 치는 순간에 바로 적용 

INSERT
  INTO T1 (BCOLOR, FCOLOR)
VALUES
         ('red', 'red')
       , ('red', 'red')
       , ('red', NULL)
       , (NULL, 'red')
       , ('red', 'green')
       , ('red', 'blue')
       , ('green', 'red')
       , ('green', 'blue')
       , ('green', 'green')
       , ('blue', 'red')
       , ('blue', 'green')
       , ('blue', 'blue')
;
		
COMMIT; 

SELECT
             *
 FROM
             T1;

--------------------------------------------------------------------
-- select + distinct + 컬럼 한 개

SELECT
    DISTINCT BCOLOR      -- BCOLOR 값 출력시 중복행 제거
FROM
    T1
ORDER BY
    BCOLOR               -- BCOLOR로 정렬
;
----------------------------------------------------------------------
-- select + distinct + 컬럼 두 개

SELECT
    DISTINCT BCOLOR, FCOLOR  -- BCOLOR, FCOLOR 값 출력시 중복행 제거
FROM
    T1
ORDER BY
    BCOLOR, FCOLOR           -- BCOLOR로 먼저 정렬하고 FCOLOR로 정렬
 ;
-----------------------------------------------------------------------
-- select + distinct + 컬럼 두 개 + on

SELECT
      DISTINCT ON (BCOLOR) BCOLOR  -- BCOLOR 컬럼 값 기준 중복 제거함
   ,  FCOLOR                       -- FCOLOR 컬럼 값은 단 한 개 값 만을 보여줌
FROM
    T1
ORDER BY
    BCOLOR, FCOLOR;                -- 대신 FCOLOR 첫번째값만

--------------------------------------------------------------------------
-- select + distinct + 컬럼 두 개 + on + DESC 정렬
-- Null값이 가장 큰 값

SELECT
      DISTINCT ON (BCOLOR) BCOLOR
   ,  FCOLOR
FROM
    T1
ORDER BY
    BCOLOR, FCOLOR DESC;
```



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


```sql
-- in 있는지 없는지 
-- in 연산자는 'or', '='과 같다 
-- 간단하게 쓰는게 가독성이 좋으므로 추천
-- (DBMS/SQL 최적화 문법)
-- 옵티마이저 특성상 IN조건이 유리할때가 많다

SELECT
       CUSTOMER_ID
     , RENTAL_ID
     , RETURN_DATE
  FROM RENTAL
 WHERE
       CUSTOMER_ID IN (1, 2)           -- customerid가 1 또는 2 (or 조건)
ORDER BY RETURN_DATE DESC;

--------------------------------------
-- in + or

SELECT
       CUSTOMER_ID
     , RENTAL_ID
     , RETURN_DATE
  FROM RENTAL
 WHERE
          CUSTOMER_ID = 1              -- customerid가 1 또는 2 (or 조건)
       OR CUSTOMER_ID = 2
ORDER BY RETURN_DATE DESC;

---------------------------------------
-- not in

SELECT
       CUSTOMER_ID
     , RENTAL_ID
     , RETURN_DATE
  FROM RENTAL
 WHERE
       CUSTOMER_ID NOT IN (1, 2)        -- 1 또는 2가 아닌 것
ORDER BY RETURN_DATE DESC;

---------------------------------------
-- not in은 'AND', '<>'과 같음

SELECT
      CUSTOMER_ID
     , RENTAL_ID
     , RETURN_DATE
  FROM RENTAL
 WHERE
       CUSTOMER_ID <> 1 
   AND CUSTOMER_ID <> 2
ORDER BY RETURN_DATE DESC;

----------------------------------------------------
-- 서브쿼리
-- cast 데이터 형식 변환: cast (변환하고자 하는 데이터 AS 데이터 형식)

SELECT
             CUSTOMER_ID
FROM
             RENTAL
WHERE
    CAST (RETURN_DATE AS DATE) = '2005-05-27'; 
-- returndate를 date 타입으로 변환시킨 다음에 '2005-05-27'의 커스터머 아이디 불러오기

-------------------------------------------------------
SELECT
      FIRST_NAME
    , LAST_NAME
 FROM CUSTOMER
WHERE CUSTOMER_ID IN (
					    SELECT
					        CUSTOMER_ID
					    FROM
					        RENTAL
					    WHERE
					        CAST (RETURN_DATE AS DATE) = '2005-05-27' 
       				);
```

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


```sql
-- like 특정 패턴과 유사한 집합 출력
-- '%'는 어떤 문자든 가능
-- '-'는 한 개의 임의의 문자

SELECT
      FIRST_NAME
    , LAST_NAME
 FROM
      CUSTOMER
WHERE
    FIRST_NAME LIKE 'Jen%'     -- firstname이 jen으로 시작하는
;
   
   ------------------------------------------------
SELECT
	    'FOO' LIKE 'FOO'       -- true
	  , 'FOO' LIKE 'F%'        -- true
      , 'FOO' LIKE '_O_'       -- true
	  , 'BAR' LIKE 'B_'        -- false
;

-----------------------------------------------
SELECT
      FIRST_NAME
    , LAST_NAME
 FROM
      CUSTOMER
WHERE
    FIRST_NAME LIKE '%er%'      -- 어떤 문자든지 중간에 er 들어감
;

----------------------------------------------
SELECT
      FIRST_NAME
    , LAST_NAME
 FROM
      CUSTOMER
WHERE
    FIRST_NAME LIKE '_her%'      -- 첫 임의의 글자로 시작, 중간에 er 들어감
;

   ----------------------------------------------
SELECT
      FIRST_NAME
    , LAST_NAME
FROM
      CUSTOMER
WHERE
    FIRST_NAME NOT LIKE 'Jen%'      -- jen으로 시작하지 않는 것
;
```

```sql
-- is null 널값확인
-- is not null 널값이 아니면 출력

CREATE TABLE CONTACTS 
(
    ID INT GENERATED BY DEFAULT AS IDENTITY
  , FIRST_NAME VARCHAR(50) NOT NULL
  , LAST_NAME VARCHAR(50) NOT NULL
  , EMAIL VARCHAR(255) NOT NULL
  , PHONE VARCHAR(15)
  , PRIMARY KEY (ID) 
);

INSERT 
   INTO 
   CONTACTS(FIRST_NAME, LAST_NAME, EMAIL, PHONE) 
VALUES
   ('John','Doe','john.doe@example.com',NULL),
       ('Lily','Bush','lily.bush@example.com','(408-234-2764)');

COMMIT;       
      
SELECT
	*
FROM
	CONTACTS;

-----------------------------------------------
-- Null 값에서 연산자 '=' 사용안됨

SELECT
       ID
     , FIRST_NAME
     , LAST_NAME
     , EMAIL
     , PHONE
  FROM
       CONTACTS
 WHERE PHONE = NULL;

-----------------------------------------------
 SELECT
       ID
     , FIRST_NAME
     , LAST_NAME
     , EMAIL
     , PHONE
  FROM
       CONTACTS
WHERE PHONE IS NULL;

----------------------------------------------------
SELECT
	*
FROM
	CONTACTS;

-----------------------------------------------
SELECT
       ID
     , FIRST_NAME
     , LAST_NAME
     , EMAIL
     , PHONE
  FROM
       CONTACTS
WHERE PHONE IS NOT NULL;
```


※ Credit: Fast Campus, 모두를 위한 SQL/DB 올인원 패키지