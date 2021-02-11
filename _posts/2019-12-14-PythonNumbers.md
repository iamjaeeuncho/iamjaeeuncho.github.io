---
title: "［Python］파이썬 숫자형 자료형 - 정의, 연산, 숫자 개념"
date: 2019-12-14
categories:
  - study
tags:
  - python
---

## 1. 숫자형 타입들
* int/long 타입 (정수, Integer/long): 양의 정수, 0, 음의 정수 (ex. 123, 0, -345)
  * 10진수(107), 8진수(0o107), 16진수(0x107, 0X107), 2진수(0b101), long(107L)
  * long은 int보다 긴 정수, 8진수, 16진수 표현 가능. long 타입에 소문자 l을 사용할 수도 있지만, 숫자 1과의 혼동을 피하기 위해 대문자 L 사용
  * 8진수(Octal): 0o 또는 0O로 시작 (숫자 0 + 알파벳 o/O) (ex. 0o34, 0o25)
  * 16진수(Hexadecimal) 0x로 시작 (ex. 0x2A, 0xFF)
* float 타입 (실수, Floating-point): 부동소수점이 포함된 실수 (ex. 123.45, -1234.5, 3.4e10)
  * 부동소수점이란, 소수점을 고정시켜서 표현하는 방법
  * 4.24E10 = 4.24∗(10의 10제곱)
    4.24e-10 = 4.24∗(10의 −10제곱)
* complex 타입 (복소수, Complex Number): 실수와 허수의 합으로 이루어지는 수.
  * 허수부 뒤에 j 나 J 사용 (ex. 4+5j, 7-2J)

```python
# 숫자형 예시
int_var1 = 1
int_var2 = -10

long_var1 = 0122L
long_var2 = -0x19323L

float_var1 = 15.20
float_var2 = 70.2-1E12

complex_var1 = 3.14j
complex_var2 = 4.53e1-7j
```


### 2. 숫자형 연산
* 사칙연산: 더하기 +, 빼기 -, 곱하기 *, 나누기 /
* ** 연산자: x의 y제곱. 
* 나눗셈 후, 
  * // 연산자: 몫을 반환
  * % 연산자: 나머지를 반환
```python
#1. 사칙연산(더하기 +, 빼기 -, 곱하기 *, 나누기 /)
>>> a = 3
>>> b = 4
>>> a + b
7
>>> a * b
12
>>> a / b
0.75

#2. x의 y제곱을 나타내는 ** 연산자
# x ** y처럼 사용되었을 때 x의 y제곱(xy) 값을 리턴
>>> a = 3
>>> b = 4
>>> a ** b
81

#3. 나눗셈 후 나머지를 반환하는 % 연산자
>>> 7 % 3
1
>>> 3 % 7
3

#4. 나눗셈 후 몫을 반환하는 // 연산자
>>> 7 / 4                # 그냥 나눗셈
1.75
>>> 7 // 4               # 나눗셈 후 몫만 반환
1
```


## 보완. 숫자 개념 정리
<center>
<img src="https://github.com/iamjaeeuncho/iamjaeeuncho.github.io/blob/master/programming/_posts/images/img.png" width="550px"><br>
credit: https://staidbunny.tistory.com/9
</center>

* 양수(Positive Number)/자연수(Natural Number): +
* 음수(Negative Number): -
* 정수(Integer): +, 0, -
* 정수가 아닌 유리수(Non-integer Rational Number) - 분수(Fraction)/소수(Decimal)
* 유리수(Rational Number): 분수의 형태로 나타낼 수 있는 숫자로 유한함 (ex. 1/1 = 1)
* 무리수(Irrational Number): 분수로 표현할 수 없는 숫자로 무한함 (ex. 원주율같이 소수점이 끝없이 펼쳐지는 숫자)
* 실수(Real Number): 실제로 존재하는 숫자
* 허수(Imaginary Number): 허구의 숫자로 실제로 존재 할 수 없는 숫자 (ex. i)
* 복소수(Complex Number): 실수와 허수를 합친 숫자로 모든 숫자 표현 가능
