---
title: "[Python] 파이썬 입출력 - 사용자 입력과 출력"
date: 2019-12-25
categories:
  - study
tags:
  - python
toc: true
toc_sticky: true
---

## 파이썬 입출력
* 사용자 입력 → 처리(프로그램, 함수 등) → 출력


## 1. 사용자 입력
사용자가 입력한 값을 어떤 변수에 대입하고 싶을 때,
* input의 사용: input은 입력되는 모든 것을 문자열로 취급
* 프롬프트를 띄워서 사용자 입력 받기: input()의 괄호 안에 질문을 입력하여 프롬프트를 띄워줌
```python
# 1. input의 사용
>>> a = input()
Life is too short, you need python
>>> a
'Life is too short, you need python'

# 2. 프롬프트를 띄워서 사용자 입력 받기
>>> number = input("숫자를 입력하세요: ")
숫자를 입력하세요:
>>> number = input("숫자를 입력하세요: ")     # 프롬프트에 3을 입력하면 변수 number에 3이 대입
숫자를 입력하세요: 3
>>> print(number)
3
```


## 2. print 역할 및 특징
* 입력한 자료형 출력
* 큰따옴표(")로 둘러싸인 문자열은 '+' 연산과 동일
* 콤마(,)를 이용하면 문자열 간 띄어쓰기
* 한 줄에 결과값을 계속 이어서 출력하려면, 입력 인수 end를 이용해 끝 문자를 지정해야 한다.
```python
# 1. 입력한 자료형 출력
>>> a = "Python"
>>> print(a)
Python

# 2. 큰따옴표(")로 둘러싸인 문자열은 + 연산과 동일
>>> print("life" "is" "too short") # ①          # 문자 1과 2는 완전히 동일한 결과값 출력
lifeistoo short
>>> print("life"+"is"+"too short") # ②
lifeistoo short

# 3. 문자열 띄어쓰기는 콤마로
>>> print("life", "is", "too short")
life is too short

# 4. 한 줄에 결과값 출력하기
>>> for i in range(10):
...     print(i, end=' ')
0 1 2 3 4 5 6 7 8 9

# 예시
>>> print("you" "need" "python")
youneedpython
>>> print("you"+"need"+"python")
youneedpython
>>> print("you", "need", "python")  # 콤마가 있는 경우 공백이 삽입되어 더해진다.
you need python
>>> print("".join(["you", "need", "python"]))
youneedpython
```


## 3. 예시
```python
# 두 수의 합? - 문자열
>>> input1 = input("첫번째 숫자를 입력하세요:")
>>> input2 = input("두번째 숫자를 입력하세요:")
>>> total = input1 + input2
>>> print("두 수의 합은 %s 입니다" % total)
첫번째 숫자를 입력하세요:3
두번째 숫자를 입력하세요:6
두 수의 합은 36 입니다

# 두 수의 합? - 숫자 계산
>>> input1 = input("첫번째 숫자를 입력하세요:")
>>> input2 = input("두번째 숫자를 입력하세요:")
>>> total = int(input1) + int(input2)
>>> print("두 수의 합은 %s 입니다" % total)
첫번째 숫자를 입력하세요:3
두번째 숫자를 입력하세요:6
두 수의 합은 9 입니다

# 숫자의 총합
>>> user_input = input("숫자를 입력하세요:")
>>> numbers = user_input.split(",")
>>> total = 0
>>> for n in numbers:
>>>    total += int(n)  # 입력은 문자열이므로 숫자로 변환해야 한다.
>>> print(total)
숫자를 입력하세요:65,45,2,3,45,8
168

# 구구단 출력
>>> user_input = input("구구단을 출력할 숫자를 입력하세요(2~9):")
>>> dan = int(user_input)  # 입력 문자열을 숫자로 변환
>>> for i in range(1, 10):
>>>    print(i*dan, end= ' ')  # 한줄로 출력하기 위해 줄바꿈 문자 대신 공백문자를 마지막에 출력한다
```
