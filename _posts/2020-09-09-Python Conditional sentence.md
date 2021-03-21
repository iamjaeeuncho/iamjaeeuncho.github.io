---
title: "[Python] 파이썬 조건문 - if, elif, else"
date: 2020-9-9
categories:
- study
tags:
- python
toc: true
toc_ads: true
toc_sticky: true
---

## 조건문 ?
- if, elif, else가 있으며, 특정 조건을 만족하는 경우에만 작업을 수행
<br>
<br>

### 들여쓰기로 수행문 표현
- 조건문의 경우 if, elif, else 블록에 종속된 코드는 들여쓰기로 표현 가능
- 들여쓰기 된 코드를 블록(block), 또는 코드블록이라고 함
- python에서 모든 블록의 시작줄의 마지막에는 :(콜론, colon) 추가 필요

```python
# 파이썬에서는 들여쓰기가 중요
# if 문구가 참(True)인 경우 아래 종속 코드 실행됨
if 6 >= 5:
    print('6 is greater than 5')
    print('Yeah, it is true')
    print('it is really true')

# if 문구가 거짓(False)인 경우 아래 종속 코드 실행됨
print ('This code is not belongs to if statements')
```
<br>
<br>

### Bool형 조건식 - AND/OR/NOT
- 조건문에 사용되는 조건의 경우 boolean이기 때문에, 논리식 AND, OR, NOT 사용가능
- 우선순위: NOT > AND > OR
* 논리표 
  - AND : 두개 다 참이여야 True
      - T AND T : True
      - T AND F : False
      - F AND T : False
      - F AND F : False
  - OR : 두개 중 하나라도 참이면 True
      - T OR T : True
      - T OR F : True
      - F OR T : True
      - F OR F : False
  - NOT : 반전
      - NOT T : False
      - NOT F : True
<br>
<br>

### 조건이 bool이 아닌 경우
* 일반적으로는 조건의 경우 주로 bool이지만, 정수, 실수, 문자열 리스트 등 기본 타입도 조건에 사용 가능
* False로 간주되는 아래 값 이외에는 모두 True로 간주
　즉, 각 타입의 기본값은 무조건 False로 수행하지 않음
    * None
    * 0 -> 정수형
    * 0.0 -> 실수형
    * '' -> 빈 문자열
    * [] -> 빈 리스트
    * () -> 빈 튜플
    * {} -> 빈 딕셔너리
    * set() -> 빈 집합

```python
# if는 트루인 경우에만 수행이됨
if 3.5:
    print('333')
------------------------------
# 숫자나 빈값같이 기본값은 False로 간주되어도 수행 안됨
a = 0
if a:
    print('print')
```
<br>
<br>

### if, else
- if조건이 True인 경우 if 블락의 코드가 수행, 거짓인 경우 else 블락의 코드가 수행
- 주의 할 점 : if와 else사이에 다른 코드 삽입 불가

```python
a = 10
if a % 2 == 0:
    print(a/2)       
print(a + 1)             # if와 무관하게 무조건 수행
```

```python
# 짝수인 경우에는 2로 나눈 값을 출력
# 홀수인 경우에는 1을 더한 값을 출력

a = 10
if a % 2 == 0:           # 만약 짝수이면 (a를 2로 나눠서 나머지가 0이면)
    print(a/2)           # True인 경우 여기 수행
# print("haha")           # if와 else 사이에는 다른 코드 못 들어옴
else:
    print(a + 1)         # False인 경우 여기 수행
```
<br>
<br>

### if, elif, else
- 조건이 여러개인 경우, 각 조건을 elif 블록에 명시 가능
- 이 경우 True인 조건의 코드 한 블락만 실행 한 후 구문을 종료
- 조건문을 사용할 때는, if 이후, 0개 이상의 elif, 0개 또는 1개의 else를 사용 가능

```python
a = 16
if a % 4 == 0:                    # 참이 아니면 밑으로 내려감 
    print('a is divisible by 4')
elif a % 4 == 1:
    print('a % 4 is 1')
elif a % 4 == 2:
    print('a % 4 is 2')
else:
    print('a % 4 is 3')
```
<br>
<br>

### 중첩 조건문
- 조건문의 경우 중첩하여 작성 가능
- 중첩의 의미는 depth(깊이)로 생각할 수 있으며, depth의 제한은 없음

```python
a = 10
b = 9
c = 8

if a == 10:              # True면 밑으로 이동
    if c == 8:
        if b == 8:
            print('a is 10 and b is 8')
        else:
            print('a is 10 and b is not 8')
```
<br>
<br>
<i> ※ credit: Fast Campus, 머신러닝과 데이터분석 A-Z 올인원 패키지 </i>