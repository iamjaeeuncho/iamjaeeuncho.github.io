---
title: "[Python] 파이썬 변수 컬렉션 타입 - 딕셔너리와 세트형"
date: 2020-9-8
categories:
- study
tags:
- python
toc: true
toc_sticky: true
---

## 컬렉션이란?
- 어떤것들의 모음
- 파이썬에는 4가지 컬렉션 타입이 있음: 리스트, 튜플, 딕셔너리, 세트
<br>
<br>

## 딕셔너리형 (Dictionary)
+ 키와 값을 갖는 데이터 구조
+ 키는 내부적으로 hash값으로 저장 -> 동일한 키로 중복 불가능
+ 순서를 따지지 않음. 즉, 인덱스가 없음

```python
# 리스트가 아무리 길어도,
# 인덱스만 알면 그 인덱스 접근하는 시간은 거의 0초. 바로 접근 가능

a = [0, 1, 2, 3, 4, 10, 100, 200, 300]
print(a[0])
print(a[4])
-------------------------------
# []리스트, ()튜플, {}딕셔너리

#     키 : 벨류
# 순서가 없으므로 인덱스도 없음
# 인덱스가 아니라 키값으로 벨류값을 불러옴

a = {'Korea' : 'Seoul',
'Canada' : 'Ottawa',
'USA' : 'Washington D.c'}
print(a)
print(a['Korea'])

b = {0:1, 1:6, 7:9, 8:10}        # 키가 숫자일 뿐, 인덱스는 아님
print(b[0])                      # 키값이 '0'인 것에 인덱스는 1
```

### 항목 추가 및 변경
- 기존에 키가 존재 하면, 새로운 값으로 업데이트
- 존재하지 않으면, 새로운 키, 값 생성

```python
# 초기 세팅은 {}, 나중에 추가할때는 []
a = {'Korea' : 'Seoul',
'Canada' : 'Ottawa',
'USA' : 'Washington D.c'}

# 키는 Hash값을 저장 = 동일한 키가 중복될 수는 없음
# 키는 dictionary안에서 중복 안되고 벨류값만 업데이트
# 벨류는 중복 가능
a['Japan'] = 'Tokyo'
a['Japan'] = 'Kyoto'                 # 업어씀
a['Japan2'] = 'Kyoto'
a['China'] = 'Beijing'

print(a)
```

### 리스트 함수
- 생성된 리스트 객체에 동작하는 함수

#### · update()
* 두 딕셔너리를 병합함
* 겹치는 키가 있다면 parameter로 전달되는 키 값이 overwrite된다.

```python
# .update 두개 딕셔너리 병합할 때, 겹치는 키값 업데이트

a = {'a' : 1, 'b' : 2, 'c' : 3}
b = {'a' : 2, 'd' : 4, 'e' : 5} 

a.update(b)

print(a)
```

#### · key삭제
- del 키워드 사용
- pop 함수 이용

```python
c = 100
del c
------------
a = {'a' : 1, 'b' : 2, 'c' : 3}
print(a)

# a.pop('b')              # b 제외
del a['b']
print(a)

print(c)

```

#### · clear()
+ 딕셔너리의 모든 값을 초기화

```python
print(a)
a.clear()
print(a)
```

#### · in
+ key값 존재 확인
+ O(1) 연산 - 딕셔너리의 크기와 관계없이 항상 연산의 속도가 일정하다는 의미

```
a = {'a' : 1, 'b' : 2, 'c' : 3}
print(a)

print('b' in a)                         # b가 a에 있는지
print('d' in a)

----------------

a = {'a' : 1, 'b' : 2, 'c' : 3}
b = [1, 2, 3, 4, 5, 6, 7, 9, 10, 100]

print(100 in b)                 # 성능저하
print('b' in a)                 # 키는 바로 검색 가능
```

### value access
+ dict[key]로 접급, 키가 없는 경우 에러 발생 
+ .get() 함수로 접근, 키가 없는 경우 None반환

```python
# 키를 통해서 찾음
print(a['b'])
print(a.get('b'))

print(a.get('d'))      # 없는 것은 None으로 반환
print(a['d'])
```

### 모든 keys, values 접근
+ keys() - 키만 반환
+ values() - 값만 반환
+ items() - 키, 값의 튜플을 반환

```python
# .keys 키값만 반환 .values 값만 반환
print(a)
print(a.keys())
print(a.values())

# 각각을 리스트로
print(list(a.keys()))
print(list(a.values()))

# 딕셔너리의 키와 값을 튜플로 반환
list(a.items())

```


## 세트형 (Set)
+ dictionary에서 key만 활용하는 데이터 구조로 이해
+ 수학에서의 집합과 동일한 개념 -> 중복이 안되고 순서가 없음

```python
# dict와 마찬가지로 {}로 이루어졌으나 키벨류 구분 없음
# 중복 제거하고 나옴
# 인덱싱 없음 = 순서 없음
a = {1, 1, 2, 3, 3, 4, 1, 5}
print(a)

print(a[0])
```

### set()으로 집합으로 변환**
```python
a = {}
print(type(a))

b = set()
print(type(b))

------------
a = [1, 1, 2, 3, 3, 4, 1, 5]
print(a)

b = set(a)
print(b)
```

### 세트 연산
- 수학 연산과 동일
- 교집합, 합집합, 차집합 등 지원

```python
a = {1, 2, 3}
b = {2, 3, 4}

print(a.union(b))            # 합집합
print(a.intersection(b))     # 교집합
print(a.difference(b))       # 차집합
print(a.issubset(b))         # 부분집합
```

