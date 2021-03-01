---
title: "[Python] 파이썬 클래스와 객체"
date: 2020-9-15
categories:
- study
tags:
- python
toc: true
toc_sticky: true
---

## 클래스와 객체?

<center>
<br><img src="https://user-images.githubusercontent.com/46369038/109480598-0ec3fe80-7abf-11eb-993d-bb963763c0d3.PNG" width="500" style="border: 2px solid rgb(213, 213, 213);"><br><br>
<i>Credit: https://www.itple.co.kr/116</i>
</center>
<br>

### 클래스(class)
- 실세계의 것을 모델링하여 속성(attribute)와 행동(method)를 갖는 데이터 타입 
- 파이썬에서의 string, int, list, dict 등 모두가 다 클래스로 존재
- 예를 들어 학생이라는 클래스를 만든다면, 학생을 나타내는 속성과 학생이 행하는 행동을 함께 정의 할 수 있음 (ex. 속성 = items, 행동 = append, extend, etc...)
- 따라서, 다루고자 하는 데이터(변수)와 데이터를 다루는 연산(함수)를 하나로 캡슐화(encapsulation)하여 클래스로 표현
- 모델링에서 중요시 하는 속성에 따라 클래스의 속성과 행동이 각각 달라짐

```python
a = [1, 2, 3, 4]
a.append(5)
print(a)
```
<br>
<br>

### 객체(object) 
- 클래스로 생성되어 구체화된 객체(인스턴스)
- 파이썬의 모든 것(int, str, list..etc)은 객체(인스턴스)
- 실제로 class가 인스턴스화 되어 메모리에 상주하는 상태를 의미
- class가 빵틀이라면, object는 실제로 빵틀로 찍어낸 빵이라고 비유 가능
<br>
<br>

## Class
### 클래스 선언
- 객체를 생성하기 위해선 객체의 모체가 되는 class를 미리 선언해야 함 

```python
# 클래스 만들기

class Person:
    pass
------------------------------
# 정의는 하고 싶은데, 내부는 비워두고 싶을 때 'pass'

def test():
    pass
------------------------------
# a/b는 list 클래스, bob/cathy는 커스텀한 Person 클래스

a = list()
b = list()

bob = Person()
cathy = Person()

# a 객체의 행동(method)가 append
a.append

print(type(bob), type(cathy))
print(type(a), type(b))
```
<br>
<br>

#### __init__(self)
- init은 파이썬 개체가 생성되는 순간 호출되는  함수로, 주로 클래스가 다루고자하는 데이터를 주로 명시
- self인자는 항상 첫번째에 오며 자기 자신을 가리킴. 이름이 꼭 self일 필요는 없지만, 관례적으로 self로 사용
- 생성자에서는 해당 클래스가 다루는 데이터를 정의하며, 이 데이터를 멤버 변수(member variable) 또는 속성(attribute)라 함

```python
# Person(class)의 속성(method)이 name과 age
# 하지만 이 경우 name과 age가 kate로 속성 고정됨
class Person:
    def __init__(self):
        print(self, 'is generated')
        #   .속성(attribute)
        self.name = 'Kate'
        self.age = 10

p1 = Person()
p2 = Person()

p1.name = 'aaron'
p1.age = 20

print(p1.name, p1.age)
------------------------------
# 기본값 self 이외의 변수값 받고 싶을 때
# 기본 파라미터값 설정 가능
class Person:
    def __init__(self, n, a=10):          # 속성값과 이름 같을 필요 없음
        self.name = n
        self.age = a

p1 = Person('Bob', 30)
p2 = Person('Kate', 20)
p3 = Person('Aaron')

print(p1.name, p1.age)
print(p2.name, p2.age)
print(p3.name, p3.age)
```
<br>
<br>

##### self
- self는 현재 해당 행동(method)가 호출되는 객체 자신을 가리키며, C++/C#, Java의 this에 해당.
- 파이썬 method는 항상 첫번째 인자로 self를 전달
- 이름이 굳이 self일 필요는 없으나, 위치는 항상 맨 처음의 parameter이며 관례적으로 self로 사용

```python
# 클래스 Person안에 __init__과 sleep이라는 메소드
class Person:
    def __init__(self, name, age):
        print('self: ', self)           # self는 객체 자체 (ex. Person클래스가 만들어진 a 자체)
        self.name = name
        self.age = age
    
    def sleep(self):
        print('self: ', self)           # self는 a가 됨
        print(self.name, '은 잠을 잡니다.')
        
a = Person('Aaron', 20)
b = Person('Bob', 30)

print(a)
print(b)

a.sleep()
b.sleep()
```
<br>
<br>

### 클래스 상속
- 기존에 정의해둔 클래스의 기능을 그대로 물려받아, 일부를 추가하거나 변경하여 새로운 클래스를 정의한다.
- 상속 받고자 하는 대상인 기존 클래스는 'Parent, Super, Base class' 라고 부른고, 상속 받는 새로운 클래스는 'Child, Sub, Derived class' 라고 부른다.
- 의미적으로 상속 관계(is-a)를 갖으며, 코드를 재사용할 수 있는 장점이 있다

```python
class Person:                          # 부모 클래스
    def __init__(self, name, age):
        self.name = name
        self.age = age
    def eat(self, food):
        print('{}은 {}를 먹습니다.'.format(self.name, food))
    def sleep(self, minute):
        print('{}은 {}분 동안 잡니다.'.format(self.name, minute))
    def work(self, minute):
        print('{}은 {}분 동안 일합니다.'.format(self.name, minute))
        
class Student(Person):                  # 부모 클래스 상속
    def __init__(self, name, age):
        self.name = name
        self.age = age

class Employee(Person):
    def __init__(self, name, age):
        self.name = name
        self.age = age

bob = Student('Bob', 25)
bob.eat('BBQ')
bob.sleep(30)
bob.work(60)
```
<br>
<br>

## Mehtod
- 행동(method) 클래스의 데이터인 객체(object)를 처리하는 행동으로, 함수의 형태로 객체 내부에서 연산 수행
- 해당 클래스의 object에서만 호출 가능하며, 멤버 함수라고도 함.

```python
# 메소드 = 객체명.메소드 이름()
a = list()
print(a.append(0))
------------------------------
# 카운터 기능 1. 숫자 하나씩 증가 2. 숫자 0으로 초기화
class Counter:
    def __init__(self):              # 첫번째 파라미터는 self = 자신의 주소가 넘어오게 되어 있음
        self.num = 0                 # Counter 클래스는 num 데이터를 갖고 항상 0으로 초기화
    
    def increment(self):
        self.num += 1
    
    def reset(self):
        self.num = 0
    
    def print_current_value(self):
        print('현재값은:', self.num)
        
c1 = Counter()
c1.print_current_value()
c1.increment()
c1.increment()
c1.increment()
c1.print_current_value()

c1.reset()
c1.print_current_value()

c2 = Counter()
c2.increment()
c2.print_current_value()
```
<br>
<br>

### 메쏘드 재정의
- 부모 클래스의 method를 다시 써서 재정의(override)함
- 하위 클래스(자식 클래스)의 인스턴스로 호출시, 재정의된 메소드가 호출됨

```python
class Person:                            # 부모 클래스
    def __init__(self, name, age):
        self.name = name
        self.age = age
    def eat(self, food):
        print('{}은 {}를 먹습니다.'.format(self.name, food))
    def sleep(self, minute):
        print('{}은 {}분 동안 잡니다.'.format(self.name, minute))
    def work(self, minute):
        print('{}은 {}분 동안 일합니다.'.format(self.name, minute))
        
class Student(Person):                    # 부모 클래스 'Person' 상속
    def __init__(self, name, age):
        self.name = name
        self.age = age
    def work(self, minute):
        print('{}은 {}분 동안 공부합니다.'.format(self.name, minute))

class Employee(Person):
    def __init__(self, name, age):
        self.name = name
        self.age = age
    def work(self, minute):
        print('{}은 {}분 동안 업무를 합니다.'.format(self.name, minute))

bob = Employee('Bob', 25)
bob.eat('BBQ')
bob.sleep(30)
bob.work(60)
```
<br>
<br>

#### super
- 하위클래스(자식 클래스)에서 부모클래스의 method를 호출할 때 사용
- 보통 오버라이딩하면 부모 클래스 기능 완전히 사라지나, super를 사용하면 부모 클래스에서 일부만 추가 가능

```python
class Person:                       # 부모 클래스
    def __init__(self, name, age):
        self.name = name
        self.age = age
    def eat(self, food):
        print('{}은 {}를 먹습니다.'.format(self.name, food))
    def sleep(self, minute):
        print('{}은 {}분 동안 잡니다.'.format(self.name, minute))
    def work(self, minute):
        print('{}은 {}분 동안 일할 준비를 합니다.'.format(self.name, minute))
        
class Student(Person):             # 부모 클래스 상속
    def __init__(self, name, age):
        self.name = name
        self.age = age
    def work(self, minute):
        super().work(minute)        # super
        print('{}은 {}분 동안 공부합니다.'.format(self.name, minute))

class Employee(Person):
    def __init__(self, name, age):
        self.name = name
        self.age = age
    def work(self, minute):
        super().work(minute)        # super
        print('{}은 {}분 동안 업무를 합니다.'.format(self.name, minute))

bob = Employee('Bob', 25)
bob.eat('BBQ')
bob.sleep(30)
bob.work(60)                 # 부모 클래스도 이용하면서 나의 기능도 추가
```
<br>
<br>

### 메소드 종류
1. instance method
- 객체 메쏘드는 객체 레벨로 호출되기 때문에, 해당 메쏘드를 호출한 객체에만 영향을 미침

```python
# 객체 메쏘드 (instance method)
class Math:
    def add(self, a, b):     
        return a + b
    def multiply(self, a, b):
        return a * b
    
m = Math()
m.add(10, 20)
m.multiply(10, 20)
```

2. class method
- 클래스 메쏘드는 클래스 레벨로 호출되기 때문에, 클래스 멤버 변수만 변경 가능

```python
# 클래스 메쏘드 (class method)
class Math:
    @staticmethod
    def add(a, b):           # self 자기 내부의 데이터가 없을때는 삭제 가능
        return a + b
    @staticmethod
    def multiply(a, b):
        return a * b
    
# m = Math()                 # 개체 생성할 필요 없이
Math.add(10, 20)             # 클래스 이름으로 불러와 일반 함수처럼 사용
Math.multiply(10, 20)
```
<br>
<br>

3. special method
- __로 시작 __로 끝나는 특수 함수로, 커스텀한 객체에 여러가지 파이썬 내장 함수나 연산자를 적용 가능
- 오버라이딩 가능한 함수 목록: https://docs.python.org/3/reference/datamodel.html

```python
class Point:
    def __init__(self, x, y):
        self.x = x
        self.y = y
    
    def __add__(self, pt):
        new_x = self.x + pt.x      # p1(self).x + p2.y = 새로운 x
        new_y = self.y + pt.y
        return Point(new_x, new_y)
    
    def __sub__(self, pt):
        new_x = self.x - pt.x      # p1(self).x + p2.y = 새로운 x
        new_y = self.y - pt.y
        return Point(new_x, new_y)

    def __mul__(self, factor):
        return Point(self.x * factor, self.y * factor)

    def __getitem__(self, index):
        if index == 0:
            return self.x
        elif index == 1:
            return self.y
        else:
            return -1
```
<br>
<br>

## 연습문제
### 복소수 클래스 정의

```python
import math

class ComplexNumber:
    def __init__(self, real, img):      # real 실수, img 허수
        self.real = real
        self.img = img

# 복소수의 덧셈, 뺄셈
    def __add__(self, cn):
        return ComplexNumber(self.real + cn.real, self.img + cn.img)
    def __sub__(self, cn):
        return ComplexNumber(self.real - cn.real, self.img - cn.img)

# 복소수의 곱셈 (a + bj) * (c + dj) = (ac - bd) + (ad + bd)j   
    def __mul__(self, x):
        if type(x) == int:
            return ComplexNumber(self.real * x, self.img * x)
        elif type(x) == ComplexNumber:
            return ComplexNumber(self.real * x.real - self.img * x.img, self.real * x.img + self.img + x.real)

# 복소수 '1 + 4j'와 같이 표현
    def __str__(self):
        if self.img > 0:
            return '{} + {}j'.format(self.real, self.img)
        else:                           # self.img < 0:
            return '{} - {}j'.format(self.real, abs(self.img)) # abs = 0

# 복소수 비교 연산 ==, != 지원
    def __eq__(self, cn):               # equal
        return self.real == cn.real and self.img == cn.img
    def __ne__(self, cn):               # not equal
        return not (self.real == cn.real and self.img == cn.img)

# 복소수의 절대값 지원
    def __abs__(self):                 
        return math.sqrt(self.real ** 2 + self.img ** 2)

# 복소수의 길이 (복소수의 크기) 지원
    def __len__(self):                 
        return math.sqrt(self.real ** 2 + self.img ** 2)
    
a = ComplexNumber(1, 2)
b = ComplexNumber(3, 2)

a != b                        # 다른 객체와 메모리값이라 false로 나옴

# print(a + b)
# print(a * 3)
# print(a * b)

abs(a)
```
