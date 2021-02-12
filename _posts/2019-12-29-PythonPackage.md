---
title: "[Python] 파이썬 패키지 - import/__init__.py/relative"
date: 2019-12-29
categories:
  - study
tags:
  - python
toc: true
toc_sticky: true
---

## 패키지(Packages)란?
- 패키지는 도트(.)를 이용하여 파이썬 모듈을 계층적(디렉터리 구조)으로 관리할 수 있게 해준다.
- 예를 들어 모듈명이 A.B인 경우, A는 패키지명이 되고 B는 A 패키지의 모듈이 된다.
- 패키지 구조로 파이썬 프로그램을 만드는 것이 공동 작업이나 유지 보수 등 여러 면에서 유리하다. 
- 또한 패키지 구조로 모듈을 만들면 다른 모듈과 이름이 겹치더라도 더 안전하게 사용할 수 있다.

```python
# 패키지 구조
game/                   # 디렉터리명 - game이 이 패키지의 루트 디렉터리
__init__.py         # 파이썬 모듈들 .py
sound/              # sound, graphic, play는 서브 디렉터리
    __init__.py
    echo.py
    wav.py
graphic/
    __init__.py
    screen.py
    render.py
play/
    __init__.py
    run.py
    test.py
```
<br>
<br>

## 1. 패키지 만들기 - 패키지 기본 구성 요소 준비하기

```python
# 1. C:/doit이라는 디렉터리 밑에 game 및 기타 서브 디렉터리들과 .py 파일들을 생성
C:/doit/game/__init__.py
C:/doit/game/sound/__init__.py
C:/doit/game/sound/echo.py
C:/doit/game/graphic/__init__.py
C:/doit/game/graphic/render.py

# 2. 각 디렉터리에 __init__.py 파일을 만들어 놓기만 하고 내용은 일단 비워 둔다.

# 3. echo.py 파일은 다음과 같이 만든다.
>>> def echo_test():
>>>     print ("echo")

# 4. render.py 파일은 다음과 같이 만든다.
>>> def render_test():
>>>     print ("render")

# 5. 만든 패키지를 참조할 수 있도록 set 명령 이용해 PYTHONPATH 환경 변수에 C:/doit 디렉터리 추가
C:\> set PYTHONPATH=C:/doit
C:\> python
Type "help", "copyright", "credits" or "license" for more information.
```
<br>
<br>

## 2. 패키지 안의 함수 실행하는 3가지 방법
- 모듈을 import하여 실행
- 모듈이 있는 디렉터리까지를 from ... import하여 실행하는 방법
- 모듈의 함수를 직접 import하여 실행하는 방법

```python
# 1. echo 모듈을 import하여 실행
>>> import game.sound.echo
>>> game.sound.echo.echo_test()
echo

# 2. echo 모듈이 있는 디렉터리까지를 from ... import하여 실행
>>> from game.sound import echo
>>> echo.echo_test()
echo

# 3. echo 모듈의 echo_test 함수를 직접 import하여 실행
>>> from game.sound.echo import echo_test
>>> echo_test()
echo"
```

- 불가능한 케이스

```python
# 불가능 케이스 1
>>> import game                         # import game을 수행하면 
>>> game.sound.echo.echo_test()         # game 디렉터리의 모듈 또는 __init__.py에 정의된 것만 참조
Traceback (most recent call last):
    File "<stdin>", line 1, in <module>
AttributeError: 'module' object has no attribute 'sound'

# 불가능 케이스 2
>>> import game.sound.echo.echo_test   # 도트 연산자(.)를 사용해서 import a.b.c처럼 import할 때
Traceback (most recent call last):     # 마지막 항목인 c는 반드시 모듈 또는 패키지여야만 한다
    File "<stdin>", line 1, in <module>
ImportError: No module named echo_test
```
<br>
<br>

## 3.  __init__.py 의 용도
- __init__.py 파일은 해당 디렉터리가 패키지의 일부임을 알려주는 역할을 한다. 
- 만약 game, sound, graphic등 패키지에 포함된 디렉터리에 __init__.py 파일이 없다면 패키지로 인식되지 않는다.
- ※ python3.3 버전부터는 __init__.py 파일 없이도 패키지로 인식이 되지만, 하위 버전 호환을 위해 __init__.py 파일을 생성하는 것이 안전한 방법이다.
- 특정 디렉터리의 모듈을 *를 이용하여 import할 때, 해당 디렉터리의 __init__.py 파일에 __all__이라는 변수를 설정하고 import할 수 있는 모듈을 정의해 주어야 한다.

```python
# 특정 디렉터리의 모듈을 *를 이용하여 import할 때, 에러
>>> from game.sound import *
>>> echo.echo_test()
Traceback (most recent call last):
    File "<stdin>", line 1, in <module>
NameError: name 'echo' is not defined

# __init__.py 파일에 __all__이라는 변수를 설정하고 import할 수 있는 모듈을 정의해야함
C:/doit/game/sound/__init__.py          
__all__ = ['echo']                  
# __all__은 sound 디렉터리에서 * 기호를 이용하여 import할 때,
# 이곳에 정의된 echo 모듈만 import된다는 뜻
# 참고로, from a.b.c import * 에서 c가 모듈이면, 
# __all__과 상관없이 무조건 import된다
>>> from game.sound import *        # __init__.py 파일을 변경하면 위 예제의 원하던 결과가 출력됨
>>> echo.echo_test()
echo
```
<br>
<br>

## 4. relative 패키지: 상대 경로로 불러오기
- .. – 부모 디렉터리: 같은 모듈 안에서만 사용해야 함
- . – 현재 디렉터리

```python
# 절대 경로로 불러오기
>>> from game.sound.echo import echo_test      # from game.sound.echo import echo_test 문장 추가
>>> def render_test():                         # echo_test() 함수를 사용할 수 있도록 
>>>     print ("render")
>>>     echo_test()
>>> from game.graphic.render import render_test
>>> render_test()
render
echo

# 상대 경로로 불러오기 - relative하게 import
>>> from ..sound.echo import echo_test        # ..은 부모 디렉터리를 의미
>>> def render_test():
>>>     print ("render")
>>>     echo_test()
```