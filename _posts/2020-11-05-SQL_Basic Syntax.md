---
title: "[SQL] 기본 구문 - Select, "
date: 2020-1-5
categories:
  - study
tags:
  - sql
toc: true
toc_sticky: true
---

## Select
* 보통 누락된 값을 제외하고 연산

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

