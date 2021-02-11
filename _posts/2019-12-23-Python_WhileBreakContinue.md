---
layout: post
title:  ［Python］파이썬 제어문 - while 반복문, break, continue
slug:         Python_WhileBreakContinue
categories:   [study]
tags:         [programming, python]
noindex: true
---
---
title: "［Python］파이썬 기본 구문"
date: 2018-11-4
categories:
  - study
tags:
  - python
---
## While문은?
* 반복해서 문장을 수행해야 할 경우 사용해서, 반복문이라고도 한다.
* While문은 조건문이 참인 동안에 while문 아래에 속하는 문장들이 반복해서 수행된다.
* break문: while문 수행시, 입력된 조건을 검사해서 조건에 맞지 않으면 while문을 빠져나감.
* continue문: while문을 빠져나가지 않고 while문의 맨 처음(조건문)으로 다시 돌아가게 만들고 싶은 경우

```python
# while문 기본 구조
while <조건문>:
    <수행할 문장1>
    <수행할 문장2>
    <수행할 문장3>
    ...
```
```python
# While문 예시
>>> treeHit = 0
>>> while treeHit < 10:                             # while문의 조건문은 treeHit < 10 
...     treeHit = treeHit +1                        # treeHit이 10보다 작은 동안, +1 계속 수행
...     print("나무를 %d번 찍었습니다." % treeHit)   #  treeHit +=1도 같은 말
...     if treeHit == 10:
...         print("나무 넘어갑니다.")
...
나무를 1번 찍었습니다.
나무를 2번 찍었습니다.
나무를 3번 찍었습니다.
나무를 4번 찍었습니다.
나무를 5번 찍었습니다.
나무를 6번 찍었습니다.
나무를 7번 찍었습니다.
나무를 8번 찍었습니다.
나무를 9번 찍었습니다.
나무를 10번 찍었습니다.
나무 넘어갑니다.
```


## 1. While문 만들기
```python
# while문 예시
>>> prompt = """
... 1. Add
... 2. Del
... 3. List
... 4. Quit
...
... Enter number: """
>>>

>>> number = 0                            # 변수 설정하지 않으면 나중에 변수 존재하지 않는다함
>>> while number != 4:                    # number가 4가 아니면,
...     print(prompt)                     # 계속 prompt를 출력하고 
...     number = int(input())             # 사용자로부터 번호를 입력
...

1. Add
2. Del
3. List
4. Quit 

Enter number:                             # 4를 입력하면, 조건문이 거짓이 되어 while문 빠져나감
```


## 2. while문 강제로 빠져나가기: break문
* while문은 조건문이 참인 동안 계속해서 while문 안의 내용을 반복적으로 수행한다.
* 하지만 강제로 while문을 빠져나가고 싶을 때, 사용하는 것이 바로 break문
```python
# while/break문 예시
coffee = 10
while True:
    money = int(input("돈을 넣어 주세요: "))            # 사용자로부터 입력을 받는 부분을 money 변수에 넣음
    if money == 300:                                   # 만약 money = 300이면 커피줌 & -1
        print("커피를 줍니다.")
        coffee = coffee -1
    elif money > 300:                                  # 만약 money > 300이면, 
        print("거스름돈 %d를 주고 커피를 줍니다." % (money -300))
        coffee = coffee -1                             # 커피줌 거스롬돈줌 & -1
    else:
        print("돈을 다시 돌려주고 커피를 주지 않습니다.")
        print("남은 커피의 양은 %d개 입니다." % coffee)
    if coffee == 0:                                    # 만약 coffe가 0이 되면 참이므로
        print("커피가 다 떨어졌습니다. 판매를 중지 합니다.")
        break                                          # break 호출되어 while문 빠져나감
```


## 3. while문의 맨 처음으로 돌아가기: continue 문
* break문: while문 수행시, 입력된 조건을 검사해서 조건에 맞지 않으면 while문을 빠져나감.
* continue문: while문을 빠져나가지 않고 while문의 맨 처음(조건문)으로 다시 돌아가게 만들고 싶은 경우
```python
# 1부터 10 숫자 중에서 홀수만 출력
>>> a = 0
>>> while a < 10:                       # a가 10보다 작은 동안 
...     a = a + 1                       # a는 1만큼씩 계속 증가
...     if a % 2 == 0: continue         # a를 2로 나누었을 때 나머지가 0인 경우가 참일 때, 
...     print(a)                        # continue 수행: while문의 맨 처음 조건문으로 돌아감
...
1
3
5
7
9
```

## 4. 무한 루프(Loop)
무한 루프란 무한히 반복한다는 의미다. 무한 루프의 개념을 사용하지 않는 프로그램은 거의 없을 만큼 자주 사용된다.
```python
# while문으로 구현한 무한 루프의 기본 형태
while True:                    # while문의 조건문이 True이므로 항상 참이므로, 
    수행할 문장1                # 따라서 while문 안에 있는 문장들은 무한하게 수행될 것
    수행할 문장2
    ...
    
# 무한 루프 예시
>>> while True:
...     print("Ctrl+C를 눌러야 while문을 빠져나갈 수 있습니다.")
...
Ctrl+C를 눌러야 while문을 빠져나갈 수 있습니다.
Ctrl+C를 눌러야 while문을 빠져나갈 수 있습니다.
Ctrl+C를 눌러야 while문을 빠져나갈 수 있습니다.
....
```


## 5. While문 예제
```python
# 3의 배수의 합 구하기
>>> sum = 0                         # 변수 선언
>>> i = 1
>>> while i <= 1000:                # i가 1000보다 작거나 같을 때까지 반복
>>>    if i % 3 == 0:               # 3으로 나누어 떨어지는 수는 3의 배수
>>>        sum += i                 # i가 3의 배수일때 더해줌
>>>    i += 1      # 1씩 더해줌
>>> print(sum)
166833

# 50점 이상의 총합 구하기
>>> A = [20, 55, 67, 82, 45, 33, 90, 87, 100, 25]

>>> sum = 0
>>> while A:                         # A 리스트에 값이 있는 동안
>>>    mark = A.pop()                # A리스트의 가장 마지막 항목을 하나씩 뽑아냄
>>>    if mark >= 50:                # 50점 이상의 점수만 더함
>>>        sum += mark
>>> print(sum)   
481

# 별 표시하기
>>> i = 0
>>> while True:
>>>    i += 1         # while문 수행 시 1씩 증가
>>>    if i > 4: break      # i 값이 4보다 크면 while문을 벗어난다.
>>>    print ('*' * i)      # i 값 개수만큼 *를 출력한다
```
