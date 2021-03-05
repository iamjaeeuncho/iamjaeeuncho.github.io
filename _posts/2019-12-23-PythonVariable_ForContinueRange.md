---
title: "[Python],파이썬 제어문 - for 반복문, continue, range"
date: 2019-12-23
categories:
  - study
tags:
  - python
toc: true
toc_sticky: true
---

## for문은?
* while문과 같이 반복문이다.
* 둘다 반복한다는 점에서 같으나, for문은 주어진 데이터(리스트나 튜플, 문자열)에서 변수를 뽑아내 반복한다는 것이 특징.
* continue: for문을 빠져나가지 않고 for문의 맨 처음으로 다시 돌아가게 만들고 싶은 경우
* range함수는 숫자 리스트를 자동으로 만들어 주는 함수
* 리스트 안에 for문 포함하기 = [표현식 for 항목 in 반복가능객체 if 조건문]

```python
# for문 기본 구조
for 변수 in 리스트(또는 튜플, 문자열):
    수행할 문장1
    수행할 문장2
    ...
    
# while문 기본 구조 
while <조건문>:
 <수행할 문장1>
 <수행할 문장2>
 <수행할 문장3>
    ...
```

```python
# for문 예시 - 평균 구하기
>>> A = [70, 60, 55, 75, 95, 90, 80, 80, 85, 100]
>>> total = 0
>>> for score in A:
>>>    total += score    # A학급의 점수를 모두 더한다.
>>> average = total / len(A)  # 평균을 구하기 위해 총 점수를 총 학생수로 나눈다.
>>> print(average)     # 평균 79.0이 출력된다.
79
```
<br>
<br>

## 1. for문 만들기

```python
# 1. 전형적인 for문 - 리스트
>>> test_list = ['one', 'two', 'three'] 
>>> for i in test_list:                   # list의 요소가 i 변수에 먼저 대입된 후
>>>     print(i)                          # print문 수행
one                                       # 계속 반복
two 
three

# 2. 다양한 for문의 사용 - 튜플
>>> a = [(1,2), (3,4), (5,6)]           # 리스트의 요소값이 튜플이기 때문에 
>>> for (first, last) in a:             # 각각의 요소들이 자동으로 (first, last)라는 변수에 대입
>>>     print(first + last)
3
7
11

# 3. for문의 응용
>>> marks = [90, 25, 67, 45, 80]
>>> number = 0                          # 각 학생에게 번호를 붙여 주려고 number 변수 이용
>>> for mark in marks:                      # 리스트 marks에서 점수 꺼내 mark 변수에 대입 for문 수행
>>>    number = number +1                  # for문이 한 번씩 수행될 때마다 number는 1씩 증가
>>>    if mark >= 60: 
>>>        print("%d번 학생은 합격" % number)
>>>    else: 
>>>        print("%d번 학생은 불합격" % number)
1번 학생은 합격입니다.
2번 학생은 불합격입니다.
3번 학생은 합격입니다.
4번 학생은 불합격입니다.
5번 학생은 합격입니다.
```
<br>
<br>

## 2. 제어문의 맨 처음으로 돌아가기: continue
* for문을 빠져나가지 않고 for문의 맨 처음으로 다시 돌아가게 만들고 싶은 경우

```python
>>> marks = [90, 25, 67, 45, 80]
>>> number = 0 
>>> for mark in marks: 
>>>    number = number +1 
>>>    if mark < 60:                          # 60점 이하일 경우에는 mark < 60이 참
>>>        continue                           # continue문이 수행. 아래 print 수행하지 않고 앞으로
>>>    print("%d번 학생 축하합니다. 합격입니다. " % number)
1번 학생 축하합니다. 합격입니다.
3번 학생 축하합니다. 합격입니다.
5번 학생 축하합니다. 합격입니다.
```
<br>
<br>

## 3. for문과 range 함수
* range함수는 숫자 리스트를 자동으로 만들어 주는 함수

```python
# range 함수 사용법
>>> a = range(10)        # range(10)은 0부터 10 미만의 숫자를 포함하는 range 객체를 만들어 준다
>>> a
range(0, 10)

# 시작과 끝 숫자를 지정하려면,
>>> a = range(1, 11)    # range(시작 숫자, 끝 숫자) 형태
>>> a                   # 하지만 끝 숫자는 포함되지 않는다
range(1, 11)
```
```
# range 함수 예시 1
>>> sum = 0                             # sum 변수 설정
>>> for i in range(1, 11):              # 1 이상 11 미만의 숫자를 데이터로 갖는 range 객체
>>>     sum = sum + i                   # i 에 리스트의 숫자들이 1부터 10까지 하나씩 차례로 대입
>>> print(sum)
55

# range 함수 예시 2
>>> marks = [90, 25, 67, 45, 80]
>>> for number in range(len(marks)):    # len 함수는 리스트 내 요소의 개수를 돌려주는 함수
>>>    if marks[number] < 60:           # len(marks)는 5 -> range(5) -> number에 0 ~ 4 대입
>>>        continue                     # marks[number]는 차례대로 90, 25, 67, 45, 80 값을 갖음
>>>    print("%d번 학생 축하합니다. 합격입니다." % (number+1))
    
# range 함수 예시 3 - 다중 for문, 구구단
>>> for i in range(2,10):              # ①번 for문: 2부터 9까지의 숫자가 차례로 i에 대입
>>>     for j in range(1, 10):         # ②번 for문: 2부터 9까지의 숫자가 차례로 i에 대입
>>>         print(i*j, end=" ")        # 1번 for문이 2일때, 2번 for문 만나서 수행
>>>     print('')                      # 입력 인수 end를 넣어 준 이유?
2 4 6 8 10 12 14 16 18                 # 해당 결과값을 출력할 때,
3 6 9 12 15 18 21 24 27                # 다음줄로 넘기지 않고 그 줄에 계속해서 출력하기 위해서
4 8 12 16 20 24 28 32 36               # print(' ')는 2단, 3단 등을 구분하기 위해서
5 10 15 20 25 30 35 40 45
6 12 18 24 30 36 42 48 54 
7 14 21 28 35 42 49 56 63 
8 16 24 32 40 48 56 64 72 
9 18 27 36 45 54 63 72 81
```
<br>
<br>

## 4. 리스트 안에 for문 포함하기 - 리스트 내포(List comprehension)

```python
# 리스트 내포 일반 문법 - if 조건문 생략 가능
[표현식 for 항목 in 반복가능객체 if 조건문]

# 리스트 내포 일반 문법 - 2개 이상의 for문 사용
[표현식 for 항목1 in 반복가능객체1 if 조건문1
        for 항목2 in 반복가능객체2 if 조건문2
        ...
        for 항목n in 반복가능객체n if 조건문n]
```

```python
# 일반 for문
>>> a = [1,2,3,4]                # 리스트 a
>>> result = []                  # 빈 리스트 result - 나중에 결과값 넣을 변수 지정
>>> for num in a:                # 리스트 a에서 뽑아서 num 변수에 배정
>>>     result.append(num*3)     # result.append(x)는 result 리스트의 맨 마지막에 x 추가 함수
>>> print(result)
[3, 6, 9, 12]

# 위의 코딩을 리스트 내포화
>>> a = [1,2,3,4]
>>> result = [num * 3 for num in a]  # 리스트 result안에 for문 자체 내포
>>> print(result)                    # 리스트 a 에서 뽑아서 num 변수 지정
[3, 6, 9, 12]                        # 이후 표현식 num * 3 실행

# 위의 코딩을 리스트 내포화 응용 - if문 추가
>>> a = [1,2,3,4]
>>> result = [num * 3 for num in a if num % 2 == 0]
>>> print(result)                    # if num 변수가 짝수일때, num * 3 실행
[6, 12]

# 리스트 내포화 응용 - 모든 결과를 리스트에 담고 싶을 때
>>> result = [x*y for x in range(2,10)
>>>               for y in range(1,10)]
>>> print(result)
[2, 4, 6, 8, 10, 12, 14, 16, 18, 3, 6, 9, 12, 15, 18, 21, 24, 27, 4, 8, 12, 16,
20, 24, 28, 32, 36, 5, 10, 15, 20, 25, 30, 35, 40, 45, 6, 12, 18, 24, 30, 36, 42
, 48, 54, 7, 14, 21, 28, 35, 42, 49, 56, 63, 8, 16, 24, 32, 40, 48, 56, 64, 72,
9, 18, 27, 36, 45, 54, 63, 72, 81]
```
<br>
<br>
<i> ※ credit: 점프 투 파이썬 https://wikidocs.net/book/1 </i>