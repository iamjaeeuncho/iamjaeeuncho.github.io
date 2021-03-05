---
title: "[Python] 파이썬 클래스 - 메서드, 생성자, 상속, 오버라이딩, 변수"
date: 2019-12-27
categories:
  - study
tags:
  - python
toc: true
toc_sticky: true
---

## 클래스(Class)란?
* 클래스(class)란 똑같은 무엇인가를 계속해서 만들어낼 수 있는 설계 도면 같은 것
* 프로그램 작성을 위해 꼭 필요한 요소는 아니지만, 코딩을 짧고 효율적으로 작성할 수 있게 한다.
* 객체(object)란 클래스에 의해서 만들어진 피조물 
* 예를 들면, 클래스(class)는 과자틀이고, 객체(object)는 과자틀에 의해서 만들어진 과자들이다.
* 클래스에 의해서 만들어진 객체는 객체별로 독립적인 성격을 갖는다. 동일한 클래스에의해 생성된 객체들은 서로에게 전혀 영향을 주지 않는다.
* 클래스에 의해서 만들어진 객체를 인스턴스라고도 하지만, 인스턴스라는 말은 특정 객체가 어떤 클래스의 객체인지를 관계 위주로 설명할 때 주로 사용된다.
ex. a = Cookie()에서 a는 클래스의 결과값을 돌려받는 객체이고, 동시에 a라는 객체는 Cookie의 인스턴스이다. 
하지만, "a는 객체", "a는 Cookie의 인스턴스"라는 표현이 훨씬 잘 어울린다.
* 메서드(Method): 클래스 안에 구현된 함수로, 클래스에 포함되어 있다는 점만 제외하면 일반함수와 다를 것이 없다.
* 생성자(Constructor)란 객체가 생성될 때 자동으로 호출되는 메서드를 의미

```python
# 클래스를 사용하지 않을 때,
>>> result1 = 0
>>> result2 = 0
>>> def add1(num):             # 각각의 계산기는 각각의 결과값을 유지해야 하기 때문에
>>>     global result1         # add 함수 하나만으로는결과값을 따로 유지할 수 없다.
>>>     result1 += num         # 그러므로 함수를 각각 따로 만들어야 한다.
>>>     return result1
>>> def add2(num):
>>>     global result2
>>>     result2 += num
>>>     return result2
>>> print(add1(3))
>>> print(add1(4))
>>> print(add2(3))
>>> print(add2(7))
3
7
3
10

# 클래스를 사용할 때,
>>> class Calculator:
>>>     def __init__(self):
>>>         self.result = 0
>>>     def add(self, num):
>>>         self.result += num
>>>         return self.result
>>> cal1 = Calculator()          # Calculator 클래스로 만들어진  
>>> cal2 = Calculator()          # cal1, cal2라는 별개의 계산기가 각각의 역할을 수행
>>> print(cal1.add(3))           # (파이썬에서는 이것을 객체라고 한다)
>>> print(cal1.add(4))           # 클래스를 이용하면 계산기의 개수가 늘어나더라도
>>> print(cal2.add(3))           # 객체를 생성하기만 하면 되기 때문에 
>>> print(cal2.add(7))           #  함수를 사용하는 경우와 달리 매우 간단해짐
3
7
3
10
```

```python
# 파이썬 클래스 만들기 예
>>> class Cookie:            # 아무런 기능도 갖고 있지 않은 껍질뿐인 클래스
>>>    pass                  # 껍질뿐인 클래스도 객체를 생성하는 기능은 가지고 있다

# 파이썬 객체 만들기 예
>>> a = Cookie()             # 객체는 클래스에 의해서 만들어지며
>>> b = Cookie()             # 1개의 클래스는 무수히 많은 객체를 만들어낼 수 있다
                             # Cookie()의 결과값을 돌려받은 a와 b가 바로 객체
```
<br>
<br>

## 1. 사칙 연산 클래스 만들기
① 클래스를 어떻게 만들지 먼저 구상

```python
# 클래스 작동 원리 구상하기
>>> a = FourCal()         # a라는 객체를 만듬
>>> a.setdata(4, 2)       # 4와 2라는 숫자를 객체 a에 지정
>>> print(a.add())        # a.add()수행 후, 두 수의 합(4 + 2) 돌려줌
6
>>> print(a.mul())        # a.mul()수행 후, 두 수의 곱(4 * 2) 돌려줌
8
>>> print(a.sub())        # a.sub()수행 후, 두 수의 차(4 - 2) 돌려줌
2
>>> print(a.div())        # a.div()수행 후, 두 수의 나눈 결과(4 / 2) 돌려줌
2
```
<br>
<br>

② 클래스 구조 만들기

```python
# 객체를 만들기 위해서 일단 클래스 만들어야 함
>>> class FourCal:                 # 1. 아무 기능도 없는 클래스 만듬
...     pass                       # 하지만 클래스이므로 객체를 만들 수 있음
>>> a = FourCal()                  # 객체 a를 만듬
>>> type(a)                        # type 내장 함수로 객체의 타입을 출력
>>> <class '__main__.FourCal'>     # 객체 a의 타입은 클래스의 인스턴스
```
<br>
<br>

③ 객체에 숫자 지정할 수 있게 만들기
클래스 안에 구현된 함수는 다른말로 메서드(Method)라고 부른다.
```python
# 위에 생성된 객체 a는 아무런 기능도 못하므로 연산 기능하는 객체 만듬
>>> a.setdata(4, 2)                        # 먼저 연산에 사용할 숫자 2개 입력
>>> class FourCal:                         
...     def setdata(self, first, second):  # 기존 class 내 pass 지우고 setdata 함수(메서드) 만듬
...         self.first = first             
...         self.second = second
```
<br>
<br>

<center>
<img src="https://user-images.githubusercontent.com/46369038/107740116-aef2f700-6d4d-11eb-85f2-0611b42cf0b7.png" width="550px"><br>
<i>credit: https://wikidocs.net/28</i>
</center>
<br>
<br>

③-1. setdata 메서드의 매개변수

```python
# 객체를 통한 setdata 메서드를 호출 - self를 반드시 생략하여 호출
>>> a = FourCal()
>>> a.setdata(4, 2)      # a라는 객체를 만들고 a라는 객체를 통해 setdata 메서드를 호출

# 클래스를 통한 메서드를 호출 - 객체 a를 첫 번째 매개변수인 self에 꼭 전달
>>> a = FourCal()
>>> FourCal.setdata(a, 4, 2)
```

> cf. 메소드 setdata가 3개의 매개변수가 필요로 하는데 왜 a.setdata(4, 2)처럼 2개만 입력해도 실행이 되는가?
> * a.setdata(4, 2)처럼 호출시, setdata 메서드의 첫 번째 매개변수 self에는 setdata메서드를 호출한 객체 a가 자동으로 전달되기 때문이다.
> * 파이썬 메서드의 첫번째 매개변수명은 관례적으로 self라는 이름을 사용한다. (다른 이름을 사용해도 상관은 없음.)
> * 호출 시 호출한 객체 자신이 전달되기 때문에 self라는 이름을 사용하게 된 것이다.
> * 메서드의 첫번째 매개변수인 self를 명시적으로 구현해야 하는 것은 파이썬만의 독특한 특징이다. 예를들어 자바같은 언어는 첫번째 매개변수인 self가 필요없다.
<br>
<br>

③-2.setdata 메서드의 수행문

```python
# setdata 메서드의 수행문
>>> def setdata(self, first, second):   # ① 메서드의 매개변수
>>>    self.first = first               # ② 메서드의 수행문
>>>    self.second = second             # ② 메서드의 수행문

# a.setdata(4, 2) 처럼 호출하면, setdata메서드의 수행문은 다음과 같이 해석
>>> self.first = 4          # setdata메서드의 매개변수 first, second에 각각 4, 2 값 전달
>>> self.second = 2

>>> a.first = 4             # self는 전달된 객체 a이므로 다시 다음과 같이 해석
>>> a.second = 2            # a.first = 4란, a객체에 first라는 객체변수가 생성되고 4 저장
                            # a.second = 2란, a객체에 second라는 객체변수가 생성되고 2 저장
                            
# 확인 - a 객체에 first와 second 객체변수 생성
>>> a = FourCal()
>>> a.setdata(4, 2)
>>> print(a.first)
4
>>> print(a.second)
2
```

```python
# 클래스의 객체 변수는 독립적이다
>>> a = FourCal()         # 객체 만들기
>>> b = FourCal()

>>> a.setdata(4, 2)       # a와 b객체에 first객체변수를 각각 생성
>>> print(a.first)
4
>>> b.setdata(3, 7)
>>> print(b.first)
3
>>> print(a.first)        # a객체의 first 값은 b객체의 first값에 영향받지 않고 원래의 값을 유지
4                         # 클래스에 의해 생성된 객체의 객체변수는 독립적인 값을 유지함
```
<br>
<br>

④ 더하기 기능 만들기

```python
# 목표
>>> a = FourCal()
>>> a.setdata(4, 2)
>>> print(a.add())
6
# 목표를 가능하게 하기위해, FourCal 클래스 수정
>>> class FourCal:
...     def setdata(self, first, second):
...         self.first = first
...         self.second = second
...     def add(self):                         # 새롭게 추가된 것은 add라는 메서드
...         result = self.first + self.second  # add 메서드 매개변수는 self, 리턴값은 result
...         return result                      # add 메서드의 self에는 객체 a가 자동으로 입력
                                               # result = a.first + a.second와 같음
# 클래스 사용
>>> a = FourCal()
>>> a.setdata(4, 2)                            # a객체의 first, second 변수에 4, 2 값 저장
>>> print(a.add())                             # add메서드를 호출
>>> 6
```
<br>
<br>

⑤ 곱하기, 빼기, 나누기 기능 만들기

```python
# 덧셈과 동일
>>> class FourCal:
...     def setdata(self, first, second):
...         self.first = first
...         self.second = second
...     def add(self):
...         result = self.first + self.second
...         return result
...     def mul(self):
...         result = self.first * self.second
...         return result
...     def sub(self):
...         result = self.first - self.second
...         return result
...     def div(self):
...         result = self.first / self.second
...         return result

# 동작 확인
>>> a = FourCal()
>>> b = FourCal()
>>> a.setdata(4, 2)
>>> b.setdata(3, 7)
>>> a.add()
6
>>> a.mul()
8
>>> a.sub()
2
>>> a.div()
2
>>> b.add()
10
>>> b.mul()
21
>>> b.sub()
-4
>>> b.div()
0
```
<br>
<br>

## 2. 생성자 (Constructor)
* 생성자(Constructor)란 객체가 생성될 때 자동으로 호출되는 메서드를 의미하며, 객체의 생성 시 호출되기 때문에 생성자라는 이름이 붙었다.
* 생성자는 객체가 처음 생성될 때 호출되어 멤버 변수를 초기화하고, 필요에 따라 자원을 할당하기도 한다. 
* 자바와 C 언어에서 생성자는 클래스의 이름과 같은 이름을 같지만, 파이썬에서는 __init__ 이란 메서드(함수) 이름을 사용하면, 그 메서드는 생성자가 된다.
* 객체에 초기값을 설정해야 할 필요가 있을때는 setdata와 같은 메서드를 호출하여 초기값을 설정하기 보다는 생성자를 구현하는 것이 안전한 방법. __init__ 메서드는 setdata메서드와 이름만 다르고 모든게 동일하다. 단, 메서드 이름을 __init__으로 했기 때문에 생성자로 인식되어 객체가 생성되는 시점에 자동으로 호출되는 차이가 있다.

```python
# add 메서드 수행시 오류 발생 - setdata 메서드 수행해야 객체 a 변수 first, second 생성되므로
>>> a = FourCal()
>>> a.add()
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
  File "<stdin>", line 6, in add
AttributeError: 'FourCal' object has no attribute 'first'

# FourCal클래스에 생성자를 추가
>>> class FourCal:
...     def __init__(self, first, second):
...         self.first = first
...         self.second = second
...     def setdata(self, first, second):
...         self.first = first
...         self.second = second
...     def add(self):
...         result = self.first + self.second
...         return result
...     def mul(self):
...         result = self.first * self.second
...         return result
...     def sub(self):
...         result = self.first - self.second
...         return result
...     def div(self):
...         result = self.first / self.second
...         return result

# 객체 생성 - 매개변수에 해당하는 값 꼭 전달해야 오류 안남
>>> a = FourCal(4, 2)                      # 이를 수행시 __init__ 메서드 매개변수에 아래 값 대입
>>> print(a.first)                         # self, first, second = 생성되는 객체, 4, 2
4
>>> print(a.second)
2
>>> a.add()                                # add, div 메서드 수행
6
>>> a.div()
2.0
```
<br>
<br>

## 3. 클래스의 상속
* 상속(Inheritance)이란 "물려받다"라는 뜻으로, 어떤 클래스를 만들 때 다른 클래스의 기능을 물려받을 수 있게 만드는 것이다.
* 보통 기존 클래스가 라이브러리 형태로 제공되거나 수정이 허용되지 않는 상황이라면, 기존 클래스를 변경하지 않고 기능을 추가하거나, 기존 기능을 변경하려고 상속을 사용한다.

```python
# 클래스 상속 기본 구조
class 클래스명(상속할 클래스명)

# 위의 FourCal을 상속한 MoreFourCal 클래스 만들기
>>> class MoreFourCal(FourCal):
...     pass

>>> a = MoreFourCal(4, 2)                   # MoreFourCal 클래스는 FourCal클래스를 상속했으므로
>>> a.add()                                 # FourCal클래스의 모든 기능을 사용할 수 있다
6
>>> a.mul()
8
>>> a.sub()
2
>>> a.div()
2

# 상속한 MoreFourCal 클래스 수정하기 - a의 b승 (ab) 을 계산해 주는 MoreFourCal클래스
>>> class MoreFourCal(FourCal):
...     def pow(self):                     # 두 수의 거듭 제곱을 구할 수 있는 pow메서드 추가
...         result = self.first ** self.second
...         return result
>>> a = MoreFourCal(4, 2)                  # MoreFourCal 클래스로 만든 a객체에 4, 2 값 세팅
>>> a.pow()                                # pow 메서드 수행
16
```
<br>
<br>

## 4. 메서드 오버라이딩
* 메서드 오버라이딩(Overriding, 덮어쓰기)이란, 부모 클래스(상속한 클래스)에 있는 메서드를 동일한 이름으로 다시 만드는 것이다. 메서드를 오버라이딩하면 부모 클래스의 메서드 대신 오버라이딩한 메서드가 호출된다.

```python
# FourCal 클래스 실행시 오류
>>> a = FourCal(4, 0)
>>> a.div()
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
    result = self.first / self.second
ZeroDivisionError: division by zero         # 4를 0으로 나누려고 하기 때문에 오류

# 0으로 나눌 때 오류가 아닌 0을 리턴하도록 만들고 싶다면
>>> class SafeFourCal(FourCal):             # FourCal클래스를 상속하는 SafeFourCal클래스 생성
...     def div(self):                      # FourCal클래스 내 div 메서드와 동일 이름으로 작성
...         if self.second == 0:            # 나누는 값이 0인 경우 0을 리턴하도록 수정
...             return 0
...         else:
...             return self.first / self.second
>>> a = SafeFourCal(4, 0)                   # ZeroDivisionError 발생하지 않고 0으로 나옴
>>> a.div()
0
```
<br>
<br>

## 5. 클래스 변수
* 클래스 변수는 클래스 안에 함수를 선언하는 것과 마찬가지로 클래스 안에 변수를 선언하여 생성한다.
* 객체변수는 다른 객체들에 의해 영향받지 않고 독립적으로 그 값을 유지한다
* 하지만 클래스 변수는 클래스에 의해 생성된 모든 객체에 공유된다는 특징을 가지고 있다.

```python
# 클래스 작성
>>> class Family:
...     lastname = "김"           # Family 클래스에 선언된 lastname이 바로 클래스 변수

# 클래스 변수 사용 - 클래스명.클래스변수
>>> print(Family.lastname)
김
>>> a = Family()
>>> b = Family()
>>> print(a.lastname)
김
>>> print(b.lastname)
김

>>> Family.lastname = "박"        # Family 클래스의 lastname을 "박"으로 바꾸면
>>> print(a.lastname)             # 클래스 변수의 값을 변경했더니
박                                # 클래스에 의해 생성된 객체들의 lastname 값들도 모두 변경
>>> print(b.lastname)             # 클래스 변수는 클래스에 의해 생성된 모든 객체에 공유된다
박
```
<br>
<br>

## 6. 클래스 예제

```python
# 상속 클래스 UpgradeCalculator에 minus 메서드 추가
>>> class Calculator:
>>>     def __init__(self):                   # 생성자
>>>         self.value = 0                   
>>>     def add(self, val):
>>>         self.value += val
>>> class UpgradeCalculator(Calculator):      # 클래스 상속
>>>     def minus(self, val):                 # minus 메소드 추가
>>>         self.value -= val

>>> cal = UpgradeCalculator()                 # 상속 메소드를 cal 객체에 담음
>>> cal.add(10)                               # UpgradeCalculator의 add 메소드 10
>>> cal.minus(7)                              # UpgradeCalculator의 minus 메소드 7
>>> print(cal.value)                          # 10에서 7을 뺀 3을 출력
3

>>> class Calculator:
>>>     def __init__(self):                   # 생성자
>>>         self.value = 0                   
>>>     def add(self, val):
>>>         self.value += val

>>> class MaxLimitCalculator(Calculator):
>>>     def add(self, val):
>>>   self.value += val
>>>   if self.value > 100:
>>>    self.value = 100
>>> cal = MaxLimitCalculator()
>>> cal.add(50)                               # 50 더하기
>>> cal.add(60)                               # 60 더하기
>>> print(cal.value)                          # 100 출력 
100
```
<br>
<br>
<i> ※ credit: 점프 투 파이썬 https://wikidocs.net/book/1 </i>