---
title: "[SQL] 데이터 보유 여부 확인 - In, Like, Isnull"
date: 2021-2-7
categories:
  - study
tags:
  - sql
toc: true
toc_ads: true
toc_sticky: true
---

## In - 보유여부
- 특정 집합에서 특정 요소가 존재하는지 확인
- in 연산자는 ``or``, ``=``과 같다
- not in은 ``AND``, ``<>``과 같음
- 간단하게 쓰는게 가독성이 좋으므로 추천
- 옵티마이저 특성상 IN조건이 유리할때가 많다 (DBMS/SQL 최적화 문법)

```sql
---------- # IN() : 있는 경우 (or 조건)
SELECT
       CUSTOMER_ID
     , RENTAL_ID
     , RETURN_DATE
  FROM RENTAL
 WHERE
       CUSTOMER_ID IN (1, 2)                   -- customerid가 1 또는 2 
ORDER BY RETURN_DATE DESC
;
---------- # IN 대신 OR 사용, 동일함.
SELECT
       CUSTOMER_ID
     , RENTAL_ID
     , RETURN_DATE
  FROM RENTAL
 WHERE
       CUSTOMER_ID = 1                         -- customerid가 1 또는 2
    OR CUSTOMER_ID = 2
ORDER BY RETURN_DATE DESC
;
---------- # NOT IN() : 아닌 경우
SELECT
       CUSTOMER_ID
     , RENTAL_ID
     , RETURN_DATE
  FROM RENTAL
 WHERE
       CUSTOMER_ID NOT IN (1, 2)               -- 1 또는 2가 아닌 것
ORDER BY RETURN_DATE DESC
;
---------- # NOT IN + AND (<>와 같음)
SELECT
      CUSTOMER_ID
     , RENTAL_ID
     , RETURN_DATE
  FROM RENTAL
 WHERE
       CUSTOMER_ID <> 1 
   AND CUSTOMER_ID <> 2
ORDER BY RETURN_DATE DESC
;
---------- # cast 데이터 형식 변환: cast (변환하고자 하는 데이터 AS 데이터 형식)
SELECT
             CUSTOMER_ID
FROM
             RENTAL
WHERE
    CAST (RETURN_DATE AS DATE) = '2005-05-27'  -- returndate를 date 타입 변환 후 '2005-05-27'의 customer_id 불러오기
;
```
<br>
<br>

## Like - 비슷한 패턴 출력
- 특정 값과 유사한 패턴을 갖는 집합 출력
- ``%``는 어떤 문자든 가능
- ``_-_``는 한 개의 임의의 문자

```sql
---------- # LIKE 특정 패턴과 유사한 집합 출력
SELECT
      FIRST_NAME
    , LAST_NAME
 FROM
      CUSTOMER
WHERE
      FIRST_NAME LIKE 'Jen%'                   -- firstname이 jen으로 시작하는
;
---------- # '%'는 어떤 문자든 가능
SELECT
	     'FOO' LIKE 'FOO'         -- true
	   , 'FOO' LIKE 'F%'          -- true
         , 'FOO' LIKE '_O_'         -- true
	   , 'BAR' LIKE 'B_'          -- false
;
---------- # '-'는 한 개의 임의의 문자
SELECT
      FIRST_NAME
    , LAST_NAME
 FROM
      CUSTOMER
WHERE
      FIRST_NAME LIKE '%er%'                    -- 어떤 문자든지 중간에 er 들어감
;
---------- # '-' + '%'
SELECT
      FIRST_NAME
    , LAST_NAME
 FROM
      CUSTOMER
WHERE
    FIRST_NAME LIKE '_her%'                     -- 첫 임의의 글자로 시작, 중간에 er 들어감
;
---------- # NOT LIKE : 아닌 경우
SELECT
      FIRST_NAME
    , LAST_NAME
FROM
      CUSTOMER
WHERE
    FIRST_NAME NOT LIKE 'Jen%'                  -- jen으로 시작하지 않는 것
;
```
<br>
<br>

## Isnull - 널값확인
- 특정 값이 Null 값인지 아닌지 판단
- Null 값에서 연산자 ``=`` 사용안됨. ISNULL만 가능

```sql
---------- # Null 값에서 연산자 '=' 사용안됨
SELECT
       ID
     , FIRST_NAME
     , LAST_NAME
     , EMAIL
     , PHONE
  FROM
       CONTACTS
 WHERE PHONE = NULL
;
---------- # IS NULL
 SELECT
       ID
     , FIRST_NAME
     , LAST_NAME
     , EMAIL
     , PHONE
  FROM
       CONTACTS
WHERE PHONE IS NULL
;
---------- # IS NOT NULL: 널 값이 아니면 출력
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
<br>
<br>

## 연습문제
- 이메일 형식에 맞지 않는 이메일 주소 제외

```sql
SELECT EMAIL
FROM CUSTOMER
WHERE EMAIL NOT LIKE '@%'
  AND EMAIL NOT LIKE '%@'
  AND EMAIL LIKE '%r%'
;
```
<br>
<br>
<i> ※ credit: Fast Campus, 모두를 위한 SQL/DB 올인원 패키지 Online </i>