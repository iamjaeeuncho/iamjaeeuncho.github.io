---
title: "[Python] 파이썬 함수 - def"
date: 2020-9-12
categories:
- study
tags:
- python
toc: true
toc_sticky: true
---

## 함수?
- 함수란 우리가 알고있는 개념처럼 주어진 입력(input)에 대해서 의도된 출력(output)를 전달하는 역할을 합니다.
- range, sum, len 처럼 python 내부에 이미 구현 된 함수들을 내장함수(built-in function)라고 합니다.

```python
# 내장 함수의 예
a = [1, 2, 3, 4]
length = len(a)
print(length)

summation = sum(a)
print(summation)
```


## 함수 정의
- 함수 최초 정의시 def(definition)를 사용하고, 'def 함수이름(변수)'식으로 작성함
    - 어떤 기능을 하는 함수인지 이름으로 최대한 나타날 수 있게 네이밍 해야함
    - 변수(argument)는 함수에 입력으로 전달하는 값을 의미하며, argument 또는 parameter라고 함 
    - 함수 역시 코드 블록이기 때문에 콜론(:) 필요
- 함수 구현 부분(body)은 들여쓰기 된 부분을 함수의 코드블록으로 인지 함
- 함수가 해당 기능을 수행하고 완료된 값(output)을 전달하기 위해 return 키워드 사용
- 즉, return 이후에 오는 값을 함수를 호출한 코드(caller)로  전달

```python
def add(x, y):              # def 함수이름(변수)
    n = x + y               # 바디 함수 구현
    return n                # return 출력값 지정
```



## 함수 호출
- 'def 함수이름(변수1, 변수2, ..., 변수n)'와 같이 함수의 이름과 전달되는 parameter(인자)를 괄호안에 전달하여 함수를 호출
- 함수가 호출되면 실행의 흐름이 호출자(caller)에서 함수(callee)로 변경 됨

```python
# 원래 add함수는 2개의 변수(argument)를 요구하는데 안 맞으면 오류
c = add()
```


## 함수 네이밍
- 함수 의미와 반대되거나 맞지 않는 이름은 사용금지하며, 함수 기능을 이름에 명시 

```python
def substract(x, y):
    sub = x - y
    return sub

print(substract(4, 3))
```


## 인자 (Parameter)
- 함수에 전달되는 입력(input)으로 인자, 변수, parameter, argument라고 부름
- 입력이 필요하지 않을 수도, 1개의 입력만 있을 수도, 여러개의 입력이 존재할 수 도 있음
- 파라미터로 int, string, float, boolm, list, dict 등등 어떤 파이썬 객체도 전달 가능하며, 함수도 함수의 파라미터로 전달 가능
- python의 경우 타입 명시가 없기 때문에, 함수 생성 시 의도된 파라미터 타입에 맞는 입력 전달이 중요
- 또한 파라미터를 전달 할 때, 정의된 순서에 따라 값을 전달하는 것이 중요

```python
# 파라미터가 없어도 가능
def test():
    print('haha')
    print('good')
    return 100

a = test()
print(a)
------------------------------
# 파라미터가 2개
def test(x, y):
    print(x, y)
    n = x + y
    return n

a = test(10, 20)
print(a)
------------------------------
# 파라미터 타입은 정할 수 없음
def substract(x, y):
    sub = x - y
    return sub

a = substract('you', 'me')
print(a)
```

## 기본 인자 (Default parameter)
- 함수의 파라미터에 기본값 지정 가능
- 파라미터를 명시하지 않을 경우, 지정된 기본값으로 대체

```python
# 만약에 x, y값만 입력되면 z를 기본 파라미터값으로 입력하고
# z가 입력되면 입력값으로 

def add(x, y, z=5):
    a = x + y + z
    return a

print(add(10, 20))
print(add(10, 20, 30))
```


### 기본 인자의 다른 예
- print 함수는 sep, end, file등 여러 기본 파라미터를 가짐 

```python
# shift + tab 눌러서 함수 조건 확인

print(1, 2, 3, sep='!', end='%%')
print(2, 3, 4, sep='p')
```



#### 기본 인자 사용 시 주의점
- 기본 인자 뒤에 일반 인자가 위치할 수 없음. 즉, 기본 파라미터는 끝부터만 가능

```python
# 올바른 예
> def test(a, b, c = 1)
> def test(a, b = 1, c = 2)
> def test(a = 1, b = 1, c = 3)

# 올바르지 않은 예
> def test(a, b = 1, c)
> def test(a = 1, b, c)
> def test(a = 1, b = 1, c)
```



## 키워드 인자 (keyword parameter)
- 파이썬의 경우, 파라미터에 값을 전달 할 때 파라미터의 이름을 명시하여 전달 가능
- 파라미터 이름을 사용하지 않을 경우, 기본적으로 순서에 맞게 전달

```python
# 파라미터의 이름을 명시하여 전달 가능
def test(x, y, z):
    a = x + y + z
    return a

test(x=10, z=20, y=3)           # but 되도록이면 맞춰서 쓰기
```


- \**가 붙은 경우에는 키워드 파라미터로 인식
- 즉 함수 호출 시, 파리미터의 이름과 값을 함께 전달 가능

```python
def test2(**x):
    print(type(x))

test2(a=1, b=2, c=3, d=4, name='Bob')
```
```python
# items함수 - Key, Value 쌍 얻기
def test2(**kwargs):
    for key, value in kwargs.items():
        print('key:', key, ', value:', value)

print(test2(a=1))
print(test2(a=1, b=2, c=3, d=4, name='Bob', age=90))
```



## 함수 종료 (return)
- 기본적으로 함수의 종료를 명시하며, 함수는 return을 만나면 종료됨
- return 옆에 값이나 수식이 있다면, 해당 값을 호출자(caller)에게 전달
- return만 존재하면 None 반환
- return이 없는 경우, 기본적으로 함수 코드 블록이 종료되면 종료로 간주하며 이때도 None 반환

```python
def weird_multiply(x, y):
    if x > 10:
        return                    # 그냥 return 뒤에 값이 없으면 None을 반환
    
    print(x + y)
    return (x + 2) * y
    print(x + y)                  # 함수 이미 끝났으므로 return 뒤 문장 출력 X

c = weird_multiply(12, 5)
print(c)                   
```


## 복수 값 반환 (multiple return)
- tuple을 반환하여 복수개의 값 리턴 가능

```python
def add_mul(x, y):
    s = x + y
    m = x * y
    return s, m

c = add_mul(20, 3)
print(type(c))
print(c)
```


## 변수 범위 (variable scope)
- 변수가 참조 가능한 코드상의 범위를 명시
- 함수내의 변수는 자신이 속한 코드 블록이 종료되면 소멸되며, 이렇게 특정 코드 블록에서 선언된 변수를 **지역변수(local variable)** 이라고 함
- 반대로 가장 상단에서 정의되어 프로그램 종료 전까지 유지되는 변수를 **전역변수(global variable)**이라고 함
- 같은 이름의 지역변수와 전역변수가 존재할 경우, 지역변수 > 전역변수순으로 우선순위가 더 높음

```python
# num1, num2는 함수와 관계없는 전역변수들
num1 = 10
num2 = 30

# num1, num2는 함수 내에서만 소용 있는 지역변수들
def test(num1, num2):
    print(num1, num2)
    return num1 + num2

test(30, 40)

print(num1, num2)
```


## 가변길이 인자 (variable length argument)
- 전달되는 파라미터의 개수가 고정적이지 않은 경우 사용 (ex. print, format 함수)
> **args**   : 파라미터를 튜플의 형태로 전달
> **kwargs** : 파리미터를 딕셔너리 형태로 전달 (네임드 파라미터)

```python
# 만약 변수가 3개일 때, 그것보다 더 많이 넣으면 실행 안 됨
def print(x, y, z)

print()
print(1)
print(1, 2)
print(1, 2, 3)
print(1, 2, 3, 4)
print(1, 2, 3, 4, 5)
```

```python
# *args(arguments)는 튜플로 인식
def test(*args):
    for item in args:
        print(item)
 
# 몇 개의 변수를 주더라도 함수는 변수를 동적으로 받아들임
test(10, 20, 30)
```


### 가변길이 함수 예시
#### 문자열 포맷 함수
- 여러가지 값과 포맷을 이용하여 문자열을 정의할 수 있는 함수
- {} placeholder를 문자열 내에 위치 시킨 후, 해당 위치에 format함수로 전달된 값으로 대체하여 문자열 생성
- 포맷 구성은 다음 링크 참조 : https://pyformat.info/

```python
a = '오늘 온도: {today_temp}도, 강수확률은: {today_prob}%, 내일온도: {tomorrow_temp}도'.format(today_temp=20, today_prob=50, tomorrow_temp=23)
print(a)
```
