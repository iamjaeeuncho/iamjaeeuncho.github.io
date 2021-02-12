---
title: "[Python] 파이썬 Pandas 자료구조 - Series, Dataframe"
date: 2020-1-2
categories:
  - study
tags:
  - python
toc: true
toc_sticky: true
---

## Pandas란?
* 데이터 분석, 처리를 위해 만들어진 파이썬 패키지로, 보다 안정적으로 대용량 데이터들을 쉽게 처리할 수 있다고 한다
<br>
<br>

## 0. 패키지 불러오기

```python
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
```
<br>
<br>

## 1. 자료구조
① 시리즈(Series)
* value와 index의 형태를 지니는 Pandas의 자료 구조. 값이 있는 리스트를 통해 Series를 만들고, 정수로 만들어진 인덱스를 기본값으로 불러옴.

```python
# 시리즈 생성 방법
변수명 = pd.Series(data, index=['',''])      # 인덱스 지정 생략가능, 생략시 0부터 자동 지정

# 리스트로 Series 만들기
>>> s = pd.Series([1,3,5,7], index=['a', 'b', 'c', 'd'])          
>>> s                                        # 값을 가진 리스트를 판다스의 Series로 생성
a    1                                       # index (0, 1, 2, 3, 4, 5)와
b    3                                       # value (1,3,5,np.nan,6,8)가 짝으로 생성되어
c    5                                       # Series라는 형태의 자료 구조 만듬
d    7
dtype: int64

>>> s.index = ['first', 'second', 'third', 'forth']       # 인덱스 값 변경
>>> s['first'] = 9                                        # 인덱스 지정해 값 변경
>>> s
first     9
second    3
third     5
forth     7
dtype: int64

# 딕셔너리로 Series 만들기
>>> d = {'a': 0., 'b': 1., 'c': 2.}
>>> pd.Series(d)
a    0.0
b    1.0
c    2.0
dtype: float64

>>> pd.Series(d, index=['b', 'c', 'd', 'a'])    # 값이 없는 이름을 값으로 넣으면
b    1.0                                        # NaN(Not a Number, 해당값 없음)으로 표시됨 
c    2.0
d    NaN
a    0.0
dtype: float64
```

```python
# 리스트, 튜플 형태의 시리즈
>>> s.dtypes                            # .dtypes는 데이터형만 따로 확인
dtype('int64')
>>> s.array                             # .array는 배열 확인
<PandasArray>
[9, 3, 5, 7]
Length: 4, dtype: int64
>>> s.to_numpy()                        # .to_numpy()
array([9, 3, 5, 7], dtype=int64)

# 딕셔너리 형태의 시리즈
>>> s['a']                              # 인덱스 라벨로 추가
0.46911229990718628
>>> s['e'] = 12.                        # 인덱스 라벨로 수정
>>> s
a     0.469112
b    -0.282863
c    -1.509059
d    -1.135632
e    12.000000
dtype: float64
>>> 'e' in s                            # 인덱스 라벨로 찾기: True면 있음, False면 없음
True
>>> 'f' in s
False
>>> s.get('f')                          # get 메소드를 이용한 None값 부여
>>> s.get('f', np.nan)                  # get 메소드를 이용한 특정값 부여
nan

# 시리즈 네임 특성
>>> s = pd.Series(np.random.randn(5), name='something') # 생성시 부여
>>> s
0   -0.494929
1    1.071804
2    0.721555
3   -0.706771
4   -1.039575
Name: something, dtype: float64
>>> s.name = "시리즈 예시"               # .name은 이름 지정
>>> s.index.name = "인덱스 이름"
인덱스 이름
seoul     02
busan    051
Name: 시리즈 예시, dtype: object
>>> s2 = s.rename("different")          # 이름 변경
>>> s2.name                             # 이름 확인
'different'

# 기타 시리즈 함수들
>>> s.index                             # .index는 index 범위값 확인
RangeIndex(start=0, stop=5, step=1)
>>> s.values                            # .values는 값(values)만 따로 확인
array([1, 3, 5, 6, 8], dtype=int64)
```
<br>

② DataFrame
* DataFrame은 여러 개의 Dictionary를 처리하는데 있어 Series보다 보기 편한 형태로 제공해 줄 수 있는 자료 구조로, 엑셀 표, SQL 테이블, 시리즈의 딕셔너리 모양을 생각하면 쉽다. 
* 먼저 딕셔너리 형태 {"키값" : 밸류값}로 data를 정의해 준 뒤, 이를 DataFrame으로 정의한다. 키값은 컬럼명이 되고, 밸류값은 해당 컬럼의 값이 된다.
* DataFrame 함수 자동완성 기능: 데이터프레임변수.[Tab 키보드]
<br>
<center>
<img src="https://user-images.githubusercontent.com/46369038/107740926-823fdf00-6d4f-11eb-9a5a-aa9760391f82.png" width="250px"><br>
<i>credit: https://nittaku.tistory.com/110?category=725162</i><br>
</center>
<br>

```python
# 시리즈로 데이타 프레임 만들기
>>> d = {'one': pd.Series([1., 2., 3.], index=['a', 'b', 'c']),
>>>      'two': pd.Series([1., 2., 3., 4.], index=['a', 'b', 'c', 'd'])}
>>> df = pd.DataFrame(d)                         # 시리즈를 밸류값으로 넣고 컬럼값 지정
>>> df
   one  two
a  1.0  1.0
b  2.0  2.0
c  3.0  3.0
d  NaN  4.0
>>> pd.DataFrame(d, index=['d', 'b', 'a'])      # 필요한 인덱스만 뽑아서 데이타 프레임 만들기
   one  two
d  NaN  4.0
b  2.0  2.0
a  1.0  1.0
>>> pd.DataFrame(d, index=['d', 'b', 'a'], columns=['two', 'three'])
   two three                                            # 값 없는 새 컬럼 추가시 Not a number
d  4.0   NaN
b  2.0   NaN
a  1.0   NaN
>>> df.index                                            # .index 인덱스 정보 보기
Index(['a', 'b', 'c', 'd'], dtype='object')
>>> df.columns                                          # .columnds 컬럼 정보 보기
Index(['one', 'two'], dtype='object')

# 딕셔너리로 데이터 프레임 만들기
>>> data2 = [{'a': 1, 'b': 2}, {'a': 5, 'b': 10, 'c': 20}]
>>> pd.DataFrame(data2)
   a   b     c
0  1   2   NaN
1  5  10  20.0
>>> pd.DataFrame(data2, index=['first', 'second'])         # 인덱스 추가
        a   b     c
first   1   2   NaN
second  5  10  20.0
>>> pd.DataFrame(data2, columns=['a', 'b'])                # 인덱스로 뽑기
   a   b
0  1   2
1  5  10
```
<br>
<br>

# 2. 시리즈와 데이터 프레임의 재색인(reindex)

```python
# 시리즈의 재색인(reindex)
>>> obj = Series([1,3,5,7], index=['a', 'b', 'c', 'd'])
>>> obj
a    1
b    3
c    5
d    7
dtype: int64

>>> obj2 = obj.reindex(['e','d','c','b','a'])            # .reindex를 통해, index값 재배치
>>> obj2
e    NaN
d    7.0
c    5.0
b    3.0
a    1.0
dtype: float64

>>> obj2 = obj.reindex(['e','d','c','b','a'], fill_value=1111)
>>> obj2                                                 # fill_value로 Nan값 대신 값 설정
e    1111
d       7
c       5
b       3
a       1
dtype: int64
```
<br>
<br>

* 참고자료
  * 10 minutes to pandas https://pandas.pydata.org/pandas-docs/stable/getting_started/10min.html
  * 번역본 10분 판다스 https://dataitgirls2.github.io/10minutes2pandas/
  * 판다스 자료구조 https://yujuwon.tistory.com/entry/Pandas-자료구조 
  
  
  
