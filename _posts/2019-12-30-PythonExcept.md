---
title: "[Python] 파이썬 오류 예외 처리 - try, except, finally"
date: 2019-12-30
categories:
  - study
tags:
  - python
toc: true
toc_sticky: true
---

## 파이썬 오류 예외 처리
* 파이썬은 try, except를 이용해서, 오류를 무시하거나 별도 처리할 수 있게 해준다.


## 1. 오류 발생 예시들
* SyntaxError(구문 오류): 오타 쳤을 때
* FileNotFoundError: 디렉터리 안에 없는 파일을 열려고 시도했을 때 발생하는 오류
* ZeroDivisionError: 4등의 숫자로 0을 나누려고 할 때
* IndexError: a는 [1, 2, 3]이라는 리스트인데 a[4]는 a 리스트에서 얻을 수 없는 값일 때


## 2. 오류 예외 처리 기법
① try, except문
* try 블록 수행 중 오류가 발생하면 except 블록이 수행된다.
* 하지만 try블록에서 오류가 발생하지 않는다면 except 블록은 수행되지 않는다.
* except 문장 내 [ ] 기호를 사용하는데, 이 기호는 괄호 안의 내용을 생략할 수 있다는 관례적인 표기법
```python
# try, except문의 기본 구조
try:
    ...
except [발생 오류[as 오류 메시지 변수]]:
    ...
```

* except 구문의 3가지 방법
```python
# 1. try, except만 쓰는 방법 - 오류 종류에 상관없이 오류 발생시 except 블록 수행
try:
    ...
except:
    ...

# 2. 발생 오류만 포함한 except문 - 발생한 오류가 except문 내 오류와 일치할 때만 except 블록 수행
try:
    ...
except 발생 오류:
    ...

# 3. 발생 오류와 오류 메시지 변수까지 포함한 except문 - 두 번째 경우에서 오류 내용까지 알고 싶을 때 사용
try:
    ...
except 발생 오류 as 오류 메시지 변수:
    ...

# 3의 예시
>>> try:                             # 4를 0으로 나누려고 하면 ZeroDivisionError가 발생
>>>    4 / 0        
>>> except ZeroDivisionError as e:   # except 블록이 실행되고 e라는 오류 메시지 출력
>>>    print(e)
결과값: division by zero
```

② try .. finally
* finally절은 try문 수행 도중 예외 발생 여부에 상관없이 항상 수행된다. 
* 보통 finally절은 사용한 리소스를 close해야 할 경우에 많이 사용된다.
```python
f = open('foo.txt', 'w')          # foo.txt라는 파일을 쓰기 모드로 연 후
try:                              # try문이 수행된 후 예외 발생 여부에 상관없이
    # 무언가를 수행한다.
finally:                          # finally절에서 f.close()로 열린 파일을 닫을 수 있다
    f.close()
```

③ 여러개의 오류 처리하기
```python
# try문 내에서 여러개의 오류를 처리하기 위해서는 다음과 같은 구문 이용
try:
    ...
except 발생 오류1:
   ... 
except 발생 오류2:
   ...
   
# 예시 - 0으로 나누는 오류와 인덱싱 오류를 따로 처리
try:
    a = [1,2]
    print(a[3])
    4/0
except ZeroDivisionError:
    print("0으로 나눌 수 없습니다.")
except IndexError:
    print("인덱싱 할 수 없습니다.")
    
# 예시 - 오류 메세지 출력
try:
    a = [1,2]
    print(a[3])
    4/0
except (ZeroDivisionError, IndexError) as e:
    print(e)
```

④ 오류 회피하기: 특정 오류가 발생할 경우 그냥 통과시켜야 할 때
```python
# try문 내에서 FileNotFoundError가 발생할 경우 pass를 사용하여 오류를 그냥 회피
try:
    f = open("나없는파일", 'r')
except FileNotFoundError:
    pass
```

⑤ 오류 일부러 발생시키기
* 파이썬은 raise라는 명령어를 이용해 오류를 강제로 발생시킬 수 있다.
* NotImplementedError는 파이썬 내장 오류로, 꼭 작성해야 하는 부분이 구현되지 않았을 경우 일부러 오류를 발생시키고자 사용한다.
```python
# Bird라는 클래스를 상속받는 자식 클래스는 반드시 fly라는 함수를 구현하도록 만들고 싶은 경우
>>> class Bird:
>>>     def fly(self):                 # Bird 클래스를 상속받는 자식 클래스는 fly라는 함수 구현
>>>         raise NotImplementedError  # 구현되지 않았을 경우 일부러 오류 발생

# 자식 클래스가 fly 함수를 구현하지 않은 상태로 fly 함수를 호출한다면?
>>> class Eagle(Bird):                 # Eagle 클래스는 Bird 클래스를 상속받는다
>>>     pass                          
>>> eagle = Eagle()                    # Eagle 클래스에서 fly 함수를 구현하지 않았기 때문에 
>>> eagle.fly()                        # Bird 클래스의 fly 함수가 호출
                                       # 그리고 raise문에 의해 NotImplementedError가 발생
Traceback (most recent call last):
  File "...", line 33, in <module>
    eagle.fly()
  File "...", line 26, in fly
    raise NotImplementedError
NotImplementedError

# NotImplementedError가 발생되지 않게 하려면
>>> class Eagle(Bird):                # Eagle 클래스에 fly 함수를 반드시 구현해야 함
>>>     def fly(self):
>>>         print("very fast")
>>> eagle = Eagle()
>>> eagle.fly()
very fast                            # 오류 없이 문장 출력
```

⑥ 예외 만들기
* 프로그램 수행 도중 특수한 경우에만 예외처리를 하기 위해서 종종 예외를 만들어서 사용.
* 예외는 파이썬 내장 클래스인 Exception클래스를 상속하여 만들 수 있다.
```python
# 예외 만들기 기본 구조
class MyError(Exception):
    pass
    
# 예외 만들기 예시
>>> def say_nick(nick):
>>>     if nick == '바보':
>>>         raise MyError()
>>>     print(nick)
>>> say_nick("천사")
>>> say_nick("바보")
천사
Traceback (most recent call last):
  File "...", line 11, in <module>
    say_nick("바보")
  File "...", line 7, in say_nick
    raise MyError()
__main__.MyError

# MyError가 발생할 경우 예외처리기법을 이용하여 예외처리
>>> try:
>>>     say_nick("천사")
>>>     say_nick("바보")
>>> except MyError:
>>>     print("허용되지 않는 별명입니다.")
천사
허용되지 않는 별명입니다.

# MyError가 발생할 경우 예외처리기법을 이용하여 예외처리 - 오류 메세지 보여주기
>>> class MyError(Exception):                   # 오류 클래스에 __str__ 메써드 구현해야 함
>>>     def __str__(self):                      # __str__ 메써드는 오류메시지를 
>>>         return "허용되지 않는 별명입니다."    # print문으로 출력할 경우에 호출되는 메써드
>>> try:
>>>     say_nick("천사")
>>>     say_nick("바보")
>>> except MyError as e:
>>>     print(e)
```
