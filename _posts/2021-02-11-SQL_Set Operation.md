---
title: "[SQL] 집합 연산자 - Union, UnionAll, Intersect, Except"
date: 2021-2-11
categories:
  - study
tags:
  - sql
toc: true
toc_ads: true
toc_sticky: true
---

## Union
- 두 개 이상의 Select문의 결과를 결합.
- 결합시 중복된 데이터는 제거됨

```sql
---------- # Union
SELECT
       *
  FROM
      SALES2007_1
UNION 
SELECT
       *
  FROM
     SALES2007_2
;
---------- # Union + Order By
SELECT
       *
  FROM 
      SALES2007_1
UNION 
SELECT
       *
  FROM 
      SALES2007_2
ORDER BY AMOUNT DESC
;
```
<br>
<br>

## Union All 
- 두 개 이상의 Select문의 결과를 결합.
- 결합시 중복된 데이터도 모두 출력.

```sql
---------- # Union All + Order By
SELECT
       *
  FROM
      SALES2007_1
UNION ALL 
SELECT
       *
  FROM
     SALES2007_2
;
---------- # Union All + Order By
SELECT
       *
  FROM
       SALES2007_1
UNION ALL
SELECT
       *
  FROM
       SALES2007_2
ORDER BY AMOUNT DESC
;
```
<br>
<br>

## Intersect
- 두 개 이상의 Select문의 결과 집합을 하나로 결합
- 최종 결과는 A와 B의 교집합을 리턴 → 이너 조인과 결과가 동일
- inner join이랑 똑같아서 intersect 잘 안 씀.

```sql
---------- # Intersect
SELECT
       EMPLOYEE_ID
  FROM
       KEYS
INTERSECT 
SELECT
       EMPLOYEE_ID
  FROM
       HIPOS
;
---------- # 이너 조인과 연산 결과 동일
SELECT
     A.EMPLOYEE_ID
 FROM
     KEYS A, HIPOS B 
WHERE  A.EMPLOYEE_ID = B.EMPLOYEE_ID
;
---------- # Intersect + Order By
SELECT
     EMPLOYEE_ID
  FROM
      KEYS
INTERSECT 
SELECT
      EMPLOYEE_ID
  FROM
      HIPOS
ORDER BY EMPLOYEE_ID DESC
;
```
<br>
<br>

## Except
- 큰 Select 문 안에 있는 Select문의 결과를 제외하고 리턴

```sql
---------- # 재고가 존재하지 않는 영화 구하기 
SELECT                              -- 전체영화에서 
       FILM_ID
     , TITLE
  FROM
       FILM
EXCEPT 
SELECT                              -- 재고가 존재하는 영화를 뺀다 
       DISTINCT INVENTORY.FILM_ID
     , TITLE
  FROM
       INVENTORY
INNER JOIN 
       FILM 
ON FILM.FILM_ID = INVENTORY.FILM_ID
ORDER BY TITLE
;
```
<br>
<br>