---
title: "[Python] 파이썬 모듈 - import"
date: 2020-9-14
categories:
- study
tags:
- python
toc: true
toc_sticky: true
---

## 모듈 임포트?
- 그동안 사용했던 함수들 처럼, 다양한 기능들이 미리 함수로 구현되어 모듈 형태로 제공
- 대표적으로 추후 과정에서 사용하게 될 아래의 모듈들이 존재
    + requests - HTTP 요청/응답 모듈
    + numpy - 수치해석 모듈 
    + pandas - 데이터 분석 모듈
<br>
<br>

## import 
- import를 사용하여 해당 모듈 전체를 import

```python
# Q. 네이버 사이트 html 출력
import requests
resp = requests.get('http://naver.com')
resp.text
```
```python
# Q. 수학 모듈
import math

math.pi
math.cos(100)
```
<br>
<br>

## from import 
- 해당 모듈에서 특정 타입만 import

```python
# math에서 pi만 import
from math import pi
from math import cos

pi
cos(100)
```
<br>
<br>

## \*(all) import
- 해당 모듈내에 정의된 모든 것을 import
- \* 임포트는 여러 import 중 동일명으로 오류 발생 가능하므로 일반적으로 사용이 권장되지 않음

```python
# math의 e와 a의 e가 중복되 오류 발생
from math import *
from a import *
```
<br>
<br>

## as 
- 모듈 import 시, alias(별명) 지정가능

```python
import pandas as pd
data = pd.read_csv('data/baseball.csv')
```
<br>
<br>
