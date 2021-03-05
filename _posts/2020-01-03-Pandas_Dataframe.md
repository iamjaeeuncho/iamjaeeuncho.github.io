---
title: "[Python] 파이썬 Pandas 자료구조 - Dataframe"
date: 2020-1-3
categories:
  - study
tags:
  - python
toc: true
toc_sticky: true
---

## 1. 데이터 프레임 인덱싱, 셀렉션

<center>
<img src="https://user-images.githubusercontent.com/46369038/107740943-91269180-6d4f-11eb-9a8b-4103d53289a6.png" width="550px"><br>
<i>credit: https://pandas.pydata.org/pandas-docs/stable/getting_started/dsintro.html#series-is-dict-like</i><br>
</center>

```python
# 데이터 프레임 선택, 추가, 삭제, 삽입
>>> df['three'] = df['one'] * df['two']          # 새로운 컬럼 추가
>>> df['flag'] = df['one'] > 2
>>> df
   one  two  three   flag
a  1.0  1.0    1.0  False
b  2.0  2.0    4.0  False
c  3.0  3.0    9.0   True
d  NaN  4.0    NaN  False

>>> df['one']                                    # 변수명[' ']은 해당값 선택
a    1.0
b    2.0
c    3.0
d    NaN
Name: one, dtype: float64

>>> df.one                                     # 컬럼 선택
   flag
a  1.0
b  2.0
c  3.0
d  NaN
Name: one, dtype: float64

>>> del df['two']                                # del 변수명['']은 해당값 삭제
>>> three = df.pop('three')
>>> df
   one   flag
a  1.0  False
b  2.0  False
c  3.0   True
d  NaN  False

>>> df.drop(['a', 'd'])                         # .drop으로 row와 column 삭제
>>> df
   one   flag
b  2.0  False
c  3.0   True

>>> df.drop(['flag'], axis=1)                   # axis 1을 주고 한 축 삭제 가능
>>> df
   one
b  2.0
c  3.0

>>> df['one_trunc'] = df['one'][:2]              # 삽입
>>> df
   one   flag  foo  one_trunc
a  1.0  False  bar        1.0
b  2.0  False  bar        2.0
c  3.0   True  bar        NaN
d  NaN  False  bar        NaN

>>> df.insert(1, 'bar', df['one'])               # 삽입 2
>>> df
   one  bar   flag  foo  one_trunc
a  1.0  1.0  False  bar        1.0
b  2.0  2.0  False  bar        2.0
c  3.0  3.0   True  bar        NaN
d  NaN  NaN  False  bar        NaN

>>> df.loc['b']                                  #  df.loc[label]: 라벨에 의한 줄선택
one              2
bar              2
flag         False
foo            bar
one_trunc        2
Name: b, dtype: object

>>> df.iloc[2]                                   #  df.iloc[loc]: 숫자에 의한 줄선택
one             3
bar             3
flag         True
foo           bar
one_trunc     NaN
Name: c, dtype: object
```
<br>
<br>

## 2. 데이터 프레임 정렬 및 연산
* 데이터프레임 객체간 정렬은 둘의 컬럼과 인덱스에 의해서 자동으로 정렬된다.

```python
>>> df = pd.DataFrame(np.random.randn(10, 4), columns=['A', 'B', 'C', 'D'])
>>> df2 = pd.DataFrame(np.random.randn(7, 3), columns=['A', 'B', 'C'])
>>> df + df2
          A         B         C   D
0  0.045691 -0.014138  1.380871 NaN
1 -0.955398 -1.501007  0.037181 NaN
2 -0.662690  1.534833 -0.859691 NaN
3 -2.452949  1.237274 -0.133712 NaN
4  1.414490  1.951676 -2.320422 NaN
5 -0.494922 -1.649727 -1.084601 NaN
6 -1.047551 -0.748572 -0.805479 NaN
7       NaN       NaN       NaN NaN
8       NaN       NaN       NaN NaN
9       NaN       NaN       NaN NaN
```
<br>

* 데이터 프레임 콘솔 보여주기

```python
# 1. 보여주기 - print 
>>> baseball = pd.read_csv('data/baseball.csv')
>>> print(baseball)
       id     player  year  stint team  lg   g   ab   r    h  X2b  X3b  hr   rbi   sb   cs  bb    so  ibb  hbp   sh   sf  gidp
0   88641  womacto01  2006      2  CHN  NL  19   50   6   14    1    0   1   2.0  1.0  1.0   4   4.0  0.0  0.0  3.0  0.0   0.0
1   88643  schilcu01  2006      1  BOS  AL  31    2   0    1    0    0   0   0.0  0.0  0.0   0   1.0  0.0  0.0  0.0  0.0   0.0
..    ...        ...   ...    ...  ...  ..  ..  ...  ..  ...  ...  ...  ..   ...  ...  ...  ..   ...  ...  ...  ...  ...   ...
98  89533   aloumo01  2007      1  NYN  NL  87  328  51  112   19    1  13  49.0  3.0  0.0  27  30.0  5.0  2.0  0.0  3.0  13.0
99  89534  alomasa02  2007      1  NYN  NL   8   22   1    3    1    0   0   0.0  0.0  0.0   0   3.0  0.0  0.0  0.0  0.0   0.0
[100 rows x 23 columns]

# 2. 보여주기 - info
>>> baseball.info()
<class 'pandas.core.frame.DataFrame'>
RangeIndex: 100 entries, 0 to 99
Data columns (total 23 columns):
id        100 non-null int64
player    100 non-null object
...       ... ........ .....
sf        100 non-null float64
gidp      100 non-null float64
dtypes: float64(9), int64(11), object(3)
memory usage: 18.0+ KB

# 3. 보여주기 - to_string: 데이터 프레임의 스트링 표현 돌려줌
>>> print(baseball.iloc[-20:, :12].to_string())
       id     player  year  stint team  lg    g   ab   r    h  X2b  X3b
80  89474  finlest01  2007      1  COL  NL   43   94   9   17    3    0
81  89480  embreal01  2007      1  OAK  AL    4    0   0    0    0    0
..  .....  .........  ....      .  ...  ..    .   ..  ..  ...   ..    .
98  89533   aloumo01  2007      1  NYN  NL   87  328  51  112   19    1
99  89534  alomasa02  2007      1  NYN  NL    8   22   1    3    1    0

# 4. 보여주기 - display.width: 한 줄에 얼마큼 보여줄지 세팅
>>> pd.set_option('display.width', 40)           # default is 80
>>> pd.DataFrame(np.random.randn(3, 12))
         0         1         2         3         4         5         6         7         8         9         10        11
0  1.262731  1.289997  0.082423 -0.055758  0.536580 -0.489682  0.369374 -0.034571 -2.484478 -0.281461  0.030711  0.109121
1  1.126203 -0.977349  1.474071 -0.064034 -1.282782  0.781836 -1.071357  0.441153  2.353925  0.583787  0.221471 -0.744471
2  0.758527  1.729689 -0.964980 -0.845696 -1.340896  1.846883 -1.328865  1.682706 -1.717693  0.888782  0.228440  0.901805

# 5. 보여주기 - display.max_colwidth: 낱개의 컬럼 최대로 얼마나 보여줄지 세팅
>>> pd.set_option('display.max_colwidth', 30)
>>> pd.DataFrame(datafile)
      filename                           path
0  filename_01  media/user_name/storage/fo...
1  filename_02  media/user_name/storage/fo...
```
<br>
<br>

## 3. 데이터프레임 관련 함수들

```python
# 데이터프레임 관련 함수들
>>> frame.dtypes                            # 데이터프레임변수명.dtypes는 데이터형 확인
state      object
year        int64
capital      bool
dtype: object

>>> frame.index                             # 데이터프레임변수명.index는 index 범위값 확인
RangeIndex(start=0, stop=4, step=1)

>>> frame.columns                           # 데이터프레임변수명.columns는 컬럼명 확인
Index(['state', 'year', 'capital'], dtype='object')

>>> frame.values                            # 데이터프레임변수명.values는 벨류값 확인
array([['Seoul', 2012, True],
       ['Busan', 2013, False],
       ['Pohang', 2014, False],
       ['Gimhae', 2015, False]], dtype=object)

>>> frame.index.name = "No."                # index 이름 설정
>>> frame.columns.name = "Info"             # column 이름 설정
>>> frame
Info state year capital
No.   
0 Seoul 2012 True
1 Busan 2013 False
2 Pohang 2014 False
3 Gimhae 2015 False

>>> frame.describe()                       # 연산 가능한 숫자 컬럼을 뽑아 기본 통계량 산출
Info year
count 4.000000
mean 2013.500000
std 1.290994
min 2012.000000
25% 2012.750000
50% 2013.500000
75% 2014.250000
max 2015.000000

>>> pd.DataFrame.from_dict(dict([('A', [1, 2, 3]), ('B', [4, 5, 6])]),
                        orient='index', columns=['one', 'two', 'three']) 
   one  two  three                               # .from_dict
A    1    2      3
B    4    5      6

>>> pd.DataFrame.from_records(data, index='C')   # .from_records
          A    B
C               
b'Hello'  1  2.0
b'World'  2  3.0
```
<br>
<br>

※ reference
  * 10 minutes to pandas https://pandas.pydata.org/pandas-docs/stable/getting_started/10min.html
  * 번역본 10분 판다스 https://dataitgirls2.github.io/10minutes2pandas/
  * 판다스 자료구조 https://yujuwon.tistory.com/entry/Pandas-자료구조 