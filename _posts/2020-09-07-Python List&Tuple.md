---
title: "[Python] 파이썬 변수 컬렉션 타입 - 리스트형과 튜플형"
date: 2020-9-7
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

### 리스트와 튜플
* 복수개의 값을 담을 수 있는 데이터 구조로, 실생활에서 사용하는 리스트와 동일한 의미로 이해
* 리스트와 튜플은 순서가 있는 데이터들의 모임으로 동일
* 하지만 리스트는 수정이 가능하나 튜플은 한번 만들면 수정 불가능 (차이점)
<br>
<br>

### 리스트 만들기
- [] 안에 값을 담아서 생성
- list() 함수로 생성
- str.split()함수로 생성

#### [] 안에 값을 담아서 생성

```python
a = [] # 빈 리스트 생성
print(a)

a = [1, 2, 3, 5, 10]
print(a)

a = ['korea', 'canada', 1, 23, [34, 56]] # 리스트 안에 리스트 가능
print(a)
```
<br>
<br>

#### list() 함수로 생성
- 다른 데이터 타입을 리스트로 변환할 때도 사용

```python
a = 'hello world'
b = list(a)
print(b)           # 리스트의 각 문자열을 리스트로 출력

c = (1, 2, 3)      # 튜플도 리스트로 변경해 생성
d = list(c)
print(d)
```
<br>
<br>

#### str.split()함수로 생성
- 구분자로 구분되는 리스트를 반환

```python
a = 'hello world nice weather'
b = a.split()

print(b)
```
<br>
<br>

### 리스트 indexing
* 문자열의 인덱싱과 동일하게 동작
* [] 연산자를 이용하여 항목 얻어오기
* [i]는 i번째 원소를 반환한다는 뜻
* i가 음수인 경우도 가능하며 마지막원소가 -1로 하여 앞으로 갈때마다 1씩 감소함

```python
a = [1, 2, 3, 4, 5, 6]
print(a[2])
print(a[5])
print(a[-1])
```
<br>
<br>

#### 리스트 개별 아이템에 접근
- 인덱스에 접근하여 값을 업데이트 가능

```python
a = 'hello world'               # 문자열은 불변(immutable) 객체
print(a[0])
a[0] = 'j'
------------------------------
b = 'jello world'               # 새로 쓰거나
c = 'j' + a[1:]                 # 수정해서 붙이거나
print(b,c)
------------------------------
d = a.replace('h', 'j')
print(d)
print(a)                        # replace해도 원본 a는 변하지 않음
------------------------------
a = [1, 2, 3, 4, 5]             # 리스트는 객체 수정이 가능함
a[0] = 100
a[-1] = 90
print(a)
```
<br>
<br>

### 리스트 slicing
- 문자열 슬라이싱과 동일하게 동작
- 슬라이싱의 결과 역시 list!

```python
a = [1, 2, 3, 4, 5, 6, 7, 8]
print(a[4:7])
print(a[:7])
print(a[3:])
print(a[:])
------------------------------
# start:end:increment (increment 기본값 = 1씩 증가)
print(a[1:7])
print(a[1:7:2])
print(a[1:7:4])
```
<br>
<br>

### 리스트 관련 함수
- 생성된 리스트 객체에 동작하는 함수

#### append()
- 리스트의 끝에 항목을 추가함

```python
a = [1, 2, 3, 4, 5]
a.append(10)
print(a)
```
<br>
<br>

#### extend()
- 리스트를 연장
- += 로도 가능함

```python
a = [1, 2, 3, 4, 5]
b = [6, 7, 8, 9, 10]
a.append(b)
print(a)
------------------------------
#.extend
a = [1, 2, 3, 4, 5]
b = [6, 7, 8, 9, 10]
a.extend(b)
# a += b
print(a)
```
<br>
<br>

#### insert()로 항목추가
- .append는 마지막에만 추가하는데 .insert는 원하는 위치에 추가
- .insert( , )에서 앞에 인덱스, 뒤에 아이템 명시

```python
a = [1, 3, 4, 5, 6]
a.insert(1, 40)                # 1번째 인덱스에 40을 추가
print(a)
```
<br>
<br>

#### remove()
- .remove는 지정값으로 삭제

```python
a = [1, 2, 30, 4, 5]
a.remove(30)                   # 30 값으로 제외
print(a)
```
<br>
<br>

#### pop()
- 지우고자 하는 아이템을 반환 후, 삭제
- .pop() 인덱스로 삭제하며, 아무것도 안쓰면 마지막 것으로 삭제

```python
a = [1, 2, 3, 4, 5]
a.pop(0)               # 0번째 인덱스 삭제
print(a)
------------------------------
a = [1, 2, 3, 4, 5]
d = a.pop(0)
print(a)
print(d)             # 지움과 동시에 지워진 요소 출력
```
<br>
<br>

#### index()
- 찾고자 하는 값의 인덱스 반환

```python
a = [2, 6, 7, 9, 10]
a.index(6)                # 숫자 6의 인덱스(순서) 알려줌
```
<br>
<br>

#### in 키워드
- value in [list]: 리스트 내에 해당 값이 존재하는지 확인
- True, False 중 한가지로 반환

```python
a = [1, 2, 3, 4, 5, 10]
b = 7
c = b in a               # a 안에 b가 있는지
print(c)                 # False
```
<br>
<br>

#### list 정렬
- sort() 리스트 자체를 내부적으로 정렬
- sorted() 리스트의 정렬된 복사본을 반환

```python
a = [9, 10, 7, 19, 1, 2, 20, 21, 7, 8]
# a.sort()                  # 오름차순 ascending order
# a.sort(reverse=True)      # reverse=True하면 내림차순

b = sorted(a)               # a를 정렬해서 b라는 새로운 리스트에 담음 
print(a)
print(b)
------------------------------
a = [9, 10, 7, 19, 1, 2, 20, 21, 7, 8]
a.sort(reverse=True)        # reverse=True하면 내림차순
b = sorted(a)               # a를 정렬해서 b라는 새로운 리스트에 담음 
print(a)
print(b)
```
<br>
<br>
<br>

## tuple
- 리스트와 같이 복수개의 값을 갖는 컬렉션 타입
- 생성된 후 변경이 불가능

```python
a = [1, 2, 3]               # 리스트는 [], 튜플은 ()
b = (1, 2, 3)
print(type(a))
print(type(b))

a[0] = 100                   # 리스트는 수정 가능
print(a)

b[0] = 100                   # 튜플은 한번 생성하면 수정 안됨
print(b)
```
<br>
<br>

### tuple unpacking
- 튜플의 값을 차례대로 변수에 대입

```python
a = (100, 200)
type(a)
------------------------------
a = 100, 200                     # 괄호 없어도 튜플처리됨 
a, b = 100, 200

print(a)
print(a, b)
```
<br>
<br>
