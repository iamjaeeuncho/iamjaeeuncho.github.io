---
title: "[Python] 절대경로와 상대경로"
date: 2020-7-8
categories:
- study
tags:
- python
toc: true
toc_sticky: true
---

## 절대 경로

<img src="https://user-images.githubusercontent.com/46369038/109176431-2a32bf00-77ca-11eb-986d-4a652d47605c.png" width="500" style="border: 2px solid rgb(213, 213, 213);">

절대 경로는 말 그대로 그 주소 자체를 말한다  


여기서 C 파일의 절대 경로 주소는 `C:\Users\JEN\Desktop\A\C.txt`다  


실제로 검색해보면 해당 파일이 바로 열리면서 실행된다  


위치가 변하지 않고 고정된 경로가 필요할 때 사용하면 좋음



## 상대 경로

<img src="https://user-images.githubusercontent.com/46369038/109177665-64509080-77cb-11eb-9db2-a65feaf948c7.png" width="500" style="border: 2px solid rgb(213, 213, 213);">

상대 경로는 '현재 파일이 위치한 곳을 기준'으로 해당 파일의 위치다

위를 예로 들면, 만약 내가 B의 D.txt를 작성 중인데 C의 E.txt를 불러오고 싶다면

1. 현재 작성중인 파일 위치 : C:\Users\JEN\Desktop\A\B\D.txt
2. 불러오고 싶는 파일 위치 : C:\Users\JEN\Desktop\A\C\E.txt
3. 동일한 부분 제거
B\D.txt → C\E.txt

./C\E.txt



'/'    -> 최상위 디렉토리
'./'   -> 현  재 디렉토리
'../'  -> 상  위 디렉토리



