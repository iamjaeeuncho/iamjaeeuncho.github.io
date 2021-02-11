---
layout: post
title:  ［Python］파이썬 기본 구문
slug:         PythonBasicSyntax
categories:   [study]
tags:         [programming, python]
noindex: true
---
<font color="white">［Python］파이썬 기본 구문</font>

## 1. 파이썬 식별자 규칙
  - 식별자(Identifiers)란, 변수에 부여된 이름. (ex. int A에서 A가 식별자)
  - 파이썬 식별자는 변수, 함수, 클래스, 모듈 또는 다른 개체를 식별하는데 사용되는 이름이다.
    1. 식별자는 문자 A~Z로 시작하고 밑줄(_), 숫자(0~9) 를 사용할 수 있다.
    2. 파이썬은 대소문자를 구분한다.
    3. But 식별자가 될 수 없는 것들
        * 파이썬은 문자 @, $, %는 식별자로 사용할 수 없다.
        * 식별자는 숫자로 시작할 수 없다. (ex. 2_aa는 식별자로 불가)
        * 예약어, 내장 함수, 모듈 이름은 이미 파이썬에서 사용되고 있기에 식별자가 될 수 없다. (ex. str 등등)
    ※ 변수 생성시 참고 사항: 파이썬은 변수 생성시 타입(type)을 적지 않는다.
      - ex. 자바의 경우, int a = 1이라면, 파이썬의 경우 a = 1.
      - 파이썬의 경우 변수에 값이 할당될 때 변수 타입이 자동으로 정해짐.


## 2. 파이썬 예약어
  - 예약어(Reserved Words)란, 컴퓨터 프로그래밍 언어에서 이미 문법적인 용도로 사용되고 있는 언어들을 말한다.
  - 파이썬에는 총 30개의 예약어가 있고, 모두 소문자이며, 예약어들은 상수 또는 변수나 다른 식별자 이름으로 사용 할 수 없다.
  - and, exec, not, assert, finally, or, break, for, pass, class, from, print, continue, global, raise, def, if, return, del, import, try, elif, in while, else, is, with, except, lambda, yield
  ```python
  # 예약어 종류 확인하는 법
  import keyword               # import 사용해 keyword 모듈 불러오기
  keyword.kwlist               # keyword 모듈에서 지원하는 키워드 리스트 출력
  ```


## 3. 줄 들여쓰기 (Lines and Indentation)
  - 중괄호 {} 대신 줄 들여쓰기로 코드 흐름을 제어 한다. 
  - 들여쓰기는 공백(Space), 탭(Tab) 모두 가능하나, 들여쓰기 공백 수는 블럭내에 동일 수로 해야 함.
  ```python
  # 정상
  if True:
        print("True")
  else:
        print("False")
      
  # 에러
  if True:
        print("Answer")
        print("True")
  else:
        print("Answer")
        print("False")
  ```


## 4. 멀티 라인문 (Multi-Line Statements)
  파이썬은 일반적으로 새로운 줄이 되면 끝난다. 그러나 줄 연속 문자(\)의 사용으로 줄을 계속 사용할 수 있다.<br>
  ```python
  # 다중행 문자열 입력 예시1: 줄 연속 문자(\) 사용
  total = item_one + \
          item_two + \
          item_three;
  # 다중 행 문자열 입력 예시2: 줄 연속 문자(\) 대신, [], {}, () 괄호 사용 가능
  total = ['Monday', 'Tuesday', 'Wednesday', 
            'Thursday', 'Friday']
  ```


## 5. 인용 (Quotation)
  - single('), double("), triple(''' or """) 를 사용하여 문자열을 감싸서 사용한다.
  - triple 따음표는 여러 줄에 걸쳐 문자열을 사용할 수 있다.
  ```python
  word = 'word'
  sentence = "This is a sentence."
  paragraph = """This is a paragraph. It is
                    made up of multiple lines and sentences."""
  ```


## 6. 주석 (Comments) 
  - 기호(#)를 사용해 주석을 시작한다. 기호 (#) 후 물리적 라인 끝까지 모든 문자를 주석으로 간주한다.
  ```python
  # First comment   ----- 주석 부분
  >>> print("Hello, Python!")
  ```
  