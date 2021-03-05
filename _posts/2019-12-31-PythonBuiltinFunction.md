---
title: "[Python] 파이썬 자주 쓰는 내장함수들"
date: 2019-12-31
categories:
  - study
tags:
  - python
toc: true
toc_sticky: true
---

## 내장 함수란?
* 파이썬 배포본에 함께 들어 있는 파이썬 라이브러리들을 내장 함수라 한다
* Don’t Reinvent The Wheel, 이미 있는 것을 다시 만드느라 쓸데없이 시간을 낭비하지 말라
* 이미 만들어진 프로그램들은 테스트 과정을 수도 없이 거쳤기 때문에 충분히 검증되어 있다. 
* 파이썬 내장 함수들은 외부 모듈과는 달리 import를 필요로 하지 않는다. 아무런 설정 없이 바로 사용할 수가 있다. 
<br>
<br>

### abs
* abs(x)는 어떤 숫자를 입력으로 받았을 때, 그 숫자의 절대값을 돌려주는 함수

```python
>>> abs(3) 
3 
>>> abs(-3) 
3 
>>> abs(-1.2) 
1.2 
```
<br>
<br>

### all
* 요소 중 하나라도 거짓이면 False, 다 참이여야 True
* all(x)은 반복 가능한(iterable) 자료형 x를 입력 인수로 받아
* 이 x의 모든 요소가 참이면 True, 거짓이 하나라도 있으면 False를 리턴. 
* ※ 반복 가능한 자료형이란 for문으로 그 값을 출력할 수 있는 것을 의미하는데, 리스트, 튜플, 문자열, 딕셔너리, 집합 등이 있다. 

```python
# 리스트 자료형 [1, 2, 3]은 모든 요소가 참이므로 True 리턴
>>> all([1, 2, 3])
True

# 리스트 자료형 [1, 2, 3, 0] 중에서 요소 0은 거짓이므로 False 리턴
>>> all([1, 2, 3, 0])
False
```
<br>
<br>

### any
* all(x)의 반대 경우 - 하나라도 참이면 True 리턴, 모두 거짓이면 False 리턴

```python
# 리스트 자료형 [1, 2, 3, 0] 중에서 1, 2, 3이 참이므로 True 리턴
>>> any([1, 2, 3, 0])
True

# 리스트 자료형 [0, ""]의 요소 0과 ""은 모두 거짓이므로 False 리턴
>>> any([0, ""])
False
```
<br>
<br>

### chr
* chr(i)는 아스키(ASCII) 코드값을 입력으로 받아 그 코드에 해당하는 문자를 출력하는 함수.
※ 아스키 코드란 0에서 127 사이의 숫자들을 각각 하나의 문자 또는 기호에 대응시켜 놓은 것이다. 

```python
>>> chr(97) 
'a' 
>>> chr(48) 
'0'
```
<br>
<br>

### dir
* dir은 객체가 자체적으로 가지고 있는 변수나 함수를 보여 준다. 

```python
>>> dir([1, 2, 3]) 
['append', 'count', 'extend', 'index', 'insert', 'pop',...] 
>>> dir({'1':'a'}) 
['clear', 'copy', 'get', 'has_key', 'items', 'keys',...]
```
<br>
<br>

### divmod
* 몫과 나머지를 튜플 형태로 리턴
* divmod(a, b)는 2개의 숫자를 입력으로 받는다. 그리고 a를 b로 나눈 몫과 나머지를 튜플 형태로 리턴하는 함수이다. 

```python
>>> divmod(7, 3) 
(2, 1) 

# 몫을 구하는 연산자 //와 나머지를 구하는 연산자 % 를 각각 사용한 결과와 비교해 보자. 
>>> 7 // 3 
2 
>>> 7 % 3 
1 
```
<br>
<br>

### enumerate
* 순서값과 입력값을 enumerate 객체로 리턴
* 순서가 있는 자료형(리스트, 튜플, 문자열)을 입력받아 인덱스 값을 포함하는 enumerate 객체를 리턴한다. 
* enumerate는 "열거하다"라는 뜻으로, 보통 for문과 자주 사용된다. for문과 함께 사용하면 자료형의 현재 순서(index)와 그 값을 쉽게 알 수 있어 유용하다.

```python
>>> for i, name in enumerate(['body', 'foo', 'bar']): 
...     print(i, name) 
... 
0 body 
1 foo 
2 bar
```
<br>
<br>

### eval
* expression의 약자로, 실행 가능한 문자열(1+2, 'hi' + 'a' 등)을 입력받아 문자열을 실행한 결과값을 리턴하는 함수
* 보통 eval은 입력받은 문자열로 파이썬 함수나 클래스를 동적으로 실행하고 싶은 경우에 사용된다. 

```python
>>> eval('1+2') 
3 
>>> eval("'hi' + 'a'") 
'hia' 
>>> eval('divmod(4, 3)') 
(1, 1) 
```
<br>
<br>

### filter 
* filter란 무엇인가를 걸러낸다는 뜻으로, 
* 첫 번째 인수로 함수 이름, 두 번째 인수로 함수에 들어갈 반복 가능한 자료형을 받는다. 
* 그리고 두 번째 인수인 반복 가능한 자료형 요소들이 첫 번째 인수인 함수에 입력되었을 때,
* 리턴값이 참인 것만 묶어서(걸러내서) 돌려준다. 

```python
# positive 함수는 양수값만 리턴하는 함수
>>> def positive(l):                      # 리스트를 입력값으로 받아
>>>     result = []  
>>>     for i in l:  
>>>         if i > 0:                     # 양수값만 리턴
>>>             result.append(i)  
>>>     return result 
>>> print(positive([1,-3,2,0,-5,6])) 
[1, 2, 6] 

# filter 함수를 이용하면
>>> def positive(x):
>>>     return x > 0
>>> print(list(filter(positive, [1, -3, 2, 0, -5, 6])))
[1, 2, 6]

#  lambda 이용하면
>>> list(filter(lambda x: x > 0, [1, -3, 2, 0, -5, 6]))
[1, 2, 6]
```
<br>
<br>

### hex
* hex(x)는 정수값을 입력받아 16진수(hexadecimal)로 변환하여 리턴하는 함수

```python
>>> hex(234) 
'0xea' 
>>> hex(3) 
'0x3'
```
<br>
<br>

### id
* id(object)는 객체를 입력받아 객체의 고유 주소값(레퍼런스)을 리턴하는 함수

```python
# 고유 주소값이 같은 3, a, b와 다른 4
>>> a = 3
>>> id(3)
135072304
>>> id(a)
135072304
>>> b = a
>>> id(b)
135072304
>>> id(4)
135072292
```
<br>
<br>

### input
* input([prompt])은 사용자 입력을 받는 함수
* 입력 인수로 문자열을 주면 아래의 세 번째 예에서 볼 수 있듯이 그 문자열은 프롬프트가 된다.
* [ ] 기호는 괄호 안의 내용을 생략할 수 있다는 관례적인 표기법

```python
>>> a = input() 
hi 
>>> a 
'hi' 
>>> b = input("Enter: ") 
Enter: hi 
>>> b 
'hi' 
```
<br>
<br>

### int
* 정수를 입력으로 받으면 정수 그대로 리턴
* int(x)는 문자열 형태의 숫자나 소수점이 있는 숫자 등을 정수 형태로 리턴하는 함수 
* int(x, radix)는 radix 진수로 표현된 문자열 x를 10진수로 변환하여 리턴

```python
>>> int('3')
3
>>> int(3.4)
3

# int(x, radix)
>>> int('11', 2)        # 2진수로 표현된 '11'의 10진수 값
3
>>> int('1A', 16)       # 16진수로 표현된 '1A'의 10진수 값
26
```
<br>
<br>

### isinstance
* isinstance(object, class)는 첫 번째 인수로 인스턴스, 두 번째 인수로 클래스 이름을 받는다. 
* 입력 받은 인스턴스가 그 클래스의 인스턴스인지를 판단하여 참이면 True, 거짓이면 False를 리턴한다.

```python
>>> class Person: pass 

# a가 Person 클래스에 의해서 생성된 인스턴스임을 확인
>>> a = Person() 
>>> isinstance(a, Person) 
True 

# b는 Person 클래스에 의해 생성된 인스턴스가 아니므로 False 리턴
>>> b = 3 
>>> isinstance(b, Person) 
False
```
<br>
<br>

### len
* len(s)은 입력값 s의 길이(요소의 전체 개수)를 리턴하는 함수이다. 

```python
>>> len("python") 
6 
>>> len([1,2,3]) 
3 
>>> len((1, 'a')) 
2
```
<br>
<br>

### list
* list(s)는 반복 가능한 자료형 s를 입력받아 리스트로 만들어 리턴하는 함수이다.

```python
>>> list("python") 
['p', 'y', 't', 'h', 'o', 'n'] 
>>> list((1,2,3)) 
[1, 2, 3] 

# list 함수에 리스트를 입력하면 똑같은 리스트를 복사하여 돌려준다. 
>>> a = [1, 2, 3] 
>>> b = list(a) 
>>> b 
[1, 2, 3]
```
<br>
<br>

### map
* map(f, iterable)은 함수(f)와 반복 가능한(iterable) 자료형을 입력으로 받는다. 
* map은 입력받은 자료형의 각 요소가 함수 f에 의해 수행된 결과를 묶어서 리턴하는 함수이다. 

```python
# two_times.py
>>> def two_times(numberList):
>>>     result = [ ]
>>>     for number in numberList:
>>>         result.append(number*2)
>>>     return result
>>> result = two_times([1, 2, 3, 4])
>>> print(result)
[2, 4, 6, 8]

# map 함수를 이용하면,
>>> def two_times(x):                     # 첫번째로 1이 two_times 함수의 입력값으로 들어가 
>>>     return x*2                        # 1 * 2의 과정을 거쳐서 2가 됨
>>> list(map(two_times, [1, 2, 3, 4]))    # map 결과를 리스트로 보여 주기 위해 list 함수 이용
[2, 4, 6, 8]

# lambda를 사용하면,
>>> list(map(lambda a: a*2, [1, 2, 3, 4]))
[2, 4, 6, 8]
```
<br>
<br>

### max
* max(iterable)는 인수로 반복 가능한 자료형을 입력받아 그 최대값을 리턴하는 함수이다. 

```python
>>> max([1, 2, 3]) 
3 
>>> max("python") 
'y'
```
<br>
<br>

### min
* min(iterable)은 max 함수와 반대로, 인수로 반복 가능한 자료형을 입력받아 그 최소값을 리턴하는 함수이다. 

```python
>>> min([1, 2, 3]) 
1 
>>> min("python") 
'h'
```
<br>
<br>

### oct
* oct(x)는 정수 형태의 숫자를 8진수 문자열로 바꾸어 리턴하는 함수이다. 

```python
>>> oct(34) 
'0o42' 
>>> oct(12345) 
'0o30071'
```
<br>
<br>

### open
* open(filename, [mode])은 "파일 이름"과 "읽기 방법"을 입력받아 파일 객체를 리턴하는 함수이다. 
* 읽기 방법(mode)이 생략되면 기본값인 읽기 전용 모드(r)로 파일 객체를 만들어 리턴한다.
  * w 모드 : 쓰기 모드로 파일 열기
  * r 모드 : 읽기 모드로 파일 열기
  * a 모드 : 추가 모드로 파일 열기
  * b 모드 : 바이너리 모드로 파일 열기 - b는 w, r, a와 함께 사용된다. 

```python
>>> f = open("binary_file", "rb")     # rb는 "바이너리 읽기 모드"를 의미

# 동일한 방법의 fread와 fread2
>>> fread = open("read_mode.txt", 'r')
>>> fread2 = open("read_mode.txt")

# 추가 모드(a)로 파일을 여는 예
>>> fappend = open("append_mode.txt", 'a')
```
<br>
<br>

### ord
* ord 함수는 chr 함수와 반대로, ord(c)는 문자의 아스키 코드값을 리턴하는 함수

```python
>>> ord('a') 
97 
>>> ord('0') 
48
```
<br>
<br>

### pow
* pow(x, y)는 x의 y 제곱한 결과값을 리턴하는 함수

```python
>>> pow(2, 4) 
16 
>>> pow(3, 3) 
27
```
<br>
<br>

### range
* range([start,] stop [,step])는 for문과 함께 자주 사용되는 함수이다. 
* 이 함수는 입력받은 숫자에 해당되는 범위의 값을 반복 가능한 객체로 만들어 리턴한다. 

```python
# 1. 인수가 하나일 경우 
>>> list(range(5))            # 시작 숫자를 지정해 주지 않으면 range 함수는 0부터 시작
[0, 1, 2, 3, 4]

# 2. 인수가 2개일 경우 
>>> list(range(5, 10))        # 2개의 인수는 시작 숫자와 끝 숫자를 나타낸다.
[5, 6, 7, 8, 9]               # 단, 끝 숫자는 해당 범위에 포함되지 않는다

# 3. 인수가 3개일 경우
>>> list(range(1, 10, 2))     # 세 번째 인수는 숫자 사이의 거리를 말한다.
[1, 3, 5, 7, 9] 
>>> list(range(0, -10, -1)) 
[0, -1, -2, -3, -4, -5, -6, -7, -8, -9]
```
<br>
<br>

### round
* round(number[, ndigits]) 함수는 숫자를 입력받아 반올림 해 주는 함수
* round 함수의 두번째 파라미터는 반올림하여 표시하고 싶은 소수점의 자리수(ndigits)이다. 

```python
>>> round(4.6) 
5 
>>> round(4.2) 
4 

# 만약 5.678 라는 실수를 소수점 2자리까지만 반올림하여 표시하고 싶다면
>>> round(5.678, 2) 
5.68
```
<br>
<br>

### sorted
* sorted(iterable) 함수는 입력값을 정렬한 후 그 결과를 리스트로 리턴하는 함수
* 리스트 자료형에도 sort라는 함수가 있지만 리스트 자료형의 sort 함수는 리스트 객체 그 자체를 정렬만 할 뿐 정렬된 결과를 리턴하지는 않는다.

```python
>>> sorted([3, 1, 2]) 
[1, 2, 3] 
>>> sorted(['a', 'c', 'b']) 
['a', 'b', 'c'] 
>>> sorted("zero") 
['e', 'o', 'r', 'z'] 
>>> sorted((3, 2, 1)) 
[1, 2, 3]
```
<br>
<br>

### str
* str(object)은 문자열 형태로 객체를 변환하여 리턴하는 함수이다. 

```python
>>> str(3) 
'3' 
>>> str('hi') 
'hi' 
>>> str('hi'.upper()) 
'HI'
```
<br>
<br>

### sum
* sum(iterable)은 입력으로 받은 리스트나 튜플의 모든 요소의 합을 리턴하는 함수이다. 

```python
>>> sum([1,2,3]) 
6 
>>> sum((4,5,6)) 
15
```
<br>
<br>

### tuple
* tuple(iterable)은 반복 가능한 자료형을 입력받아 튜플 형태로 바꾸어 리턴하는 함수이다. 
* 만약 튜플이 입력으로 들어오면 그대로 리턴한다. 

```python
>>> tuple("abc") 
('a', 'b', 'c') 
>>> tuple([1, 2, 3]) 
(1, 2, 3) 
>>> tuple((1, 2, 3)) 
(1, 2, 3) 
```
<br>
<br>

### type
* type(object)은 입력값의 자료형이 무엇인지 알려주는 함수

```python
>>> type("abc")
<class 'str'>
>>> type([ ])
<class 'list'>
>>> type(open("test", 'w'))
<class '_io.TextIOWrapper'>
```
<br>
<br>

# zip
* zip(*iterable)은 동일한 개수로 이루어진 자료형을 묶어 주는 역할을 하는 함수이다.
* 위에서 사용된 *iterable 의 의미는 반복가능(iterable)한 자료형 여러개가 입력으로 가능하다는 의미이다.

```python
>>> list(zip([1, 2, 3], [4, 5, 6])) 
[(1, 4), (2, 5), (3, 6)] 
>>> list(zip([1, 2, 3], [4, 5, 6], [7, 8, 9])) 
[(1, 4, 7), (2, 5, 8), (3, 6, 9)] 
>>> list(zip("abc", "def")) 
[('a', 'd'), ('b', 'e'), ('c', 'f')]
```
<br>
<br>
<i> ※ credit: 점프 투 파이썬 https://wikidocs.net/book/1 </i>