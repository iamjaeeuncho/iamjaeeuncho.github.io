---
title: "[Python] 파이썬 입출력 - 파일을 통한 입출력, 읽고 쓰기"
date: 2019-12-26
categories:
  - study
tags:
  - python
toc: true
toc_sticky: true
---

## 1. 파일 생성하기
* open 함수를 이용한, 프로그램을 실행한 디렉터리에 새로운 파일이 하나 생성
* 파일 열기 모드
  * r 읽기모드 - 파일을 읽기만 할 때 사용
  * w 쓰기모드 - 파일에 내용을 쓸 때 사용
  * a 추가모드 - 파일의 마지막에 새로운 내용을 추가 시킬 때 사용
  * cf. 파일을 쓰기 모드로 열게 되면, 해당 파일이 이미 존재할 경우 원래 있던 내용이 모두 사라지고, 해당 파일이 존재하지 않으면 새로운 파일이 생성된다.
```python
# 파일 생성 기본형
파일 객체 = open(파일 이름, 파일 열기 모드)

# 파일 생성 기본형
f = open("새파일.txt", 'w')               # open 함수는 파일이름, 파일열기모드를 입력값으로 받고 
f.close()                                 # 결과값으로 파일 객체를 돌려줌

# 특정 주소에 파일 생성 하고 싶을 때,
f = open("C:/doit/새파일.txt", 'w')
f.close()                                 # f.close는 열려 있는 파일을 닫아주는 역할
                                          # 파이썬이 열려있는 파일 자동으로 닫아주므로 생략 가능
                                          # 쓰기모드로 연 파일 닫지 않고 다시 사용하면 오류 발생
```


## 2. 파일을 쓰기 모드로 열어 출력값 적기
```python
# 파일을 열고 출력값을 쓰기
>>> f = open("C:/doit/새파일.txt", 'w')     # 모니터 화면 대신 파일에 결과값 적음
>>> for i in range(1, 11):
>>>    data = "%d번째 줄입니다.\n" % i
>>>    f.write(data)                       # print 대신 파일 객체 f의 write 함수를 이용
>>> f.close()

>>> for i in range(1, 11):                 # 모니터 화면에 출력
>>>    data = "%d번째 줄입니다.\n" % i
>>>    print(data)
```


## 3. 프로그램의 외부에 저장된 파일을 읽는 여러 가지 방법
* read() 함수 이용하기: 파일의 내용 전체를 문자열로 리턴
* readline() 함수 이용하기: 한줄씩 읽어옴
* readlines() 함수 이용하기:  파일의 모든 라인을 읽어서 각각의 줄을 요소로 갖는 리스트로 리턴
  * ex. ["1 번째 줄입니다.\n","2 번째 줄입니다.\n",..., "10 번째 줄입니다.\n"]
```python
# readline()을 이용해서 파일의 첫 번째 줄을 읽어 출력
f = open("C:/doit/새파일.txt", 'r')          # 파일 읽기 모드로 염
line = f.readline()                         
print(line)
f.close()

# 모든 라인을 출력하고 싶을 때
f = open("C:/doit/새파일.txt", 'r')
while True:                                 # while True:라는 무한 루프 안에서 
    line = f.readline()                     # f.readline()을 이용해 파일을 계속 한 줄씩 읽음
    if not line: break                      # 만약 더 이상 읽을 라인이 없으면 break를 수행
    print(line)                             # 더 이상 읽을 라인이 없을 경우 None 출력
f.close()

# 사용자 입력 받아 출력
f = open("C:/doit/새파일.txt", 'r')
while 1:                                    # 위에는 파일을 이용한 입력 방식
    data = input()                          # 키보드를 이용한 입력 방식
    if not data: break
    print(data)
f.close()
```
```python
# readlines() 함수를 이용한 출력
f = open("C:/doit/새파일.txt", 'r')
lines = f.readlines()              # 파일의 모든 라인을 읽어서 각각의 줄을 요소로 갖는 리스트로 리턴
for line in lines:
    print(line)
f.close()
```
```python
# read() 함수 이용
f = open("C:/doit/새파일.txt", 'r')
data = f.read()                      # data는 파일의 전체 내용
print(data)
f.close()
```


## 4. 파일에 새로운 내용 추가
* 쓰기 모드('w')로 파일을 열 때 이미 존재하는 파일을 열 경우 그 파일의 내용이 모두 사라짐
* 원래 있던 값을 유지하면서 새로운 값만 추가할 경우, 파일을 추가 모드('a')로 염.
```python
f = open("C:/doit/새파일.txt",'a')      # 새파일.txt라는 파일을 추가 모드('a')로 열고
for i in range(11, 20):
    data = "%d번째 줄입니다.\n" % i
    f.write(data)                       # write를 이용해서 결과값을 기존 파일에 추가해 적음
f.close()
```


## 5. with문과 함께 사용하기
* with문은 파일을 열고 닫는 것을 자동으로 처리
* 파일이 with 블록을 벗어나는 순간, 열린 파일 객체가 자동으로 닫힘
```python
with open("foo.txt", "w") as f:                    # with 블록을 벗어나는 순간
    f.write("Life is too short, you need python")  # 열린 파일 객체 f가 자동으로 close
```