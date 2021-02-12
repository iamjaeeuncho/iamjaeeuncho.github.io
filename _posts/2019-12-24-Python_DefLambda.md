---
title: "[Python] 파이썬 함수 - def, lambda"
date: 2019-12-24
categories:
  - study
tags:
  - python
toc: true
toc_sticky: true
---

## 프로그램의 입출력?
* 프로그래머는 프로그램을 만들기 전에 어떤 식으로 동작하게 할 것인지 설계부터 하는데 그때 가장 중요한 부분이 바로 입출력의 설계다. 특정 프로그램만이 사용하는 함수를 만들 것인지, 모든 프로그램이 공통으로 사용하는 함수를 만들 것인지, 더 나아가 오픈 API로 공개하여 외부 프로그램들도 사용할 수 있게 만들 것인지 그 모든 것이 입출력과 관련이 있다.
<br>
<br>

## 함수란?
* 입력값을 가지고 어떤 일을 수행한 다음에 그 결과물을 내어놓는 것 (ex. 믹서기(함수) - 과일(입력), 주스(출력))
* 함수를 사용하는 이유?
  * 반복되는 부분이 있을 경우, "반복적으로 사용되는 가치 있는 부분"을 한 뭉치로 묶어서 "어떤 입력값을 주었을 때 어떤 결과값을 돌려준다"라는식의 함수로 작성하는 것이 현명
  * 자신이 만든 프로그램을 함수화하면 프로그램의 흐름을 일목요연하게 볼 수 있기 때문이다. 함수를 잘 이용하고 함수를 적절하게 만들 줄 아는 사람이 능력 있는 프로그래머이다.
* 함수 생성 예약어: def, lambda

```python
# 파이썬 함수 구조
def 함수명(매개변수):            함수 정의문
    <수행할 문장1>               # def는 함수를 만들 때 사용하는 예약어
    <수행할 문장2>               # 함수명은 함수를 만드는 사람이 임의 설정 가능
    ...                         # 매개변수는 이 함수에 입력으로 전달되는 값을 받는 변수
```

```python
# 함수 사용 예시
>>> def add(a, b):           # 1. add 함수 만들기
>>>    return a + b          # 함수명: add, 입력값 2개(a, b), 결과값은 입력값 2개를 더한 것
                             # return은 함수의 결과값을 돌려주는 명령어
                             
>>> a = 3                    # 2. add 함수 사용
>>> b = 4                    # add 함수에 a와 b를 입력값으로 넣어줌
>>> c = add(a, b)            # 변수 c에 add 함수의 결과값을 대입
>>> print(c)
7
```

> cf. 매개 변수(parameter)와 인수(arguments)
> * 매개변수는 함수에 입력으로 전달된 값을 받는 변수를 의미
> * 인수는 함수를 호출할 때 전달하는 입력값을 의미 (입력값 = 입력 인수 = 인수)
> * 결과값 = 출력값 = 리턴값 = 돌려주는 값

```python
def add(a, b):      # a, b가 매개변수
    return a+b

  print(add(3, 4))    # 3, 4가 인수
```
<br>
<br>

## 1. 입력값과 결과값에 따른 4가지 함수 형태
① 일반적인 함수 : 입력값이 있고 결과값이 있는 함수
* 사용법 : 결과값을 받을 변수 = 함수명(입력 인수 1, 입력 인수 2, ...)

```python
# 일반적인 함수 형태
def 함수이름(매개변수):
    <수행할 문장>
    ...
    return 결과값

# 예시
>>> def add(a, b): 
>>>    result = a + b 
>>>    return result
>>> a = add(3, 4)
>>> print(a)
7
```
<br>
<br>

② 입력값이 없는 함수
* 사용법: 결과값을 받을 변수 = 함수명()

```python
# 입력값이 없는 함수 예시
>>> def say():             # 매개변수 부분이 비어 있는 say라는 이름의 함수
>>>     return 'Hi'        # 입력값은 없지만 결과값으로 Hi라는 문자열을 돌려줌

>>> a = say()              # 위의 함수를 쓰기 위해서는,
>>> print(a)               # say()처럼 괄호 안에 아무런 값도 넣지 않아야 함
Hi
```
<br>
<br>

③ 결과값이 없는 함수
* 사용법: 함수명(입력 인수1, 입력 인수2, ...)

```python
# 결과값이 없는 함수 예시
>>> def add(a, b):    # print문은 함수의 구성 요소 중 하나인 <수행할 문장>에 해당
...     print("%d, %d의 합은 %d입니다." % (a, b, a+b))
      # 결과값은 오직 return 명령어로만 돌려받을 수 있음
>>> add(3, 4)                    
3, 4의 합은 7입니다.

>>> a = add(3, 4)
>>> print(a)
None      # None이란 거짓을 나타내는 자료형
      # 결과값이 없는 함수는 리턴값으로 변수에 None을 돌려줌
      # 하지만 이는 결과값은 아니다
```
<br>
<br>

④ 입력값도 결과값도 없는 함수
* 사용법 : 함수명()

```python
>>> def say():       # 입력 인수를 받는 매개변수도 없고
...     print('Hi')     # return문도 없으니 입력값도 결과값도 없는 함수
... 

>>> say()      # 이 함수를 사용하는 방법은 단 한 가지 - 함수명만 입력
Hi
```
<br>
<br>

## 2. 매개변수 지정하여 호출하기

```python
>>> def add(a, b):
...     return a+b

>>> result = add(a=3, b=7)       # a에 3, b에 7을 전달
>>> print(result)
10

>>> result = add(b=5, a=3)       # b에 5, a에 3을 전달 - 순서에 상관없이 사용 가능
>>> print(result)
8
```
<br>
<br>

## 3. 입력값이 몇 개가 될지 모를 때
* *매개변수: 입력값이 여러개일때, 매개변수 자리에 *매개변수명 작성. 이후 함수 사용시 매개변수 주어지면, 그를 토대로 함수 작동
* **매개변수: 입력값이 여러개일때, 매개변수 자리에 **매개변수명 작성. 한개짜리 *와 다른 점은, 입력된 key=value 형태의 입력인수가 딕셔너리가 된다

```python
# 입력값 모를때 기본 구조
def 함수이름(*매개변수):           # 매개변수명 앞에 *을 붙이면 
    <수행할 문장>                 # 입력값들을 전부 모아서 튜플로 만들어 줌
    ...
```

```python
# 입력값이 여러개일 때, 함수 예시
>>> def add_many(*args):                  # 함수 설정
...     result = 0 
...     for i in args:       # args는 임의로 정한 변수로, 인수 뜻하는 arguments 약자
...         result = result + i 
...     return result 
... 

>>> result = add_many(1,2,3)             # 함수 사용
>>> print(result)
6
>>> result = add_many(1,2,3,4,5,6,7,8,9,10)
>>> print(result)
55

# 입력값이 여러개일 때, 함수 예시 
>>> def add_mul(choice, *args):            # 함수 설정 - 매개변수 2개 사용
...     if choice == "add": 
...         result = 0 
...         for i in args: 
...             result = result + i 
...     elif choice == "mul": 
...         result = 1 
...         for i in args: 
...             result = result * i 
...     return result 
... 
>>> result = add_mul('add', 1,2,3,4,5)      # 함수 사용
>>> print(result)
15
>>> result = add_mul('mul', 1,2,3,4,5)
>>> print(result)
120
```

```python
# 키워드 파라미터 (kwargs) 예시
>>> def print_kwargs(**kwargs):   # 함수 작성
...     print(kwargs)

>>> print_kwargs(a=1)                   # 함수 사용
{'a': 1}
>>> print_kwargs(name='foo', age=3)
{'age': 3, 'name': 'foo'}               # 입력이 모두 딕셔너리로 만들어져서 출력
```
<br>
<br>

## 4. 함수의 결과값은 언제나 하나다
* 함수 결과값이 2개일때는, 튜플값 하나(a, b)로 돌려준다.
* 함수 내에 return문구가 많더라도, 함수는 return문을 만나는 순간 결과값을 돌려준 다음 함수를 빠져나가므로, 첫번째 return값만 호출된다.
* return은 함수를 빠져나가고자 할 때 사용

```python
# 튜플값으로 돌려주는 예시
>>> def add_and_mul(a,b):   # 함수 생성
...     return a+b, a*b

>>> result = add_and_mul(3,4)  # 함수 호출
>>> result = (7, 12)   # 결과값 2개(a+b와 a*b), 결과값 받는 변수 result 하나?
        # 튜플값 하나(a+b, a*b)로 돌려줌
>>> result1, result2 = add_and_mul(3, 4)
     # 만약 하나의 튜플값을 각각의 결과값으로 받고 싶을때,
     # result1은 7이 되고 result2는 12가 됨
                    
# return문을 2번 사용한다면?
>>> def add_and_mul(a,b): 
...     return a+b 
...     return a*b 
... 
>>> result = add_and_mul(2, 3)
>>> print(result)   # 두 번째 return문인 return a*b는 실행되지 않음
5     # 결과값은 5 하나뿐
```
<br>
<br>

## 5. 매개변수 초깃값 미리 설정하기
* 함수의 매개변수에 전달되는 값이 항상 변하는 것이 아닐 경우에는 이렇게 함수의 초깃값을 미리 설정해 두면 유용
* 주의사항: 초기화시키고 싶은 매개변수들을 항상 뒤쪽에 위치시키는 것을 잊지 말자.
  * ex. 매개변수로 (name, old, man=True)는 되지만 (name, man=True, old)는 안 됨

```python
# 매개변수가 3개일 때,
>>> def say_myself(name, old, man=True):    # say_myself 함수는 3개의 입력 인수를 받아서
>>>    print("나의 이름은 %s 입니다." % name) 
>>>    print("나이는 %d살입니다." % old) 
>>>    if man:                              # 마지막 인수인 man이 True면 남자, False면 여자 출력
>>>        print("남자입니다.")
>>>    else: 
>>>        print("여자입니다.")

>>> say_myself("박응용", 27, True)          # man=True처럼 매개변수에 미리 값을 넣어 줌 
                                            # 이것이 함수의 매개변수 초깃값 설정
나의 이름은 박응용입니다.
나이는 27살입니다.
남자입니다.
```
<br>
<br>

## 6. 함수 안에서 선언된 변수의 효력 범위
* 함수 안에서 선언된 매개변수는 함수 안에서만 사용될 뿐 함수 밖에서는 사용되지 않는다.

```python
# 함수
>>> a = 1
>>> def vartest(a):          # 당연히 vartest 함수에서 매개변수 a의 값에 1을 더했으니
>>>    a = a +1              #  2가 출력되어야 할 것 같지만 결과값은 1이 나옴
>>> vartest(a)               # def vartest(a)에서 입력 값을 전달받는 매개변수 a는 
>>> print(a)                 # 함수 안에서만 사용되는 변수이지 함수 밖의 변수 a가 아니다.
1

>>> def vartest(hello):      # 위의 vartest 함수는 변수 이름을 hello로 변경한 
>>> hello = hello + 1        # 옆의 vartest 함수와 동일

# 함수 에러
>>> def vartest(a):
>>>    a = a + 1
>>> vartest(3)               # vartest(3)을 수행하면 vartest라는 함수 내에서 a는 4가 됨
>>> print(a)                 # 하지만 print(a)에서 사용된 a 변수를 찾을 수가 없으므로 에러.
                             # 함수 안에서 선언된 매개변수는 함수 안에서만 사용.
```
<br>
<br>

## 7. 그렇다면, 함수 안에서 함수 밖의 변수를 변경하는 방법은?
* return 사용: 함수 내에서 결과값을 return으로 받고, 이를 변수로 받아서 출력. 권장사항
* global 명령서 사용: 문장은 함수 안에서 함수 밖의 a 변수를 직접 사용하겠다는 뜻의 global 명령어 사용. 하지만 함수는 독립적인 것이 좋으므로 비추천. - 외부 변수에 종속적인 함수는 그다지 좋은 함수가 아니다.

```python
# 1. return 이용하기
a = 1 
def vartest(a):              # vartest 함수 안의 a 매개변수는 함수 밖의 a와는 다른 것
    a = a +1 
    return a
a = vartest(a)               # a = vartest(a)라고 대입하면 a가 vartest 함수의 결과값으로 바뀜
print(a)                     # 위에 a 값을 받아 출력. 

# 2. global 명령어 이용하기
a = 1 
def vartest(): 
    global a                 # 함수 안에서 함수 밖의 a 변수를 직접 사용하겠다는 뜻
    a = a+1

vartest() 
print(a)
```
<br>
<br>

## 8. lambda
* 함수를 생성할 때 사용하는 예약어로 def와 동일한 역할.
* 보통 def를 사용해야 할 정도로 복잡하지 않거나 def를 사용할 수 없는 곳에 주로 쓰임.

```python
# 사용법
lambda 매개변수1, 매개변수2, ... : 매개변수를 이용한 표현식
```

```python
# 람바다 예시
>>> add = lambda a, b: a+b     # 2개의 인수를 받아 서로 더한 값을 리턴하는 lambda 함수
>>> result = add(3, 4)
>>> print(result)
7

# 위와 동일한 def 함수
>>> def add(a, b):
...     return a+b
...
>>> result = add(3, 4)
>>> print(result)
7
```
<br>
<br>

## 9. 함수 예시

```python
# 1. 홀수 짝수 판별 - def
>>> def is_odd(number):
...     if number % 2 == 1:  # 2로 나누었을 때 나머지가 1이면 홀수이다. 
...         return True
...     else:
...         return False
... 
>>> is_odd(3)
True
>>> is_odd(4)
False

# 2. 홀수 짝수 판별 - 람다식
>>> is_odd = lambda x: True if x % 2 == 1 else False
>>> is_odd(3)
True

# 3. 평균값 계산
>>> def avg_numbers(*args):  # 입력 갯수에 상관없이 사용하기 위해 *args를 이용
...     result = 0
...     for i in args:
...         result += i
...     return result / len(args)
... 
>>> avg_numbers(1, 2)
1.5
>>> avg_numbers(1,2,3,4,5)
3.0
```