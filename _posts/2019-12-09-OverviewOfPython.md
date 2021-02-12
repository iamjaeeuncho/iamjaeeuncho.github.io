---
title: "[Python] 파이썬 개요 - 기원, 특징, 에디터"
date: 2019-12-9
categories:
  - study
tags:
  - python
toc: true
toc_sticky: true
---

## 파이썬(Python)의 기원
1990년 암스테르담의 귀도 반 로섬(Guido Van Rossum)이 개발한 인터프리터 언어이다. 파이썬의 사전적인 의미는 고대 신화에 나오는 파르나소스 산의 동굴에 살던 큰 뱀을 뜻하며, 아폴로 신이 델파이에서 파이썬을 퇴치했다는 이야기가 전해지고 있다.
<br>
<br>

## 파이썬 특징
  - 이해하기 쉬운 간결한 언어
  - 빠른 개발 속도: Life is too short, You need Python.
  - 넓은 활용성: GUI, Web, DB, Text 처리, 수치 연산, 병렬 연산, 사물 인터넷, 데이터 분석 등
  - 많이 사용하는 언어: 실리콘 밸리에서 최근 가장 인기있는 언어.
<br>
<br>

## 파이썬 에디터 종류
  1. 파이썬(Python): 파이썬 자체만 설치할 경우 pip 툴만 포함되어 있어, 필요한 패키지나 라이브러리는 수동으로 설치해야 함. 의존성 문제 발생으로 복잡하므로 보통 아래 파이참이나 아나콘다 같은 파이썬 플랫폼을 활용해 개발함.
  2. 파이참(Pycharm): Visual Studio, 이클립스와 같은 통합 개발 환경 툴 (IDE, Integrated Development Environment). 파이썬 기반의 언어에 대한 코드 편집기로, 코드 작성 시 자동 완성, 문법 체크 등 편리한 기능들 많이 제공.
  3. 아나콘다(Anaconda): Python 기본 패키지 + 각종 라이브러리들을 같이 패키징해 배포. 대표적으로 panda, numpy, scipy, sklearn, matplotlib, Jupyter Notebook 등으로 데이터 과학 플랫폼 중 가장 유명
<br>
<br>

## 파이썬과 다른 프로그래밍 언어 차이점
  - 하나의 문장을 종료할 때 종료기호는 없음
  - 코드 블록을 여닫기 위하여 사용하던 중괄호 대신 공백 사용
  - 하나의 줄에 2개 이상의 명령어를 사용할 때, 명령어 구분 용도로 ; 사용
  - 코드의 구조를 정의하기 위해 기호 대신에 들여쓰기 사용
    * Java 에서는
```java
int x = 100;
if(x > 0){
System.out.println("x가 0보다 큽니다.");
} else {
System.out.println("x가 0보다 작습니다.");
}
```
    * Python 에서는
```python
x = 100
if x > 0:
print('x가 0보다 큽니다.')
else:
print('x가 0보다 크지 않습니다.')
```