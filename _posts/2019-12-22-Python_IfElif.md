---
title: "[Python] 파이썬 제어문_If, elif, 조건부 표현식"
date: 2019-12-22
categories:
  - study
tags:
  - python
toc: true
toc_sticky: true
---

## if 문이란?
* 프로그래밍에서 조건을 판단하여 해당 조건에 맞는 상황을 수행하는 데 쓰이는 것
<br>
<br>

## 1. if문 기본 구조 및 예시

```python
* 기본 구조
if 조건문:                      # 조건문을 테스트해서 참이면, if 블록들을 수행
    수행할 문장1                 # 조건문 다음에 콜론(:)을 잊지 말자! - 파이썬 문법 구조
    수행할 문장2
    ...
else:                           # 조건문을 테스트해서 거짓이면, else 블록들을 수행
    수행할 문장A                 # else문은 if문 없이 독립적으로 사용할 수 없음
    수행할 문장B
    ...
    
* 예시
>>> money = True
>>> if money:
...     print("택시를 타고 가라")
... else:
...     print("걸어 가라")
...
택시를 타고 가라                 # money에 입력된 True는 참이므로, '택시를 타고 가라'가 출력됨
```
<br>
<br>

## 2. if문의 조건문
* 조건문이란, 참과 거짓을 판단하는 문장을 말한다. 아래는 조건을 판단하기 위한 연산자다.
    * 비교 연산자: < , >, ==, !=, >=, <=
    * 비트 연산자: x And y (모두 참이어야 참), x Or y (둘중에 하나만 참이면 참), Not x (x가 거짓이면 참)
    * In(~안에): x in 리스트, 튜플, 문자여 / x not in 리스트, 튜플, 문자열
    * 조건문의 참, 거짓에 따라 실행할 행동을 정의할 때, 아무런 일도 하지 않도록 설정하고 싶을 때는 pass 적용

```python
# 비교 연산자를 활용한 if문
>>> money = 2000                    # money >= 3000이라는 조건문이 거짓이 되기 때문에
>>> if money >= 3000:
>>>     print("택시를 타고 가라")
>>> else:                           # else문 다음의 문장을 수행
>>>     print("걸어가라")
걸어가라

# 비트 연산자를 활용한 if문
>>> money = 2000
>>> card = True
>>> if money >= 3000 or card:        # money >= 3000 이거나 card가 있으면 if문 수행
>>>     print("택시를 타고 가라")
>>> else:
>>>     print("걸어가라")
택시를 타고 가라

# in을 활용한 if문
>>> pocket = ['paper', 'cellphone', 'money']
>>> if 'money' in pocket:            # pocket 리스트 안에 'money'가 있는가?
>>>     print("택시를 타고 가라")     # 있으면 True - if 문 실행
>>> else:                            # 없으면 False - else 문 실행
>>>     print("걸어가라")
택시를 타고 가라
```

```python
# 조건문에서 아무 일도 하지 않게 설정하고 싶을 때, pass
>>> pocket = ['paper', 'money', 'cellphone']
>>> if 'money' in pocket:                     # pocket 리스트 안에 money라는 문자열이 있으므로
>>>    pass                                   # if문 다음 문장인 pass가 수행되고
>>> else:
>>>     print("카드를 꺼내라")
                                              # 아무런 결과값도 보여 주지 않는다
```
<br>
<br>

## 3. 다양한 조건을 판단하는 elif
* if와 else만으로는 조건 판단이 부족할 때, 다중 조건 판단을 가능하게 하는 elif 사용
* elif는 개수에 제한 없이 가용 가능

```python
# if와 else만으로만 표현 할 때, 복잡
>>> pocket = ['paper', 'handphone']
>>> card = True
>>> if 'money' in pocket:
...     print("택시를 타고가라")
... else:
...     if card:
...         print("택시를 타고가라")
...     else:
...         print("걸어가라")
...
택시를 타고가라

# if와 elif를 사용할 때,
>>> pocket = ['paper', 'cellphone']
>>> card = True
>>> if 'money' in pocket:
...      print("택시를 타고가라")
... elif card:                             # elif는 이전 조건문이 거짓일 때 수행
...      print("택시를 타고가라")
... else:
...      print("걸어가라")
...
택시를 타고가라                          
```

```python
#  if, elif, else를 모두 사용할 때 기본 구조
If <조건문>:
    <수행할 문장1> 
    <수행할 문장2>
    ...
elif <조건문>:
    <수행할 문장1>
    <수행할 문장2>
    ...
elif <조건문>:
    <수행할 문장1>
    <수행할 문장2>
    ...
...
else:
   <수행할 문장1>
   <수행할 문장2>
   ... 
```
<br>
<br>

## 4. 조건부 표현식
* 조건부 표현식은 가독성에 유리하고 한 라인으로 작성할 수 있어 활용성이 좋다

```python
# 조건부 표현식
조건문이_참인_경우 if 조건문 else 조건문이_거짓인_경우
```

```python
# 원래 if문
if score >= 60:                          # 위 코드는 score가 60 이상일 경우
    message = "success"             
else:                                    # message에 "success"를 아닐 경우에는 "failure"를 대입
    message = "failure"
    
# 위의 코드를 조건부 표현식으로 표현하면,
message = "success" if score >= 60 else "failure"
```

<center>
<img src="https://user-images.githubusercontent.com/46369038/107739804-0ba1e200-6d4d-11eb-8cd3-c0d087332e95.png" width="550px"><br>
<i>credit: https://blog.naver.com/mathesis_time/221466775716</i>
</center>
