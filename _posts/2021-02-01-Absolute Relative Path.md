---
title: "절대경로와 상대경로 차이점"
date: 2020-1-28
categories:
- study
tags:
- programming
toc: true
toc_sticky: true
---

## 절대 경로

<center>
<br>
<img src="https://user-images.githubusercontent.com/46369038/109176431-2a32bf00-77ca-11eb-986d-4a652d47605c.png" width="500" style="border: 2px solid rgb(213, 213, 213);">
<br>
<br>
<br>

절대 경로는 말 그대로 그 주소 자체를 말한다  
<br>
<br>

여기서 C 파일의 절대 경로 주소는 `C:/Users/JEN/Desktop/A/C.txt`로,  
<br>
<br>

최초 시작점부터 경유한 모든 경로를 전부 나타낸다   
<br>
<br>
<br>

실제로 검색해보면 해당 파일이 바로 열리면서 실행된다  
<br>
<br>

위치가 변하지 않고 고정된 경로가 필요할 때 사용하면 좋음
<br>
<br>
</center>

## 상대 경로

<center>
<br>
<img src="https://user-images.githubusercontent.com/46369038/109177665-64509080-77cb-11eb-9db2-a65feaf948c7.png" width="500" style="border: 2px solid rgb(213, 213, 213);">
<br>
<br>
<br>

상대 경로는 <u>현재 파일이 위치한 곳을 기준</u>으로 해당 파일의 위치다  
<br>
<br>

파일 경로가 자주 변경될 때 사용하면 좋다  
<br>
<br>
</center>

* 위를 예로 들면, 만약 B/D.txt에서 C/E.txt를 불러오고 싶다면<br>

```python
# 현재 작성중인 파일 위치: C:/Users/JEN/Desktop/A/B/D.txt
# 불러오고 싶는 파일 위치: C:/Users/JEN/Desktop/A/C/E.txt
```

1. 동일한 폴더 내에 위치해 있음을 말해주는, 중복되는 상위 폴더들은 모두 지운다  
    - 불러오고 싶는 파일 위치: ``` C/E.txt ```
<br>
2. 그리고 경로가 달라지는 부분에 상위 디렉토리를 의미하는 ```../``` 을 입력하면 끝  
    - 불러오고 싶는 파일 위치: ``` ../C/E.txt ```
<br>
<br>

cf. 참고로<br>
> - ```   / ``` -> 가장 최상위 디렉토리로 이동  
> - ```  ./ ``` -> 현재 디렉토리를 의미  
> - ``` ../ ``` -> 상위 디렉토리로 이동을 의미한다  


만약 두단계 상위 디렉토리를 이동하고 싶으면 ```../../``` 이렇게 사용하면 된다.


