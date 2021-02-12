---
title: "[Python] 파이썬 자주 쓰는 외장함수들"
date: 2020-1-1
categories:
  - study
tags:
  - python
toc: true
toc_sticky: true
---

## 외장함수?
* 전 세계의 파이썬 사용자들이 만든 유용한 프로그램들을 모아 놓은 것이 바로 파이썬 라이브러리이다. 
* "라이브러리"는 "도서관"이라는 뜻 그대로 원하는 정보를 찾아보는 곳이다.
* 파이썬 라이브러리는 파이썬 설치 시 자동으로 컴퓨터에 설치가 된다. 
<br>
<br>

### sys 모듈?
* sys 모듈은 파이썬 인터프리터가 제공하는 변수들과 함수들을 직접 제어할 수 있게 해주는 모듈이다.
① 명령 행에서 인수 전달하기 - sys.argv

```python
# test.py 뒤에 또 다른 값들을 함께 넣어 주면 sys.argv라는 리스트에그 값들이 추가된다
C:/User/home>python test.py abc pey guido

# 예시 argv_test.py
import sys
print(sys.argv)

C:/doit/mymod>python argv_test.py you need python   # python 명령어 뒤의 것들을 공백으로
['argv_test.py', 'you', 'need', 'python']           # 나뉘어서 sys.argv 리스트 요소가 됨
```
<br>
<br>

② 강제로 스크립트 종료하기 - sys.exit
* sys.exit는 Ctrl+Z나 Ctrl+D를 눌러서 대화형 인터프리터를 종료하는 것과 같은 기능을 한다. 
* 프로그램 파일 내에서 사용하면 프로그램을 중단시킨다.

```python
>>> sys.exit()
```
<br>
<br>

③ 자신이 만든 모듈 불러와 사용하기 - sys.path
* sys.path는 파이썬 모듈들이 저장되어 있는 위치를 나타낸다.
* 즉, 이 위치에 있는 파이썬 모듈들은 경로에 상관없이 어디에서나 불러올 수가 있다.

```python
>>> import sys
>>> sys.path                                     # 아래의 ''는 현재 디렉터리를 말한다
['', 'C:\\Windows\\SYSTEM32\\python37.zip', 'c:\\Python37\\DLLs', 
'c:\\Python37\\lib', 'c:\\Python37', 'c:\\Python37\\lib\\site-packages']

# 경로명 추가 후, 디렉터리에 있는 파이썬 모듈을 불러와서 사용하는 법
import sys
sys.path.append("C:/doit/mymod")                # sys.path.append를 이용해 경로명을 추가
```
<br>
<br>

### pickle 모듈?
* pickle은 객체의 형태를 그대로 유지하면서 파일에 저장하고 불러올 수 있게 하는 모듈이다. 

```python
# pickle의 dump 함수 이용, 딕셔너리 객체인 data를 그대로 파일에 저장하는 법
>>> import pickle
>>> f = open("test.txt", 'wb')
>>> data = {1: 'python', 2: 'you need'}
>>> pickle.dump(data, f)
>>> f.close()

# pickle.dump에 의해 저장된 파일을 pickle.load를 이용해, 원래 딕셔너리 객체(data)로 불러오기
>>> import pickle
>>> f = open("test.txt", 'rb')
>>> data = pickle.load(f)
>>> print(data)
{2:'you need', 1:'python'}         # 예에서는 딕셔너리 객체를 이용하였지만
                                   # 어떤 자료형이든 상관없이 저장하고 불러올 수 있다
```
<br>
<br>

### OS모듈?
* OS 모듈은 환경 변수나 디렉터리, 파일 등의 OS 자원을 제어할 수 있게 해주는 모듈이다.

① 내 시스템의 환경 변수값을 알고 싶을 때 - os.environ
시스템은 제각기 다른 환경 변수값을 가지고 있는데, os.environ은 현재 시스템의 환경 변수 값들을 보여 준다. 

```python
# os.environ은 환경 변수에 대한 정보를 딕셔너리 객체로 리턴
>>> import os 
>>> os.environ 
environ({'PROGRAMFILES': 'C:\\Program Files', 'APPDATA': … 생략 …}) 
>>> 

>>> os.environ['PATH'] 
'C:\\ProgramData\\Oracle\\Java\\javapath;...생략...'
```
<br>
<br>

② 디렉터리 위치 변경하기 - os.chdir
os.chdir을 이용하면 아래와 같이 현재 디렉터리의 위치를 변경할 수 있다.

```python
>>> os.chdir("C:\WINDOWS") 
```
<br>
<br>

③ 디렉터리 위치 리턴받기 - os.getcwd
os.getcwd는 현재 자신의 디렉터리 위치를 리턴한다.

```python
>>> os.getcwd() 
'C:\WINDOWS'
```
<br>
<br>

④ 시스템 명령어 호출하기 - os.system
시스템 자체의 프로그램이나 기타 명령어들을 파이썬에서 호출할 때, os.system("명령어")처럼 사용한다. 

```python
현재 디렉터리에서 시스템 명령어인 dir을 실행하는 예
>>> os.system("dir")
```
<br>
<br>

⑤ 실행한 시스템 명령어의 결과값 리턴받기 - os.popen
os.popen은 시스템 명령어를 실행시킨 결과값을 읽기 모드 형태의 파일 객체로 리턴한다.

```python
>>> f = os.popen("dir") 
>>> print(f.read())         # 읽어 들인 파일 객체의 내용 보기
```
<br>
<br>

⑥ 기타 유용한 os 관련 함수
* os.mkdir(디렉터리) 디렉터리를 생성한다.
* os.rmdir(디렉터리) 디렉터리를 삭제한다.단, 디렉터리가 비어있어야 삭제가 가능하다.
* os.unlink(파일) 파일을 지운다.
* os.rename(src, dst) src라는 이름의 파일을 dst라는 이름으로 바꾼다.
<br>
<br>

### shutil 모듈 ?
* shutil은 파일을 복사해 주는 파이썬 모듈이다.
* src라는 이름의 파일을 dst로 복사한다. 
* 만약 dst가 디렉터리 이름이면 src라는 파일 이름으로 dst라는 디렉터리에 복사하고, 동일한 파일 이름이 있을 경우에는 덮어쓴다.

```python
>>> import shutil 
>>> shutil.copy("src.txt", "dst.txt") 
# 위 예를 실행해 보면 src.txt 파일과 동일한 내용의 파일이 dst.txt로 복사되는 것을 확인할 수 있다.
```
<br>
<br>

### glob 모듈?
* glob 모듈은 디렉터리 내의 파일들을 읽어서 리스트로 리턴한다. 
* *, ? 등의 메타 문자를 써서 원하는 파일만 읽어 들일 수도 있다. 
* 가끔 파일을 읽고 쓰는 기능이 있는 프로그램을 만들다 보면 특정 디렉터리에 있는 파일 이름 모두를 알아야 할 때가 있다. 이럴 때 사용하는 모듈이 바로 glob이다.

```python
# C:/doit 디렉터리에 있는 파일 중 이름이 mark로 시작하는 파일들을 모두 찾아서 읽는 예
>>> import glob 
>>> glob.glob("c:/doit/mark*") 
['c:/doit\\marks1.py', 'c:/doit\\marks2.py', 'c:/doit\\marks3.py']
```
<br>
<br>

### tempfile 모듈?
* 파일을 임시로 만들어서 사용할 때 유용한 모듈이 tempfile이다. 
* tempfile.mktemp()는 중복되지 않는 임시 파일의 이름을 무작위로 만들어서 리턴한다.

```python
>>> import tempfile 
>>> filename = tempfile.mktemp() 
>>> filename 
'C:\WINDOWS\TEMP\~-275151-0' 

>>> import tempfile 
>>> f = tempfile.TemporaryFile()      # tempfile.TemporaryFile()은 임시 저장 공간으로 사용될 파일 객체를 리턴
>>> f.close()                         # 이 파일은 기본적으로 바이너리 쓰기 모드(wb)를 갖는다
                                      # f.close()가 호출되면 이 파일 객체는 자동으로 사라진다.
```
<br>
<br>

### time모듈?
* 시간과 관련된 time 모듈에는 유용한 함수가 굉장히 많다.
① time.time
time.time()은 UTC(Universal Time Coordinated)를 이용하여 현재 시간을 실수 형태로 리턴하는 함수
1970년 1월 1일 0시 0분 0초를 기준으로 지난 시간을 초 단위로 리턴한다.

```python
>>> import time 
>>> time.time() 
988458015.73417199
```
<br>
<br>

② time.localtime
time.localtime은 time.time()에 의해서 반환된 실수값을 이용해서 연도, 월, 일, 시, 분, 초,.. 의 형태로 바꾸어 주는 함수

```python
>>> time.localtime(time.time()) 
time.struct_time(tm_year=2013, tm_mon=5, tm_mday=21, tm_hour=16, 
    tm_min=48, tm_sec=42, tm_wday=1, tm_yday=141, tm_isdst=0)
```
<br>
<br>

③ time.asctime
time.localtime에 의해서 반환된 튜플 형태의 값을 인수로 받아, 날짜와 시간을 알아보기 쉬운 형태로 리턴하는 함수

```python
>>> time.asctime(time.localtime(time.time())) 
'Sat Apr 28 20:50:20 2001' 
```
<br>
<br>

④ time.ctime
time.asctime(time.localtime(time.time()))은 time.ctime()을 이용해 간편하게 표시할 수 있다. 
asctime과 다른점은 ctime은 항상 현재 시간만을 리턴한다는 점이다.

```python
>>> time.ctime() 
'Sat Apr 28 20:56:31 2001'
```
<br>
<br>

⑤ time.strftime
strftime 함수는 시간에 관계된 것을 세밀하게 표현할 수 있는 여러 가지 포맷 코드를 제공한다. 

```python
time.strftime('출력할 형식 포맷 코드', time.localtime(time.time()))
```

* 시간에 관계된 것을 표현하는 포맷 코드
  %a - 요일 줄임말 ex. Mon
  %A - 요일 ex. Monday
  %b - 달 줄임말 ex. Jan
  %B - 달 ex. January
  %c - 날짜와 시간을 출력함 ex. 06/01/01 17:22:21
  %d - 날(day) ex. [00,31]
  %H - 시간(hour)-24시간 출력 형태 ex. [00,23]
  %I - 시간(hour)-12시간 출력 형태 ex. [01,12]
  %j - 1년 중 누적 날짜 ex. [001,366]
  %m - 달 ex. [01,12]
  %M - 분 ex. [01,59]
  %p - AM or PM AM
  %S - 초 ex. [00,61]
  %U - 1년 중 누적 주-일요일을 시작으로 ex. [00,53]
  %w - 숫자로 된 요일 ex. [0(일요일),6]
  %W - 1년 중 누적 주-월요일을 시작으로 ex. [00,53]
  %x - 현재 설정된 로케일에 기반한 날짜 출력 ex. 06/01/01
  %X - 현재 설정된 로케일에 기반한 시간 출력 ex. 17:22:21
  %Y - 년도 출력 ex. 2001
  %Z - 시간대 출력 ex. 대한민국 표준시
  %% - 문자 ex. %
  %y - 세기부분을 제외한 년도 출력 ex. 01

```python
# time.strftime 사용 예시
>>> import time 
>>> time.strftime('%x', time.localtime(time.time())) 
'05/01/01' 
>>> time.strftime('%c', time.localtime(time.time())) 
'05/01/01 17:22:21'
```
<br>

⑥ time.sleep
* time.sleep 함수는 주로 루프 안에서 많이 사용된다. 
* 이 함수를 사용하면 일정한 시간 간격을 두고 루프를 실행할 수 있다. 
```python
#  time.sleep 함수의 인수는 실수 형태 사용 가능 ex. 0.5초
import time 
for i in range(10):               # 1초 간격으로 0부터 9까지의 숫자를 출력
    print(i) 
    time.sleep(1)
```
<br>
<br>

### calendar: calendar는 파이썬에서 달력을 볼 수 있게 해주는 모듈이다.
① 그 해의 전체 달력보기: calendar.calendar(연도), calendar.prcal(연도)

```python
# 연도 달력 보기 - 결과값은 달력이 너무길어 생략
>>> import calendar 
>>> print(calendar.calendar(2015)) 
>>> calendar.prcal(2015) 
```
<br>

② 월 달력보기: calendar.prmonth(연도, 월) 

```python
>>> calendar.prmonth(2015, 12) 
December 2015 
Mo Tu We Th Fr Sa Su 
      2  3  4  5  6 
7  8  9  10 11 12 13 
14 15 16 17 18 19 20 
21 22 23 24 25 26 27 
28 29 30 31 
```
<br>

③ 그 날짜에 해당하는 요일 정보 리턴: calendar.weekday(년도, 월, 일)
월요일은 0, 화요일은 1, 수요일은 2, 목요일은 3, 금요일은 4, 토요일은 5, 일요일은 6이라는 값을 리턴한다.

```python
>>> calendar.weekday(2015, 12, 31) 
3                                    # 2015년 12월 31일은 목요일임을 보여 준다.
```
<br>

④ monthrange(연도, 월) 함수: 입력받은 달의 1일이 무슨 요일인지, 그 달이 며칠까지 있는지를 튜플로 리턴
```python
>>> calendar.monthrange(2015,12) 
(1, 31)                          # 2015년 12월의 1일은 화요일이고, 이 달은 31일까지 있다는 뜻
```
<br>
<br>

### random 모듈?
* random은 난수(규칙이 없는 임의의 수)를 발생시키는 모듈이다.
* random은 실수 랜덤값 생성, randint은 정수 랜덤값 생성
* 리스트의 항목을 무작위로 섞고 싶을 때는 random.shuffle 함수

```python
# 0.0에서 1.0 사이의 실수 중에서 난수값을 리턴하는 예
>>> import random
>>> random.random()
0.53840103305098674

# 1에서 10 사이의 정수 중에서 난수값을 리턴하는 예
>>> random.randint(1, 10)
6

# 1에서 55 사이의 정수 중에서 난수값을 리턴하는 예
>>> random.randint(1, 55)
43
```

```python
# random 모듈 응용 예시
>>> import random
>>> def random_pop(data):
>>>     number = random.randint(0, len(data)-1)  # 리스트의 요소 중 랜덤으로 하나 꺼낸 다음 
>>>     return data.pop(number)                  # 그 값을 리턴

>>> if __name__ == "__main__":
>>>     data = [1, 2, 3, 4, 5]
>>>     while data: 
>>>         print(random_pop(data))
2 
3 
1 
5 
4

# random 모듈의 choice 함수를 사용해 간략화하기
>>> def random_pop(data):
>>>     number = random.choice(data)            # 입력받은 리스트에서 무작위로 하나 선택해 리턴
>>>     data.remove(number)
>>>     return number
```

```python
# random.shuffle 함수 예시
>>> import random
>>> data = [1, 2, 3, 4, 5]
>>> random.shuffle(data)          # 리스트의 항목을 무작위로 섞고 싶을 때
>>> data
[5, 1, 3, 4, 2]
>>>
```
<br>
<br>

### webbrowser모듈?
* webbrowser는 자신의 시스템에서 사용하는 기본 웹 브라우저가 자동으로 실행되게 하는 모듈.
* webbrowser의 open 함수는 웹 브라우저가 이미 실행된 상태이면 입력 주소로 이동한다. 
* 만약 웹 브라우저가 실행되지 않은 상태이면 새로 웹 브라우저를 실행한 후 해당 주소로 이동한다. 
* open_new 함수는 이미 웹 브라우저가 실행된 상태이더라도 새로운 창으로 해당 주소가 열리도록 한다. 

```python
>>> import webbrowser 
>>> webbrowser.open("http://google.com")       # 웹 브라우저를 자동으로 실행
                                               # 해당 URL인 http://google.com으로 가게 해줌

>>> webbrowser.open_new("http://google.com")   # 이미 열려있어도 새창에서 open
```