---
title: "[SQL] 데이터 수행/선택/정렬 - Commit/Rollback, Select, Orderby, Distinct"
date: 2021-2-5
categories:
  - study
tags:
  - sql
toc: true
toc_ads: true
toc_sticky: true
---

## Begin/Commit/Rollback
- DML(Data Manipulation Language) 작업을 하고 DBMS에 반영할건지 아닌지를 결정하는 명령어들

```sql
---------- # BEGIN 시작 - 생략 가능
BEGIN;                               

INSERT INTO TB_ACCOUNT_TRANSACTION_TEST (NAME,BALANCE)
VALUES('Alice',10000);

---------- # COMMIT - 수행
COMMIT; 

---------- # ROLLBACK - 취소
ROLLBACK;
```
<br>
<br>

## Select
- 테이블에 저장된 데이터를 가져오는데 쓰는 구문

```sql
---------- # 전체 선택 '*'
SELECT 
       *
  FROM 
       CUSTOMER
;
---------- # 특정 칼럼만 선택
SELECT 
       FIRST_NAME 
     , LAST_NAME
     , EMAIL
  FROM 
       CUSTOMER 
;
---------- # 특정 칼럼만 선택 + Alias(가명)
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

## Orderby
- Select문에서 가져온 데이터를 정렬하는데 사용

```sql
---------- # ASC 오름차순
SELECT 
       FIRST_NAME
     , LAST_NAME
  FROM 
       CUSTOMER
 ORDER BY FIRST_NAME ASC
;
---------- # DESC 내림차순
SELECT 
       FIRST_NAME
     , LAST_NAME
  FROM 
       CUSTOMER
 ORDER BY FIRST_NAME DESC
;
---------- # ASC + DESC 같이 쓰기
SELECT 
       FIRST_NAME          --asc: 오름차순, 순차
     , LAST_NAME           --desc: 내림차순, 역순
  FROM 
       CUSTOMER
 ORDER BY FIRST_NAME ASC 
       ,  LAST_NAME DESC
;
---------- # 1,2로 대체 가능 BUT 가독성 안 좋으므로 비추
SELECT 
       FIRST_NAME          --asc: 오름차순, 순차
     , LAST_NAME           --desc: 내림차순, 역순
  FROM 
       CUSTOMER
 ORDER BY 1 ASC
       ,  2 DESC
;
```
<br>
<br>

## Distinct
- 같은 결과의 중복된 값을 제거할 수 있음

```sql
---------- # Select + Distinct + 컬럼 한 개
SELECT
    DISTINCT BCOLOR                -- BCOLOR 값 기준 중복행 제거
FROM
    T1
ORDER BY BCOLOR                    -- BCOLOR로 정렬
;
---------- # Select + Distinct + 컬럼 두 개
SELECT
    DISTINCT BCOLOR, FCOLOR        -- BCOLOR+FCOLOR 중복행 제거
FROM
    T1
ORDER BY BCOLOR, FCOLOR            -- BCOLOR 먼저 정렬, FCOLOR 나중 정렬
;
---------- # Select + Distinct + 컬럼 두 개 + On
SELECT
      DISTINCT ON (BCOLOR) BCOLOR  -- BCOLOR 컬럼 값 기준 중복 제거
   ,  FCOLOR                       -- FCOLOR 컬럼 값은 단 한 개 값 만을 보여줌
FROM
    T1
ORDER BY BCOLOR, FCOLOR
;
---------- # Select + Distinct + 컬럼 두 개 + on + DESC 정렬
SELECT
      DISTINCT ON (BCOLOR) BCOLOR
   ,  FCOLOR
FROM
    T1
ORDER BY
    BCOLOR, FCOLOR DESC
;
```
<br>
<br>

## 연습문제
- Amout 액수가 가장 많은 CUSTOMER_ID 추출

```sql
SELECT DISTINCT
A.CUSTOMER_ID
FROM PAYMENT A
WHERE A.AMOUNT = (
      SELECT A.AMOUNT
      FROM PAYMENT A
      ORDER BY A.AMOUNT DESC
      LIMIT 1)
;
```
<br>
<br>
<i> ※ credit: Fast Campus, 모두를 위한 SQL/DB 올인원 패키지 Online </i>