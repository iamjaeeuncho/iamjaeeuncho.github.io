---
title: "[Python] 파이썬 딕셔너리 자료형 - 추가, 삭제, Value 값 찾기, 함수들"
date: 2019-12-18
categories:
  - study
tags:
  - python
toc: true
toc_sticky: true
---

## 딕셔너리(Dictionary)란?
* Key와 Value라는 대응 관계를 한 쌍으로 갖는 자료형태로, 이를 연관 배열(Associative array) 또는 해시(Hash)라고 한다.
* 예를 들어, Key가 "baseball"이라면 Value는 "야구"다. 
* 특징: 딕셔너리는 리스트나 튜플처럼 순차적으로(sequential) 해당 요소값을 구하지 않고 Key를 통해 Value를 얻는다. baseball이라는 단어의 뜻을 찾기 위해 사전의 내용을 순차적으로 모두 검색하는 것이 아니라 baseball이라는 단어가 있는 곳만 펼쳐 보는 것.
* 빈 리스트를 [ ], 빈 튜플을 (), 빈 딕셔너리 {}
<br>
<br>

## 1. 딕셔너리(Dictionary) 만드는 법
* 각각의 요소는 Key : Value 형태로 이루어져 있고 쉼표(,) 로 구분되어 있다.
* Key에는 변하지 않는 값을 사용하고, Value에는 변하는 값과 변하지 않는 값 모두 사용할 수 있다.

```python
>>> dic = {'name':'pey', 'phone':'0119993323', 'birth': '1118'}
# 위에서 Key는 각각 'name', 'phone', 'birth'이고, 
# 각각의 Key에 해당하는 Value는 'pey', '0119993323', '1118'이 된다.

>>> a = {1: 'hi'}
# Key로 정수값 1, Value로 'hi'라는 문자열을 사용

>>> a = { 'a': [1,2,3]}
# Value에 리스트도 넣을 수 있음
```
<br>
<br>

## 2. 딕셔너리(Dictionary) 추가, 삭제

```python
# 딕셔너리 쌍 추가하기
>>> a = {1: 'a'}
>>> a[2] = '[1, 2, 3]'       # {1: 'a'}라는 딕셔너리에 a[2] = '[1, 2, 3]'를 입력하면
>>> a                        # 딕셔너리 a에 Key와 Value가 각각 2와'[1, 2, 3]'인 딕셔너리 쌍이 추가
{1: 'a', 2: 'b'}         

# 딕셔너리 요소 삭제하기
>>> del a[1]                 # del 함수를 사용해서 del a[key]처럼 입력하면
>>> a                        # 지정한 key에 해당하는 {key : value} 쌍이 삭제
{2: 'b', 'name': 'pey', 3: [1, 2, 3]}
```
<br>
<br>

## 3. 딕셔너리(Dictionary)에서 Key 사용해 Value 얻기
* 리스트나 튜플, 문자열은 요소값을 얻어내고자 할 때 인덱싱이나 슬라이싱 기법 중 하나를 이용했다. 
하지만 딕셔너리는 인덱싱을 사용할 수 없고, 대신 Key를 사용해서 Value를 얻어내는 방법밖에 없다.
* 유일한 값인 Key값 설정시 주의점
  * 딕셔너리 Key는 고유값이므로 중복되면 하나를 제외한 나머지 것들이 모두 무시된다.
  * 튜플의 값은 변하지 않으므로 딕셔너리 Key로 쓸 수 있지만, 값이 변하는 리스트는 딕셔너리 Key로 쓸 수 없다

```python
# Key 사용해 Value 얻기
>>> a = {1:'a', 2:'b'}
>>> a[1]                # 여기서 a[1]이 의미하는 것은 리스트나 튜플의 a[1]과는 전혀 다르다. 
'a'                     # 딕셔너리 [ ] 안의 숫자 1은 두 번째 요소가 아니라 Key값 1을 나타낸다.
>>> a[2]
'b'

# Key값이 중복될 때, 하나를 제외한 나머지 것들이 모두 무시된다
>>> a = {1:'a', 1:'b'}
>>> a
{1: 'b'}
```
<br>
<br>

## 4. 딕셔너리(Dictionary) 관련 함수들

```python
>>> a = {'name': 'pey', 'phone': '0119993323', 'birth': '1118'}

# Key 값 리스트 만들기(keys)
>>> a.keys()                               #.keys()는 Key값만을 모아서 dict_keys라는 객체 리턴    
dict_keys(['name', 'phone', 'birth'])      #dict_keys는 리스트를 사용하는 것과 차이가 없음
                                           
# Value 값 리스트 만들기(values)
>>> a.values()                             #.values()는 Value값만 모아서 dict_values 객체 리턴
dict_values(['pey', '0119993323', '1118']) #dict_values 객체도 리스트 사용과 동일하게 사용 가능


# dict_keys 객체를 리스트로 변환 
>>> list(a.keys())                         #dict_keys와 dict_values는 리스트처럼 쓸 수 있으나
['name', 'phone', 'birth']                 #리스트 고유 함수 쓸 수 없어서 리스트로 변환 필요

# Key, Value 쌍 얻기(items)               # .items은 key, value 쌍을 튜플로 묶은 값을 
>>> a.items()                             # dict_items 객체로 돌려줌
dict_items([('name', 'pey'), ('phone', '0119993323'), ('birth', '1118')])

# Key: Value 쌍 모두 지우기(clear)
>>> a.clear()                             # clear() 함수는 딕셔너리 안의 모든 요소를 삭제
>>> a
{}                                        # { }는 빈 딕셔너리 표현

# Key로 Value얻기(get)
>>> a = {'name':'pey', 'phone':'0119993323', 'birth': '1118'}
>>> a.get('name')                         # get(x) 함수는 x라는 key에 대응되는 value를 돌려줌
'pey'                                     # a.get('name')은 a['name']와 동일한 결과값 리턴

# 딕셔너리에 없는 키로 값을 가져오려고 할 경우,
>>> print(a.get('nokey'))                 # a.get('nokey')는 None을 리턴
None                                      # None은 "거짓"이라는 뜻
>>> print(a['nokey'])
Traceback (most recent call last):        # a['nokey']는 Key 오류를 발생
  File "<stdin>", line 1, in <module>
KeyError: 'nokey'

# 딕셔너리에 없는 키 대신 미리 정해 둔 디폴트 값 가져오게 하고 싶을 때
>>> a.get('foo', 'bar')                   # get(x, '디폴트 값')
'bar'

# 해당 Key가 딕셔너리 안에 있는지 조사하기(in)
>>> 'name' in a                           # 딕셔너리 a에 name 키값이 있으면 True
True
>>> 'email' in a                          # 딕셔너리 a에 name 키값이 없으면 False
False
```
<br>
<br>
<i> ※ credit: 점프 투 파이썬 https://wikidocs.net/book/1 </i>