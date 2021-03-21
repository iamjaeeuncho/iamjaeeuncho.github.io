---
title: "[Python] 파이썬 데이터 타입 - 자료형 구분, 데이터 형식 변환"
date: 2019-12-21
categories:
  - study
tags:
  - python
toc: true
toc_ads: true
toc_sticky: true
---

## 자료형 (Data Types)이란,
* 데이터를 저장하는 방법으로, 프로그램의 기본이자 핵심 단위.
* 프로그래밍을 할 때 쓰이는 숫자, 문자열 등 자료 형태로 사용하는 모든 것. 
<br>
<br>

## 1. 자료형 구분
* 파이썬의 다섯가지 표준 데이터 유형
  * 숫자형(Numbers)
  * 문자형(String)
  * 리스트형(List)
  * 튜플형(Tuple)
  * 사전형(Dictionary)
* 저장방법에 따른 분류
  * Direct 형: 직접 데이터를 표현하는 자료형
  * Sequence 형: 다른 데이터를 포함하는 자료형으로 순서가 있는 자료형
  * Mapping형: 다른 데이터를 포함하는 자료형으로 키와 값으로 구분해서 저장하는 자료형
  * Set형: 순서가 없고 자료의 중복이 없는 자료형
* 변경 가능성에 따른 분류
  * 변경 가능(Mutable): list, dict, set
  * 변경 불가능형(Immutable): int, float, complex, str, tuple, frozenset
* 데이터 저장 개수에 따른 분류
  * 하나의 객체만 저장: str, bytes, bytearraym int, float, complex
  * 여러 개의 객체를 저장: list, tuple, dict, set, frozenset
<br>
<br>

## 2. 데이터 형식 변환
* int(x [,base]) Converts x to an integer. base specifies the base if x is a string.
* long(x [,base] ) Converts x to a long integer. base specifies the base if x is a string.
* float(x) Converts x to a floating-point number.
* complex(real [,imag]) Creates a complex number.
* str(x) Converts object x to a string representation.
* repr(x) Converts object x to an expression string.
* eval(str) Evaluates a string and returns an object.
* tuple(s) Converts s to a tuple.
* list(s) Converts s to a list.
* set(s) Converts s to a set.
* dict(d) Creates a dictionary. d must be a sequence of (key,value) tuples.
* frozenset(s) Converts s to a frozen set.
* chr(x) Converts an integer to a character.
* unichr(x) Converts an integer to a Unicode character.
* ord(x) Converts a single character to its integer value.
* hex(x) Converts an integer to a hexadecimal string.
* oct(x) Converts an integer to an octal string.
<br>
<br>
<i> ※ credit: 점프 투 파이썬 https://wikidocs.net/book/1 </i>