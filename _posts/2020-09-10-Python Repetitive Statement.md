---
title: "[Python] 파이썬 반복문 - "
date: 2020-9-10
categories:
- study
tags:
- python
toc: true
toc_sticky: true
---

### loop (반복문)
 + 반복적인 작업을 가능하게 해주는 도구
 + 특정 조건을 만족하는 경우 수행할 수 있음 (while)
 + 리스트, 문자열, 튜플 등 컬렉션 타입의 아이템을 하나씩 순회하면서 사용 가능 (for)
 + 코드 작업에서, 가장 많이 사용하는 구문 중 하나
 + 주의할점: while을 사용할 경우, 반복을 멈추게 하는 장치가 필요
   + 그렇지 않으면 셀이 무한히 수행되며, jupyter notebook의 재부팅이 필요

※ if는 true이면 수행하고 이탈<br>
   while은 true이면 수행하고<br>
   다시 while 조건으로 돌아와 반복<bt>
   false여야지만 나옴

#### while 키워드
  - while 뒤의 조건이 True일 경우, while 코드 블록을 계속 수행
  - while 코드 블록
    - if와 마찬가지로 while문 아래의 들여쓰기로 작성 된 부분을 의미
  - 조건이 False가 되면 블록 수행을 멈추고 이후 코드를 실행

#### while 키워드 이용하여 리스트의 아이템 출력하기

# len() : 개수 반환하는 내장함수
    
a = [1, 10, 9, 24]
i = 0                      # 인덱스 변수 i = 시작이 0부터라
while i < len(a):         # 0 < 4 true이니까 아래 실행
    print('value: ', a[i], ', index: ', i)        # a의 0번째 함수 출력
    i += 1                 # 하나씩 증가
    
print('hahah')

#### while 키워드 이용하여 리스트의 아이템 출력하기
 - 조건문과 함께 사용하기

 a = [1, 10, 9, 24, 25, 26]
i = 0                      
while i < len(a):         
    if a[i] > 20:                # 20보다 큰 경우만 출력
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

#### 무한루프
 - while의 경우 종료가 되지 않도록 코드를 작성하면 블록에서 빠져나올 수 없음

# 나쁜 습관 하지 말자
while True:
    print('haha')

#### break 
 + loop를 중단할 때 사용
 + 보통 조건문 안에서 수행되며, 조건을 만족하는 경우 loop를 탈출하기 위해 사용
 + loop를 중단 하는 경우, while 이후의 코드를 수행

a = [1, 10, 9, 24, 25, 26]
i = 0
while i < len(a):         # i가 리스트의 길이보다 작을때
    if a[i] > 20:         # a[i]가 20보다 크면 break되고 끝
        break
    
    print(a[i])

    i += 1
    
print('hahah')

# 나중에 크롤링 할 때, 몇개가 있는지 모르므로
while True:
    data = crawl()              
    if data == None:           # 데이터가 없으면 끝
        break
    print(data)
    

#### continue
 + break 처럼 반복을 중단하진 하여 빠져나오지 않고, 다시 while조건으로 점프함
 + 특정한 경우에는 코드를 수행하지 않고 다음으로 건너 뛰기 위해 사용

# break가 나오는거면 continue는 다시 들어가는 것

a = 7
while a > 0:
    a -= 1
    print(a)

a = 7
while a > 0:
    a -= 1
    if a == 5:                       # 5에서 종료
        break
    print(a)

# continue는 특정 조건을 제외하고 계속 해야할 때 사용
a = 7
while a > 0:
    a -= 1
    if a == 5:                      # 5만 제외하고 계속
        continue
    print(a)

## 연습문제 1~100까지 더하기
num = 1
total = 0

while num <= 100:
    total += num
    num += 1

print(total)