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
- 아래에서 i는 매번 수행 a 아이템으로 순차적으로 변경 되고, 모두 순회되면 for 블록 종료
 
```python
a = [1, 2, 4, 3, 5]
for i in a:
    print (i, i * 2)
```

```python
# while은 스스로 제어한 반면
# for는 순회가 가능한 아이템들을 자동으로 순회 가능
# 자동으로 각각의 아이템을 가져와서 순회하고 종료

a = [1, 2, 4, 3, 5]
for i in a:              # i는 그냥 변수명, 다르게 써도 됨
    print (i, i * 2)
print('hahah')
```

```python
#### 문자열의 아이템 출력하기
 - 문자열의 경우 순회 가능, 리스트의 유사하게 순회 가능

 a = 'hello world'
for character in a:      # character에 각각의 문자가 들어가며 순회
    print(character)
```
```python
# 순회할 수 있는건 따로 정해져 있음 - 문자열, 리스트
# 정수/실수는 순회할 수 없음 bc 순서(인덱스)가 없으므로
for x in 10:
    print(x)
```

```python
#### 리스트 아이템 출력하기

# 짝수인 경우 %2한 값을 출력
# 홀수인 경우 +1한 값을 출력

a = [1, 10, 3, 4, 5]
for num in a:
    if num % 2 == 0:
        print(num/2)
    else:
        print(num+1)
```


#### dict의 아이템 출력하기
  - dictionary의 경우 기본적으로 순회 하게 되면 key값을 참조
  - keys()함수를 이용하여 key 값만 순회 가능
  - values()함수를 이용하여 value 값만 순회 가능
  - items()함수를 이용하여 tuple형태로 key, value 순회 가능

```python
# 키만 가져옴
a = {'korea' : 'seoul', 'japan' : 'tokyo', 'canada' : 'ottawa'}

for key in a:
    print(key)
```

```python
a = {'korea' : 'seoul', 'japan' : 'tokyo', 'canada' : 'ottawa'}

for key in a:
    print(key, a[key])
```

```python
for key in a:
    print(key)
```
```python
for value in a.values():
    print(value)
```
```python
# 튜플을 리스트화
list(a.items())
```
```python
# 튜플 한꺼번에 가져오기
for key, value in a.items():
    print(key, value)    
```

#### for에서 index 사용하기
  - 기본적으로 for에 리스트를 순회하는 경우, 값만 추출 함
  - 아래와 같은 코드로 인덱스와 값 모두 사용 가능(enumerate 함수 이용)

```python
a = [1, 2, 4, 3, 5]
for i, val in enumerate(a):
    print i, val
```
```python
# while문에서는 인덱스 지정해서 돌렸었음
# for문에서는 인덱스 없이 값만 나옴
a = [1, 2, 3, 4, 5]
for num in a:
    print(num)
```
```python
# enumerate(열거하다) 자동으로 인덱스와 벨류값 출력
# 자료형의 현재 순서와 그 값을 쉽게 알 수 있음
a = [1, 2, 3, 4, 5]
for index, value in enumerate(a):
    if index > 3:
        print(index, value)
```

####  break
  - for의 경우에도 특정 조건일 때, loop 종료가 가능
```python
a = [100, 90, 80, 70, 60, 50]
for num in a:
    if num < 80:
        break
    print(num)
```

#### continue
- 해당 아이템을 건너 뛰고 싶을 때 사용
```python
a = [100, 90, 80, 70, 60, 50]
for num in a:
    if num >= 60 and num <= 70:     # 해당 값을 건너뜀
        continue
    print(num)
```

#### loop 중첩
- 반복문의 경우에도 중첩하여 사용 가능
- 중첩이라는 것은 반복문 블록의 코드안에 또 반복문의 코드가 작성되는 것을 의미
- 이런 경우, 내부 루프는 외부 루프가 수행되는 만큼 반복 수행 됨
- 또한 중첩의 경우 무한히 가능

```python
a = [1, 2, 4]
for i in a:
    for j in a:
        print i * j
```

```python
#### 구구단 출력하기

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

#### collection의 길이
 - len() 내장함수로 계산 가능
 - 내장함수란 파이썬 내부에 구현되어 있어서, import하지 않고도 사용 가능한 함수를 의미
 - abs, len, type, range 등이 있음 (과정 진행하면서 필요할 때마다 다룰 예정)

```python
 # len함수는 컬렉션 타입의 길이를 가져옴
a = [1, 2, 3, 4, 5]
print(len(a))
print(len('hello world'))
```

#### range 함수
  - 리스트를 쉽게 만들 수 있는 내장함수
  - 주어진 값에 따라 다양한 결과를 반환
 
```python
range(10)       -> [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
range(2, 10)    -> [2, 3, 4, 5, 6, 7, 8, 9] 
range(2, 10, 3) -> [2, 5, 8] 
```

```python

* 1 - 100까지의 리스트 생성하기

# 직접 일일히 치는게 아니라 자동으로
print(list(range(10)))              # 1개일때, 0부터 끝 숫자 미포함
print(list(range(1, 10)))           # 2개일때, 1부터 끝 숫자 미포함
print(list(range(1, 101, 5)))       # 3개일때, 1부터 끝 숫자 미포함 + 간격
```

```python
# 1부터 100사이의 5의 배수만을 갖는 리스트를 생성하시오

list(range(5, 101, 5))

# 오답 '1 + 간격 5이므로 안됨'
list(range(1, 101, 5))
```

```python
# 구구단을 2 - 9단까지 출력하시오.

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
```python
# 1 - 100까지 정수 중 2의 배수 또는 11의 배수를 모두 출력하시오.
print(list(range(2, 101, 2)))
print(list(range(11, 101, 11)))
```

```python
nums = list(range(1, 101))
for x in nums:
    if x % 2 == 0 or x % 11 == 0:
        print(x)
```

```python
# sorted, sort 사용시
# a = [22, 1, 3, 4, 7, 98, 21, 55, 87, 99, 19, 20, 45] 에서 최대값과 최소값을 찾으시오.

a = [22, 1, 3, 4, 7, 98, 21, 55, 87, 99, 19, 20, 45]
a.sort()
a[0], a[-1]
```
```python
# 최소값 구하기
# 처음 만나는 수를 최소값으로 가정. 이후 최소값 업데이트

a = [22, 1, 3, 4, 7, 98, 21, 55, 87, 99, 19, 20, 45]

_min = a[0]
for x in a:
    if x < _min:
        _min = x
print(_min)
```
```python
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
```python
# a = [22, 1, 3, 4, 7, 98, 21, 55, 87, 99, 19, 20, 45] 에서 평균을 구하세요.
# summary % len

a = [22, 1, 3, 4, 7, 98, 21, 55, 87, 99, 19, 20, 45]
total = 0

for i in a:
    total += i
```
```python
i = 0
total = 0

while i < len(a):
    total += a[i]
    i += 1
print(total / len(a))
```