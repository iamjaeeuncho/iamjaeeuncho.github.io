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
```sql
CREATE TABLE SALES2007_1
(
  NAME VARCHAR(50)
, AMOUNT NUMERIC(15,2)
);

INSERT INTO SALES2007_1 
VALUES 
  ('Mike', 150000.25)
, ('Jon', 132000.75)
, ('Mary', 100000)
;

COMMIT; 

SELECT * FROM SALES2007_1;

CREATE TABLE SALES2007_2
(
  NAME VARCHAR(50)
, AMOUNT NUMERIC(15,2)
);

INSERT INTO SALES2007_2 
VALUES 
  ('Mike', 120000.25)
, ('Jon', 142000.75)
, ('Mary', 100000)
;

COMMIT; 


SELECT * FROM SALES2007_2; 













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




























SELECT
       NAME
  FROM
      SALES2007_1
UNION 
SELECT
       NAME
  FROM
     SALES2007_2
;


















SELECT
      AMOUNT
  FROM
      SALES2007_1
UNION 
SELECT
      AMOUNT
  FROM
      SALES2007_2
;










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


```
<br>
<br>

## UnionAll
```sql
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















SELECT
       NAME
  FROM
      SALES2007_1
UNION ALL 
SELECT
       NAME
  FROM
     SALES2007_2
;
















SELECT
      AMOUNT
  FROM
      SALES2007_1
UNION ALL
SELECT
      AMOUNT
  FROM
      SALES2007_2
;




















SELECT
       *
  FROM
       SALES2007_1
UNION ALL
SELECT
       *
  FROM
       SALES2007_2
ORDER BY AMOUNT DESC;


SELECT
       *
  FROM
       SALES2007_1
UNION ALL
SELECT
       *
  FROM
       SALES2007_2
ORDER BY AMOUNT DESC;


```
<br>
<br>

## Intersect
```sql
DROP TABLE EMPLOYEES; 

CREATE TABLE EMPLOYEES 
(
  EMPLOYEE_ID SERIAL PRIMARY KEY
, EMPLOYEE_NAME VARCHAR (255) NOT NULL
);
 
CREATE TABLE KEYS 
(
 EMPLOYEE_ID INT PRIMARY KEY,
 EFFECTIVE_DATE DATE NOT NULL,
 FOREIGN KEY (EMPLOYEE_ID) 
 REFERENCES EMPLOYEES (EMPLOYEE_ID)
);
 
CREATE TABLE HIPOS 
(
 EMPLOYEE_ID INT PRIMARY KEY,
 EFFECTIVE_DATE DATE NOT NULL,
 FOREIGN KEY (EMPLOYEE_ID) 
 REFERENCES EMPLOYEES (EMPLOYEE_ID)
);

INSERT INTO EMPLOYEES (EMPLOYEE_NAME)
VALUES
 ('Joyce Edwards'),
 ('Diane Collins'),
 ('Alice Stewart'),
 ('Julie Sanchez'),
 ('Heather Morris'),
 ('Teresa Rogers'),
 ('Doris Reed'),
 ('Gloria Cook'),
 ('Evelyn Morgan'),
 ('Jean Bell');

COMMIT;

SELECT * FROM EMPLOYEES; 
 
INSERT INTO KEYS
VALUES
 (1, '2000-02-01'),
 (2, '2001-06-01'),
 (5, '2002-01-01'),
 (7, '2005-06-01');

COMMIT; 

SELECT * FROM KEYS; 
 
INSERT INTO HIPOS
VALUES
 (9, '2000-01-01'),
 (2, '2002-06-01'),
 (5, '2006-06-01'),
 (10, '2005-06-01');

COMMIT;

SELECT * FROM HIPOS; 











SELECT
       EMPLOYEE_ID
  FROM
       KEYS
INTERSECT 
SELECT
       EMPLOYEE_ID
  FROM
       HIPOS;

      
      
      
      
      
      
      
      
      
      
  SELECT
       A.EMPLOYEE_ID
   FROM
       KEYS A, HIPOS B 
  WHERE  A.EMPLOYEE_ID = B.EMPLOYEE_ID

  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  SELECT
      EMPLOYEE_ID
  FROM
      KEYS
INTERSECT 
SELECT
      EMPLOYEE_ID
  FROM
      HIPOS
ORDER BY EMPLOYEE_ID DESC;

















-- intersect 잘 안 씀. inner join이랑 똑같아서


SELECT
       A.EMPLOYEE_ID
  FROM
       KEYS A
     , HIPOS B 
 WHERE A.EMPLOYEE_ID = B.EMPLOYEE_ID
ORDER BY A.EMPLOYEE_ID DESC;

SELECT A.EMPLOYEE_ID
FROM KEYS A INNER JOIN HIPOS B 
ON (A.EMPLOYEE_ID = B.EMPLOYEE_ID)
ORDER BY A.EMPLOYEE_ID DESC;


```
<br>
<br>

## Except

```sql
SELECT
       DISTINCT INVENTORY.FILM_ID, FILM.TITLE
  FROM
       INVENTORY
INNER JOIN 
       FILM 
ON FILM.FILM_ID = INVENTORY.FILM_ID
ORDER BY FILM.TITLE;

SELECT
       DISTINCT A.FILM_ID, B.TITLE
  FROM
       INVENTORY A
INNER JOIN 
       FILM B
ON B.FILM_ID = A.FILM_ID
ORDER BY B.TITLE;

--필름과 인벤토리는 1:m관계 -> 두 테이블을 조인하면 -> 영화하나당 여러개의 재고가 나오는거죠 



















--전체영화에서 
SELECT
       FILM_ID
     , TITLE
  FROM
       FILM
EXCEPT 
--재고가 존재하는 영화를 뺀다 
SELECT
       DISTINCT INVENTORY.FILM_ID
     , TITLE
  FROM
       INVENTORY
INNER JOIN 
       FILM 
ON FILM.FILM_ID = INVENTORY.FILM_ID
ORDER BY TITLE;
--결과집합	은 재고가 존재하지 않는 영화다. 

SELECT * FROM INVENTORY 
WHERE FILM_ID = 108;


```
<br>
<br>