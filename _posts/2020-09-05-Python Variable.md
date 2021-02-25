---
title: "[Python] 파이썬 변수 선언 및 값 할당"
date: 2020-9-5
categories:
  - study
tags:
  - python
toc: true
toc_sticky: true
---

## 변수(Variable)란?
- 데이터를 저장하는 공간. 저장공간(memory)에 값을 생성하고 이름(name)을 지정
<br>
<br>

## 변수 선언
### = 대입 연산자, == 비교 연산자 
- =(대입연산자)를 사용하여 왼쪽은 변수명, 오른쪽은 데이터가 위치
- 대입의 경우, 오른쪽의 수식이나 값을 계산 한 뒤, 왼쪽에 명시된 변수에 해당 값을 대입

```python
# int 정수형
a = 10

# float 실수형
b = 11.4
```
<br>
<br>

### 주석 달기
- 코드에서 #으로 시작하는 뒷 부분은 실행되지 않음
- python이 소스코드를 실행하면서 #를 만나면 무시
- 개발자(사람)가 보기 위한 용도로 사용

```python
# this line is very important
# so don't delete those lines

a = 10
b = 11.4
```
<br>
<br>

### 출력하기 - print 함수
- , 로 여러 변수를 나열하면 한줄에 출력
- 기본적으로는 한칸 띄어쓰기 후 출력
- cf. 함수란? 어떤 특정 기능을 미리 구현해 놓고 호출해서 사용
* print함수 설정
 - sep : 구분자, 각 출력할 변수 사이에서 구별하는 역할을 함
 - end : 마지막에 출력할 문자열

```python
print(a, b)
print(a, 10, 200, b)
------------------------------
print(a, b, 10, 100, sep='*', end='!!')
```
<br>
<br>

### 변수 값 확인법
- print() 함수 사용
- 변수 값을 코드의 마지막에 위치 시킨 후 실행, 이 경우 output으로 변수의 값이 출력

```python
print(a)
print(a, b)
a
------------------------------
# 항상 마지막 값이 전체 셀의 'Output'으로 출력됨
a = 10
b = 11.4
a
b
```
<br>
<br>

### 변수 이름 규칙
- 숫자로 시작하는 이름을 제외하고 영문 대소문자, _, 숫자로 구성가능

```python
# 대문자로 시작 가능
ABC123 = 200
# 소문자로 시작 가능
abcABC = 100
a123BC = 100
# _로 시작 가능
_abc123 = 200
#변수 이름은 항상 상세하게 적을 것 for sharing
number_of_students = 200
```

```python
# 숫자로는 시작 불가능
3abc = 100

# 4 = 9
# print(4)를 치면 9로 나와야 하는데, 실제로는 4. 헷갈려서 금지
```
<br>
<br>

### 예약어 (reserved keywords)
- python에서 미리 선점하여 사용중인 키워드로, 변수/함수/클래스 등 사용자 정의 이름으로 사용할 수 없음

```python
# 파이썬에서 이미 사용하는 것들은 사용 불가. 녹색에 볼드로 자동 처리됨.
for
while
try
if
elif
else
except
class = 100
print(class)
```

```python
# 정 사용하고 싶으면 앞에 Underline 추가
_class = 100
print(_class)
```
<br>
<br>

※ Credit: Fast Campus, 머신러닝과 데이터분석 A-Z 올인원 패키지 Online