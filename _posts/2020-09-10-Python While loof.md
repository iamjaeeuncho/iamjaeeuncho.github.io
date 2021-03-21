---
title: "[Python] 파이썬 반복문 - while"
date: 2020-9-10
categories:
- study
tags:
- python
toc: true
toc_ads: true
toc_sticky: true
---

## 반복문?
- 반복적인 작업을 가능하게 해주는 도구
- 특정 조건을 만족하는 경우 수행하는 while문과 리스트 같은 컬렉션 타입의 아이템을 하나씩 순회하는 for문이 있음.
- 주의 할 점: while문의 경우, 무한히 수행되므로 반복을 멈추는 장치가 없으면 재부팅 해야함. (false여야지만 나옴)
<br>
<br>

## while
- while 코드 블록이 True이면 계속 수행하고, 조건이 False가 되야만 멈추고 이후 코드를 실행
- if와 마찬가지로 while문 아래의 들여쓰기로 작성 된 부분을 의미

```python
# while 반복문으로 리스트 아이템 출력
# len() : 개수 반환하는 내장함수
a = [1, 10, 9, 24]
i = 0                             # 인덱스 변수 i = 시작이 0부터라
while i < len(a):                 # 0 < 4 true이니까 true 코드블럭 실행
    print('value: ', a[i], ', index: ', i)        # a의 0번째 함수 출력
    i += 1                        # 하나씩 증가
print('hahah')
```

```python
# while + 조건문으로 리스트 아이템 출력
a = [1, 10, 9, 24, 25, 26]
i = 0                      
while i < len(a):         
    if a[i] > 20:                    # 20보다 큰 경우만 출력
        print(a[i])
    i += 1                 

a = [1, 10, 9, 24, 25, 26]
i = 0                      
while i < len(a):         
    if a[i] % 2 == 1:                # 홀수인 경우만 출력
        print(a[i])                  # 참고 값이 0이면 자동으로 false 처리
    else:                            # 짝수인 경우
        print(a[i] / 2)
    i += 1                 
```

```python
# 1~100까지 더하기
num = 1
total = 0

while num <= 100:
    total += num
    num += 1

print(total)
```
<br>
<br>

## 무한 루프 종료
- while의 경우 종료가 되지 않도록 코드를 작성하면 블록에서 빠져나올 수 없음
- break가 반복문에서 나오는거면 continue는 특정 조건을 제외하고 계속 진행

```python
# 나쁜 습관 하지 말자
while True:
    print('haha')
```
<br>
<br>

### break 
- 보통 조건문 안에서 수행되며, 조건을 만족하는 경우 loop를 중단할 때 사용
- loop를 중단 하는 경우, while 이후의 코드를 수행

```python
a = [1, 10, 9, 24, 25, 26]
i = 0
while i < len(a):             # i가 리스트의 길이보다 작을때
    if a[i] > 20:             # a[i]가 20보다 크면 break되고 끝
        break
    print(a[i])
    i += 1
print('hahah')

while True:
    data = crawl()             # 나중에 크롤링 할 때, 몇개가 있는지 모르므로 빈 값
    if data == None:           # 데이터가 없으면 끝
        break
    print(data)
```
<br>
<br>

### continue
- break 처럼 반복을 중단하여 빠져나오지 않고, 다시 while조건으로 점프함
- 특정한 경우에는 코드를 수행하지 않고 다음으로 건너 뛰기 위해 사용

```python
a = 7
while a > 0:
    a -= 1
    if a == 5:                       # 5에서 종료
        break
    print(a)
------------------------------
a = 7
while a > 0:
    a -= 1
    if a == 5:                       # 5만 제외하고 계속
        continue
    print(a)
```
<br>
<br>
<i> ※ credit: Fast Campus, 머신러닝과 데이터분석 A-Z 올인원 패키지 </i>