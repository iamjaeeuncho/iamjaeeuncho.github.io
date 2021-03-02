---
title: "[Python] 파이썬 request 모듈"
date: 2020-9-17
categories:
- study
tags:
- python
toc: true
toc_sticky: true
---

<br>
<br>


## requests 모듈
1. http request/response를 위한 모듈
2. HTTP method를 메소드 명으로 사용하여 request 요청 예) get, post

```
import requests
url = 'https://news.v.daum.net/v/20190728165812603'
```

#### get 요청하기
1. http get 요청하기
2. query parameter 이용하여 데이터 전달하기

```
url = 'https://news.v.daum.net/v/20190728165812603'
resp = requests.get(url)
print(resp)
# 응답 코드가 2로 시작하면 성공을 의미함

resp.text
```

#### post 요청하기
1. http post 요청하기
2. post data 이용하여 데이터 전달하기

```
# post는 민감한 데이터를 전송할때 사용 (ex. 로그인 데이터)
url = 'http://www.kangcom.com/member/member_check.asp'
# post에 전달하는 form 데이타
data = {
    'id' : 'macmath22',
    'pwd' : 'Test1357!'
}

resp = requests.post(url, data=data)
resp.text
```

#### HTTP header 데이터 이용하기
1. header 데이터 구성하기
2. header 데이터 전달하기

```
url = 'https://news.v.daum.net/v/20190728165812603'
headers = {
    'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.142 Safari/537.36'
}

resp = requests.get(url, headers=headers)
resp.text
```

#### HTTP response 처리하기
1. response 객체의 이해
2. status_code 확인하기
3. text 속성 확인하기

```
url = 'https://news.v.daum.net/v/20190728165812603'
resp = requests.get(url)
resp.st
```

