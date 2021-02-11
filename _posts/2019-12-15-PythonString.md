---
title: "［Python］파이썬 문자열 자료형 - 인덱싱, 슬라이싱, 내장함수들"
date: 2019-12-15
categories:
  - study
tags:
  - python
---

## 문자열(String)이란?
* 문자, 단어 등으로 구성된 문자들의 집합
* 식별: 인용 부호, 단일(') 또는 이중(") 따움표, 사이에 있는 문자의 연속된 집합으로 식별
* 연산: '+' 문자 더하기, '*' 문자 반복하기, 'len함수' 문자열의 길이 구하기
* 인덱싱(Indexing, 가르키다)은 한 글자만 뽑아내고, 슬라이싱(Slicing, 잘라내다)은 한 단어를 뽑아낸다.


## 1. 문자열 만드는 법: 큰 따옴표, 작은 따음표로 둘러싸기
```python
# 1. 큰따옴표, 작은따옴표로 양쪽 둘러싸기
"Hello World"
'Python is fun'

#2. 큰따옴표, 작은따옴표 3개를 연속으로 써서 양쪽 둘러싸기
"""Life is too short, You need python"""
'''Life is too short, You need python'''

#3. 문자열에 작은따옴표 (') 포함시에는, 큰 따옴표(")로 둘러싸기
"Python's favorite food is perl"

#4. 문자열에 큰따옴표 (") 포함시에는, 작은 따옴표(')로 둘러싸기
'"Python is very easy." he says.'
```


## 2. 여러줄의 문자열 만드는 법: 이스케이프 코드 (\n)나 작은/큰 따옴표 3개
```python
#1. 줄을 바꾸기 위한 이스케이프 코드 \n 삽입하기
"Life is too short\nYou need python"

#2. 연속된 작은따옴표 3개(''') 또는 큰따옴표 3개(""") 사용
"""
Life is too short
You need python
"""
```
* cf. 이스케이프 코드
  * 정의: 프로그래밍할 때 사용할 수 있도록 미리 정의해 둔 "문자 조합"
  * 자주 사용하는 코드들: \n(줄바꿈), \t(수평탭), \\(문자 "\"), \'(단일 인용부호 ['] ), \"(이중 인용부호 ["] )


## 3. 문자열 연산
* '+' 기호는 문자 더하기, '*' 기호는 문자 반복하기
* len함수로 문자열의 길이를 구할 수 있다.
```python
# 1. 문자열 더하기
>>> head = "Python"
>>> tail = " is fun!"
>>> head + tail
'Python is fun!'

# 2. 문자열 곱하기
>>> a = "python"
>>> a * 2
'pythonpython'

# 2-1. 문자열 곱하기 예시
>>> print("=" * 50)
>>> print("My Program")
>>> print("=" * 50)
==================================================
My Program
==================================================

#3. 문자열 길이 구하기, len 함수
>>> a = "Life is too short"
>>> len(a)
17
```


## 4. 문자열 인덱싱(Indexing) - 가르킨다
* 문자열의 각 문자마다 번호를 매겨서, 문자열 내 특정한 값을 뽑아내는 역할
* 문자열 변수명[번호] (ex. a[1]  = a 문자열의 1번째 문자 인덱싱)
* 숫자가 양수면 앞에서, 음수면 뒤에서부터 카운팅. 파이썬은 0부터 숫자를 센다. 

```python
# 문자열 인덱싱 순서 - 파이썬은 0부터 숫자를 센다
Life is too short, You need Python
0         1         2         3 
0123456789012345678901234567890123

# 문자열 인덱싱 실행
>>> a = "Life is too short, You need Python"
>>> a[3]                                     # a[3]은 a라는 문자열의 3번째 문자 인덱싱(가르키다).
'e'
>>> a[-1]                                    #  a[-1]은 뒤에서부터 첫 번째가 되는 문자
'n'
```


## 5. 문자열 슬라이싱(Slicing) - 잘라낸다
* 인덱싱은 글자, 슬라이싱은 단어를 뽑아 낸다.
* a[시작 번호:끝 번호]를 지정하면, 끝 번호에 해당하는 것은 포함되지 않는다.
```python
#문자열 슬라이싱 법칙
>>> a = "Life is too short, You need Python"
>>> a[0:3]                         # a[시작 번호:끝 번호]일때, 끝 번호에 해당하는 것은 포함되지 않음
'Lif'                              # 0 <= a < 3
>>> a[12:17]                       # a[12:17]의 뜻은, a 문자열에서 12부터 16까지의 문자를 뽑아냄
'short'
>>> a[19:]                         # 끝 번호 생략시, 문자열의 처음부터 끝 번호까지 뽑아냄.
'You need Python'
>>> a[:17]                         # 시작 번호 생략시, 문자열의 처음부터 끝 번호까지 뽑아냄
'Life is too short'
>>> a[:]                           # 시작과 끝 번호 생략시, 문자열의 처음부터 끝까지를 뽑아냄
'Life is too short, You need Python'
>>> a[19:-7]                       # a[19:-7]의 뜻은, a[19]에서부터 a[-8]까지. -7은 미포함
'You need'
```

```python
#문자열 슬라이싱 응용
>>> a = "20010331Rainy"
>>> year = a[:4]           # 연도로 나누고
>>> day = a[4:8]           # 날짜로 나누고
>>> weather = a[8:]        # 날씨로 나누고
>>> year
'2001'
>>> day
'0331'
>>> weather
'Rainy'

# 문자열 바꾸기 
>>> a = "Pithon"          # "Pithon"이라는 문자열을 "Python"으로 바꾸려면?
>>> a[1]
'i'
>>> a[1] = 'y'            # 문자열, 튜플등 의 자료형은 그 요소값을 변경할 수 없으므로, 에러남

>>> a = "Pithon"
>>> a[:1]
'P'
>>> a[2:]
'thon'
>>> a[:1] + 'y' + a[2:]   # 슬라이싱해서 나눠주고 새로운 y 글자 추가
'Python'
```


## 6. 문자열 포매팅(Formatting)
* 문자열 내에 일부에만 어떤 값을 삽입/대입하고 싶을 때,
* 1. 문자열 내, 포맷 코드 삽입 -> 숫자면 %d, 문자면(String) %s
* 2. 문자열 끝에 % 숫자, % “문자” 입력
* Cf. 그냥 문자 퍼센트 %를 표기하고 싶을 때에는, ‘%%’ 2개로 표시
```python
# 문자열 포매팅, 숫자대입
>>> "I eat %d apples." % 3    # 1. 숫자를 넣고 싶은 자리에 %d 문자(포맷 코드)를 넣음 
'I eat 3 apples.'             # 2. 삽입할 숫자 3은 가장 뒤에 있는 % 문자 다음에 쓰면, 자동으로 숫자 대입됨.

>>> number = 3
>>> "I eat %d apples." % number
'I eat 3 apples.'

# 문자열 포매팅, 문자대입
>>> "I eat %s apples." % "five"     # 숫자 포맷코드 %d, 문자 포맷코드 %s
'I eat five apples.'                # 문자열 대입시 항상 큰 따옴표나 작은 따옴표 쓸 것

>>> "rate is %s" % 3.234            # %s는 자동으로 % 뒤에 있는 값을 문자열로 바꾼다
'rate is 3.234'

# 문자열 포매팅, 2개 이상 넣을 때
>>> number = 10                     # 마지막 % 다음 괄호 안에 콤마(,)로 구분해, 각 변수 써주면 됨
>>> day = "three"
>>> "I ate %d apples. so I was sick for %s days." % (number, day)
'I ate 10 apples. so I was sick for three days.'

# 문자열 포매팅, 문자 퍼센트 %를 쓰고 싶을 때
>>> "Error is %d%%." % 98
'Error is 98%.'

# 문자열 포매팅, 정렬과 공백 - 양수면 오른쪽 정렬, 음수면 왼쪽 정렬
>>> "%10s" % "hi"                    # 총 길이가 10개인 문자열에서 hi를 오른쪽으로 정렬하고,
'        hi'                         # 그 앞의 나머지는 공백으로 남겨 두라는 의미
>>> "%-10sjane." % 'hi'              # 총 길이가 10개인 문자열에서 hi를 왼쪽으로 정렬함
'hi        jane.'

# 문자열 포매팅, 소수점 표현
>>> "%0.4f" % 3.42134234             # '.'의 의미는 소수점 포인트를 말하고,
'3.4213'                             # 뒤의 숫자 4는 소수점 뒤에 나올 숫자의 개수를 말한다
>>> "%10.4f" % 3.42134234            # 소수점 네 번째 자리까지만 표시하고
'    3.4213'                         # 전체 길이가 10개인 문자열 공간에서 오른쪽으로 정렬
```


## 7. format 함수를 이용한 문자열 포매팅
```python
# 숫자 대입
>>> "I eat {0} apples".format(3)
'I eat 3 apples'

>>> number = 3
>>> "I eat {0} apples".format(number)
'I eat 3 apples'

# 문자 대입
>>> "I eat {0} apples".format("five")
'I eat five apples'

# 2개 이상값 넣는 3가지 방법
>>> number = 10
>>> day = "three"
>>> "I ate {0} apples. so I was sick for {1} days.".format(number, day)
'I ate 10 apples. so I was sick for three days.'

>>> "I ate {number} apples. so I was sick for {day} days.".format(number=10, day=3)
'I ate 10 apples. so I was sick for 3 days.'

>>> "I ate {0} apples. so I was sick for {day} days.".format(10, day=3)
'I ate 10 apples. so I was sick for 3 days.'

# 왼쪽, 오른쪽, 가운데 정렬
>>> "{0:<10}".format("hi")     # 문자열 총 자릿수 10에 왼쪽 정렬
'hi        '

>>> "{0:>10}".format("hi")     # 문자열 총 자릿수 10에 오른쪽 정렬
'        hi'

>>> "{0:^10}".format("hi")     # 문자열 총 자릿수 10에 가운데 정렬
'    hi    '

# 공백 채우기
>>> "{0:=^10}".format("hi")    # 채워 넣을 문자 값은 정렬 문자인 <, >, ^ 바로 앞에 넣어야 함
'====hi===='
>>> "{0:!<10}".format("hi")
'hi!!!!!!!!'

# 소수점 표현하기
>>> y = 3.42134234
>>> "{0:0.4f}".format(y)       # 소수점 4자리까지만 표현
'3.4213'
>>> "{0:10.4f}".format(y)      # 자릿수 10으로 맞추고 소수점 4자리까지만 표현
'    3.4213'

# 대괄호 {} 문자 그대로 쓰고 싶을 때, 2개 연속 쓰기
>>> "{{ and }}".format()
'{ and }'
```


## 8. 문자열 관련 함수들(문자열 내장함수)
* 문자열 자료형 자체적으로 가지고 있는 내장 함수들
* 이 내장함수를 사용하려면 문자열 변수 이름 뒤에 '.'를 붙인 다음에 함수 이름을 써주면 된다. (ex. 문자열.count)
```python
# 문자 개수 세기(count)
>>> a = "hobby"
>>> a.count('b')                       # 문자열 a에 있는 'b'의 갯수 반환
2

# 위치 알려주기1(find)
>>> a = "Python is the best choice" 
>>> a.find('b')                         # 문자열 중 문자 b가 처음으로 나온 위치를 반환
14                                      # 파이썬은 숫자를 0부터 센다
>>> a.find('k')                         # 만약 찾는 문자나 문자열이 존재하지 않는다면 -1을 반환.
-1

# 위치 알려주기2(index)
>>> a = "Life is too short"
>>> a.index('t')
8
>>> a.index('k')                       # 앞의 find 함수와 같으나 다른 점은
Traceback (most recent call last):     # 문자열 안에 존재하지 않는 문자를 찾으면 오류 발생
File "<stdin>", line 1, in <module>
ValueError: substring not found

# 문자열 삽입(join)
>>> ",".join('abcd')                   # abcd 문자열 사이에 ','를 삽입한다는 뜻
'a,b,c,d'
>>> ",".join(['a', 'b', 'c', 'd'])     # 문자열뿐만 아니라 리스트나 튜플에서도 입력 가능
'a,b,c,d'

# 소문자를 대문자로(upper), 대문자를 소문자로(lower)
>>> a = "hi"
>>> a.upper()                          # 만약 이미 대문자라면 아무런 변화도 일어나지 않음
'HI'
>>> a = "HI"
>>> a.lower()
'hi'

# 공백 지우기: 왼쪽(lstrip), 오른쪽(rstrip), 양쪽(strip)
>>> a = " hi "
>>> a.lstrip()
'hi '
>>> a= " hi "
>>> a.rstrip()
' hi'
>>> a = " hi "
>>> a.strip()
'hi'

# 문자열 바꾸기(replace)
>>> a = "Life is too short"          # .replace(바뀌게 될 문자열, 바꿀 문자열)
>>> a.replace("Life", "Your leg")
'Your leg is too short'

# 문자열 나누기(split)
>>> a = "Life is too short"
>>> a.split()                        # .split()처럼 괄호 값이 없으면 공백(스페이스, 탭, 엔터)으로 나눔
['Life', 'is', 'too', 'short']       # 이렇게 나눈 값은 리스트에 하나씩 들어간다
>>> a = "a:b:c:d"
>>> a.split(':')
['a', 'b', 'c', 'd']
```
