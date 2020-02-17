### Creating an axios instance
Create a new file and then define in that file your axios instance.

```
import axios from 'axios';

const instance = axios.create({
   baseURL: 'https://react-burger-app-evi.firebaseio.com/',
});

export default instance;
```
1. Import axios
2. create your instance and set the baseUrl to your database's url.
3. Export your instance so you can use it elsewhere

### Sending a POST request
```
 axios.post('/orders.json', order) //need .json for firebase only endpoint
            .then(response => {
                console.log(response);
                this.setState({loading: false, purchasing: false});
            })
            .catch(error => {
                console.log(error);
                this.setState({loading: false, purchasing: false});
            });
```

Use axios' POST method to send a post request. 

### Handling Errors
It's good to create a new higher order component (hoc) for wrapping it around a component and handle any errors in that component. 

1. First create a new file.
2. Create a component that will return a class Component

```
const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {
        state = {
            error: null,
        }

        componentDidMount() {
            axios.interceptors.request.use(req => {
                this.setState({error: null});
                console.log(req);
                return req;
            })
            axios.interceptors.response.use(res => res, error => {
                this.setState({error: error})
                console.log(error);
            })
        }

        errorConfirmHandler = () => {
            this.setState({error: null})
        }
        render() {
            return (
                <Aux>
                    <Modal  show={this.state.error}
                            modalClosed={this.errorConfirmHandler}>
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props} />
                    
                </Aux>
            )
        }
    }
}

export default withErrorHandler;
```
Our component is called `withErrorHandler` and it returns a class Component. We're using axios interceptors to handle any request and response.

Note: Interceptors are used to intercept requests or responses before they are handled by `then` or `catch`.

Hence, we can use these interceptors to show something to the user before those errors are handled. In this case we're using them to show a modal to the screen. In this modal we will show the error => see: 
```
<Aux>
    <Modal  show={this.state.error}
            modalClosed={this.errorConfirmHandler}>
        {this.state.error ? this.state.error.message : null}
    </Modal>
    <WrappedComponent {...this.props} />
    
</Aux>
```

### Retrieving Data from the Backend
```
 componentDidMount() {
        axios.get('https://react-burger-app-evi.firebaseio.com/ingredients.json')
            .then(response => {
                this.setState({ingredients: response.data})
            })
            .catch(error => {
                this.setState({error: true})
            })
    }
```
