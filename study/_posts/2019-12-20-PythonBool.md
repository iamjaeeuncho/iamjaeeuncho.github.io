---
layout: post
title:  ［Python］파이썬 불 자료형 - 참과 거짓, 예시, 함수
slug:         PythonVariable_Bool
categories:   [study]
tags:         [programming, python]
noindex: true
---
<font color="white">［Python］파이썬 불 자료형 - 참과 거짓, 예시, 함수</font>

## 불(bool) 자료형이란?
* 참(True)과 거짓(False)을 나타내는 자료형이다.
* 불 자료형은 다음의 2가지 값만을 가질 수 있다. - True (참) or False (거짓)
※ True나 False는 파이썬의 예약어로 true, false와 같이 사용하지 말고 첫 문자를 항상 대문자로 사용한다.


## 1. 불(bool) 자료형 예시
```python
# 변수에 불 자료형 대입
>>> a = True
>>> b = False

# 조건문의 리턴값
>>> 1 == 1              # "1과 1이 같은가?"를 묻는 조건문의 결과로 True 리턴
True
```


## 2. 자료형의 참과 거짓
<center>
  <img src="https://github.com/iamjaeeuncho/iamjaeeuncho.github.io/blob/master/programming/_posts/images/bool.png" width="550px"><br>
</center>
```python
# 참과 거짓이 프로그램에서 어떻게 쓰이는지 예시 1
>>> a = [1, 2, 3, 4]
>>> while a:               # while문 조건문 a가 참인 경우에 수행문장 a.pop()을 계속 실행
...     print(a.pop())     # ..pop() 공백이면 맨 마지막 요소를 보여주고 삭제
...                        # a가 참인 동안(리스트 내에 요소가 존재하는 한)   
4                          # 마지막 요소를 계속해서 끄집어낼 것이다.
3                          # 결국 더 이상 끄집어낼 것이 없으면 
2                          # a가 빈 리스트([ ])가 되어 거짓이 된다.
1
# 참과 거짓이 프로그램에서 어떻게 쓰이는지 예시 2
>>> if []:                # 비어있는 리스트 []이므로 거짓, 따라서 "거짓"이 출력됨
...     print("참")
... else:
...     print("거짓")
...
거짓              
>>> if [1, 2, 3]:         # 값이 있는 리스트 []이므로 참, 따라서 "참"이 출력됨
...     print("참")
... else:
...     print("거짓")
... 
참
```


## 3. 불(bool)이라는 내장 함수를 이용한 자료형의 참과 거짓 식졀
```
>>> bool('python')          #'python'이라는 문자열은 빈 문자열이 아니므로 
True                        # bool연산의 결과로 불 자료형인 True를 리턴

>>> bool('')                # '' 이라는 문자열은 빈 문자열
False                       # bool 연산의 결과로 불 자료형인 False를 리턴

>>> bool([1,2,3])
True

>>> bool([])
False

>>> bool(0)
False

>>> bool(3)
True
```
