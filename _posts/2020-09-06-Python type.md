---
title: "[Python] 파이썬 타입"
date: 2020-9-6
categories:
  - study
tags:
  - python
toc: true
toc_sticky: true
---

## 기본 데이터 타입 
  - 정수 (int) : 자연수
  - 실수 (float) : 정수를 포함하는 여러가지 숫자 (ex. 소수점)
  - 문자열 (str)
  - 불리언 (boolean)

#### type 함수
 - 해당 변수, 값의 타입(type)을 알고자 할 때 사용

```python
a = 10
b = 11.45

# type(a)
type(b)
```

#### **None**
 - 아무런 값을 갖지 않을 때 사용
 - 일반적으로 변수가 초기값을 갖지 않게 하여 해당 변수를 생성할 때 사용
 - 기타 언어의 NULL, nil등과 같은 의미로 사용

```python
# 파이썬은 항상 변수 값 설정해야 변수 사용 가능
# None은 변수는 생성하고 싶지만 아직 아무것도 모를 때 사용
# 빈 변수를 사용하고 싶을때
c = None
print(c)
```

#### **comparison operator(비교 연산자)** 
  - 프로그래밍에서는 비교를 할 경우, = 대신 **==**를 사용
  - <, > (작다, 크다)
  - <=, >= (작거나 같다, 크거나 같다)
  - == 같다
  - != 같지 않다
  - 비교 연산자의 결과는 bool 타입
    (cf. blool 자료형은 True와 False만 사용)

```python
a = 5
b = 4

print(a > b) # True
print(a < b) # False
print(a >= b) # True
print(a <= b) # False
print(a == b) # False
print(a != b) # True

c = a > b
c = True
print(type(c))
print(c)
```


#### **numbers (숫자형 타입)**
 - 정수, 실수로 구성
 - 수학의 기본 연산자(가감승제) 사용 가능

```python
a = 5
b = 4

print(a + b)
print(a * b) # 곱하기
print(a - b) 
print(a / b)
print(a % b) # 나머지
print(a ** b) # 지수승
```

#### **operator priorities (연산자 우선순위)**
  - 기본적인 수학의 연산자와 동일
  - 강제로 연산을 선수하기 위해선, 괄호()를 사용

```python
a = 5
b = 4

print(a + b * 4)
print((a + b) * 4) # 순서 강제로 바꾸려면 괄호 사용
```
