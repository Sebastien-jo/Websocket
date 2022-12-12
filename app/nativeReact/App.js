import store from './Redux/store'
import { Provider } from 'react-redux'
import Route from "./Router/Route";

export default function App() {
  return (
      <Provider store={store}>
              <Route/>
      </Provider>
  );
}
