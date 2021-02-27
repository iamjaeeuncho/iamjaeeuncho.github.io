---
title: "[Python] 파이썬 반복문 - for"
date: 2020-9-11
categories:
- study
tags:
- python
toc: true
toc_sticky: true
---

## 반복문?
- 반복적인 작업을 가능하게 해주는 도구
- 특정 조건을 만족하는 경우 수행하는 while문과 리스트 같은 컬렉션 타입의 아이템을 하나씩 순회하는 for문이 있음.
- 주의 할 점: while문의 경우, 무한히 수행되므로 반복을 멈추는 장치가 없으면 재부팅 해야함. (false여야지만 나옴)
<br>
<br>

## for 
- 리스트, 문자열 등등 순회 가능한 객체를 순회하면서 값을 처리할 때 사용
- for는 순회가 가능한 아이템들을 자동으로 가져와서 순회하고 종료하는 반면 while은 스스로 제어 안 됨
- 순회할 수 있는건 따로 정해져 있음 - 문자열, 리스트
- 정수/실수는 순서(인덱스)가 없으므로 순회할 수 없음

```python
a = [1, 2, 4, 3, 5]
for i in a:              # i는 그냥 변수명, 다르게 써도 됨
    print (i, i * 2)
print('hahah')
```

### 문자열 아이템 출력하기
```python
a = 'hello world'
for character in a:      # character에 각각의 문자가 들어가며 순회
    print(character)
```
```python

for x in 10:
    print(x)
```

### 리스트 아이템 출력하기
```python
a = [1, 10, 3, 4, 5]
for num in a:
    if num % 2 == 0:           # 짝수인 경우 %2한 값을 출력
        print(num/2)
    else:                      # 홀수인 경우 +1한 값을 출력
        print(num+1)
```

### dict 아이템 출력하기
- dictionary의 경우 기본적으로 순회하게 되면 key값을 참조
- keys()함수를 이용하여 key 값만 순회 가능
- values()함수를 이용하여 value 값만 순회 가능
- items()함수를 이용하여 tuple형태로 key, value 순회 가능

```python
a = {'korea' : 'seoul', 'japan' : 'tokyo', 'canada' : 'ottawa'}

for key in a:                  # 키만 가져옴
    print(key)
------------------------------
for value in a.values():       # 벨류만 가져옴
    print(value)
------------------------------
list(a.items())                # 튜플을 리스트화
------------------------------
for key, value in a.items():   # 튜플 한꺼번에 가져오기
    print(key, value)    
```


### for에서 index 사용하기
- while문에서는 인덱스 지정해서 돌렸으나, for문에서는 인덱스 없이 값만 나옴
- 기본적으로 for문의 경우 값만 추출 가능하나, enumerate 함수 이용시 인덱스와 값 모두 사용 가능

```python
# enumerate(열거하다) 자동으로 인덱스와 벨류값 출력
# 자료형의 현재 순서와 그 값을 쉽게 알 수 있음
a = [1, 2, 3, 4, 5]
for index, value in enumerate(a):
    if index > 3:
        print(index, value)
```


###  break
- for의 경우에도 특정 조건일 때, break로 loop 종료가 가능

```python
a = [100, 90, 80, 70, 60, 50]
for num in a:
    if num < 80:
        break                          # 참이면 종료
    print(num)
```


### continue
- for의 경우에도, 해당 아이템을 건너 뛰고 싶을 때 continue 사용

```python
a = [100, 90, 80, 70, 60, 50]
for num in a:
    if num >= 60 and num <= 70:
        continue                       # 참이면 건너뜀
    print(num)
```


### 중첩 반복문
- 반복문도 중첩하여 사용 가능하며, 중첩의 경우 무한히 가능
- 중첩이라는 것은 반복문 블록의 코드안에 또 반복문의 코드가 작성되는 것을 의미
- 중첩 반복문의 경우 내부 반복문은 외부 반복문이 수행되는 만큼 반복 수행 됨

#### 구구단 출력하기
```python
a = [1, 2, 4]
for i in a:               # i가 1일때
    for j in a:           # j가 1, 2, 4 다 돌아야 끝내고 위로 이동
        print(i * j)
```

```python
y = [1, 2, 3, 4, 5, 6, 7, 8, 9]
x = [2, 3, 4, 5, 6, 7, 8, 9]
for i in x:
    for j in y:
        print(i, '*', j, '=', i * j)
```



### collection의 길이
- len, abs, type, range 등으로 콜렉션 타입의 길이를 가져옴
- cf. 내장함수란 파이썬 내부에 구현되어 있어서, import하지 않고도 사용 가능한 함수를 의미

#### len
- len함수는 컬렉션 타입의 길이를 가져옴
```python
a = [1, 2, 3, 4, 5]
print(len(a))
print(len('hello world'))
```

#### range
- 리스트를 쉽게 만들 수 있는 내장함수
- 주어진 값에 따라 다양한 결과를 반환
 
```python
range(10)       -> [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]     # 1개일때, 0부터 끝 숫자 미포함
range(2, 10)    -> [2, 3, 4, 5, 6, 7, 8, 9]           # 2개일때, 1부터 끝 숫자 미포함
range(2, 10, 3) -> [2, 5, 8]                          # 3개일때, 1부터 끝 숫자 미포함 + 간격
------------------------------
list(range(5, 101, 5))                                # 1부터 100사이의 5의 배수만을 갖는 리스트
------------------------------
list(range(1, 101, 5))                                # 오답 '1 + 간격 5이므로 안됨'
```



## 연습문제

### 구구단을 2 - 9단까지 출력

```python
x = list(range(2, 10))
y = list(range(1, 10))

for i in x:
    for j in y:
        print(i, '*', j, '=', i * j)
```
```python
x = 2
while x <= 9:                # 초기값 2에서 9까지
    y = 1                     # y를 안에 써준 이유 = 항상 초기화가 되야해서
    while y <= 9:
        print(x, 'x', y, '=', x * y)
        y += 1
    x += 1
```

### 1 - 100까지 정수 중 2의 배수 또는 11의 배수를 모두 출력하시오.
```python
nums = list(range(1, 101))
for x in nums:
    if x % 2 == 0 or x % 11 == 0:
        print(x)
```

### 최대값과 최소값을 찾기
```python
# sorted, sort 사용시
a = [22, 1, 3, 4, 7, 98, 21, 55, 87, 99, 19, 20, 45]
a.sort()
a[0], a[-1]
```

```python
# 처음 만나는 수를 최소값으로 가정. 이후 최소값 업데이트
a = [22, 1, 3, 4, 7, 98, 21, 55, 87, 99, 19, 20, 45]

_min = a[0]
for x in a:
    if x < _min:
        _min = x
print(_min)

------------------------------
# 최대값
_max = a[0]
for x in a:
    if x > _max:
        _max = x
print(_max)
```

```python
# 최대, 최소 동시에
_min = a[0]
_max = a[0]

for x in a[1:]:                       # a[0]은 이미 지정했으므로 a[1:]부터로 지정
    if x < _min:
        _min = x
    elif x > _max:
        _max = x
print('최소값', _min, '최대값', _max)
```

### 평균 구하기
```python
a = [22, 1, 3, 4, 7, 98, 21, 55, 87, 99, 19, 20, 45]
total = 0

for i in a:
    total += i
```
```python
# summary % len
i = 0
total = 0

while i < len(a):
    total += a[i]
    i += 1
print(total / len(a))
```