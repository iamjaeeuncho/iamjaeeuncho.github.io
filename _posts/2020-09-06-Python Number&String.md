---
title: "[Python] 파이썬 변수 타입 - 숫자형과 문자형"
date: 2020-9-6
categories:
  - study
tags:
  - python
toc: true
toc_sticky: true
---

## 숫자형 타입 (Number)
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
<br>
<br>

### 연산자 우선순위
- 기본적인 수학의 연산자 우선순위와 동일
- 강제로 연산을 선수하기 위해선, 괄호()를 사용

```python
a = 5
b = 4

print(a + b * 4)
print((a + b) * 4) # 순서 강제로 바꾸려면 괄호 사용
```
<br>
<br>

## 문자열 타입 (String)
- 복수개의 문자를 순서대로 나열 한 것
- 문자열은 '(작은따옴표) 혹은 "(큰따옴표) 사이에 문자를 넣어서 생성
- 문자열 자체에 ', "가 있는 경우에는 각각 그 반대의 기호로 생성


### '''  ''' 사용하여 표현 가능
- 차이점 
  - ' ', " " -> 한줄 문자열 표현
  - '''  ''' -> 어려줄에 걸쳐 문자열 표현 가능

```python
a = 'Hello World'
b = "Hello World"
c = '''Hello World'''
d = """Hello World"""
print(a, b, c, d)
------------------------------
a = '"Hello" World'
b = "Hello' World"
print(a)
print(b)
------------------------------
# 원래 문자열은 한줄에 표시하나, 3개짜리는 줄바꿈 허용 가능
c = '''Hello
World'''
d = """Hello
World"""
print(c)
print(d)
```
<br>
<br>

### 이스케이프 문자
* 문자열 내의 일부 문자의 의미를 달리하여 특정한 효과를 주는 것
  * `\n` : new line = enter를 의미함
  * `\t` : tab을 의미함 등

```python
print('Hello World\n\n')
print('Ha\thahaha')
```
<br>
<br>

### 문자열 indexing
- 문자열의 각 문자는 순서가 있음. 이때 각 문자열의 순서를 인덱스라고 함
- 첫번째 시작문자의 순서는 0으로 시작 (1이 아님)

```python
# 인덱스 = 각 문자열의 순서. 첫번째 시작 문자는 0부터. 빈칸도 숫자를 가짐
a = 'Hello World'
#    012345678910
print(a[0])
```
<br>
<br>

### 음수의 인덱스
- 다른 언어와는 달리, python의 경우 음수 인덱스를 지원
- -1이 가장 마지막 인덱스를, -2가 마지막에서 두번째 인덱스를 의미

```python
print(a[0])
print(a[10])
print(a[-1]) #뒤에서 첫번째. 뒤에서는 0부터 시작 안함
print(a[-11])
```
<br>
<br>

### 인덱스의 범위
- 인덱스는 [0, 문자열의 길이] 의 범위만 유효
- 음수 인덱스를 사용할 경우, [-문자열의 길이, -1]
- 범위를 넘어갈 경우 에러 발생

```python
# print(a[11])
# print(a[-12])
print(a[-11])
```
<br>
<br>

### 문자열 slicing
- 인덱스가 하나의 문자만을 추출한다면, slicing은 부분 문자열을 추출한다고 볼 수 있음
- [시작:끝]와 같이 명시하여 [시작, 끝]에 해당하는 부분 문자열을 추출
- 시작, 끝 인덱스가 생략이 되어 있다면, 0부터 혹은 끝까지로 간주

```python
# 문자열은 부분적으로 문자 추출할 때
a = 'Hello world'
print(a[0:4])      # 마지막은 포함하지 않음
print(a[1:7])
print(a[0:11])
print(a[:5])       # 앞에 생략하면 기본적으로 0이 들어감
print(a[3:])       # 뒤를 생략하면 마지막까지
print(a[:])        # 전체
```
<br>
<br>

### 문자열 함수

#### upper
- 전체를 대문자로 바꿈

```python
a = 'hello world'
a.upper()
```

#### lower
- 전체를 소문자로 바꿈

```python
a = 'HELLO WORLD'
a.lower()
```

#### replace
- 문자열 내에서 특정 문자를 지정 문자로 변경

```python
a = 'hello world'
a.replace('h', 'j')
```

#### format
- 특정값을 설정하여 자동으로 변경됨

```python
temperature = 25.5
prob = 80.0

a = '오늘 기온{}도 이고, 비 올 확률은 {}% 입니다.'.format(temperature, prob)
print(a)
```

#### split
- 문자열을 특정한 문자 구분하여 문자열의 리스트로 치환

```python
# 문자열을 구분. 공백이면 띄어쓰기로 나눠짐
a = 'hello world what a nice weather'
a.split() 

a = 'hello world what a nice weather'
a.split('w')
```
<br>
<br>
