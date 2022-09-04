# 프로젝트 일지와 에러

>`배포하는 연습`과 `Redux-toolkit`을 연습하고 싶어서 **백엔드와 프론트엔드를 각자 배포해서 TODOLIST**를 만들어 보았다.

## 백엔드
node express를 사용했는데 cors,dotenv,express,mongoose,nodemon을 설치해주었다
router를 사용해서 분리해줄 수 있었는데 코드가 길지않아서 분리하지 않고 사용했다.
dotenv는 node에서 환경변수를 사용할 수 있게 해주고
cors는 cors문제를 해결해 준다.
db는 몽고디비를 사용하였다.

**server.js**
```javascript
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require('dotenv').config()
const app = express();
const port = process.env.PORT || 5000

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cors());

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch(console.error);

// Models
const Todo = require("./models/Todo");

app.get("/", async (req, res) => {
  res.json("WELCOME HOME");
});
app.get("/todos", async (req, res) => {
  const todos = await Todo.find()

  res.json(todos);
});

app.post("/todo/new", (req, res) => {
  const todo = new Todo({
    text: req.body.text,
  });

  todo.save();

  res.json(todo);
});

app.delete("/todo/delete/:id", async (req, res) => {
  const result = await Todo.findByIdAndDelete(req.params.id);

  res.json({ result });
});

app.get("/todo/complete/:id", async (req, res) => {
  const todo = await Todo.findById(req.params.id);

  todo.complete = !todo.complete;

  todo.save();

  res.json(todo);
});


app.listen(port, () => {
  console.log(`server connect ${port}`)
});

```
몽고디비 스키마
**Model.js**
```javascript
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TodoSchema = new Schema({
	text: {
		type: String,
		required: true
	},
	complete: {
		type: Boolean,
		default: false
	},
	timestamp: {
		type: String,
		default: Date.now()
	}
});

const Todo = mongoose.model("Todo", TodoSchema);

module.exports = Todo;
```

>이렇게 간단하게 만든 백엔드 API를 Heroku에 배포해주었다

## 프론트엔드
> 이번 프론젝트의 목적은 배포와 리덕스툴킷을 사용하는것이 목적이다.
패키지로는 axios, react-icons, styled-components, react-redux, @reduxjs/toolkit을 설치해주었다.

일단 글로벌 스타일을 만들어주었다.

![](https://velog.velcdn.com/images/cyd5538/post/27eb7375-ab2a-4ebf-8f21-dbfc25597751/image.png)

폴더 구조는 이렇다

![](https://velog.velcdn.com/images/cyd5538/post/ffd009b1-f9d3-4560-a22f-792c7c11f50a/image.png)


**App.js**

![](https://velog.velcdn.com/images/cyd5538/post/ec0cbdd5-24d5-4f51-b8d4-5f74bc9efb77/image.png)


## 에러 처리

### error 1
useRef를 사용해서 모달창을 클릭했을떄 input을 바로 focus해야 하는데 ref={inputRef}로 props를 전달해서 사용하니까 다음과 같은 에러가 발생했다

![](https://velog.velcdn.com/images/cyd5538/post/6d0ee0f0-360e-4dc2-9525-a186b6803bd2/image.png)

찾아보니까 **ForwardRef를** 사용하거나 props를 **inputRef={inputRef}** 이런식으로 전달해서 사용하면 된다고 나와있었다. 


### error 2
모달창이 열리기전에 focus()가 되는지 에러가 발생했다. 그래서 모달창 여는 이벤트를 아래와 같이 해주었다

![](https://velog.velcdn.com/images/cyd5538/post/8c24ab99-8f1c-4010-a2f3-e6868a7108e7/image.png)

setToggle에 await는 영향을 주지 않는다고 나와있었다

![](https://velog.velcdn.com/images/cyd5538/post/80a95668-467c-4a96-9ff7-1cac7767290c/image.png)

근데 저 await을 뺴면 focus가 되지않아서 지우지 못했다..

### error 3
배포할때 난 에러인데 백엔드는 heroku 프론트엔드는 netlify로 배포하였는데 프론트엔드에서 설정한 proxy가 작동이되지 않았다.

![](https://velog.velcdn.com/images/cyd5538/post/a72052dc-2dd0-4616-ae03-0fb9e2fc67e8/image.png)

그래서 찾아보니깐. 모든 API를 호출할떄 아래와 같이 적어주라고 돼있었다.

```javascript
const PROXY = window.location.hostname === 'localhost' ? '' : 'https://mern-epxress-todo-api.herokuapp.com';

export const addTodo = createAsyncThunk(
    'addTodos',
    async (text) => {
        const response = await axios.post(`${PROXY}/todo/new`, {text});
        return response.data;
    }
)
```

그리고 루트 최상위에다가 netlify.toml 이라는 폴더를 만들고 다음과 같이 넣어주었다
![](https://velog.velcdn.com/images/cyd5538/post/d5d6e05d-f942-478a-aa0d-b739d9d07d3c/image.png)

이렇게 해서 다시 빌드를 하고 배포를 하니까 백엔드 올렸던 주소와 잘 연결이되었다. 

## 느낀점
기존엔 프론트앤드로만 todolist를 만들고 그랬는데 express,mongodb를 배워서 데이터를 통신해서 만드니까 상당히 성취감이 높았다.

리덕스 툴킷에 createAsyncThunk를 사용하는데 되게 어려웠고 시간이 오래걸렸다. 그래서 공식문서도 참고하면서 했는데도 상당히 어렵더라. 

이게 정말 힘들었던점인데 배포하는게 가장 힘들었다. 배포했다 삭제했다 몇번을 했는지 셀 수가 없었는데 배포를 성공하고 나니깐 너무 쉽고 성취감이 들었다.


