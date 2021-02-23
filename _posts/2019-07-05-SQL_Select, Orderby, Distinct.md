---
title: "[SQL] 데이터 선택 및 정렬- Select, Orderby, Distinct"
date: 2019-7-5
categories:
  - study
tags:
  - sql
toc: true
toc_sticky: true
---

## Select: 선택

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

## Orderby: 정렬

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

## Distinct: 중복제거

```sql
---------- # 테이블 생성하자마자 바로 적용되므로 CREAT는 커밋할 필요 없음
CREATE TABLE T1 ( ID SERIAL NOT NULL PRIMARY KEY, BCOLOR VARCHAR, FCOLOR VARCHAR );

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
             T1
;
---------- # select + distinct + 컬럼 한 개
SELECT
    DISTINCT BCOLOR                -- BCOLOR 값 출력시 중복행 제거
FROM
    T1
ORDER BY BCOLOR                    -- BCOLOR로 정렬
;
---------- # select + distinct + 컬럼 두 개
SELECT
    DISTINCT BCOLOR, FCOLOR
FROM
    T1
ORDER BY BCOLOR, FCOLOR            -- BCOLOR 먼저 정렬, FCOLOR 나중 정렬
;
---------- # select + distinct + 컬럼 두 개 + on
SELECT
      DISTINCT ON (BCOLOR) BCOLOR  -- BCOLOR 컬럼 값 기준 중복 제거함
   ,  FCOLOR                       -- FCOLOR 컬럼 값은 단 한 개 값 만을 보여줌
FROM
    T1
ORDER BY BCOLOR, FCOLOR
;
---------- # select + distinct + 컬럼 두 개 + on + DESC 정렬
SELECT
      DISTINCT ON (BCOLOR) BCOLOR
   ,  FCOLOR
FROM
    T1
ORDER BY
    BCOLOR, FCOLOR DESC             -- Null값이 가장 큰 값
;
```
<br>

※ Credit: Fast Campus, 모두를 위한 SQL/DB 올인원 패키지