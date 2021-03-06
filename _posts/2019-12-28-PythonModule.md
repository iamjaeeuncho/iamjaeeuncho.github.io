---
title: "[Python] 파이썬 모듈 - 생성 및 불러오기"
date: 2019-12-28
categories:
  - study
tags:
  - python
toc: true
toc_ads: true
toc_sticky: true
---

## 모듈(Module)이란?
* 함수나 변수 또는 클래스 들을 모아 놓은 파일이다.
* 다른 사람들이 이미 만들어 놓은 모듈을 사용할 수도 있고 우리가 직접 만들어서 사용할 수도 있다.
<br>
<br>

## 1. 모듈 만들기: add와 sub함수를 가진 mod1.py 파일이 바로 모듈이다

```python
# mod1.py
def add(a, b):
    return a + b

def sub(a, b): 
    return a-b
```
<br>
<br>

## 2. 모듈 불러오기: from 모듈이름 import 모듈함수

```python
# 1. 명령 프롬프트 창을 열고 mod1.py를 저장한 디렉터리로 이동해, 대화형 인터프리터 실행
C:\Users\pahkey>cd C:\doit
C:\doit>dir
...
2014-09-23 오후 01:53 49 mod1.py
...
C:\doit>python
Type "help", "copyright", "credits" or "license" for more information.

# 2-1. import로 모듈 불러오기 - import는 이미 만들어진 파이썬 모듈을 사용할 수 있게 해주는 명령어
>>> import mod1                     # import 사용법: import 모듈이름
>>> print(mod1.add(3, 4))           # mod1.py 파일 내 add 함수 사용법: 모듈이름.함수이름
7
>>> print(mod1.sub(4, 2))
2

# 2-2. 모듈명 없이 함수명만으로 쓰고 싶은 경우 - "from 모듈이름 import 모듈함수" 사용
>>> from mod1 import add
>>> from mod1 import add, sub       # 여러개의 함수 사용하고 싶을 때
>>> from mod1 import *              # 모든 함수를 불러서 사용하겠다는 뜻
>>> add(3, 4)                       # 모듈명 없이 바로 함수명 입력
7
```
<br>
<br>

## 3. if __name__ == "__main__": 의 의미
* 만약 위의 문구를 넣지 않으면, 'import 모듈이름' 문구를 수행하는 순간 모듈이 실행되어 결과값을 출력한다.
* 만약 모듈 파일의 일부 함수만 사용하려면, if __name__ == "__main__ 문구를 입력해야 한다.
  * 해당 문구가 참이면(직접 이 파일을 실행시켰을 때) if문 수행 - 우리가 하고 싶은 연산,
  * 해당 문구가 거짓이면(다른 파일에서 모듈 사용시) if문 수행되지 않음
* 파이썬의 __name__ 변수는 파이썬이 내부적으로 사용하는 특별한 변수명이다. 
  * 만약 C:\doit>python mod1.py처럼 직접 모듈 파일을 실행시킬 경우 모듈 파일의 __name__ 변수에는 __main__ 이라는 값이 저장된다.
  * 하지만 다른 파이썬 모듈에서 모듈 파일을 import 할 경우에는 __name__ 변수에는 모듈 파일의 모듈이름 값(mod1)이 저장된다.

```python
# mod1.py 
def add(a, b): 
    return a+b

def sub(a, b): 
    return a-b

if __name__ == "__main__":        # 직접 이 파일을 실행시켰을 때는 
    print(add(1, 4))              # __name__ == "__main__" 참, if문 문장 수행
    print(sub(4, 2))              # 반대로 다른 파일에서 모듈 사용시, 
                                  # __name__ == "__main__" 거짓, if문 문장 수행되지 않음
```
<br>
<br>

## 4. 클래스나 변수 등을 포함한 모듈

```python
# 클래스와 변수를 포함한 모듈 mod2.py 
>>> PI = 3.141592                         # 변수
>>> class Math:                           # 클래스 - 원의 넓이를 계산
>>>     def solv(self, r): 
>>>         return PI * (r ** 2)         
>>> def add(a, b):                        # 두 값을 더하는 add 함수
>>>     return a+b                        
                                          # 파일 이름을 mod2.py로 하고 C:\doit 디렉터리에 저장

# 대화형 인터프리터에서 mod2.py 사용
C:\Users\pahkey> cd C:\doit
C:\doit> python
Type "help", "copyright", "credits" or "license" for more information.
>>> import mod2
>>> print(mod2.PI)                       #  mod2.py 파일에 있는 PI라는 변수값을 사용
3.141592

>>> a = mod2.Math()
>>> print(a.solv(2))                     # 클래스를 이용하려면, 모듈이름.클래스이름
12.566368
```
<br>
<br>

## 5. 다른 파일에서 모듈 불러오기

```python
# modtest.py
>>> import mod2              # mod2모듈을 불러와서 사용
>>> result = mod2.add(3, 4)  # 예제가 정상적으로 실행되기 위해서는 
>>> print(result)            # modtest.py과 mod2.py이 동일한 디렉터리(c:\doit)에 있어야 함
```

① 모듈을 저장한 디렉터리로 이동하지 않고, 모듈을 불러와서 사용하는 법

```python
# 1. mod2.py 파일을 C:\doit\mymod 로 이동
C:\Users\pahkey>cd C:\doit
C:\doit>mkdir mymod
C:\doit>move mod2.py mymod

# 2. sys.path.append(모듈을 저장한 디렉터리) 사용하기
C:\doit>python
>>> import sys                        # sys 모듈: 파이썬 라이브러리가 설치된 디렉터리 확인 가능
>>> sys.path                          # sys.path: 파이썬 라이브러리가 설치된 디렉터리 보여 줌
['', 'C:\\Windows\\SYSTEM32\\python37.zip', 'c:\\Python37\\DLLs', 
'c:\\Python37\\lib', 'c:\\Python37', 'c:\\Python37\\lib\\site-packages']

>>> sys.path.append("C:/doit/mymod")  # .append 이용해 C:/doit/mymod 디렉터리를 sys.path에 추가
>>> sys.path
['', 'C:\\Windows\\SYSTEM32\\python37.zip', 'c:\\Python37\\DLLs', 
'c:\\Python37\\lib', 'c:\\Python37', 'c:\\Python37\\lib\\site-packages', 
'C:/doit/mymod']
```

② PYTHONPATH 환경 변수 사용하기

```python
C:\doit>set PYTHONPATH=C:\doit\mymod     # set 명령어 사용, PYTHONPATH 환경 변수에
C:\doit>python                           # mod2.py 파일이 있는 C:\doit\mymod 디렉터리를 설정
>>> import mod2                          # 디렉터리 이동이나 별도의 모듈 추가 작업 없이 
>>> print(mod2.add(3,4))                 # mod2 모듈을 불러와서 사용 가능
7
```
<br>
<br>
<i> ※ credit: 점프 투 파이썬 https://wikidocs.net/book/1 </i>