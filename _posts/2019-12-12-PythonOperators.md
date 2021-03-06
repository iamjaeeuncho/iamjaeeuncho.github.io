---
title: "[Python] 파이썬 기본 연산자(산술,비교,할당,논리) 및 우선순위"
date: 2019-12-12
categories:
  - study
tags:
  - python
toc: true
toc_ads: true
toc_sticky: true
---

## 산술 연산자 (Arithmetic Operators)
```python
>>> a = 10
>>> b = 20
>>> c = 3
>>> a + b = 30        # + 더하기 
>>> a - b = -10       # - 빼기 
>>> a * b = 200       # * 곱하기 
>>> b / a = 2.0       # / 나누기 
>>> b % a = 0         # % 나머지
>>> a ** c = 1000     # ** 제곱 
>>> a // c = 3        # // 몫
```
<br>
<br>

## 비교 연산자 (Comparison Operators)
```python
>>> a = 10
>> b = 20
>>> a == b           # == 값이 동일하다
false
>>> a != b           # != 값이 동일하지 않다
true
>>> a > b            # > 왼쪽 값이 오른쪽 값보다 크다
false
>>> a < b            # < 왼쪽 값이 오른쪽 값보다 작다
true
>>> a >= b           # >= 왼쪽 값이 오른쪽 값보다 크거나 동일하다
false
>>> a <= b           # <= 왼쪽 값이 오른쪽 값보다 작거나 동일하다
true
```
<br>
<br>

## 할당 연산자 (Assignment Operators)
```python
>>> a = 10
>>> b = 20
>>> c = a + b          # = 왼쪽 변수에 오른쪽 값을 할당한다 
30                     # c = a + b → c = a + b
>>> c += a             # += 왼쪽 변수에 오른쪽 값을 더하고 결과를 왼쪽변수에 할당 
40                     # c += a → c = c + a
>>> c -= a             # -= 왼쪽 변수에서 오른쪽 값을 빼고 결과를 왼쪽변수에 할당
30                     # c -= a → c = c - a
>>> c *= a             # *= 왼쪽 변수에 오른쪽 값을 곱하고 결과를 왼쪽변수에 할당
300                    # c *= a → c = c * a
>>> c /= a             # /= 왼쪽 변수에서 오른쪽 값을 나누고 결과를 왼쪽변수에 할당
30.0                   # c /= a → c = c / a                    
>>> c %= a             # %= 왼쪽 변수에서 오른쪽 값을 나눈 나머지의 결과를 왼쪽변수에 할당
0.0                    # c %= a → c = c % a                     
>>> c **= a            # **= 왼쪽 변수에 오른쪽 값만큼 제곱을 하고 결과를 왼쪽변수에 할당
0.0                    # c **= a → c = c ** a
>>> c //= a            # //= 왼쪽 변수에서 오른쪽 값을 나눈 몫의 결과를 왼쪽변수에 할당
0.0                    # c //= a → c = c // a
```
<br>
<br>

## 비트 연산자(Bitwise Operators)
```python
>>> a = 60
>>> b = 13
>>> a & b                    # &, AND 연산. 둘다 참일때만 만족
12
>>> a | b                    # |, OR 연산. 둘 중 하나만 참이여도 만족
61
>>> a ^ b                    # ^, XOR 연산. 둘 중 하나만 참일 때 만족
49
>>> ~a                       # ~ 보수 연산.
-60
>>> a << 2                   # << 왼쪽 시프트 연산자. 
240                          # 변수의 값을 왼쪽으로 지정된 비트 수 만큼 이동
>>> a >> 2                   # >> 오른쪽 시프트 연산자.
15                           # 변수의 값을 오른쪽으로 지정된 비트 수 만큼 이동
```
<br>
<br>

## 논리 연산자(Logical Operators)
```python
>>> a = True
>>> b = False                 # a = True, b = False 이라 가정
>>> a and b                   # and 논리 AND 연산. 둘다 참일때만 참
False
>>> a or b                    # or 논리 OR 연산. 둘 중 하나만 참이여도 참
True
>>> not(a and b)              # not 논리 NOT 연산. 논리 상태를 반전
True
```
<br>
<br>

## 맴버 연산자(Membership Operators)
```python
>>> a = 10                        # a = 10, b = 10, list = [1, 2, 3, 4, 5] 라 가정
>>> b = 10
>>> list = [1, 2, 3, 4, 5]
>>> a in list                     # in list 내에 포함되어 있으면 참
False
>>> b not in list                 # not in list 내에 포함되어 있지 않으면 참
True
```
<br>
<br>

## 식별 연산자(Identity Operators): 두 개체의 메모리 위치를 비교
```python
>>> a = 20                        # a = 20, b = 20 이라 가정
>>> b = 20 
>>> a is b                        # is 개체메모리 위치나 값이 같다면 참
True
>>> a is not b                    # is not 개체메모리 위치나 값이 같지 않다면 참
False
```
<br>
<br>

## 연산자 우선순위(Operators Precedence)
- 가장 높은 우선 순위에서 가장 낮은 모든 연산자를 보여 준다.
  - ** 지수 (전원으로 인상)
  - ~ + - Ccomplement, 단항 플러스와 마이너스 (마지막 두의 메서드 이름은 + @이며, - @)
  - * / % // 곱하기, 나누기, 나머지, 몫
  - + - 덧셈과 뺄셈
  - >> << 좌우 비트 시프트
  - & 비트 'AND'
  - ^ | 비트 전용 'OR'와 정기적 인 'OR'
  - <= < > >= 비교 연산자
  - <> == != 평등 연산자
  - = %= /= //= -= += *= **= 할당 연산자
  - is is not 식별 연산자
  - in not in 맴버 연산자
  - not or and 논리 연산자
<br>
<br>
<i> ※ credit: 점프 투 파이썬 https://wikidocs.net/book/1 </i>