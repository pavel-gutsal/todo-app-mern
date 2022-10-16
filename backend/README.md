API:

http://localhost:8000/user/signup - POST request, request body = object, type {name, email, password } , purpose ==> create new user, return JsonWebToken;

http://localhost:8000/user/login - POST request, request body = object, type { email, password}, purpose ==> find user by email, return JsonWebToken;

http://localhost:8000/todos - GET request, request header => headers: { 'Authorization': `Bearer ${token}` }, returns <Todo[]>

http://localhost:8000/todos - POST request, request header => headers: { 'Authorization': `Bearer ${token}` }, request body => {text, time }, return <Todo>

http://localhost:8000/todos/:id - DELETE request, request header => headers: { 'Authorization': `Bearer ${token}` }, request params => id, finds specific todo by id, deletes, returns deleted todo id.

http://localhost:8000/todos/:id - PUT request, request header => headers: { 'Authorization': `Bearer ${token}` }, request params => id, request body => {text?, time?, completed? },
return new Todo.