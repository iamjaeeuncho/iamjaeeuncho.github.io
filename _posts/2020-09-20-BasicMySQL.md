---
layout: post
title:  ［SQL］주요 문법
slug:         BasicMySQL
categories:   [study]
tags:         [programming, sql]
noindex: true
---
---
title: "［Marketing］데이터 기반 AARRR 분석 기법 (Growth hacking)"
date: 2018-11-4
categories:
  - study
tags:
  - marketing
---
# SELECT

- SELECT * FROM 테이블명;
- SELECT 열이름, 열이름 FROM 테이블명;

옵션1) 숫자 제한(LIMIT)
SELECT * FROM 테이블명 LIMIT 숫자; - 상위 몇개만 보여줌

옵션2) 정렬(ORDER BY) : Descending(내림차순), Ascending(오름차순)
SELECT 열이름 FROM 테이블명 ORDER BY 열이름 DESC; 
SELECT 열이름 FROM 테이블명 ORDER BY 열이름 ASC;

옵션3) 중복 제거(DISTINCT)
SELECT DISTINCT 열이름 FROM 테이블명




# WHERE
- SELECT 열 이름 FROM 테이블명 WHERE 조건;

옵션1) 논리연산자(=, !=, >=, >, <=, <)
SELECT 열이름, 열이름 FROM 테이블 WHERE Price >= 16;

옵션2) 목록 포함 또는 안포함 (IN, NOT IN)
SELECT 열이름, 열이름 FROM 테이블 WHERE SupplierID IN ('1', '2'); 
SELECT 열이름, 열이름 FROM 테이블 WHERE SupplierID NOT IN ('1', '2');

옵션3) 문자열 포함(LIKE)
SELECT 열이름, 열이름 FROM 테이블 WHERE Unit LIKE '%boxes%';

옵션4) AND, OR
SELECT 열이름, 열이름 FROM 테이블 WHERE Unit LIKE '%boxes%' AND Price >= 15;



# GROUP BY
- SELECT 열 이름, 통계함수 FROM 테이블명 GROUP BY 열 이름;

옵션1) HAVING (조건)
SELECT Country, COUNT(CustomerID)
FROM Customers
GROUP BY Country
HAVING COUNT(CustomerID) >= 10;


# JOIN
<br>
<center>
  <img src="https://github.com/iamjaeeuncho/iamjaeeuncho.github.io/blob/master/programming/_posts/images/sql_type_of_join.png?raw=true" width="550px"><br>
</center>
<br>

* Inner Join (교집합)
- SELECT 열 이름 FROM 테이블명A INNER JOIN 테이블명B ON B.Key = A.Key;
  테이블 A와 B의 키값이 같은 정보로 합치기
```
SELECT C.CustomerID, OrderID
FROM Customers AS C
INNER JOIN Orders AS O
ON O.CustomerID = C.CustomerID;
```

# IFNULL : 속성값이 Null일 때 값 바꾸기
IFNULL('필드명', '대체할 값')



# 서브쿼리들 예시
```
SELECT
   C.CustomerID,
   IFNULL(O1.CNT, 0) AS CNT1,
   IFNULL(O2.CNT, 0) AS CNT2,
   IFNULL(O3.CNT, 0) AS CNT3,

FROM Customers AS C

LEFT JOIN(
  SELECT
     CustomerID,
     COUNT(OrderID) AS CNT
  FROM Orders
  WHERE ShipperID = '1'
  GROUP BY CustomerID
  ) AS O1
ON O1.CustomerID = C.CustomerID

LEFT JOIN(
  SELECT
     CustomerID,
     COUNT(OrderID) AS CNT
  FROM Orders
  WHERE ShipperID = '2'
  GROUP BY CustomerID
  ) AS O2
ON O2.CustomerID = C.CustomerID

LEFT JOIN(
  SELECT
     CustomerID,
     COUNT(OrderID) AS CNT
  FROM Orders
  WHERE ShipperID = '3'
  GROUP BY CustomerID
  ) AS O3
ON O3.CustomerID = C.CustomerID
```

```
SELECT
  C.CustomerID,
  COUNT(O1,OrderId) AS CNT1,
  COUNT(O2,OrderId) AS CNT2,
  COUNT(O3,OrderId) AS CNT3

FROM Customers AS C

LEFT JOIN Orders AS O1
ON O1.CustomerID = 
C.CustomerID
  AND O1.ShipperID = '1'
  
LEFT JOIN Orders AS O1
ON O1.CustomerID = 
C.CustomerID
  AND O1.ShipperID = '1'
  
LEFT JOIN Orders AS O1
ON O1.CustomerID = 
C.CustomerID
  AND O1.ShipperID = '1'
  
GROUP BY C.CustomerID
```

# 순서
SELECT
FROM
JOIN
WHERE
GROUP BY
ORDER BY
LIMIT


credit: https://www.inflearn.com/course/sql-select
