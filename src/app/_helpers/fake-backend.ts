import { Http, BaseRequestOptions, Response, ResponseOptions, RequestMethod, XHRBackend, RequestOptions } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';

export function fakeBackendFactory(backend: MockBackend, options: BaseRequestOptions, realBackend: XHRBackend) {

    // array in local storage for registered users
    let users: any[] = JSON.parse(localStorage.getItem('users')) || [];
    // configure fake backend
    backend.connections.subscribe((connection: MockConnection) => {
        // wrap in timeout to simulate server api call
        setTimeout(() => {
                // authenticate
            if (connection.request.url.endsWith('/api/authenticate') && connection.request.method === RequestMethod.Post) {
                // get parameters from post request
                let params = JSON.parse(connection.request.getBody());
                // find if any user matches login credentials
             
       
              
                let filteredUsers = users.filter(user => {
              
                    return user.email === params.email && user.password === params.password;
                });

                if (filteredUsers.length >= 1) {
                   
                    // if login details are valid return 200 OK with user details and fake jwt token
                    let user = filteredUsers[0];
                    connection.mockRespond(new Response(new ResponseOptions({
                        status: 200,
                        body: {
                            id: user.id,
                            email : user.email,
                            password : user.password,
                            token: 'fake-jwt-token'
                        }
                    })));
                } else {
                    // else return 400 bad request
                    alert('Email or password is incorrect');
                    location.reload();
           //        connection.mockError(new Error('Email or password is incorrect'));
                }
                     return;
            }
                




            
            if (connection.request.url.endsWith('/api/users') && connection.request.method === RequestMethod.Get) {
             
            
                connection.mockRespond(new Response(new ResponseOptions({ status: 200, body: users })));
                console.log(users);
                return ;
              
            }
            // get user by id
            if (connection.request.url.match(/\/api\/users\/\d+$/) && connection.request.method === RequestMethod.Get) {
           
            
                    let urlParts = connection.request.url.split('/');
                    let id = parseInt(urlParts[urlParts.length - 1]);
                    let matchedUsers = users.filter(user => { return user.id === id; });
                    let user = matchedUsers.length ? matchedUsers[0] : null;     
                    connection.mockRespond(new Response(new ResponseOptions({ status: 200, body: user }))); 
                return;
            
            }
            // create user
            if (connection.request.url.endsWith('/api/users') && connection.request.method == RequestMethod.Post) {
                // get new user object from post body
                let newUser = JSON.parse(connection.request.getBody());
                newUser.id = users.length + 1;
                let matchedmail = users.filter(user => { return user.email === newUser.email; });
                     let userMail = matchedmail.length ? matchedmail.length : null; 
                if(userMail == null){
                users.push(newUser);
                localStorage.setItem('users', JSON.stringify(users));
                // respond 200 OK
               connection.mockRespond(new Response(new ResponseOptions({ status: 200 })));
                return;
            }
            else{
                alert("This maild is already Registered");
                 connection.mockRespond(new Response(new ResponseOptions({ status: 400 })));
                return false;
            }
            }
                 //Update User
            if (connection.request.url.match(/\/api\/users\/\d+$/) && connection.request.method === RequestMethod.Put) {
                  
                    let urlParts = connection.request.url.split('/');
                     let id = parseInt(urlParts[urlParts.length - 1]);
                     let matchedUsers = users.filter(user => { return user.id === id; });
                     let user = matchedUsers.length ? matchedUsers[0] : null;  
                     localStorage.setItem('users', JSON.stringify(users));  
                     connection.mockRespond(new Response(new ResponseOptions({ status: 200, body: user }))); 
                 return;
                  
            }
            // delete user
            if (connection.request.url.match(/\/api\/users\/\d+$/)) {
               
  
                    let urlParts = connection.request.url.split('/');
                    let id = parseInt(urlParts[urlParts.length - 1]);
                    for (let i = 0; i <= users.length; i++) {
                        let user = users[i];
                     
                        if (user.id == id) {
                        
                           users.splice(i, 1);
                           localStorage.setItem('users', JSON.stringify(users)); 
                            break;
                        }
                    }
                    // respond 200 OK
                    connection.mockRespond(new Response(new ResponseOptions({ status: 200 })));
                    
                return;
           
            }
            // pass through any requests not handled above
            let realHttp = new Http(realBackend, options);
            let requestOptions = new RequestOptions({
                method: connection.request.method,
                headers: connection.request.headers,
                body: connection.request.getBody(),
                url: connection.request.url,
                withCredentials: connection.request.withCredentials,
                responseType: connection.request.responseType
            });
            realHttp.request(connection.request.url, requestOptions)
                .subscribe((response: Response) => {
                    connection.mockRespond(response);
                },
                (error: any) => {
                    connection.mockError(error);
                });

        }, 500);

    });

    return new Http(backend, options);
};



export let fakeBackendProvider = {
    // use fake backend in place of Http service for backend-less development
    provide: Http,
    useFactory: fakeBackendFactory,
    deps: [MockBackend, BaseRequestOptions, XHRBackend]
};