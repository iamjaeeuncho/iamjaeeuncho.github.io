---
title: "[Python] 파이썬 조건문 - "
date: 2020-9-9
categories:
- study
tags:
- python
toc: true
toc_sticky: true
---

## condition (조건문)
 + 특정 조건을 만족하는 경우에만 수행할 작업이 있는 경우 사용
 + 모든 조건은 boolean으로 표현 됨 (예외 사항은 아래 배울 예정)
 + if, elif, else 키워드가 사용
 + 조건문의 경우 if, elif, else 블록에 종속된 코드는 들여쓰기로 표현 가능
 + 즉 아래코드에서와 같이, 조건문 아래에 들여쓰기된 2줄의 코드만이 조건문의 조건에 따라 수행될 수도, 수행되지 않을 수도 있는 코드라고 할 수 있음
 + 들여쓰기 된 코드를 블록(block), 또는 코드블록이라고 함
 + python에서 모든 블록의 시작점의 마지막에는 :(콜론, colon) 추가가 필요

```python
if 6 >= 5:
    print ('6 is greater than 5')
    print ('Yeah, it is true')
print ('This code is not belongs to if statements')
```

* Logical AND, OR, NOT 
  - 조건문에 사용되는 조건의 경우, boolean이기 때문에, 논리식 AND, OR, NOT 이 사용가능
  - AND : and
  - OR : or
  - NOT : not
  
* 논리표 
  - AND : 두개 다 참이여야 True
      - T AND T : T
      - T AND F : F
      - F AND T : F
      - F AND F : F
  - OR : 두개 중 하나라도 참이면 True
      - T OR T : T
      - T OR F : T
      - F OR T : T
      - F OR F : F
  - NOT : 반전
      - NOT T : F
      - NOT F : T
* 우선순위
  - NOT > AND > OR

```python
# 파이썬에서는 들여쓰기가 중요
# if 문구가 참(True)인 경우 아래 종속 코드 실행됨
if 6 >= 5:
    print('6 is greater than 5')
    print('Yeah, it is true')
    print('it is really true')
    
print ('This code is not belongs to if statements')
```

```python
# if 문구가 거짓(False)인 경우 아래 종속 코드 실행됨
if 6 == 5:
    print('6 is greater than 5')
    print('Yeah, it is true')
    print('it is really true')
    
print ('This code is not belongs to if statements')
```

```python
a = 10
b = 8
c = 11

if a == 10 and b != 9:
    print('that is true')
```

```python
# b and c 먼저하고 나중에 a or 수행
if (a == 10 or b ==9) and c == 12:
    print('that is true')

if not a == 10:
    print('a is ten')
```

## if의 조건이 bool이 아닌 경우
 * 일반적으로는 조건문에는 bool이 주로 위치 함
 * 하지만, 정수, 실수, 문자열 리스트 등 기본 타입도 조건에 사용 가능
 * False로 간주되는 값 (각 타입의 기본값)
     * None
     * 0 -> 정수형
     * 0.0 -> 실수형
     * '' -> 빈 문자열
     * [] -> 빈 리스트
     * () -> 빈 튜플
     * {} -> 빈 딕셔너리
     * set() -> 빈 집합
 * 그밖에는 모두 True로 간주

```python
# if는 트루인 경우에만 수행이됨
if 3.5:
    print('333')
```

```python
# 숫자나 빈값같이 기본값은 False로 간주되어도 수행 안됨
a = 0
if a:
    print('print')
```

#### if, else
  - if가 아닌 경우, 나머지 조건을 표현하고 싶다면 바로 아래 else 블락 사용
  - 이 경우, if조건이 True인 경우, if 블락의 코드가 수행, 거짓인 경우 else 블락의 코드가 수행
  - 주의 할 점 : if와 else사이에 다른 코드 삽입 불가

```python
a = 10
if a % 2 == 0:
    print(a/2)       
print(a + 1)             # if와 무관하게 무조건 수행
```

```python
# 짝수인 경우에는 2로 나눈 값을 출력
# 홀수인 경우에는 1을 더한 값을 출력

a = 10
if a % 2 == 0:           # 만약 짝수이면 (a를 2로 나눠서 나머지가 0이면)
    print(a/2)           # True인 경우 여기 수행
#print("haha")           # if와 else 사이에는 다른 코드 못 들어옴
else:
    print(a + 1)         # False인 경우 여기 수행
```

#### if, elif, else
  - 조건이 여러개인 경우, 다음 조건을 elif 블록에 명시 가능
  - 이 경우, 각 조건을 확인 후, True인 조건의 코드 블락을 실행 한 후, 전체 if, elif, else 구문을 종료
  - 조건문을 사용할 때는, if 이후, 0개 이상의 elif를 사용 가능하며 0개 또는 1개의 else를 사용 가능함

```python
a = 17
if a % 4 == 0:
    print 'a is divisible by 4'
elif a % 4 == 1:
    print 'a % 4 is 1'
elif a % 4 == 2:
    print 'a % 4 is 2'
else:
    print 'a % 4 is 3'
```

```python
a = 16
if a % 4 == 0:                    # 참이 아니면 밑으로 내려감 
    print('a is divisible by 4')
elif a % 4 == 1:
    print('a % 4 is 1')
elif a % 4 == 2:
    print('a % 4 is 2')
else:
    print('a % 4 is 3')
```

```python
a = 16
if a % 4 == 0:                    
    print('a is divisible by 4')

if a % 4 == 1:
    print('a % 4 is 1')

if a % 4 == 2:
    print('a % 4 is 2')
else:
    print('a % 4 is 3')
```


#### 중첩 조건문(nested condition)
  - 조건문의 경우 중첩하여 작성 가능
  - 중첩의 의미는 depth(깊이)로 생각할 수 있으며, depth의 제한은 없음

```python
a = 10
b = 9
c = 8

if a == 10:              # True면 밑으로 이동
    if c == 8:
        if b == 8:
            print('a is 10 and b is 8')
        else:
            print('a is 10 and b is not 8')
```
```python
if a == 10:
    print('a is 10')
elif a != 10:
    print('a is not 10')
```

