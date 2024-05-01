<!-- 어디클릭했을 때 연결할건지  -->
<template>
  <section class="notice">
    <div class="page-title">
      <div class="container">
        <h3>작업리스트</h3>
      </div>
    </div>

    <!-- board seach area -->
    <div id="board-search">
      <div class="container">
        <div class="search-window">
          <form @submit.prevent="search">
            <div class="search-wrap">
              <label for="search" class="blind">공지사항 내용 검색</label>
              <input
                id="search"
                type="search"
                v-model="searchKeyword"
                placeholder="검색어를 입력해주세요."
                class="input-field"
              />
              <button type="submit" class="btn btn-dark">검색</button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- board list area -->
    <div id="board-list">
      <div class="container">
        <table class="board-table">
          <thead>
            <tr>
              <th scope="col" class="th-num">번호</th>
              <th scope="col" class="th-title">작업자</th>
              <th scope="col" class="th-type">유형</th>
              <th scope="col" class="th-lang">원본 언어</th>
              <th scope="col" class="th-lang">목표 언어</th>
              <th scope="col" class="th-status">상태</th>
              <th scope="col" class="th-progress">진행상황</th>
              <th scope="col" class="th-price">단가</th>
              <th scope="col" class="th-date">시작일</th>
              <th scope="col" class="th-date">종료일</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in noticeList" :key="index">
              <td>{{ item.number }}</td>
              <td>{{ item.worker }}</td>
              <td>{{ item.type }}</td>
              <td>{{ item.sourceLanguage }}</td>
              <td>{{ item.targetLanguage }}</td>
              <td>{{ item.status }}</td>
              <td>{{ item.progress }}</td>
              <td>{{ item.price }}</td>
              <td>{{ item.startDate }}</td>
              <td>{{ item.endDate }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </section>
</template>

<script>
// 랜덤한 번호 생성 함수
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// 랜덤한 진행상황 생성 함수
function getRandomProgress() {
  const progressOptions = ["진행중", "완료", "중단", "취소"];
  return progressOptions[Math.floor(Math.random() * progressOptions.length)];
}

// 랜덤한 공지사항 생성 함수
function generateRandomNotice() {
  const number = getRandomNumber(1, 100);
  const workerNames = [
    "John Doe",
    "Jane Smith",
    "Alice Johnson",
    "Bob Brown",
    "Emma Davis",
  ];
  const types = ["MT", "PE", "TE", "MTPE"];
  const languages = ["한국어", "영어", "일본어", "중국어", "프랑스어"];
  const startDate = new Date(
    2024,
    getRandomNumber(0, 11),
    getRandomNumber(1, 28)
  )
    .toISOString()
    .split("T")[0];
  const endDate = new Date(2024, getRandomNumber(0, 11), getRandomNumber(1, 28))
    .toISOString()
    .split("T")[0];

  return {
    number: number,
    worker: workerNames[Math.floor(Math.random() * workerNames.length)],
    type: types[Math.floor(Math.random() * types.length)],
    sourceLanguage: languages[Math.floor(Math.random() * languages.length)],
    targetLanguage: languages[Math.floor(Math.random() * languages.length)],
    status: getRandomProgress(),
    progress: getRandomNumber(0, 100) + "%",
    price: "$" + getRandomNumber(50, 200),
    startDate: startDate,
    endDate: endDate,
  };
}

export default {
  data() {
    return {
      searchKeyword: "",
      noticeList: [], // 초기에 빈 배열로 설정
    };
  },
  created() {
    // 랜덤한 공지사항 목록 생성
    for (let i = 0; i < 10; i++) {
      this.noticeList.push(generateRandomNotice());
    }
  },
  methods: {
    search() {
      // 검색 기능을 구현할 코드 작성
    },
  },
};
</script>

<style scoped>
/* Your CSS styles here */
.notice {
  padding: 80px 0;
}

.page-title {
  margin-bottom: 60px;
}

.page-title h3 {
  font-size: 28px;
  color: #333333;
  font-weight: 400;
  text-align: center;
}

#board-search .search-window {
  padding: 15px 0;
  background-color: #f9f7f9;
}

#board-search .search-window .search-wrap {
  position: relative;
  margin: 0 auto;
  width: 80%;
  max-width: 564px;
}

#board-search .search-window .search-wrap input {
  height: 40px;
  width: calc(100% - 128px); /* Adjusted width for button */
  font-size: 14px;
  padding: 7px 14px;
  border: 1px solid #ccc;
}

#board-search .search-window .search-wrap input:focus {
  border-color: #333;
  outline: 0;
  border-width: 1px;
}

#board-search .search-window .search-wrap .btn {
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  width: 108px;
  padding: 0;
  font-size: 16px;
}

.board-table {
  font-size: 13px;
  width: 100%;
  border-top: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
}

.board-table a {
  color: #333;
  display: inline-block;
  line-height: 1.4;
  word-break: break-all;
  vertical-align: middle;
}

.board-table a:hover {
  text-decoration: underline;
}

.board-table th {
  text-align: center;
}

.board-table .th-num {
  width: 100px;
  text-align: center;
}

.board-table .th-date {
  width: 200px;
}

.board-table th,
.board-table td {
  padding: 14px 0;
}

.board-table tbody td {
  border-top: 1px solid #e7e7e7;
  text-align: center;
}

.board-table tbody th {
  padding-left: 28px;
  padding-right: 14px;
  border-top: 1px solid #e7e7e7;
  text-align: left;
}

.board-table tbody th p {
  display: none;
}

.btn {
  display: inline-block;
  padding: 0 30px;
  font-size: 15px;
  font-weight: 400;
  background: transparent;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  -ms-touch-action: manipulation;
  touch-action: manipulation;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  border: 1px solid transparent;
  text-transform: uppercase;
  -webkit-border-radius: 0;
  -moz-border-radius: 0;
  border-radius: 0;
  -webkit-transition: all 0.3s;
  -moz-transition: all 0.3s;
  -ms-transition: all 0.3s;
  -o-transition: all 0.3s;
  transition: all 0.3s;
}

.btn-dark {
  background: #555;
  color: #fff;
}

.btn-dark:hover,
.btn-dark:focus {
  background: #373737;
  border-color: #373737;
  color: #fff;
}

/* Reset */
* {
  list-style: none;
  text-decoration: none;
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

.clearfix:after {
  content: "";
  display: block;
  clear: both;
}

.container {
  width: 1100px;
  margin: 0 auto;
}

.blind {
  position: absolute;
  overflow: hidden;
  clip: rect(0 0 0 0);
  margin: -1px;
  width: 1px;
  height: 1px;
}
</style>
