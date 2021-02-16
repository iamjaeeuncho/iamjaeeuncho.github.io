---
title: "[Python] 파이썬 Pandas의 연산 - 피봇테이블, 통계값, 함수들"
date: 2020-1-5
categories:
  - study
tags:
  - python
toc: true
toc_sticky: true
---

## 기초 통계 연산
* 보통 누락된 값을 제외하고 연산

```python
# 중앙값
>>> df.mean()
A   -0.004474
B   -0.383981
C   -0.687758
D    5.000000
F    3.000000
dtype: float64

# 특정 축의 중앙값
>>> df.mean(1)
2013-01-01    0.872735
2013-01-02    1.431621
2013-01-03    0.707731
2013-01-04    1.395042
2013-01-05    1.883656
2013-01-06    1.592306
Freq: D, dtype: float64

# 다른 차원의 객체더라도 판다스는 자동으로 정렬해 연산함
>>> s = pd.Series([1, 3, 5, np.nan, 6, 8], index=dates).shift(2)
>>> s
2013-01-01    NaN
2013-01-02    NaN
2013-01-03    1.0
2013-01-04    3.0
2013-01-05    5.0
2013-01-06    NaN
Freq: D, dtype: float64

>>> df.sub(s, axis='index')
                   A         B         C    D    F
2013-01-01       NaN       NaN       NaN  NaN  NaN
2013-01-02       NaN       NaN       NaN  NaN  NaN
2013-01-03 -1.861849 -3.104569 -1.494929  4.0  1.0
2013-01-04 -2.278445 -3.706771 -4.039575  2.0  0.0
2013-01-05 -5.424972 -4.432980 -4.723768  0.0 -1.0
2013-01-06       NaN       NaN       NaN  NaN  NaN
```
<br>
<br>

## Apply
* 행이나 열 단위로 더 복잡한 처리를 하고 싶을 때는 apply 메서드를 사용.
* 인수로 행 또는 열을 받는 함수를 apply 메서드의 인수로 넣으면 각 열(또는 행)을 반복하여 그 함수에 적용시킨다.

```python
>>> df3 = pd.DataFrame({
>>>     'A': [1, 3, 4, 3, 4],
>>>     'B': [2, 3, 1, 2, 3],
>>>     'C': [1, 5, 2, 4, 4]})
>>> df3
 A B C
0 1 2 1
1 3 3 5
2 4 1 2
3 3 2 4
4 4 3 4

>>> df3.apply(lambda x: x.max() - x.min())          # 열의 최대값과 최소값의 차이
A    3
B    2
C    4
dtype: int64

>>> df3.apply(lambda x: x.max() - x.min(), axis=1)  # 행에 대해 적용하고 싶으면 axis=1 인수
0    1
1    2
2    3
3    2
4    1
dtype: int64
```
<br>
<br>

## String
```python
>>> s = pd.Series(['A', 'B', 'C', 'Aaba', 'Baca', np.nan, 'CABA', 'dog', 'cat'])
>>> s.str.lower()
0       a
1       b
2       c
3    aaba
4    baca
5     NaN
6    caba
7     dog
8     cat
dtype: object
```
<br>
<br>

## Merge
① Concat(concatenate, 연결)

```python
# 객체들 연결 - concat():
>>> df = pd.DataFrame(np.random.randn(10, 4))
>>> df
          0         1         2         3
0 -0.548702  1.467327 -1.015962 -0.483075
1  1.637550 -1.217659 -0.291519 -1.745505
2 -0.263952  0.991460 -0.919069  0.266046
3 -0.709661  1.669052  1.037882 -1.705775
4 -0.919854 -0.042379  1.247642 -0.009920
5  0.290213  0.495767  0.362949  1.548106
6 -1.131345 -0.089329  0.337863 -0.945867
7 -0.932132  1.956030  0.017587 -0.016692
8 -0.575247  0.254161 -1.143704  0.215897
9  1.193555 -0.077118 -0.408530 -0.862495

# 쪼갠 것 다시 합치기
>>> pieces = [df[:3], df[3:7], df[7:]]       # 연결된것 쪼개기
>>> pd.concat(pieces)
          0         1         2         3
0 -0.548702  1.467327 -1.015962 -0.483075
1  1.637550 -1.217659 -0.291519 -1.745505
2 -0.263952  0.991460 -0.919069  0.266046
3 -0.709661  1.669052  1.037882 -1.705775
4 -0.919854 -0.042379  1.247642 -0.009920
5  0.290213  0.495767  0.362949  1.548106
6 -1.131345 -0.089329  0.337863 -0.945867
7 -0.932132  1.956030  0.017587 -0.016692
8 -0.575247  0.254161 -1.143704  0.215897
9  1.193555 -0.077118 -0.408530 -0.862495
```
<br>

② Join: SQL 스타일 합병
```python
>>> left = pd.DataFrame({'key': ['foo', 'bar'], 'lval': [1, 2]})
>>> right = pd.DataFrame({'key': ['foo', 'bar'], 'rval': [4, 5]})
>>> left 
   key  lval
0  foo     1
1  bar     2
>>> right
   key  rval
0  foo     4
1  bar     5
>>> pd.merge(left, right, on='key')
   key  lval  rval
0  foo     1     4
1  bar     2     5
```
<br>

③ Append(첨부하다)
```python
>>> df = pd.DataFrame(np.random.randn(8, 4), columns=['A', 'B', 'C', 'D'])
>>> df
          A         B         C         D
0  1.346061  1.511763  1.627081 -0.990582
1 -0.441652  1.211526  0.268520  0.024580
2 -1.577585  0.396823 -0.105381 -0.532532
3  1.453749  1.208843 -0.080952 -0.264610
4 -0.727965 -0.589346  0.339969 -0.693205
5 -0.339355  0.593616  0.884345  1.591431
6  0.141809  0.220390  0.435589  0.192451
7 -0.096701  0.803351  1.715071 -0.708758

>>> s = df.iloc[3]
>>> df.append(s, ignore_index=True)
          A         B         C         D
0  1.346061  1.511763  1.627081 -0.990582
1 -0.441652  1.211526  0.268520  0.024580
2 -1.577585  0.396823 -0.105381 -0.532532
3  1.453749  1.208843 -0.080952 -0.264610
4 -0.727965 -0.589346  0.339969 -0.693205
5 -0.339355  0.593616  0.884345  1.591431
6  0.141809  0.220390  0.435589  0.192451
7 -0.096701  0.803351  1.715071 -0.708758
8  1.453749  1.208843 -0.080952 -0.264610
```
<br>
<br>

## Grouping
```python
>>> df = pd.DataFrame({'A': ['foo', 'bar', 'foo', 'bar',
>>>                           'foo', 'bar', 'foo', 'foo'],
>>>                     'B': ['one', 'one', 'two', 'three',
>>>                           'two', 'two', 'one', 'three'],
>>>                     'C': np.random.randn(8),
>>>                     'D': np.random.randn(8)})
>>> df 
     A      B         C         D
0  foo    one -1.202872 -0.055224
1  bar    one -1.814470  2.395985
2  foo    two  1.018601  1.552825
3  bar  three -0.595447  0.166599
4  foo    two  1.395433  0.047609
5  bar    two -0.392670 -0.136473
6  foo    one  0.007207 -0.561757
7  foo  three  1.928123 -1.623033

# 그룹핑하고 2. 결과 그룹에 sum()함수 적용
>>> df.groupby('A').sum()                   
A           C        D                  
bar -2.802588  2.42611
foo  3.146492 -0.63958

# 복수개의 그룹으로 그루핑하고 sum()함수 적용
>>> df.groupby(['A', 'B']).sum()            
A   B             C         D                 
bar one   -1.814470  2.395985                # 계층구조의 인덱스 형태로 그룹핑됨
    three -0.595447  0.166599
    two   -0.392670 -0.136473
foo one   -1.195665 -0.616981
    three  1.928123 -1.623033
    two    2.414034  1.600434
```
<br>
<br>

## Reshaping
① Stack
```python
>>> tuples = list(zip(*[['bar', 'bar', 'baz', 'baz',
>>>                       'foo', 'foo', 'qux', 'qux'],
>>>                      ['one', 'two', 'one', 'two',
>>>                       'one', 'two', 'one', 'two']]))
>>> index = pd.MultiIndex.from_tuples(tuples, names=['first', 'second'])
>>> df = pd.DataFrame(np.random.randn(8, 2), index=index, columns=['A', 'B'])
>>> df2 = df[:4]
>>> df2
first second        A         B
bar   one     0.029399 -0.542108
      two     0.282696 -0.087302
baz   one    -1.575170  1.771208
      two     0.816482  1.100230

# stack() 메소드 - 데이터 프레임의 한 레벨을 압축(compresses)
>>> stacked = df2.stack()
>>> stacked 
first  second   
bar    one     A    0.029399
               B   -0.542108
       two     A    0.282696
               B   -0.087302
baz    one     A   -1.575170
               B    1.771208
       two     A    0.816482
               B    1.100230
dtype: float64

# 스택 형태의 데이터 프레임이나 시리즈에서, unstack() - stack()의 반대
>>> stacked.unstack()
first second        A         B                  
bar   one     0.029399 -0.542108
      two     0.282696 -0.087302
baz   one    -1.575170  1.771208
      two     0.816482  1.100230

>>> stacked.unstack(1)
second        one       two
first                      
bar   A  0.029399  0.282696
      B -0.542108 -0.087302
baz   A -1.575170  0.816482
      B  1.771208  1.100230

>>> stacked.unstack(0)
first          bar       baz
second                      
one    A  0.029399 -1.575170
       B -0.542108  1.771208
two    A  0.282696  0.816482
       B -0.087302  1.100230
```
<br>
<br>

## Pivot Tables
* 피벗테이블이란 방대한 데이터가 있을 때, 요약할 수 있는 테이블
* 자료 정리 기준(필드)를 직접 선택할 수 있기에, 보고 싶은것만 간략하게 정리 가능

```python
>>> df = pd.DataFrame({'A': ['one', 'one', 'two', 'three'] * 3,
>>>                     'B': ['A', 'B', 'C'] * 4,
>>>                     'C': ['foo', 'foo', 'foo', 'bar', 'bar', 'bar'] * 2,
>>>                     'D': np.random.randn(12),
>>>                     'E': np.random.randn(12)})
>>> df
        A  B    C         D         E
0     one  A  foo  1.418757 -0.179666
1     one  B  foo -1.879024  1.291836
2     two  C  foo  0.536826 -0.009614
3   three  A  bar  1.006160  0.392149
4     one  B  bar -0.029716  0.264599
5     one  C  bar -1.146178 -0.057409
6     two  A  foo  0.100900 -1.425638
7   three  B  foo -1.035018  1.024098
8     one  C  foo  0.314665 -0.106062
9     one  A  bar -0.773723  1.824375
10    two  B  bar -1.170653  0.595974
11  three  C  bar  0.648740  1.167115

# 피봇 테이블 생성
>>> pd.pivot_table(df, values='D', index=['A', 'B'], columns=['C'])
C             bar       foo
A     B                    
one   A -0.773723  1.418757
      B -0.029716 -1.879024
      C -1.146178  0.314665
three A  1.006160       NaN
      B       NaN -1.035018
      C  0.648740       NaN
two   A       NaN  0.100900
      B -1.170653       NaN
      C       NaN  0.536826
```
<br>
<br>

## Time Series

```python
>>> rng = pd.date_range('1/1/2012', periods=100, freq='S')
>>> ts = pd.Series(np.random.randint(0, 500, len(rng)), index=rng)
>>> ts.resample('5Min').sum()
2012-01-01    25083
Freq: 5T, dtype: int64

# 타임존 표현
>>> rng = pd.date_range('3/6/2012 00:00', periods=5, freq='D')
>>> ts = pd.Series(np.random.randn(len(rng)), rng)
>>> ts 
2012-03-06    0.464000
2012-03-07    0.227371
2012-03-08   -0.496922
2012-03-09    0.306389
2012-03-10   -2.290613
Freq: D, dtype: float64

>>> ts_utc = ts.tz_localize('UTC')
>>> ts_utc
2012-03-06 00:00:00+00:00    0.464000
2012-03-07 00:00:00+00:00    0.227371
2012-03-08 00:00:00+00:00   -0.496922
2012-03-09 00:00:00+00:00    0.306389
2012-03-10 00:00:00+00:00   -2.290613
Freq: D, dtype: float64

# 다른 타임존으로 전환
>>> ts_utc.tz_convert('US/Eastern') 
2012-03-05 19:00:00-05:00    0.464000
2012-03-06 19:00:00-05:00    0.227371
2012-03-07 19:00:00-05:00   -0.496922
2012-03-08 19:00:00-05:00    0.306389
2012-03-09 19:00:00-05:00   -2.290613
Freq: D, dtype: float64

# Converting between time span representations
>>> rng = pd.date_range('1/1/2012', periods=5, freq='M')
>>> ts = pd.Series(np.random.randn(len(rng)), index=rng)
>>> ts
2012-01-31   -1.134623
2012-02-29   -1.561819
2012-03-31   -0.260838
2012-04-30    0.281957
2012-05-31    1.523962
Freq: M, dtype: float64

>>> ps = ts.to_period()
>>> ps
2012-01   -1.134623
2012-02   -1.561819
2012-03   -0.260838
2012-04    0.281957
2012-05    1.523962
Freq: M, dtype: float64

>>> ps.to_timestamp()
2012-01-01   -1.134623
2012-02-01   -1.561819
2012-03-01   -0.260838
2012-04-01    0.281957
2012-05-01    1.523962
Freq: MS, dtype: float64

# period와 timestamp 사이 전환
# a quarterly frequency with year ending in November에서 
# to 9am of the end of the month following the quarter end로 전환
>>> prng = pd.period_range('1990Q1', '2000Q4', freq='Q-NOV')     
>>> ts = pd.Series(np.random.randn(len(prng)), prng)
>>> ts.index = (prng.asfreq('M', 'e') + 1).asfreq('H', 's') + 9
>>> ts.head()
1990-03-01 09:00   -0.902937
1990-06-01 09:00    0.068159
1990-09-01 09:00   -0.057873
1990-12-01 09:00   -0.368204
1991-03-01 09:00   -1.144073
Freq: H, dtype: float64
```
<br>
<br>

## Categoricals
* 판다스는 Categorical data를 데이터 프래임에 포함함

```python
# raw grades를 categorical data type으로 전환
>>> df = pd.DataFrame({"id": [1, 2, 3, 4, 5, 6],
>>>                    "raw_grade": ['a', 'b', 'b', 'a', 'a', 'e']})
>>> df["grade"] = df["raw_grade"].astype("category")
>>> df["grade"]
0    a
1    b
2    b
3    a
4    a
5    e
Name: grade, dtype: category
Categories (3, object): [a, b, e]

# 카테고리들 이름 재설정
>>> df["grade"].cat.categories = ["very good", "good", "very bad"]

# 카테고리들 재정리와 동시에 누락된 카테고리 추가
>>> df["grade"] = df["grade"].cat.set_categories(["very bad", "bad", "medium",
>>>                                               "good", "very good"])
>>> df["grade"]
0    very good
1         good
2         good
3    very good
4    very good
5     very bad
Name: grade, dtype: category
Categories (5, object): [very bad, bad, medium, good, very good]

# 카테고리 정렬 기준은 순서, 어휘순 아님
>>> df.sort_values(by="grade")
   id raw_grade      grade
5   6         e   very bad
1   2         b       good
2   3         b       good
0   1         a  very good
3   4         a  very good
4   5         a  very good

# categorical column에 의한 그룹핑은 빈 카테고리들을 보여줌
In [134]: df.groupby("grade").size()
Out[134]: 
grade
very bad     1
bad          0
medium       0
good         2
very good    3
dtype: int64
```
<br>
<br>

## Plotting
* 등고선이나 평면도 등을 그리는 조작

```python
>>> ts = pd.Series(np.random.randn(1000),
>>>                index=pd.date_range('1/1/2000', periods=1000))
>>> ts = ts.cumsum()
>>> ts.plot()
<matplotlib.axes._subplots.AxesSubplot at 0x7f2b5771ac88>
```
<br>
<center>
  <img src="https://user-images.githubusercontent.com/46369038/107741165-f7abaf80-6d4f-11eb-9c76-fb9d63d4f70d.png" width="550px">
</center>
<br>

```python
# 데이터 프레임에서 plot() 메소드는 모든 라벨을 가진 컬럼들의 도표를 그려줌
>>> df = pd.DataFrame(np.random.randn(1000, 4), index=ts.index,
>>>                    columns=['A', 'B', 'C', 'D'])
>>> df = df.cumsum()
>>> plt.figure()
<Figure size 640x480 with 0 Axes>
>>> df.plot()
<matplotlib.axes._subplots.AxesSubplot at 0x7f2b53a2d7f0>
>>> plt.legend(loc='best')
<matplotlib.legend.Legend at 0x7f2b539728d0>
```

<br>
<center>
  <img src="https://user-images.githubusercontent.com/46369038/107741193-06926200-6d50-11eb-91ec-9287a225cf59.png" width="550px">
</center>
<br>
<br>

## Getting Data In/Out
① CSV

```python
# Writing to a csv file.
>>> df.to_csv('foo.csv')

# Reading from a csv file.
>>> pd.read_csv('foo.csv')
     Unnamed: 0          A          B         C          D
0    2000-01-01   0.266457  -0.399641 -0.219582   1.186860
1    2000-01-02  -1.170732  -0.345873  1.653061  -0.282953
2    2000-01-03  -1.734933   0.530468  2.060811  -0.515536
3    2000-01-04  -1.555121   1.452620  0.239859  -1.156896
..          ...        ...        ...       ...        ...
996  2002-09-23  -9.558560  -8.781216 -4.499815  30.518439
997  2002-09-24  -9.902058  -9.340490 -4.386639  30.105593
998  2002-09-25 -10.216020  -9.480682 -3.933802  29.758560
999  2002-09-26 -11.856774 -10.671012 -3.216025  29.369368
[1000 rows x 5 columns]
```
<br>

② Excel

```python
# Writing to an excel file.
>>> df.to_excel('foo.xlsx', sheet_name='Sheet1')

# Reading from an excel file.
>>> pd.read_excel('foo.xlsx', 'Sheet1', index_col=None, na_values=['NA'])
    Unnamed: 0          A          B         C          D
0   2000-01-01   0.266457  -0.399641 -0.219582   1.186860
1   2000-01-02  -1.170732  -0.345873  1.653061  -0.282953
2   2000-01-03  -1.734933   0.530468  2.060811  -0.515536
3   2000-01-04  -1.555121   1.452620  0.239859  -1.156896
..         ...        ...        ...       ...        ...
996 2002-09-23  -9.558560  -8.781216 -4.499815  30.518439
997 2002-09-24  -9.902058  -9.340490 -4.386639  30.105593
998 2002-09-25 -10.216020  -9.480682 -3.933802  29.758560
999 2002-09-26 -11.856774 -10.671012 -3.216025  29.369368
[1000 rows x 5 columns]
```
<br>

③ HDF5

```python
# Writing to a HDF5 Store.
>>> df.to_hdf('foo.h5', 'df')

# Reading from a HDF5 Store.
>>> pd.read_hdf('foo.h5', 'df')
                    A          B         C          D
2000-01-01   0.266457  -0.399641 -0.219582   1.186860
2000-01-02  -1.170732  -0.345873  1.653061  -0.282953
2000-01-03  -1.734933   0.530468  2.060811  -0.515536
...               ...        ...       ...        ...
2002-09-24  -9.902058  -9.340490 -4.386639  30.105593
2002-09-25 -10.216020  -9.480682 -3.933802  29.758560
2002-09-26 -11.856774 -10.671012 -3.216025  29.369368
[1000 rows x 4 columns]
```
<br>
<br>

출처: https://pandas.pydata.org/pandas-docs/stable/getting_started/10min.html﻿