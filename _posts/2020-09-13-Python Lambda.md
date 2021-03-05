---
title: "[Python] 파이썬 함수 - lambda"
date: 2020-9-13
categories:
- study
tags:
- python
toc: true
toc_sticky: true
---

## Lambda 함수
- 'lambda 변수: return 내용' 형식의 단일문으로 표현되는 함수
- 익명의 함수로 이름이 없는 구현체만 존재하는 간단한 함수를 의미
- 코드 상에서 한번만 사용되는 기능이 있을 때, 굳이 긴 함수로 만들지 않고 1회성으로 만들어서 쓸 때 사용.

```python
# 함수 def 함수이름(변수)
def add(x, y):
    return x + y

# 함수 lambda 변수: return 내용
add2 = lambda x, y: x + y
add2(10, 20)
```
<br>
<br>

### 관련 함수들 
- filter, map, reduce는 lambda에서 유용하게 사용되는 3가지 대표적 함수로, 함수형 프로그래밍의 기본 요소이기도 함

```python
def even(n):                # 짝수면 True, 홀수면 False
    return n % 2 == 0

even(3)
```
<br>
<br>

#### filter
- filter(함수, 리스트): 리스트를 지정 함수로 필터링
- 특정 조건을 만족하는 요소만 남기고 필터링

```python
nums = [1, 2, 3, 6, 8, 9, 10, 11, 13, 15]

list(filter(even, nums))           # 원래 리스트 nums에서 짝수만 받는 함수로 필터링
------------------------------
list(filter(lambda n : n % 2 == 0, nums))
```
<br>
<br>

#### map
- map(함수, 리스트): 원래 리스트에 함수를 적용해 새로운 리스트를 만듬
- 각 원소를 주어진 수식에 따라 변형하여 새로운 리스트를 반환

```python
# Q. 주어진 리스트의 제곱을 한 숫자로 새로운 리스트 만들기
nums = [1, 2, 3, 6, 8, 9, 10, 11, 13, 15]
list(map(lambda n:n**2, nums))
```
<br>
<br>

#### reduce
- reduce(함수, 리스트): 처음 2개 결과. 그 결과와 다음 것 결과 … 그렇게 최종값 반환
- 차례대로 앞 2개의 원소를 가지고 연산. 연산의 결과가 또 다음 연산의 입력으로 진행됨. 따라서 마지막까지 진행되면 최종 출력은 한개의 값만 남게 됨

```python
import functools
a = [1, 3, 5, 8]
# 리스트 내의 모든 숫자의 합 (ex. 4, 9, 17)

print(functools.reduce(lambda x, y : x + y, a))
print(functools.reduce(lambda x, y : x * y, a))
```
<br>
<br>

## 연습문제
### 숫자 리스트 평균 구하기

```python
# 입력 : 숫자 리스트
# 출력 : 숫자 리스트의 평균값

def mean(nums):
    total = 0
    for i in nums:              # 숫자의 리스트이므로 순회하는 for문 사용
        total += i
    return total / len(nums)

print(mean([1, 2, 3]))
print(mean([1, 2, 3, 4, 5]))
print(mean([1, 2, 3.0, 3.9, 8.7]))
```

```python
# sum 내장 함수로 대체 가능

def mean(nums):
    return sum(nums) / len(nums)

print(mean([1, 2, 3]))
print(mean([1, 2, 3, 4, 5]))
print(mean([1, 2, 3.0, 3.9, 8.7]))
```
<br>
<br>

### 숫자 소수 판별
```python
# 소수 판별 (1과 자기 자신으로만 나눠지는 수)
# 입력: 양의 정수 1개
# 출력: boolean (소수: True, 합성수: False)
# 15 / 2, 3, 4 ~ 14까지 나눴을때 나눠지지 않으면 = 소수

# boolean을 출력하는 함수는 보통 is로 시작됨

def is_prime(num):
    for i in range(2, num):            # for루프가 도는 동안에 2부터 자기자신 전까지
        if num % i == 0:
            return False              # 나눠지면 false 합성수
    return True                       # 한번도 안나눠짐

print(is_prime(100))
print(is_prime(89))
print(is_prime(17))
print(is_prime(3))
```
<br>
<br>

### 소수의 개수
```python
# 2, 3, 4, 5, 6, 7 -> 4
# 2, 3, 4, 5 -> 3
# 입력: 양의 정수 1개
# 출력: 2와 해당 숫자 사이의 소수의 개수

def count_prime(num):
    count = 0
    for i in range(2, num+1):               # num을 포함해야하므로 +1
        if is_prime(i):
            count += 1                      # is_prime이 트루인 경우만 count 증가
    return count

print(count_prime(7))
print(count_prime(5))
print(count_prime(100))
```
<br>
<br>
<i> ※ credit: Fast Campus, 머신러닝과 데이터분석 A-Z 올인원 패키지 </i>